
import { useState } from "react";
import { Link } from "react-router";
import { products as initialProducts } from "../constants/data";

function AdminProductsPage() {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("ceylonProducts");
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    image: ""
  });

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("ceylonProducts", JSON.stringify(updatedProducts));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      price: "",
      stock: "",
      image: ""
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image.trim()
    };

    if (
      !productData.title ||
      !productData.category ||
      !Number.isFinite(productData.price) ||
      !Number.isInteger(productData.stock) ||
      productData.price <= 0 ||
      productData.stock < 0
    ) {
      alert("Please enter valid product details.");
      return;
    }

    if (productData.image) {
      try {
        const imageUrl = new URL(productData.image);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          alert("Please enter a valid HTTP or HTTPS image URL.");
          return;
        }
      } catch {
        alert("Please enter a valid image URL.");
        return;
      }
    }

    if (editingId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editingId
          ? { ...product, ...productData }
          : product
      );

      saveProducts(updatedProducts);
      alert("Product updated successfully!");
    } else {
      const newProduct = {
        id: Date.now(),
        ...productData,
        rating: 0
      };

      saveProducts([...products, newProduct]);
      alert("Product added successfully!");
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      title: product.title,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(
        (product) => product.id !== id
      );

      saveProducts(updatedProducts);
      alert("Product deleted successfully!");
    }
  };

  const lowStockCount = products.filter(
    (product) => Number(product.stock) < 5
  ).length;

  const categoryNames = {
    men: "Men's Fashion",
    women: "Women's Fashion",
    footwear: "Footwear",
    accessories: "Accessories"
  };

  return (
    <div className="admin-products-page">
      <div className="admin-products-container">

        {/* Header */}
        <div className="admin-products-header">
          <div>
            <span className="admin-eyebrow">CEYLON STYLE / ADMIN</span>
            <h1>Product Management</h1>
            <p>Manage your fashion collection and inventory.</p>
          </div>

          <Link to="/admin" className="admin-products-back">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Statistics */}
        <div className="admin-product-stats">
          <div className="admin-product-stat">
            <span>Total Products</span>
            <h2>{products.length}</h2>
            <p>Products in your store</p>
          </div>

          <div className="admin-product-stat">
            <span>Available Stock</span>
            <h2>
              {products.reduce(
                (total, product) => total + Number(product.stock || 0),
                0
              )}
            </h2>
            <p>Total inventory quantity</p>
          </div>

          <div className="admin-product-stat">
            <span>Low Stock Products</span>
            <h2>{lowStockCount}</h2>
            <p>Products with fewer than 5 items</p>
          </div>
        </div>

        {/* Add / Edit Form */}
        <div className="admin-product-form-card">
          <div className="admin-product-card-heading">
            <div>
              <span className="admin-eyebrow">
                PRODUCT INVENTORY
              </span>
              <h2>
                {editingId !== null ? "Edit Product" : "Add New Product"}
              </h2>
            </div>

            <span className="admin-product-heading-icon">＋</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-product-form-grid">

              <div className="admin-product-field">
                <label htmlFor="product-title">Product Name</label>
                <input
                  id="product-title"
                  type="text"
                  name="title"
                  placeholder="Enter product name"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-product-field">
                <label htmlFor="product-category">Category</label>
                <select
                  id="product-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="men">Men's Fashion</option>
                  <option value="women">Women's Fashion</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="admin-product-field">
                <label htmlFor="product-price">Price (Rs.)</label>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  min="1"
                  step="0.01"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-product-field">
                <label htmlFor="product-stock">Stock Quantity</label>
                <input
                  id="product-stock"
                  type="number"
                  name="stock"
                  min="0"
                  step="1"
                  placeholder="Enter stock quantity"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-product-field admin-product-image-field">
                <label htmlFor="product-image">Product Image URL</label>
                <input
                  id="product-image"
                  type="url"
                  name="image"
                  placeholder="Paste product image URL here"
                  value={form.image}
                  onChange={handleChange}
                />
                <small>Use a direct JPG, PNG or WebP image link.</small>
              </div>

              {form.image && (
                <div className="admin-product-preview">
                  <span>IMAGE PREVIEW</span>
                  <img
                    src={form.image}
                    alt="Product preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}

            </div>

            <div className="admin-product-form-actions">
              <button type="submit" className="admin-product-submit">
                {editingId !== null ? "Update Product" : "＋ Add Product"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="admin-product-cancel"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products Table */}
        <div className="admin-products-table-card">
          <div className="admin-product-card-heading">
            <div>
              <span className="admin-eyebrow">YOUR COLLECTION</span>
              <h2>All Products</h2>
            </div>

            <span className="admin-product-count">
              {products.length} Products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="admin-products-empty">
              <span>▤</span>
              <h3>No Products Available</h3>
              <p>Add your first product using the form above.</p>
            </div>
          ) : (
            <div className="admin-products-table-wrapper">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>IMAGE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.title}</strong>
                      </td>

                      <td>
                        {categoryNames[product.category] || product.category}
                      </td>

                      <td className="admin-product-price">
                        Rs. {Number(product.price).toLocaleString("en-LK")}
                      </td>

                      <td>
                        <span className={`admin-stock-badge ${
                          Number(product.stock) < 5 ? "low-stock" : "in-stock"
                        }`}>
                          {product.stock} Units
                        </span>
                      </td>

                      <td>
                        {product.image ? (
                          <span className="admin-image-available">
                            ✓ Available
                          </span>
                        ) : (
                          <span className="admin-image-missing">
                            No Image
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="admin-product-actions">
                          <button
                            type="button"
                            className="admin-product-edit"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="admin-product-delete"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="admin-products-footer">
          <span>♛ CEYLON STYLE</span>
          <p>Premium Fashion Store Administration</p>
        </div>

      </div>
    </div>
  );
}

export default AdminProductsPage;
