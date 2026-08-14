import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';
import { companies } from '../data/companies';
import type { Company, Industry } from '../types/companies';
import { networkStats } from '../data/stats';
import { links } from '../data/links';
import '../styles/Network.css';
import { fadeRise, VIEWPORT, VIEWPORT_TALL } from '../utils/motion';

/* Group companies by industry, largest group first. Static data, computed once. */
const groups: Array<{ industry: Industry; members: Company[] }> = (() => {
  const map = new Map<Industry, Company[]>();
  for (const company of companies) {
    const list = map.get(company.industry) ?? [];
    list.push(company);
    map.set(company.industry, list);
  }
  return Array.from(map.entries())
    .map(([industry, members]) => ({ industry, members }))
    .sort(
      (a, b) =>
        b.members.length - a.members.length ||
        a.industry.localeCompare(b.industry),
    );
})();

const Network: React.FC = () => {
  return (
    <div className="network-page">
      <main className="network-main">
        <div className="section-shell">
          <Link to="/" className="story-back-link network-back-link">
            <FaArrowLeft aria-hidden="true" />
            Back to home
          </Link>

          <motion.header
            className="network-header"
            variants={fadeRise}
            initial="hidden"
            animate="visible"
          >
            <h1 className="display-heading network-heading">
              The network, company by company.
            </h1>
            <p className="network-intro">
              These are the companies where alumni in the AUAG network work
              today — the rooms our students can get into because someone from
              Andrews is already there.
            </p>
          </motion.header>

          <motion.dl
            className="network-stats"
            aria-label="Network numbers"
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {networkStats.map((stat) => (
              <div className="network-stat" key={stat.label}>
                <dd className="stat-numeral">{stat.value}</dd>
                <dt className="micro-label">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>

          <div className="network-groups">
            {groups.map(({ industry, members }) => (
              <motion.section
                className="network-group"
                key={industry}
                aria-label={industry}
                variants={fadeRise}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_TALL}
              >
                <div className="network-group-head">
                  <h2 className="micro-label network-group-title">
                    {industry}
                  </h2>
                  <span className="network-group-count">{members.length}</span>
                  <span className="network-group-rule" aria-hidden="true" />
                </div>
                <ul className="network-grid">
                  {members.map((company) => (
                    <li
                      key={company.id}
                      className="network-chip"
                      tabIndex={0}
                      aria-label={company.name}
                    >
                      <img
                        src={company.logo}
                        alt=""
                        className={`network-chip-logo is-${company.logoTheme}`}
                        loading="lazy"
                      />
                      <span className="network-chip-name" aria-hidden="true">
                        {company.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          <motion.div
            className="network-cta card-surface"
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div>
              <h2 className="network-cta-heading">
                Your company belongs on this wall.
              </h2>
              <p className="network-cta-body">
                If you're an Andrews alum, the network is one form away — and
                every name on it opens a door for a student.
              </p>
            </div>
            <div className="network-cta-actions">
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
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Network;
