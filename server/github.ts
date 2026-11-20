import { HttpError } from './http';

/**
 * GitHub as the content store.
 *
 * Writes go through the Git Data API so a post and its cover image land in a
 * single commit — one commit means one Vercel rebuild, and no window where the
 * markdown points at an image that has not been pushed yet.
 */

const API_ROOT = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const API_VERSION = '2022-11-28';

interface RepoConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

function repoConfig(): RepoConfig {
  const token = process.env.GITHUB_TOKEN?.trim();
  const slug = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || 'main';

  if (!token) {
    throw new HttpError(500, 'GITHUB_TOKEN is not configured.');
  }
  if (!slug || !slug.includes('/')) {
    throw new HttpError(500, 'GITHUB_REPO must look like "owner/repo".');
  }

  const [owner, repo] = slug.split('/');
  return { token, owner, repo, branch };
}

async function request(
  path: string,
  init: { method?: string; body?: unknown; accept?: string } = {},
): Promise<Response> {
  const { token } = repoConfig();

  const response = await fetch(`${API_ROOT}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: init.accept ?? 'application/vnd.github+json',
      'X-GitHub-Api-Version': API_VERSION,
      'Content-Type': 'application/json',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

  if (!response.ok && response.status !== 404) {
    const detail = await response.text();
    console.error('[github]', response.status, path, detail.slice(0, 500));
    throw new HttpError(
      response.status === 401 ? 500 : 502,
      response.status === 401
        ? 'GitHub token is invalid or expired.'
        : 'GitHub rejected the request.',
    );
  }

  return response;
}

async function json<T>(path: string, init: Parameters<typeof request>[1] = {}) {
  const response = await request(path, init);
  if (response.status === 404 || response.status === 204) return null;
  return (await response.json()) as T;
}

export interface DirectoryEntry {
  name: string;
  path: string;
  type: 'file' | 'dir' | 'symlink' | 'submodule';
}

export async function listDirectory(path: string): Promise<DirectoryEntry[]> {
  const { owner, repo, branch } = repoConfig();
  const entries = await json<DirectoryEntry[]>(
    `/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
  );

  if (!Array.isArray(entries)) return [];
  return entries;
}

export async function readFile(path: string): Promise<string | null> {
  const { owner, repo, branch } = repoConfig();
  const response = await request(
    `/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
    { accept: 'application/vnd.github.raw' },
  );

  if (response.status === 404) return null;
  return response.text();
}

/**
 * Read a binary file as base64. Used when a post's slug changes and its cover
 * has to move to the new folder — git can only carry bytes we hand it.
 */
export async function readFileBase64(path: string): Promise<string | null> {
  const { owner, repo, branch } = repoConfig();
  const data = await json<{ content?: string; encoding?: string }>(
    `/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
  );

  if (!data?.content) return null;
  // The contents API wraps base64 at 60 chars; the blobs API wants it clean.
  return data.content.replace(/\s/g, '');
}

export type FileChange =
  | { path: string; content: string; encoding?: 'utf-8' | 'base64' }
  | { path: string; remove: true };

interface TreeEntry {
  path: string;
  mode: '100644';
  type: 'blob';
  sha: string | null;
}

export async function commitChanges(
  message: string,
  changes: FileChange[],
): Promise<string> {
  if (changes.length === 0) {
    throw new HttpError(400, 'Nothing to commit.');
  }

  const { owner, repo, branch } = repoConfig();
  const base = `/repos/${owner}/${repo}`;

  const ref = await json<{ object: { sha: string } }>(
    `${base}/git/ref/heads/${branch}`,
  );
  if (!ref) throw new HttpError(500, `Branch "${branch}" was not found.`);

  const headSha = ref.object.sha;
  const headCommit = await json<{ tree: { sha: string } }>(
    `${base}/git/commits/${headSha}`,
  );
  if (!headCommit) throw new HttpError(502, 'Could not read the current commit.');

  const treeEntries: TreeEntry[] = [];

  for (const change of changes) {
    if ('remove' in change) {
      treeEntries.push({
        path: change.path,
        mode: '100644',
        type: 'blob',
        sha: null,
      });
      continue;
    }

    const blob = await json<{ sha: string }>(`${base}/git/blobs`, {
      method: 'POST',
      body: {
        content: change.content,
        encoding: change.encoding ?? 'utf-8',
      },
    });
    if (!blob) throw new HttpError(502, 'Could not stage a file.');

    treeEntries.push({
      path: change.path,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    });
  }

  const tree = await json<{ sha: string }>(`${base}/git/trees`, {
    method: 'POST',
    body: { base_tree: headCommit.tree.sha, tree: treeEntries },
  });
  if (!tree) throw new HttpError(502, 'Could not build the commit tree.');

  const commit = await json<{ sha: string }>(`${base}/git/commits`, {
    method: 'POST',
    body: { message, tree: tree.sha, parents: [headSha] },
  });
  if (!commit) throw new HttpError(502, 'Could not create the commit.');

  await request(`${base}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    body: { sha: commit.sha, force: false },
  });

  return commit.sha;
}
