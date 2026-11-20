import type { PostInput, StoredPost } from '../types/post';

/**
 * Admin API client. Same-origin, so the signed session cookie rides along
 * automatically. Every mutation is a git commit on the server.
 */

export interface SessionInfo {
  authenticated: boolean;
  /** False when the server is missing ADMIN_PASSWORD / SESSION_SECRET. */
  configured: boolean;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? String((payload as { error: unknown }).error)
        : `Request failed (${response.status}).`;
    throw new Error(message);
  }

  return payload as T;
}

export function getSession(): Promise<SessionInfo> {
  return request<SessionInfo>('/api/auth');
}

export function signIn(password: string): Promise<{ authenticated: boolean }> {
  return request('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export function signOut(): Promise<{ authenticated: boolean }> {
  return request('/api/auth', { method: 'DELETE' });
}

export async function listPosts(): Promise<StoredPost[]> {
  const result = await request<{ posts: StoredPost[] }>('/api/posts');
  return result.posts ?? [];
}

export interface SavePayload {
  post: PostInput;
  previousSlug?: string;
  coverUpload?: { data: string; type: string } | null;
}

export function savePost(payload: SavePayload): Promise<{
  ok: true;
  commit: string;
  slug: string;
}> {
  return request('/api/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function deletePost(slug: string): Promise<{ ok: true; commit: string }> {
  return request('/api/posts', {
    method: 'DELETE',
    body: JSON.stringify({ slug }),
  });
}
