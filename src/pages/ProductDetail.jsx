import { useState, useEffect, useCallback, useRef } from 'react';
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
  Minus,
  ChevronLeft,
  ChevronRight,
  Layers,
  Scissors,
  Droplets,
  PackageCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import { useDocumentTitle } from '../utils/useDocumentTitle';

// Archival Fabric & Material Specifications Data Provider
const getFabricData = (product) => {
  switch (product.category) {
    case 'hoodies':
      return {
        material: '500 GSM 100% French Terry Cotton',
        weight: 'Heavyweight 500 GSM',
        origin: 'Custom milled in Guimarães, Portugal',
        treatment: 'Vintage garment acid-wash with anti-pilling enzyme finish',
        care: [
          'Machine wash cold (30°C / 86°F) inside-out',
          'Hang dry in shade to preserve color depth',
          'Do not tumble dry or bleach',
          'Iron low on reverse if needed (avoid prints)'
        ]
      };
    case 'tees':
      return {
        material: '300 GSM Ultra-Combed Organic Cotton',
        weight: 'Substantial 300 GSM Boxy Drape',
        origin: 'Spun and knitted in Porto, Portugal',
        treatment: 'Pre-shrunk reactive dye with silicone softener',
        care: [
          'Machine wash gentle cycle cold (30°C)',
          'Dry flat or line dry away from direct sunlight',
          'Do not iron over screen-printed graphics',
          'Do not dry clean'
        ]
      };
    case 'outerwear':
      return {
        material: '700 GSM Custom Wool & Cotton Architectural Knit',
        weight: 'Ultra-Heavyweight 700 GSM Gauge',
        origin: 'Engineered in Tokyo Atelier, spun in Portugal',
        treatment: 'Hand-distressed raw micro-frayed edging',
        care: [
          'Specialist dry clean recommended',
          'Hand wash cold with wool detergent if necessary',
          'Lay flat to dry on towel; do not wring or hang',
          'Store folded to prevent knit stretching'
        ]
      };
    case 'pants':
      return {
        material: '340 GSM High-Density Cotton Twill with 2% Elastane Flex',
        weight: 'Mid-Heavyweight Structured Twill',
        origin: 'Milled in Okayama, Japan',
        treatment: 'DWR water-resistant coating with matte carbon finish',
        care: [
          'Machine wash cold inside-out with dark colors',
          'Cinch all bungees and zip pockets before wash',
          'Hang dry in shade; cool iron on reverse',
          'Do not use fabric softeners'
        ]
      };
    case 'accessories':
      return {
        material: 'Dimension-Polyant X-Pac® Sailcloth & 500D Cordura®',
        weight: 'Reinforced Multi-Ply Hydrophobic Laminate',
        origin: 'Precision hardware engineered in Germany & Japan',
        treatment: '100% Weatherproof hydrostatic laminate finish',
        care: [
          'Wipe clean with microfiber cloth and mild soap',
          'Air dry at room temperature',
          'Do not submerge magnetic Fidlock buckles in salt water',
          'Do not machine wash or tumble dry'
        ]
      };
    default:
      return {
        material: 'Custom Archival Streetwear Textile',
        weight: 'Heavyweight Studio Grade',
        origin: 'Crafted under Tokyo Atelier specifications',
        treatment: 'Pre-shrunk structural wash',
        care: [
          'Machine wash cold with similar colors',
          'Hang dry in shade to preserve fabric integrity'
        ]
      };
  }
};

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  useDocumentTitle(
    product ? `${product.name} // Archive Spec` : 'Archive Item',
    product ? product.description : 'ZENJI luxury streetwear piece specification and sizing.'
  );

  const [activeImageOverride, setActiveImageOverride] = useState(null);
  const [prevId, setPrevId] = useState(id);

  if (prevId !== id) {
    setPrevId(id);
    setActiveImageOverride(null);
  }

  const [selectedSize, setSelectedSize] = useState(() => product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(() => product?.colors?.[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  const carouselRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3200);
  }, [product, selectedSize, selectedColor, quantity, addToCart]);

  const scrollCarousel = useCallback((direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

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

  const currentDisplayImg = activeImageOverride || product.images?.[0] || '';
  const fabricData = getFabricData(product);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <motion.div
      className="zenji-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Editorial Breadcrumbs */}
      <motion.div
        className="zenji-breadcrumbs"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <button onClick={() => navigate(-1)} className="zenji-breadcrumbs__back">
          <ArrowLeft size={15} />
          <span>BACK</span>
        </button>
        <span className="zenji-breadcrumbs__div">/</span>
        <Link to="/shop" className="zenji-breadcrumbs__link">SHOP</Link>
        <span className="zenji-breadcrumbs__div">/</span>
        <span className="zenji-breadcrumbs__current">{product.name}</span>
      </motion.div>

      {/* Main 50/50 Two-Column Layout Grid */}
      <div className="zenji-detail-layout">
        {/* Left Side: 50% Product Image Gallery */}
        <motion.div
          className="zenji-detail-gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Cinematic Product Card Frame */}
          <div
            className="zenji-detail-gallery__frame"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Atelier Corner Accents */}
            <div className="zenji-detail-gallery__coord zenji-detail-gallery__coord--tl">+</div>
            <div className="zenji-detail-gallery__coord zenji-detail-gallery__coord--tr">+</div>
            <div className="zenji-detail-gallery__coord zenji-detail-gallery__coord--bl">+</div>
            <div className="zenji-detail-gallery__coord zenji-detail-gallery__coord--br">+</div>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentDisplayImg}
                src={currentDisplayImg}
                alt={product.name}
                className="zenji-detail-gallery__img"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.02 : 1
                }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.3, ease: 'easeOut' }
                }}
              />
            </AnimatePresence>

            {product.tag && (
              <div className="zenji-detail-gallery__badge">
                <Badge variant="neon">{product.tag}</Badge>
              </div>
            )}

            <div className="zenji-detail-gallery__brand-watermark">
              ZENJI ATELIER // SHIBUYA SPEC
            </div>
          </div>

          {/* 4 Thumbnail Views Grid */}
          {product.images?.length > 1 && (
            <div className="zenji-detail-gallery__thumbs" role="tablist" aria-label="Product imagery angles">
              {product.images.map((img, idx) => {
                const isActive = currentDisplayImg === img;
                return (
                  <motion.button
                    key={idx}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View angle 0${idx + 1}`}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveImageOverride(img)}
                    className={`zenji-detail-gallery__thumb ${
                      isActive ? 'zenji-detail-gallery__thumb--active' : ''
                    }`}
                  >
                    <img src={img} alt={`${product.name} perspective 0${idx + 1}`} />
                    <span className="zenji-detail-gallery__thumb-badge">0{idx + 1}</span>

                    {isActive && (
                      <motion.div
                        className="zenji-detail-gallery__thumb-indicator"
                        layoutId="activeThumbBorder"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Right Side: 50% Product Information Section (Aligned from the Top) */}
        <motion.div
          className="zenji-detail-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1. Category label */}
          <span className="zenji-detail-info__cat">
            {product.category.toUpperCase()} // TOKYO ARCHIVE
          </span>

          {/* 2. Product title (Complete name, maximum 2 lines, no ellipsis, responsive) */}
          <h1 className="zenji-detail-info__title">{product.name}</h1>

          {/* 3 & 4. Price & Rating in sleek horizontal alignment */}
          <div className="zenji-detail-info__price-rating-row">
            <div className="zenji-detail-info__price-block">
              <span className="zenji-detail-info__price-cur">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="zenji-detail-info__price-prev">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="zenji-detail-info__discount-tag">
                  SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {product.rating && (
              <div className="zenji-detail-info__rating">
                <div className="zenji-detail-info__rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(product.rating) ? 'zenji-star--filled' : 'zenji-star--empty'}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="zenji-detail-info__rating-score">{product.rating}</span>
                <span className="zenji-detail-info__rating-count">({product.reviewsCount})</span>
              </div>
            )}
          </div>

          {/* 5. Divider */}
          <div className="zenji-detail-divider" />

          {/* 6. Description */}
          <p className="zenji-detail-info__desc">{product.description}</p>

          {/* 7. Color selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="zenji-detail-option">
              <div className="zenji-detail-option__label">
                <span>COLORWAY</span>
                <strong className="zenji-detail-option__selected-val">{selectedColor}</strong>
              </div>
              <div className="zenji-detail-option__colors">
                {product.colors.map((c) => (
                  <motion.button
                    key={c.name}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => setSelectedColor(c.name)}
                    className={`zenji-color-swatch zenji-color-swatch--lg ${
                      selectedColor === c.name ? 'zenji-color-swatch--active' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select colorway ${c.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 8. Size selection */}
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
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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

          {/* 9 & 10. Purchase Area: Quantity Selector + Add to Bag CTA in compact high-priority alignment */}
          <div className="zenji-detail-purchase-row">
            <div className="zenji-detail-actions__qty">
              <motion.button
                whileTap={{ scale: 0.86 }}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="zenji-detail-actions__qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </motion.button>
              <span className="zenji-detail-actions__qty-val">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.86 }}
                onClick={() => setQuantity((q) => q + 1)}
                className="zenji-detail-actions__qty-btn"
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </motion.button>
            </div>

            <motion.button
              className="zenji-detail-add-btn"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 25 }}
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to shopping bag`}
            >
              <ShoppingBag size={17} />
              <span>ADD TO BAG • {formatCurrency(product.price * quantity)}</span>
            </motion.button>
          </div>

          {/* Added to Bag Floating Notification */}
          <AnimatePresence>
            {addedNotice && (
              <motion.div
                className="zenji-detail-notice"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.22 }}
              >
                <Check size={16} />
                <span>Added {quantity}x {product.name} ({selectedSize} / {selectedColor}) to your bag!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guarantee & Trust Badges */}
          <div className="zenji-detail-perks">
            <div className="zenji-detail-perk">
              <Truck size={17} />
              <div>
                <strong>WORLDWIDE EXPRESS DISPATCH</strong>
                <span>Complimentary on orders over $200</span>
              </div>
            </div>
            <div className="zenji-detail-perk">
              <ShieldCheck size={17} />
              <div>
                <strong>AUTHENTICITY GUARANTEED</strong>
                <span>NFC-verified Tokyo Studio archive piece</span>
              </div>
            </div>
            <div className="zenji-detail-perk">
              <RotateCcw size={17} />
              <div>
                <strong>14-DAY ARCHIVE RETURNS</strong>
                <span>Complimentary exchanges worldwide</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Below Product Section: Specifications, Fabric Info & Shipping Dossier */}
      <motion.section
        className="zenji-detail-dossier"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="zenji-detail-dossier__header">
          <span className="zenji-section__tag">ATELIER DOSSIER</span>
          <h2 className="zenji-detail-dossier__title">GARMENT SPECIFICATIONS & CRAFT</h2>
        </div>

        {/* Tab Selection */}
        <div className="zenji-detail-dossier__tabs" role="tablist" aria-label="Garment dossier tabs">
          <button
            role="tab"
            aria-selected={activeTab === 'specs'}
            onClick={() => setActiveTab('specs')}
            className={`zenji-detail-dossier__tab ${activeTab === 'specs' ? 'zenji-detail-dossier__tab--active' : ''}`}
          >
            <Layers size={15} />
            <span>SPECIFICATIONS</span>
            {activeTab === 'specs' && (
              <motion.div
                layoutId="dossierTabIndicator"
                className="zenji-detail-dossier__indicator"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'fabric'}
            onClick={() => setActiveTab('fabric')}
            className={`zenji-detail-dossier__tab ${activeTab === 'fabric' ? 'zenji-detail-dossier__tab--active' : ''}`}
          >
            <Scissors size={15} />
            <span>FABRIC & MATERIAL</span>
            {activeTab === 'fabric' && (
              <motion.div
                layoutId="dossierTabIndicator"
                className="zenji-detail-dossier__indicator"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'shipping'}
            onClick={() => setActiveTab('shipping')}
            className={`zenji-detail-dossier__tab ${activeTab === 'shipping' ? 'zenji-detail-dossier__tab--active' : ''}`}
          >
            <PackageCheck size={15} />
            <span>SHIPPING & RETURNS</span>
            {activeTab === 'shipping' && (
              <motion.div
                layoutId="dossierTabIndicator"
                className="zenji-detail-dossier__indicator"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
          </button>
        </div>

        {/* Tab Body Content with Animation */}
        <div className="zenji-detail-dossier__body">
          <AnimatePresence mode="wait">
            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="zenji-detail-dossier__pane"
              >
                <div className="zenji-detail-dossier__grid">
                  <div className="zenji-detail-dossier__col">
                    <h3 className="zenji-detail-dossier__subtitle">ARCHIVAL FEATURES</h3>
                    <ul className="zenji-detail-dossier__list">
                      {product.features?.map((feat, idx) => (
                        <li key={idx}>
                          <span className="zenji-detail-dossier__bullet">▪</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="zenji-detail-dossier__col">
                    <h3 className="zenji-detail-dossier__subtitle">CUT & SILHOUETTE</h3>
                    <div className="zenji-detail-dossier__meta-grid">
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">FIT PROFILE</span>
                        <span className="zenji-detail-dossier__meta-value">Architectural Oversized</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">SHOULDER SEAM</span>
                        <span className="zenji-detail-dossier__meta-value">Exaggerated Drop-Shoulder</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">COLLAR / HOOD</span>
                        <span className="zenji-detail-dossier__meta-value">Reinforced Double-Layer</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">RELEASE RUN</span>
                        <span className="zenji-detail-dossier__meta-value">Limited Atelier Batch // 200 Pcs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'fabric' && (
              <motion.div
                key="fabric"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="zenji-detail-dossier__pane"
              >
                <div className="zenji-detail-dossier__grid">
                  <div className="zenji-detail-dossier__col">
                    <h3 className="zenji-detail-dossier__subtitle">TEXTILE COMPOSITION</h3>
                    <div className="zenji-detail-dossier__meta-grid">
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">FABRICATION</span>
                        <span className="zenji-detail-dossier__meta-value">{fabricData.material}</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">DENSITY / WEIGHT</span>
                        <span className="zenji-detail-dossier__meta-value">{fabricData.weight}</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">MILL ORIGIN</span>
                        <span className="zenji-detail-dossier__meta-value">{fabricData.origin}</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">WASH TREATMENT</span>
                        <span className="zenji-detail-dossier__meta-value">{fabricData.treatment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="zenji-detail-dossier__col">
                    <h3 className="zenji-detail-dossier__subtitle">GARMENT CARE DIRECTIVE</h3>
                    <ul className="zenji-detail-dossier__list">
                      {fabricData.care.map((instruction, idx) => (
                        <li key={idx}>
                          <Droplets size={14} className="zenji-detail-dossier__icon" />
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="zenji-detail-dossier__pane"
              >
                <div className="zenji-detail-dossier__grid">
                  <div className="zenji-detail-dossier__col">
                    <h3 className="zenji-detail-dossier__subtitle">GLOBAL DISPATCH</h3>
                    <div className="zenji-detail-dossier__meta-grid">
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">DOMESTIC JAPAN</span>
                        <span className="zenji-detail-dossier__meta-value">Next-Day Sagawa Express ($0)</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">NORTH AMERICA / EU</span>
                        <span className="zenji-detail-dossier__meta-value">2-4 Business Days via DHL Express</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">PACKAGING</span>
                        <span className="zenji-detail-dossier__meta-value">Custom Matte Vacuum Archive Bag</span>
                      </div>
                      <div className="zenji-detail-dossier__meta-item">
                        <span className="zenji-detail-dossier__meta-label">TRACKING</span>
                        <span className="zenji-detail-dossier__meta-value">Real-time GPS dispatch coordinates</span>
                      </div>
                    </div>
                  </div>

                  <div className="zenji-detail-dossier__col">
                    <h3 className="zenji-detail-dossier__subtitle">ARCHIVAL GUARANTEE & RETURNS</h3>
                    <p className="zenji-detail-dossier__desc">
                      Every ZENJI piece ships with an embedded cryptographic NFC chip linked to the Tokyo atelier ledger. Items may be returned or exchanged within 14 days of receipt in unworn condition with security tags intact.
                    </p>
                    <div className="zenji-detail-dossier__notice-box">
                      COMPLIMENTARY RETURN LABELS PROVIDED FOR ALL DOMESTIC & SELECT INTERNATIONAL ORDERS.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <motion.section
          className="zenji-detail-related"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-section__header zenji-detail-related__header">
            <div>
              <span className="zenji-section__tag">CURATED MATCHES</span>
              <h2 className="zenji-section__title">COMPLETE THE FIT</h2>
              <p className="zenji-section__subtitle">
                Silhouettes architecturally paired with the {product.name}.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="zenji-carousel__nav-btns">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(200, 255, 0, 0.15)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollCarousel('left')}
                className="zenji-carousel__nav-btn"
                aria-label="Scroll related products left"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(200, 255, 0, 0.15)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollCarousel('right')}
                className="zenji-carousel__nav-btn"
                aria-label="Scroll related products right"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* Smooth Scrollable Carousel Track */}
          <div className="zenji-carousel__track" ref={carouselRef}>
            {relatedProducts.map((relProduct) => (
              <div key={relProduct.id} className="zenji-carousel__item">
                <ProductCard product={relProduct} />
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default ProductDetail;
