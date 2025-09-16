import React, { useState } from 'react';
import { FlowingLines } from './FlowingLines';
import '../styles/GetInvolved.css';

const GetInvolved: React.FC = () => {
    const [buttonPressed, setButtonPressed] = useState(false);

    const handleMouseDown = () => {
        setButtonPressed(true);
        const link = document.createElement('a');

        // Set its href attribute
        link.href = 'https://docs.google.com/forms/d/e/1FAIpQLSehFK92OiAgVwFDqZ0xH8jhHCOL77Qfvev7n1FF7EHaKB6w0w/viewform?usp=dialog';
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
            id="get-involved-alumni"
            className="min-h-screen w-screen flex flex-col justify-center items-center text-white p-0 relative"
        >
            <FlowingLines />
            <div className="z-10">
                <h2 className="text-4xl font-bold mb-6 text-shadow-glow">Get Involved</h2>
                <p className="max-w-3xl text-center mb-8">
                    <b> Your story hasn't ended, it lives on in the students who follow.</b>
                    <br />
                    As an alum, you have the power to inspire, to guide, and to open doors that shape futures. Whether through mentorship, offering internships, supporting research, or funding bold new ideas, your involvement creates opportunities students could never reach alone. You can light the path for tomorrow's leaders, create impact that endures far beyond today.                    <br /><br />
                    <button 
                        className={`font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-110 ${buttonPressed ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        // For a better user experience on mobile, also handle mouseleave
                        onMouseLeave={handleMouseUp}
                    >
                        Alumni Form
                    </button>
                    <br /><br />
                </p>
            </div>
        </section>
    );
};

export default GetInvolved;