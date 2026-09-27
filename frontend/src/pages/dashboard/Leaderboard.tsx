import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, ArrowUp } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';

interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  xp: number;
}

export const Leaderboard: React.FC = () => {
  const { token, user } = useAuthStore();
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/leaderboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setLeaders(data);
        }
      } catch (error) {
        console.error("Error cargando ranking", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [token]);

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text-main pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          <h1 className="text-4xl font-bold font-mono text-white">SALÓN DE LA FAMA</h1>
          <p className="text-cyber-text-muted mt-2">Los mejores defensores del CyberNexo Security Lab.</p>
        </div>

        <Card className="bg-cyber-surface/50 border-cyber-border shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <CardBody className="p-0">
            {loading ? (
              <div className="p-12 text-center text-cyber-primary animate-pulse font-mono">ENCRIPTANDO DATOS...</div>
            ) : (
              <div className="divide-y divide-cyber-border">
                {leaders.map((leader, index) => {
                  const isMe = leader.id === user?.id;
                  let colorClass = 'text-cyber-text-muted';
                  if (index === 0) colorClass = 'text-yellow-500 font-bold';
                  if (index === 1) colorClass = 'text-slate-300 font-bold';
                  if (index === 2) colorClass = 'text-amber-600 font-bold';

                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={leader.id} 
                      className={`flex items-center justify-between p-6 hover:bg-cyber-primary/5 transition-colors ${isMe ? 'bg-cyber-primary/10 border-l-4 border-cyber-primary' : ''}`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`text-2xl font-mono ${colorClass} w-8 text-center`}>
                          #{index + 1}
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold font-mono ${isMe ? 'text-cyber-primary' : 'text-white'}`}>
                            {leader.name || 'Agente Anónimo'} {isMe && '(TÚ)'}
                          </h3>
                          <div className="text-sm text-cyber-text-muted flex items-center gap-2">
                            <Star size={14} className="text-cyber-primary" /> Nivel {leader.level}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono text-cyber-primary">{leader.xp.toLocaleString()}</div>
                        <div className="text-xs text-cyber-text-muted">PUNTOS XP</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardBody>
        </Card>

      </div>
    </div>
  );
};
