import { FlowingLines } from './components/FlowingLines';
import { MainText } from './components/MainText';
import { CompanyLogosSection } from './components/CompanyLogosSection';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <FlowingLines />
      <div className="content-container">
        <MainText />
        <CompanyLogosSection />
      </div>
    </div>
  );
}

export default App;
