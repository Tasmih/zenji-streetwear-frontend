import { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedDrops } from '../components/home/FeaturedDrops';
import { BrandManifesto } from '../components/home/BrandManifesto';
import { Newsletter } from '../components/home/Newsletter';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { PRODUCTS } from '../data/products';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="zenji-page">
      <Hero />
      <FeaturedDrops
        products={PRODUCTS}
        onQuickView={(product) => setQuickViewProduct(product)}
      />
      <BrandManifesto />
      <Newsletter />

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
export default Home;
