import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GameplaySection } from './components/GameplaySection';
import { LearningSection } from './components/LearningSection';
import { InstallModal } from './components/InstallModal';
import { Footer } from './components/Footer';

export const LandingPage: React.FC = () => {
  const [isInstallModalOpen, setInstallModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-cyber-bg selection:bg-cyber-primary selection:text-cyber-bg">
      <Navbar onInstallClick={() => setInstallModalOpen(true)} />
      <HeroSection onInstallClick={() => setInstallModalOpen(true)} />
      <GameplaySection />
      <LearningSection />
      <InstallModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setInstallModalOpen(false)} 
      />
      <Footer />
    </div>
  );
};
