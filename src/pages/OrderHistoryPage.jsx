
import { useState, useEffect } from "react";
import { Link } from "react-router";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = JSON.parse(
          localStorage.getItem("ceylonOrders") || "[]"
        );
        setOrders(
          Array.isArray(savedOrders)
            ? [...savedOrders].reverse()
            : []
        );
      } catch {
        setOrders([]);
      }
    };

    loadOrders();

    window.addEventListener("storage", loadOrders);
    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-LK");

  const getStatusClass = (status) => {
    const value = (status || "Processing").toLowerCase();

    if (value === "delivered") return "history-status-delivered";
    if (value === "shipped") return "history-status-shipped";
    if (value === "cancelled") return "history-status-cancelled";

    return "history-status-processing";
  };

  return (
    <main className="premium-history-page">

      <section className="history-hero">
        <div className="history-hero-content">
          <span className="history-eyebrow">CEYLON STYLE / MY ACCOUNT</span>
          <h1>My <span>Orders</span></h1>
          <p>Track your purchases and explore your shopping journey.</p>
        </div>
      </section>

      <section className="history-container">

        <div className="history-heading">
          <div>
            <span className="history-label">YOUR PURCHASES</span>
            <h2>Order History</h2>
            <p>View and manage all your previous orders.</p>
          </div>

          <div className="history-count">
            <strong>{orders.length}</strong>
            <span>Total Orders</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="history-empty">
            <div className="history-empty-icon">♛</div>
            <h3>No Orders Yet</h3>
            <p>Your placed orders will appear here.</p>
            <Link to="/shop" className="history-shop-button">
              EXPLORE COLLECTION →
            </Link>
          </div>
        ) : (
          <div className="history-order-list">

            {orders.map((order) => (
              <article className="history-order-card" key={order.id}>

                <div className="history-order-top">
                  <div>
                    <span className="history-label">ORDER NUMBER</span>
                    <h3>#{order.id}</h3>
                    <p>{order.date}</p>
                  </div>

                  <span className={`history-status ${getStatusClass(order.status)}`}>
                    {order.status || "Processing"}
                  </span>
                </div>

                <div className="history-products">
                  {(order.items || []).map((item, index) => (
                    <div className="history-product" key={`${item.id}-${index}`}>
                      <div className="history-product-image">
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      <div className="history-product-info">
                        <h4>{item.title}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>

                      <strong>
                        Rs. {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="history-order-bottom">
                  <div>
                    <span>Payment Method</span>
                    <strong>{order.paymentMethod || "Not specified"}</strong>
                  </div>

                  <div className="history-order-total">
                    <span>Order Total</span>
                    <strong>Rs. {formatPrice(order.total)}</strong>
                  </div>
                </div>

                <button
                  className="history-details-button"
                  onClick={() => setSelectedOrder(order)}
                >
                  VIEW ORDER DETAILS →
                </button>

              </article>
            ))}

          </div>
        )}
      </section>

      {selectedOrder && (
        <div
          className="history-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history-modal-header">
              <div>
                <span className="history-label">CEYLON STYLE</span>
                <h3>Order Details</h3>
              </div>

              <button
                className="history-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="history-modal-body">

              <div className="history-modal-info">
                <p><span>Order ID</span><strong>#{selectedOrder.id}</strong></p>
                <p><span>Date</span><strong>{selectedOrder.date}</strong></p>
                <p>
                  <span>Status</span>
                  <strong>{selectedOrder.status || "Processing"}</strong>
                </p>
                <p>
                  <span>Payment</span>
                  <strong>{selectedOrder.paymentMethod}</strong>
                </p>
              </div>

              <h4>Customer Information</h4>

              <div className="history-customer-info">
                <p><strong>Name:</strong> {selectedOrder.customer?.fullName || "-"}</p>
                <p><strong>Email:</strong> {selectedOrder.customer?.email || "-"}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer?.phone || "-"}</p>
                <p><strong>Address:</strong> {selectedOrder.customer?.address || "-"}</p>
                <p><strong>City:</strong> {selectedOrder.customer?.city || "-"}</p>
                <p><strong>Postcode:</strong> {selectedOrder.customer?.postcode || "-"}</p>
              </div>

              <h4>Products</h4>

              {(selectedOrder.items || []).map((item, index) => (
                <div className="history-modal-product" key={`${item.id}-${index}`}>
                  <span>{item.title} × {item.quantity}</span>
                  <strong>Rs. {formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}

              <div className="history-modal-total">
                <span>Grand Total</span>
                <strong>Rs. {formatPrice(selectedOrder.total)}</strong>
              </div>

            </div>

            <div className="history-modal-footer">
              <button onClick={() => setSelectedOrder(null)}>
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

export default OrderHistoryPage;
