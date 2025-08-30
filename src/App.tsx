import { FlowingLines } from './components/FlowingLines';
import { MainText } from './components/MainText';
import { CompanyLogosSection } from './components/CompanyLogosSection';
import './App.css';
import Navbar from './components/Navbar';
import GetInvolved from './components/GetInvolved';
import GetInvolvedStudents from './components/GetInvolvedStudents';
import Projects from './components/Projects';
import Events from './components/Events';
import MeetTeam from './components/MeetTeam';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <FlowingLines />
      <div className="content-container">
        <MainText />
        <CompanyLogosSection />
        <GetInvolved />
        <GetInvolvedStudents />
        <Projects />
        <Events />
        <MeetTeam />
        <Footer />
      </div>
    </div>
  );
}

export default App;
