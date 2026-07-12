import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import { fetchPostBySlug, formatPostMeta } from '../api/strapi';
import type { CmsPost } from '../types/post';
import '../App.css';
import '../styles/BlogPost.css';

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<CmsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Post not found.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchPostBySlug(slug!);
        if (!cancelled) {
          setPost(result);
          if (!result) {
            setError('Post not found.');
          }
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load this post right now.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="App blog-post-page">
      <Navbar />
      <main className="blog-post-shell">
        <div className="blog-post-container">
          <Link to="/#events" className="blog-post-back">
            ← Back to events
          </Link>

          {loading && <p className="blog-post-status">Loading post…</p>}

          {!loading && error && (
            <div className="blog-post-empty">
              <h1 className="blog-post-title">Post unavailable</h1>
              <p className="blog-post-meta">{error}</p>
            </div>
          )}

          {!loading && post && (
            <article className="blog-post-article">
              <header className="blog-post-header">
                <h1 className="blog-post-title">{post.title}</h1>
                <p className="blog-post-meta">{formatPostMeta(post)}</p>
              </header>

              <div className="blog-post-body">
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </div>
            </article>
          )}
        </div>
      </main>
    </div>
  );
}

export default BlogPost;
