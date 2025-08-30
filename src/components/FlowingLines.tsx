import { motion } from 'framer-motion';
import '../styles/FlowingLines.css';

export const FlowingLines: React.FC = () => {
  return (
    <div className="flowing-lines">
      <motion.div 
        className="line-group top-left"
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"]
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity
        }}
      />
      <motion.div 
        className="line-group bottom-left"
        animate={{
          backgroundPosition: ["0px 0px", "-60px -60px"]
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      {/* Additional diagonal lines with Framer Motion */}
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
            transparent 30px,
            rgba(120, 120, 120, 0.6) 30px,
            rgba(120, 120, 120, 0.6) 32px
          )`,
          backgroundSize: '80px 80px',
          zIndex: -1
        }}
        animate={{
          backgroundPosition: ["0px 0px", "80px 80px"]
        }}
        transition={{
          duration: 20,
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
            transparent 25px,
            rgba(80, 80, 80, 0.7) 25px,
            rgba(80, 80, 80, 0.7) 27px
          )`,
          backgroundSize: '70px 70px',
          zIndex: -1
        }}
        animate={{
          backgroundPosition: ["0px 0px", "-70px -70px"]
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity
        }}
      />
    </div>
  );
};
