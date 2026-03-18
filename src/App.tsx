import { useState, useEffect, Suspense, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EnvelopeReveal } from "./components/EnvelopeReveal";
import { DailyMessage } from "./components/DailyMessage";
import { InspirationCards } from "./components/InspirationCards";
import { DailyCompliment } from "./components/DailyCompliment";
import { FloatingPetals } from "./components/FloatingPetals";
import { ButterflyGarden } from "./components/ButterflyGarden";
import { dailyMessages } from "./data/messages";
import { Flower2, Moon, Sun } from "lucide-react";
import React from "react";

// Lazy load ONLY non-critical components below the fold
const GrowthGarden = React.lazy(() => import("./components/GrowthGarden").then(m => ({ default: m.GrowthGarden })));
const GratitudeJournal = React.lazy(() => import("./components/GratitudeJournal").then(m => ({ default: m.GratitudeJournal })));
const LoveNotes = React.lazy(() => import("./components/LoveNotes").then(m => ({ default: m.LoveNotes })));
const AffirmationMirror = React.lazy(() => import("./components/AffirmationMirror").then(m => ({ default: m.AffirmationMirror })));
const BreathingGarden = React.lazy(() => import("./components/BreathingGarden").then(m => ({ default: m.BreathingGarden })));

// Memoize background components to prevent re-renders
const MemoizedFloatingPetals = memo(FloatingPetals);
const MemoizedButterflyGarden = memo(ButterflyGarden);

const LoadingSpinner = () => (
  <div className="flex justify-center p-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-10 h-10 border-2 border-dusty-rose/30 border-t-dusty-rose rounded-full"
    />
  </div>
);

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if we already have a start date in localStorage
    const savedStartDate = localStorage.getItem("jhonamae_garden_start");
    let startDate: Date;

    if (savedStartDate) {
      startDate = new Date(savedStartDate);
    } else {
      // If no start date exists, set it to today (the "deployment" or first-open date)
      startDate = new Date();
      // Reset to midnight for consistent day calculations
      startDate.setHours(0, 0, 0, 0);
      localStorage.setItem("jhonamae_garden_start", startDate.toISOString());
    }

    const today = new Date();
    // Reset today to midnight as well for calculation
    const todayNormalized = new Date(today);
    todayNormalized.setHours(0, 0, 0, 0);

    // Calculate the difference in days (Day 1 = 0 days diff, Day 2 = 1 day diff, etc.)
    const diffTime = todayNormalized.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Ensure the day is within 1 to 30 range
    const calculatedDay = Math.min(dailyMessages.length, diffDays + 1);

    setCurrentDay(Math.max(1, calculatedDay));
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const message = dailyMessages.find(m => m.day === currentDay) || dailyMessages[0];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-dusty-rose/20 transition-colors duration-1000 bg-paper dark:bg-paper">
      <MemoizedFloatingPetals />
      <MemoizedButterflyGarden />

      {/* Background Orbs - Using radial gradients instead of heavy filters for scroll performance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-40" style={{ isolation: 'isolate' }}>
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,var(--color-dusty-rose)_0%,transparent_70%)] opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-[radial-gradient(circle,var(--color-lavender)_0%,transparent_70%)] opacity-20"
        />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-[radial-gradient(circle,var(--color-sage)_0%,transparent_70%)] opacity-10"></div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/40 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500">
        <div className="w-full px-6 md:px-12 h-14 md:h-24 flex justify-between items-center">
          {/* Custom Floral J Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:gap-5 group cursor-pointer"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-6px] bg-gradient-to-tr from-dusty-rose/20 to-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-zinc-900 rounded-2xl md:rounded-[1.25rem] shadow-sm border border-dusty-rose/20 dark:border-white/10 flex items-center justify-center relative z-10 overflow-hidden group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                <svg viewBox="0 0 100 100" className="w-7 h-7 md:w-10 md:h-10 text-dusty-rose transition-transform duration-700 group-hover:rotate-12">
                  {/* Stylized J shaped like a stem/petal */}
                  <path
                    d="M65 25 C65 25 75 35 75 50 C75 75 50 85 35 85 C25 85 15 75 15 65 C15 55 25 45 40 45 L40 25 L40 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Flower Petals on top of J */}
                  <motion.path
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    d="M40 25 C40 10 20 10 20 25 C20 40 40 40 40 25 Z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <motion.path
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    d="M40 25 C40 10 60 10 60 25 C60 40 40 40 40 25 Z"
                    fill="currentColor"
                    opacity="0.5"
                  />
                  <motion.circle
                    cx="40" cy="25" r="4"
                    fill="#C08A33"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl md:text-3xl tracking-tighter text-ink dark:text-white leading-none">Jhonamae</span>
              <span className="hidden sm:block text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-dusty-rose opacity-80 mt-1 md:mt-1.5 transition-opacity">Garden</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 md:gap-6">
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex items-center bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl p-1 md:p-1.5 rounded-full border border-white dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:flex-row flex-row"
              >
                <button
                  onClick={() => setCurrentDay(prev => Math.max(1, prev - 1))}
                  disabled={currentDay === 1}
                  className="px-2 md:px-5 py-1.5 text-[8px] md:text-xs font-black uppercase tracking-[0.2em] text-ink/70 dark:text-white/80 hover:text-dusty-rose dark:hover:text-gold hover:bg-white/80 dark:hover:bg-zinc-800/80 rounded-full disabled:opacity-5 transition-all cursor-pointer outline-none focus:ring-1 focus:ring-dusty-rose/30"
                >
                  Prev
                </button>
                <div className="px-3 md:px-7 py-2 text-[9px] md:text-xs font-black bg-ink dark:bg-white text-white dark:text-zinc-950 rounded-full shadow-lg tracking-[0.15em] md:tracking-[0.3em] uppercase whitespace-nowrap transition-colors">
                  Day {currentDay}
                </div>
                <button
                  onClick={() => setCurrentDay(prev => Math.min(dailyMessages.length, prev + 1))}
                  disabled={currentDay === dailyMessages.length}
                  className="px-2 md:px-5 py-1.5 text-[8px] md:text-xs font-black uppercase tracking-[0.2em] text-ink/70 dark:text-white/80 hover:text-dusty-rose dark:hover:text-gold hover:bg-white/80 dark:hover:bg-zinc-800/80 rounded-full disabled:opacity-5 transition-all cursor-pointer outline-none focus:ring-1 focus:ring-dusty-rose/30"
                >
                  Next
                </button>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass border border-white/40 dark:border-white/10 text-ink dark:text-white hover:shadow-lg transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 md:w-6 md:h-6 text-gold" /> : <Moon className="w-4 h-4 md:w-6 md:h-6 text-lavender" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under the fixed header */}
      <div className="h-14 md:h-24" />

      <main className="w-full px-6 md:px-16 pb-32 pt-8 md:pt-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              transition={{ duration: 0.1 }}
              className="min-h-[80vh] flex items-center justify-center"
            >
              <EnvelopeReveal onOpen={() => setIsOpened(true)} currentDay={currentDay} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="space-y-32 md:space-y-48"
            >
              <section className="scroll-mt-32">
                <DailyCompliment currentDay={currentDay} />
              </section>

              <section className="scroll-mt-32">
                <DailyMessage message={message} />
              </section>

              <section className="scroll-mt-32">
                <InspirationCards message={message} />
              </section>

              <Suspense fallback={<LoadingSpinner />}>
                <section className="scroll-mt-32">
                  <GrowthGarden currentDay={currentDay} />
                </section>

                <section className="scroll-mt-32">
                  <GratitudeJournal currentDay={currentDay} />
                </section>

                <section className="scroll-mt-32">
                  <LoveNotes />
                </section>

                <section className="scroll-mt-32">
                  <AffirmationMirror />
                </section>

                <section className="scroll-mt-32 pb-12">
                  <BreathingGarden />
                </section>
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 text-center relative z-10 glass border-t border-black/5 dark:border-white/5 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-serif italic text-2xl md:text-3xl text-ink leading-relaxed">
            "Every flower blooms in its own time."
          </p>
          <p className="mt-8 text-ink/40 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
            Cultivated with infinite care for <span className="text-dusty-rose">Jhonamae Parang</span>
          </p>
          <div className="mt-12 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-dusty-rose/30"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-dusty-rose/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-dusty-rose/30"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
