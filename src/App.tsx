import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Home from './pages/Home';
import Story from './pages/Story';
import Network from './pages/Network';
import NotFound from './pages/NotFound';

const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <ScrollToHash />
      <Navbar
        onContactClick={() => setContactOpen(true)}
        onMenuOpenChange={setMenuOpen}
      />
      {/* Page content is inert while an overlay covers it, so keyboard and
          screen-reader focus can't tab into hidden background content. */}
      <div inert={contactOpen || menuOpen}>
        {/* The Frame: warm-white canvas floating inside the black chrome. */}
        <main className="site-canvas">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/network" element={<Network />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default App;
