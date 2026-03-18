import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

interface EnvelopeRevealProps {
  onOpen: () => void;
  currentDay: number;
}

export function EnvelopeReveal({ onOpen, currentDay }: EnvelopeRevealProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSparkles(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1800); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] z-10 relative px-4 text-center">
      {/* Magical Background Sparkles */}
      <AnimatePresence>
        {showSparkles && !isOpening && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 0.5, 0], 
                  scale: [0, 1.2, 0],
                  y: [-30, -200],
                  x: Math.sin(i) * 120
                }}
                transition={{ 
                  duration: 4 + Math.random() * 5, 
                  repeat: Infinity, 
                  delay: i * 0.4 
                }}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-gold/40 dark:bg-gold/60 rounded-full blur-[1px]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 space-y-10"
      >
        <div className="space-y-4">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="text-dusty-rose dark:text-gold text-[10px] md:text-sm font-black tracking-[0.4em] uppercase mb-4"
          >
            A Private Garden
          </motion.h3>
          
          <h1 className="font-serif text-6xl md:text-9xl text-ink dark:text-white font-black tracking-tight leading-none drop-shadow-2xl">
             <span className="bg-clip-text text-transparent bg-gradient-to-br from-ink via-ink to-dusty-rose/40 dark:from-white dark:via-white/90 dark:to-gold/40">
                Jhonamae's<br/>Garden
             </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-ink-muted dark:text-white/60 italic text-xl md:text-3xl font-serif max-w-lg mx-auto leading-relaxed border-t border-black/5 dark:border-white/5 pt-6 mt-6"
          >
            Day {currentDay} is waiting for you.
          </motion.p>
        </div>

        <motion.div
          className="relative cursor-pointer group mt-16 inline-block"
          onClick={handleOpen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={isOpening ? { 
            y: [-10, -80], 
            opacity: [1, 0], 
            scale: [1, 1.1, 0.7],
            filter: "blur(12px)"
          } : { 
            y: [0, -15, 0],
          }}
          transition={
            isOpening 
              ? { duration: 1.2, ease: "anticipate" } 
              : { y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }
          }
        >
          {/* Deep Aura Glow */}
          <div className="absolute inset-x-[-30%] inset-y-[-30%] bg-gold/10 dark:bg-gold/5 blur-[100px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          {/* Premium Envelope Wrapper */}
          <div className="w-80 h-52 md:w-[32rem] md:h-64 glass rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] relative overflow-hidden border border-white/60 dark:border-white/10 group-hover:shadow-gold/30 transition-shadow duration-700">
            {/* Inner Message Peek */}
            <div className="absolute top-4 left-6 right-6 h-full bg-white dark:bg-zinc-900 rounded-t-lg z-0 border border-black/5 dark:border-white/5 opacity-80 group-hover:translate-y-[-10px] transition-transform duration-500"></div>
            
            {/* Envelope Flap System */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L50,65 L100,0 Z" fill="rgba(0,0,0,0.05)" className="dark:fill-black/40" />
                    <path d="M0,0 L50,60 L100,0 Z" fill="var(--color-lavender-light)" opacity="0.95" className="dark:opacity-20" />
                    <path d="M0,100 L50,45 L100,100 Z" fill="white" opacity="0.4" className="dark:opacity-10" />
                </svg>
            </div>

            {/* Premium Metallic Wax Seal */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 md:w-24 md:h-24 bg-gold dark:bg-gold-light rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(192,138,51,0.5)] border-4 border-white/40 dark:border-black/20 group-hover:scale-110 transition-transform duration-500"
              animate={isOpening ? { 
                scale: [1, 2, 0], 
                rotate: [0, 180],
                opacity: [1, 1, 0]
              } : { 
                boxShadow: ["0 15px 40px rgba(192,138,51,0.4)", "0 15px 60px rgba(192,138,51,0.6)", "0 15px 40px rgba(192,138,51,0.4)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/30 rounded-full"></div>
              <span className="font-serif text-white dark:text-ink text-4xl md:text-5xl font-black italic drop-shadow-xl relative z-10 select-none">J</span>
              {/* Seal Shimmer */}
              <motion.div 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12 flex flex-col items-center gap-4 group/reveal"
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          >
            <div className="flex items-center gap-6">
               <div className="w-16 h-px bg-gold/20 hidden md:block"></div>
               <span className="text-ink/40 dark:text-white/30 font-black text-[10px] md:text-sm tracking-[0.4em] uppercase group-hover/reveal:text-gold transition-colors duration-500">
                  Tap to open today's letter
               </span>
               <div className="w-16 h-px bg-gold/20 hidden md:block"></div>
            </div>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-full border border-gold/10 text-gold shadow-sm mt-2"
            >
              <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
