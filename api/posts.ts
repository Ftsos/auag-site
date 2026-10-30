import { HttpError, readBody, withErrors } from '../server/http';
import type { ApiRequest } from '../server/http';
import { isAuthenticated } from '../server/auth';
import {
  commitChanges,
  listDirectory,
  readFile,
  readFileBase64,
  type DirectoryEntry,
  type FileChange,
} from '../server/github';
import { parseFrontmatter, stringifyFrontmatter } from '../src/utils/frontmatter';
import type { PostInput, StoredPost } from '../src/types/post';

/**
 * Admin CRUD for posts. Every write is a git commit; the deploy that follows
 * rebuilds the site with the new markdown compiled in.
 */

const POSTS_DIR = 'src/content/posts';
const DRAFTS_DIR = 'src/content/drafts';
const PUBLIC_DIR = 'public/posts';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Base64 inflates by ~4/3; Vercel caps request bodies at 4.5 MB. */
const MAX_COVER_BASE64 = 4_200_000;

const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

interface SavePayload {
  post: PostInput;
  previousSlug?: string;
  coverUpload?: { data: string; type: string } | null;
}

function requireAuth(req: ApiRequest): void {
  if (!isAuthenticated(req)) {
    throw new HttpError(401, 'Not signed in.');
  }
}

async function readPosts(dir: string, draft: boolean): Promise<StoredPost[]> {
  const entries = await listDirectory(dir);
  const markdown = entries.filter(
    (entry: DirectoryEntry) => entry.type === 'file' && entry.name.endsWith('.md'),
  );

  const posts = await Promise.all(
    markdown.map(async (entry) => {
      const raw = await readFile(entry.path);
      if (raw === null) return null;

      const { data, body } = parseFrontmatter(raw);
      const text = (key: string) =>
        typeof data[key] === 'string' ? (data[key] as string).trim() : '';

      return {
        slug: text('slug') || entry.name.replace(/\.md$/, ''),
        title: text('title'),
        body,
        excerpt: text('excerpt') || null,
        date: text('date') || null,
        location: text('location') || null,
        cover: text('cover') || null,
        draft,
        path: entry.path,
      } satisfies StoredPost;
    }),
  );

  return posts.filter(
    (post): post is StoredPost => post !== null && post.title !== '',
  );
}

async function existingPaths(): Promise<Set<string>> {
  const [published, drafts] = await Promise.all([
    listDirectory(POSTS_DIR),
    listDirectory(DRAFTS_DIR),
  ]);

  return new Set(
    [...published, ...drafts]
      .filter((entry) => entry.type === 'file')
      .map((entry) => entry.path),
  );
}

/**
 * Delete every file in a post's cover folder except the one we are keeping.
 * Handles a cover being replaced with a different file type, or removed
 * entirely, so `public/posts/` never accumulates orphans.
 *
 * Files already staged in this commit are left alone — otherwise replacing a
 * cover with the same extension would stage both a write and a delete.
 */
async function pruneCovers(
  slug: string,
  keepRepoPath: string | null,
  changes: FileChange[],
): Promise<void> {
  const entries = await listDirectory(`${PUBLIC_DIR}/${slug}`);
  const staged = new Set(changes.map((change) => change.path));

  for (const entry of entries) {
    if (entry.type !== 'file') continue;
    if (entry.path === keepRepoPath) continue;
    if (staged.has(entry.path)) continue;
    changes.push({ path: entry.path, remove: true });
  }
}

function validate(input: PostInput) {
  const title = input?.title?.trim() ?? '';
  const slug = input?.slug?.trim() ?? '';
  const date = input?.date?.trim() ?? '';
  const body = input?.body?.trim() ?? '';

  if (!title) throw new HttpError(400, 'A title is required.');
  if (!SLUG_PATTERN.test(slug)) {
    throw new HttpError(
      400,
      'Slug must be lowercase letters and numbers, separated by single hyphens.',
    );
  }
  if (date && !DATE_PATTERN.test(date)) {
    throw new HttpError(400, 'Date must be in YYYY-MM-DD format.');
  }
  if (!body) throw new HttpError(400, 'The post body cannot be empty.');

  return { title, slug, date };
}

export default withErrors(async (req, res) => {
  requireAuth(req);

  if (req.method === 'GET') {
    const [published, drafts] = await Promise.all([
      readPosts(POSTS_DIR, false),
      readPosts(DRAFTS_DIR, true),
    ]);

    const posts = [...published, ...drafts].sort((a, b) =>
      (b.date ?? '').localeCompare(a.date ?? ''),
    );

    res.status(200).json({ posts });
    return;
  }

  if (req.method === 'POST') {
    const payload = readBody<SavePayload>(req);
    const { title, slug, date } = validate(payload.post);

    const changes: FileChange[] = [];
    const known = await existingPaths();
    const previousSlug = payload.previousSlug?.trim() || '';

    let coverPath = (payload.post.cover ?? '').trim();

    if (payload.coverUpload) {
      const extension = IMAGE_EXTENSIONS[payload.coverUpload.type];
      if (!extension) {
        throw new HttpError(400, 'Cover must be a WebP, JPEG, or PNG image.');
      }
      if (payload.coverUpload.data.length > MAX_COVER_BASE64) {
        throw new HttpError(413, 'That cover image is too large. Try a smaller one.');
      }

      coverPath = `/posts/${slug}/cover.${extension}`;
      changes.push({
        path: `${PUBLIC_DIR}/${slug}/cover.${extension}`,
        content: payload.coverUpload.data,
        encoding: 'base64',
      });
    } else if (
      previousSlug &&
      previousSlug !== slug &&
      coverPath.startsWith(`/posts/${previousSlug}/`)
    ) {
      // The slug changed but the cover did not: carry the bytes across, or the
      // markdown would point at a folder we are about to delete.
      const filename = coverPath.slice(coverPath.lastIndexOf('/') + 1);
      const bytes = await readFileBase64(`public${coverPath}`);

      if (bytes) {
        coverPath = `/posts/${slug}/${filename}`;
        changes.push({
          path: `public${coverPath}`,
          content: bytes,
          encoding: 'base64',
        });
      }
    }

    const draft = Boolean(payload.post.draft);
    const targetDir = draft ? DRAFTS_DIR : POSTS_DIR;
    const otherDir = draft ? POSTS_DIR : DRAFTS_DIR;

    changes.push({
      path: `${targetDir}/${slug}.md`,
      content: stringifyFrontmatter(
        {
          title,
          slug,
          date: date || null,
          location: payload.post.location?.trim() || null,
          excerpt: payload.post.excerpt?.trim() || null,
          cover: coverPath || null,
        },
        payload.post.body,
      ),
    });

    // Publishing moves the file between folders rather than leaving a copy behind.
    const otherPath = `${otherDir}/${slug}.md`;
    if (known.has(otherPath)) {
      changes.push({ path: otherPath, remove: true });
    }

    // Renaming a slug must not leave the old post or its images behind.
    if (previousSlug && previousSlug !== slug) {
      for (const dir of [POSTS_DIR, DRAFTS_DIR]) {
        const oldPath = `${dir}/${previousSlug}.md`;
        if (known.has(oldPath)) changes.push({ path: oldPath, remove: true });
      }
      await pruneCovers(previousSlug, null, changes);
    }

    await pruneCovers(slug, coverPath ? `public${coverPath}` : null, changes);

    const commit = await commitChanges(
      `${draft ? 'draft' : 'publish'}: ${title}`,
      changes,
    );

    res.status(200).json({ ok: true, commit, slug });
    return;
  }

  if (req.method === 'DELETE') {
    const { slug } = readBody<{ slug?: string }>(req);
    const cleanSlug = slug?.trim() ?? '';

    if (!SLUG_PATTERN.test(cleanSlug)) {
      throw new HttpError(400, 'A valid slug is required.');
    }

    const known = await existingPaths();
    const changes: FileChange[] = [];

    for (const dir of [POSTS_DIR, DRAFTS_DIR]) {
      const path = `${dir}/${cleanSlug}.md`;
      if (known.has(path)) changes.push({ path, remove: true });
    }

    await pruneCovers(cleanSlug, null, changes);

    if (changes.length === 0) {
      throw new HttpError(404, 'That post no longer exists.');
    }

    const commit = await commitChanges(`delete: ${cleanSlug}`, changes);

    res.status(200).json({ ok: true, commit });
    return;
  }

  res.status(405).json({ error: 'Method not allowed.' });
});
