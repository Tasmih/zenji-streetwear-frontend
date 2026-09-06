import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilter } from '../components/product/ProductFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { PRODUCTS } from '../data/products';
import { useDocumentTitle } from '../utils/useDocumentTitle';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  useDocumentTitle(
    selectedCategory !== 'all'
      ? `Shop ${selectedCategory.toUpperCase()} // Archive`
      : 'Shop All Archive Drops',
    'Browse the full ZENJI streetwear archive: 500 GSM heavyweight hoodies, utility cargos, and modular technical jackets.'
  );

  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [gridCols, setGridCols] = useState(4);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleSelectCategory = useCallback((categorySlug) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', categorySlug);
    }
    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setPriceRange('all');
    setSortBy('featured');
    handleSelectCategory('all');
  }, [handleSelectCategory]);


  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
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

    // Filter by Price Range
    if (priceRange === 'under-100') {
      result = result.filter((p) => p.price < 100);
    } else if (priceRange === '100-200') {
      result = result.filter((p) => p.price >= 100 && p.price <= 200);
    } else if (priceRange === '200-plus') {
      result = result.filter((p) => p.price > 200);
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
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  return (
    <div className="zenji-shop-page">
      {/* Editorial Header */}
      <div className="zenji-shop-hero">
        <span className="zenji-shop-hero__badge">DROP ARCHIVES // SS26</span>
        <h1 className="zenji-shop-hero__title">SEASONAL CATALOGUE</h1>
        <p className="zenji-shop-hero__sub">
          Explore bespoke 500 GSM loopback cotton, tactical Cordura® ripstop outerwear, and articulated Tokyo streetwear pieces.
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
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          gridCols={gridCols}
          onGridColsChange={setGridCols}
          categoryCounts={categoryCounts}
          totalResults={filteredProducts.length}
          onResetFilters={handleResetFilters}
        />

        <ProductGrid
          products={filteredProducts}
          gridCols={gridCols}
          onQuickView={(product) => setQuickViewProduct(product)}
          onResetFilters={handleResetFilters}
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
