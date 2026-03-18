import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, MessageCircleHeart } from "lucide-react";

const sweetNotes = [
  "I love how you tackle every challenge with such grace.",
  "Your laugh is my favorite sound in the entire world.",
  "I love the way you're so dedicated to your dreams.",
  "You make the most ordinary moments feel like magic.",
  "The world is just a little brighter simply because you're in it.",
  "I'm so proud of the woman you're becoming, Jhonamae.",
  "Your kindness is a light that never fades.",
  "I love the way you care for the people you love.",
  "Every day with you is a gift I never take for granted.",
  "You are my favorite person to simply exist with.",
];

export function LoveNotes() {
  const [activeNote, setActiveNote] = useState<number | null>(null);

  const revealRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * sweetNotes.length);
    setActiveNote(randomIndex);
  };

  return (
    <div className="max-w-5xl mx-auto my-32 px-6">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4">A Jar of Light</h2>
        <p className="text-ink-muted italic">Click to reveal a reason why you are so loved.</p>
      </div>

      <div className="flex flex-col items-center">
        {/* The "Jar" - Interactive element */}
        <motion.div
          whileHover={{ 
            rotate: [0, -5, 5, -5, 0],
            scale: 1.05
          }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          onClick={revealRandomNote}
          className="relative w-48 h-64 cursor-pointer group"
        >
          {/* Glass Jar SVG */}
          <svg className="w-full h-full drop-shadow-2xl opacity-80 dark:opacity-40" viewBox="0 0 160 220">
            <path 
                d="M30,40 L130,40 L130,50 L30,50 Z M40,50 L120,50 L140,200 L20,200 Z" 
                fill="rgba(255,255,255,0.4)" 
                stroke="white" 
                strokeWidth="2" 
            />
            <path d="M40,50 C40,50 35,35 40,30 L120,30 C125,35 120,50 120,50" fill="#E2C7C7" />
          </svg>
          
          {/* Jar Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass px-3 py-1 rounded-lg border border-white/40 shadow-sm">
            <span className="font-serif text-xs md:text-sm text-ink/60 font-black uppercase tracking-widest leading-none">Sweet Notes</span>
          </div>

          {/* Floating light particles inside the jar */}
          <AnimatePresence>
            {activeNote === null && Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0, 0.6, 0],
                        scale: [0, 1.2, 0],
                        y: [0, -40, -80],
                        x: [0, (i % 2 === 0 ? 20 : -20), 0]
                    }}
                    transition={{ 
                        duration: 3 + i, 
                        repeat: Infinity, 
                        delay: i * 0.5 
                    }}
                    className="absolute top-1/2 left-1/2 -ml-2 -mt-2 w-4 h-4 rounded-full bg-gold/40 blur-sm pointer-events-none"
                />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Revealed Note */}
        <div className="mt-16 min-h-[140px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {activeNote !== null && (
              <motion.div
                key={activeNote}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="max-w-3xl glass rounded-[2.5rem] p-10 md:p-14 border border-gold/40 shadow-2xl relative"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 bg-white dark:bg-black rounded-2xl shadow-lg border border-gold/20">
                     <MessageCircleHeart className="w-8 h-8 text-dusty-rose" />
                </div>
                <p className="font-serif text-2xl md:text-3xl text-ink italic leading-relaxed">
                  "{sweetNotes[activeNote]}"
                </p>
                <div className="mt-8 flex justify-center gap-1 opacity-20">
                  <Star className="w-2 h-2 fill-current" />
                  <Star className="w-2 h-2 fill-current" />
                  <Star className="w-2 h-2 fill-current" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { Star } from "lucide-react";
