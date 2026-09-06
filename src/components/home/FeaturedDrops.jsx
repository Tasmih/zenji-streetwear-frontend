import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';

export const FeaturedDrops = ({ products, onQuickView }) => {
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="zenji-section">
      <div className="zenji-section__header">
        <div>
          <span className="zenji-section__tag">FEATURED SELECTION</span>
          <h2 className="zenji-section__title">KEY PIECES FROM DROP 004</h2>
        </div>
        <Link to="/shop" className="zenji-section__link">
          <span>VIEW ALL ARCHIVES</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="zenji-product-grid">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
