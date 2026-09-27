import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, HelpCircle, MessageSquare } from 'lucide-react';
import { useMissionEngine } from '../../game/MissionEngine';
import { mockMissions } from '../../data/mockMissions';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const SocialEngineering: React.FC = () => {
  const navigate = useNavigate();
  const engine = useMissionEngine();
  const [activeHint, setActiveHint] = useState<string | null>(null);
  
  useEffect(() => {
    engine.loadMission(mockMissions['social-01']);
    engine.startMission();
    return () => engine.reset();
  }, []);

  if (engine.state === 'LOADING' || engine.state === 'IDLE' || !engine.currentMission) {
    return <div className="min-h-screen flex items-center justify-center text-cyber-primary">Iniciando simulación...</div>;
  }

  if (engine.state === 'COMPLETED' && engine.result) {
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
                <span>{opt.label}</span>
                <ChevronRight className="opacity-0 group-hover:opacity-100 text-cyber-primary transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-lg">
        <Card className="h-full border-green-800 bg-[#efeae2] rounded-lg overflow-hidden">
          <div className="bg-[#075e54] p-4 flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">CEO</div>
            <div>
              <h3 className="font-bold">CEO Empresa</h3>
              <p className="text-xs text-green-200">en línea</p>
            </div>
          </div>
          <div className="p-6 space-y-4 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover">
            <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm text-gray-800 relative">
              <p>¡Hola! Estoy en una reunión importante y no tengo acceso a la VPN.</p>
              <span className="text-[10px] text-gray-400 absolute bottom-1 right-2">10:42</span>
            </div>
            <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm text-gray-800 relative">
              <p>Necesito que transfieras 50k a esta cuenta. ¡Es para cerrar un trato ya, hazlo o perdemos el cliente!</p>
              <span className="text-[10px] text-gray-400 absolute bottom-1 right-2">10:43</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
