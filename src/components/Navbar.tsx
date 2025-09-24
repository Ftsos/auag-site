import React, { useState } from "react";

interface SubItem {
  text: string;
  href: string;
}

interface NavItem {
  text: string;
  href?: string; // `href` is now optional for items with sub-items
  subItems?: SubItem[];
}


const navItems: NavItem[] = [
  { text: "Alumni", href: "#get-involved-alumni" },
{ text: "Students", href: "#get-involved-students" },
  { text: "About", href: "#footer" },
];


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);

  return (
    <>
      <nav className="w-screen py-4 px-8 flex justify-between items-center backdrop-blur-sm text-white relative z-10">
        <div className="flex items-center">
          {/* AUAG Logo */}
          <a
            href="#"
            className="text-3xl font-extrabold"
            style={{
              textShadow:
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)",
            }}
          >
            <span className="text-white">AU</span>
            <span
              className="text-red-600"
              style={{
                textShadow:
                  "0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.5)",
              }}
            >
              AG
            </span>
          </a>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navItems.map((item, index) => (
            <li
              key={item.text}
              className="relative px-2 -mx-2 py-1 -my-1" // 👈 bigger bounding box
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={item.href}
                className="no-underline text-lg tracking-wide hover:text-red-400 flex items-center"
              >
                {item.text}
                {item.subItems && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-red-600 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </a>

              {/* Submenu (state controlled, flicker-safe) */}
              {item.subItems && hoveredItem === index && (
                <div
                  className="absolute left-0 mt-1 z-20"
                  onMouseEnter={() => setHoveredItem(index)} // 👈 keeps it open
                  onMouseLeave={() => setHoveredItem(null)}  // 👈 closes only when leaving both
                >
                  <ul
                    className="w-40 bg-gray-800 text-white rounded shadow-lg
                               opacity-100 translate-y-0 transition-all duration-200 ease-in-out"
                  >
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.text}
                        className="py-2 px-2 hover:bg-gray-700"
                      >
                        <a
                          href={subItem.href}
                          className="block no-underline tracking-wide"
                        >
                          {subItem.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Contact Us (desktop) */}
        <div className="hidden md:flex justify-end">
          <a
            href="#footer"
            className="bg-red-600 text-white py-2 px-6 rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-[0_0_15px_rgba(220,38,38,0.7)]"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-gray-900 backdrop-blur-lg flex-col items-start p-8 transition-transform duration-300 ease-in-out z-[9999] transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex justify-between items-center mb-8">
          <a
            href="#"
            className="text-3xl font-extrabold"
            style={{
              textShadow:
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-white">AU</span>
            <span
              className="text-red-600"
              style={{
                textShadow:
                  "0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.5)",
              }}
            >
              AG
            </span>
          </a>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile nav list */}
        <ul className="w-full flex flex-col items-start gap-4">
          {navItems.map((item, index) => (
            <li
              key={item.text}
              className="w-full py-2 border-b border-gray-700 last:border-b-0"
            >
              {item.subItems ? (
                <>
                  {/* Parent row with chevron */}
                  <div className="flex justify-between items-center w-full">
                    <span className="text-white text-lg">{item.text}</span>
                    <button
                      onClick={() =>
                        setOpenMobileIndex(
                          openMobileIndex === index ? null : index
                        )
                      }
                      className="text-red-600 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openMobileIndex === index ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Animated dropdown */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openMobileIndex === index ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                  >
                    <ul className="pl-4 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.text}>
                          <a
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-white hover:text-red-400"
                          >
                            {subItem.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <a
                  onClick={() => setIsMenuOpen(false)}
                  href={item.href}
                  className="block text-white text-lg hover:text-red-400"
                >
                  {item.text}
                </a>
              )}
            </li>
          ))}
          <li className="w-full mt-2">
            <a
              onClick={() => setIsMenuOpen(false)}
              href="#footer"
              className="bg-red-600 text-white py-2 px-6 rounded-full font-bold hover:bg-red-700 transition duration-300 w-full text-left"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
