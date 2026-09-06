import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const ProductGrid = ({ products, onQuickView }) => {
  if (!products || products.length === 0) {
    return (
      <motion.div
        className="zenji-grid-empty"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="zenji-grid-empty__icon">
          <ShoppingBag size={44} strokeWidth={1.2} />
        </div>
        <h3 className="zenji-grid-empty__title">NO PIECES MATCH YOUR CRITERIA</h3>
        <p className="zenji-grid-empty__text">
          Try adjusting your filter selection or search query to browse available streetwear pieces.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="zenji-product-grid"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      key={products.map((p) => p.id).join('-')}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={cardItemVariants}>
          <ProductCard
            product={product}
            onQuickView={onQuickView}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
