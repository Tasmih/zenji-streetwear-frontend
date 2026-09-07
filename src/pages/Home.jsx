import { useState, useCallback } from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { BrandStory } from '../components/home/BrandStory';
import { DesignPhilosophy } from '../components/home/DesignPhilosophy';
import { ArchiveTimeline } from '../components/home/ArchiveTimeline';
import { WhyChooseZenji } from '../components/home/WhyChooseZenji';
import { CommunityReviews } from '../components/home/CommunityReviews';
import { Newsletter } from '../components/home/Newsletter';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { useDocumentTitle } from '../utils/useDocumentTitle';

export const Home = () => {
  useDocumentTitle(
    'ZENJI Tokyo Atelier | Premium Japanese Streetwear',
    'ZENJI Tokyo Atelier creates premium Japanese-inspired streetwear with heavyweight fabrics, architectural silhouettes, and limited archive drops.'
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
      <CategoryShowcase />
      <ProductShowcase onQuickView={handleOpenQuickView} />
      <BrandStory />
      <DesignPhilosophy />
      <ArchiveTimeline />
      <WhyChooseZenji />
      <CommunityReviews />
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

