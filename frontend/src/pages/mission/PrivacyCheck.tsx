import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, HelpCircle, ShieldCheck } from 'lucide-react';
import { useMissionEngine } from '../../game/MissionEngine';
import { mockMissions } from '../../data/mockMissions';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const PrivacyCheck: React.FC = () => {
  const navigate = useNavigate();
  const engine = useMissionEngine();
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(true);
  const [trackingAccepted, setTrackingAccepted] = useState(true);
  
  useEffect(() => {
    engine.loadMission(mockMissions['privacy-01']);
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

  const handleAcceptAll = () => {
    // Si acepta todo directamente, pierde el paso
    engine.submitAnswer(false);
  };

  const handleSavePreferences = () => {
    // Si gestionó preferencias y desmarcó ambas cosas intrusivas, gana
    const isCorrect = !marketingAccepted && !trackingAccepted;
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
        {/* Simulador de web con Cookie Banner */}
        <div className="h-[600px] border border-gray-300 rounded-lg bg-gray-50 overflow-hidden relative font-sans text-gray-800">
          <div className="bg-white border-b border-gray-300 p-4 font-bold text-xl text-indigo-600 flex justify-between">
            <span>SocialConnect</span>
            <div className="flex gap-4 text-sm font-normal text-gray-500">
              <span>Home</span>
              <span>Profile</span>
            </div>
          </div>
          
          <div className="p-8 space-y-6 opacity-30 pointer-events-none">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-32 bg-gray-200 rounded-xl mt-6"></div>
          </div>

          {/* Cookie Modal */}
          <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">¡Valoramos tu privacidad!</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Utilizamos cookies propias y de terceros para personalizar el contenido, analizar nuestro tráfico y ofrecer anuncios personalizados. Al hacer clic en "Aceptar todo", aceptas nuestro uso de cookies.
                </p>

                {showPreferences ? (
                  <div className="space-y-4 border-t border-gray-200 pt-4 mb-6 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Cookies Estrictamente Necesarias</span>
                      <span className="text-gray-400 bg-gray-100 px-2 py-1 rounded text-xs font-bold">SIEMPRE ACTIVAS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cookies de Rendimiento</span>
                      <input type="checkbox" checked={trackingAccepted} onChange={() => setTrackingAccepted(!trackingAccepted)} className="w-4 h-4 cursor-pointer" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cookies de Marketing y Rastreo</span>
                      <input type="checkbox" checked={marketingAccepted} onChange={() => setMarketingAccepted(!marketingAccepted)} className="w-4 h-4 cursor-pointer" />
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-3">
                  {!showPreferences ? (
                    <>
                      <button 
                        onClick={handleAcceptAll}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Aceptar Todo
                      </button>
                      <button 
                        onClick={() => setShowPreferences(true)}
                        className="w-full text-blue-600 font-bold py-3 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Gestionar Preferencias
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={handleSavePreferences}
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Guardar Preferencias
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
