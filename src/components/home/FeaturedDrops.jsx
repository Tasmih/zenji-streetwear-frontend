import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../product/ProductCard';
import { cardVariants } from '../../utils/cardVariants';
import { scrollStaggerContainer, scrollSectionHeader } from '../../utils/motionVariants';

const FILTER_TABS = [
  { id: 'all', label: 'All Pieces', jp: '全作品' },
  { id: 'hoodies', label: 'Hoodies', jp: 'パーカー' },
  { id: 'outerwear', label: 'Outerwear', jp: 'アウター' },
  { id: 'pants', label: 'Cargos', jp: 'カーゴ' },
  { id: 'tees', label: 'Graphic Tees', jp: 'グラフィックT' }
];

export const FeaturedDrops = memo(({ products = [], onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products.slice(0, 8);
    }
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section className="zenji-section zenji-section--showcase" id="featured-drops">
      {/* Section Header with Tokyo Coordinates & Live Drop Indicator */}
      <motion.div
        className="zenji-section__header"
        variants={scrollSectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div>
          <div className="zenji-section__tag-group">
            <span className="zenji-section__tag">TOKYO ARCHIVE // 35.6580° N</span>
            <span className="zenji-section__live-pill">
              <span className="zenji-section__live-dot" />
              DROP 004 LIVE
            </span>
            <span className="zenji-section__jp-tag">限定新作</span>
          </div>
          <h2 className="zenji-section__title">FEATURED PRODUCT SHOWCASE</h2>
        </div>

        <Link to="/shop" className="zenji-section__link">
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span>EXPLORE FULL ARCHIVE</span>
            <ArrowRight size={16} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Interactive Category Filter Bar */}
      <motion.div
        className="zenji-showcase-filter"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="zenji-showcase-filter__track" role="tablist" aria-label="Product categories">
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.id)}
                className={`zenji-showcase-filter__btn ${
                  isActive ? 'zenji-showcase-filter__btn--active' : ''
                }`}
              >
                <span className="zenji-showcase-filter__btn-label">{tab.label}</span>
                <span className="zenji-showcase-filter__btn-jp">{tab.jp}</span>
                {isActive && (
                  <motion.div
                    layoutId="showcaseFilterGlider"
                    className="zenji-showcase-filter__glider"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="zenji-showcase-filter__meta">
          <Sparkles size={12} className="zenji-showcase-filter__meta-icon" />
          <span>SHOWING {filteredProducts.length} ARCHIVE ARTIFACTS</span>
        </div>
      </motion.div>

      {/* Modern Ecommerce Grid with Staggered Entrance */}
      <motion.div
        className="zenji-product-grid zenji-product-grid--cols-4"
        variants={scrollStaggerContainer(0.08, 0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px', amount: 0.08 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              variants={cardVariants}
              exit="exit"
              style={{ willChange: 'transform, opacity' }}
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
});

FeaturedDrops.displayName = 'FeaturedDrops';
export default FeaturedDrops;

