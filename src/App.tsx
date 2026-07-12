import { Route, Routes } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  );
}

export default App;
