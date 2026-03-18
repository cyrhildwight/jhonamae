import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

interface Butterfly {
  id: number;
  x: number;
  y: number;
  color: string;
  scale: number;
  rotation: number;
}

const BUTTERFLY_COLORS = [
  "#C27A88", // dusty rose
  "#9D84C4", // lavender
  "#B58539", // gold
  "#E8A598", // peach
];

export function ButterflyGarden() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const sprX = useSpring(mouseX, springConfig);
  const sprY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Initialize butterflies
    const initial = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length],
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));
    setButterflies(initial);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {butterflies.map((b) => (
        <ButterflyItem key={b.id} butterfly={b} sprX={sprX} sprY={sprY} />
      ))}
    </div>
  );
}

function ButterflyItem({ butterfly, sprX, sprY }: { butterfly: Butterfly; sprX: any; sprY: any }) {
  // Each butterfly will have a unique offset from the mouse
  const [offsetX] = useState((Math.random() - 0.5) * 300);
  const [offsetY] = useState((Math.random() - 0.5) * 300);
  const [speed] = useState(2 + Math.random() * 3);

  return (
    <motion.div
      style={{
        left: sprX,
        top: sprY,
        x: offsetX,
        y: offsetY,
      }}
      animate={{
        x: [offsetX, offsetX + 50, offsetX - 50, offsetX],
        y: [offsetY, offsetY - 30, offsetY + 30, offsetY],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute"
    >
      <motion.div
        animate={{
          rotateY: [0, 80, 0],
          rotateZ: [butterfly.rotation, butterfly.rotation + 10, butterfly.rotation],
        }}
        transition={{
          duration: 0.2 + Math.random() * 0.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <svg
          width={40 * butterfly.scale}
          height={40 * butterfly.scale}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Wings */}
          <path
            d="M50 50 C30 20 0 30 10 60 C20 80 50 70 50 50 Z"
            fill={butterfly.color}
            opacity="0.8"
          />
          <path
            d="M50 50 C70 20 100 30 90 60 C80 80 50 70 50 50 Z"
            fill={butterfly.color}
            opacity="0.8"
          />
          {/* Body */}
          <rect x="48" y="40" width="4" height="25" rx="2" fill="#2E2318" />
          {/* Antennae */}
          <line x1="50" y1="40" x2="40" y2="30" stroke="#2E2318" strokeWidth="1" />
          <line x1="50" y1="40" x2="60" y2="30" stroke="#2E2318" strokeWidth="1" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
