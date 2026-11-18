
import { Link } from "react-router";

function CategoryCard({ category, image, productCount }) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="premium-category-card"
    >
      <div className="category-image-wrapper">
        <img
          src={image}
          alt={category.name}
        />

        <span className="category-product-count">
          {productCount} PRODUCTS
        </span>

        <div className="category-image-overlay">
          <span>EXPLORE COLLECTION →</span>
        </div>
      </div>

      <div className="category-card-content">
        <div>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>

        <span className="category-arrow">↗</span>
      </div>
    </Link>
  );
}

export default CategoryCard;
