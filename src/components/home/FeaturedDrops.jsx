import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCard } from '../product/ProductCard';
import { scrollStaggerContainer, scrollCardItem, scrollSectionHeader } from '../../utils/motionVariants';

export const FeaturedDrops = memo(({ products = [], onQuickView }) => {
  const featured = useMemo(
    () => products.filter((p) => p.isFeatured).slice(0, 4),
    [products]
  );

  return (
    <section className="zenji-section" id="featured-drops">
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
          </div>
          <h2 className="zenji-section__title">KEY PIECES FROM ARCHIVE 04</h2>
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

      <motion.div
        className="zenji-product-grid"
        variants={scrollStaggerContainer(0.12, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      >
        {featured.map((product) => (
          <motion.div
            key={product.id}
            variants={scrollCardItem}
            style={{ willChange: 'transform, opacity' }}
          >
            <ProductCard
              product={product}
              onQuickView={onQuickView}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

FeaturedDrops.displayName = 'FeaturedDrops';
export default FeaturedDrops;

