import { motion } from 'framer-motion';
import '../styles/MainText.css';
import Statistics from './Statistics';

export const MainText: React.FC = () => {
  return (
    <motion.div
      // Tailwind classes for desktop layout and base styles
      className="flex flex-col items-center justify-center text-center text-white p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* AUAG Logo Section */}
      <motion.div
        // Tailwind classes for desktop font size
        className="main-logo text-7xl font-extrabold mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <span className="text-white">AU</span>
        <span className="text-red-600" style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.5)' }}>AG</span>
      </motion.div>

      {/* Bar Section */}
      <motion.div
        className="w-48 h-1 bg-red-600 mb-8"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "12rem", opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      />

      {/* Title, Text, and Button Section */}
      <motion.div
        className="max-w-3xl flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          // Tailwind classes for desktop font size
          className="main-title text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          ACCELERATING OPPORTUNITY
        </motion.h1>

        <motion.p
          // Tailwind classes for desktop font size and padding
          className="main-paragraph text-lg mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          We are the platform that brings highly talented students and alums together to create outsized outcomes. We see every conversation as an opportunity to change the future.
        </motion.p>

        <motion.button
          // Tailwind classes for desktop padding and font size
          className="main-button bg-red-600 text-white py-3 px-8 rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-[0_0_15px_rgba(220,38,38,0.7)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          Learn More
        </motion.button>

        <Statistics />
      </motion.div>
    </motion.div>
  );
};