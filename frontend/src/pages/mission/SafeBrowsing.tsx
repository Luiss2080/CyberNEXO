import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, HelpCircle, ShieldCheck, ShieldAlert, Globe } from 'lucide-react';
import { useMissionEngine } from '../../game/MissionEngine';
import { mockMissions } from '../../data/mockMissions';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const SafeBrowsing: React.FC = () => {
  const navigate = useNavigate();
  const engine = useMissionEngine();
  const [activeHint, setActiveHint] = useState<string | null>(null);
  
  useEffect(() => {
    engine.loadMission(mockMissions['safe-01']);
    engine.startMission();
    return () => engine.reset();
  }, []);

  if (engine.state === 'LOADING' || engine.state === 'IDLE' || !engine.currentMission) {
    return <div className="min-h-screen flex items-center justify-center text-cyber-primary">Iniciando simulación...</div>;
  }

  if (engine.state === 'COMPLETED' && engine.result) {
    // Código de conclusión reutilizable
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-cyber-success shadow-[0_0_30px_rgba(0,255,102,0.1)]">
          <CardHeader className="bg-cyber-success/10 border-b border-cyber-success/30 text-center">
            <h2 className="text-2xl font-bold text-cyber-success">MISIÓN COMPLETADA</h2>
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

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between border-b border-cyber-border pb-4">
          <div>
            <h1 className="text-2xl font-bold font-mono text-cyber-primary">{engine.currentMission.title}</h1>
            <p className="text-cyber-text-muted text-sm mt-1">{engine.currentMission.scenario}</p>
          </div>
        </div>

        <div className="bg-cyber-surface/50 border border-cyber-border p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-cyber-warning font-bold">
            <AlertTriangle size={20} /> OBJETIVO
          </div>
          <p className="text-lg">{currentStep.content}</p>
          
          <div className="pt-4 space-y-3">
            {currentStep.options?.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  engine.submitAnswer(opt.isCorrect);
                  setActiveHint(null);
                }}
                className="w-full text-left p-4 rounded border border-cyber-border bg-cyber-bg hover:border-cyber-primary transition-all flex items-center justify-between group"
              >
                <span className="font-mono text-sm">{opt.label}</span>
                <ChevronRight className="opacity-0 group-hover:opacity-100 text-cyber-primary transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-lg">
        <Card className="h-full border-gray-300 bg-white rounded-lg overflow-hidden">
          <div className="bg-gray-200 p-2 flex items-center gap-2 border-b border-gray-300">
            <Globe className="text-gray-500 w-5 h-5" />
            <div className="bg-white flex-1 rounded px-3 py-1 font-mono text-sm text-gray-700 flex items-center gap-2 border border-gray-300">
              <ShieldAlert className="text-red-500 w-4 h-4" /> http://banco-naclonal.com/login
            </div>
          </div>
          <div className="p-8 text-center text-gray-800 space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">BANCO NACIONAL</h2>
            <p>Bienvenido a su portal seguro.</p>
            <div className="space-y-2 mt-4">
              <input type="text" placeholder="Usuario" className="w-full border border-gray-300 rounded p-2" disabled />
              <input type="password" placeholder="Contraseña" className="w-full border border-gray-300 rounded p-2" disabled />
              <button className="w-full bg-blue-600 text-white rounded p-2 opacity-50 cursor-not-allowed">Ingresar</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
