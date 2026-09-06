import { useState, useCallback } from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedDrops } from '../components/home/FeaturedDrops';
import { BrandManifesto } from '../components/home/BrandManifesto';
import { Newsletter } from '../components/home/Newsletter';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { PRODUCTS } from '../data/products';
import { useDocumentTitle } from '../utils/useDocumentTitle';

export const Home = () => {
  useDocumentTitle(
    'Drop 004 // Cyber Omni Archive',
    'Tokyo archival tactical minimalism. Heavy fleece hoodies, technical utility cargos, and modular outerwear.'
  );

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleOpenQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <div className="zenji-page">
      <Hero />
      <FeaturedDrops
        products={PRODUCTS}
        onQuickView={handleOpenQuickView}
      />
      <BrandManifesto />
      <Newsletter />

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
};

export default Home;

