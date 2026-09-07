import { useRef, useState, useEffect, memo } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Compass, Cpu, Scissors, Building, Sparkles } from 'lucide-react';

const PHILOSOPHY_PILLARS = [
  {
    number: 1,
    targetNum: 1,
    title: 'DESIGN LANGUAGE',
    jp: '造形構想',
    desc: 'Architectural silhouettes inspired by Tokyo street culture.',
    icon: Compass,
    spec: 'ARCHITECTURAL FORM // 01',
    accentTag: 'SILHOUETTES'
  },
  {
    number: 2,
    targetNum: 2,
    title: 'MATERIAL SCIENCE',
    jp: '物質科学',
    desc: 'Heavyweight fabrics engineered for structure and durability.',
    icon: Cpu,
    spec: '500 GSM BESPOKE // 02',
    accentTag: 'TEXTILES'
  },
  {
    number: 3,
    targetNum: 3,
    title: 'CRAFT PRECISION',
    jp: '匠の精度',
    desc: 'Small batch production with obsessive attention to detail.',
    icon: Scissors,
    spec: 'LIMITED 150 PCS // 03',
    accentTag: 'ATELIER'
  },
  {
    number: 4,
    targetNum: 4,
    title: 'URBAN CULTURE',
    jp: '都市文化',
    desc: 'Modern streetwear influenced by Tokyo environments.',
    icon: Building,
    spec: 'SHIBUYA SECTOR // 04',
    accentTag: 'METROPOLIS'
  }
];

// Animated Number Counter: animates from 0 to target value when in view
const AnimatedNumber = ({ target }) => {
  const [displayNum, setDisplayNum] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayNum(Math.round(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="zenji-philosophy__number-val">
      {displayNum < 10 ? `0${displayNum}` : displayNum}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
};

export const DesignPhilosophy = memo(() => {
  return (
    <section
      className="zenji-philosophy-section"
      id="design-philosophy"
      aria-label="ZENJI Design Philosophy"
    >
      {/* Background Ambience: Deep Black + Subtle Grid + Atmospheric Neon Glow */}
      <div className="zenji-philosophy-section__bg-glow" aria-hidden="true" />
      <div className="zenji-philosophy-section__bg-grid" aria-hidden="true" />

      <div className="zenji-philosophy-section__container">
        {/* Section Header */}
        <motion.div
          className="zenji-philosophy-section__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-philosophy-section__kicker">
            <span className="zenji-philosophy-section__kicker-dot" />
            <span className="zenji-philosophy-section__kicker-text">
              PHILOSOPHY // 004 PROTOCOL
            </span>
            <span className="zenji-philosophy-section__kicker-jp">設計哲学</span>
          </div>

          <h2 className="zenji-philosophy-section__title">
            ZENJI DESIGN PHILOSOPHY
          </h2>

          <p className="zenji-philosophy-section__subtitle">
            Engineered at the intersection of architectural form, heavyweight textile science, and Tokyo urban culture.
          </p>

          <div className="zenji-philosophy-section__hud-strip">
            <div className="zenji-philosophy-section__hud-item">
              <span className="zenji-philosophy-section__hud-bullet">[+]</span>
              <span>ATELIER DISCIPLINE // 4 PILLARS</span>
            </div>
            <div className="zenji-philosophy-section__hud-divider" />
            <div className="zenji-philosophy-section__hud-item">
              <Sparkles size={11} className="zenji-philosophy-section__hud-icon" />
              <span>LIMITED SMALL-BATCH INTEGRITY</span>
            </div>
          </div>
        </motion.div>

        {/* 4 Feature Blocks Grid with Stagger Reveal */}
        <motion.div
          className="zenji-philosophy-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.1 }}
        >
          {PHILOSOPHY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.018,
                  transition: { type: 'spring', stiffness: 400, damping: 22 }
                }}
                className="zenji-philosophy-card"
              >
                {/* Tactical Corner Crosshairs */}
                <div className="zenji-philosophy-card__corner zenji-philosophy-card__corner--tl" />
                <div className="zenji-philosophy-card__corner zenji-philosophy-card__corner--tr" />
                <div className="zenji-philosophy-card__corner zenji-philosophy-card__corner--bl" />
                <div className="zenji-philosophy-card__corner zenji-philosophy-card__corner--br" />

                {/* Neon Ambient Card Rim Glow on Hover */}
                <div className="zenji-philosophy-card__hover-glow" aria-hidden="true" />

                {/* Card Top: Animated Number & Kanji Insignia */}
                <div className="zenji-philosophy-card__top">
                  <div className="zenji-philosophy-card__number-wrap">
                    <AnimatedNumber target={pillar.targetNum} />
                  </div>
                  <div className="zenji-philosophy-card__meta-right">
                    <span className="zenji-philosophy-card__jp-tag">{pillar.jp}</span>
                    <div className="zenji-philosophy-card__icon-badge">
                      <Icon size={16} />
                    </div>
                  </div>
                </div>

                {/* Middle Divider Beam */}
                <div className="zenji-philosophy-card__beam" />

                {/* Card Content */}
                <div className="zenji-philosophy-card__content">
                  <div className="zenji-philosophy-card__spec-tag">
                    <span className="zenji-philosophy-card__spec-dot" />
                    {pillar.spec}
                  </div>

                  <h3 className="zenji-philosophy-card__title">
                    {pillar.title}
                  </h3>

                  <p className="zenji-philosophy-card__desc">
                    {pillar.desc}
                  </p>
                </div>

                {/* Card Bottom: Technical Tagging */}
                <div className="zenji-philosophy-card__footer">
                  <span className="zenji-philosophy-card__tag">
                    {pillar.accentTag}
                  </span>
                  <span className="zenji-philosophy-card__status">
                    AUTHENTICATED // ARCHIVE SPEC
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

DesignPhilosophy.displayName = 'DesignPhilosophy';
export default DesignPhilosophy;
