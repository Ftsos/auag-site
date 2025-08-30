import React, { useState } from 'react';
import { FlowingLines } from './FlowingLines';
import '../styles/GetInvolved.css';

const GetInvolved: React.FC = () => {
    const [buttonPressed, setButtonPressed] = useState(false);

    const handleMouseDown = () => {
        setButtonPressed(true);
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore repellat, laudantium minima nemo quis placeat et quasi mollitia, alias veritatis impedit porro esse blanditiis autem expedita voluptas in dolores dolor.
                    <br /><br />
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
                    <a href="#">Learn More</a>
                </p>
            </div>
        </section>
    );
};

export default GetInvolved;