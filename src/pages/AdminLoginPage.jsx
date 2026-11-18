
import { useState } from "react";
import { Link } from "react-router";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "12345") {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin";
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="premium-login-page">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />

      <div className="premium-login-card">

        <div className="login-brand">
          <span className="login-crown">♛</span>
          <h1>CEYLON STYLE</h1>
          <span className="login-brand-tagline">
            PREMIUM FASHION
          </span>
        </div>

        <div className="login-divider">
          <span />
          <span>ADMIN ACCESS</span>
          <span />
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>
          <p>Sign in to manage your fashion store.</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="premium-login-field">
            <label htmlFor="admin-username">USERNAME</label>
            <input
              id="admin-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="premium-login-field">
            <label htmlFor="admin-password">PASSWORD</label>

            <div className="login-password-wrapper">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-show-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {error && (
            <div className="premium-login-error">
              {error}
            </div>
          )}

          <button type="submit" className="premium-login-button">
            SIGN IN <span>→</span>
          </button>

        </form>

        <div className="login-back-link">
          <Link to="/">← Back to Website</Link>
        </div>

        <div className="login-security-note">
          <span>♢</span>
          Authorized Administration Access Only
        </div>

      </div>
    </div>
  );
}

export default AdminLoginPage;
