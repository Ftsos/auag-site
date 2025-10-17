import React from "react";
import "../styles/MeetTeam.css";
import { Carousel } from "flowbite-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Chief Executive Officer",
    imageUrl: "https://via.placeholder.com/600x600?text=Alex+J",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Lead Developer",
    imageUrl: "https://via.placeholder.com/600x600?text=Sam+L",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Head of Design",
    imageUrl: "https://via.placeholder.com/600x600?text=Marcus+C",
  },
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, imageUrl }) => (
  <div className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
    <img
      src={imageUrl}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
      <h3 className="text-2xl font-bold text-white">{name}</h3>
      <p className="text-indigo-300 text-sm font-medium">{role}</p>
    </div>
  </div>
);

const MeetTeam: React.FC = () => {
  return (
    <section
      id="meet-team"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 bg-black overflow-hidden"
    >
      {/* White radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,rgba(0,0,0,1)_80%)] pointer-events-none"></div>

      <div className="z-10 text-center relative max-w-6xl w-full">
        <h2 className="text-6xl font-light text-white uppercase tracking-widest mb-4">
          MEET THE TEAM
        </h2>
        <p className="max-w-3xl text-gray-300 text-lg mx-auto mb-12">
            Placeholder
        </p>

        <div className="w-full max-w-3xl mx-auto">
          <div className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
            <Carousel slideInterval={3000}>
              {team.map((member) => (
                <TeamMemberCard key={member.id} {...member} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;
