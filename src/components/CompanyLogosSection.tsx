import { type CompanyLogosSectionProps } from '../types/companies';
import { companies } from '../data/companies';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CompanyLogosSection.css';

export const CompanyLogosSection: React.FC<CompanyLogosSectionProps> = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  
  // Create groups of 5 logos
  const logoGroups = [];
  for (let i = 0; i < companies.length; i += 5) {
    logoGroups.push(companies.slice(i, i + 5));
  }

  // Cycle through logo groups every 6 seconds
  useEffect(() => {
    console.log('Starting logo animation cycle, total groups:', logoGroups.length);
    const timer = setInterval(() => {
      setCurrentGroupIndex((prev) => {
        const next = (prev + 1) % logoGroups.length;
        console.log('Switching to logo group:', next);
        return next;
      });
    }, 6000);
    
    return () => clearInterval(timer);
  }, [logoGroups.length]);

  const currentLogos = logoGroups[currentGroupIndex] || [];

  console.log('Rendering CompanyLogosSection, current group:', currentGroupIndex, 'logos:', currentLogos.length);

  return (
    <section className="trusted-by">
      <h2>Representatives at companies like</h2>
      
      <div className="logo-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroupIndex}
            className="logo-row"
          >
            {currentLogos.map((company, index) => (
              <motion.img 
                key={`${currentGroupIndex}-${company.id}`}
                src={company.logo || ''} 
                alt={company.name}
                className={`logo-item logo-${index + 1}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Fill remaining slots if less than 5 logos */}
            {Array.from({ length: Math.max(0, 5 - currentLogos.length) }).map((_, index) => (
              <motion.div 
                key={`empty-${index}`} 
                className="logo-placeholder"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  delay: (currentLogos.length + index) * 0.2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
