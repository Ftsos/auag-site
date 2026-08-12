import { MainText } from '../components/MainText';
import { CompanyLogosSection } from '../components/CompanyLogosSection';
import TwoPaths from '../components/TwoPaths';
import Projects from '../components/Projects';
import Events from '../components/Events';
import About from '../components/About';

const Home: React.FC = () => {
  return (
    <div className="content-container">
      <MainText />
      <Projects />
      <CompanyLogosSection />
      <TwoPaths />
      <About />
      <Events />
    </div>
  );
};

export default Home;
