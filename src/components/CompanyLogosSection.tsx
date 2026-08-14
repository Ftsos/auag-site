import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type Company } from '../types/companies';
import { companies } from '../data/companies';
import '../styles/CompanyLogosSection.css';
import { fadeIn, VIEWPORT } from '../utils/motion';

const halfIndex = Math.ceil(companies.length / 2);
const rowA = companies.slice(0, halfIndex);
const rowB = companies.slice(halfIndex);
const industryCount = new Set(companies.map((c) => c.industry)).size;

type MarqueeRowProps = {
  logos: Company[];
  direction: 'left' | 'right';
  rowId: string;
};

const MarqueeRow: React.FC<MarqueeRowProps> = ({ logos, direction, rowId }) => (
  <div className="marquee-track-shell">
    <div className={`marquee-track marquee-track--${direction}`}>
      {[...logos, ...logos].map((company, i) => (
        <div
          key={`${rowId}-${company.id}-${i}`}
          className="marquee-item"
          title={company.name}
          aria-hidden={i >= logos.length}
        >
          <img
            src={company.logo}
            alt={i < logos.length ? company.name : ''}
            className={`marquee-logo is-${company.logoTheme}`}
          />
        </div>
      ))}
    </div>
  </div>
);

export const CompanyLogosSection: React.FC = () => {
  return (
    <section
      className="proof-section on-dark"
      aria-label="Companies where alumni in the network work"
    >
      <div className="section-shell">
        <motion.div
          className="section-head"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="section-head-row">
            <h2 className="display-heading section-heading">
              Where the network shows up
            </h2>
            <span className="section-meta">
              {companies.length} companies · {industryCount} industries
            </span>
          </div>
          <p className="section-sub">
            A cross-section of the companies where Andrews alumni in our network
            work — and where we open doors for the next cohort.
          </p>
        </motion.div>
      </div>

      <div className="proof-marquees">
        <MarqueeRow logos={rowA} direction="left" rowId="row-a" />
        <MarqueeRow logos={rowB} direction="right" rowId="row-b" />
      </div>

      <div className="section-shell proof-cta-row">
        <Link to="/network" className="btn-ghost">
          Explore the network
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};
