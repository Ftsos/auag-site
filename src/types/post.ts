/**
 * The post content model.
 *
 * Content is authored as markdown with frontmatter in `src/content/posts/`
 * (published) and `src/content/drafts/` (unpublished). There is no CMS server:
 * the site compiles posts in at build time, and the `/admin` page writes back
 * to git through a Vercel function.
 */
export interface Post {
  /** URL segment — `/blog/<slug>`. Derived from frontmatter, else the filename. */
  slug: string;
  title: string;
  /** Markdown body, rendered with react-markdown. */
  body: string;
  excerpt: string | null;
  /** ISO `YYYY-MM-DD`. */
  date: string | null;
  location: string | null;
  /** Public path to a cover image, e.g. `/posts/<slug>/cover.webp`. */
  cover: string | null;
}

/** A post as stored in the repo, including fields the public site ignores. */
export interface StoredPost extends Post {
  draft: boolean;
  /** Repo path, e.g. `src/content/posts/<slug>.md`. */
  path: string;
}

export interface PostInput {
  slug: string;
  title: string;
  body: string;
  excerpt: string;
  date: string;
  location: string;
  cover: string;
  draft: boolean;
}

export interface PostListResponse {
  posts: StoredPost[];
}
