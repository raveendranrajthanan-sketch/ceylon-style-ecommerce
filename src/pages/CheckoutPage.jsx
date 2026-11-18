
import { useState } from "react";
import { Link } from "react-router";
import { validateField } from "../utils/validators";

import FormField from "../components/FormField";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postcode: "",
  paymentMethod: "Cash on Delivery"
};

function CheckoutPage({ cartItems, clearCart }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 350 : 0;
  const grandTotal = subtotal + deliveryFee;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((previous) => ({
      ...previous,
      [name]: value
    }));

    if (name !== "paymentMethod") {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(values).forEach((field) => {
      if (field === "paymentMethod") return;

      newErrors[field] = validateField(field, values[field]);
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors || cartItems.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      total: grandTotal,
      paymentMethod: values.paymentMethod,
      status: "Processing",
      customer: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        postcode: values.postcode
      }
    };

    let existingOrders = [];

    try {
      existingOrders = JSON.parse(
        localStorage.getItem("ceylonOrders") || "[]"
      );
    } catch {
      existingOrders = [];
    }

    localStorage.setItem(
      "ceylonOrders",
      JSON.stringify([...existingOrders, newOrder])
    );

    setConfirmedTotal(grandTotal);
    setConfirmedOrderId(newOrder.id);

    clearCart();
    setOrderPlaced(true);
  };

  // Order Confirmation
  if (orderPlaced) {
    return (
      <div className="premium-checkout-page">
        <div className="checkout-confirmation">
          <div className="checkout-confirmation-icon">✓</div>

          <span className="checkout-eyebrow">
            CEYLON STYLE / ORDER CONFIRMED
          </span>

          <h1>Thank You for Your Order!</h1>

          <p>
            Your order has been successfully placed.
            Thank you for choosing Ceylon Style.
          </p>

          <div className="confirmation-order-number">
            <span>ORDER NUMBER</span>
            <strong>#{confirmedOrderId}</strong>
          </div>

          <div className="confirmation-total">
            <span>ORDER TOTAL</span>
            <strong>
              Rs. {confirmedTotal.toLocaleString("en-LK")}
            </strong>
          </div>

          <div className="confirmation-actions">
            <Link to="/orders" className="checkout-primary-button">
              VIEW ORDER HISTORY
            </Link>

            <Link to="/shop" className="checkout-secondary-button">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="premium-checkout-page">
        <div className="checkout-empty-state">
          <span>♧</span>
          <h2>Your Cart is Empty</h2>
          <p>Add some products before proceeding to checkout.</p>
          <Link to="/shop" className="checkout-primary-button">
            EXPLORE COLLECTION →
          </Link>
        </div>
      </div>
    );
  }

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
      autocomplete: "name"
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "example@gmail.com",
      type: "email",
      autocomplete: "email"
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "0771234567",
      type: "tel",
      autocomplete: "tel"
    },
    {
      name: "address",
      label: "Delivery Address",
      placeholder: "House number, street name",
      type: "text",
      autocomplete: "street-address"
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      type: "text",
      autocomplete: "address-level2"
    },
    {
      name: "postcode",
      label: "Postcode",
      placeholder: "Enter 5-digit postcode",
      type: "text",
      autocomplete: "postal-code"
    }
  ];

  return (
    <div className="premium-checkout-page">

      {/* Checkout Hero */}
      <section className="checkout-hero">
        <span className="checkout-eyebrow">
          CEYLON STYLE / SECURE CHECKOUT
        </span>

        <h1>Complete Your <span>Purchase.</span></h1>

        <p>One final step towards your perfect style.</p>

        <div className="checkout-progress">
          <span className="checkout-progress-active">01 CART</span>
          <span className="checkout-progress-line" />
          <span className="checkout-progress-current">02 CHECKOUT</span>
          <span className="checkout-progress-line" />
          <span>03 CONFIRMATION</span>
        </div>
      </section>

      <div className="premium-checkout-container">
        <div className="row g-4">

          {/* Customer Form */}
          <div className="col-lg-7">
            <div className="checkout-form-card">

              <div className="checkout-card-heading">
                <div>
                  <span className="checkout-eyebrow">
                    DELIVERY INFORMATION
                  </span>
                  <h2>Customer Details</h2>
                  <p>Enter your details to complete your order.</p>
                </div>

                <span className="checkout-heading-icon">01</span>
              </div>

              <form onSubmit={handleSubmit} noValidate>

                <div className="checkout-fields-grid">
                  {fields.map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={handleChange}
                      error={errors[field.name]}
                      autoComplete={field.autocomplete}
                      fullWidth={field.name === "address"}
                    />
                  ))}
                </div>

                {/* Payment */}
                <div className="checkout-payment-section">
                  <div className="checkout-card-heading">
                    <div>
                      <span className="checkout-eyebrow">
                        PAYMENT INFORMATION
                      </span>
                      <h2>Payment Method</h2>
                    </div>

                    <span className="checkout-heading-icon">02</span>
                  </div>

                  <label className="checkout-payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={values.paymentMethod === "Cash on Delivery"}
                      onChange={handleChange}
                    />

                    <span className="checkout-payment-symbol">₹</span>

                    <span className="checkout-payment-text">
                      <strong>Cash on Delivery</strong>
                      <small>Pay when your order arrives.</small>
                    </span>

                    <span className="checkout-payment-check">✓</span>
                  </label>

                  <label className="checkout-payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={values.paymentMethod === "Card"}
                      onChange={handleChange}
                    />

                    <span className="checkout-payment-symbol">▤</span>

                    <span className="checkout-payment-text">
                      <strong>Card Payment</strong>
                      <small>Demo only – no real payment processed.</small>
                    </span>

                    <span className="checkout-payment-check">✓</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="checkout-place-order-button"
                >
                  PLACE YOUR ORDER <span>→</span>
                </button>

                <p className="checkout-form-note">
                  ♢ Please check your details before placing your order.
                </p>

              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5">
            <div className="checkout-summary-card">

              <span className="checkout-eyebrow">
                YOUR SELECTION
              </span>

              <h2>Order Summary</h2>

              <div className="checkout-summary-items">
                {cartItems.map((item) => (
                  <div className="checkout-summary-product" key={item.id}>
                    <div className="checkout-summary-image">
                      <img src={item.image} alt={item.title} />
                      <span>{item.quantity}</span>
                    </div>

                    <div className="checkout-summary-product-info">
                      <strong>{item.title}</strong>
                      <small>
                        Qty: {item.quantity}
                      </small>
                    </div>

                    <strong className="checkout-summary-product-price">
                      Rs. {(item.price * item.quantity)
                        .toLocaleString("en-LK")}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-summary-row">
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>
                  Rs. {subtotal.toLocaleString("en-LK")}
                </strong>
              </div>

              <div className="checkout-summary-row">
                <span>Delivery Fee</span>
                <strong>
                  Rs. {deliveryFee.toLocaleString("en-LK")}
                </strong>
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-grand-total">
                <span>Grand Total</span>
                <strong>
                  Rs. {grandTotal.toLocaleString("en-LK")}
                </strong>
              </div>

              <div className="checkout-delivery-message">
                <span>♧</span>
                Delivery fee included in your total.
              </div>

              <Link to="/cart" className="checkout-back-cart">
                ← BACK TO SHOPPING CART
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
