import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/useCart';
import { formatCurrency } from '../utils/formatCurrency';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(() => product?.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(() => product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(() => product?.colors?.[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="zenji-not-found">
        <h2>PRODUCT NOT FOUND IN ARCHIVE</h2>
        <p>The requested streetwear piece could not be located or has been archived.</p>
        <Link to="/shop">
          <Button variant="primary" icon={ArrowLeft}>
            RETURN TO SHOP
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const currentDisplayImg = activeImage || product.images?.[0] || '';

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  return (
    <div className="zenji-detail-page">
      {/* Breadcrumbs */}
      <motion.div
        className="zenji-breadcrumbs"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button onClick={() => navigate(-1)} className="zenji-breadcrumbs__back">
          <ArrowLeft size={16} />
          <span>BACK</span>
        </button>
        <span className="zenji-breadcrumbs__div">/</span>
        <Link to="/shop" className="zenji-breadcrumbs__link">SHOP</Link>
        <span className="zenji-breadcrumbs__div">/</span>
        <span className="zenji-breadcrumbs__current">{product.name}</span>
      </motion.div>

      <div className="zenji-detail-layout">
        {/* Visual Gallery */}
        <motion.div
          className="zenji-detail-gallery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-detail-gallery__main">
            <motion.img
              key={currentDisplayImg}
              src={currentDisplayImg}
              alt={product.name}
              className="zenji-detail-gallery__img"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            {product.tag && (
              <div className="zenji-detail-gallery__badge">
                <Badge variant="neon">{product.tag}</Badge>
              </div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="zenji-detail-gallery__thumbs">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(img)}
                  className={`zenji-detail-gallery__thumb ${
                    currentDisplayImg === img ? 'zenji-detail-gallery__thumb--active' : ''
                  }`}
                >
                  <img src={img} alt="" />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info & Purchase Bar */}
        <motion.div
          className="zenji-detail-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-detail-info__header">
            <span className="zenji-detail-info__cat">{product.category.toUpperCase()} // ARCHIVE</span>
            <h1 className="zenji-detail-info__title">{product.name}</h1>

            <div className="zenji-detail-info__price-row">
              <div className="zenji-detail-info__price">
                <span className="zenji-detail-info__price-cur">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="zenji-detail-info__price-prev">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.rating && (
                <div className="zenji-card__rating">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating} ({product.reviewsCount} customer reviews)</span>
                </div>
              )}
            </div>
          </div>

          <p className="zenji-detail-info__desc">{product.description}</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="zenji-detail-option">
              <div className="zenji-detail-option__label">
                <span>COLOR:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="zenji-detail-option__colors">
                {product.colors.map((c) => (
                  <motion.button
                    key={c.name}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(c.name)}
                    className={`zenji-color-swatch zenji-color-swatch--lg ${
                      selectedColor === c.name ? 'zenji-color-swatch--active' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <div className="zenji-detail-option">
              <div className="zenji-detail-option__label">
                <span>SELECT SIZE</span>
                <span className="zenji-detail-option__hint">Oversized Boxy Fit</span>
              </div>
              <div className="zenji-detail-option__sizes">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`zenji-size-btn zenji-size-btn--lg ${
                      selectedSize === size ? 'zenji-size-btn--active' : ''
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Bag */}
          <div className="zenji-detail-actions">
            <div className="zenji-detail-actions__qty">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="zenji-detail-actions__qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </motion.button>
              <span className="zenji-detail-actions__qty-val">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setQuantity((q) => q + 1)}
                className="zenji-detail-actions__qty-btn"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </motion.button>
            </div>

            <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={ShoppingBag}
                onClick={handleAddToCart}
              >
                ADD TO BAG • {formatCurrency(product.price * quantity)}
              </Button>
            </motion.div>
          </div>

          <AnimatePresence>
            {addedNotice && (
              <motion.div
                className="zenji-detail-notice"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Check size={16} />
                <span>Added {quantity}x {product.name} to your bag!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guarantee Badges */}
          <div className="zenji-detail-perks">
            <div className="zenji-detail-perk">
              <Truck size={18} />
              <div>
                <strong>WORLDWIDE EXPRESS</strong>
                <span>Complimentary on orders over $200</span>
              </div>
            </div>
            <div className="zenji-detail-perk">
              <ShieldCheck size={18} />
              <div>
                <strong>AUTHENTICITY GUARANTEED</strong>
                <span>NFC-verified Tokyo Studio archive piece</span>
              </div>
            </div>
            <div className="zenji-detail-perk">
              <RotateCcw size={18} />
              <div>
                <strong>14-DAY ARCHIVE RETURNS</strong>
                <span>Hassle-free return policy</span>
              </div>
            </div>
          </div>

          {/* Features specifications list */}
          {product.features && (
            <div className="zenji-detail-specs">
              <h3 className="zenji-detail-specs__title">ARCHIVAL SPECIFICATIONS</h3>
              <ul className="zenji-detail-specs__list">
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>

      {/* Related Products with Staggered View */}
      {relatedProducts.length > 0 && (
        <section className="zenji-detail-related">
          <div className="zenji-section__header">
            <div>
              <span className="zenji-section__tag">CURATED MATCHES</span>
              <h2 className="zenji-section__title">COMPLETE THE FIT</h2>
            </div>
          </div>
          <div className="zenji-product-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default ProductDetail;
