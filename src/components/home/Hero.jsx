import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const Hero = () => {
  const containerRef = useRef(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0.8, 0.2]);

  // Mouse tilt parallax for hero card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="zenji-hero" ref={containerRef}>
      <motion.div
        className="zenji-hero__backdrop"
        style={{ opacity: glowOpacity }}
      >
        <div className="zenji-hero__glow"></div>
      </motion.div>

      <div className="zenji-hero__container">
        {/* Animated Text Content */}
        <motion.div
          className="zenji-hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="zenji-hero__badge-row">
            <Badge variant="neon">DROP 004 // LIVE NOW</Badge>
            <span className="zenji-hero__tagline-sub">SS26 ARCHIVAL ARCHITECTURE</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="zenji-hero__title">
            CYBERNETIC <br />
            <span className="zenji-hero__title-accent">TACTICAL MINIMALISM</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="zenji-hero__subtitle">
            Engineered in Tokyo with custom 500 GSM French Terry, waterproof Cordura ripstop, and modular magnetic utility hardware.
          </motion.p>

          <motion.div variants={itemVariants} className="zenji-hero__cta-group">
            <Link to="/shop">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  EXPLORE DROP 004
                </Button>
              </motion.div>
            </Link>
            <Link to="/shop?category=hoodies">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg" icon={Flame}>
                  VIEW HOODIES
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="zenji-hero__stats">
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">500+</span>
              <span className="zenji-hero__stat-lbl">GSM CUSTOM MILLED</span>
            </div>
            <div className="zenji-hero__stat-div"></div>
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">LIMITED</span>
              <span className="zenji-hero__stat-lbl">BATCH RUNS</span>
            </div>
            <div className="zenji-hero__stat-div"></div>
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">100%</span>
              <span className="zenji-hero__stat-lbl">AUTHENTIC ARCHIVE</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image with Tilt and Scroll Parallax */}
        <motion.div
          className="zenji-hero__visual"
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: cardY }}
        >
          <motion.div
            className="zenji-hero__card"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
              alt="ZENJI Drop 004 Hero Lookbook"
              className="zenji-hero__card-img"
            />
            <div className="zenji-hero__card-overlay">
              <span className="zenji-hero__card-tag">EDITORIAL LOOKBOOK</span>
              <h3 className="zenji-hero__card-name">ARCHIVE DROP 004</h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
