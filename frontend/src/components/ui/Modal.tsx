import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-cyber-bg/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className={cn(
                "pointer-events-auto w-full max-w-md bg-cyber-surface border border-cyber-border rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden",
                className
              )}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border bg-cyber-bg/50">
                <h3 className="text-lg font-bold text-cyber-primary font-mono">{title}</h3>
                <button 
                  onClick={onClose}
                  className="text-cyber-text-muted hover:text-cyber-danger transition-colors focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
