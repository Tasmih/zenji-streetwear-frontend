import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const hasMultipleImages = product.images && product.images.length > 1;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0]?.name || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="zenji-card"
      onMouseEnter={() => hasMultipleImages && setCurrentImgIndex(1)}
      onMouseLeave={() => setCurrentImgIndex(0)}
    >
      <div className="zenji-card__media">
        <Link to={`/product/${product.id}`} className="zenji-card__link">
          <img
            src={product.images[currentImgIndex] || product.images[0]}
            alt={product.name}
            className="zenji-card__img"
            loading="lazy"
          />
        </Link>

        {/* Tag badge */}
        {product.tag && (
          <div className="zenji-card__badge-wrap">
            <Badge
              variant={
                product.tag === 'NEW DROP'
                  ? 'neon'
                  : product.tag === 'LIMITED RUN'
                  ? 'accent'
                  : 'default'
              }
            >
              {product.tag}
            </Badge>
          </div>
        )}

        {/* Floating Quick Action Buttons */}
        <div className="zenji-card__actions">
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="zenji-card__action-btn"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye size={16} />
            </button>
          )}
          <button
            onClick={handleQuickAdd}
            className="zenji-card__action-btn zenji-card__action-btn--primary"
            title="Quick Add to Bag"
            aria-label="Quick Add to Bag"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      <div className="zenji-card__info">
        <div className="zenji-card__meta-top">
          <span className="zenji-card__category">{product.category.toUpperCase()}</span>
          {product.rating && (
            <div className="zenji-card__rating">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <h3 className="zenji-card__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="zenji-card__price-wrap">
          <span className="zenji-card__price">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="zenji-card__price-original">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Available sizes hint */}
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
  );
};
