
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { products as initialProducts, categories } from "../constants/data";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
function ShopPage({ onAdd }) {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("ceylonProducts");
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sort, setSort] = useState("default");

  // Additional filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState("0");

  // Sync category when URL query changes
  useEffect(() => {
    setCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  // Load updated products from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedProducts = localStorage.getItem("ceylonProducts");
        setProducts(
          savedProducts ? JSON.parse(savedProducts) : initialProducts
        );
      } catch {
        setProducts(initialProducts);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Apply all filters together
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      const matchesStock =
        !inStockOnly || product.stock > 0;

      const matchesRating =
        Number(product.rating || 0) >= Number(minRating);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStock &&
        matchesRating
      );
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;

      if (sort === "name") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setMinRating("0");
  };

  return (
    <div className="premium-shop-page">

      {/* Shop Hero */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <span className="shop-eyebrow">
            CEYLON STYLE / COLLECTION
          </span>

          <div className="shop-gold-line" />

          <h1>
            Discover Your
            <br />
            <span>Signature Style.</span>
          </h1>

          <p>
            Explore timeless fashion, carefully selected
            for your everyday elegance.
          </p>

          <div className="shop-hero-bottom">
            <span>PREMIUM QUALITY</span>
            <span className="shop-hero-dot">✦</span>
            <span>TIMELESS STYLE</span>
            <span className="shop-hero-dot">✦</span>
            <span>CEYLON STYLE</span>
          </div>
        </div>

        <div className="shop-hero-decoration">
          <span>♛</span>
          <p>THE ART OF DRESSING WELL</p>
        </div>
      </section>

      {/* Collection Content */}
      <section className="premium-shop-container">

        <div className="shop-section-heading">
          <div>
            <span className="shop-eyebrow">EXPLORE OUR RANGE</span>
            <h2>Our Collection</h2>
            <p>Find the pieces that define your style.</p>
          </div>

          <div className="shop-total-badge">
            <span>{filteredProducts.length}</span>
            <small>PRODUCTS</small>
          </div>
        </div>

        {/* Reusable Filter Panel */}
          <FilterPanel
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            sort={sort}
            setSort={setSort}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            clearFilters={clearFilters}
          />

        {/* Results Information */}
        <div className="shop-results-row">
          <div>
            <span className="shop-results-label">SHOWING</span>
            <strong>{filteredProducts.length}</strong>
            <span>of {products.length} products</span>
          </div>

          <span className="shop-results-line" />
          <span className="shop-results-collection">
            CEYLON STYLE COLLECTION
          </span>
        </div>

        {/* Product Grid */}
        <div className="row g-4 premium-shop-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="col-12 col-sm-6 col-lg-3"
                key={product.id}
              >
                <ProductCard
                  product={product}
                  onAdd={onAdd}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="shop-no-results">
                <span>⌕</span>
                <h3>No Products Found</h3>
                <p>
                  We couldn't find products matching your filters.
                  Try changing your search or filter options.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Collection Footer */}
        <div className="shop-collection-footer">
          <span>♛ CEYLON STYLE</span>
          <p>Wear Your Style. Feel The Difference.</p>
        </div>

      </section>
    </div>
  );
}

export default ShopPage;
