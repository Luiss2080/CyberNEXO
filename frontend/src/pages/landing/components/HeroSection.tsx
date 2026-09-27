import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../../components/ui/Card';

interface HeroSectionProps {
  onInstallClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onInstallClick }) => {
  return (
    <main className="flex-grow pt-32 pb-20 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyber-primary/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 py-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-xs font-mono font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse" />
              VERSIÓN MVP DISPONIBLE
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              TU MEJOR DEFENSA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-blue-500">
                ES SABER DETECTAR EL RIESGO.
              </span>
            </h1>
            <p className="text-xl text-cyber-text-muted max-w-xl leading-relaxed">
              Aprende ciberseguridad resolviendo situaciones reales, detectando amenazas y tomando decisiones antes de que sea tarde. El primer juego educativo basado en observación.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" variant="primary" className="font-bold tracking-wide group shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <span className="group-hover:translate-x-1 transition-transform inline-block">[ JUGAR GRATIS ]</span>
              </Button>
              <Button size="lg" variant="secondary" onClick={onInstallClick} className="font-bold tracking-wide flex items-center gap-2">
                <Download size={18} /> INSTALAR PWA
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full max-w-lg perspective-1000"
          >
            <Card className="border-cyber-primary/40 shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-cyber-bg/90 backdrop-blur transform hover:scale-[1.02] transition-transform duration-500">
              <CardHeader className="bg-cyber-primary/5 border-b border-cyber-primary/20">
                <div className="flex justify-between items-center text-sm font-mono text-cyber-primary">
                  <span className="flex items-center gap-2"><Monitor size={16}/> CYBERNEXO_LAB_TERMINAL</span>
                  <span className="animate-pulse">● LIVE</span>
                </div>
              </CardHeader>
              <CardBody className="space-y-6 font-mono text-sm">
                <div className="p-4 rounded bg-cyber-danger/10 border border-cyber-danger/30 text-cyber-danger">
                  ⚠ URGENTE: Su cuenta será suspendida en 10 minutos si no verifica sus credenciales aquí: 
                  <span className="underline ml-1 cursor-pointer hover:text-red-400">http://secure-banco.example.com/login</span>
                </div>
                <div className="space-y-2">
                  <p className="text-cyber-text-muted mb-4">Seleccione los indicios de phishing:</p>
                  <div className="flex items-center gap-3 p-3 border border-cyber-success/50 rounded bg-cyber-success/10 text-cyber-success">
                    <span>✓</span> Dominio falso detectado
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-cyber-success/50 rounded bg-cyber-success/10 text-cyber-success">
                    <span>✓</span> Táctica de urgencia detectada
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
