import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ShoppingBag, RefreshCw } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: { duration: 0.2 }
  }
};

export const ProductGrid = ({ products, onQuickView, gridCols = 4, onResetFilters }) => {
  if (!products || products.length === 0) {
    return (
      <motion.div
        className="zenji-grid-empty zenji-grid-empty--enhanced"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="zenji-grid-empty__radar">
          <ShoppingBag size={48} strokeWidth={1.2} />
        </div>
        <span className="zenji-grid-empty__tag">ARCHIVE QUERY: 0 RESULTS</span>
        <h3 className="zenji-grid-empty__title">NO MATCHING PIECES LOCATED</h3>
        <p className="zenji-grid-empty__text">
          No streetwear garments currently match your search criteria or price filter. Try broadening your parameters.
        </p>
        {onResetFilters && (
          <button onClick={onResetFilters} className="zenji-grid-empty__reset-btn">
            <RefreshCw size={14} />
            <span>RESET FILTERS</span>
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className={`zenji-product-grid zenji-product-grid--cols-${gridCols}`}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ProductCard
              product={product}
              onQuickView={onQuickView}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
export default ProductGrid;
