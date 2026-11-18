
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="premium-footer">

      <div className="container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>♛</span> CEYLON STYLE
            </Link>

            <p className="footer-tagline">
              WEAR YOUR STYLE. FEEL THE DIFFERENCE.
            </p>

            <p className="footer-description">
              Discover premium fashion designed for your
              unique lifestyle. Quality, elegance and style
              in every collection.
            </p>

            <div className="footer-socials">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok">♪</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>QUICK LINKS</h4>
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Shopping */}
          <div className="footer-links">
            <h4>MY ACCOUNT</h4>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/admin/login">Admin Login</Link>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>CONTACT US</h4>

            <p>
              <span>⌖</span> Sri Lanka
            </p>

            <p>
              <span>✉</span> Customer Support
            </p>

            <p>
              <span>◷</span> Available Online
            </p>

            <Link to="/contact" className="footer-contact-btn">
              GET IN TOUCH ↗
            </Link>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">

          <p>
            © 2026 <span>CEYLON STYLE</span>.
            ALL RIGHTS RESERVED.
          </p>

          <p className="footer-bottom-tagline">
            CRAFTED WITH STYLE ♛
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
