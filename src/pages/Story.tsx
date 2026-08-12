import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRightLong } from 'react-icons/fa6';
import MemberCard from '../components/MemberCard';
import { getInitials } from '../utils/initials';
import { chapters, outcomes } from '../data/about';
import type { Chapter, Person } from '../data/about';
import '../styles/About.css';
import '../styles/Story.css';

const FoundationFeatured: React.FC<{ advisor: Person }> = ({ advisor }) => (
  <article className="story-advisor-card card-surface">
    {advisor.photo ? (
      <img
        className="about-founder-photo"
        src={advisor.photo}
        alt={advisor.name}
        loading="lazy"
      />
    ) : (
      <div className="about-founder-monogram" aria-hidden="true">
        {getInitials(advisor.name)}
      </div>
    )}
    <div className="story-advisor-meta">
      <span className="micro-label">{advisor.role}</span>
      <h3 className="about-founder-name">{advisor.name}</h3>
      {advisor.bio && <p className="about-founder-bio">{advisor.bio}</p>}
    </div>
  </article>
);

const FoundersGrid: React.FC<{ officers: Person[] }> = ({ officers }) => (
  <div className="about-founders-grid">
    {officers.map((person) => (
      <article key={person.name} className="about-founder-card card-surface">
        {person.photo ? (
          <img
            className="about-founder-photo"
            src={person.photo}
            alt={person.name}
            loading="lazy"
          />
        ) : (
          <div className="about-founder-monogram" aria-hidden="true">
            {getInitials(person.name)}
          </div>
        )}
        <div className="about-founder-meta">
          <span className="micro-label">{person.role}</span>
          <h3 className="about-founder-name">{person.name}</h3>
          {person.bio && <p className="about-founder-bio">{person.bio}</p>}
          {person.linkedin && (
            <a
              className="about-founder-link"
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>
      </article>
    ))}
  </div>
);

const EventsStrip: React.FC<{ events: NonNullable<Chapter['events']> }> = ({
  events,
}) => (
  <div className="story-events-grid">
    {events.map((event) => (
      <article key={event.name} className="story-event-card card-surface">
        <span className="micro-label">{event.date}</span>
        <h4 className="story-event-name">{event.name}</h4>
        <p className="story-event-desc">{event.description}</p>
      </article>
    ))}
  </div>
);

const ChapterBlock: React.FC<{ chapter: Chapter; index: number }> = ({
  chapter,
  index,
}) => {
  const isFoundation = chapter.id === 'foundation';
  const isCurrent = chapter.id === 'now';
  const kicker = `${String(index + 1).padStart(2, '0')} / ${chapter.title}`;

  return (
    <section
      className={`story-chapter${isCurrent ? ' is-current' : ''}`}
      aria-labelledby={`chapter-${chapter.id}-heading`}
    >
      <header className="story-chapter-head">
        <span className="micro-label story-chapter-kicker">{kicker}</span>
        <div className="story-chapter-title-row">
          <h2
            id={`chapter-${chapter.id}-heading`}
            className="story-chapter-heading"
          >
            {chapter.title}
          </h2>
          <span className="story-chapter-year">{chapter.yearLabel}</span>
          {isCurrent && <span className="story-chapter-pulse">Active now</span>}
        </div>
      </header>

      <p className="story-chapter-narrative">{chapter.narrative}</p>

      {isFoundation && chapter.advisor && (
        <FoundationFeatured advisor={chapter.advisor} />
      )}

      {isFoundation ? (
        <FoundersGrid officers={chapter.officers} />
      ) : (
        <>
          {chapter.events && chapter.events.length > 0 && (
            <div className="story-events-block">
              <span className="micro-label story-subkicker">
                Signature events
              </span>
              <EventsStrip events={chapter.events} />
            </div>
          )}

          <div className="story-officers-block">
            <span className="micro-label story-subkicker">
              {isCurrent ? 'Current officers' : 'Officers'}
            </span>
            <div className="story-officers-grid">
              {chapter.officers.map((person) => (
                <MemberCard
                  key={`${chapter.id}-${person.role}-${person.name}`}
                  person={person}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const OutcomeTypeLabel: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  internship: 'Internship',
  founded: 'Founded',
};

const OutcomesBoard: React.FC = () => (
  <section className="story-outcomes" aria-labelledby="outcomes-heading">
    <header className="story-outcomes-head">
      <span className="micro-label story-chapter-kicker">
        05 / Where they are now
      </span>
      <h2 id="outcomes-heading" className="display-heading story-outcomes-heading">
        The proof.
      </h2>
      <p className="story-outcomes-sub">
        Every active and former officer, and the role AUAG opened up for them.
      </p>
    </header>

    <ol className="story-outcomes-grid">
      {outcomes.map(({ person, outcome }, idx) => {
        const detail = outcome.company ?? outcome.note;
        return (
          <li
            key={`${person.name}-${detail ?? ''}-${outcome.role}`}
            className="story-outcome-row"
          >
            <span className="story-outcome-index">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="story-outcome-person">
              <span className="story-outcome-name">{person.name}</span>
              <span className="story-outcome-auag-role">
                {person.role} · AUAG
              </span>
            </div>
            <span className="story-outcome-arrow" aria-hidden="true">
              <FaArrowRightLong />
            </span>
            <div className="story-outcome-dest">
              <span className="story-outcome-dest-role">{outcome.role}</span>
              {detail && (
                <span className="story-outcome-dest-company">
                  {detail}
                  {outcome.location && (
                    <span className="story-outcome-dest-loc">
                      , {outcome.location}
                    </span>
                  )}
                </span>
              )}
            </div>
            <span
              className={`story-outcome-tag is-${outcome.type}`}
              title={OutcomeTypeLabel[outcome.type]}
            >
              {OutcomeTypeLabel[outcome.type]}
              {outcome.year && (
                <span className="story-outcome-year"> · {outcome.year}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  </section>
);

const Story: React.FC = () => {
  return (
    <div className="story-page">
      <main className="story-main">
        <div className="section-shell story-inner">
          <Link to="/" className="story-back-link">
            <FaArrowLeft aria-hidden="true" />
            Back to home
          </Link>

          <header className="story-header">
            <h1 className="display-heading story-heading">
              Built by Andrews. <br />
              Where Andrews leads.
            </h1>
            <p className="about-body">
              AUAG was built to turn the alumni network into careers — not a
              brochure, not a contact list. The proof is what's happened to the
              officers who built it. Here's how the story has run, chapter by
              chapter, with the placements those chapters produced.
            </p>
          </header>

          <div className="story-chapters">
            {chapters.map((chapter, idx) => (
              <ChapterBlock key={chapter.id} chapter={chapter} index={idx} />
            ))}
          </div>

          <OutcomesBoard />
        </div>
      </main>
    </div>
  );
};

export default Story;
