import React from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface NavbarProps {
  onInstallClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onInstallClick }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full border-b border-cyber-border bg-cyber-bg/70 backdrop-blur-xl fixed top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold text-cyber-primary tracking-widest font-mono">
          <TerminalSquare size={28} />
          CYBERNEXO
        </div>
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <a href="#aprender" className="hover:text-cyber-primary transition-colors">Aprender</a>
          <a href="#gameplay" className="hover:text-cyber-primary transition-colors">Gameplay</a>
          <Button variant="ghost">Iniciar Sesión</Button>
          <Button variant="primary" onClick={onInstallClick}>Instalar App</Button>
        </div>
      </div>
    </motion.nav>
  );
};
