import { motion } from "motion/react";

interface RealisticFlowerProps {
  className?: string;
  color?: string;
  delay?: number;
  type?: 'rose' | 'lotus' | 'daisy';
}

export function RealisticFlower({ className = "", color = "#C27A88", delay = 0, type = 'rose' }: RealisticFlowerProps) {
  const colorId = color.replace('#', '');

  const renderRose = () => {
    const layers = [
      { count: 6, scale: 1.0, rotationOffset: 0, brightness: 1.1 },
      { count: 6, scale: 0.85, rotationOffset: 30, brightness: 1.0 },
      { count: 5, scale: 0.7, rotationOffset: 60, brightness: 0.9 },
      { count: 5, scale: 0.55, rotationOffset: 90, brightness: 0.8 },
      { count: 4, scale: 0.4, rotationOffset: 120, brightness: 0.7 },
      { count: 3, scale: 0.25, rotationOffset: 150, brightness: 0.6 },
    ];

    return (
      <>
        <defs>
          <radialGradient id={`rose-grad-${colorId}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </radialGradient>
        </defs>
        {layers.map((layer, layerIdx) => (
          <g key={`layer-${layerIdx}`} style={{ filter: `brightness(${layer.brightness})` }}>
            {Array.from({ length: layer.count }).map((_, i) => {
              const rotation = (i * (360 / layer.count)) + layer.rotationOffset;
              return (
                <motion.path
                  key={`petal-${layerIdx}-${i}`}
                  d="M50,50 C15,30 5,-15 50,-10 C85,-5 85,35 50,50 Z"
                  fill={`url(#rose-grad-${colorId})`}
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="0.5"
                  style={{ transformOrigin: "50px 50px" }}
                  initial={{ scale: 0, rotate: rotation - 45 }}
                  animate={{ scale: layer.scale, rotate: rotation }}
                  transition={{
                    duration: 2.5,
                    delay: delay + (layerIdx * 0.15) + (i * 0.05),
                    type: "spring",
                    bounce: 0.15
                  }}
                />
              );
            })}
          </g>
        ))}
        <motion.circle
          cx="50" cy="50" r="4"
          fill="rgba(0,0,0,0.4)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: delay + 1.5 }}
        />
      </>
    );
  };

  const renderLotus = () => {
    const layers = [
      { count: 8, scale: 1.0, rotationOffset: 0, brightness: 1.0 },
      { count: 8, scale: 0.8, rotationOffset: 22.5, brightness: 0.9 },
      { count: 6, scale: 0.55, rotationOffset: 15, brightness: 0.8 },
    ];

    return (
      <>
        <defs>
          <radialGradient id={`lotus-grad-${colorId}`} cx="50%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.9" />
          </radialGradient>
        </defs>
        {layers.map((layer, layerIdx) => (
          <g key={`layer-${layerIdx}`} style={{ filter: `brightness(${layer.brightness})` }}>
            {Array.from({ length: layer.count }).map((_, i) => {
              const rotation = (i * (360 / layer.count)) + layer.rotationOffset;
              return (
                <motion.path
                  key={`petal-${layerIdx}-${i}`}
                  d="M50,50 C20,30 35,5 50,0 C65,5 80,30 50,50 Z"
                  fill={`url(#lotus-grad-${colorId})`}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.5"
                  style={{ transformOrigin: "50px 50px" }}
                  initial={{ scale: 0, rotate: rotation }}
                  animate={{ scale: layer.scale, rotate: rotation }}
                  transition={{
                    duration: 2.0,
                    delay: delay + (layerIdx * 0.2) + (i * 0.05),
                    type: "spring",
                    bounce: 0.2
                  }}
                />
              );
            })}
          </g>
        ))}
        <motion.circle
          cx="50" cy="50" r="6"
          fill="#FFD700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: delay + 1.0 }}
        />
      </>
    );
  };

  const renderDaisy = () => {
    const layers = [
      { count: 16, scale: 1.0, rotationOffset: 0, brightness: 1.0 },
      { count: 16, scale: 0.9, rotationOffset: 11.25, brightness: 0.95 },
    ];

    return (
      <>
        <defs>
          <linearGradient id={`daisy-grad-${colorId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        {layers.map((layer, layerIdx) => (
          <g key={`layer-${layerIdx}`} style={{ filter: `brightness(${layer.brightness})` }}>
            {Array.from({ length: layer.count }).map((_, i) => {
              const rotation = (i * (360 / layer.count)) + layer.rotationOffset;
              return (
                <motion.path
                  key={`petal-${layerIdx}-${i}`}
                  d="M46,50 C46,20 47,5 50,5 C53,5 54,20 54,50 Z"
                  fill={`url(#daisy-grad-${colorId})`}
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="0.5"
                  style={{ transformOrigin: "50px 50px" }}
                  initial={{ scale: 0, rotate: rotation }}
                  animate={{ scale: layer.scale, rotate: rotation }}
                  transition={{
                    duration: 1.5,
                    delay: delay + (layerIdx * 0.1) + (i * 0.02),
                    type: "spring",
                    bounce: 0.3
                  }}
                />
              );
            })}
          </g>
        ))}
        {/* Daisy Center */}
        <motion.circle
          cx="50" cy="50" r="12"
          fill="#D4AF37"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: delay + 0.8, type: "spring" }}
        />
        {/* Center texture dots */}
        {Array.from({ length: 24 }).map((_, i) => {
          const radius = 3 + Math.random() * 7;
          const angle = Math.random() * Math.PI * 2;
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={50 + Math.cos(angle) * radius}
              cy={50 + Math.sin(angle) * radius}
              r="1"
              fill="#8B6508"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: delay + 1.0 + (i * 0.02) }}
            />
          );
        })}
      </>
    );
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay }}
    >
      <motion.svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
        {type === 'rose' && renderRose()}
        {type === 'lotus' && renderLotus()}
        {type === 'daisy' && renderDaisy()}
      </motion.svg>
    </motion.div>
  );
}
