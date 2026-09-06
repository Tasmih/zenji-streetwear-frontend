import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCard } from '../product/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export const FeaturedDrops = memo(({ products = [], onQuickView }) => {
  const featured = useMemo(
    () => products.filter((p) => p.isFeatured).slice(0, 4),
    [products]
  );


  return (
    <section className="zenji-section">
      <motion.div
        className="zenji-section__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {featured.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
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

