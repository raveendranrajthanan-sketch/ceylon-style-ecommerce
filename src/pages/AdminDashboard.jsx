
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function AdminDashboard() {
  const [orders] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("ceylonOrders") || "[]"
      );
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + Number(order.total || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const recentOrders = [...orders].reverse().slice(0, 5);
  
  const revenueOrders = [...orders]
    .filter((order) => order.status !== "Cancelled")
    .reverse()
    .slice(-7);

  const maxRevenue = Math.max(
    ...revenueOrders.map((order) => Number(order.total || 0)),
    1
  );

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* Dashboard Header */}
        <div className="admin-dashboard-header">
          <div>
            <span className="admin-eyebrow">CEYLON STYLE / ADMIN</span>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Manage your premium fashion store.</p>
          </div>

          <div className="admin-header-actions">
            <Link to="/" className="admin-outline-btn">
              View Website ↗
            </Link>
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="admin-dashboard-nav">
          <Link to="/admin" className="admin-nav-active">
            Dashboard
          </Link>
          <Link to="/admin/orders">Manage Orders</Link>
          <Link to="/admin/products">Manage Products</Link>
        </div>

        {/* Statistics */}
        <div className="admin-stats-grid">

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total Orders</span>
              <span className="admin-stat-icon">▤</span>
            </div>
            <h2>{totalOrders}</h2>
            <p>All customer orders</p>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total Revenue</span>
              <span className="admin-stat-icon">Rs</span>
            </div>
            <h2>Rs. {totalRevenue.toLocaleString("en-LK")}</h2>
            <p>Excluding cancelled orders</p>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Pending Orders</span>
              <span className="admin-stat-icon">◷</span>
            </div>
            <h2>{pendingOrders}</h2>
            <p>Orders being processed</p>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Delivered Orders</span>
              <span className="admin-stat-icon">✓</span>
            </div>
            <h2>{deliveredOrders}</h2>
            <p>Successfully delivered</p>
          </div>

        </div>
        
        {/* Revenue Overview Chart */}
        <div className="admin-revenue-section">
          <div className="admin-section-heading">
            <div>
              <span className="admin-eyebrow">STORE PERFORMANCE</span>
              <h2>Revenue Overview</h2>
            </div>
            <span className="admin-chart-label">Last 7 Orders</span>
          </div>

          {revenueOrders.length === 0 ? (
            <p className="text-muted">No revenue data available yet.</p>
          ) : (
            <div className="admin-revenue-chart">
              {revenueOrders.map((order) => {
                const amount = Number(order.total || 0);
                const height = Math.max(
                  (amount / maxRevenue) * 100,
                  5
                );

                return (
                  <div className="admin-chart-column" key={order.id}>
                    <span className="admin-chart-amount">
                      {amount.toLocaleString("en-LK")}
                    </span>
                    <div className="admin-chart-bar-area">
                      <div
                        className="admin-chart-bar"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="admin-chart-order">
                      #{String(order.id).slice(-4)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="admin-recent-section">
          <div className="admin-section-heading">
            <div>
              <span className="admin-eyebrow">LATEST ACTIVITY</span>
              <h2>Recent Orders</h2>
            </div>

            <Link to="/admin/orders" className="admin-view-all">
              View All Orders →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="admin-empty-state">
              <span>▤</span>
              <h3>No Orders Yet</h3>
              <p>Customer orders will appear here.</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-premium-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>ORDER TOTAL</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="admin-order-id">
                        #{order.id}
                      </td>

                      <td>
                        {order.customer?.fullName || "Customer"}
                      </td>

                      <td className="admin-order-total">
                        Rs. {Number(order.total || 0).toLocaleString("en-LK")}
                      </td>

                      <td>
                        <span className={`admin-status-badge ${
                          (order.status || "Order Placed")
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                        }`}>
                          {order.status || "Order Placed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="admin-dashboard-footer">
          <span>♛ CEYLON STYLE</span>
          <p>Premium Fashion Store Administration</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
