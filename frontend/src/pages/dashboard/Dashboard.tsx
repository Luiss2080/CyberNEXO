import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Zap, Shield, Flame, Map } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Mock progress data
  const progressAreas = [
    { name: 'Phishing', percent: 100 },
    { name: 'Contraseñas', percent: 80 },
    { name: 'Privacidad', percent: 60 },
    { name: 'Ingeniería Social', percent: 40 },
    { name: 'Respuesta', percent: 20 },
  ];

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text-main pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-mono text-cyber-primary">TERMINAL PERSONAL</h1>
            <p className="text-cyber-text-muted">Recluta {user?.name || 'Anónimo'} • Nivel {user?.level || 1}</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/map')} className="flex items-center gap-2">
            <Map size={18} /> VER MAPA DE MISIONES
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-cyber-surface/50 border-cyber-border">
            <CardBody className="flex flex-col items-center justify-center p-6 space-y-2">
              <Shield className="text-cyber-primary w-10 h-10" />
              <div className="text-3xl font-bold text-white">{user?.level || 1}</div>
              <div className="text-xs text-cyber-text-muted uppercase tracking-widest">Rango: Recluta</div>
            </CardBody>
          </Card>
          
          <Card className="bg-cyber-surface/50 border-cyber-border">
            <CardBody className="flex flex-col items-center justify-center p-6 space-y-2">
              <Zap className="text-cyber-warning w-10 h-10" />
              <div className="text-3xl font-bold text-white">{user?.xp || 0}</div>
              <div className="text-xs text-cyber-text-muted uppercase tracking-widest">Puntos XP</div>
            </CardBody>
          </Card>

          <Card className="bg-cyber-surface/50 border-cyber-border">
            <CardBody className="flex flex-col items-center justify-center p-6 space-y-2">
              <Target className="text-cyber-success w-10 h-10" />
              <div className="text-3xl font-bold text-white">86%</div>
              <div className="text-xs text-cyber-text-muted uppercase tracking-widest">Precisión Promedio</div>
            </CardBody>
          </Card>

          <Card className="bg-cyber-surface/50 border-cyber-border">
            <CardBody className="flex flex-col items-center justify-center p-6 space-y-2">
              <Flame className="text-orange-500 w-10 h-10" />
              <div className="text-3xl font-bold text-white">6</div>
              <div className="text-xs text-cyber-text-muted uppercase tracking-widest">Días de Racha</div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-cyber-border bg-cyber-surface/30">
            <CardHeader className="border-b border-cyber-border">
              <h3 className="font-bold text-cyber-text-main font-mono">PROGRESO POR ÁREA</h3>
            </CardHeader>
            <CardBody className="space-y-6">
              {progressAreas.map((area) => (
                <div key={area.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold font-mono text-cyber-text-muted">
                    <span>{area.name}</span>
                    <span>{area.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-cyber-bg rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyber-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${area.percent}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border-cyber-border bg-cyber-surface/30">
            <CardHeader className="border-b border-cyber-border">
              <h3 className="font-bold text-cyber-text-main font-mono">LOGROS RECIENTES</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded bg-cyber-bg border border-cyber-border">
                <div className="w-12 h-12 rounded-full bg-cyber-primary/20 flex items-center justify-center text-cyber-primary">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Cazador de Phishing</h4>
                  <p className="text-sm text-cyber-text-muted">Detectaste 20 mensajes sospechosos con perfección.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded bg-cyber-bg border border-cyber-border opacity-50">
                <div className="w-12 h-12 rounded-full bg-cyber-surface flex items-center justify-center text-cyber-text-muted">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-400">Guardián de Cuentas (Bloqueado)</h4>
                  <p className="text-sm text-cyber-text-muted">Completa el módulo de contraseñas sin errores.</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Módulo Especial: Desafío Diario */}
        <Card className="border-orange-500/50 bg-orange-500/10 mt-8">
          <CardBody className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                <Flame size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-mono text-orange-500">DESAFÍO DEL DÍA</h3>
                <p className="text-orange-200/70 text-sm">Prueba cronometrada de 3 minutos. Recompensa: 500 XP.</p>
              </div>
            </div>
            <Button variant="primary" className="bg-orange-600 hover:bg-orange-700 text-white border-none shrink-0" onClick={() => navigate('/challenge/daily')}>
              INICIAR DESAFÍO
            </Button>
          </CardBody>
        </Card>

      </div>
    </div>
  );
};
