import type { CmsPost, StrapiListResponse, StrapiSingleResponse } from '../types/post';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, '') ?? '';
const EVENTS_LIMIT = Number(import.meta.env.VITE_EVENTS_LIMIT ?? 4);

function buildUrl(path: string, params?: URLSearchParams) {
  const base =
    STRAPI_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173');
  const url = new URL(path, base);

  if (params) {
    params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

async function fetchFromStrapi<T>(path: string, params?: URLSearchParams): Promise<T> {
  const response = await fetch(buildUrl(path, params));

  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function fetchRecentPosts(limit = EVENTS_LIMIT): Promise<CmsPost[]> {
  const params = new URLSearchParams({
    sort: 'date:desc',
    'pagination[limit]': String(limit),
    'filters[publishedAt][$notNull]': 'true',
  });

  const result = await fetchFromStrapi<StrapiListResponse<CmsPost>>('/api/posts', params);
  return result.data ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<CmsPost | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'filters[publishedAt][$notNull]': 'true',
    'pagination[limit]': '1',
  });

  const result = await fetchFromStrapi<StrapiListResponse<CmsPost>>('/api/posts', params);
  return result.data?.[0] ?? null;
}

export async function fetchPostByDocumentId(documentId: string): Promise<CmsPost | null> {
  const result = await fetchFromStrapi<StrapiSingleResponse<CmsPost>>(`/api/posts/${documentId}`);
  return result.data ?? null;
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

export function formatPostMeta(post: Pick<CmsPost, 'location' | 'date'>): string {
  const location = post.location?.trim() || 'Location TBA';
  const date = formatPostDate(post.date);
  return `${location} • ${date}`;
}
