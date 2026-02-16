import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Header from './components/layout/Header';
import AgentHeader from './components/layout/AgentHeader';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

// Public Pages
import Home from './pages/Home/Home';
import InfoPoint from './pages/Media/InfoPoint';
import VideoPlayer from './pages/Media/VideoPlayer';
import Tools from './pages/Academy/Tools';
import EServices from './pages/EServices/EServices';

// Auth & Agent Pages
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AgentAcademy from './pages/Dashboard/AgentAcademy';

function App() {
  const location = useLocation();
  const isAgentRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/agent-academy');
  const isLoginRoute = location.pathname === '/login';

  return (
    <HelmetProvider>
      <div className="min-h-screen">
        <ScrollToTop />

        {/* Conditional Header */}
        {!isLoginRoute && (
          isAgentRoute ? <AgentHeader pageTitle={location.pathname === '/agent-academy' ? 'Académie Agent' : 'Tableau de Bord'} /> : <Header />
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/info-point" element={<InfoPoint />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/outils" element={<Tools />} />
          <Route path="/e-services" element={<EServices />} />
          <Route path="/institution" element={<PagePlaceholder title="INSTITUTION" />} />

          {/* Auth & Agent Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agent-academy" element={<AgentAcademy />} />
        </Routes>

        {/* Conditional Footer (Hidden on Login and Agent routes) */}
        {!isLoginRoute && !isAgentRoute && <Footer />}
      </div>
    </HelmetProvider>
  );
}

function PagePlaceholder({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-minfi-blue">
      <h1 className="text-4xl font-heading font-black text-white/10 uppercase tracking-[1em]">{title}</h1>
    </div>
  );
}

export default App;
