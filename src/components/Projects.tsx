import React from 'react';
import { FaLightbulb, FaUsers, FaBookOpen, FaHandsHelping } from 'react-icons/fa';
import '../styles/Projects.css';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, subtitle }) => (
  <div className="flex items-start mb-10 feature-item">
    <div className="text-white text-4xl mr-8 mt-1 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-white text-2xl font-bold mb-1 feature-title">
        {title}
      </h3>
      <p className="text-gray-300 text-lg feature-subtitle">
        {subtitle}
      </p>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const featuresData = [
    {
      icon: <FaLightbulb />,
      title: "AU Innovation & Entrepreneurship",
      subtitle: "Events, Sessions & Mentor Groups"
    },
    {
      icon: <FaUsers />,
      title: "Leadership Network",
      subtitle: "Co-op programs, key departments & partnerships"
    },
    {
      icon: <FaBookOpen />,
      title: "Experiential Opportunities",
      subtitle: "Becoming World Changers today and supporting others to do the same"
    },
    {
      icon: <FaHandsHelping />,
      title: "Community Development",
      subtitle: "Investors and mentors for Andrews startup founders."
    },
  ];

  return (
    <section
      id="projects-list-section"
      className="min-h-screen w-screen flex flex-col items-center py-20 px-4"
      style={{
        // Radial gradient for the background
        background: 'linear-gradient(to bottom, #000 0%, #5e0608 40%, #5e0608 60%, #000 100%)',
      }}
    >
      <div className="z-10 text-center mb-16 max-w-4xl w-full">
        <h2 className="text-6xl font-light text-white uppercase tracking-widest heading-projects">
          PROJECTS
        </h2>
      </div>

      <div className="w-full max-w-4xl text-left">
        {featuresData.map((item, index) => (
          <FeatureItem
            key={index}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;