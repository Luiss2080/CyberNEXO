import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileJson, Activity, Search, ShieldAlert, Edit, Trash2 } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'METRICAS' | 'MISIONES' | 'USUARIOS'>('METRICAS');

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text-main pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
              <ShieldAlert className="text-red-500" /> PANEL DE CONTROL OVERSEER
            </h1>
            <p className="text-cyber-text-muted mt-1">Acceso restringido Nivel 5 (Administradores).</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="border border-cyber-border hover:bg-cyber-surface">
            VOLVER AL TERMINAL
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Admin */}
          <div className="space-y-4">
            <button 
              onClick={() => setActiveTab('METRICAS')}
              className={`w-full flex items-center gap-3 p-4 rounded-lg font-mono transition-all ${activeTab === 'METRICAS' ? 'bg-red-500/20 text-red-400 border-l-4 border-red-500' : 'bg-cyber-surface/50 text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <Activity size={20} /> MÉTRICAS GLOBALES
            </button>
            <button 
              onClick={() => setActiveTab('MISIONES')}
              className={`w-full flex items-center gap-3 p-4 rounded-lg font-mono transition-all ${activeTab === 'MISIONES' ? 'bg-red-500/20 text-red-400 border-l-4 border-red-500' : 'bg-cyber-surface/50 text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <FileJson size={20} /> EDITOR DE MISIONES
            </button>
            <button 
              onClick={() => setActiveTab('USUARIOS')}
              className={`w-full flex items-center gap-3 p-4 rounded-lg font-mono transition-all ${activeTab === 'USUARIOS' ? 'bg-red-500/20 text-red-400 border-l-4 border-red-500' : 'bg-cyber-surface/50 text-cyber-text-muted hover:bg-cyber-surface'}`}
            >
              <Users size={20} /> CONTROL DE RECLUTAS
            </button>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            {activeTab === 'METRICAS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-cyber-border bg-cyber-surface/30">
                    <CardBody className="p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">1,204</div>
                      <div className="text-xs text-cyber-text-muted font-mono">INTENTOS REGISTRADOS</div>
                    </CardBody>
                  </Card>
                  <Card className="border-cyber-border bg-cyber-surface/30">
                    <CardBody className="p-6 text-center">
                      <div className="text-3xl font-bold text-red-400 mb-1">42%</div>
                      <div className="text-xs text-cyber-text-muted font-mono">TASA FALLO (PHISHING)</div>
                    </CardBody>
                  </Card>
                  <Card className="border-cyber-border bg-cyber-surface/30">
                    <CardBody className="p-6 text-center">
                      <div className="text-3xl font-bold text-cyber-primary mb-1">89</div>
                      <div className="text-xs text-cyber-text-muted font-mono">RECLUTAS ACTIVOS</div>
                    </CardBody>
                  </Card>
                </div>

                <Card className="border-cyber-border">
                  <CardHeader className="bg-cyber-surface/50 border-b border-cyber-border">
                    <h3 className="font-bold text-white font-mono">MISIONES CON MAYOR DIFICULTAD (ANÁLISIS)</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-cyber-text-muted">Password Lab - Ataque de Diccionario</span>
                        <div className="w-1/2 bg-cyber-bg h-2 rounded overflow-hidden">
                          <div className="bg-red-500 h-full w-[78%]"></div>
                        </div>
                        <span className="text-red-400 font-bold font-mono">78% Fallo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyber-text-muted">Phishing - Suplantación de CEO</span>
                        <div className="w-1/2 bg-cyber-bg h-2 rounded overflow-hidden">
                          <div className="bg-orange-500 h-full w-[65%]"></div>
                        </div>
                        <span className="text-orange-500 font-bold font-mono">65% Fallo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyber-text-muted">Privacidad - Permisos de App</span>
                        <div className="w-1/2 bg-cyber-bg h-2 rounded overflow-hidden">
                          <div className="bg-yellow-500 h-full w-[30%]"></div>
                        </div>
                        <span className="text-yellow-500 font-bold font-mono">30% Fallo</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {activeTab === 'MISIONES' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-text-muted" />
                    <input type="text" placeholder="Buscar misión..." className="w-full bg-cyber-surface border border-cyber-border rounded pl-10 pr-4 py-2 text-sm text-white focus:border-red-500 outline-none" />
                  </div>
                  <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-white border-none">
                    + NUEVA MISIÓN (JSON)
                  </Button>
                </div>
                
                <Card className="border-cyber-border">
                  <table className="w-full text-left text-sm text-cyber-text-muted">
                    <thead className="bg-cyber-surface/50 text-white font-mono border-b border-cyber-border">
                      <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">TÍTULO</th>
                        <th className="p-4">TIPO</th>
                        <th className="p-4">XP BASE</th>
                        <th className="p-4 text-right">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-border">
                      <tr className="hover:bg-cyber-surface/30">
                        <td className="p-4 font-mono text-xs">phish_01</td>
                        <td className="p-4 text-white">Detectar Email Urgente</td>
                        <td className="p-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">EMAIL_ANALYSIS</span></td>
                        <td className="p-4 font-mono text-cyber-primary">150</td>
                        <td className="p-4 text-right space-x-2">
                          <button className="text-cyber-text-muted hover:text-white"><Edit size={16}/></button>
                          <button className="text-cyber-text-muted hover:text-red-500"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                      <tr className="hover:bg-cyber-surface/30">
                        <td className="p-4 font-mono text-xs">pass_01</td>
                        <td className="p-4 text-white">Fortaleza de Contraseñas</td>
                        <td className="p-4"><span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">PASSWORD</span></td>
                        <td className="p-4 font-mono text-cyber-primary">200</td>
                        <td className="p-4 text-right space-x-2">
                          <button className="text-cyber-text-muted hover:text-white"><Edit size={16}/></button>
                          <button className="text-cyber-text-muted hover:text-red-500"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </motion.div>
            )}

            {activeTab === 'USUARIOS' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-cyber-text-muted font-mono">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50 text-red-500" />
                <p>TABLA DE RECLUTAS EN DESARROLLO.</p>
                <p className="text-xs mt-2">Conexión con tabla `users` de Prisma pendiente de hidratación.</p>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
