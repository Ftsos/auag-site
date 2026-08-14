import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/NotFound.css';
import { fadeRise, staggerParent } from '../utils/motion';

const NotFound: React.FC = () => {
  return (
    <main className="section-shell notfound">
      <motion.div
        variants={staggerParent()}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="micro-label" variants={fadeRise}>
          Page not found
        </motion.p>
        <motion.h1 className="display-heading notfound-heading" variants={fadeRise}>
          404<span className="notfound-dot">.</span>
        </motion.h1>
        <motion.p className="notfound-body" variants={fadeRise}>
          This page doesn't exist — the door you're looking for is probably one
          of these.
        </motion.p>
        <motion.div className="notfound-actions" variants={fadeRise}>
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/network" className="btn-ghost">
            The network
          </Link>
          <Link to="/story" className="btn-ghost">
            Our story
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default NotFound;
