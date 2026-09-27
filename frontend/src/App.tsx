import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing';
import { PhishingHunter } from './pages/mission/PhishingHunter';
import { PasswordLab } from './pages/mission/PasswordLab';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mission/phishing" element={<PhishingHunter />} />
        <Route path="/mission/password" element={<PasswordLab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
