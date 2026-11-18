
import { Link, NavLink } from "react-router";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark premium-navbar sticky-top">
      <div className="container">

        {/* Brand Logo */}
        <Link className="navbar-brand premium-brand" to="/">
          <span className="brand-crown">♛</span>
          <span className="brand-name">CEYLON STYLE</span>
          <span className="brand-tagline">PREMIUM FASHION</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto premium-nav-links">

            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/categories" className="nav-link">
                Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/shop" className="nav-link">
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>

          </ul>

          {/* Cart */}
          <div className="premium-nav-actions">
            <Link to="/cart" className="premium-cart">
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
