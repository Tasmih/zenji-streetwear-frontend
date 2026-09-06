import { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Eye, Compass, CornerDownRight, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

const LOOKBOOK_SLIDES = [
  {
    id: '01',
    code: 'ZN-LOOK-01',
    tag: 'LOOK 01 // TOKYO VOID',
    title: 'VOID OMNI HOODIE',
    spec: '500 GSM FRENCH TERRY • OVERSIZED DROP',
    details: 'Heavyweight custom knit with concealed thumbhole cuffs & Fidlock® magnetic neck strap.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '02',
    code: 'ZN-LOOK-02',
    tag: 'LOOK 02 // TACTICAL SPEC',
    title: 'MODULAR BOMBER JACKET',
    spec: 'CORDURA® RIPSTOP • DWR WEATHERPROOF',
    details: 'Multi-pocket articulated storm jacket with detachable sling harness and taped zippers.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '03',
    code: 'ZN-LOOK-03',
    tag: 'LOOK 03 // CYBER ARCHIVE',
    title: 'CYBER CARGO SYSTEM',
    spec: '8-POCKET ARTICULATED • TAPERED FIT',
    details: 'Ergonomic knee darts, reinforced seat, magnetic cargo flaps, and fidlock cinch ankles.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
  }
];

// Helper component for letter-by-letter headline stagger animation
const AnimatedText = ({ text, className, delayOffset = 0, charDelay = 0.03 }) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: charDelay,
        delayChildren: delayOffset
      }
    }
  };

  const letterVariants = {
    hidden: {
      y: '115%',
      opacity: 0,
      rotateX: 40,
      filter: 'blur(6px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
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
      style={{ display: 'inline-flex', overflow: 'hidden' }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformOrigin: 'bottom'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Multi-speed Scroll Parallax Layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const floatingCardY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const typographyY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const hudY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  // Mouse tilt perspective for visual lookbook card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig);

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

  // Ambient floating particles
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        top: `${(i * 19) % 95}%`,
        left: `${(i * 27) % 95}%`,
        size: (i % 3) + 2,
        duration: 4 + (i % 5) * 1.5,
        delay: (i % 4) * 0.8
      })),
    []
  );

  const currentSlideData = LOOKBOOK_SLIDES[activeSlide];

  return (
    <section className="zenji-hero zenji-hero--cinematic" ref={containerRef}>
      {/* Background Visual Atmosphere & Ambient Mesh */}
      <motion.div className="zenji-hero__backdrop" style={{ opacity: glowOpacity }}>
        <div className="zenji-hero__glow zenji-hero__glow--primary" />
        <div className="zenji-hero__glow zenji-hero__glow--secondary" />
        <div className="zenji-hero__glow zenji-hero__glow--tertiary" />
        <div className="zenji-hero__grid-pattern" />
        <div className="zenji-hero__noise-overlay" />

        {/* Floating Luminous Particles */}
        <div className="zenji-hero__particles-container" aria-hidden="true">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="zenji-hero__particle"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.85, 0.2],
                scale: [0.9, 1.3, 0.9]
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
      <motion.div className="zenji-hero__hud-top" style={{ y: hudY }}>
        <div className="zenji-hero__hud-left">
          <span className="zenji-hero__hud-marker">[+]</span>
          <span className="zenji-hero__coord">35.6580° N / 139.7016° E • TYO-SHIBUYA PROTOCOL</span>
        </div>

        <div className="zenji-hero__sys-badge">
          <span className="zenji-hero__sys-dot" />
          <span>DROP 004 // LIVE ARCHIVE</span>
        </div>

        <div className="zenji-hero__hud-right">
          <span className="zenji-hero__coord-cyan">ARCHIVE SERIES // 150 PCS WORLDWIDE</span>
        </div>
      </motion.div>

      {/* Ambient Japanese Kanji Watermark */}
      <motion.div className="zenji-hero__kanji-bg" style={{ y: bgTextY }} aria-hidden="true">
        <span>禅侍未来</span>
      </motion.div>

      <div className="zenji-hero__container">
        {/* Left Column: Kinetic Editorial Typography & CTAs */}
        <motion.div
          className="zenji-hero__content"
          style={{ y: typographyY }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Capsule Row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__badge-row"
          >
            <Badge variant="neon">
              <Zap size={10} className="zenji-badge__icon" />
              DROP 004 // CYBER OMNI
            </Badge>
            <Badge variant="cyan">
              TOKYO SPEC
            </Badge>
            <div className="zenji-hero__season-tag">
              <span className="zenji-hero__season-dot" />
              SS26 ARCHIVE EDITION
            </div>
          </motion.div>

          {/* Letter-by-Letter Masked Headline Reveal */}
          <div className="zenji-hero__title-wrap">
            <div className="zenji-hero__line-mask">
              <div className="zenji-hero__headline-sub-wrap">
                <h2 className="zenji-hero__title zenji-hero__title--sub">
                  <AnimatedText text="TOKYO ARCHIVAL" delayOffset={0.1} charDelay={0.025} />
                </h2>
                <span className="zenji-hero__title-accent-tag">#SS26</span>
              </div>
            </div>

            <div className="zenji-hero__line-mask">
              <h1 className="zenji-hero__title zenji-hero__title--main">
                <AnimatedText text="TACTICAL" delayOffset={0.25} charDelay={0.035} />
              </h1>
            </div>

            <div className="zenji-hero__line-mask">
              <h1 className="zenji-hero__title zenji-hero__title--stroke">
                <AnimatedText text="MINIMALISM" delayOffset={0.42} charDelay={0.035} />
              </h1>
            </div>
          </div>

          {/* Editorial Subtitle & Specs */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__subtitle"
          >
            Bespoke <strong>500 GSM loopback French Terry</strong> and weatherproof <strong>Cordura® ripstop</strong> engineered with German <strong>Fidlock® magnetic hardware</strong>. Uncompromising post-industrial luxury tailoring crafted for the dystopian metropolis.
          </motion.p>

          {/* Magnetic Luxury CTA Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__cta-group"
          >
            <Link to="/shop" className="zenji-hero__cta-link">
              <motion.div
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.965 }}
                className="zenji-hero__cta-primary-wrap"
              >
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  EXPLORE DROP 004
                </Button>
                <span className="zenji-hero__btn-glow" />
              </motion.div>
            </Link>

            <Link to="/shop?category=hoodies" className="zenji-hero__cta-link">
              <motion.div
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.965 }}
              >
                <Button variant="outline" size="lg" icon={Sparkles}>
                  VIEW HOODIES
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Editorial Specification Strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__stats zenji-hero__stats--editorial"
          >
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">500 GSM</span>
              <span className="zenji-hero__stat-lbl">BESPOKE COTTON</span>
            </div>
            <div className="zenji-hero__stat-div" />
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">CORDURA®</span>
              <span className="zenji-hero__stat-lbl">WATERPROOF RIPSTOP</span>
            </div>
            <div className="zenji-hero__stat-div" />
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">FIDLOCK®</span>
              <span className="zenji-hero__stat-lbl">MAGNETIC HARDWARE</span>
            </div>
            <div className="zenji-hero__stat-div" />
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">24H</span>
              <span className="zenji-hero__stat-lbl">EXPRESS DISPATCH</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Cinematic 3D Lookbook Visual Showcase */}
        <motion.div
          className="zenji-hero__visual-wrap"
          initial={{ opacity: 0, x: 80, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.15, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: cardY }}
        >
          {/* Continuous Floating & Breathing Animation Wrapper */}
          <motion.div
            className="zenji-hero__card-float-wrapper"
            animate={{
              y: [-7, 7, -7]
            }}
            transition={{
              duration: 5.5,
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
              {/* Glowing Animated Border Beam */}
              <div className="zenji-hero__card-border-beam" />

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

              {/* Top Holographic Tag */}
              <div className="zenji-hero__card-top-tag">
                <span className="zenji-hero__hologram-pill">
                  <Shield size={11} />
                  NFC ENCRYPTED SPEC
                </span>
                <span className="zenji-hero__card-id">{currentSlideData.code}</span>
              </div>

              {/* Bottom Overlay Info with Lookbook Switcher */}
              <div className="zenji-hero__card-overlay">
                <div className="zenji-hero__card-meta">
                  <div className="zenji-hero__card-tag-row">
                    <span className="zenji-hero__card-tag">{currentSlideData.tag}</span>
                    <span className="zenji-hero__card-pill">SS26</span>
                  </div>
                  <h3 className="zenji-hero__card-name">{currentSlideData.title}</h3>
                  <p className="zenji-hero__card-spec">{currentSlideData.spec}</p>
                  <p className="zenji-hero__card-desc">{currentSlideData.details}</p>
                </div>

                {/* Lookbook Angle Switcher Tabs */}
                <div className="zenji-hero__card-tabs-row">
                  <span className="zenji-hero__tabs-title">
                    <Compass size={11} /> SELECT LOOK:
                  </span>
                  <div className="zenji-hero__card-tabs">
                    {LOOKBOOK_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlide(idx)}
                        className={`zenji-hero__card-tab ${
                          activeSlide === idx ? 'zenji-hero__card-tab--active' : ''
                        }`}
                        aria-label={`View ${slide.title}`}
                      >
                        <span className="zenji-hero__tab-num">{slide.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Spec Capsule Card (Multi-speed Parallax) */}
          <motion.div
            className="zenji-hero__floating-card"
            style={{ y: floatingCardY }}
            initial={{ opacity: 0, x: -25, y: 25 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, borderColor: 'var(--accent-cyan)' }}
          >
            <div className="zenji-hero__floating-icon">
              <Eye size={15} />
            </div>
            <div className="zenji-hero__floating-text">
              <strong>EDITORIAL DROP 004</strong>
              <span>LIMITED 150 PCS • TYO ARCHIVE SPEC</span>
            </div>
            <CornerDownRight size={14} className="zenji-hero__floating-arrow" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


