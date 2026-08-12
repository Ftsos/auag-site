import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import '../styles/MainText.css';
import Statistics from './Statistics';
import Photo from './Photo';
import { photos } from '../data/photos';
import { links } from '../data/links';
import { fadeRise, staggerParent } from '../utils/motion';

export const MainText: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // The photo drifts slower than the scroll — depth without scroll-jacking.
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <motion.div
        className="hero-photo"
        style={prefersReducedMotion ? undefined : { y: photoY }}
        aria-hidden="true"
      >
        <Photo photo={photos.hero} sizes="100vw" priority />
      </motion.div>
      <div className="hero-wash" aria-hidden="true" />

      <motion.div
        className="section-shell hero-inner"
        variants={staggerParent(0.09)}
        initial="hidden"
        animate="visible"
      >
        {/* Flagship-event teaser — facts match Events.tsx (HPAC contract). */}
        <motion.div variants={fadeRise}>
          <Link to="/#events" className="hero-event-chip">
            <span className="hero-event-date">Sept 25</span>
            <span className="hero-event-name">
              Legacy: An AUAG Alumni Series
            </span>
            <span className="hero-event-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>

        <motion.p className="eyebrow" variants={fadeRise}>
          Andrews University Action Group
        </motion.p>

        <motion.h1 className="hero-logo" variants={fadeRise}>
          AU<span className="hero-logo-ag">AG</span>
        </motion.h1>

        <motion.h2 className="hero-tagline" variants={fadeRise}>
          Accelerating opportunity<span className="hero-tagline-dot">.</span>
        </motion.h2>

        <motion.p className="hero-body" variants={fadeRise}>
          AUAG is the network that brings high-potential Andrews University
          students and alumni together. We treat every conversation as a door
          worth opening — for mentorship, for ventures, for the long career
          ahead.
        </motion.p>

        <motion.div className="hero-cta-row" variants={fadeRise}>
          <a
            className="btn-primary"
            href={links.alumniJoin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join as alumni
          </a>
          {links.studentApply ? (
            <a
              className="btn-ghost"
              href={links.studentApply}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply as student
            </a>
          ) : (
            <span className="btn-soon">Student applications open soon</span>
          )}
        </motion.div>

        <motion.div className="hero-stats" variants={fadeRise}>
          <Statistics />
        </motion.div>
      </motion.div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="micro-label">Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
};
