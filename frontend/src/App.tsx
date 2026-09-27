import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing';
import { PhishingHunter } from './pages/mission/PhishingHunter';
import { PasswordLab } from './pages/mission/PasswordLab';
import { PrivacyCheck } from './pages/mission/PrivacyCheck';
import { SafeBrowsing } from './pages/mission/SafeBrowsing';
import { SocialEngineering } from './pages/mission/SocialEngineering';
import { IncidentResponse } from './pages/mission/IncidentResponse';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MissionMap } from './pages/dashboard/MissionMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MissionMap />} />
        <Route path="/mission/phishing" element={<PhishingHunter />} />
        <Route path="/mission/password" element={<PasswordLab />} />
        <Route path="/mission/privacy" element={<PrivacyCheck />} />
        <Route path="/mission/safe-browsing" element={<SafeBrowsing />} />
        <Route path="/mission/social-engineering" element={<SocialEngineering />} />
        <Route path="/mission/incident-response" element={<IncidentResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
