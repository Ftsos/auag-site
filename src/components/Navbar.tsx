import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "../data/links";

type NavSubItem = { text: string; href: string | null; external?: boolean };
type NavItem = { text: string; href: string; subItems?: NavSubItem[] };

const navItems: NavItem[] = [
  {
    text: "Alumni",
    href: "/#join",
    subItems: [
      { text: "Join as alumni", href: links.alumniJoin, external: true },
      { text: "Giving Tuesday", href: links.givingTuesday, external: true },
    ],
  },
  {
    text: "Students",
    href: "/#join",
    subItems: [
      { text: "Register as student", href: links.studentApply, external: true },
    ],
  },
  { text: "Network", href: "/network" },
  { text: "About", href: "/#about" },
  { text: "Our Story", href: "/story" },
];

type NavbarProps = {
  onContactClick: () => void;
  /** Lets the app shell mark page content inert while the mobile menu is open. */
  onMenuOpenChange?: (open: boolean) => void;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const NavLink: React.FC<{
  href: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ href, external, className, onClick, children }) => {
  if (external || isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

/** Sub-item whose destination doesn't exist yet renders as a quiet "soon" row. */
const SubItemContent: React.FC<{
  subItem: NavSubItem;
  className: string;
  soonClassName: string;
  onClick?: () => void;
}> = ({ subItem, className, soonClassName, onClick }) => {
  if (!subItem.href) {
    return (
      <span className={soonClassName}>
        {subItem.text}
        <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-on-dark-muted">
          Soon
        </span>
      </span>
    );
  }
  return (
    <NavLink
      href={subItem.href}
      external={subItem.external}
      className={className}
      onClick={onClick}
    >
      {subItem.text}
    </NavLink>
  );
};

const Wordmark: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Link
    to="/#hero"
    onClick={onClick}
    className="font-wordmark text-[1.375rem] font-bold tracking-[-0.02em] text-white no-underline"
  >
    AU<span className="text-auag-red">AG</span>
  </Link>
);

const Navbar: React.FC<NavbarProps> = ({ onContactClick, onMenuOpenChange }) => {
  const [isMenuOpen, setIsMenuOpenState] = useState(false);
  const [openedItem, setOpenedItem] = useState<number | null>(null);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setIsMenuOpen = (open: boolean) => {
    setIsMenuOpenState(open);
    onMenuOpenChange?.(open);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onContactClick();
  };

  const isActive = (item: NavItem) =>
    !item.href.includes("#") && pathname === item.href;

  return (
    <>
      <nav
        className={`on-dark sticky top-0 z-50 flex h-16 w-full items-center justify-between px-6 transition-shadow duration-300 md:px-10 ${
          scrolled ? "shadow-[0_1px_0_0_var(--color-on-dark-hairline)]" : ""
        }`}
      >
        <Wordmark />

        {/* Desktop menu */}
        <ul className="m-0 hidden list-none items-center gap-7 p-0 md:flex">
          {navItems.map((item, index) => (
            <li
              key={item.text}
              className="relative"
              onMouseEnter={() => setOpenedItem(index)}
              onMouseLeave={() => setOpenedItem(null)}
              onFocus={() => setOpenedItem(index)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOpenedItem(null);
                }
              }}
            >
              <NavLink
                href={item.href}
                className={`flex items-center gap-1.5 text-[0.9375rem] font-medium no-underline transition-colors duration-150 ${
                  isActive(item)
                    ? "text-white"
                    : "text-on-dark-muted hover:text-white"
                }`}
              >
                {isActive(item) && (
                  <span
                    className="size-1.5 rounded-full bg-auag-red"
                    aria-hidden="true"
                  />
                )}
                {item.text}
              </NavLink>

              <AnimatePresence>
                {item.subItems && openedItem === index && (
                  <motion.div
                    className="absolute left-1/2 z-20 pt-3"
                    initial={{ opacity: 0, y: 6, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 6, x: "-50%" }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <ul className="m-0 w-52 list-none overflow-hidden rounded-[10px] border border-on-dark-hairline bg-frame-elevated p-1.5">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.text}>
                          <SubItemContent
                            subItem={subItem}
                            className="block rounded-[7px] px-3 py-2.5 text-sm font-medium text-on-dark-muted no-underline transition-colors duration-150 hover:bg-white/5 hover:text-white"
                            soonClassName="block cursor-default rounded-[7px] px-3 py-2.5 text-sm font-medium text-on-dark-muted"
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Contact Us (desktop) */}
        <div className="hidden justify-end md:flex">
          <button
            type="button"
            onClick={handleContactClick}
            className="btn-primary !py-2.5 !text-sm"
          >
            Contact us
          </button>
        </div>

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
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
        inert={!isMenuOpen}
        className={`on-dark fixed top-0 left-0 z-[60] flex h-dvh w-full transform flex-col items-start p-8 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex w-full items-center justify-between">
          <Wordmark onClick={() => setIsMenuOpen(false)} />
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
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

        <ul className="m-0 flex w-full list-none flex-col items-start gap-4 p-0">
          {navItems.map((item, index) => (
            <li
              key={item.text}
              className="w-full border-b border-on-dark-hairline py-2 last:border-b-0"
            >
              {item.subItems ? (
                <>
                  <div className="flex w-full items-center justify-between">
                    <NavLink
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-white no-underline"
                    >
                      {item.text}
                    </NavLink>
                    <button
                      onClick={() =>
                        setOpenMobileIndex(
                          openMobileIndex === index ? null : index
                        )
                      }
                      className="p-1 text-on-dark-muted"
                      aria-label={`Toggle ${item.text} submenu`}
                      aria-expanded={openMobileIndex === index}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform duration-300 ${
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

                  <div
                    className={`overflow-hidden transition-[max-height,margin] duration-300 ease-in-out ${
                      openMobileIndex === index ? "mt-2 max-h-40" : "max-h-0"
                    }`}
                  >
                    <ul className="m-0 list-none space-y-2 p-0 pl-4">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.text}>
                          <SubItemContent
                            subItem={subItem}
                            className="block font-medium text-on-dark-muted no-underline transition-colors duration-150 hover:text-white"
                            soonClassName="block cursor-default font-medium text-on-dark-muted"
                            onClick={() => setIsMenuOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <NavLink
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-white no-underline transition-colors duration-150 hover:text-on-dark-muted"
                >
                  {item.text}
                </NavLink>
              )}
            </li>
          ))}
          <li className="mt-4 w-full">
            <button
              type="button"
              onClick={handleContactClick}
              className="btn-primary w-full"
            >
              Contact us
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
