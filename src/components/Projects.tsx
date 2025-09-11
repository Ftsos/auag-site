import React from 'react';
import '../styles/Projects.css';

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="min-h-screen w-screen flex flex-col items-center p-8 relative"
      style={{
        background: 'linear-gradient(to top, #000000 0%, #1a1a1a 20%, #4a4a4a 50%, #8a8a8a 80%, #f0f0f0 100%)'
      }}
    >
      <div className="z-10 text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{
          color: '#333',
          textShadow: '0 0 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.05)'
        }}>Our Projects</h2>
        <p className="max-w-4xl text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quidem. Dolor debitis, cum in iure, vero, quod iste ut illum facilis. Cumque, voluptatum. Quod, voluptate. Quos, voluptatibus. Consequatur, voluptatem!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
            Image Box 1
          </div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ducimus.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
            Image Box 2
          </div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptate.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
            Image Box 3
          </div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nemo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;