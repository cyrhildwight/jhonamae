import { motion } from "motion/react";
import { Heart, Brain, Sparkles } from "lucide-react";
import { DailyMessage } from "../data/messages";

interface InspirationCardsProps {
  message: DailyMessage;
}

export function InspirationCards({ message }: InspirationCardsProps) {
  const cards = [
    {
      id: "heart",
      title: "Heart",
      content: message.heart,
      icon: <Heart className="w-8 h-8 text-dusty-rose" />,
      color: "bg-dusty-rose-light/40 dark:bg-dusty-rose-light/10",
      border: "border-dusty-rose/30"
    },
    {
      id: "mind",
      title: "Mind",
      content: message.mind,
      icon: <Brain className="w-8 h-8 text-sage" />,
      color: "bg-sage-light/40 dark:bg-sage-light/10",
      border: "border-sage/30"
    },
    {
      id: "spirit",
      title: "Spirit",
      content: message.spirit,
      icon: <Sparkles className="w-8 h-8 text-lavender" />,
      color: "bg-lavender-light/40 dark:bg-lavender-light/10",
      border: "border-lavender/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 max-w-7xl mx-auto z-10 relative px-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
          whileHover={{ y: -12, scale: 1.02 }}
          className={`p-8 md:p-10 rounded-[2rem] glass border border-white/40 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col items-center text-center group transition-all duration-500 overflow-hidden relative`}
        >
          {/* Subtle color wash behind icon */}
          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${card.color}`}></div>

          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/60 dark:bg-zinc-800/40 backdrop-blur-sm flex items-center justify-center mb-6 md:mb-8 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-500 border border-white/50 dark:border-white/10">
            {card.icon}
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-ink dark:text-white mb-4 md:mb-5 font-bold tracking-tight">{card.title}</h3>
          <p className="text-ink/80 dark:text-ink/70 leading-relaxed text-base md:text-xl italic font-serif">"{card.content}"</p>
        </motion.div>
      ))}
    </div>
  );
}
