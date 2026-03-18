import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PenLine, Send, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";

const reflectionPrompts = [
  "What made your heart smile today, Jhonamae?",
  "Which small victory are you most proud of today?",
  "Who was a light in your life today?",
  "What beauty did you notice in the middle of your busy day?",
  "What is a strength you discovered in yourself today?",
  "What part of your journey are you most thankful for right now?",
  "What is one thing you're looking forward to tomorrow?",
  "How did you show yourself kindness today?",
  "What is a simple comfort that you appreciated today?",
  "What lesson did today's challenges teach you?",
];

export function GratitudeJournal({ currentDay }: { currentDay: number }) {
  const [thought, setThought] = useState("");
  const [savedThought, setSavedThought] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const promptIndex = (currentDay - 1) % reflectionPrompts.length;
  const currentPrompt = reflectionPrompts[promptIndex];

  useEffect(() => {
    const saved = localStorage.getItem(`jhonamae_gratitude_day_${currentDay}`);
    if (saved) setSavedThought(saved);
    else {
      setSavedThought("");
      setThought("");
    }
  }, [currentDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thought.trim()) return;

    setIsSubmitting(true);

    try {
      // Create the email parameters
      const templateParams = {
        to_email: "cyrhildwight@gmail.com", // You can also set this in the template itself
        day: currentDay,
        message: thought,
        prompt: currentPrompt,
        from_name: "Jhonamae's Reflection Garden",
      };

      // Replace these with your real IDs from EmailJS
      const SERVICE_ID = "service_2g47vna";
      const TEMPLATE_ID = "template_zic91cv";
      const PUBLIC_KEY = "rP4hlxy4iSWVRh33q";

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Save locally to show her it's "planted"
      localStorage.setItem(`jhonamae_gratitude_day_${currentDay}`, thought);
      setSavedThought(thought);
    } catch (error) {
      console.error("Failed to send reflection:", error);
      alert("Oops! Something went wrong planting your thought, but don't worry, I'll keep it safe here.");
      // Still save locally even if email fails so she doesn't lose her work
      localStorage.setItem(`jhonamae_gratitude_day_${currentDay}`, thought);
      setSavedThought(thought);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-6">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-ink mb-4">Daily Reflection</h2>
        <p className="text-ink-muted italic">{currentPrompt}</p>
      </div>

      <div className="glass rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <PenLine className="w-24 h-24 text-dusty-rose" />
        </div>

        <AnimatePresence mode="wait">
          {!savedThought ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="relative z-10"
            >
              <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Today, I am grateful for..."
                className="w-full h-40 bg-transparent border-none focus:ring-0 font-serif text-xl md:text-2xl text-ink placeholder:text-ink/20 resize-none leading-relaxed"
                disabled={isSubmitting}
              />
              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!thought.trim() || isSubmitting}
                  className="flex items-center gap-2 bg-dusty-rose text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-dusty-rose/20 disabled:opacity-50 disabled:grayscale transition-all"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      Plant this thought
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 relative z-10"
            >
              <div className="inline-block p-4 bg-sage/10 rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-serif text-2xl text-ink mb-4 italic">" {savedThought} "</h3>
              <p className="text-sage font-bold uppercase tracking-widest text-xs">This thought is now blossoming in your garden.</p>
              <button
                onClick={() => {
                  setSavedThought("");
                  setThought(savedThought);
                }}
                className="mt-8 text-ink/30 hover:text-ink text-xs underline underline-offset-4 transition-colors"
              >
                Edit reflection
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
