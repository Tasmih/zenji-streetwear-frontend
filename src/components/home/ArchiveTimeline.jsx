import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, ArrowUpRight, Radio, Layers, Sparkles } from 'lucide-react';

const ARCHIVE_DROPS = [
  {
    id: 'drop-001',
    dropNum: 'DROP 001',
    jpCode: '原点系列 // 001',
    period: '2023 // SPRING ARCHIVE',
    title: 'Foundation Series',
    subtitle: 'THE GENESIS OF ARCHITECTURAL FORM',
    desc: 'The inaugural release establishing the ZENJI silhouette. Oversized structural proportions with minimalist monochrome discipline, testing the limits of heavyweight drape.',
    specs: [
      { label: 'WEIGHT', value: '420 GSM' },
      { label: 'BATCH', value: '100 PCS' },
      { label: 'STATUS', value: 'ARCHIVED // VAULT' }
    ],
    accentTag: 'GENESIS',
    isCurrent: false
  },
  {
    id: 'drop-002',
    dropNum: 'DROP 002',
    jpCode: '東京残影 // 002',
    period: '2023 // AUTUMN ARCHIVE',
    title: 'Tokyo Screen Collection',
    subtitle: 'CYBERNETIC NOCTURNE EXPERIMENTS',
    desc: 'Graphic experiments inspired by late-night Shibuya CRT monitors and digital distortion. High-density screen prints fused onto custom pre-shrunk combed cotton.',
    specs: [
      { label: 'WEIGHT', value: '460 GSM' },
      { label: 'BATCH', value: '120 PCS' },
      { label: 'STATUS', value: 'ARCHIVED // VAULT' }
    ],
    accentTag: 'SCREEN',
    isCurrent: false
  },
  {
    id: 'drop-003',
    dropNum: 'DROP 003',
    jpCode: '戦術外套 // 003',
    period: '2024 // SPRING ARCHIVE',
    title: 'Technical Outerwear',
    subtitle: 'MODULAR METROPOLITAN DEFENSE',
    desc: 'Modular utility outerwear engineered with weatherproof membranes, tactical hardware buckles, and convertible ergonomics tailored for rain-soaked Tokyo transit.',
    specs: [
      { label: 'FABRIC', value: 'CORDURA®' },
      { label: 'BATCH', value: '80 PCS' },
      { label: 'STATUS', value: 'ARCHIVED // VAULT' }
    ],
    accentTag: 'UTILITY',
    isCurrent: false
  },
  {
    id: 'drop-004',
    dropNum: 'DROP 004',
    jpCode: '重量級標本 // 004',
    period: '2024 // PRESENT ACTIVE',
    title: '500 GSM Heavyweight Archive',
    subtitle: 'CULMINATION OF TEXTILE MASTERY',
    desc: 'The apex of architectural streetwear. Bespoke 500 GSM fleece engineered for sculpted shoulder drape, micro-sueded interior softness, and lifetime durability.',
    specs: [
      { label: 'WEIGHT', value: '500 GSM' },
      { label: 'BATCH', value: 'LIMITED RUN' },
      { label: 'STATUS', value: 'ACTIVE DROP' }
    ],
    accentTag: 'ACTIVE DROP',
    isCurrent: true
  }
];

export const ArchiveTimeline = memo(() => {
  const [hoveredDrop, setHoveredDrop] = useState(null);

  return (
    <section
      className="zenji-archive-timeline"
      id="archive-timeline"
      aria-label="ZENJI Archive Timeline"
    >
      {/* Background Ambience: Technical Grid & Subtle Radial Glow */}
      <div className="zenji-archive-timeline__bg-glow" aria-hidden="true" />
      <div className="zenji-archive-timeline__bg-grid" aria-hidden="true" />

      <div className="zenji-archive-timeline__container">
        {/* Section Header */}
        <motion.div
          className="zenji-archive-timeline__header"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-archive-timeline__kicker">
            <Radio size={12} className="zenji-archive-timeline__kicker-icon" />
            <span className="zenji-archive-timeline__kicker-text">
              CHRONOLOGY // LIMITED DROP HISTORY
            </span>
            <span className="zenji-archive-timeline__kicker-jp">歴代記録</span>
          </div>

          <h2 className="zenji-archive-timeline__title">
            ARCHIVE TIMELINE
          </h2>

          <p className="zenji-archive-timeline__subtitle">
            A chronological survey of limited release cycles, architectural textiles, and Tokyo design evolution.
          </p>

          <div className="zenji-archive-timeline__badge-strip">
            <div className="zenji-archive-timeline__badge-item">
              <Clock size={11} />
              <span>2023 — PRESENT</span>
            </div>
            <span className="zenji-archive-timeline__badge-sep">/</span>
            <div className="zenji-archive-timeline__badge-item">
              <Layers size={11} />
              <span>4 HISTORICAL CYCLES</span>
            </div>
            <span className="zenji-archive-timeline__badge-sep">/</span>
            <div className="zenji-archive-timeline__badge-item zenji-archive-timeline__badge-item--active">
              <Sparkles size={11} />
              <span>CURRENT: DROP 004</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Architecture */}
        <div className="zenji-archive-timeline__track">
          {/* Animated Center Vertical Neon Line */}
          <motion.div
            className="zenji-archive-timeline__line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Timeline Drop Nodes */}
          <div className="zenji-archive-timeline__entries">
            {ARCHIVE_DROPS.map((drop, index) => {
              const isEven = index % 2 === 0;
              const isHovered = hoveredDrop === drop.id;

              return (
                <div
                  key={drop.id}
                  className={`zenji-archive-timeline__entry ${
                    isEven ? 'zenji-archive-timeline__entry--left' : 'zenji-archive-timeline__entry--right'
                  } ${drop.isCurrent ? 'zenji-archive-timeline__entry--current' : ''}`}
                >
                  {/* Center Node Indicator */}
                  <div
                    className={`zenji-archive-timeline__node ${
                      isHovered ? 'zenji-archive-timeline__node--hovered' : ''
                    } ${drop.isCurrent ? 'zenji-archive-timeline__node--current' : ''}`}
                    aria-hidden="true"
                  >
                    <div className="zenji-archive-timeline__node-inner">
                      <span className="zenji-archive-timeline__node-pulse" />
                    </div>
                    <span className="zenji-archive-timeline__node-label">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Timeline Glass Card with Blur-to-Sharp Reveal from Alternating Sides */}
                  <motion.div
                    className="zenji-archive-timeline__card-wrap"
                    initial={{
                      opacity: 0,
                      x: isEven ? -50 : 50,
                      filter: 'blur(12px)'
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      filter: 'blur(0px)'
                    }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.12,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <motion.div
                      className={`zenji-archive-timeline__card ${
                        drop.isCurrent ? 'zenji-archive-timeline__card--current' : ''
                      }`}
                      onMouseEnter={() => setHoveredDrop(drop.id)}
                      onMouseLeave={() => setHoveredDrop(null)}
                      whileHover={{
                        y: -5,
                        scale: 1.015,
                        transition: { type: 'spring', stiffness: 380, damping: 24 }
                      }}
                    >
                      {/* Tactical Glass Corner Marks */}
                      <div className="zenji-archive-timeline__corner zenji-archive-timeline__corner--tl" />
                      <div className="zenji-archive-timeline__corner zenji-archive-timeline__corner--tr" />
                      <div className="zenji-archive-timeline__corner zenji-archive-timeline__corner--bl" />
                      <div className="zenji-archive-timeline__corner zenji-archive-timeline__corner--br" />

                      {/* Card Ambient Neon Glow Header Line */}
                      <div className="zenji-archive-timeline__card-beam" />

                      {/* Card Header */}
                      <div className="zenji-archive-timeline__card-header">
                        <div className="zenji-archive-timeline__card-meta">
                          <span className="zenji-archive-timeline__card-dropnum">
                            {drop.dropNum}
                          </span>
                          <span className="zenji-archive-timeline__card-period">
                            {drop.period}
                          </span>
                        </div>

                        <div className="zenji-archive-timeline__card-tags">
                          <span className="zenji-archive-timeline__card-jp">
                            {drop.jpCode}
                          </span>
                          <span
                            className={`zenji-archive-timeline__card-status-pill ${
                              drop.isCurrent
                                ? 'zenji-archive-timeline__card-status-pill--active'
                                : ''
                            }`}
                          >
                            {drop.accentTag}
                          </span>
                        </div>
                      </div>

                      {/* Title & Narrative */}
                      <div className="zenji-archive-timeline__card-body">
                        <h3 className="zenji-archive-timeline__card-title">
                          {drop.title}
                        </h3>
                        <div className="zenji-archive-timeline__card-sub">
                          {drop.subtitle}
                        </div>
                        <p className="zenji-archive-timeline__card-desc">
                          {drop.desc}
                        </p>
                      </div>

                      {/* Technical Specs Array */}
                      <div className="zenji-archive-timeline__card-specs">
                        {drop.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="zenji-archive-timeline__spec-item"
                          >
                            <span className="zenji-archive-timeline__spec-key">
                              {spec.label}
                            </span>
                            <span className="zenji-archive-timeline__spec-val">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer Strip */}
                      <div className="zenji-archive-timeline__card-footer">
                        <div className="zenji-archive-timeline__footer-id">
                          <ShieldCheck size={12} className="zenji-archive-timeline__footer-icon" />
                          <span>ZENJI VERIFIED PROTOCOL // {drop.dropNum}</span>
                        </div>

                        {drop.isCurrent ? (
                          <a
                            href="#products"
                            className="zenji-archive-timeline__action-link"
                          >
                            <span>EXPLORE DROP</span>
                            <ArrowUpRight size={13} />
                          </a>
                        ) : (
                          <span className="zenji-archive-timeline__archived-label">
                            VAULT SEALED
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

ArchiveTimeline.displayName = 'ArchiveTimeline';
export default ArchiveTimeline;
