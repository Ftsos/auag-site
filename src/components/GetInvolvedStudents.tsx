import React from "react";
import { useState } from "react";
import "../styles/GetInvolved.css";

const GetInvolvedStudents: React.FC = () => {
    const [buttonPressed, setButtonPressed] = useState(false);

    const handleMouseDown = () => {
        setButtonPressed(true);
        const link = document.createElement('a');

        // Set its href attribute
        link.href = 'https://auagmembership.paperform.co/';
        link.target = '_blank'; // Open in a new tab
        link.rel = 'noopener noreferrer'; // Security reasons
        link.style.display = 'none'; // Hide the link

        // Append it to the document body (optional, if you want it visible)
        document.body.appendChild(link);

        // Programmatically click the link
        link.click();
    };

    const handleMouseUp = () => {
        setButtonPressed(false);
    };

    return (
        <section
            id="get-involved-students"
            className="min-h-screen w-screen flex flex-col justify-center items-center p-0 relative"
            style={{
                background: 'linear-gradient(to bottom, transparent 0%, transparent 10%, #000000 20%, #0a0a0a 25%, #1a1a1a 35%, #2a2a2a 50%, #4a4a4a 70%, #8a8a8a 85%, #f0f0f0 100%)'
            }}
        >
            <div className="z-10">
                <h2 className="text-4xl font-bold mb-6 text-white" style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
                }}>Student, Participate</h2>
                <p className="max-w-3xl text-center mb-8 text-gray-200" style={{
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
                }}>
                    <b>Your network starts here.</b>
                    <br />
                    By joining our club, you'll gain access to mentors, alumni, and peers who open doors to opportunities you can't find alone. Build connections, sharpen your skills, and step into a community that invests in your future. Don't just study for tomorrow, start shaping it today.                    
                    <br /><br />
                    <button 
                        className={`font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-110 ${buttonPressed ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        Join Us
                    </button>
                    <br /><br />

                </p>
            </div>
        </section>
    );
};

export default GetInvolvedStudents;