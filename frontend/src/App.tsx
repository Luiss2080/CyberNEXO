import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing';
import { PhishingHunter } from './pages/mission/PhishingHunter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mission/phishing" element={<PhishingHunter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
