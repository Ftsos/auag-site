import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <main
      className="section-shell"
      style={{ paddingBlock: 'var(--spacing-section)' }}
    >
      <h1
        className="display-heading"
        style={{ fontSize: 'var(--text-display)' }}
      >
        404<span style={{ color: 'var(--color-auag-red)' }}>.</span>
      </h1>
      <p
        style={{
          color: 'var(--color-ink-secondary)',
          maxWidth: '36em',
          lineHeight: 1.7,
          margin: '1rem 0 0',
        }}
      >
        This page doesn't exist — the door you're looking for is probably one
        of these.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: '2rem',
        }}
      >
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/network" className="btn-ghost">
          The network
        </Link>
        <Link to="/story" className="btn-ghost">
          Our story
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
