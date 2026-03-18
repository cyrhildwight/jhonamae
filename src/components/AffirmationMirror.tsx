import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { affirmations } from "../data/affirmations";
import { RefreshCw, Sparkles } from "lucide-react";

export function AffirmationMirror() {
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewAffirmation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      setCurrentAffirmation(affirmations[randomIndex]);
      setIsAnimating(false);
    }, 600);
  };

  useEffect(() => {
    getNewAffirmation();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-20 mb-12 text-center z-10 relative">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 px-4">
        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gold shrink-0" />
        <h3 className="font-serif text-2xl md:text-4xl text-ink dark:text-white drop-shadow-sm">Affirmation Mirror</h3>
        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-gold shrink-0" />
      </div>

      <div className="relative p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] glass border border-white/40 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden group mx-4 md:mx-0">
        {/* Shimmer animation */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-12 z-0"
          animate={{ translateX: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />

        {/* Mirror reflection gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-lavender/10 pointer-events-none z-0"></div>

        <div className="relative z-10 min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isAnimating && (
              <motion.p
                key={currentAffirmation}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-serif text-xl md:text-4xl text-ink dark:text-white leading-relaxed italic font-black tracking-tight drop-shadow-sm"
              >
                "{currentAffirmation}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={getNewAffirmation}
        className="mt-8 md:mt-12 flex items-center justify-center gap-3 mx-auto px-6 md:px-8 py-3 md:py-4 glass border border-ink/10 dark:border-white/10 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-ink/60 dark:text-white/70 hover:text-dusty-rose dark:hover:text-gold transition-all shadow-md group cursor-pointer"
      >
        <RefreshCw className={`w-5 h-5 transition-transform duration-500 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180'}`} />
        Reflection
      </motion.button>
    </div>
  );
}
