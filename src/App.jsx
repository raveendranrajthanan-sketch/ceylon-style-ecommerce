
import { Routes, Route, Navigate } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactPage from "./pages/ContactPage";

import useCart from "./hooks/useCart";

function App() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
  } = useCart();

  return (
    <>
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage onAdd={addToCart} />}
          />

          <Route
            path="/categories"
            element={<CategoriesPage />}
          />

          <Route
            path="/shop"
            element={<ShopPage onAdd={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/orders"
            element={<OrderHistoryPage />}
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                clearCart={clearCart}
              />
            }
          />

          <Route
            path="/admin"
            element={
              localStorage.getItem("adminLoggedIn") === "true"
                ? <AdminDashboard />
                : <Navigate to="/admin/login" replace />
            }
          />

          <Route
            path="/admin/products"
            element={
              localStorage.getItem("adminLoggedIn") === "true"
                ? <AdminProductsPage />
                : <Navigate to="/admin/login" replace />
            }
          />

          <Route
            path="/admin/orders"
            element={
              localStorage.getItem("adminLoggedIn") === "true"
                ? <AdminOrdersPage />
                : <Navigate to="/admin/login" replace />
            }
          />

          <Route
            path="/admin/login"
            element={<AdminLoginPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
