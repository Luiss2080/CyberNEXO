import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, HelpCircle, Lock, ShieldCheck } from 'lucide-react';
import { useMissionEngine } from '../../game/MissionEngine';
import { mockMissions } from '../../data/mockMissions';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

export const PasswordLab: React.FC = () => {
  const navigate = useNavigate();
  const engine = useMissionEngine();
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    engine.loadMission(mockMissions['password-01']);
    engine.startMission();
    return () => engine.reset();
  }, []);

  if (engine.state === 'LOADING' || engine.state === 'IDLE' || !engine.currentMission) {
    return <div className="min-h-screen flex items-center justify-center text-cyber-primary">Iniciando laboratorio...</div>;
  }

  if (engine.state === 'COMPLETED' && engine.result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-cyber-success shadow-[0_0_30px_rgba(0,255,102,0.1)]">
          <CardHeader className="bg-cyber-success/10 border-b border-cyber-success/30 text-center">
            <h2 className="text-2xl font-bold text-cyber-success">LABORATORIO COMPLETADO</h2>
          </CardHeader>
          <CardBody className="space-y-6 text-center">
            <div className="text-5xl my-4">
              {engine.result.stars === 3 ? '⭐⭐⭐' : engine.result.stars === 2 ? '⭐⭐' : '⭐'}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div className="p-3 bg-cyber-surface rounded border border-cyber-border">
                <div className="text-cyber-text-muted">PUNTOS XP</div>
                <div className="text-xl text-cyber-primary">+{engine.result.score}</div>
              </div>
              <div className="p-3 bg-cyber-surface rounded border border-cyber-border">
                <div className="text-cyber-text-muted">PRECISIÓN</div>
                <div className="text-xl text-cyber-primary">{engine.result.accuracy.toFixed(0)}%</div>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={() => navigate('/')}>VOLVER A LA BASE</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const currentStep = engine.currentMission.steps[engine.currentStepIndex];

  // Algoritmo de entropía local (RF-23)
  const getEntropyScore = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score += 20;
    if (pass.length > 12) score += 20;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;
    return score;
  };

  const entropy = getEntropyScore(password);
  let strengthLabel = 'MUY DÉBIL';
  let strengthColor = 'bg-cyber-danger text-cyber-danger';
  
  if (entropy > 20) { strengthLabel = 'DÉBIL'; strengthColor = 'bg-orange-500 text-orange-500'; }
  if (entropy >= 60) { strengthLabel = 'BUENA'; strengthColor = 'bg-cyber-warning text-cyber-warning'; }
  if (entropy >= 80) { strengthLabel = 'FUERTE'; strengthColor = 'bg-cyber-success text-cyber-success'; }

  const handleSubmit = () => {
    // Si la entropía es mayor a 80, consideramos la prueba superada
    const isCorrect = entropy >= 80;
    engine.submitAnswer(isCorrect);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between border-b border-cyber-border pb-4">
          <div>
            <h1 className="text-2xl font-bold font-mono text-cyber-primary">{engine.currentMission.title}</h1>
            <p className="text-cyber-text-muted text-sm mt-1">{engine.currentMission.scenario}</p>
          </div>
          <div className="text-right font-mono text-sm">
            <span className="text-cyber-text-muted">PASO</span>
            <div className="text-xl text-cyber-primary">{engine.currentStepIndex + 1} / {engine.currentMission.steps.length}</div>
          </div>
        </div>

        <div className="bg-cyber-surface/50 border border-cyber-border p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-cyber-warning font-bold">
            <AlertTriangle size={20} /> OBJETIVO ACTUAL
          </div>
          <p className="text-lg">{currentStep.content}</p>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button 
            variant="ghost" 
            className="text-cyber-warning hover:bg-cyber-warning/10 hover:text-cyber-warning"
            onClick={() => {
              const hint = engine.useHint();
              if (hint) setActiveHint(hint);
            }}
          >
            <HelpCircle size={18} className="mr-2" /> SOLICITAR PISTA (-10 XP)
          </Button>
          
          {activeHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-sm bg-cyber-warning/10 border border-cyber-warning/30 text-cyber-warning p-3 rounded"
            >
              {activeHint}
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 w-full max-w-lg">
        <Card className="h-full border-cyber-border shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-cyber-surface rounded-lg overflow-hidden">
          <CardHeader className="bg-cyber-bg border-b border-cyber-border">
            <div className="flex items-center gap-2 text-cyber-primary font-mono font-bold">
              <Lock size={20} /> ANALIZADOR DE ENTROPÍA (LOCAL)
            </div>
          </CardHeader>
          <CardBody className="space-y-8 p-8">
            <div className="space-y-2">
              <label className="text-sm text-cyber-text-muted">Ingresa una contraseña para analizar:</label>
              <Input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe aquí..."
                className="text-2xl h-16 font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold font-mono">
                <span className="text-cyber-text-muted">SEGURIDAD:</span>
                <span className={strengthColor.split(' ')[1]}>{strengthLabel}</span>
              </div>
              <div className="h-4 w-full bg-cyber-bg rounded-full overflow-hidden border border-cyber-border">
                <motion.div 
                  className={`h-full ${strengthColor.split(' ')[0]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${entropy}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="pt-8">
              <Button 
                variant="primary" 
                className="w-full h-12"
                onClick={handleSubmit}
                disabled={password.length === 0}
              >
                EVALUAR CONTRASEÑA
              </Button>
            </div>
            <p className="text-xs text-cyber-text-muted text-center flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Tu contraseña no será enviada al servidor (RF-24).
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
