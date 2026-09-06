import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const ProductQuickView = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(() => product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(() => product?.colors?.[0]?.name || 'Default');
  const [activeImg, setActiveImg] = useState(() => product?.images?.[0] || '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="zenji-modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="zenji-modal"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="zenji-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </motion.button>

          <div className="zenji-modal__content">
            {/* Gallery */}
            <div className="zenji-modal__gallery">
              <div className="zenji-modal__main-img-wrap">
                <motion.img
                  key={activeImg}
                  src={activeImg}
                  alt={product.name}
                  className="zenji-modal__main-img"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {product.images?.length > 1 && (
                <div className="zenji-modal__thumbs">
                  {product.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`zenji-modal__thumb ${
                        activeImg === img ? 'zenji-modal__thumb--active' : ''
                      }`}
                      onClick={() => setActiveImg(img)}
                    >
                      <img src={img} alt="" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="zenji-modal__info">
              <div className="zenji-modal__header">
                {product.tag && (
                  <Badge variant="neon" className="zenji-modal__badge">
                    {product.tag}
                  </Badge>
                )}
                <h2 className="zenji-modal__title">{product.name}</h2>
                <div className="zenji-modal__price-rating">
                  <div className="zenji-modal__price">
                    <span>{formatCurrency(product.price)}</span>
                    {product.originalPrice && (
                      <span className="zenji-modal__price-old">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="zenji-card__rating">
                      <Star size={13} fill="currentColor" />
                      <span>{product.rating} ({product.reviewsCount} reviews)</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="zenji-modal__desc">{product.description}</p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="zenji-modal__option-block">
                  <span className="zenji-modal__option-label">COLOR: {selectedColor}</span>
                  <div className="zenji-modal__colors">
                    {product.colors.map((c) => (
                      <motion.button
                        key={c.name}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedColor(c.name)}
                        className={`zenji-color-swatch ${
                          selectedColor === c.name ? 'zenji-color-swatch--active' : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div className="zenji-modal__option-block">
                  <span className="zenji-modal__option-label">SELECT SIZE</span>
                  <div className="zenji-modal__sizes">
                    {product.sizes.map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(s)}
                        className={`zenji-size-btn ${
                          selectedSize === s ? 'zenji-size-btn--active' : ''
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="zenji-modal__actions">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    icon={ShoppingBag}
                    onClick={handleAdd}
                  >
                    ADD TO BAG • {formatCurrency(product.price)}
                  </Button>
                </motion.div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="zenji-modal__view-full"
                >
                  <motion.div
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>VIEW COMPLETE SPECIFICATIONS</span>
                    <ArrowRight size={14} />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
