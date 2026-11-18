
function ProductCard({ product, onAdd }) {
  const categoryNames = {
    men: "MEN'S FASHION",
    women: "WOMEN'S FASHION",
    footwear: "FOOTWEAR",
    accessories: "ACCESSORIES",
  };

  return (
    <div className="card product-card premium-product-card h-100">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />

        {product.stock === 0 && (
          <span className="stock-badge">
            OUT OF STOCK
          </span>
        )}

        {product.stock > 0 && product.stock <= 5 && (
          <span className="stock-badge limited-stock">
            LIMITED STOCK
          </span>
        )}

        <div className="product-overlay">
          <button
            className="quick-add-btn"
            disabled={product.stock === 0}
            onClick={() => onAdd?.(product)}
          >
            {product.stock === 0 ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <p className="product-category">
          {categoryNames[product.category] || product.category}
        </p>

        <h5 className="card-title">
          {product.title}
        </h5>

        <div className="product-rating">
          <span className="rating-stars">★★★★★</span>
          <span className="rating-number">
            {Number(product.rating).toFixed(1)}
          </span>
        </div>

        <div className="product-price">
          Rs. {Number(product.price).toLocaleString("en-LK")}
        </div>

        <button
          className="btn premium-add-btn mt-auto"
          disabled={product.stock === 0}
          onClick={() => onAdd?.(product)}
        >
          {product.stock === 0
            ? "Out of Stock"
            : "ADD TO CART →"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
