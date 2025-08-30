import { type CompanyLogosSectionProps } from '../types/companies';
import { companies } from '../data/companies';
import { useState, useEffect } from 'react';
import '../styles/CompanyLogosSection.css';

export const CompanyLogosSection: React.FC<CompanyLogosSectionProps> = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  
  // Create groups of 5 logos
  const logoGroups = [];
  for (let i = 0; i < companies.length; i += 5) {
    logoGroups.push(companies.slice(i, i + 5));
  }

  // Cycle through logo groups every 6 seconds (2s animation + 4s pause)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % logoGroups.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [logoGroups.length]);

  const currentLogos = logoGroups[currentGroupIndex] || [];

  return (
    <section className="trusted-by">
      <h2>Trusted by leading companies</h2>
      <div className="logo-slider">
        <div className="logo-row">
          {currentLogos.map((company, index) => (
            <img 
              key={`${currentGroupIndex}-${company.id}`}
              src={company.logo || ''} 
              alt={company.name}
              className={`logo-item logo-${index + 1}`}
            />
          ))}
          {/* Fill remaining slots if less than 5 logos */}
          {Array.from({ length: Math.max(0, 5 - currentLogos.length) }).map((_, index) => (
            <div key={`empty-${index}`} className="logo-placeholder" />
          ))}
        </div>
      </div>
    </section>
  );
};
