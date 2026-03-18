import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Droplets, Sun } from "lucide-react";
import { RealisticFlower } from "./RealisticFlower";

export function GrowthGarden({ currentDay }: { currentDay: number }) {
  const [watered, setWatered] = useState(false);
  const [sunned, setSunned] = useState(false);
  const [bloomed, setBloomed] = useState(false);

  // Reset when day changes
  useEffect(() => {
    setWatered(false);
    setSunned(false);
    setBloomed(false);
  }, [currentDay]);

  useEffect(() => {
    if (watered && sunned) {
      setTimeout(() => setBloomed(true), 1000);
    }
  }, [watered, sunned]);

  const pastBloomsCount = Math.max(0, currentDay - 1);
  const pastBlooms = Array.from({ length: pastBloomsCount });

  // Expanded array of hex colors for the realistic flowers
  const bloomColors = [
    "#C27A88", // dusty rose
    "#9D84C4", // lavender
    "#B58539", // gold
    "#7C9378", // sage
    "#E8A598", // peach
    "#88A0C4", // soft blue
    "#D49A89", // terracotta
  ];

  const flowerTypes: ('rose' | 'lotus' | 'daisy')[] = ['rose', 'lotus', 'daisy', 'rose', 'daisy', 'lotus'];

  return (
    <div className="max-w-4xl mx-auto mt-8 md:mt-16 p-6 md:p-10 bg-sage-light/20 dark:bg-zinc-900/40 rounded-3xl border border-sage/30 dark:border-sage/10 z-10 relative text-center shadow-lg backdrop-blur-md">
      <h3 className="font-serif text-2xl md:text-3xl text-ink dark:text-white mb-2">Your Personal Garden</h3>
      <p className="text-ink-muted dark:text-ink/60 text-sm md:text-base mb-8 md:mb-10">Nourish your mind today to see growth tomorrow.</p>

      <div className="flex justify-center items-end h-56 mb-12 relative">
        {/* Soil */}
        <div className="absolute bottom-0 w-full h-6 bg-sage/40 dark:bg-sage/20 rounded-full blur-md"></div>

        {/* Plant with swaying animation */}
        <motion.div
          className="relative w-12 h-32 origin-bottom mb-3"
          animate={{
            scale: bloomed ? 1.1 : (watered || sunned ? 1.05 : 1),
            rotate: bloomed ? [-1.5, 1.5, -1.5] : 0
          }}
          transition={{
            scale: { duration: 1, type: "spring" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Straight Organic Stem */}
          <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 48 128">
            <motion.path
              d="M24,128 L24,0"
              stroke="var(--color-sage)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          {/* Realistic Leaves (Side by Side, moved up) */}
          <motion.svg
            className="absolute bottom-16 right-1/2 w-14 h-14 origin-bottom-right z-10 drop-shadow-sm"
            viewBox="0 0 60 60"
            initial={{ rotate: -10, scale: 0 }}
            animate={{
              scale: watered ? 1 : 0.4,
              rotate: watered ? [-10, -18, -10] : -10
            }}
            transition={{
              scale: { duration: 0.8, type: "spring" },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
          >
            <path d="M60,60 C20,60 0,40 5,10 C25,10 45,35 60,60 Z" fill="var(--color-sage)" />
            <path d="M60,60 C35,45 15,25 5,10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
          </motion.svg>

          <motion.svg
            className="absolute bottom-16 left-1/2 w-14 h-14 origin-bottom-left z-10 drop-shadow-sm"
            viewBox="0 0 60 60"
            initial={{ rotate: 10, scale: 0 }}
            animate={{
              scale: sunned ? 1 : 0.4,
              rotate: sunned ? [10, 18, 10] : 10
            }}
            transition={{
              scale: { duration: 0.8, type: "spring" },
              rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
            }}
          >
            <path d="M0,60 C40,60 60,40 55,10 C35,10 15,35 0,60 Z" fill="var(--color-sage)" />
            <path d="M0,60 C25,45 45,25 55,10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
          </motion.svg>

          {/* Flower */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {bloomed && (
              <RealisticFlower className="w-28 h-28" color="#C27A88" type="rose" delay={0} />
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10">
        <button
          onClick={() => setWatered(true)}
          disabled={watered}
          className={`flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all cursor-pointer text-base md:text-lg ${watered
            ? 'bg-sage-light/50 text-sage dark:bg-sage/20 cursor-not-allowed opacity-50'
            : 'bg-white dark:bg-zinc-800 text-sage dark:text-sage border-2 border-sage/40 hover:bg-sage-light/30 shadow-md hover:shadow-lg hover:-translate-y-1'
            }`}
        >
          <Droplets className="w-5 h-5 md:w-6 md:h-6" />
          Water
        </button>
        <button
          onClick={() => setSunned(true)}
          disabled={sunned}
          className={`flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all cursor-pointer text-base md:text-lg ${sunned
            ? 'bg-gold-light/50 text-gold dark:bg-gold/20 cursor-not-allowed opacity-50'
            : 'bg-white dark:bg-zinc-800 text-gold dark:text-gold border-2 border-gold/40 hover:bg-gold-light/30 shadow-md hover:shadow-lg hover:-translate-y-1'
            }`}
        >
          <Sun className="w-5 h-5 md:w-6 md:h-6" />
          Sunlight
        </button>
      </div>

      {bloomed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-dusty-rose font-serif italic text-2xl drop-shadow-sm"
        >
          Beautiful growth takes time and care. You are blooming, Jhonamae.
        </motion.p>
      )}
    </div>
  );
}
