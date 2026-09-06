import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Eye } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

const LOOKBOOK_SLIDES = [
  {
    id: '01',
    tag: 'LOOK 01 // FRONT',
    title: 'VOID OMNI HOODIE',
    spec: '500 GSM FRENCH TERRY',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '02',
    tag: 'LOOK 02 // TACTICAL',
    title: 'MODULAR BOMBER',
    spec: 'CORDURA® RIPSTOP',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '03',
    tag: 'LOOK 03 // ARCHIVE',
    title: 'CYBER CARGO SYSTEM',
    spec: '8-POCKET ARTICULATED',
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

  const cardY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0.9, 0.1]);

  // Mouse tilt perspective for visual lookbook card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

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
    hidden: { y: '100%', opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        delay: 0.15 * i,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const currentSlideData = LOOKBOOK_SLIDES[activeSlide];

  return (
    <section className="zenji-hero zenji-hero--cinematic" ref={containerRef}>
      {/* Background Visual Atmosphere */}
      <motion.div className="zenji-hero__backdrop" style={{ opacity: glowOpacity }}>
        <div className="zenji-hero__glow zenji-hero__glow--primary" />
        <div className="zenji-hero__glow zenji-hero__glow--secondary" />
        <div className="zenji-hero__grid-pattern" />
      </motion.div>

      {/* Cybernetic Coordinate Markers */}
      <div className="zenji-hero__hud-top">
        <span className="zenji-hero__coord">[+] 35.6764° N / 139.6500° E</span>
        <span className="zenji-hero__sys-badge">
          <span className="zenji-hero__sys-dot" />
          SYSTEM: DROP 004 ACTIVE
        </span>
        <span className="zenji-hero__coord">EDITION OF 250 PCS</span>
      </div>

      {/* Ambient Japanese Typographic Watermark */}
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
          {/* Top Status Capsule */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__badge-row"
          >
            <Badge variant="neon">DROP 004 // CYBER OMNI</Badge>
            <span className="zenji-hero__season-tag">SS26 ARCHIVAL RUN</span>
          </motion.div>

          {/* Masked Headline Reveal */}
          <div className="zenji-hero__title-wrap">
            <div className="zenji-hero__line-mask">
              <motion.h1
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="zenji-hero__title zenji-hero__title--sub"
              >
                TOKYO ARCHIVAL
              </motion.h1>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__subtitle"
          >
            Bespoke 500 GSM loopback cotton silhouettes engineered with weather-resistant Cordura® ripstop, modular German Fidlock® hardware, and raw dystopian anime tailoring.
          </motion.p>

          {/* Magnetic CTA Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__cta-group"
          >
            <Link to="/shop">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="zenji-hero__cta-primary-wrap"
              >
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  EXPLORE DROP 004
                </Button>
              </motion.div>
            </Link>

            <Link to="/shop?category=hoodies">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button variant="outline" size="lg" icon={Sparkles}>
                  VIEW HOODIES
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Editorial Spec Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="zenji-hero__stats zenji-hero__stats--editorial"
          >
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">500 GSM</span>
              <span className="zenji-hero__stat-lbl">BESPOKE FRENCH TERRY</span>
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
          </motion.div>
        </motion.div>

        {/* Right Column: Cinematic 3D Lookbook Visual Showcase */}
        <motion.div
          className="zenji-hero__visual-wrap"
          initial={{ opacity: 0, scale: 0.92, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Scanline & Grain Texture */}
            <div className="zenji-hero__card-scanline" />

            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlideData.image}
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="zenji-hero__card-img"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>

            {/* Top Holographic Tag */}
            <div className="zenji-hero__card-top-tag">
              <span className="zenji-hero__hologram-pill">
                <Shield size={12} />
                NFC ENCRYPTED 004
              </span>
              <span className="zenji-hero__card-id">ARCHIVE // {currentSlideData.id}</span>
            </div>

            {/* Bottom Overlay Info */}
            <div className="zenji-hero__card-overlay">
              <div className="zenji-hero__card-meta">
                <span className="zenji-hero__card-tag">{currentSlideData.tag}</span>
                <h3 className="zenji-hero__card-name">{currentSlideData.title}</h3>
                <p className="zenji-hero__card-spec">{currentSlideData.spec}</p>
              </div>

              {/* Lookbook Angle Switcher Tabs */}
              <div className="zenji-hero__card-tabs">
                {LOOKBOOK_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`zenji-hero__card-tab ${
                      activeSlide === idx ? 'zenji-hero__card-tab--active' : ''
                    }`}
                    title={slide.title}
                  >
                    <span>{slide.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating Spec Capsule Card */}
          <motion.div
            className="zenji-hero__floating-card"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="zenji-hero__floating-icon">
              <Eye size={16} />
            </div>
            <div className="zenji-hero__floating-text">
              <strong>EDITORIAL DROP 004</strong>
              <span>LIMITED 250 PIECES • TOKYO</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
