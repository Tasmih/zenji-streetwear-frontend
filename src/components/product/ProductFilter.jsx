import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const ProductFilter = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalResults
}) => {
  return (
    <div className="zenji-filter">
      {/* Category Pills Bar */}
      <div className="zenji-filter__categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`zenji-filter__pill ${
              selectedCategory === cat.slug ? 'zenji-filter__pill--active' : ''
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Control Bar: Search & Sort */}
      <div className="zenji-filter__controls">
        {/* Search Bar */}
        <div className="zenji-filter__search-wrap">
          <Search size={16} className="zenji-filter__search-icon" />
          <input
            type="text"
            placeholder="Search streetwear archives..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="zenji-filter__search-input"
          />
        </div>

        {/* Sort & Count */}
        <div className="zenji-filter__sort-wrap">
          <span className="zenji-filter__count">
            Showing <strong>{totalResults}</strong> pieces
          </span>
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
    </div>
  );
};
