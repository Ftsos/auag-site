import React from 'react';
import '../styles/Events.css';

const Events: React.FC = () => {
    return (
        <section
            id="events"
            className="min-h-screen w-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
        >
            {/* Moving points background */}
            <div className="moving-points-bg absolute top-0 left-0 w-full h-full overflow-hidden">
                {Array.from({ length: 150 }).map((_, i) => {
                    const x = Math.random();
                    const y = Math.random();
                    const speed = Math.random();
                    return (
                    <span
                        key={i}
                        className="point"
                        style={{ 
                            '--x': x, 
                            '--y': y, 
                            '--speed': speed 
                        } as React.CSSProperties}
                    ></span>
                    );
                    })}

            </div>

            <div className="z-10 text-center relative max-w-4xl">
                <h2 className="text-6xl font-light text-white uppercase tracking-widest mb-4">
                    UPCOMING EVENTS
                </h2>
                <p className="mb-12 text-gray-400">
                    Join us at our next events and be part of the community. We're excited to see you there!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 transition-transform duration-300 hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Event Title One</h3>
                        <p className="text-gray-500 mb-4">Location &bull; Date</p>
                        <p className="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 transition-transform duration-300 hover:scale-105">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Event Title Two</h3>
                        <p className="text-gray-500 mb-4">Location &bull; Date</p>
                        <p className="text-gray-400">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;
