import { memo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, ShieldCheck, Compass, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    id: 'fabrics',
    icon: Layers,
    title: '500 GSM FABRICS',
    desc: 'Engineered heavyweight materials.',
    tag: '01'
  },
  {
    id: 'fit',
    icon: Box,
    title: 'ARCHITECTURAL FIT',
    desc: 'Oversized silhouettes with structured form.',
    tag: '02'
  },
  {
    id: 'drops',
    icon: ShieldCheck,
    title: 'LIMITED DROPS',
    desc: 'Small batch releases only.',
    tag: '03'
  },
  {
    id: 'tokyo',
    icon: Compass,
    title: 'TOKYO INSPIRED',
    desc: 'Modern street culture influence.',
    tag: '04'
  }
];

const featureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export const BrandStory = memo(() => {
  return (
    <motion.section
      className="zenji-atelier-section"
      id="tokyo-atelier"
      aria-label="ZENJI TOKYO ATELIER Brand Story"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Matrix & Subtle Grid */}
      <div className="zenji-atelier-section__bg-glow" aria-hidden="true" />
      <div className="zenji-atelier-section__bg-grid" aria-hidden="true" />

      <div className="zenji-atelier-section__container">
        {/* Left Column: Headings, Narrative & 4 Feature Blocks */}
        <div className="zenji-atelier-section__left">
          {/* Kicker Pill */}
          <motion.div
            className="zenji-atelier-section__kicker"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="zenji-atelier-section__kicker-dot" />
            <span className="zenji-atelier-section__kicker-text">TOKYO ATELIER // 35.6620° N</span>
            <span className="zenji-atelier-section__kicker-jp">東京工房</span>
          </motion.div>

          {/* Large Heading - Slide from Left */}
          <motion.h2
            className="zenji-atelier-section__title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            ZENJI TOKYO ATELIER
          </motion.h2>

          {/* Secondary Heading */}
          <motion.h3
            className="zenji-atelier-section__subtitle"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            CRAFTED FOR THE NEXT GENERATION OF STREETWEAR
          </motion.h3>

          {/* Editorial Paragraph */}
          <motion.p
            className="zenji-atelier-section__desc"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Born from Tokyo-inspired design philosophy, ZENJI creates heavyweight garments with architectural silhouettes, premium materials, and limited production craftsmanship.
          </motion.p>

          {/* 4 Feature Cards Appearing Sequentially */}
          <motion.div
            className="zenji-atelier-section__features"
            variants={featureContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {FEATURES.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="zenji-atelier-feature"
                  variants={featureItemVariants}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="zenji-atelier-feature__header">
                    <div className="zenji-atelier-feature__icon-wrap">
                      <IconComponent size={18} className="zenji-atelier-feature__icon" />
                    </div>
                    <span className="zenji-atelier-feature__tag">{item.tag}</span>
                  </div>
                  <h4 className="zenji-atelier-feature__title">{item.title}</h4>
                  <p className="zenji-atelier-feature__desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Atelier Craft Visual with Slow Zoom */}
        <motion.div
          className="zenji-atelier-section__right"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-atelier-section__frame">
            {/* Corner Technical Marks */}
            <span className="zenji-atelier-section__corner zenji-atelier-section__corner--tl" aria-hidden="true">+</span>
            <span className="zenji-atelier-section__corner zenji-atelier-section__corner--tr" aria-hidden="true">+</span>
            <span className="zenji-atelier-section__corner zenji-atelier-section__corner--bl" aria-hidden="true">+</span>
            <span className="zenji-atelier-section__corner zenji-atelier-section__corner--br" aria-hidden="true">+</span>

            {/* Glowing Accent Border */}
            <div className="zenji-atelier-section__border-glow" aria-hidden="true" />

            {/* Atelier Image with Continuous Slow Cinematic Breathing Zoom */}
            <div className="zenji-atelier-section__img-viewport">
              <motion.img
                src="/atelier/tokyo-craft.jpg"
                alt="Japanese fashion atelier interior - Designer hands working on premium hoodie fabric"
                className="zenji-atelier-section__img"
                loading="lazy"
                animate={{
                  scale: [1, 1.045, 1]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.07 }}
              />

              <div className="zenji-atelier-section__img-overlay" />
              <div className="zenji-atelier-section__scanline" />
            </div>

            {/* Technical Caption Badge */}
            <div className="zenji-atelier-section__caption">
              <div className="zenji-atelier-section__caption-head">
                <span className="zenji-atelier-section__caption-dot" />
                <span>PLATE 01 // TOKYO HARAJUKU ATELIER</span>
              </div>
              <p className="zenji-atelier-section__caption-sub">
                Pattern drafting on 500 GSM loopback French Terry
              </p>
            </div>

            {/* Traditional Japanese Atelier Seal */}
            <div className="zenji-atelier-section__seal" aria-hidden="true">
              <span className="zenji-atelier-section__seal-kanji">禅侍</span>
              <span className="zenji-atelier-section__seal-sub">東京仕立</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

BrandStory.displayName = 'BrandStory';
export default BrandStory;
