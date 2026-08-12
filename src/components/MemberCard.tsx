import React from 'react';
import { FaLinkedinIn, FaArrowRightLong } from 'react-icons/fa6';
import type { Person } from '../data/about';
import { getInitials } from '../utils/initials';

type MemberCardProps = {
  person: Person;
  featured?: boolean;
};

const MemberCard: React.FC<MemberCardProps> = ({ person, featured = false }) => {
  const isPlaceholder = person.name.toLowerCase() === 'placeholder';
  const hasOutcomes = !isPlaceholder && person.outcomes && person.outcomes.length > 0;
  const className = [
    'about-member-card',
    featured ? 'is-featured' : '',
    person.departed ? 'is-departed' : '',
    hasOutcomes ? 'has-outcomes' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={className}>
      {isPlaceholder && <span className="about-member-chip">Coming soon</span>}
      {!isPlaceholder && person.departed && (
        <span className="about-member-chip is-departed-chip">Moved on</span>
      )}

      {person.photo ? (
        <img
          className="about-member-photo"
          src={person.photo}
          alt={person.name}
          loading="lazy"
        />
      ) : (
        <div className="about-member-monogram" aria-hidden="true">
          {isPlaceholder ? '—' : getInitials(person.name)}
        </div>
      )}

      <div className="about-member-meta">
        <div className="about-member-role">{person.role}</div>
        <div className="about-member-name">
          {isPlaceholder ? 'Name coming soon' : person.name}
        </div>

        {hasOutcomes && (
          <ul className="about-member-outcomes" aria-label="Where they are now">
            {person.outcomes!.map((outcome) => {
              const detail = outcome.company ?? outcome.note;
              return (
                <li
                  key={`${outcome.role}-${detail ?? ''}`}
                  className="about-member-outcome"
                >
                  <FaArrowRightLong
                    className="about-member-outcome-arrow"
                    aria-hidden="true"
                  />
                  <span className="about-member-outcome-text">
                    <span className="about-member-outcome-role">{outcome.role}</span>
                    {detail && (
                      <>
                        <span className="about-member-outcome-sep">·</span>
                        <span className="about-member-outcome-company">
                          {detail}
                          {outcome.location && (
                            <span className="about-member-outcome-loc">
                              , {outcome.location}
                            </span>
                          )}
                        </span>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {person.linkedin && (
        <a
          className="about-member-linkedin"
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on LinkedIn`}
        >
          <FaLinkedinIn aria-hidden="true" />
        </a>
      )}
    </article>
  );
};

export default MemberCard;
