import { parseFrontmatter } from '../utils/frontmatter';
import type { Post } from '../types/post';

/**
 * Public read layer for posts.
 *
 * Posts are compiled into the bundle at build time — there is no runtime API
 * call, no loading spinner, and no dependency on a CMS being awake. Editing
 * happens in `/admin`, which commits to git and triggers a rebuild.
 */

const EVENTS_LIMIT = Number(import.meta.env.VITE_EVENTS_LIMIT ?? 4);

const files = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function toPost(path: string, raw: string): Post | null {
  const { data, body } = parseFrontmatter(raw);

  const title = typeof data.title === 'string' ? data.title.trim() : '';
  if (!title) return null;

  const frontmatterSlug =
    typeof data.slug === 'string' ? data.slug.trim() : '';
  const filenameSlug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';

  const text = (key: string) =>
    typeof data[key] === 'string' ? (data[key] as string).trim() : '';

  return {
    slug: frontmatterSlug || filenameSlug,
    title,
    body,
    excerpt: text('excerpt') || null,
    date: text('date') || null,
    location: text('location') || null,
    cover: text('cover') || null,
  };
}

const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post): post is Post => post !== null)
  // Newest first. Undated posts sink to the bottom rather than jumping to top.
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

export async function fetchRecentPosts(limit = EVENTS_LIMIT): Promise<Post[]> {
  return posts.slice(0, limit);
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(date: string | null): string {
  if (!date) {
    return 'Date TBA';
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatPostMeta(post: Pick<Post, 'location' | 'date'>): string {
  const location = post.location?.trim() || 'Location TBA';
  const date = formatPostDate(post.date);
  return `${location} • ${date}`;
}
