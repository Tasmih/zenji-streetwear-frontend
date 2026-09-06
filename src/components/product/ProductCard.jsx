import { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from '../common/Badge';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const ProductCard = memo(({ product, onQuickView, showAddButton = true, showAvailable = true }) => {
  const { addToCart } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const hasMultipleImages = product.images && product.images.length > 1;

  // 3D Tilt Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasMultipleImages && !imageError) setCurrentImgIndex(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImgIndex(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleImageError = useCallback(() => {
    if (!imageError) {
      setImageError(true);
    }
  }, [imageError]);

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

  // Determine active display image with automatic local fallback
  const currentDisplayImage = imageError
    ? (product.localFallback || product.images?.[0])
    : (product.images?.[currentImgIndex] || product.images?.[0]);

  return (
    <div className="zenji-card-perspective-wrapper">
      <motion.div
        layout
        className="zenji-card zenji-card--premium"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Glowing Gradient Border Beam */}
        <div className="zenji-card__glow-border" aria-hidden="true" />

        {/* Media / Product Visual Container */}
        <div className="zenji-card__media">
          <Link
            to={`/product/${product.id}`}
            className="zenji-card__link"
            aria-label={`View ${product.name}`}
          >
            {/* Main Product Image with Smooth Hover Zoom */}
            <motion.img
              key={currentDisplayImage}
              src={currentDisplayImage}
              alt={product.name}
              className="zenji-card__img"
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              initial={{ opacity: 0.88 }}
              animate={{
                opacity: 1,
                scale: isHovered ? 1.08 : 1
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Holographic Sheen & Ambient Light Reflection */}
            <div className="zenji-card__sheen" />
            <div className="zenji-card__scanline-overlay" />
          </Link>

          {/* Corner Precision Crosshairs */}
          <span className="zenji-card__corner zenji-card__corner--tl" aria-hidden="true">+</span>
          <span className="zenji-card__corner zenji-card__corner--tr" aria-hidden="true">+</span>
          <span className="zenji-card__corner zenji-card__corner--bl" aria-hidden="true">+</span>
          <span className="zenji-card__corner zenji-card__corner--br" aria-hidden="true">+</span>

          {/* Campaign Tag Badge */}
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
                    ? 'crimson'
                    : product.tag === 'BESTSELLER'
                    ? 'cyan'
                    : 'archive'
                }
                hasDot={product.tag === 'LIMITED RUN'}
                className="zenji-badge--glow"
              >
                {product.tag}
              </Badge>
            </motion.div>
          )}

          {/* Tokyo Archive Identifier */}
          <div className="zenji-card__top-right">
            <span className="zenji-card__id-pill">ARC-26 // TYO</span>
          </div>

          {/* Floating Quick View Action */}
          <AnimatePresence>
            {isHovered && onQuickView && (
              <motion.div
                className="zenji-card__actions"
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleQuickViewClick}
                  className="zenji-card__action-btn"
                  title="Quick View Details"
                  aria-label={`Quick View Details for ${product.name}`}
                >
                  <Eye size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Information Body */}
        <div className="zenji-card__info">
          {/* Category & Available Badge Header */}
          <div className="zenji-card__meta-top">
            <span className="zenji-card__category">
              {product.category.toUpperCase()} // ATELIER
            </span>

            {showAvailable && (
              <div className="zenji-card__available-badge" title="In Stock in Tokyo Archive">
                <span className="zenji-card__available-dot" />
                <span>AVAILABLE</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3 className="zenji-card__title">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Price & Rating Row */}
          <div className="zenji-card__price-row">
            <div className="zenji-card__price-wrap">
              <span className="zenji-card__price">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="zenji-card__price-original">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {product.rating && (
              <div className="zenji-card__rating">
                <Star size={11} fill="currentColor" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Swatches & Sizes Row */}
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

          {/* Interactive "Add to Bag" Button with Micro Animation */}
          {showAddButton && (
            <motion.button
              type="button"
              className={`zenji-card__add-btn ${justAdded ? 'zenji-card__add-btn--added' : ''}`}
              onClick={handleQuickAdd}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              aria-label={`Add ${product.name} to Bag`}
            >
              <span className="zenji-card__add-btn-glow" aria-hidden="true" />
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="added"
                    className="zenji-card__add-btn-inner zenji-card__add-btn-inner--success"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Check size={14} className="zenji-card__add-btn-icon" />
                    <span>ADDED TO BAG</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    className="zenji-card__add-btn-inner"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ShoppingBag size={14} className="zenji-card__add-btn-icon" />
                    <span>ADD TO BAG</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
