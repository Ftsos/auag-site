import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { links } from '../data/links';
import '../styles/Events.css';
import { fadeRise, staggerParent, VIEWPORT } from '../utils/motion';

/*
 * Email capture: intentionally absent until a real endpoint exists.
 * The old form posted to a placeholder Formspree URL and faked a success
 * toast while discarding the address. When a real Formspree (or similar)
 * endpoint is ready, re-add the form here and wire it to that URL.
 */

const Events: React.FC = () => {
  return (
    <section id="events" className="events-section">
      <div className="section-shell events-inner">
        <header className="section-head">
          <div className="section-head-row">
            <h2 className="display-heading section-heading">Upcoming events</h2>
            <span className="section-meta">What's next</span>
          </div>
        </header>

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
