import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

// ── Free mock API (no backend needed) ────────────────────────────────────────
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Submit — API call using fetch ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // ── Validation ──────────────────────────────────────────────────────────
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      // ── FETCH API CALL (GET) — fetch all users from API ───────────────────
      const response = await fetch(API_URL, {
        method: 'GET',                           // GET request
        headers: {
          'Content-Type': 'application/json',   // expecting JSON response
        },
      });

      // ── Check if API responded successfully ───────────────────────────────
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // ── Parse JSON response from API ──────────────────────────────────────
      const users = await response.json();

      // ── Match entered email against API users ─────────────────────────────
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === form.email.toLowerCase()
      );

      if (!matchedUser) {
        setError('No account found with this email. Please sign up first.');
        setLoading(false);
        return;
      }

      // ── Login success — save session to localStorage ───────────────────────
      const sessionUser = {
        id:    matchedUser.id,
        name:  matchedUser.name,
        email: matchedUser.email.toLowerCase(),
      };
      localStorage.setItem('glowcart_active_user', JSON.stringify(sessionUser));

      setSuccess(`Welcome back, ${matchedUser.name}! Redirecting…`);

      // ── Redirect to home after short delay ────────────────────────────────
      setTimeout(() => navigate('/'), 1200);

    } catch (err) {
      // ── Handle network or API errors ──────────────────────────────────────
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── Left panel ── */}
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo">✦ GlowCart</span>
          <h2>Welcome back, gorgeous!</h2>
          <p>Your beauty essentials are waiting for you.</p>
          <div className="auth-features">
            <div className="auth-feat"><i className="fas fa-gift"></i><span>Exclusive member deals</span></div>
            <div className="auth-feat"><i className="fas fa-history"></i><span>Track your orders</span></div>
            <div className="auth-feat"><i className="fas fa-heart"></i><span>Saved wishlist</span></div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop"
          alt="Beauty"
          className="auth-side-img"
        />
      </div>

      {/* ── Right panel ── */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <Link to="/" className="auth-back">
            <i className="fas fa-arrow-left me-2"></i>Back to Home
          </Link>
          <div className="auth-logo-sm">✦ GlowCart</div>
          <h3 className="auth-title">Sign In</h3>
          <p className="auth-subtitle">
            New here? <Link to="/signup">Create an account</Link>
          </p>

          {/* Error message */}
          {error && (
            <div className="alert-error">
              <i className="fas fa-exclamation-circle me-2"></i>{error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="alert-success">
              <i className="fas fa-check-circle me-2"></i>{success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group-auth">
              <label>Email Address</label>
              <div className="input-icon-wrap">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group-auth">
              <div className="label-row">
                <label>Password</label>
                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
              </div>
              <div className="input-icon-wrap">
                <i className="fas fa-lock input-icon"></i>
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="auth-input"
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-glow w-100 auth-submit" disabled={loading}>
              {loading
                ? <><i className="fas fa-spinner fa-spin me-2"></i>Signing in…</>
                : 'Sign In'}
            </button>
          </form>

          <div className="divider-auth"><span>or continue with</span></div>
          <div className="social-auth">
            <button className="social-btn"><i className="fab fa-google"></i> Google</button>
            <button className="social-btn"><i className="fab fa-facebook-f"></i> Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
}
