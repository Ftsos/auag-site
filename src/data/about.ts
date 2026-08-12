/**
 * The AUAG timeline — chapters, officers, and career outcomes.
 * Names and facts follow AUAG-claude/AUAG-CONTEXT.md (the canonical org
 * doc). Never publish invented people, roles, or outcomes.
 *
 * Photos: drop headshots into public/team/ as kebab-case `first-last.jpg`
 * and set `photo: '/team/first-last.jpg'` on the matching person. Anyone
 * without a photo renders an initials monogram automatically.
 */
export type Outcome = {
  role: string;
  /** Employer — omit when the outcome isn't tied to a named company. */
  company?: string;
  /** Short human context shown when there's no company name. */
  note?: string;
  location?: string;
  type: 'full-time' | 'part-time' | 'internship' | 'founded';
  year?: string;
};

export type Person = {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
  bio?: string;
  outcomes?: Outcome[];
  departed?: boolean;
};

export type SignatureEvent = {
  name: string;
  date: string;
  description: string;
};

export type Chapter = {
  id: 'foundation' | '2024-2025' | '2025-2026' | 'now';
  yearLabel: string;
  title: string;
  narrative: string;
  events?: SignatureEvent[];
  advisor?: Person;
  officers: Person[];
};

const facultyAdvisor: Person = {
  name: 'Dr. Matías Soto',
  role: 'Faculty Advisor — the through-line',
  bio: "Dr. Soto's faculty work pre-dated AUAG and has anchored every chapter of it since. The constant across founders, presidents, and cohorts.",
};

export const chapters: Chapter[] = [
  {
    id: 'foundation',
    yearLabel: '2024',
    title: 'Foundation',
    narrative:
      'Before AUAG had a name, Dr. Matías Soto was already laying the faculty and advisory groundwork that made it possible. In 2024, Kato Golooba-Mutebi founded AUAG with Brooke as co-founder — a small group with a sharp thesis: turn the Andrews alumni network into something that actually moves students forward.',
    advisor: facultyAdvisor,
    officers: [
      {
        name: 'Kato Golooba-Mutebi',
        role: 'Founder',
        bio: 'Started AUAG in 2024 to turn the Andrews alumni network into an active engine for student opportunity, not a contact list that lives in a brochure.',
      },
      {
        // TODO(Enzo): surname
        name: 'Brooke',
        role: 'Co-founder',
        bio: 'Built the operational spine of AUAG alongside Kato — partnerships, programming, and the first round of student officers.',
      },
    ],
  },
  {
    id: '2024-2025',
    yearLabel: '2024 – 2025',
    title: 'First chapter',
    narrative:
      'The founding cohort built the first real programming — two events that put AUAG on the map at Andrews and made the alumni-to-student bridge tangible for the first time. By the end of the year, the first officer had already converted the network into a full-time placement.',
    events: [
      {
        name: 'The HYVE Conference',
        date: 'Spring 2025',
        description:
          'AUAG-organized conference held at Andrews University. The first major outward-facing program AUAG put together — Kato, Brooke, and Dr. Soto on the build team.',
      },
      {
        name: 'Leaders-to-Leaders',
        date: 'Spring 2025',
        description:
          'Four alumni returned to campus on a Friday afternoon to give talks. The first event AUAG led end-to-end on its own.',
      },
    ],
    officers: [
      {
        name: 'Kato Golooba-Mutebi',
        role: 'President',
        departed: true,
      },
      {
        // TODO(Enzo): surname
        name: 'Brooke',
        role: 'Co-founder',
        departed: true,
        outcomes: [
          {
            role: 'Project Manager',
            company: 'Tyton Holdings',
            location: 'Dallas',
            type: 'full-time',
            year: '2025',
          },
        ],
      },
      {
        name: 'Jaden Pailing',
        role: 'Community Development',
      },
      {
        name: 'Edward Cervantes',
        role: 'Treasurer',
      },
      {
        name: 'Sara Rubio',
        role: 'Event Coordinator',
      },
    ],
  },
  {
    id: '2025-2026',
    yearLabel: '2025 – 2026',
    title: 'Second chapter',
    narrative:
      'Andrew Dombrowski stepped in as president, with Kato moving into a background advisory role. The team expanded beyond the founding officers — adding marketing, production, and technical capacity to scale what the first chapter had proven. By February 2026, two more officers had departed AUAG for the careers it opened up for them.',
    officers: [
      {
        name: 'Andrew Dombrowski',
        role: 'President',
        departed: true,
        outcomes: [
          {
            role: 'Real Estate Associate',
            company: 'Timothy Dockerty',
            type: 'part-time',
            year: '2026',
          },
        ],
      },
      {
        name: 'Edward Cervantes',
        role: 'Treasurer',
        departed: true,
        outcomes: [
          {
            role: 'Accountant',
            company: 'North American Division (NAD)',
            type: 'part-time',
            year: '2026',
          },
        ],
      },
    ],
  },
  {
    id: 'now',
    yearLabel: 'Spring 2026 →',
    title: 'Now',
    narrative:
      'When Andrew stepped down in February 2026 to take on his real estate role, Enzo Bacchiocchi took the presidency and is continuing into the next academic year. The current team is the fullest AUAG has fielded — five officers carrying the network into its biggest year yet.',
    officers: [
      {
        name: 'Enzo Bacchiocchi',
        role: 'President',
        outcomes: [
          {
            role: 'Founder',
            company: 'Vantage AI',
            type: 'founded',
            year: '2026',
          },
          {
            role: 'Finance Intern',
            company: 'AdventHealth',
            type: 'internship',
            year: '2026',
          },
        ],
      },
      {
        name: 'Jenny Rothermel',
        role: 'Vice President',
      },
      {
        name: 'Jaden Pailing',
        role: 'Community Development',
        outcomes: [
          {
            role: 'Accounting Intern',
            company: 'Crowe',
            type: 'internship',
            year: '2026',
          },
        ],
      },
      {
        name: 'Fabricio Rivera',
        role: 'Head of Development',
      },
      {
        name: 'Denisse Rivera',
        role: 'Community Relations',
      },
    ],
  },
];

export const founders = chapters[0].officers;
export const foundationAdvisor = chapters[0].advisor;

type OutcomeEntry = {
  person: Person;
  outcome: Outcome;
  chapterId: Chapter['id'];
};

const seen = new Set<string>();
export const outcomes: OutcomeEntry[] = chapters
  .flatMap((chapter) =>
    chapter.officers
      .filter((officer) => officer.outcomes && officer.outcomes.length > 0)
      .flatMap((officer) =>
        officer.outcomes!.map((outcome) => ({
          person: officer,
          outcome,
          chapterId: chapter.id,
        })),
      ),
  )
  .filter((entry) => {
    const key = `${entry.person.name}__${entry.outcome.company ?? entry.outcome.note ?? ''}__${entry.outcome.role}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
