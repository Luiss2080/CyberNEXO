import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const MissionMap: React.FC = () => {
  const navigate = useNavigate();

  const mapNodes = [
    { id: 1, name: 'Phishing Hunter', status: 'COMPLETED', path: '/mission/phishing' },
    { id: 2, name: 'Password Lab', status: 'COMPLETED', path: '/mission/password' },
    { id: 3, name: 'Privacy Check', status: 'AVAILABLE', path: '/mission/privacy' },
    { id: 4, name: 'Safe Browsing', status: 'LOCKED', path: '/mission/safe-browsing' },
    { id: 5, name: 'Social Engineering', status: 'LOCKED', path: '/mission/social-engineering' },
    { id: 6, name: 'Incident Response', status: 'LOCKED', path: '/mission/incident-response' },
  ];

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text-main pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-mono text-cyber-primary mb-2">MAPA DE MISIONES</h1>
          <p className="text-cyber-text-muted">Completa las simulaciones para ascender de rango en el Laboratorio.</p>
        </div>

        <div className="relative py-12">
          {/* Línea de conexión visual */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-cyber-border -translate-x-1/2 z-0" />

          <div className="space-y-16 relative z-10">
            {mapNodes.map((node, index) => {
              const isEven = index % 2 === 0;
              let icon;
              let colorClass = '';
              let bgClass = '';

              if (node.status === 'COMPLETED') {
                icon = <CheckCircle size={24} className="text-cyber-success" />;
                colorClass = 'border-cyber-success shadow-[0_0_15px_rgba(0,255,102,0.3)]';
                bgClass = 'bg-cyber-success/10';
              } else if (node.status === 'AVAILABLE') {
                icon = <Play size={24} className="text-cyber-primary ml-1" />;
                colorClass = 'border-cyber-primary shadow-[0_0_20px_rgba(0,240,255,0.5)]';
                bgClass = 'bg-cyber-primary/20 animate-pulse';
              } else {
                icon = <Lock size={24} className="text-gray-500" />;
                colorClass = 'border-cyber-border opacity-50';
                bgClass = 'bg-cyber-surface';
              }

              return (
                <motion.div 
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center w-full ${isEven ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-1/2" />
                  <div className="relative flex justify-center w-0 z-20">
                    <button 
                      disabled={node.status === 'LOCKED'}
                      onClick={() => navigate(node.path)}
                      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center bg-cyber-bg transition-transform hover:scale-110 ${colorClass}`}
                    >
                      {icon}
                    </button>
                    {/* Indicador pulsante para disponible */}
                    {node.status === 'AVAILABLE' && (
                      <div className={`absolute inset-0 rounded-full ${bgClass} -z-10 scale-150`} />
                    )}
                  </div>
                  <div className={`w-1/2 flex flex-col ${isEven ? 'items-end pr-12 text-right' : 'items-start pl-12 text-left'}`}>
                    <h3 className={`text-xl font-bold font-mono ${node.status === 'LOCKED' ? 'text-gray-500' : 'text-white'}`}>
                      {node.name}
                    </h3>
                    <p className="text-sm text-cyber-text-muted mt-1 uppercase tracking-wider">
                      {node.status === 'COMPLETED' ? 'COMPLETADO' : node.status === 'AVAILABLE' ? 'DESBLOQUEADO' : 'BLOQUEADO'}
                    </p>
                    {node.status === 'AVAILABLE' && (
                      <Button variant="primary" size="sm" className="mt-3" onClick={() => navigate(node.path)}>
                        INICIAR
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
