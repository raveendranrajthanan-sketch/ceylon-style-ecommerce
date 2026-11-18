
import { Link } from "react-router";

import CartItem from "../components/CartItem";

function CartPage({ cartItems, updateQuantity, removeFromCart }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="premium-cart-page">

      {/* Cart Hero */}
      <section className="cart-hero">
        <span className="cart-eyebrow">CEYLON STYLE / YOUR BAG</span>
        <h1>Your Shopping <span>Bag.</span></h1>
        <p>Review your selection before making it yours.</p>
      </section>

      <div className="premium-cart-container">

        {cartItems.length === 0 ? (
          <div className="premium-empty-cart">
            <span className="empty-cart-icon">♧</span>
            <span className="cart-eyebrow">YOUR BAG IS WAITING</span>
            <h2>Your Cart is Empty</h2>
            <p>
              Discover timeless fashion and find something
              special for your collection.
            </p>
            <Link to="/shop" className="cart-primary-button">
              EXPLORE COLLECTION →
            </Link>
          </div>
        ) : (
          <div className="row g-4">

            {/* Cart Items */}
            <div className="col-lg-8">

              <div className="cart-items-heading">
                <div>
                  <span className="cart-eyebrow">YOUR SELECTION</span>
                  <h2>Shopping Items</h2>
                </div>
                <span className="cart-item-count">
                  {totalItems} ITEMS
                </span>
              </div>

              {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
              ))}

              <Link to="/shop" className="cart-back-shopping">
                ← CONTINUE SHOPPING
              </Link>

            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="premium-order-summary">

                <span className="cart-eyebrow">
                  YOUR PURCHASE
                </span>

                <h2>Order Summary</h2>

                <div className="cart-summary-divider" />

                <div className="cart-summary-row">
                  <span>Products</span>
                  <strong>{totalItems}</strong>
                </div>

                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <strong>
                    Rs. {totalPrice.toLocaleString("en-LK")}
                  </strong>
                </div>

                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span className="cart-delivery-note">
                    Calculated at checkout
                  </span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total">
                  <span>Total</span>
                  <strong>
                    Rs. {totalPrice.toLocaleString("en-LK")}
                  </strong>
                </div>

                <Link
                  to="/checkout"
                  className="cart-checkout-button"
                >
                  PROCEED TO CHECKOUT →
                </Link>

                <div className="cart-security-note">
                  <span>♢</span>
                  Secure Checkout Experience
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default CartPage;
