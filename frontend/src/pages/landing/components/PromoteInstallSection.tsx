import React from 'react';
import { motion } from 'framer-motion';
import { Download, ShieldCheck, WifiOff } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface PromoteInstallSectionProps {
  onInstallClick: () => void;
}

export const PromoteInstallSection: React.FC<PromoteInstallSectionProps> = ({ onInstallClick }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-cyber-primary/5 border-y border-cyber-primary/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyber-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            LLEVA LA SEGURIDAD CONTIGO
          </h2>
          <p className="text-xl text-cyber-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Instala CyberNexo en tu dispositivo y disfruta de una experiencia inmersiva, sin interrupciones y con soporte total sin conexión.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="flex flex-col items-center gap-3 p-6 bg-cyber-surface/50 border border-cyber-border rounded-xl w-full md:w-64">
            <WifiOff className="text-cyber-primary w-12 h-12 mb-2" />
            <h4 className="font-bold text-lg">Offline-First</h4>
            <p className="text-sm text-cyber-text-muted">Juega sin internet. Sincroniza al reconectar.</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 bg-cyber-surface/50 border border-cyber-border rounded-xl w-full md:w-64">
            <ShieldCheck className="text-cyber-success w-12 h-12 mb-2" />
            <h4 className="font-bold text-lg">Aislamiento Seguro</h4>
            <p className="text-sm text-cyber-text-muted">App independiente de las distracciones del navegador.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8"
        >
          <Button 
            size="lg" 
            variant="primary" 
            onClick={onInstallClick}
            className="text-lg px-12 py-4 h-auto shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-pulse hover:animate-none"
          >
            <Download className="mr-3" />
            INSTALAR CYBERNEXO AHORA
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
