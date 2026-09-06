import { memo } from 'react';
import { motion } from 'framer-motion';

export const BackgroundAtmosphere = memo(() => {
  return (
    <div className="zenji-global-atmosphere" aria-hidden="true">
      {/* Subtle Moving Cyber Grid */}
      <div className="zenji-global-atmosphere__grid" />

      {/* High-Fidelity Noise Texture Overlay */}
      <div className="zenji-global-atmosphere__noise" />

      {/* Morphing & Moving Atmospheric Glow Orbs */}
      <motion.div
        className="zenji-global-atmosphere__glow zenji-global-atmosphere__glow--lime"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.07, 0.12, 0.08, 0.07]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="zenji-global-atmosphere__glow zenji-global-atmosphere__glow--cyan"
        animate={{
          x: [0, -45, 35, 0],
          y: [0, 40, -35, 0],
          scale: [1, 1.12, 0.92, 1],
          opacity: [0.06, 0.11, 0.06, 0.06]
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      <motion.div
        className="zenji-global-atmosphere__glow zenji-global-atmosphere__glow--crimson"
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -30, 45, 0],
          scale: [0.9, 1.1, 0.95, 0.9],
          opacity: [0.04, 0.08, 0.05, 0.04]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5
        }}
      />

      {/* Cybernetic Ambient Light Beam Sweep */}
      <div className="zenji-global-atmosphere__beam" />
    </div>
  );
});

BackgroundAtmosphere.displayName = 'BackgroundAtmosphere';
export default BackgroundAtmosphere;
