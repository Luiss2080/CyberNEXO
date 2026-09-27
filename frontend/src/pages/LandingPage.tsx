import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Smartphone, TerminalSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Carousel } from '../components/ui/Carousel';

const learningAreas = [
  { title: 'PHISHING', description: 'Aprende a detectar correos y mensajes engañosos analizando remitentes falsos y URLs ocultas.', icon: '🎣' },
  { title: 'CONTRASEÑAS', description: 'Construye mejores prácticas de protección. Aprende a crear frases de paso seguras y memorables.', icon: '🔐' },
  { title: 'PRIVACIDAD', description: 'Comprende qué información compartes, cómo funcionan las cookies y a gestionar permisos de apps.', icon: '👁️' },
  { title: 'NAVEGACIÓN SEGURA', description: 'Reconoce señales de riesgo antes de continuar. Certificados SSL, descargas y sitios clonados.', icon: '🌐' },
  { title: 'INGENIERÍA SOCIAL', description: 'Aprende a reconocer manipulación, engaño y ataques de suplantación de identidad en chats.', icon: '🎭' },
  { title: 'RESPUESTA', description: 'Aprende qué hacer cuando algo sospechoso ocurre. Aislar cuentas, activar 2FA y reportar incidentes.', icon: '⚡' }
];

const gameplayPreviews = [
  <div key="1" className="bg-cyber-surface border border-cyber-border rounded-xl h-64 flex flex-col p-6 items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 to-transparent pointer-events-none" />
    <h4 className="text-xl font-bold font-mono text-cyber-primary mb-2">MISIÓN 01: EL GANCHO</h4>
    <p className="text-cyber-text-muted text-center max-w-sm">Analiza una bandeja de entrada corporativa simulada y marca los correos que contengan tácticas de urgencia.</p>
  </div>,
  <div key="2" className="bg-cyber-surface border border-cyber-border rounded-xl h-64 flex flex-col p-6 items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-cyber-warning/10 to-transparent pointer-events-none" />
    <h4 className="text-xl font-bold font-mono text-cyber-warning mb-2">MISIÓN 07: PERMISOS</h4>
    <p className="text-cyber-text-muted text-center max-w-sm">Una nueva app de filtros de fotos solicita acceso a tus contactos y ubicación. ¿Se los das?</p>
  </div>,
  <div key="3" className="bg-cyber-surface border border-cyber-border rounded-xl h-64 flex flex-col p-6 items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-cyber-danger/10 to-transparent pointer-events-none" />
    <h4 className="text-xl font-bold font-mono text-cyber-danger mb-2">INCIDENTE CRÍTICO</h4>
    <p className="text-cyber-text-muted text-center max-w-sm">Tu cuenta muestra un inicio de sesión desde otro país. Ordena rápidamente los pasos de respuesta a incidentes.</p>
  </div>
];

export const LandingPage: React.FC = () => {
  const [isInstallModalOpen, setInstallModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-cyber-bg selection:bg-cyber-primary selection:text-cyber-bg">
      {/* Navbar */}
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
            <Button variant="primary" onClick={() => setInstallModalOpen(true)}>Instalar App</Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-20 px-6 relative">
        {/* Background Gradients */}
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
                <Button size="lg" variant="secondary" onClick={() => setInstallModalOpen(true)} className="font-bold tracking-wide flex items-center gap-2">
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

      {/* Gameplay Preview Carousel Section */}
      <section id="gameplay" className="py-24 bg-cyber-surface/30 border-y border-cyber-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SIMULACIONES INMERSIVAS</h2>
            <p className="text-cyber-text-muted">Aprende jugando a través de múltiples escenarios interactivos.</p>
          </div>
          <Carousel items={gameplayPreviews} />
        </div>
      </section>

      {/* Qué Aprenderás Section */}
      <section id="aprender" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">MÓDULOS DE ENTRENAMIENTO</h2>
            <div className="h-1 w-24 bg-cyber-primary mx-auto rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningAreas.map((area, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card hoverable className="h-full bg-cyber-surface/40 backdrop-blur-sm border-cyber-border/80 group">
                  <CardBody className="flex flex-col h-full gap-5 p-8">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyber-bg border border-cyber-border text-3xl shadow-inner group-hover:border-cyber-primary/50 transition-colors">
                      {area.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyber-text-main mb-3 group-hover:text-cyber-primary transition-colors">{area.title}</h3>
                      <p className="text-cyber-text-muted leading-relaxed text-sm">
                        {area.description}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Install Modal */}
      <Modal 
        isOpen={isInstallModalOpen} 
        onClose={() => setInstallModalOpen(false)}
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

      {/* Footer */}
      <footer className="border-t border-cyber-border bg-cyber-surface py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xl font-bold text-cyber-text-muted font-mono">
            <TerminalSquare size={24} />
            CYBERNEXO_LAB
          </div>
          <p className="text-cyber-text-muted/60 text-sm">
            © 2026 CyberNexo Security. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
