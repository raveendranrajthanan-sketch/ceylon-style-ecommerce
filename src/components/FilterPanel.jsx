
function FilterPanel({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sort,
  setSort,
  inStockOnly,
  setInStockOnly,
  clearFilters,
}) {
  return (
    <div className="premium-shop-filters">

      {/* Search */}
      <div className="shop-search-box">
        <span className="shop-search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search your favourite styles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Category */}
      <div className="shop-filter-control">
        <label htmlFor="shop-category">CATEGORY</label>
        <select
          id="shop-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Price */}
      <div className="shop-filter-control">
        <label htmlFor="min-price">MIN PRICE (Rs.)</label>
        <input
          id="min-price"
          type="number"
          min="0"
          placeholder="Minimum"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      {/* Maximum Price */}
      <div className="shop-filter-control">
        <label htmlFor="max-price">MAX PRICE (Rs.)</label>
        <input
          id="max-price"
          type="number"
          min="0"
          placeholder="Maximum"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Rating */}
      <div className="shop-filter-control">
        <label htmlFor="shop-rating">MINIMUM RATING</label>
        <select
          id="shop-rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="0">All Ratings</option>
          <option value="1">1+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Sorting */}
      <div className="shop-filter-control">
        <label htmlFor="shop-sort">SORT BY</label>
        <select
          id="shop-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Stock Filter */}
      <label className="shop-stock-filter">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        <span>Show in-stock products only</span>
      </label>

      {/* Clear Filters */}
      <button
        type="button"
        className="shop-reset-button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

    </div>
  );
}

export default FilterPanel;
