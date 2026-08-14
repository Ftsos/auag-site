import '../styles/FlowingLines.css';

/**
 * Ambient hero texture: two slow-drifting diagonal hairline layers on the
 * warm canvas. Pure CSS animation (house rule for background motion);
 * disabled under prefers-reduced-motion.
 */
export const FlowingLines: React.FC = () => (
  <div className="flowing-lines" aria-hidden="true">
    <div className="flow-layer flow-layer-a" />
    <div className="flow-layer flow-layer-b" />
  </div>
);
