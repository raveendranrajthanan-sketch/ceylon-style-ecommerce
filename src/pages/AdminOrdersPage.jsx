
import { useState, useEffect } from "react";
import { Link } from "react-router";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = JSON.parse(
          localStorage.getItem("ceylonOrders") || "[]"
        );
        setOrders(Array.isArray(savedOrders) ? savedOrders : []);
      } catch {
        setOrders([]);
      }
    };

    loadOrders();
    window.addEventListener("storage", loadOrders);

    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("ceylonOrders", JSON.stringify(updatedOrders));
  };

  const processingCount = orders.filter(
    (order) => (order.status || "Processing") === "Processing"
  ).length;

  const shippedCount = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledCount = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const filteredOrders = [...orders]
    .reverse()
    .filter((order) => {
      const customer = order.customer?.fullName || "Customer";
      const matchesSearch =
        String(order.id).toLowerCase().includes(search.toLowerCase()) ||
        customer.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (order.status || "Processing") === statusFilter;

      return matchesSearch && matchesStatus;
    });

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-LK");

  return (
    <main className="premium-admin-orders">

      <section className="admin-orders-hero">
        <div className="admin-orders-hero-content">
          <div>
            <span className="admin-eyebrow">
              CEYLON STYLE / ADMINISTRATION
            </span>
            <h1>Order <span>Management</span></h1>
            <p>Manage customer purchases and monitor delivery progress.</p>
          </div>

          <Link to="/admin" className="admin-orders-back">
            ← Dashboard
          </Link>
        </div>
      </section>

      <div className="admin-orders-container">

        <div className="admin-orders-welcome">
          <div>
            <span className="admin-eyebrow">OVERVIEW</span>
            <h2>Orders Dashboard</h2>
            <p>Track and manage all customer orders in one place.</p>
          </div>
          <div className="admin-orders-total-badge">
            <strong>{orders.length}</strong>
            <span>Total Orders</span>
          </div>
        </div>

        <div className="admin-order-stats">

          <div className="admin-order-stat">
            <span className="admin-stat-icon">▤</span>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
            <small>All customer orders</small>
          </div>

          <div className="admin-order-stat">
            <span className="admin-stat-icon">◷</span>
            <p>Processing</p>
            <h2>{processingCount}</h2>
            <small>Awaiting dispatch</small>
          </div>

          <div className="admin-order-stat">
            <span className="admin-stat-icon">➜</span>
            <p>Shipped</p>
            <h2>{shippedCount}</h2>
            <small>On the way</small>
          </div>

          <div className="admin-order-stat">
            <span className="admin-stat-icon">✓</span>
            <p>Delivered</p>
            <h2>{deliveredCount}</h2>
            <small>Successfully delivered</small>
          </div>

          <div className="admin-order-stat">
            <span className="admin-stat-icon">×</span>
            <p>Cancelled</p>
            <h2>{cancelledCount}</h2>
            <small>Cancelled orders</small>
          </div>

        </div>

        <section className="admin-orders-table-card">

          <div className="admin-orders-table-heading">
            <div>
              <span className="admin-eyebrow">CUSTOMER ACTIVITY</span>
              <h2>All Orders</h2>
              <p>Search orders and update their delivery status.</p>
            </div>

            <span className="admin-order-count">
              {filteredOrders.length} Results
            </span>
          </div>

          <div className="admin-orders-toolbar">

            <div className="admin-orders-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search order ID or customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="admin-orders-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>

          {filteredOrders.length === 0 ? (
            <div className="admin-orders-empty">
              <span>▤</span>
              <h3>No Orders Found</h3>
              <p>Try changing your search or status filter.</p>
            </div>
          ) : (
            <div className="admin-orders-table-wrapper">
              <table className="admin-orders-table">

                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAYMENT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>

                      <td className="admin-orders-id">
                        #{order.id}
                      </td>

                      <td>
                        <strong>
                          {order.customer?.fullName || "Customer"}
                        </strong>
                      </td>

                      <td>{order.date || "—"}</td>

                      <td className="admin-orders-total">
                        Rs. {formatPrice(order.total)}
                      </td>

                      <td>{order.paymentMethod || "—"}</td>

                      <td>
                        <select
                          className={`admin-order-status-select ${
                            (order.status || "Processing").toLowerCase()
                          }`}
                          value={order.status || "Processing"}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

        <footer className="admin-orders-footer">
          <span>♛ CEYLON STYLE</span>
          <p>Premium Fashion Store Administration</p>
        </footer>

      </div>
    </main>
  );
}

export default AdminOrdersPage;
