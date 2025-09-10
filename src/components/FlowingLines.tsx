import { motion } from 'framer-motion';
import '../styles/FlowingLines.css';

export const FlowingLines: React.FC = () => {
  return (
    <div className="flowing-lines">
      {/* Top-left lines */}
      <motion.div
        className="line-group top-left"
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"] // Larger movement
        }}
        transition={{
          duration: 25, // Slower duration
          ease: "linear",
          repeat: Infinity
        }}
      />
      {/* Bottom-left lines */}
      <motion.div
        className="line-group bottom-left"
        animate={{
          backgroundPosition: ["0px 0px", "-100px -100px"] // Larger movement
        }}
        transition={{
          duration: 30, // Slower duration
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      {/* Additional diagonal lines */}
      <motion.div
        className="diagonal-line-1"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            45deg,
            transparent 0px,
            transparent 45px,
            rgba(120, 120, 120, 0.6) 45px,
            rgba(120, 120, 120, 0.6) 47px
          )`,
          backgroundSize: '100px 100px', // Larger line size
          zIndex: -1
        }}
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"] // Matches background size
        }}
        transition={{
          duration: 35, // Slower duration
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      <motion.div
        className="diagonal-line-2"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            -45deg,
            transparent 0px,
            transparent 40px,
            rgba(80, 80, 80, 0.7) 40px,
            rgba(80, 80, 80, 0.7) 42px
          )`,
          backgroundSize: '90px 90px', // Larger line size
          zIndex: -1
        }}
        animate={{
          backgroundPosition: ["0px 0px", "-90px -90px"] // Matches background size
        }}
        transition={{
          duration: 40, // Slower duration
          ease: "linear",
          repeat: Infinity
        }}
      />
    </div>
  );
};