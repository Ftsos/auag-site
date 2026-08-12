import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { links } from '../data/links';
import '../styles/TwoPaths.css';
import Photo from './Photo';
import { photos } from '../data/photos';
import { fadeRise, staggerParent, VIEWPORT } from '../utils/motion';

const TwoPaths: React.FC = () => {
  return (
    <section id="join" className="two-paths">
      <div className="section-shell">
        <div className="section-head">
          <div className="section-head-row">
            <h2 className="display-heading section-heading">Two ways in.</h2>
            <span className="section-meta">Join the network</span>
          </div>
        </div>

        <motion.div
          className="two-paths-panel"
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.div
            className="path-side path-side--alumni on-dark"
            variants={fadeRise}
          >
            <div className="path-photo" aria-hidden="true">
              <Photo
                photo={photos.twoPathsAlumni}
                sizes="(max-width: 820px) 100vw, 60vw"
              />
            </div>
            <span className="path-label">For alumni</span>
            <h3 className="path-heading">Lead. Mentor. Build.</h3>
            <p className="path-body">
              Return what was given to you. Join the network of Andrews alumni
              actively mentoring students, opening doors inside your company,
              and building ventures alongside the next generation of founders.
            </p>
            <dl className="path-meta">
              <div className="path-meta-item">
                <dt>Commitment</dt>
                <dd>~2 hrs / month</dd>
              </div>
              <div className="path-meta-item">
                <dt>Format</dt>
                <dd>1:1 + group sessions</dd>
              </div>
            </dl>
            <a
              className="btn-primary path-cta"
              href={links.alumniJoin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join as alumni
              <FaArrowRight className="path-cta-arrow" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            className="path-side path-side--students"
            variants={fadeRise}
          >
            <span className="path-label">For students</span>
            <h3 className="path-heading">Build your future.</h3>
            <p className="path-body">
              You don't have to figure it out alone. Get matched with an alumni
              mentor, join founder cohorts, and find internships through a
              network built specifically for Andrews University students.
            </p>
            <dl className="path-meta">
              <div className="path-meta-item">
                <dt>Eligibility</dt>
                <dd>Current AU students</dd>
              </div>
              <div className="path-meta-item">
                <dt>Cohorts</dt>
                <dd>Rolling admission</dd>
              </div>
            </dl>
            {links.studentApply ? (
              <a
                className="btn-primary path-cta"
                href={links.studentApply}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply as student
                <FaArrowRight className="path-cta-arrow" aria-hidden="true" />
              </a>
            ) : (
              <span className="btn-soon path-cta">
                Applications opening soon
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoPaths;
