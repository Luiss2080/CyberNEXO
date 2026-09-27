import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';

const learningAreas = [
  {
    title: 'PHISHING',
    description: 'Aprende a detectar correos y mensajes engañosos.',
    icon: '🎣'
  },
  {
    title: 'CONTRASEÑAS',
    description: 'Construye mejores prácticas de protección de cuentas.',
    icon: '🔐'
  },
  {
    title: 'PRIVACIDAD',
    description: 'Comprende qué información compartes y con quién.',
    icon: '👁️'
  },
  {
    title: 'NAVEGACIÓN SEGURA',
    description: 'Reconoce señales de riesgo antes de continuar.',
    icon: '🌐'
  },
  {
    title: 'INGENIERÍA SOCIAL',
    description: 'Aprende a reconocer manipulación y engaño.',
    icon: '🎭'
  },
  {
    title: 'RESPUESTA',
    description: 'Aprende qué hacer cuando algo sospechoso ocurre.',
    icon: '⚡'
  }
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Minimalista */}
      <nav className="w-full border-b border-cyber-border bg-cyber-bg/80 backdrop-blur-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-cyber-primary tracking-widest font-mono">
            CYBERNEXO
          </div>
          <div className="flex gap-4">
            <Button variant="ghost">Iniciar Sesión</Button>
            <Button variant="primary">Instalar</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-20">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                TU MEJOR DEFENSA <br />
                <span className="text-cyber-primary">ES SABER DETECTAR EL RIESGO.</span>
              </h1>
              <p className="text-xl text-cyber-text-muted max-w-2xl leading-relaxed">
                Aprende ciberseguridad resolviendo situaciones reales, detectando amenazas y tomando decisiones antes de que sea tarde.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <Button size="lg" variant="primary" className="font-bold tracking-wide">
                  [ JUGAR GRATIS ]
                </Button>
                <Button size="lg" variant="secondary" className="font-bold tracking-wide">
                  [ INSTALAR CYBERNEXO ]
                </Button>
              </div>
            </div>
            
            {/* Visual Placeholder (Simulando la UI del juego) */}
            <div className="flex-1 w-full max-w-md">
              <Card className="border-cyber-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                <CardHeader className="bg-cyber-primary/10">
                  <div className="flex justify-between items-center text-sm font-mono text-cyber-primary">
                    <span>MISIÓN 07</span>
                    <span className="animate-pulse">● REC REC</span>
                  </div>
                </CardHeader>
                <CardBody className="space-y-6 font-mono text-sm">
                  <div className="text-cyber-danger">⚠ Correo sospechoso detectado.</div>
                  <div className="grid grid-cols-2 gap-4 border-t border-cyber-border pt-4">
                    <div>
                      <div className="text-cyber-text-muted text-xs">TIEMPO</div>
                      <div className="text-xl">01:42</div>
                    </div>
                    <div>
                      <div className="text-cyber-text-muted text-xs">PRECISIÓN</div>
                      <div className="text-xl text-cyber-success">87%</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Section: Qué Aprenderás */}
          <div className="py-24 border-t border-cyber-border/50">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">LO QUE APRENDERÁS</h2>
              <div className="h-1 w-24 bg-cyber-primary mx-auto rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningAreas.map((area, idx) => (
                <Card key={idx} hoverable className="h-full bg-cyber-surface/50 backdrop-blur">
                  <CardBody className="flex flex-col h-full gap-4">
                    <div className="text-4xl">{area.icon}</div>
                    <h3 className="text-xl font-bold text-cyber-primary">{area.title}</h3>
                    <p className="text-cyber-text-muted leading-relaxed">
                      {area.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
