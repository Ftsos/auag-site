import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
            style={{
                height: '25vh', 
                background: 'linear-gradient(to top, rgba(220, 38, 38, 0.8) 0%, rgba(0, 0, 0, 1) 100%)'
            }}
        >
            <div className="z-10 text-center relative text-white">
                <p className="text-xl font-semibold mb-2">Connect With Us</p>
                <div className="flex space-x-4 justify-center mb-4">
                    <a href="#" className="hover:text-gray-300 transition-colors duration-300">Facebook</a>
                    <a href="#" className="hover:text-gray-300 transition-colors duration-300">Twitter</a>
                    <a href="#" className="hover:text-gray-300 transition-colors duration-300">LinkedIn</a>
                </div>
                <p>&copy; 2025 Andrews University Action Group. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;