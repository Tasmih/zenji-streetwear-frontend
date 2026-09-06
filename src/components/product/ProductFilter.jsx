import { Search, X, SlidersHorizontal, LayoutGrid, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../data/categories';

export const ProductFilter = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  gridCols,
  onGridColsChange,
  categoryCounts = {},
  totalResults,
  onResetFilters
}) => {
  const priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $100', value: 'under-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200+', value: '200-plus' }
  ];

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    Boolean(searchQuery.trim()) ||
    priceRange !== 'all';

  return (
    <div className="zenji-filter zenji-filter--enhanced">
      {/* Category Pills with Sliding Active Indicator */}
      <div className="zenji-filter__categories-wrap">
        <div className="zenji-filter__categories">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            const count = categoryCounts[cat.slug] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`zenji-filter__pill ${
                  isActive ? 'zenji-filter__pill--active' : ''
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="zenji-filter__pill-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="zenji-filter__pill-text">{cat.name}</span>
                {count > 0 && (
                  <span className="zenji-filter__pill-count">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Strip: Price Chips, Search & Sort */}
      <div className="zenji-filter__controls">
        {/* Search Input with Clear Button */}
        <div className="zenji-filter__search-wrap">
          <Search size={16} className="zenji-filter__search-icon" />
          <input
            type="text"
            placeholder="Search archive pieces (e.g., Hoodie, Cargo, Cordura)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="zenji-filter__search-input"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="zenji-filter__search-clear"
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Quick Price Range Chips */}
        <div className="zenji-filter__price-chips">
          {priceOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onPriceRangeChange(opt.value)}
              className={`zenji-filter__chip ${
                priceRange === opt.value ? 'zenji-filter__chip--active' : ''
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort & Grid Toggle Controls */}
        <div className="zenji-filter__right-group">
          {/* Grid Layout Switcher */}
          {onGridColsChange && (
            <div className="zenji-filter__view-switch">
              <button
                onClick={() => onGridColsChange(4)}
                className={`zenji-filter__view-btn ${
                  gridCols === 4 ? 'zenji-filter__view-btn--active' : ''
                }`}
                title="4 Column Grid"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => onGridColsChange(3)}
                className={`zenji-filter__view-btn ${
                  gridCols === 3 ? 'zenji-filter__view-btn--active' : ''
                }`}
                title="3 Column Large Grid"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="zenji-filter__select-wrap">
            <SlidersHorizontal size={14} className="zenji-filter__select-icon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="zenji-filter__select"
              aria-label="Sort products"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips & Clear All Bar */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            className="zenji-filter__active-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="zenji-filter__active-tags">
              <span className="zenji-filter__active-label">ACTIVE FILTERS:</span>

              {selectedCategory !== 'all' && (
                <span className="zenji-filter__active-tag">
                  Category: {selectedCategory.toUpperCase()}
                  <button onClick={() => onSelectCategory('all')}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="zenji-filter__active-tag">
                  Query: "{searchQuery}"
                  <button onClick={() => onSearchChange('')}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {priceRange !== 'all' && (
                <span className="zenji-filter__active-tag">
                  Price: {priceRange}
                  <button onClick={() => onPriceRangeChange('all')}>
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={onResetFilters}
                className="zenji-filter__reset-btn"
              >
                RESET ALL
              </button>
            </div>

            <span className="zenji-filter__count">
              <strong>{totalResults}</strong> pieces match
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProductFilter;
