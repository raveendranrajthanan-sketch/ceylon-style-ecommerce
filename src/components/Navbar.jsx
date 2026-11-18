
import { useState } from "react";
import { Link, NavLink } from "react-router";

function Navbar({ cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark premium-navbar sticky-top">
      <div className="container">

        {/* Brand Logo */}
        <Link
          className="navbar-brand premium-brand"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <span className="brand-crown">♛</span>
          <span className="brand-name">CEYLON STYLE</span>
          <span className="brand-tagline">PREMIUM FASHION</span>
        </Link>

        {/* Responsive Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-controls="mainNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="mainNavbar"
        >
          <ul className="navbar-nav mx-auto premium-nav-links">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/categories"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/shop"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </li>

          </ul>

          {/* Cart */}
          <div className="premium-nav-actions">
            <Link
              to="/cart"
              className="premium-cart"
              onClick={() => setIsOpen(false)}
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-label">Cart</span>
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
