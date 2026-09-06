import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../product/ProductCard';
import { PRODUCTS } from '../../data/products';

const FILTER_TABS = [
  { id: 'all', label: 'All Disciplines', jp: '全作品' },
  { id: 'hoodies', label: 'Hoodies', jp: 'パーカー' },
  { id: 'tees', label: 'Graphic Tees', jp: 'グラフィックT' },
  { id: 'outerwear', label: 'Jackets', jp: 'アウター' },
  { id: 'pants', label: 'Cargos', jp: 'カーゴ' }
];

export const ProductShowcase = memo(({ onQuickView, products: customProducts }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Curated list ensuring the 4 core disciplines are featured
  const showcaseProducts = useMemo(() => {
    const source = customProducts && customProducts.length > 0 ? customProducts : PRODUCTS;
    
    // Core 4 items: Hoodie, Graphic Tee, Tactical Jacket, Cargo Pants
    const coreFour = [
      source.find((p) => p.category === 'hoodies') || source[0],
      source.find((p) => p.category === 'tees') || source[1],
      source.find((p) => p.category === 'outerwear') || source[2],
      source.find((p) => p.category === 'pants') || source[3]
    ].filter(Boolean);

    if (activeCategory === 'all') {
      return coreFour;
    }
    return source.filter((p) => p.category === activeCategory);
  }, [customProducts, activeCategory]);

  return (
    <section className="zenji-showcase-section" id="product-showcase" aria-label="Curated Product Showcase">
      <div className="zenji-showcase-section__container">
        {/* Section Header with Tokyo Coordinates & Live Drop Indicator */}
        <motion.div
          className="zenji-showcase-section__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-showcase-section__header-left">
            <div className="zenji-showcase-section__tag-group">
              <span className="zenji-showcase-section__tag">TOKYO ARCHIVE // 35.6580° N</span>
              <span className="zenji-showcase-section__live-pill">
                <span className="zenji-showcase-section__live-dot" />
                DROP 004 LIVE
              </span>
              <span className="zenji-showcase-section__jp-tag">限定新作群</span>
            </div>
            <h2 className="zenji-showcase-section__title">CURATED PRODUCT SHOWCASE</h2>
            <p className="zenji-showcase-section__subtitle">
              Precision-cut technical silhouettes engineered for Tokyo metropolitan conditions.
            </p>
          </div>

          <Link to="/shop" className="zenji-showcase-section__link" aria-label="Explore Full Archive">
            <motion.div
              className="zenji-showcase-section__link-inner"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>EXPLORE FULL ARCHIVE</span>
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>

        {/* Interactive Filter Bar */}
        <motion.div
          className="zenji-showcase-filter"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-showcase-filter__track" role="tablist" aria-label="Product discipline categories">
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
                      layoutId="productShowcaseFilterGlider"
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
            <span>DISP. 04 CORE DISCIPLINES</span>
          </div>
        </motion.div>

        {/* 4-Column Modern Product Grid with Staggered Entrance */}
        <motion.div
          className="zenji-showcase-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.08 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
              }
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {showcaseProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 32, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                  },
                  exit: { opacity: 0, scale: 0.94, y: 16 }
                }}
                className="zenji-showcase-grid__item"
                style={{ willChange: 'transform, opacity' }}
              >
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                  showAddButton={true}
                  showAvailable={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
});

ProductShowcase.displayName = 'ProductShowcase';
export default ProductShowcase;
