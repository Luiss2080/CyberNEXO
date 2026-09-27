import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GameplaySection } from './components/GameplaySection';
import { LearningSection } from './components/LearningSection';
import { PromoteInstallSection } from './components/PromoteInstallSection';
import { InstallModal } from './components/InstallModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export const LandingPage: React.FC = () => {
  const [isInstallModalOpen, setInstallModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const openInstall = () => setInstallModalOpen(true);
  const openAuth = () => setAuthModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-cyber-bg selection:bg-cyber-primary selection:text-cyber-bg">
      <Navbar onInstallClick={openInstall} onLoginClick={openAuth} />
      <HeroSection onInstallClick={openInstall} />
      <GameplaySection />
      <PromoteInstallSection onInstallClick={openInstall} />
      <LearningSection />
      
      {/* Modals */}
      <InstallModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setInstallModalOpen(false)} 
      />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};
