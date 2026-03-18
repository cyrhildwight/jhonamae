import { motion } from "motion/react";
import { DailyMessage as DailyMessageType } from "../data/messages";

interface DailyMessageProps {
  message: DailyMessageType;
}

export function DailyMessage({ message }: DailyMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="max-w-4xl mx-auto glass p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/40 dark:border-white/5 relative z-10 overflow-hidden"
    >
      {/* Watercolor accent top left */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-dusty-rose/10 dark:bg-dusty-rose/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Watercolor accent bottom right */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-lavender/10 dark:bg-lavender/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="text-center mb-12 relative">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sage dark:text-sage/80 text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
        >
          Day {message.day} of 30
        </motion.span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-ink dark:text-white leading-tight">{message.title}</h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 opacity-60"
        ></motion.div>
      </div>

      <div className="max-w-3xl mx-auto text-ink/90 dark:text-ink font-sans leading-relaxed text-center text-base md:text-xl">
        <p className="first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:text-dusty-rose first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left first-letter:leading-[0.7] first-letter:mt-1">
          {message.message}
        </p>
      </div>

      <div className="mt-16 text-center border-t border-ink/5 dark:border-white/5 pt-10">
        <p className="font-serif italic text-xl text-ink-muted">With love,</p>
        <p className="font-serif text-3xl text-dusty-rose mt-3 tracking-wide">Your Garden</p>
      </div>
    </motion.div>
  );
}
