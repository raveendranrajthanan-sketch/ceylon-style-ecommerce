
import { Link } from "react-router";
import { categories, products } from "../constants/data";
import ProductCard from "../components/ProductCard";

function HomePage({ onAdd }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">

            <p className="hero-subtitle">
              NEW COLLECTION 2026
            </p>

            <h1>
              Wear Your Style.
              <br />
              Feel The <span>Difference.</span>
            </h1>

            <p>
              Discover premium fashion designed
              for your unique lifestyle.
            </p>

            <Link to="/shop" className="btn hero-btn">
              SHOP NOW →
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-5">

        <div className="text-center mb-5">
          <p className="section-label">
            OUR COLLECTION
          </p>

          <h2>Featured Products</h2>

          <p>
            Discover our latest fashion collection.
          </p>
        </div>

        <div className="row g-4">

          {featuredProducts.map((product) => (
            <div
              className="col-12 col-sm-6 col-lg-3"
              key={product.id}
            >
              <ProductCard 
                product={product}
                onAdd={onAdd}
              />
            </div>
          ))}

        </div>
      </section>

      {/* Categories */}
      <section className="category-section py-5">

        <div className="container">

          <div className="text-center mb-5">
            <p className="section-label">
              EXPLORE STYLE
            </p>

            <h2>Shop By Category</h2>
          </div>

          <div className="row g-4">

            {categories.map((category) => (
              <div
                className="col-12 col-sm-6 col-lg-3"
                key={category.id}
              >
                <Link
                  to={`/shop?category=${category.id}`}
                  className="category-card"
                >
                  <h4>{category.name}</h4>

                  <p>{category.description}</p>

                  <span>
                    Explore Collection →
                  </span>

                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-5">

        <div className="text-center mb-5">
          <h2>Why Choose Ceylon Style?</h2>
        </div>

        <div className="row text-center g-4">

          <div className="col-12 col-md-4">
            <h4>🚚 Fast Delivery</h4>
            <p>
              Reliable delivery across Sri Lanka.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h4>⭐ Premium Quality</h4>
            <p>
              Quality fashion for everyday life.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h4>💬 Customer Support</h4>
            <p>
              We are always here to help you.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default HomePage;
