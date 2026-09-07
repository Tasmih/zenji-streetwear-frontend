import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InitialLoader = ({ onComplete, duration = 1800 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="zenji-initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -16,
            filter: 'blur(8px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }}
          aria-hidden={!isVisible}
          role="status"
          aria-label="Loading ZENJI Tokyo Atelier"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="zenji-initial-loader__glow" aria-hidden="true" />
          <div className="zenji-initial-loader__grid" aria-hidden="true" />

          {/* Corner Precision Crosshairs */}
          <span className="zenji-initial-loader__corner zenji-initial-loader__corner--tl" aria-hidden="true">+</span>
          <span className="zenji-initial-loader__corner zenji-initial-loader__corner--tr" aria-hidden="true">+</span>
          <span className="zenji-initial-loader__corner zenji-initial-loader__corner--bl" aria-hidden="true">+</span>
          <span className="zenji-initial-loader__corner zenji-initial-loader__corner--br" aria-hidden="true">+</span>

          {/* Central Luxury Brand Showcase */}
          <div className="zenji-initial-loader__content">
            {/* Top Coordinate Header */}
            <motion.div
              className="zenji-initial-loader__header"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="zenji-initial-loader__tag">SYSTEM // ATELIER</span>
              <span className="zenji-initial-loader__dot">•</span>
              <span className="zenji-initial-loader__coords">TYO 35.6580° N, 139.7016° E</span>
            </motion.div>

            {/* Logo Mark: Japanese Glyph & Brand Title */}
            <div className="zenji-initial-loader__logo">
              {/* Kanji Emblem with Scale & Glow */}
              <motion.span
                className="zenji-initial-loader__jp"
                initial={{ opacity: 0, scale: 0.65, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                禅侍
              </motion.span>

              {/* Brand Title with Kinetic Letter-Spacing Reveal & De-blur */}
              <motion.div
                className="zenji-initial-loader__title-wrap"
                initial={{ opacity: 0, y: 16, letterSpacing: '0.48em', filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.22em', filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="zenji-initial-loader__title">ZENJI</h1>
                <span className="zenji-initial-loader__sub">TOKYO ATELIER</span>
              </motion.div>
            </div>

            {/* Precision Neon Lime Animated Line */}
            <div className="zenji-initial-loader__line-wrap" aria-hidden="true">
              <motion.div
                className="zenji-initial-loader__line-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="zenji-initial-loader__line-glow"
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Bottom Status & Precision Meta */}
            <div className="zenji-initial-loader__footer">
              <motion.span
                className="zenji-initial-loader__status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ARCHIVE ENGINE // TOKYO STUDIO
              </motion.span>

              <motion.span
                className="zenji-initial-loader__counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                AUTUMN / WINTER 2026
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
