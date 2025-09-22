import React from "react";

const navItems = [
  { text: "Alumni", href: "#", subItems: [{ text: "Alumni Link 1", href: "#alumni-link1" }] },
  { text: "Students", href: "#", subItems: [{ text: "Students Link 1", href: "#students-link1" }] },
  { text: "About", href: "#about" },
];

const Navbar: React.FC = () => (
  <nav className="w-screen py-4 px-8 flex justify-between items-center backdrop-blur-sm text-white">
    <div className="flex items-center">
      <div className="text-3xl font-extrabold" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)' }}>
        <span className="text-white">AU</span>
        <span className="text-red-600" style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.5)' }}>AG</span>
      </div>
    </div>

    <ul className="flex gap-8 list-none m-0 p-0">
      {navItems.map((item) => (
        <li key={item.text} className="relative group flex items-center">
          <a
            href={item.href}
            className="no-underline text-lg tracking-wide hover:text-red-400"
          >
            {item.text}
          </a>
          {item.subItems && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-600 ml-1">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <ul className="absolute hidden group-hover:block bg-gray-800 text-white mt-2 p-2 rounded shadow-lg w-40 top-full">
                {item.subItems.map((subItem) => (
                  <li key={subItem.text} className="py-2 px-2 hover:bg-gray-700">
                    <a href={subItem.href} className="block no-underline tracking-wide">
                      {subItem.text}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>

    <div className="flex justify-end">
      <button className="bg-red-600 text-white py-2 px-6 rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-[0_0_15px_rgba(220,38,38,0.7)]">
        Contact Us
      </button>
    </div>
  </nav>
);

export default Navbar;