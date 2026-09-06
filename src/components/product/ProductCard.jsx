import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../common/Badge';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const ProductCard = memo(({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const hasMultipleImages = product.images && product.images.length > 1;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[selectedColorIndex]?.name || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const currentDisplayImage =
    product.images?.[currentImgIndex] || product.images?.[0];

  return (
    <motion.div
      layout
      className="zenji-card zenji-card--premium"
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasMultipleImages) setCurrentImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImgIndex(0);
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="zenji-card__media">
        <Link to={`/product/${product.id}`} className="zenji-card__link" aria-label={`View ${product.name}`}>
          {/* Main Image with Crossfade & Scale */}
          <motion.img
            key={currentDisplayImage}
            src={currentDisplayImage}
            alt={product.name}
            className="zenji-card__img"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Holographic Sheen on hover */}
          <div className="zenji-card__sheen" />
        </Link>

        {/* Animated Badge */}
        {product.tag && (
          <motion.div
            className="zenji-card__badge-wrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant={
                product.tag === 'NEW DROP'
                  ? 'neon'
                  : product.tag === 'LIMITED RUN'
                  ? 'accent'
                  : 'default'
              }
              className="zenji-badge--glow"
            >
              {product.tag}
            </Badge>
          </motion.div>
        )}

        {/* Stock / Limited Batch Indicator */}
        <div className="zenji-card__top-right">
          <span className="zenji-card__id-pill">SS26</span>
        </div>

        {/* Floating Quick Action Buttons with Spring Entrance */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="zenji-card__actions"
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {onQuickView && (
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleQuickViewClick}
                  className="zenji-card__action-btn"
                  title="Quick View Details"
                  aria-label={`Quick View Details for ${product.name}`}
                >
                  <Eye size={16} />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickAdd}
                className={`zenji-card__action-btn ${
                  justAdded
                    ? 'zenji-card__action-btn--success'
                    : 'zenji-card__action-btn--primary'
                }`}
                title={justAdded ? 'Added to Bag!' : 'Quick Add to Bag'}
                aria-label={`Quick Add ${product.name} to Bag`}
              >
                {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="zenji-card__info">
        {/* Category & Rating */}
        <div className="zenji-card__meta-top">
          <span className="zenji-card__category">{product.category.toUpperCase()} // ATELIER</span>
          {product.rating && (
            <div className="zenji-card__rating">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="zenji-card__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Price Row */}
        <div className="zenji-card__price-wrap">
          <span className="zenji-card__price">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="zenji-card__price-original">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Swatches & Sizes Footer */}
        <div className="zenji-card__footer-meta">
          {product.colors && product.colors.length > 0 && (
            <div className="zenji-card__color-dots">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  className={`zenji-card__color-dot ${
                    selectedColorIndex === idx ? 'zenji-card__color-dot--active' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
            </div>
          )}

          {product.sizes && (
            <div className="zenji-card__sizes">
              {product.sizes.map((s) => (
                <span key={s} className="zenji-card__size-dot">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;

