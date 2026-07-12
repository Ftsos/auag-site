import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecentPosts, formatPostMeta } from '../api/strapi';
import type { CmsPost } from '../types/post';
import '../styles/Events.css';
import '../styles/BlogPost.css';

const Events = () => {
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchRecentPosts();
        if (!cancelled) {
          setPosts(result);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load events right now.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="events"
      className="min-h-screen w-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <div className="moving-points-bg absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 150 }).map((_, i) => {
          const x = Math.random();
          const y = Math.random();
          const speed = Math.random();
          return (
            <span
              key={i}
              className="point"
              style={{
                '--x': x,
                '--y': y,
                '--speed': speed,
              } as CSSProperties}
            />
          );
        })}
      </div>

      <div className="z-10 text-center relative max-w-4xl">
        <h2 className="text-6xl font-light text-white uppercase tracking-widest mb-4">
          UPCOMING EVENTS
        </h2>
        <p className="mb-12 text-gray-400">
          Join us at our next events and be part of the community. We&apos;re excited to see you there!
        </p>

        {loading && <p className="events-status">Loading events…</p>}

        {!loading && error && (
          <div className="events-empty">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.length === 0 ? (
              <div className="events-empty">
                <p>No events published yet. Check back soon.</p>
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.documentId}
                  to={`/blog/${post.slug}`}
                  className="event-card bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800"
                >
                  <h3 className="text-2xl font-semibold mb-2 text-white">{post.title}</h3>
                  <p className="text-gray-500 mb-4">{formatPostMeta(post)}</p>
                  <p className="text-gray-400">
                    {post.excerpt?.trim() || 'Read more about this event.'}
                  </p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
