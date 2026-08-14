import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { links } from '../data/links';
import { fetchRecentPosts, formatPostMeta } from '../api/strapi';
import type { CmsPost } from '../types/post';
import '../styles/Events.css';
import { fadeRise, staggerParent, VIEWPORT } from '../utils/motion';

const MotionLink = motion(Link);

function parsePostDate(dateStr: string | null) {
  if (!dateStr) return { day: 'TBA', year: '' };
  try {
    const d = new Date(`${dateStr}T00:00:00`);
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = d.toLocaleDateString('en-US', { day: 'numeric' });
    return {
      day: `${month} ${day}`,
      year: String(d.getFullYear())
    };
  } catch {
    return { day: 'TBA', year: '' };
  }
}

const Events: React.FC = () => {
  const [posts, setPosts] = useState<CmsPost[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function loadPosts() {
      try {
        const result = await fetchRecentPosts();
        if (!cancelled) {
          setPosts(result);
        }
      } catch (err) {
        console.error('Failed to fetch events from Strapi:', err);
      }
    }
    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasDynamicEvents = posts.length > 0;
  const primaryPost = hasDynamicEvents ? posts[0] : null;
  const remainingPosts = hasDynamicEvents ? posts.slice(1) : [];

  const primaryDate = primaryPost ? parsePostDate(primaryPost.date) : { day: 'Sept 25', year: '2026' };

  return (
    <section id="events" className="events-section">
      <div className="section-shell events-inner">
        <header className="section-head">
          <div className="section-head-row">
            <h2 className="display-heading section-heading">Upcoming events</h2>
            <span className="section-meta">What's next</span>
          </div>
        </header>

        {primaryPost ? (
          /* Dynamic Flagship Event Card from Strapi */
          <MotionLink
            to={`/blog/${primaryPost.slug}`}
            className="event-flagship on-dark"
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              className="event-date-block"
              variants={fadeRise}
              aria-hidden="true"
            >
              <span className="event-date-day">{primaryDate.day}</span>
              <span className="event-date-year">{primaryDate.year}</span>
            </motion.div>

            <motion.div className="event-details" variants={fadeRise}>
              <span className="micro-label event-context">
                {primaryPost.location || 'Andrews University'}
              </span>
              <h3 className="event-title">{primaryPost.title}</h3>
              <p className="event-desc">
                {primaryPost.excerpt?.trim() || primaryPost.body?.slice(0, 180) + '...' || 'Read more about this event.'}
              </p>
              <dl className="event-meta">
                <div className="event-meta-item">
                  <dt className="micro-label">Date</dt>
                  <dd>{primaryPost.date ? new Date(`${primaryPost.date}T00:00:00`).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Date TBA'}</dd>
                </div>
                {primaryPost.location && (
                  <div className="event-meta-item">
                    <dt className="micro-label">Venue</dt>
                    <dd>{primaryPost.location}</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          </MotionLink>
        ) : (
          /* Hardcoded Flagship Event Fallback */
          <motion.article
            className="event-flagship on-dark"
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div
              className="event-date-block"
              variants={fadeRise}
              aria-hidden="true"
            >
              <span className="event-date-day">Sept 25</span>
              <span className="event-date-year">2026</span>
            </motion.div>

            <motion.div className="event-details" variants={fadeRise}>
              <span className="micro-label event-context">
                Homecoming Weekend · Andrews University
              </span>
              <h3 className="event-title">Legacy: An AUAG Alumni Series</h3>
              <p className="event-desc">
                An afternoon with the alumni who've gone ahead — career stories
                and a moderated panel spanning law, engineering, medicine, and
                capital, followed by open networking with the people behind them.
              </p>
              <dl className="event-meta">
                <div className="event-meta-item">
                  <dt className="micro-label">Date</dt>
                  <dd>Friday, September 25, 2026</dd>
                </div>
                <div className="event-meta-item">
                  <dt className="micro-label">Time</dt>
                  <dd>2:00 – 4:30 PM</dd>
                </div>
                <div className="event-meta-item">
                  <dt className="micro-label">Venue</dt>
                  <dd>Howard Performing Arts Center</dd>
                </div>
              </dl>
            </motion.div>
          </motion.article>
        )}

        {/* Dynamic Additional Events Grid */}
        {remainingPosts.length > 0 && (
          <div className="events-grid">
            {remainingPosts.map((post) => (
              <Link
                key={post.documentId}
                to={`/blog/${post.slug}`}
                className="event-card card-surface"
              >
                <span className="micro-label event-card-meta">
                  {formatPostMeta(post)}
                </span>
                <h4 className="event-card-title">{post.title}</h4>
                <p className="event-card-excerpt">
                  {post.excerpt?.trim() || 'Read more about this event.'}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="events-follow">
          <p className="events-follow-copy">
            More 2026 dates are being finalized. Follow along and you'll hear
            about them first.
          </p>
          <div className="events-follow-ctas">
            <a
              className="btn-ghost"
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram aria-hidden="true" />
              Follow @auactiongroup
            </a>
            <a className="btn-ghost" href={links.contactEmail}>
              <FaEnvelope aria-hidden="true" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
