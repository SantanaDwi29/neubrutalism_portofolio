import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { AdminProjects } from './pages/AdminProjects';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="admin" element={<AdminProjects />} />
        </Route>
      </Routes>
      {!['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname) && <SpeedInsights />}
    </Router>
  );
}

export default App;
