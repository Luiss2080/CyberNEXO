import React from 'react';
import { Carousel } from '../../../components/ui/Carousel';

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

export const GameplaySection: React.FC = () => {
  return (
    <section id="gameplay" className="py-24 bg-cyber-surface/30 border-y border-cyber-border/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SIMULACIONES INMERSIVAS</h2>
          <p className="text-cyber-text-muted">Aprende jugando a través de múltiples escenarios interactivos.</p>
        </div>
        <Carousel items={gameplayPreviews} />
      </div>
    </section>
  );
};
