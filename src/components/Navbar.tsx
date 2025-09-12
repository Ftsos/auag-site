import React from "react";

const navItems = [
    { text: "Home", href: "#" },
    { text: "Get Involved", href: "#get-involved-alumni" },
    { text: "Participate", href: "#get-involved-students" },
    { text: "Our Projects", href: "#projects" },
    { text: "Upcoming Events", href: "#events" },
    { text: "Meet Our Team", href: "#meet-team" }
];

const Navbar: React.FC = () => (
    <nav className="w-screen py-4 px-8 flex justify-start items-center sticky top-0 z-50 shadow-md bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.7)]">
        <ul className="flex gap-8 list-none m-0 p-0 text-white">
            {navItems.map((item) => (
                <li key={item.text}>
                    <a
                        href={item.href}
                        className="no-underline text-lg tracking-wide"
                    >
                        {item.text}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navbar;