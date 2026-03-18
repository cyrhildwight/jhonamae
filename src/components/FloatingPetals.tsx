import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  duration: number;
  delay: number;
  type: 'petal' | 'firefly';
}

export function FloatingPetals() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduced particle count for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 12 : 20;
    
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      scale: 0.5 + Math.random() * 0.8,
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      type: i % 3 === 0 ? 'firefly' : 'petal',
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.type === 'firefly' ? 'hidden dark:block' : 'opacity-40 dark:opacity-20'}`}
          style={{ 
            willChange: "transform, opacity",
            left: `${particle.x}%`
          }}
          initial={{
            y: particle.type === 'firefly' ? `${particle.y}vh` : `-10vh`,
            scale: particle.scale,
            rotate: particle.rotation,
            opacity: 0,
          }}
          animate={{
            y: particle.type === 'firefly' ? [`${particle.y}vh`, `${particle.y - 10}vh`, `${particle.y + 10}vh`, `${particle.y}vh`] : `110vh`,
            rotate: particle.rotation + 360,
            opacity: particle.type === 'firefly' ? [0, 0.8, 0.2, 0.8, 0] : [0, 1, 1, 0],
            x: [0, (Math.random() * 40 - 20), 0],
          }}
          transition={{
            duration: particle.type === 'firefly' ? particle.duration / 2 : particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.type === 'petal' ? (
            /* Simple SVG Petal */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 4 6 4 12C4 18 12 22 12 22C12 22 20 18 20 12C20 6 12 2 12 2Z" fill="var(--color-dusty-rose)" fillOpacity="0.6" />
            </svg>
          ) : (
            /* Firefly */
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_4px_rgba(212,175,55,0.6)]"></div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
