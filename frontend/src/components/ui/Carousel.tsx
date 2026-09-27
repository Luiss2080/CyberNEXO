import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full overflow-hidden rounded-xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyber-bg/50 border border-cyber-border flex items-center justify-center text-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyber-surface"
      >
        <ChevronLeft />
      </button>

      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyber-bg/50 border border-cyber-border flex items-center justify-center text-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyber-surface"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-cyber-primary' : 'bg-cyber-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
