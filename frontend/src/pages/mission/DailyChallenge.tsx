import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const DailyChallenge: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);

  const mockQuestions = [
    { q: "Analiza el remitente: admin@paypaI-support.com", correct: false, explain: "La 'l' minúscula fue cambiada por una 'I' mayúscula." },
    { q: "Analiza la URL: https://banco-seguro.com/login", correct: true, explain: "Usa HTTPS y el dominio no tiene alteraciones obvias." },
    { q: "Un compañero te pide tu código SMS para 'desbloquear su cuenta'.", correct: false, explain: "Los códigos MFA nunca deben compartirse, ni siquiera con compañeros." }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleAnswer = (userSaysSafe: boolean) => {
    const isActuallySafe = mockQuestions[currentStep].correct;
    if (userSaysSafe === isActuallySafe) {
      setScore(s => s + 1);
    }
    
    if (currentStep < mockQuestions.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setIsPlaying(false);
      setCurrentStep(mockQuestions.length); // Fin
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (currentStep === mockQuestions.length || (timeLeft === 0 && currentStep > 0)) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-cyber-primary shadow-[0_0_30px_rgba(0,240,255,0.1)]">
          <CardHeader className="bg-cyber-primary/10 border-b border-cyber-primary/30 text-center">
            <h2 className="text-2xl font-bold text-cyber-primary font-mono">REPORTE DEL DESAFÍO</h2>
          </CardHeader>
          <CardBody className="space-y-6 text-center p-8">
            <div className="text-6xl font-bold text-white mb-4">
              {score}/{mockQuestions.length}
            </div>
            <p className="text-cyber-text-muted">Tiempo restante: {formatTime(timeLeft)}</p>
            {score === mockQuestions.length ? (
              <p className="text-cyber-success font-bold">¡Desafío Diario Completado! +500 XP</p>
            ) : (
              <p className="text-cyber-danger font-bold">No lograste un análisis perfecto. Vuelve mañana.</p>
            )}
            <Button className="w-full mt-4" onClick={() => navigate('/dashboard')}>VOLVER AL TERMINAL</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="min-h-screen bg-cyber-bg pt-24 pb-12 px-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.1)] bg-cyber-surface">
          <CardHeader className="border-b border-orange-500/30 text-center py-8">
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-mono text-orange-500">DESAFÍO DEL DÍA</h1>
            <p className="text-cyber-text-muted mt-2">Simulación en condiciones de alta presión.</p>
          </CardHeader>
          <CardBody className="space-y-8 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-cyber-bg p-4 rounded border border-cyber-border">
                <div className="text-cyber-text-muted text-xs font-mono mb-1">OBJETIVO</div>
                <div className="font-bold text-white">3 Análisis</div>
              </div>
              <div className="bg-cyber-bg p-4 rounded border border-cyber-border">
                <div className="text-cyber-text-muted text-xs font-mono mb-1">TIEMPO LÍMITE</div>
                <div className="font-bold text-orange-500">3 Minutos</div>
              </div>
              <div className="bg-cyber-bg p-4 rounded border border-cyber-border">
                <div className="text-cyber-text-muted text-xs font-mono mb-1">RECOMPENSA</div>
                <div className="font-bold text-cyber-primary">500 XP</div>
              </div>
            </div>
            
            <div className="bg-orange-500/10 p-4 rounded border border-orange-500/30 text-sm text-orange-200">
              <strong>Reglas:</strong> Debes tomar decisiones rápidas. Un solo error anulará la bonificación diaria. No hay botón de pista disponible.
            </div>

            <Button variant="primary" className="w-full h-14 text-lg" onClick={() => setIsPlaying(true)}>
              INICIAR PROTOCOLO
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header HUD */}
        <div className="flex justify-between items-center bg-cyber-surface border border-cyber-border p-4 rounded-xl">
          <div className="font-mono text-cyber-primary font-bold">
            CASO {currentStep + 1} / {mockQuestions.length}
          </div>
          <div className={`font-mono font-bold text-2xl flex items-center gap-2 ${timeLeft < 30 ? 'text-cyber-danger animate-pulse' : 'text-orange-500'}`}>
            <Timer size={24} /> {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Area */}
        <Card className="border-cyber-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.05)] min-h-[300px] flex flex-col justify-center">
          <CardBody className="text-center p-12">
            <h2 className="text-2xl font-bold text-white mb-8">{mockQuestions[currentStep].q}</h2>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-cyber-danger/10 border-2 border-cyber-danger text-cyber-danger hover:bg-cyber-danger hover:text-white font-bold py-4 rounded-lg transition-all"
              >
                ES UNA AMENAZA
              </button>
              <button 
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-cyber-success/10 border-2 border-cyber-success text-cyber-success hover:bg-cyber-success hover:text-white font-bold py-4 rounded-lg transition-all"
              >
                ES SEGURO
              </button>
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
};
