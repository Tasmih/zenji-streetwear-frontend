import { ProductCard } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

export const ProductGrid = ({ products, onQuickView }) => {
  if (!products || products.length === 0) {
    return (
      <div className="zenji-grid-empty">
        <div className="zenji-grid-empty__icon">
          <ShoppingBag size={44} strokeWidth={1.2} />
        </div>
        <h3 className="zenji-grid-empty__title">NO PIECES MATCH YOUR CRITERIA</h3>
        <p className="zenji-grid-empty__text">
          Try adjusting your filter selection or search query to browse available streetwear pieces.
        </p>
      </div>
    );
  }

  return (
    <div className="zenji-product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
