import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowRightLong } from 'react-icons/fa6';
import '../styles/About.css';
import { founders, outcomes } from '../data/about';
import { getInitials } from '../utils/initials';
import Photo from './Photo';
import { photos } from '../data/photos';
import { fadeRise, photoReveal, staggerParent, VIEWPORT } from '../utils/motion';

const TEASER_OUTCOME_COMPANIES = ['Tyton Holdings', 'Timothy Dockerty', 'Vantage AI'];

const About: React.FC = () => {
  const teaserOutcomes = TEASER_OUTCOME_COMPANIES
    .map((company) =>
      outcomes.find((entry) => entry.outcome.company === company),
    )
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <section id="about" className="about-section">
      <div className="section-shell">
        <header className="section-head about-header">
          <div className="section-head-row">
            <h2 className="display-heading section-heading">
              Built by Andrews. Where Andrews leads.
            </h2>
            <span className="section-meta">The story</span>
          </div>
          <p className="section-sub">
            AUAG turns the alumni network into careers. The proof is what's
            happened to the officers who built it — full-time placements,
            internships, and ventures launched out of the work itself.
          </p>
        </header>

        <motion.figure
          className="about-band photo-frame"
          variants={photoReveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <Photo
            photo={photos.aboutBand}
            sizes="(max-width: 1200px) 100vw, 1104px"
          />
        </motion.figure>

        <motion.div
          className="about-founders-grid"
          variants={staggerParent()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {founders.map((person) => (
            <motion.article
              key={person.name}
              className="about-founder-card card-surface"
              variants={fadeRise}
            >
              {person.photo ? (
                <img
                  className="about-founder-photo"
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                />
              ) : (
                <div className="about-founder-monogram" aria-hidden="true">
                  {getInitials(person.name)}
                </div>
              )}
              <div className="about-founder-meta">
                <span className="micro-label">{person.role}</span>
                <h3 className="about-founder-name">{person.name}</h3>
                {person.bio && <p className="about-founder-bio">{person.bio}</p>}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {teaserOutcomes.length > 0 && (
          <motion.div
            className="about-proof-strip"
            aria-label="Officer career outcomes"
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <span className="micro-label">Where AUAG has led</span>
            <ul className="about-proof-list">
              {teaserOutcomes.map(({ person, outcome }) => (
                <li
                  key={`${person.name}-${outcome.company}`}
                  className="about-proof-chip"
                >
                  <span className="about-proof-name">{person.name}</span>
                  <FaArrowRightLong
                    className="about-proof-arrow"
                    aria-hidden="true"
                  />
                  <span className="about-proof-company">{outcome.company}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="about-story-cta">
          <Link to="/story" className="btn-ghost">
            Read our full story
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
