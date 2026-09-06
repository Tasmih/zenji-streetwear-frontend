import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, ShieldCheck, Zap, Cpu, Sparkles, Crosshair } from 'lucide-react';
import { scrollFadeUp, scrollStaggerContainer, scrollCardItem, scrollSectionHeader } from '../../utils/motionVariants';

const ATELIER_PILLARS = [
  {
    icon: Layers,
    num: '01',
    jp: '和歌山製テリー',
    title: '520 GSM BESPOKE FLEECE',
    subtitle: 'WAKAYAMA HERITAGE LOOPWHEEL',
    description: 'Knitted on vintage low-tension circular looms in Wakayama, Japan. Provides architectural boxy rigidity that never loses its drape over years of metropolitan wear.'
  },
  {
    icon: Zap,
    num: '02',
    jp: '独国磁気金具',
    title: 'MODULAR FIDLOCK® HARDWARE',
    subtitle: 'GERMAN RAPID DEPLOYMENT',
    description: 'Precision magnetic mechanical fasteners paired with Japanese matte YKK Aquaguard taped zippers. Engineered for one-handed modular adjustment in urban transit.'
  },
  {
    icon: Cpu,
    num: '03',
    jp: '暗号化NFC認証',
    title: 'CRYPTOGRAPHIC NFC ARCHIVE',
    subtitle: 'INTERNAL TOKYO SILICONE CHIP',
    description: 'Every garment is sealed with an embedded cryptographic NFC module linking directly to the Tokyo Atelier blockchain ledger to verify authentic limited-run provenance.'
  },
  {
    icon: ShieldCheck,
    num: '04',
    jp: '完全限定生産',
    title: 'ZERO-DEADSTOCK BATCHES',
    subtitle: 'STRICT CAPSULE EDITIONS',
    description: 'Small-batch discipline capped at 150 pieces per drop. Zero overproduction, zero mass discounting, preserving maximum archive longevity for collectors.'
  }
];

export const BrandStory = memo(() => {
  return (
    <section className="zenji-atelier" id="brand-story" aria-label="ZENJI Tokyo Atelier Brand Story">
      {/* Subtle Animated Background Elements */}
      <div className="zenji-atelier__bg-glow zenji-atelier__bg-glow--primary" aria-hidden="true" />
      <div className="zenji-atelier__bg-glow zenji-atelier__bg-glow--secondary" aria-hidden="true" />
      <div className="zenji-atelier__bg-grid" aria-hidden="true" />
      
      {/* Ambient Japanese Vertical Calligraphy Watermark */}
      <div className="zenji-atelier__watermark zenji-atelier__watermark--left" aria-hidden="true">
        禅侍・東京工房 // HARAJUKU ATELIER
      </div>
      <div className="zenji-atelier__watermark zenji-atelier__watermark--right" aria-hidden="true">
        現代の都市甲冑 // ARCHITECTURAL STREETWEAR
      </div>

      <div className="zenji-atelier__container">
        {/* Atelier HUD Meta Header */}
        <motion.div
          className="zenji-atelier__hud-strip"
          variants={scrollFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="zenji-atelier__hud-col">
            <span className="zenji-atelier__live-beacon" />
            <span className="zenji-atelier__hud-text">ATELIER STATUS: ACTIVE</span>
          </div>
          <div className="zenji-atelier__hud-divider" />
          <div className="zenji-atelier__hud-col">
            <Crosshair size={13} className="zenji-atelier__hud-icon" />
            <span className="zenji-atelier__hud-mono">35.6620° N, 139.7038° E // SHIBUYA-KU, TOKYO</span>
          </div>
          <div className="zenji-atelier__hud-divider" />
          <div className="zenji-atelier__hud-col">
            <span className="zenji-atelier__hud-accent">EDITION 2026 // DROP 004 PROTOCOL</span>
          </div>
        </motion.div>

        {/* Massive Editorial Typography Header */}
        <motion.div
          className="zenji-atelier__masthead"
          variants={scrollSectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="zenji-atelier__kicker-wrap">
            <span className="zenji-atelier__kicker-pill">
              <Sparkles size={13} />
              <span>THE TOKYO ATELIER PHILOSOPHY</span>
            </span>
            <span className="zenji-atelier__jp-subtitle">都市の空隙のための建築的シルエット</span>
          </div>

          <h2 className="zenji-atelier__headline">
            <span className="zenji-atelier__headline-row">ARCHITECTURAL SILHOUETTES</span>
            <span className="zenji-atelier__headline-row zenji-atelier__headline-row--highlight">
              CRAFTED FOR THE URBAN VOID.
            </span>
          </h2>

          <p className="zenji-atelier__lead-text">
            ZENJI operates at the faultline of Tokyo dystopian youth culture and master-tailor discipline.
            Born in the high-density labyrinth of Harajuku, we reject disposable trend cycles to engineer 
            tactile streetwear armor constructed to endure the modern metropolis.
          </p>
        </motion.div>

        {/* Editorial Fashion Lookbook Layout (Split Spread) */}
        <div className="zenji-atelier__editorial-spread">
          {/* Main Visual: Atelier Patternmaker Crafting */}
          <motion.div
            className="zenji-atelier__visual-hero"
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="zenji-atelier__image-frame">
              {/* Corner Crosshairs */}
              <span className="zenji-atelier__corner zenji-atelier__corner--tl" />
              <span className="zenji-atelier__corner zenji-atelier__corner--tr" />
              <span className="zenji-atelier__corner zenji-atelier__corner--bl" />
              <span className="zenji-atelier__corner zenji-atelier__corner--br" />

              <img
                src="/atelier/tokyo-craft.jpg"
                alt="Tokyo Atelier craftsman cutting heavyweight cotton fleece in Harajuku studio"
                className="zenji-atelier__image"
                loading="lazy"
              />

              <div className="zenji-atelier__image-overlay" />

              {/* Technical Caption Overlay */}
              <div className="zenji-atelier__caption-badge">
                <div className="zenji-atelier__caption-header">
                  <span className="zenji-atelier__badge-dot" />
                  <span className="zenji-atelier__badge-title">PLATE 01 // DRAFTING & PATTERNMAKING</span>
                </div>
                <p className="zenji-atelier__badge-details">
                  Harajuku Studio 3-B // Wakayama 520 GSM French Terry Loopback Specimen
                </p>
              </div>

              {/* Japanese Seal Stamp */}
              <div className="zenji-atelier__seal" aria-hidden="true">
                <span className="zenji-atelier__seal-text">禅侍</span>
                <span className="zenji-atelier__seal-sub">東京製</span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Visual + High-Fashion Narrative Column */}
          <motion.div
            className="zenji-atelier__visual-aside"
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Macro Detail Card */}
            <div className="zenji-atelier__detail-card">
              <div className="zenji-atelier__detail-frame">
                <img
                  src="/atelier/tokyo-detail.jpg"
                  alt="Macro tactile shot of German Fidlock buckle on 520 GSM loopback fleece with Zenji Tokyo patch"
                  className="zenji-atelier__detail-img"
                  loading="lazy"
                />
                <div className="zenji-atelier__detail-overlay" />
                <div className="zenji-atelier__detail-tag">
                  <span className="zenji-atelier__detail-jp">精密切断技術</span>
                  <span className="zenji-atelier__detail-spec">FIDLOCK® V-BUCKLE // 35.6620° N</span>
                </div>
              </div>
            </div>

            {/* Atelier Manifesto Quote Box */}
            <div className="zenji-atelier__quote-box">
              <div className="zenji-atelier__quote-line" />
              <blockquote className="zenji-atelier__quote">
                &ldquo;We don’t design garments for a single season. We engineer physical artifacts 
                for the neon labyrinth — sculpted with architectural volume and reinforced for longevity.&rdquo;
              </blockquote>
              <div className="zenji-atelier__quote-author">
                <div className="zenji-atelier__author-info">
                  <span className="zenji-atelier__author-name">KENJI SATO</span>
                  <span className="zenji-atelier__author-role">HEAD OF ARCHIVAL DESIGN // TOKYO</span>
                </div>
                <div className="zenji-atelier__author-kanji">佐藤 研二</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Dossier Grid: 4 Pillars */}
        <motion.div
          className="zenji-atelier__pillars-grid"
          variants={scrollStaggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {ATELIER_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                className="zenji-atelier__pillar-card"
                variants={scrollCardItem}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header */}
                <div className="zenji-atelier__pillar-header">
                  <div className="zenji-atelier__pillar-icon-box">
                    <Icon size={19} />
                  </div>
                  <div className="zenji-atelier__pillar-meta">
                    <span className="zenji-atelier__pillar-num">{pillar.num}</span>
                    <span className="zenji-atelier__pillar-jp">{pillar.jp}</span>
                  </div>
                </div>

                {/* Content */}
                <span className="zenji-atelier__pillar-sub">{pillar.subtitle}</span>
                <h3 className="zenji-atelier__pillar-title">{pillar.title}</h3>
                <p className="zenji-atelier__pillar-desc">{pillar.description}</p>

                {/* Animated Bottom Bar Accent */}
                <div className="zenji-atelier__pillar-bar" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Editorial Footnote & Call to Action */}
        <motion.div
          className="zenji-atelier__footer-action"
          variants={scrollFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="zenji-atelier__footer-info">
            <span className="zenji-atelier__footer-tag">TOKYO ATELIER ARCHIVE // COMPREHENSIVE DOSSIER</span>
            <p className="zenji-atelier__footer-text">
              Every drop is numbered and registered in the Tokyo studio registry. Browse the latest seasonal release.
            </p>
          </div>

          <div className="zenji-atelier__cta-group">
            <Link to="/shop" className="zenji-atelier__cta-primary">
              <span>EXPLORE ATELIER ARCHIVES</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link to="/about" className="zenji-atelier__cta-secondary">
              <span>READ FULL PROTOCOL</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

BrandStory.displayName = 'BrandStory';

export default BrandStory;
