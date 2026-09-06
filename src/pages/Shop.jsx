import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilter } from '../components/product/ProductFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { PRODUCTS } from '../data/products';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleSelectCategory = (categorySlug) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', categorySlug);
    }
    setSearchParams(nextParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // 'featured'
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="zenji-shop-page">
      <div className="zenji-shop-hero">
        <span className="zenji-shop-hero__badge">ARCHIVAL VAULT</span>
        <h1 className="zenji-shop-hero__title">DROP CATALOGUE</h1>
        <p className="zenji-shop-hero__sub">
          Explore the complete seasonal assortment of bespoke luxury streetwear, tactical hardware & outerwear.
        </p>
      </div>

      <div className="zenji-shop-container">
        <ProductFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredProducts.length}
        />

        <ProductGrid
          products={filteredProducts}
          onQuickView={(product) => setQuickViewProduct(product)}
        />
      </div>

      {quickViewProduct && (
        <ProductQuickView
          key={quickViewProduct.id}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
export default Shop;
