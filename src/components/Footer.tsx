import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa6';
import { links } from '../data/links';
import '../styles/Footer.css';

const exploreLinks = [
  { label: 'What we do', to: '/#pillars' },
  { label: 'The network', to: '/network' },
  { label: 'About AUAG', to: '/#about' },
  { label: 'Join the network', to: '/#join' },
  { label: 'Upcoming events', to: '/#events' },
  { label: 'Our story', to: '/story' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="site-footer on-dark">
      <div className="section-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-wordmark">
              AU<span className="footer-wordmark-ag">AG</span>
            </div>
            <p className="footer-mission">
              The Andrews University Action Group. Connecting high-potential
              students with alumni who open doors — accelerating opportunity
              for both sides of the network.
            </p>
            <div className="footer-socials">
              <a
                className="footer-social"
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="micro-label footer-col-heading">Explore</h3>
            <ul className="footer-list">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <Link className="footer-link" to={l.to}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="micro-label footer-col-heading">Connect</h3>
            <ul className="footer-list">
              <li>
                <a
                  className="footer-link"
                  href={links.andrews}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Andrews University
                </a>
              </li>
              <li>
                <a className="footer-link" href={links.contactEmail}>
                  Contact AUAG
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href={links.alumniJoin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join as alumni
                </a>
              </li>
              <li>
                {links.studentApply ? (
                  <a
                    className="footer-link"
                    href={links.studentApply}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register as student
                  </a>
                ) : (
                  <span className="footer-link is-soon">
                    Student applications — soon
                  </span>
                )}
              </li>
              <li>
                <a
                  className="footer-link"
                  href={links.givingTuesday}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Giving Tuesday
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} Andrews University Action Group.</span>
          <span className="footer-bottom-meta">Accelerating opportunity</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
