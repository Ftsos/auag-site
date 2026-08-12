import { motion } from 'framer-motion';
import '../styles/MainText.css';
import Statistics from './Statistics';
import { FlowingLines } from './FlowingLines';
import { links } from '../data/links';
import { fadeRise, staggerParent } from '../utils/motion';

export const MainText: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <FlowingLines />
      <div className="hero-wash" aria-hidden="true" />

      <motion.div
        className="section-shell hero-inner"
        variants={staggerParent(0.09)}
        initial="hidden"
        animate="visible"
      >
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
    </section>
  );
};
