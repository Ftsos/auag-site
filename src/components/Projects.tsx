import { motion } from 'framer-motion';
import '../styles/Projects.css';

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
          <p className="pillars-intro">
            Alumni already want to help. Our job is turning that interest into
            doors students actually walk through — four pillars carry the work.
          </p>

          <div className="pillars-rows">
            {pillars.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                className="pillar-row"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.07 }}
              >
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-body">{pillar.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
