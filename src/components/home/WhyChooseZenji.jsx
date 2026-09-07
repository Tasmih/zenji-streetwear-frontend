import { memo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Maximize2, ShieldCheck, Zap, ArrowUpRight, Sparkles } from 'lucide-react';

const REASONS = [
  {
    number: '01',
    jp: '上質素材',
    title: 'PREMIUM MATERIALS',
    desc: 'Heavyweight fabrics selected for structure, comfort and durability.',
    spec: '500 GSM CUSTOM FLEECE',
    detail: 'Bespoke high-density loopback cotton engineered to hold sharp architectural drape and resist distortion wash after wash.',
    icon: Layers,
    badge: 'FABRICATION'
  },
  {
    number: '02',
    jp: '立体裁断',
    title: 'ARCHITECTURAL FIT',
    desc: 'Oversized silhouettes designed with modern streetwear aesthetics.',
    spec: 'DROP-SHOULDER GEOMETRY',
    detail: 'Sculptural boxy tailoring with lengthened sleeves and clean hems, calibrated for Tokyo metropolitan street presence.',
    icon: Maximize2,
    badge: 'SILHOUETTE'
  },
  {
    number: '03',
    jp: '限定生産',
    title: 'LIMITED DROPS',
    desc: 'Exclusive small-batch releases with unique designs.',
    spec: 'SERIALIZED RUN // 150 PCS',
    detail: 'No mass reprints. Once a drop reaches allocation, the patterns are vaulted to protect collector rarity and craftsmanship.',
    icon: ShieldCheck,
    badge: 'VAULT DISCIPLINE'
  },
  {
    number: '04',
    jp: '都市文化',
    title: 'BUILT FOR CULTURE',
    desc: 'Inspired by Tokyo street fashion and urban creativity.',
    spec: 'SHIBUYA SECTOR ROOTS',
    detail: 'Conceived in the neon backstreets and brutalist concrete of Tokyo, translating nocturnal urban energy into functional luxury.',
    icon: Zap,
    badge: 'SUB-CULTURE'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const WhyChooseZenji = memo(() => {
  return (
    <section
      className="zenji-why-section"
      id="why-choose-zenji"
      aria-label="Why Choose ZENJI"
    >
      {/* Background Matrix: Dark Luxury Grid & Ambient Neon Halo */}
      <div className="zenji-why-section__bg-glow" aria-hidden="true" />
      <div className="zenji-why-section__bg-grid" aria-hidden="true" />

      <div className="zenji-why-section__container">
        {/* Section Header */}
        <motion.div
          className="zenji-why-section__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-why-section__kicker">
            <span className="zenji-why-section__kicker-dot" />
            <span className="zenji-why-section__kicker-text">
              EXCELLENCE // STANDARD 004
            </span>
            <span className="zenji-why-section__kicker-jp">選定理由</span>
          </div>

          <h2 className="zenji-why-section__title">
            WHY CHOOSE ZENJI
          </h2>

          <p className="zenji-why-section__subtitle">
            Engineered for collectors who reject ordinary streetwear. Uncompromising fabrication, sculptural silhouettes, and Tokyo subculture heritage.
          </p>

          <div className="zenji-why-section__hud-strip">
            <div className="zenji-why-section__hud-item">
              <Sparkles size={11} className="zenji-why-section__hud-icon" />
              <span>JAPANESE PRECISION ATELIER</span>
            </div>
            <div className="zenji-why-section__hud-divider" />
            <div className="zenji-why-section__hud-item">
              <span className="zenji-why-section__hud-bullet">[#]</span>
              <span>ZERO FAST-FASHION SHORTCUTS</span>
            </div>
          </div>
        </motion.div>

        {/* 4 Feature Cards Grid: Revealed One by One on Scroll */}
        <motion.div
          className="zenji-why-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.1 }}
        >
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 400, damping: 20 }
                }}
                className="zenji-why-card"
              >
                {/* Tactical Corner Brackets */}
                <div className="zenji-why-card__corner zenji-why-card__corner--tl" />
                <div className="zenji-why-card__corner zenji-why-card__corner--tr" />
                <div className="zenji-why-card__corner zenji-why-card__corner--bl" />
                <div className="zenji-why-card__corner zenji-why-card__corner--br" />

                {/* Neon Border Glow Ambient Sweep */}
                <div className="zenji-why-card__border-beam" aria-hidden="true" />

                {/* Top Row: Numeric Watermark & Kanji Badge */}
                <div className="zenji-why-card__top">
                  <span className="zenji-why-card__number">{item.number}</span>
                  <div className="zenji-why-card__top-right">
                    <span className="zenji-why-card__jp">{item.jp}</span>
                    <div className="zenji-why-card__icon-badge">
                      <Icon size={16} />
                    </div>
                  </div>
                </div>

                {/* Middle Neon Divider Beam */}
                <div className="zenji-why-card__divider" />

                {/* Card Main Body */}
                <div className="zenji-why-card__body">
                  <div className="zenji-why-card__spec">
                    <span className="zenji-why-card__spec-dot" />
                    {item.spec}
                  </div>

                  <h3 className="zenji-why-card__title">
                    {item.title}
                  </h3>

                  <p className="zenji-why-card__desc">
                    {item.desc}
                  </p>

                  <p className="zenji-why-card__detail">
                    {item.detail}
                  </p>
                </div>

                {/* Card Footer: Metadata Tag & Indicator */}
                <div className="zenji-why-card__footer">
                  <span className="zenji-why-card__tag">
                    {item.badge}
                  </span>
                  <div className="zenji-why-card__verified">
                    <span>ARCHIVE SPEC</span>
                    <ArrowUpRight size={12} className="zenji-why-card__arrow" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

WhyChooseZenji.displayName = 'WhyChooseZenji';
export default WhyChooseZenji;
