import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { FaArrowLeft, FaPlus, FaTrashCan, FaUpload } from 'react-icons/fa6';
import MarkdownEditor from '../components/MarkdownEditor';
import { compressImage, formatBytes } from '../utils/image';
import type { CompressedImage } from '../utils/image';
import {
  deletePost,
  getSession,
  listPosts,
  savePost,
  signIn,
  signOut,
} from '../api/admin';
import type { PostInput, StoredPost } from '../types/post';
import '../styles/Admin.css';

type Phase = 'checking' | 'signed-out' | 'signed-in';
type Notice = { kind: 'ok' | 'error'; text: string } | null;

function today(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function emptyPost(): PostInput {
  return {
    title: '',
    slug: '',
    date: today(),
    location: '',
    excerpt: '',
    cover: '',
    body: '',
    draft: true,
  };
}

function toInput(post: StoredPost): PostInput {
  return {
    title: post.title,
    slug: post.slug,
    date: post.date ?? '',
    location: post.location ?? '',
    excerpt: post.excerpt ?? '',
    cover: post.cover ?? '',
    body: post.body,
    draft: post.draft,
  };
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

const Admin: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('checking');
  const [configured, setConfigured] = useState(true);
  const [posts, setPosts] = useState<StoredPost[]>([]);
  const [notice, setNotice] = useState<Notice>(null);

  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const [editing, setEditing] = useState<PostInput | null>(null);
  const [previousSlug, setPreviousSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [cover, setCover] = useState<CompressedImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getSession()
      .then((session) => {
        if (cancelled) return;
        setConfigured(session.configured);
        setPhase(session.authenticated ? 'signed-in' : 'signed-out');
      })
      .catch(() => {
        if (cancelled) return;
        setPhase('signed-out');
        setNotice({
          kind: 'error',
          text: 'Could not reach the admin API. Check that it is deployed.',
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const refresh = useCallback(async () => {
    try {
      setPosts(await listPosts());
    } catch (error) {
      setNotice({
        kind: 'error',
        text: errorMessage(error, 'Could not load posts.'),
      });
    }
  }, []);

  useEffect(() => {
    if (phase === 'signed-in') {
      void refresh();
    }
  }, [phase, refresh]);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setSigningIn(true);
    setNotice(null);

    try {
      await signIn(password);
      setPassword('');
      setPhase('signed-in');
    } catch (error) {
      setNotice({ kind: 'error', text: errorMessage(error, 'Sign-in failed.') });
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOut().catch(() => undefined);
    setPhase('signed-out');
    setEditing(null);
    setPosts([]);
    setNotice(null);
  };

  const startNew = () => {
    setEditing(emptyPost());
    setPreviousSlug('');
    setSlugTouched(false);
    setCover(null);
    setNotice(null);
  };

  const startEdit = (post: StoredPost) => {
    setEditing(toInput(post));
    setPreviousSlug(post.slug);
    setSlugTouched(true);
    setCover(null);
    setConfirming(null);
    setNotice(null);
  };

  const updateTitle = (title: string) => {
    setEditing((current) =>
      current
        ? { ...current, title, slug: slugTouched ? current.slug : slugify(title) }
        : current,
    );
  };

  const handleCoverFile = async (file: File | undefined) => {
    if (!file) return;
    setNotice(null);

    try {
      const compressed = await compressImage(file);
      if (cover) URL.revokeObjectURL(cover.previewUrl);
      setCover(compressed);
      setEditing((current) => (current ? { ...current, cover: '' } : current));
    } catch (error) {
      setNotice({
        kind: 'error',
        text: errorMessage(error, 'Could not process that image.'),
      });
    }
  };

  const removeCover = () => {
    if (cover) URL.revokeObjectURL(cover.previewUrl);
    setCover(null);
    setEditing((current) => (current ? { ...current, cover: '' } : current));
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing) return;

    setSaving(true);
    setNotice(null);

    try {
      await savePost({
        post: { ...editing, cover: cover ? '' : editing.cover },
        previousSlug: previousSlug || undefined,
        coverUpload: cover ? { data: cover.data, type: cover.type } : null,
      });

      setEditing(null);
      setCover(null);
      await refresh();
      setNotice({
        kind: 'ok',
        text: 'Saved. The site rebuilds in about a minute.',
      });
    } catch (error) {
      setNotice({ kind: 'error', text: errorMessage(error, 'Could not save.') });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setNotice(null);

    try {
      await deletePost(slug);
      setConfirming(null);
      await refresh();
      setNotice({ kind: 'ok', text: 'Deleted. The site rebuilds in about a minute.' });
    } catch (error) {
      setNotice({ kind: 'error', text: errorMessage(error, 'Could not delete.') });
    }
  };

  if (phase === 'checking') {
    return (
      <div className="admin-page">
        <div className="admin-shell section-shell">
          <p className="admin-status">Checking session…</p>
        </div>
      </div>
    );
  }

  if (phase === 'signed-out') {
    return (
      <div className="admin-page">
        <div className="admin-shell section-shell">
          <header className="admin-head">
            <h1 className="admin-title">Content</h1>
            <p className="admin-sub">Sign in to publish events and posts.</p>
          </header>

          {!configured && (
            <div className="admin-notice is-error" role="status">
              The admin API is not configured. Set <code>ADMIN_PASSWORD_HASH</code>{' '}
              (or <code>ADMIN_PASSWORD</code>) and <code>SESSION_SECRET</code> in
              the environment.
            </div>
          )}

          <form className="admin-login card-surface" onSubmit={handleSignIn}>
            <label className="micro-label" htmlFor="admin-password">
              Editor password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button className="btn-primary" type="submit" disabled={signingIn}>
              {signingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {notice && (
            <p className={`admin-notice is-${notice.kind}`} role="status">
              {notice.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  const coverPreview = cover?.previewUrl ?? editing?.cover ?? '';

  return (
    <div className="admin-page">
      <div className="admin-shell section-shell">
        <header className="admin-head">
          <div>
            <h1 className="admin-title">{editing ? 'Edit post' : 'Content'}</h1>
            <p className="admin-sub">
              {editing
                ? 'Saving commits to the repo and rebuilds the site.'
                : 'Publishing writes a commit to the repo. The site rebuilds in about a minute.'}
            </p>
          </div>
          <div className="admin-head-actions">
            {editing ? (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setEditing(null);
                  setCover(null);
                  setNotice(null);
                }}
              >
                <FaArrowLeft aria-hidden="true" />
                Back
              </button>
            ) : (
              <>
                <button type="button" className="btn-primary" onClick={startNew}>
                  <FaPlus aria-hidden="true" />
                  New post
                </button>
                <button type="button" className="btn-ghost" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            )}
          </div>
        </header>

        {notice && (
          <p className={`admin-notice is-${notice.kind}`} role="status">
            {notice.text}
          </p>
        )}

        {editing ? (
          <form className="admin-editor" onSubmit={handleSave}>
            <div className="admin-field">
              <label className="micro-label" htmlFor="post-title">
                Title
              </label>
              <input
                id="post-title"
                value={editing.title}
                onChange={(event) => updateTitle(event.target.value)}
                required
              />
            </div>

            <div className="admin-row-2">
              <div className="admin-field">
                <label className="micro-label" htmlFor="post-slug">
                  Slug
                </label>
                <input
                  id="post-slug"
                  value={editing.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setEditing({ ...editing, slug: slugify(event.target.value) });
                  }}
                  required
                />
                <span className="admin-hint">/blog/{editing.slug || '…'}</span>
              </div>

              <div className="admin-field">
                <label className="micro-label" htmlFor="post-date">
                  Date
                </label>
                <input
                  id="post-date"
                  type="date"
                  value={editing.date}
                  onChange={(event) =>
                    setEditing({ ...editing, date: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="admin-field">
              <label className="micro-label" htmlFor="post-location">
                Location
              </label>
              <input
                id="post-location"
                value={editing.location}
                onChange={(event) =>
                  setEditing({ ...editing, location: event.target.value })
                }
                placeholder="Howard Performing Arts Center"
              />
            </div>

            <div className="admin-field">
              <label className="micro-label" htmlFor="post-excerpt">
                Excerpt
              </label>
              <textarea
                id="post-excerpt"
                rows={2}
                value={editing.excerpt}
                onChange={(event) =>
                  setEditing({ ...editing, excerpt: event.target.value })
                }
                placeholder="One or two sentences shown on the events card."
              />
            </div>

            <div className="admin-field">
              <span className="micro-label">Cover image</span>

              {coverPreview ? (
                <div className="admin-cover">
                  <div className="photo-frame admin-cover-frame">
                    <img src={coverPreview} alt="" />
                  </div>
                  <div className="admin-cover-meta">
                    {cover && (
                      <span className="admin-hint">
                        {formatBytes(cover.bytes)} after compression
                      </span>
                    )}
                    <button
                      type="button"
                      className="admin-link-danger"
                      onClick={removeCover}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="admin-upload">
                  <FaUpload aria-hidden="true" />
                  <span>Choose an image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      void handleCoverFile(event.target.files?.[0]);
                      event.target.value = '';
                    }}
                  />
                </label>
              )}
            </div>

            <div className="admin-field">
              <label className="micro-label" htmlFor="post-body">
                Body
              </label>
              <MarkdownEditor
                id="post-body"
                value={editing.body}
                onChange={(body) => setEditing({ ...editing, body })}
              />
            </div>

            <div className="admin-actions">
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={editing.draft}
                  onChange={(event) =>
                    setEditing({ ...editing, draft: event.target.checked })
                  }
                />
                <span>Save as draft</span>
              </label>

              <div className="admin-actions-buttons">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving
                    ? 'Saving…'
                    : editing.draft
                      ? 'Save draft'
                      : 'Publish'}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setEditing(null);
                    setCover(null);
                    setNotice(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="admin-list">
            {posts.length === 0 && (
              <p className="admin-status">
                No posts yet. Create one, or publish it from a draft.
              </p>
            )}

            {posts.map((post) => (
              <article key={post.path} className="admin-row card-surface">
                <div className="admin-row-main">
                  <span className="micro-label admin-row-meta">
                    {post.date || 'No date'}
                    <span className={`admin-badge ${post.draft ? 'is-draft' : ''}`}>
                      {post.draft ? 'Draft' : 'Published'}
                    </span>
                  </span>
                  <h2 className="admin-row-title">{post.title}</h2>
                  <span className="admin-hint">/blog/{post.slug}</span>
                </div>

                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => startEdit(post)}
                  >
                    Edit
                  </button>

                  {confirming === post.slug ? (
                    <>
                      <button
                        type="button"
                        className="admin-confirm-danger"
                        onClick={() => void handleDelete(post.slug)}
                      >
                        Confirm delete
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => setConfirming(null)}
                      >
                        Keep
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="admin-link-danger"
                      onClick={() => setConfirming(post.slug)}
                    >
                      <FaTrashCan aria-hidden="true" />
                      Delete
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
