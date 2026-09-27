import React from 'react';
import { TerminalSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyber-border bg-cyber-surface py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-xl font-bold text-cyber-text-muted font-mono">
          <TerminalSquare size={24} />
          CYBERNEXO_LAB
        </div>
        <p className="text-cyber-text-muted/60 text-sm">
          © {new Date().getFullYear()} CyberNexo Security. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
