
function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="premium-cart-item">

      <div className="premium-cart-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="premium-cart-details">
        <span className="cart-product-category">
          {item.category || "CEYLON STYLE"}
        </span>

        <h3>{item.title}</h3>

        <p className="cart-product-price">
          Rs. {Number(item.price).toLocaleString("en-LK")}
        </p>

        <button
          type="button"
          className="cart-remove-button"
          onClick={() => removeFromCart(item.id)}
        >
          REMOVE ITEM
        </button>
      </div>

      <div className="premium-cart-actions">
        <span className="cart-action-label">QUANTITY</span>

        <div className="premium-quantity-control">
          <button
            type="button"
            aria-label={`Decrease ${item.title} quantity`}
            disabled={item.quantity <= 1}
            onClick={() => updateQuantity(item.id, -1)}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            aria-label={`Increase ${item.title} quantity`}
            disabled={item.quantity >= item.stock}
            onClick={() => updateQuantity(item.id, 1)}
          >
            +
          </button>
        </div>

        <span className="cart-line-total">
          Rs. {(item.price * item.quantity).toLocaleString("en-LK")}
        </span>
      </div>

    </div>
  );
}

export default CartItem;
