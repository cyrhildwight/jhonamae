import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { compliments } from "../data/compliments";

interface DailyComplimentProps {
  currentDay: number;
}

export function DailyCompliment({ currentDay }: DailyComplimentProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Reset reveal state when the day changes
  useEffect(() => {
    setIsRevealed(false);
  }, [currentDay]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  // Select a compliment based on the current day (1-indexed)
  const compliment = compliments[(currentDay - 1) % compliments.length];

  return (
    <div className="max-w-2xl mx-auto relative z-10 px-4">
      <motion.div
        className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg border border-dusty-rose/30 dark:border-dusty-rose/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-dusty-rose-light/50 dark:bg-dusty-rose/20 flex items-center justify-center text-dusty-rose">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        <h3 className="font-serif text-xl md:text-2xl text-ink dark:text-white mb-2">A Little Reminder</h3>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6"
            >
              <p className="text-ink-muted dark:text-ink/60 text-[13px] md:text-sm mb-6">You are wonderful. Click below to see why.</p>
              <button
                onClick={handleReveal}
                className="w-full bg-dusty-rose text-white font-semibold py-3 rounded-xl hover:bg-dusty-rose/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                Reveal My Reminder
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 py-4"
            >
              <p className="text-2xl font-serif text-dusty-rose italic px-4 leading-relaxed drop-shadow-sm">
                "{compliment}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
