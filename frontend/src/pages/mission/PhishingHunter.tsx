import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, HelpCircle, Mail, ShieldAlert } from 'lucide-react';
import { useMissionEngine } from '../../game/MissionEngine';
import { mockMissions } from '../../data/mockMissions';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const PhishingHunter: React.FC = () => {
  const navigate = useNavigate();
  const engine = useMissionEngine();
  const [activeHint, setActiveHint] = useState<string | null>(null);
  
  useEffect(() => {
    // Iniciar la misión mock al montar el componente
    engine.loadMission(mockMissions['phishing-01']);
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
            <div className="text-sm text-cyber-text-muted space-y-2 mt-4 text-left bg-cyber-bg p-4 rounded border border-cyber-border">
              <h4 className="font-bold text-cyber-text-main mb-2">FEEDBACK DEL SISTEMA:</h4>
              {engine.result.feedback.map((fb, i) => (
                <p key={i} className="flex gap-2"><ChevronRight size={16} className="text-cyber-primary shrink-0" /> {fb}</p>
              ))}
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
      {/* Panel Izquierdo: Contexto y Motor */}
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
          
          <div className="pt-4 space-y-3">
            {currentStep.options?.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  engine.submitAnswer(opt.isCorrect);
                  setActiveHint(null);
                }}
                className="w-full text-left p-4 rounded border border-cyber-border bg-cyber-bg hover:border-cyber-primary hover:bg-cyber-primary/5 transition-all flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ChevronRight className="opacity-0 group-hover:opacity-100 text-cyber-primary transition-opacity" />
              </button>
            ))}
          </div>
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

      {/* Panel Derecho: Simulador Visual de Correo */}
      <div className="flex-1 w-full max-w-lg perspective-1000">
        <Card className="h-full border-cyber-border shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white text-gray-900 rounded-lg overflow-hidden">
          <div className="bg-gray-100 border-b border-gray-300 p-3 flex items-center gap-4 text-sm font-sans">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="bg-white px-3 py-1 rounded border border-gray-300 flex-1 text-center text-gray-500 font-mono text-xs">
              mail.banco-secure.com
            </div>
          </div>
          
          <div className="p-6 font-sans space-y-6">
            <div className="border-b border-gray-200 pb-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">De:</span>
                <span className="text-gray-900 bg-yellow-100 px-2 py-0.5 rounded cursor-pointer hover:bg-yellow-200 transition-colors">Soporte Técnico &lt;soporte@banco-secure.com&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">Para:</span>
                <span className="text-gray-500">usuario@cybernexo.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">Asunto:</span>
                <span className="font-bold text-red-600">URGENTE: Verificación de cuenta requerida</span>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p className="bg-yellow-50 inline-block px-1 cursor-pointer hover:bg-yellow-200 transition-colors">Estimado usuario,</p>
              <p>Hemos detectado actividad inusual en su cuenta bancaria. Por motivos de seguridad, <span className="bg-red-50 text-red-700 font-bold px-1 cursor-pointer hover:bg-red-100 transition-colors">su cuenta será suspendida en 24 horas</span> si no verifica su identidad de inmediato.</p>
              <p>Haga clic en el botón de abajo para verificar su información:</p>
              <div className="py-4 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded cursor-pointer">
                  Verificar Cuenta Ahora
                </button>
              </div>
              <p>Atentamente,<br/>El equipo de seguridad.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
