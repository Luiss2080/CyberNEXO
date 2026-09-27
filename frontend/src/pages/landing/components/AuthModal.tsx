import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, User as UserIcon, ShieldAlert, ArrowRight } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={isLogin ? "ACCESO AL LABORATORIO" : "NUEVO RECLUTA"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {!isLogin && (
            <div className="space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted w-5 h-5" />
                <Input placeholder="Nombre en clave (Ej. recluta_01)" className="pl-10 h-12" />
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted w-5 h-5" />
              <Input type="email" placeholder="Correo electrónico seguro" className="pl-10 h-12" />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted w-5 h-5" />
              <Input type="password" placeholder="Contraseña de acceso" className="pl-10 h-12" />
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button className="text-xs text-cyber-primary hover:underline font-mono">
                ¿Olvidaste tus credenciales?
              </button>
            </div>
          )}

          <Button variant="primary" className="w-full h-12 text-lg tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            {isLogin ? "INICIAR SESIÓN" : "CREAR PERFIL"} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-cyber-text-muted pt-4 border-t border-cyber-border">
            <span>{isLogin ? "¿No tienes acceso?" : "¿Ya tienes credenciales?"}</span>
            <button 
              onClick={toggleMode}
              className="text-cyber-primary hover:text-cyber-primary-hover font-bold"
            >
              {isLogin ? "Regístrate ahora" : "Inicia sesión"}
            </button>
          </div>

          <div className="flex items-start gap-3 p-3 bg-cyber-warning/10 border border-cyber-warning/30 rounded-lg text-xs text-cyber-warning mt-4">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <p>Conexión cifrada. Nunca compartiremos tu información personal. Todo progreso se almacenará de forma segura.</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};
