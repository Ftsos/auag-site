import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { heroStats, type Stat } from '../data/stats';

/**
 * The hero's proof line — canonical numbers set as one editorial sentence,
 * not a counter grid.
 */
const Statistics: React.FC = () => {
  return (
    <p className="hero-proof-line">
      {heroStats.map((stat, i) => (
        <span key={stat.label} className="hero-proof-item">
          {i > 0 && (
            <span className="hero-proof-sep" aria-hidden="true">
              ·
            </span>
          )}
          <StatNumber value={stat.value} label={stat.label} />
        </span>
      ))}
    </p>
  );
};

const StatNumber: React.FC<Stat> = ({ value, label }) => {
  const match = /^(\d+)(\+?)$/.exec(value);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match?.[2] ?? '';

  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: setCount,
    });
    return () => controls.stop();
  }, [inView, target, prefersReducedMotion]);

  return (
    <span ref={ref} className="hero-proof-stat">
      <span className="hero-proof-numeral">
        {target === null ? value : `${Math.round(count)}${suffix}`}
      </span>{' '}
      <span className="hero-proof-label">{label.toLowerCase()}</span>
    </span>
  );
};

export default Statistics;
