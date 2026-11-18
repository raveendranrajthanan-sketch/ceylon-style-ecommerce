
import { Link } from "react-router";
import { categories, products } from "../constants/data";
import ProductCard from "../components/ProductCard";

function HomePage({ onAdd }) {
  const featuredProducts = categories
  .map((category) =>
    products.find((product) => product.category === category.id)
  )
  .filter(Boolean);

  return (
    <div>
      
      {/* Premium Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-layout">

            {/* Left Side - Text */}
            <div className="hero-content">
              <p className="hero-subtitle">
                NEW COLLECTION 2026
              </p>

              <h1>
                Wear Your Style.
                <br />
                Feel The <span>Difference.</span>
              </h1>

              <p className="hero-description">
                Discover premium fashion designed
                for your unique lifestyle.
              </p>

              <Link to="/shop" className="btn hero-btn">
                SHOP NOW →
              </Link>
            </div>

            {/* Right Side - Fashion Model */}
            <div className="hero-image">
              <div className="hero-image-glow"></div>

              <img
                src="/images/hero-model.jpg"
                alt="Ceylon Style Fashion Model"
                className="hero-model-image"
              />

              <div className="hero-image-caption">
                <span>CEYLON STYLE</span>
                <p>PREMIUM FASHION 2026</p>
              </div>
            </div>

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
      
          {/* Premium Shop By Category */}
          <section className="category-section py-5">
            <div className="container">

              <div className="text-center mb-5 category-heading">
                <p className="section-label">EXPLORE STYLE</p>
                <h2>Shop By Category</h2>
                <p>Discover your style. Find your perfect collection.</p>
              </div>

              <div className="row g-4">

                {categories.map((category, index) => {
                  const categoryProduct = products.find(
                    (product) => product.category === category.id
                  );

                  const productCount = products.filter(
                    (product) => product.category === category.id
                  ).length;

                  return (
                    <div
                      className="col-12 col-sm-6 col-lg-3"
                      key={category.id}
                      style={{ "--card-index": index }}
                    >
                      <Link
                        to={`/shop?category=${category.id}`}
                        className="home-category-card"
                      >
                        <div className="home-category-image">
                          <img
                            src={categoryProduct?.image}
                            alt={category.name}
                            loading="lazy"
                          />

                          <div className="home-category-overlay"></div>

                          <span className="home-category-count">
                            {String(productCount).padStart(2, "0")} PRODUCTS
                          </span>

                          <div className="home-category-explore">
                            EXPLORE COLLECTION <span>↗</span>
                          </div>
                        </div>

                        <div className="home-category-content">
                          <div>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                          </div>

                          <span className="home-category-arrow">↗</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}

              </div>
            </div>
          </section>


      {/* Benefits */}
      <section className="container py-5 home-benefits-section">

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
      {/* Premium Social Media Marquee */}
      <section className="social-marquee">

        <div className="social-marquee-heading">
          <span>STAY CONNECTED</span>
          <h3>FOLLOW OUR STYLE</h3>
        </div>

        <div className="social-marquee-track">

          {[1, 2].map((group) => (
            <div
              className="social-marquee-group"
              key={group}
              aria-hidden={group === 2}
            >
              <div className="social-item">
                <span className="social-logo">f</span>
                <span>FACEBOOK</span>
              </div>

              <div className="social-item">
                <span className="social-logo">◎</span>
                <span>INSTAGRAM</span>
              </div>

              <div className="social-item">
                <span className="social-logo">♪</span>
                <span>TIKTOK</span>
              </div>

              <div className="social-item">
                <span className="social-logo">▶</span>
                <span>YOUTUBE</span>
              </div>

              <div className="social-item">
                <span className="social-logo">P</span>
                <span>PINTEREST</span>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}

export default HomePage;
