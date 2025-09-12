import React from 'react';
import '../styles/MeetTeam.css';

const MeetTeam: React.FC = () => {
  return (
    <section
      id="meet-team"
      className="min-h-screen w-screen flex flex-col items-center justify-center p-8 relative"
      style={{
        background: `
          radial-gradient(circle at center, rgba(240, 240, 240, 0.7) 20%, rgba(138, 138, 138, 0.3) 30%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 1) 100%),
          linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 1) 15%)
        `
      }}
    >
      <div className="z-10 text-center relative max-w-5xl">
        <h2 className="text-4xl font-bold mb-4 text-black">Meet Our Team</h2>
        <p className="max-w-4xl text-gray-700 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, quas. Nostrum dicta cumque, natus libero molestias perferendis reiciendis!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Team Member Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black">John Doe</h3>
            <p className="text-gray-600">Position One</p>
          </div>
          
          {/* Team Member Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black">Jane Smith</h3>
            <p className="text-gray-600">Position Two</p>
          </div>

          {/* Team Member Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black">Peter Jones</h3>
            <p className="text-gray-600">Position Three</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;