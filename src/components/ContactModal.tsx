import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { links } from '../data/links';
import '../styles/ContactModal.css';
import { EASE_OUT } from '../utils/motion';

type Channel = {
  label: string;
  email: string;
  blurb: string;
};

const channels: Channel[] = [
  {
    label: 'General inquiries',
    email: links.contactEmail.replace('mailto:', ''),
    blurb: 'Anything you can\'t place elsewhere — we route it to the right desk.',
  },
  {
    label: 'Alumni relations',
    email: 'alumni@auactiongroup.com',
    blurb: 'Membership, mentorship, opening doors inside your company.',
  },
  {
    label: 'Student relations',
    email: 'students@auactiongroup.com',
    blurb: 'Applications, cohorts, finding a mentor or an internship.',
  },
  {
    label: 'Partnerships',
    email: 'partnerships@auactiongroup.com',
    blurb: 'Companies, university partners, and project collaborations.',
  },
  {
    label: 'Press & media',
    email: 'press@auactiongroup.com',
    blurb: 'Interview requests, coverage, and speaking invitations.',
  },
];

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    const { style } = document.body;
    const prevOverflow = style.overflow;
    style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-heading"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="contact-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <button
              type="button"
              ref={closeRef}
              className="contact-close"
              onClick={onClose}
              aria-label="Close contact panel"
            >
              <FaXmark aria-hidden="true" />
            </button>

            <div className="contact-head">
              <h2 id="contact-modal-heading" className="contact-heading">
                How can we help?
              </h2>
              <p className="contact-sub">
                Pick the lane that fits your question. Every address lands with
                the right person at AUAG — we'll reply within a couple of
                working days.
              </p>
            </div>

            <ul className="contact-channels">
              {channels.map((channel) => (
                <li key={channel.email}>
                  <a
                    className="contact-channel"
                    href={`mailto:${channel.email}`}
                  >
                    <div className="contact-channel-top">
                      <span className="contact-channel-label">
                        {channel.label}
                      </span>
                      <FaArrowUpRightFromSquare
                        className="contact-channel-arrow"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="contact-channel-email">
                      {channel.email}
                    </span>
                    <span className="contact-channel-blurb">
                      {channel.blurb}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
