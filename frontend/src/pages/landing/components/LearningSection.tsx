import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '../../../components/ui/Card';

const learningAreas = [
  { title: 'PHISHING', description: 'Aprende a detectar correos y mensajes engañosos analizando remitentes falsos y URLs ocultas.', icon: '🎣' },
  { title: 'CONTRASEÑAS', description: 'Construye mejores prácticas de protección. Aprende a crear frases de paso seguras y memorables.', icon: '🔐' },
  { title: 'PRIVACIDAD', description: 'Comprende qué información compartes, cómo funcionan las cookies y a gestionar permisos de apps.', icon: '👁️' },
  { title: 'NAVEGACIÓN SEGURA', description: 'Reconoce señales de riesgo antes de continuar. Certificados SSL, descargas y sitios clonados.', icon: '🌐' },
  { title: 'INGENIERÍA SOCIAL', description: 'Aprende a reconocer manipulación, engaño y ataques de suplantación de identidad en chats.', icon: '🎭' },
  { title: 'RESPUESTA', description: 'Aprende qué hacer cuando algo sospechoso ocurre. Aislar cuentas, activar 2FA y reportar incidentes.', icon: '⚡' }
];

export const LearningSection: React.FC = () => {
  return (
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
  );
};
