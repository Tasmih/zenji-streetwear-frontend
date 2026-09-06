import { useRef, useState } from 'react';
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

export const Hero = () => {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  // Mouse tilt perspective for visual lookbook card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 240 };
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

  // Kinetic Typography Animation Variants
  const lineVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.95,
        delay: 0.12 * i,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const currentSlideData = LOOKBOOK_SLIDES[activeSlide];

  return (
    <section className="zenji-hero zenji-hero--cinematic" ref={containerRef}>
      {/* Background Visual Atmosphere & Ambient Lighting */}
      <motion.div className="zenji-hero__backdrop" style={{ opacity: glowOpacity }}>
        <div className="zenji-hero__glow zenji-hero__glow--primary" />
        <div className="zenji-hero__glow zenji-hero__glow--secondary" />
        <div className="zenji-hero__glow zenji-hero__glow--tertiary" />
        <div className="zenji-hero__grid-pattern" />
        <div className="zenji-hero__noise-overlay" />
      </motion.div>

      {/* Cybernetic HUD Coordinate System Bar */}
      <div className="zenji-hero__hud-top">
        <div className="zenji-hero__hud-left">
          <span className="zenji-hero__hud-marker">[+]</span>
          <span className="zenji-hero__coord">35.6764° N / 139.6500° E • SHIBUYA PROTOCOL</span>
        </div>

        <div className="zenji-hero__sys-badge">
          <span className="zenji-hero__sys-dot" />
          <span>DROP 004 // LIVE ARCHIVE</span>
        </div>

        <div className="zenji-hero__hud-right">
          <span className="zenji-hero__coord">LIMITED TOKYO RUN • 250 UNITS</span>
        </div>
      </div>

      {/* Ambient Japanese Kanji Watermark */}
      <motion.div className="zenji-hero__kanji-bg" style={{ y: bgTextY }} aria-hidden="true">
        <span>禅侍極限</span>
      </motion.div>

      <div className="zenji-hero__container">
        {/* Left Column: Kinetic Editorial Typography & CTAs */}
        <motion.div
          className="zenji-hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            <div className="zenji-hero__season-tag">
              <span className="zenji-hero__season-dot" />
              SS26 ARCHIVE EDITION
            </div>
          </motion.div>

          {/* Masked Headline Reveal */}
          <div className="zenji-hero__title-wrap">
            <div className="zenji-hero__line-mask">
              <motion.div
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="zenji-hero__headline-sub-wrap"
              >
                <span className="zenji-hero__title zenji-hero__title--sub">
                  TOKYO ARCHIVAL
                </span>
                <span className="zenji-hero__title-accent-tag">#SS26</span>
              </motion.div>
            </div>

            <div className="zenji-hero__line-mask">
              <motion.h1
                custom={2}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="zenji-hero__title zenji-hero__title--main"
              >
                TACTICAL
              </motion.h1>
            </div>

            <div className="zenji-hero__line-mask">
              <motion.h1
                custom={3}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="zenji-hero__title zenji-hero__title--stroke"
              >
                MINIMALISM
              </motion.h1>
            </div>
          </div>

          {/* Editorial Subtitle & Specs */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__subtitle"
          >
            Bespoke <strong>500 GSM loopback French Terry</strong> and weatherproof <strong>Cordura® ripstop</strong> engineered with German <strong>Fidlock® magnetic hardware</strong>. Uncompromising post-industrial luxury tailoring crafted for the dystopian metropolis.
          </motion.p>

          {/* Magnetic Luxury CTA Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__cta-group"
          >
            <Link to="/shop" className="zenji-hero__cta-link">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
            transition={{ duration: 0.85, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: cardY }}
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
            {/* Corner Precision Crosshairs */}
            <span className="zenji-hero__corner-mark zenji-hero__corner-mark--tl">+</span>
            <span className="zenji-hero__corner-mark zenji-hero__corner-mark--tr">+</span>
            <span className="zenji-hero__corner-mark zenji-hero__corner-mark--bl">+</span>
            <span className="zenji-hero__corner-mark zenji-hero__corner-mark--br">+</span>

            {/* Scanline & Texture Layers */}
            <div className="zenji-hero__card-scanline" />
            <div className="zenji-hero__card-vignette" />

            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlideData.image}
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="zenji-hero__card-img"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
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

          {/* Floating Spec Capsule Card */}
          <motion.div
            className="zenji-hero__floating-card"
            initial={{ opacity: 0, x: -25, y: 25 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, borderColor: 'var(--accent-neon)' }}
          >
            <div className="zenji-hero__floating-icon">
              <Eye size={15} />
            </div>
            <div className="zenji-hero__floating-text">
              <strong>EDITORIAL DROP 004</strong>
              <span>LIMITED 250 PIECES • TOKYO SPEC</span>
            </div>
            <CornerDownRight size={14} className="zenji-hero__floating-arrow" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

