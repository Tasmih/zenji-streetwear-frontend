import { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Eye, Compass, CornerDownRight, Zap, Clock } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

const LOOKBOOK_SLIDES = [
  {
    id: '01',
    code: 'ZN-HD-001',
    tag: 'LOOK 01 // 500 GSM HOODIE',
    category: 'HEAVYWEIGHT HOODIE',
    title: 'VOID OMNI HEAVYWEIGHT HOODIE',
    price: '$165',
    spec: '500 GSM BESPOKE FRENCH TERRY • BOXY CUT',
    details: 'Custom loopback knit with drop shoulders, double-layered structured hood & Fidlock® collar.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=hoodies'
  },
  {
    id: '02',
    code: 'ZN-TE-002',
    tag: 'LOOK 02 // GRAPHIC TEE',
    category: 'VINTAGE OVERSIZED TEE',
    title: 'CYBERPUNK GRAPHIC OVERSIZED TEE',
    price: '$85',
    spec: '300 GSM COMBED ORGANIC COTTON • VINTAGE WASH',
    details: 'High-density screenprinted dystopian anime artwork with distressed raw edge treatment.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=tees'
  },
  {
    id: '03',
    code: 'ZN-JK-003',
    tag: 'LOOK 03 // MODULAR OUTERWEAR',
    category: 'TACTICAL BOMBER',
    title: 'NEO-TACTICAL MODULAR BOMBER',
    price: '$280',
    spec: '500D CORDURA® RIPSTOP • DWR WEATHERPROOF',
    details: 'Multi-pocket articulated storm jacket with detachable Fidlock® magnetic sling harness.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=outerwear'
  }
];

const CATEGORY_CHIPS = [
  { label: '500 GSM HOODIES', path: '/shop?category=hoodies' },
  { label: 'GRAPHIC TEES', path: '/shop?category=tees' },
  { label: 'UTILITY CARGOS', path: '/shop?category=pants' },
  { label: 'MODULAR OUTERWEAR', path: '/shop?category=outerwear' }
];

// Helper component for cinematic word stagger animation with luxury smooth fade-up & soft focus reveal
const AnimatedText = ({ text, className, delayOffset = 0, wordDelay = 0.09 }) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delayOffset
      }
    }
  };

  const wordVariants = {
    hidden: {
      y: 28,
      opacity: 0,
      filter: 'blur(5px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.82,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.span
      className={`zenji-hero__stagger-word ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'inline-flex',
        flexWrap: 'nowrap',
        overflow: 'visible',
        columnGap: '0.28em'
      }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}-${word}`}
          variants={wordVariants}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'visible',
            willChange: 'transform, opacity, filter'
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Tokyo Live Drop Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: '04', minutes: '18', seconds: '35' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(23 - now.getHours()).padStart(2, '0');
      const minutes = String(59 - now.getMinutes()).padStart(2, '0');
      const seconds = String(59 - now.getSeconds()).padStart(2, '0');
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Multi-speed Scroll Parallax Layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layered movement: model moves noticeably slower than foreground elements during scroll
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const modelY = useTransform(scrollYProgress, [0, 1], [0, -28]); // Midground: moves slower
  const typographyY = useTransform(scrollYProgress, [0, 1], [0, -56]); // Foreground text: moves faster
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -78]); // Foreground card: moves fastest
  const glowOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  // Mouse tilt perspective for visual lookbook card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Softer spring physics for elegant, languid mouse parallax
  const springConfig = { damping: 38, stiffness: 105, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  // Subtle directional parallax for depth layers
  const bgMouseX = useSpring(useTransform(mouseX, [-0.5, 0.5], [16, -16]), springConfig);
  const bgMouseY = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const modelMouseX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const modelMouseY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), springConfig);
  const cardMouseX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const cardMouseY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);
  const textMouseX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  const textMouseY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), springConfig);

  // Combined Scroll + Mouse Transforms for seamless multi-axis movement
  const combinedModelY = useTransform([modelY, modelMouseY], ([s, m]) => s + m);
  const combinedCardY = useTransform([cardY, cardMouseY], ([s, m]) => s + m);
  const combinedTypographyY = useTransform([typographyY, textMouseY], ([s, m]) => s + m);
  const combinedBgY = useTransform([bgScrollY, bgMouseY], ([s, m]) => s + m);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
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

  // Ambient floating soft neon particles with Tokyo cyber streetwear palette
  const particles = useMemo(
    () => [
      { id: 0, top: '15%', left: '12%', size: 3, color: 'neon', duration: 7.5, delay: 0 },
      { id: 1, top: '28%', left: '48%', size: 2.5, color: 'cyan', duration: 9.0, delay: 0.8 },
      { id: 2, top: '65%', left: '22%', size: 2, color: 'neon', duration: 8.2, delay: 1.4 },
      { id: 3, top: '82%', left: '58%', size: 3, color: 'silver', duration: 10.5, delay: 0.4 },
      { id: 4, top: '22%', left: '85%', size: 2.5, color: 'cyan', duration: 8.8, delay: 1.2 },
      { id: 5, top: '45%', left: '38%', size: 3.5, color: 'neon', duration: 9.4, delay: 2.0 },
      { id: 6, top: '75%', left: '78%', size: 2, color: 'crimson', duration: 7.8, delay: 1.8 },
      { id: 7, top: '35%', left: '6%', size: 2.5, color: 'cyan', duration: 8.5, delay: 0.6 },
      { id: 8, top: '12%', left: '70%', size: 2, color: 'silver', duration: 9.8, delay: 1.5 },
      { id: 9, top: '55%', left: '92%', size: 3, color: 'neon', duration: 8.0, delay: 2.4 },
      { id: 10, top: '88%', left: '34%', size: 2.5, color: 'cyan', duration: 11.0, delay: 1.0 },
      { id: 11, top: '40%', left: '62%', size: 2, color: 'neon', duration: 7.2, delay: 0.2 },
      { id: 12, top: '18%', left: '32%', size: 3, color: 'silver', duration: 9.2, delay: 1.7 },
      { id: 13, top: '68%', left: '45%', size: 2.5, color: 'cyan', duration: 8.4, delay: 2.2 },
      { id: 14, top: '50%', left: '16%', size: 2, color: 'crimson', duration: 10.0, delay: 0.9 },
      { id: 15, top: '85%', left: '10%', size: 3, color: 'neon', duration: 8.6, delay: 2.6 }
    ],
    []
  );

  const currentSlideData = LOOKBOOK_SLIDES[activeSlide];

  return (
    <section
      className="zenji-hero zenji-hero--cinematic"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Visual Atmosphere & Ambient Mesh */}
      <motion.div className="zenji-hero__backdrop" style={{ opacity: glowOpacity, x: bgMouseX, y: combinedBgY }}>
        <div className="zenji-hero__glow zenji-hero__glow--primary" />
        <div className="zenji-hero__glow zenji-hero__glow--secondary" />
        <div className="zenji-hero__glow zenji-hero__glow--tertiary" />
        <div className="zenji-hero__glow zenji-hero__glow--quaternary" />
        <div className="zenji-hero__grid-pattern" />
        <div className="zenji-hero__grid-horizon" />
        <div className="zenji-hero__light-sweep" aria-hidden="true" />
        <div className="zenji-hero__noise-overlay" />

        {/* Floating Luminous Particles */}
        <div className="zenji-hero__particles-container" aria-hidden="true">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className={`zenji-hero__particle zenji-hero__particle--${p.color}`}
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size
              }}
              animate={{
                y: [-18, 18, -18],
                x: [-6, 6, -6],
                opacity: [0.15, 0.75, 0.15],
                scale: [0.85, 1.25, 0.85]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cybernetic HUD Coordinate System Bar */}
      <motion.div
        className="zenji-hero__hud-top"
        style={{ y: hudY }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="zenji-hero__hud-left">
          <span className="zenji-hero__hud-marker">[+]</span>
          <span className="zenji-hero__coord">35.6580° N / 139.7016° E • TOKYO ATELIER PROTOCOL</span>
        </div>

        {/* Live Limited Drop Countdown Timer */}
        <div className="zenji-hero__countdown-wrap">
          <Clock size={11} className="zenji-hero__countdown-icon" />
          <span className="zenji-hero__countdown-lbl">DROP 004 EXPIRES:</span>
          <span className="zenji-hero__countdown-val">{timeLeft.hours}H : {timeLeft.minutes}M : {timeLeft.seconds}S</span>
          <span className="zenji-hero__sys-dot" />
        </div>

        <div className="zenji-hero__hud-right">
          <span className="zenji-hero__coord-cyan">ARCHIVE SERIES // 150 PCS WORLDWIDE</span>
        </div>
      </motion.div>

      {/* Ambient Japanese Kanji Watermark */}
      <motion.div
        className="zenji-hero__kanji-bg"
        style={{ y: bgTextY, x: bgMouseX }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <span>禅侍未来</span>
      </motion.div>

      <div className="zenji-hero__container">
        {/* Column 1 (Left): Kinetic Editorial Typography & CTAs */}
        <motion.div
          className="zenji-hero__content"
          style={{ y: combinedTypographyY, x: textMouseX }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Capsule Badge Row */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__badge-row"
          >
            <Badge variant="neon">
              <Zap size={10} className="zenji-badge__icon" />
              TOKYO LUXURY STREETWEAR
            </Badge>
            <Badge variant="cyan">
              500 GSM DROP
            </Badge>
            <div className="zenji-hero__season-tag">
              <span className="zenji-hero__season-dot" />
              [ 禅時 // SS26 ARCHIVE ]
            </div>
          </motion.div>

          {/* Staggered Word-by-Word Headline Reveal */}
          <div className="zenji-hero__title-wrap">
            <div className="zenji-hero__line-mask">
              <h2 className="zenji-hero__title zenji-hero__title--sub">
                <AnimatedText text="PREMIUM JAPANESE STREETWEAR" delayOffset={0.16} wordDelay={0.08} />
              </h2>
            </div>

            <div className="zenji-hero__line-mask">
              <h1 className="zenji-hero__title zenji-hero__title--main">
                <AnimatedText text="OVERSIZED HOODIES" delayOffset={0.34} wordDelay={0.11} />
              </h1>
            </div>

            <div className="zenji-hero__line-mask">
              <h1 className="zenji-hero__title zenji-hero__title--stroke">
                <AnimatedText text="& GRAPHIC TEES" delayOffset={0.52} wordDelay={0.10} />
              </h1>
            </div>
          </div>

          {/* Editorial Subtitle & Description — Smooth Upward Motion */}
          <motion.p
            initial={{ opacity: 0, y: 26, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__subtitle"
          >
            Custom-milled <strong>500 GSM loopback cotton</strong>, relaxed oversized silhouettes, and tactical modular tailoring engineered in Tokyo. Limited small batch runs.
          </motion.p>

          {/* Category Quick-Jump Chips — Staggered Upward Entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.88 }
              }
            }}
            className="zenji-hero__chips-row"
          >
            {CATEGORY_CHIPS.map((chip) => (
              <motion.div
                key={chip.label}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.94, filter: 'blur(3px)' },
                  visible: {
                    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                <Link
                  to={chip.path}
                  className="zenji-hero__category-chip"
                >
                  <span>{chip.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Magnetic Luxury CTA Action Group — Delayed Entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 1.08 }
              }
            }}
            className="zenji-hero__cta-group"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96, filter: 'blur(3px)' },
                visible: {
                  opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              <Link to="/shop" className="zenji-hero__cta-link">
                <motion.div
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="zenji-hero__cta-primary-wrap"
                >
                  <Button variant="primary" size="lg" icon={ArrowRight}>
                    SHOP COLLECTION
                  </Button>
                  <span className="zenji-hero__btn-glow" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96, filter: 'blur(3px)' },
                visible: {
                  opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              <Link to="/shop?category=hoodies" className="zenji-hero__cta-link">
                <motion.div
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button variant="outline" size="lg" icon={Sparkles}>
                    EXPLORE HOODIES
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Editorial Specification Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 1.28, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__stats zenji-hero__stats--editorial"
          >
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">500 GSM</span>
              <span className="zenji-hero__stat-lbl">BESPOKE FLEECE</span>
            </div>
            <div className="zenji-hero__stat-div" />
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">BOXY CUT</span>
              <span className="zenji-hero__stat-lbl">OVERSIZED DRAPE</span>
            </div>
            <div className="zenji-hero__stat-div" />
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">150 PCS</span>
              <span className="zenji-hero__stat-lbl">LIMITED RUN</span>
            </div>
            <div className="zenji-hero__stat-div" />
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">EXPRESS</span>
              <span className="zenji-hero__stat-lbl">WORLDWIDE DISPATCH</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Column 2 (Center-Right): Supporting Editorial Streetwear Fashion Model (Layered Depth) */}
        <motion.div
          className="zenji-hero__model-stage"
          style={{ y: combinedModelY, x: modelMouseX }}
          initial={{ opacity: 0, y: 40, scale: 0.94, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {/* Soft Cinematic Atmosphere & Volumetric Haze Behind Model */}
          <div className="zenji-hero__model-cinematic-glow" />
          <div className="zenji-hero__model-rim-glow" />
          <div className="zenji-hero__model-rim-glow-warm" />
          <div className="zenji-hero__model-ground-shadow" />

          {/* Ultra-Slow Luxury Floating + Cinematic Zoom Drift */}
          <motion.div
            className="zenji-hero__model-float-wrap"
            animate={{
              y: [-4, 4, -4],
              scale: [1, 1.012, 1]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <img
              src="/hero-model.jpg"
              alt="ZENJI Tokyo Night Streetwear Editorial Campaign Model"
              className="zenji-hero__model-img"
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* Right Column: Cinematic 3D Lookbook Visual Showcase with Multi-Layer Depth */}
        <motion.div
          className="zenji-hero__visual-wrap"
          initial={{ opacity: 0, x: 38, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.15, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: combinedCardY, x: cardMouseX }}
        >
          {/* Layered Architectural Depth Backplates */}
          <div className="zenji-hero__card-depth-layer" aria-hidden="true" />
          <div className="zenji-hero__card-depth-layer-2" aria-hidden="true" />

          {/* Dynamic Floating 3D Contact Shadow */}
          <div className="zenji-hero__card-floating-shadow" aria-hidden="true" />

          {/* Continuous Floating & Breathing Animation Wrapper */}
          <motion.div
            className="zenji-hero__card-float-wrapper"
            animate={{
              y: [-8, 8, -8],
              rotateZ: [-0.6, 0.6, -0.6],
              rotateX: [-1.2, 1.2, -1.2]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Main 3D Tilted Lookbook Card */}
            <motion.div
              className="zenji-hero__card zenji-hero__card--cinematic"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Reactive Cursor Specular Glare */}
              <motion.div
                className="zenji-hero__card-dynamic-glare"
                style={{
                  background: useTransform(
                    [mouseX, mouseY],
                    ([latestX, latestY]) =>
                      `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(212, 255, 0, 0.16) 0%, rgba(0, 245, 255, 0.08) 35%, transparent 70%)`
                  )
                }}
                aria-hidden="true"
              />

              {/* Glowing Animated Border Beam */}
              <div className="zenji-hero__card-border-beam" />

              {/* Holographic Scanning Laser Line */}
              <div className="zenji-hero__card-scanner-beam" aria-hidden="true" />

              {/* Corner Precision Crosshairs */}
              <span className="zenji-hero__corner-mark zenji-hero__corner-mark--tl">+</span>
              <span className="zenji-hero__corner-mark zenji-hero__corner-mark--tr">+</span>
              <span className="zenji-hero__corner-mark zenji-hero__corner-mark--bl">+</span>
              <span className="zenji-hero__corner-mark zenji-hero__corner-mark--br">+</span>

              {/* Scanline & Texture Layers */}
              <div className="zenji-hero__card-scanline" />
              <div className="zenji-hero__card-vignette" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideData.image}
                  className="zenji-hero__img-container"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="zenji-hero__card-img"
                    animate={{
                      scale: [1, 1.035, 1]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Holographic Tag with 3D Depth Layering */}
              <div className="zenji-hero__card-top-tag" style={{ transform: 'translateZ(28px)' }}>
                <span className="zenji-hero__hologram-pill">
                  <Shield size={11} />
                  {currentSlideData.category}
                </span>
                <span className="zenji-hero__card-price-tag">
                  {currentSlideData.price} USD
                </span>
                <span className="zenji-hero__card-id">{currentSlideData.code}</span>
              </div>

              {/* Bottom Overlay Info with Lookbook Switcher & 3D Depth */}
              <div className="zenji-hero__card-overlay" style={{ transform: 'translateZ(38px)' }}>
                <div className="zenji-hero__card-meta">
                  <div className="zenji-hero__card-tag-row">
                    <span className="zenji-hero__card-tag">{currentSlideData.tag}</span>
                    <span className="zenji-hero__card-pill">SS26</span>
                  </div>
                  <div className="zenji-hero__card-title-row">
                    <h3 className="zenji-hero__card-name">{currentSlideData.title}</h3>
                    <Link to={currentSlideData.link} className="zenji-hero__card-view-btn">
                      SHOP PIECE <ArrowRight size={11} />
                    </Link>
                  </div>
                  <p className="zenji-hero__card-spec">{currentSlideData.spec}</p>
                  <p className="zenji-hero__card-desc">{currentSlideData.details}</p>
                </div>

                {/* Lookbook Angle Switcher Tabs */}
                <div className="zenji-hero__card-tabs-row">
                  <span className="zenji-hero__tabs-title">
                    <Compass size={11} /> SELECT PIECE:
                  </span>
                  <div className="zenji-hero__card-tabs">
                    {LOOKBOOK_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlide(idx)}
                        className={`zenji-hero__card-tab ${activeSlide === idx ? 'zenji-hero__card-tab--active' : ''
                          }`}
                        aria-label={`View ${slide.title}`}
                      >
                        {activeSlide === idx && (
                          <motion.div
                            layoutId="activeLookGlider"
                            className="zenji-hero__tab-glider"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="zenji-hero__tab-num">{slide.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Spec Capsule Card with Independent Multi-Speed Floating Physics */}
          <motion.div
            className="zenji-hero__floating-card"
            style={{ y: floatingCardY }}
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, borderColor: 'var(--accent-cyan)' }}
          >
            <motion.div
              animate={{
                y: [-3, 4, -3],
                x: [-2, 2, -2]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div className="zenji-hero__floating-icon">
                <Eye size={15} />
              </div>
              <div className="zenji-hero__floating-text">
                <strong>500 GSM HEAVYWEIGHT DROP</strong>
                <span>LIMITED 150 PCS • TOKYO ARCHIVE SPEC</span>
              </div>
              <CornerDownRight size={14} className="zenji-hero__floating-arrow" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Cybernetic Luxury Scroll Indicator */}
      <motion.div
        className="zenji-hero__scroll-indicator"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#featured-drops" className="zenji-hero__scroll-track" aria-label="Scroll to featured collection">
          <div className="zenji-hero__scroll-mouse">
            <motion.span
              className="zenji-hero__scroll-wheel"
              animate={{ y: [0, 7, 0], opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="zenji-hero__scroll-text">SCROLL // スクロール</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;

