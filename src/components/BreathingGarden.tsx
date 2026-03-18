import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wind, Coffee, Moon, Sun, Heart } from "lucide-react";

export function BreathingGarden() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (phase === "inhale") {
              setPhase("hold");
              return 4;
            } else if (phase === "hold") {
              setPhase("exhale");
              return 4;
            } else {
              setPhase("inhale");
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase("inhale");
      setSeconds(4);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 md:mt-32 text-center z-10 relative px-4">
      <div className="flex flex-col items-center gap-4 mb-12">
        <motion.div
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-sage opacity-50"
        >
          <Wind className="w-8 h-8 md:w-10 md:h-10" />
        </motion.div>
        <h3 className="font-serif text-3xl md:text-5xl text-ink dark:text-white">Breathing Garden</h3>
        <p className="text-ink-muted dark:text-ink/60 text-sm md:text-base max-w-sm">
          A moment for yourself. Let everything else fade away for a few deep breaths.
        </p>
      </div>

      <div className="relative aspect-square max-w-[280px] md:max-w-[340px] mx-auto flex items-center justify-center">
        {/* Decorative background rings */}
        <div className="absolute inset-0 border border-sage/10 dark:border-white/5 rounded-full" />
        <div className="absolute inset-[15%] border border-sage/10 dark:border-white/5 rounded-full" />
        
        {/* The Breathing Orb - Using gradient instead of blur for scroll performance */}
        <motion.div
          animate={{
            scale: !isActive ? 1 : (phase === "inhale" ? 1.5 : (phase === "hold" ? 1.5 : 1)),
            opacity: !isActive ? 0.3 : 1,
            background: phase === "inhale" ? "radial-gradient(circle, var(--color-sage) 0%, transparent 70%)" : (phase === "hold" ? "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" : "radial-gradient(circle, var(--color-dusty-rose) 0%, transparent 70%)")
          }}
          transition={{
            scale: { duration: 4, ease: "easeInOut" },
            background: { duration: 1 }
          }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full opacity-30"
        />

        <motion.div
          animate={{
            scale: !isActive ? 1 : (phase === "inhale" ? 1.3 : (phase === "hold" ? 1.3 : 1)),
            boxShadow: isActive 
              ? `0 0 50px ${phase === "inhale" ? "rgba(74, 122, 94, 0.3)" : (phase === "hold" ? "rgba(192, 138, 51, 0.3)" : "rgba(194, 91, 111, 0.3)")}`
              : "none",
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-full border border-white dark:border-white/10 shadow-2xl z-10"
        >
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.button
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleToggle}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-sage/10 dark:bg-sage/20 flex items-center justify-center text-sage group-hover:scale-110 transition-transform">
                  <Wind className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-ink/60 dark:text-ink/70">Begin</span>
              </motion.button>
            ) : (
              <motion.div
                key="ongoing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-sage mb-2">
                  {phase}
                </span>
                <span className="text-4xl md:text-6xl font-serif text-ink dark:text-white">
                  {seconds}
                </span>
                <button
                  onClick={handleToggle}
                  className="mt-4 text-[8px] font-black uppercase tracking-[0.2em] text-ink/40 dark:text-ink/40 hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Stop
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Suggested Self-Care for after breathing */}
      <div className="grid grid-cols-2 gap-4 mt-20 max-w-sm mx-auto">
        <div className="p-4 rounded-2xl bg-sage-light/30 dark:bg-zinc-900/40 border border-sage/10 text-center flex flex-col items-center gap-2">
          <Coffee className="w-5 h-5 text-sage" />
          <span className="text-[10px] font-black uppercase tracking-wider text-ink/60 dark:text-ink/70">Sip Tea</span>
        </div>
        <div className="p-4 rounded-2xl bg-gold-light/30 dark:bg-zinc-900/40 border border-gold/10 text-center flex flex-col items-center gap-2">
          <Sun className="w-5 h-5 text-gold" />
          <span className="text-[10px] font-black uppercase tracking-wider text-ink/60 dark:text-ink/70">Sunshine</span>
        </div>
      </div>
    </div>
  );
}
