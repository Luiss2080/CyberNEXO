import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Award, Activity, Smartphone, LogOut } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'RESUMEN' | 'LOGROS' | 'DISPOSITIVOS' | 'CONFIG'>('RESUMEN');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text-main pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-4">
          <Card className="border-cyber-border bg-cyber-surface/50 text-center py-8">
            <div className="w-24 h-24 mx-auto bg-cyber-primary/20 rounded-full flex items-center justify-center border-2 border-cyber-primary text-cyber-primary mb-4">
              <User size={40} />
            </div>
            <h2 className="font-bold text-xl text-white font-mono">{user?.name || 'Recluta Digital'}</h2>
            <p className="text-cyber-text-muted text-sm">{user?.email || 'recluta@cybernexo.lab'}</p>
            <div className="mt-4 inline-block bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Nivel {user?.level || 1}
            </div>
          </Card>

          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('RESUMEN')}
              className={`flex items-center gap-3 p-3 rounded text-left font-mono text-sm transition-colors ${activeTab === 'RESUMEN' ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50' : 'text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <Activity size={18} /> RESUMEN OPERATIVO
            </button>
            <button 
              onClick={() => setActiveTab('LOGROS')}
              className={`flex items-center gap-3 p-3 rounded text-left font-mono text-sm transition-colors ${activeTab === 'LOGROS' ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50' : 'text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <Award size={18} /> LOGROS Y MEDALLAS
            </button>
            <button 
              onClick={() => setActiveTab('DISPOSITIVOS')}
              className={`flex items-center gap-3 p-3 rounded text-left font-mono text-sm transition-colors ${activeTab === 'DISPOSITIVOS' ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50' : 'text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <Smartphone size={18} /> DISPOSITIVOS CONECTADOS
            </button>
            <button 
              onClick={() => setActiveTab('CONFIG')}
              className={`flex items-center gap-3 p-3 rounded text-left font-mono text-sm transition-colors ${activeTab === 'CONFIG' ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50' : 'text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <Settings size={18} /> CONFIGURACIÓN DEL SISTEMA
            </button>
          </div>

          <Button variant="ghost" onClick={handleLogout} className="w-full text-red-500 hover:bg-red-500/10 hover:text-red-400 mt-8 flex items-center justify-center gap-2">
            <LogOut size={18} /> CERRAR SESIÓN
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'RESUMEN' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h3 className="text-2xl font-bold font-mono text-white border-b border-cyber-border pb-4">RESUMEN OPERATIVO</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-cyber-surface/30 border-cyber-border p-6 text-center">
                  <div className="text-4xl font-bold text-cyber-primary mb-2">47</div>
                  <div className="text-xs text-cyber-text-muted font-mono">MISIONES COMPLETADAS</div>
                </Card>
                <Card className="bg-cyber-surface/30 border-cyber-border p-6 text-center">
                  <div className="text-4xl font-bold text-cyber-success mb-2">86%</div>
                  <div className="text-xs text-cyber-text-muted font-mono">PRECISIÓN PROMEDIO</div>
                </Card>
                <Card className="bg-cyber-surface/30 border-cyber-border p-6 text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">6 DÍAS</div>
                  <div className="text-xs text-cyber-text-muted font-mono">RACHA ACTUAL</div>
                </Card>
                <Card className="bg-cyber-surface/30 border-cyber-border p-6 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">14</div>
                  <div className="text-xs text-cyber-text-muted font-mono">LOGROS DESBLOQUEADOS</div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'CONFIG' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h3 className="text-2xl font-bold font-mono text-white border-b border-cyber-border pb-4">CONFIGURACIÓN DEL SISTEMA</h3>
              <Card className="bg-cyber-surface/30 border-cyber-border">
                <CardBody className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">Efectos de Sonido</h4>
                      <p className="text-sm text-cyber-text-muted">Activar audio en misiones y clics.</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded bg-cyber-bg border-cyber-primary text-cyber-primary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border-t border-cyber-border pt-6">
                    <div>
                      <h4 className="font-bold text-white">Animaciones Reducidas</h4>
                      <p className="text-sm text-cyber-text-muted">Para dispositivos de bajos recursos o accesibilidad.</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded bg-cyber-bg border-cyber-primary text-cyber-primary" />
                  </div>
                  <div className="flex items-center justify-between border-t border-cyber-border pt-6">
                    <div>
                      <h4 className="font-bold text-white">Modo Alto Contraste</h4>
                      <p className="text-sm text-cyber-text-muted">Mejora la legibilidad de textos oscuros.</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded bg-cyber-bg border-cyber-primary text-cyber-primary" />
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}

          {/* Más pestañas se implementarían aquí (LOGROS, DISPOSITIVOS) */}
          {(activeTab === 'LOGROS' || activeTab === 'DISPOSITIVOS') && (
            <div className="text-center py-24 text-cyber-text-muted font-mono">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>MÓDULO EN DESARROLLO (NIVEL DE ACCESO REQUERIDO)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
