import { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'cat-hoodies',
    title: 'Oversized Hoodies',
    jp: '重厚パーカー',
    code: 'DROP 004 // ARCHIVE',
    spec: '500 GSM BESPOKE FLEECE',
    description: 'Bespoke heavyweight cotton with structured double-layer hood and drop shoulders.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85',
    fallback: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85',
    localFallback: '/categories/cat-hoodies.jpg',
    link: '/shop?category=hoodies',
    badge: 'SIGNATURE'
  },
  {
    id: 'cat-tees',
    title: 'Graphic Tees',
    jp: 'グラフィックT',
    code: 'TYO-SCREEN // 300 GSM',
    spec: 'VINTAGE ACID WASH COTTON',
    description: 'High-density cyber anime screenprints with distressed raw collar treatments.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
    fallback: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
    localFallback: '/categories/cat-tees.jpg',
    link: '/shop?category=tees',
    badge: 'LIMITED'
  },
  {
    id: 'cat-outerwear',
    title: 'Tactical Outerwear',
    jp: '戦術アウター',
    code: 'CORDURA® // DWR WEATHERPROOF',
    spec: 'MODULAR SHELL SYSTEM',
    description: 'Weather-resistant storm jackets with detachable Fidlock® magnetic slings.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
    fallback: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85',
    localFallback: '/categories/cat-outerwear.jpg',
    link: '/shop?category=outerwear',
    badge: 'WEATHERPROOF'
  },
  {
    id: 'cat-pants',
    title: 'Utility Cargo',
    jp: 'カーゴパンツ',
    code: 'SHADOW SYSTEM // 8-POCKET',
    spec: 'ARTICULATED KNEE DARTING',
    description: 'Technical modular cargos with quick-release nylon pullers and cinchable hems.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85',
    fallback: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=85',
    localFallback: '/categories/cat-pants.jpg',
    link: '/shop?category=pants',
    badge: 'TECHNICAL'
  }
];

// Resilient category image component with multi-level fallback protection
const CategoryImage = memo(({ primary, fallback, localFallback, alt }) => {
  const [src, setSrc] = useState(primary);
  const [errorStep, setErrorStep] = useState(0);

  const handleError = useCallback(() => {
    if (errorStep === 0 && fallback) {
      setErrorStep(1);
      setSrc(fallback);
    } else if (errorStep <= 1 && localFallback) {
      setErrorStep(2);
      setSrc(localFallback);
    }
  }, [errorStep, fallback, localFallback]);

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className="zenji-category-card__img"
      loading="eager"
      decoding="async"
    />
  );
});

CategoryImage.displayName = 'CategoryImage';

export const CategoryShowcase = memo(() => {
  return (
    <section className="zenji-categories" id="categories-showcase" aria-label="Featured Categories">
      <div className="zenji-categories__container">
        {/* Section Header with Cinematic Entrance */}
        <motion.div
          className="zenji-categories__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-categories__header-left">
            <div className="zenji-categories__tag-group">
              <span className="zenji-categories__tag">COLLECTION DISCIPLINES</span>
              <span className="zenji-categories__tag-dot">•</span>
              <span className="zenji-categories__tag-jp">作品系列</span>
            </div>
            <h2 className="zenji-categories__title">CORE ARCHIVES</h2>
          </div>

          <div className="zenji-categories__header-right">
            <p className="zenji-categories__header-desc">
              Four fundamental pillars of Tokyo technical luxury. Crafted in strictly limited small batches.
            </p>
          </div>
        </motion.div>

        {/* 4-Column Category Grid with Staggered Fade-Up Scroll Reveal */}
        <motion.div
          className="zenji-categories__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.12 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.08
              }
            }
          }}
        >
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              className="zenji-categories__card-wrap"
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              <Link
                to={cat.link}
                className="zenji-category-card"
                aria-label={`Explore ${cat.title}`}
              >
                {/* Visual Image Layer with Smooth Hover Zoom */}
                <div className="zenji-category-card__img-wrap">
                  <CategoryImage
                    primary={cat.image}
                    fallback={cat.fallback}
                    localFallback={cat.localFallback}
                    alt={`${cat.title} - ${cat.spec}`}
                  />
                  {/* Multi-Stop Dark Luxury Overlay Gradients */}
                  <div className="zenji-category-card__gradient" />
                  <div className="zenji-category-card__vignette" />
                </div>

                {/* Animated Glowing Accent Border */}
                <div className="zenji-category-card__border" />
                <div className="zenji-category-card__glow-border" aria-hidden="true" />

                {/* Precision Corner Markings */}
                <span className="zenji-category-card__corner zenji-category-card__corner--tl">+</span>
                <span className="zenji-category-card__corner zenji-category-card__corner--tr">+</span>
                <span className="zenji-category-card__corner zenji-category-card__corner--bl">+</span>
                <span className="zenji-category-card__corner zenji-category-card__corner--br">+</span>

                {/* Top Badge & Index Tag */}
                <div className="zenji-category-card__top">
                  <span className="zenji-category-card__index">0{index + 1} // {cat.code}</span>
                  <span className="zenji-category-card__badge">
                    <Sparkles size={10} className="zenji-category-card__badge-icon" />
                    {cat.badge}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="zenji-category-card__content">
                  <div className="zenji-category-card__jp-label">{cat.jp}</div>
                  <h3 className="zenji-category-card__name">{cat.title}</h3>
                  <p className="zenji-category-card__spec">{cat.spec}</p>

                  <div className="zenji-category-card__footer">
                    <span className="zenji-category-card__explore">EXPLORE DROP</span>
                    <div className="zenji-category-card__arrow-pill">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

CategoryShowcase.displayName = 'CategoryShowcase';
export default CategoryShowcase;
