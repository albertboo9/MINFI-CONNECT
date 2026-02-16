import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';

import MediaHub from './pages/Media/MediaHub';
import Academy from './pages/Academy/Academy';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institution" element={<PagePlaceholder title="INSTITUTION" />} />
          <Route path="/academie" element={<Academy />} />
          <Route path="/mediatheque" element={<MediaHub />} />
          <Route path="/e-services" element={<PagePlaceholder title="E-SERVICES" />} />
        </Routes>
        <Footer />
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
