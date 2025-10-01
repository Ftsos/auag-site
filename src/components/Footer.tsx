import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer
            id="footer"
            className="w-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
            style={{
                height: '25vh',
                background: 'linear-gradient(to top, rgba(220, 38, 38, 0.8) 0%, rgba(0, 0, 0, 1) 100%)'
            }}
        >
            <div className="z-10 text-center relative text-white">
                <p className="text-xl font-semibold mb-4">Connect With Us</p>

                {/* Social icons row */}
                <div className="flex space-x-6 justify-center mb-4">
                    <a
                        href="https://www.instagram.com/auactiongroup/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-red-400 transition-colors"
                    >
                        <FaInstagram size={28} />
                    </a>
                </div>

                {/* Email below social icons */}
                <div className="mb-4">
                    <span className="text-sm md:text-base">
                        contact@auactiongroup.com
                    </span>
                </div>

                <p className="text-xs md:text-sm">
                    &copy; 2025 Andrews University Action Group. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
