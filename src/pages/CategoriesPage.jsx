
import { categories, products } from "../constants/data";
import CategoryCard from "../components/CategoryCard";

function CategoriesPage() {
  return (
    <main className="premium-categories-page">

      <section className="categories-hero">
        <span>CEYLON STYLE / OUR COLLECTION</span>
        <h1>Explore Our <strong>Categories</strong></h1>
        <p>
          Discover your style with our premium fashion collections.
        </p>
      </section>

      <section className="categories-container">

        <div className="categories-heading">
          <span>CURATED FOR YOU</span>
          <h2>Shop By Category</h2>
          <p>Find the perfect style for every occasion.</p>
        </div>

        <div className="premium-category-grid">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );

            return (
              <CategoryCard
                key={category.id}
                category={category}
                image={categoryProducts[0]?.image}
                productCount={categoryProducts.length}
              />
            );
          })}
        </div>

      </section>
    </main>
  );
}

export default CategoriesPage;
