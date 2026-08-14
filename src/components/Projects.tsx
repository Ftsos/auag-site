import { motion } from 'framer-motion';
import '../styles/Projects.css';
import Photo from './Photo';
import { photos } from '../data/photos';
import { photoReveal, slideIn, staggerParent, VIEWPORT } from '../utils/motion';

type Pillar = {
  title: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    title: 'Leadership Network',
    body: 'Alumni across industries mentoring the next generation. Long-term relationships and warm introductions, not one-off coffees or cold emails.',
  },
  {
    title: 'Experiential Opportunities',
    body: 'Real projects, real stakes. Internships, fellowships, and on-the-ground work with partners who want to see Andrews talent up close.',
  },
  {
    title: 'AU Innovation & Entrepreneurship',
    body: 'Founders and operators building what comes next. Structured pathways from classroom idea to first customer, backed by alumni who have been through it.',
  },
  {
    title: 'Community Development',
    body: 'A compounding network. Every cohort strengthens the ones that follow — and every alumnus gets pulled back in when a student needs them.',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="pillars" className="pillars-section">
      <div className="section-shell">
        <div className="section-head">
          <div className="section-head-row">
            <h2 className="display-heading section-heading">
              From interest to execution.
            </h2>
            <span className="section-meta">What we do</span>
          </div>
        </div>

        <div className="pillars-split">
          <div className="pillars-aside">
            <p className="pillars-intro">
              Alumni already want to help. Our job is turning that interest
              into doors students actually walk through — four pillars carry
              the work.
            </p>
            <motion.figure
              className="pillars-photo photo-frame"
              variants={photoReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <Photo
                photo={photos.pillars}
                sizes="(max-width: 820px) 100vw, 34vw"
              />
            </motion.figure>
          </div>

          <motion.div
            className="pillars-rows"
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {pillars.map((pillar) => (
              <motion.article
                key={pillar.title}
                className="pillar-row"
                variants={slideIn}
              >
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-body">{pillar.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
