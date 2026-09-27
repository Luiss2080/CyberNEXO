import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="INSTALAR CYBERNEXO"
    >
      <div className="space-y-6">
        <p className="text-cyber-text-muted text-sm leading-relaxed">
          Juega desde cualquier lugar. CyberNexo está diseñado para funcionar offline una vez instalado. Selecciona tu plataforma:
        </p>
        <div className="grid gap-3">
          <Button variant="secondary" className="justify-start gap-4 h-14">
            <Monitor size={20} className="text-cyber-primary" /> 
            <div className="text-left flex flex-col">
              <span className="font-bold text-sm">Escritorio (Windows / macOS)</span>
              <span className="text-xs text-cyber-text-muted font-mono">App Nativa (Electron)</span>
            </div>
          </Button>
          <Button variant="secondary" className="justify-start gap-4 h-14">
            <Smartphone size={20} className="text-cyber-primary" /> 
            <div className="text-left flex flex-col">
              <span className="font-bold text-sm">Móvil (Android / iOS)</span>
              <span className="text-xs text-cyber-text-muted font-mono">PWA Instalable</span>
            </div>
          </Button>
        </div>
        <div className="pt-4 mt-2 border-t border-cyber-border/50 text-xs text-center text-cyber-text-muted">
          v1.0.0-beta • Requiere 50MB de espacio
        </div>
      </div>
    </Modal>
  );
};
