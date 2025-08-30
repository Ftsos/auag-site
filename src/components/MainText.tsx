import { motion } from 'framer-motion';
import '../styles/MainText.css';

export const MainText: React.FC = () => {
  return (
    <motion.div 
      className="main-text"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 className="title">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        >
          Join
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        >
          the
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        >
          AU<span className="red-text">AG</span>
        </motion.div>
      </motion.h1>
      <motion.div 
        className="accent-line"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 100, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
};
