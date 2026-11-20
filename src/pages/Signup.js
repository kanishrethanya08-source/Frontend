import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

// ── Free mock API (no backend needed) ────────────────────────────────────────
const API_URL = 'https://mern-backend-v3wp.onrender.com/';

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm]         = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Password strength ─────────────────────────────────────────────────────
  const strength = (p) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)          s++;
    if (/[A-Z]/.test(p))        s++;
    if (/[0-9]/.test(p))        s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const pw            = strength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][pw];
  const strengthColor = ['', '#e74c3c', '#f39c12', '#3498db', '#2d8b5a'][pw];

  // ── Submit — API call using fetch ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // ── Validation ──────────────────────────────────────────────────────────
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      // ── FETCH API CALL (POST) ──────────────────────────────────────────────
      const response = await fetch({API_URL}, {
        method: 'POST',                          // POST request
        headers: {
          'Content-Type': 'application/json',   // sending JSON data
        },
        body: JSON.stringify({                   // data sent to the API
          name:      form.name,
          email:     form.email,
          password:  form.password,
          username:  form.email.split('@')[0],
          createdAt: new Date().toISOString(),
        }),
      });

      // ── Check if API responded successfully ───────────────────────────────
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // ── Parse the JSON response from API ──────────────────────────────────
      const data = await response.json();

      // ── API returned the created user — save session to localStorage ──────
      const sessionUser = {
        id:        data.id,
        name:      form.name,
        email:     form.email.toLowerCase(),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('glowcart_active_user', JSON.stringify(sessionUser));

      setSuccess('Account created successfully! Redirecting…');

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
          <h2>Join the glow family!</h2>
          <p>Get access to exclusive deals, early drops, and beauty tips.</p>
          <div className="auth-features">
            <div className="auth-feat"><i className="fas fa-tag"></i><span>Members-only discounts</span></div>
            <div className="auth-feat"><i className="fas fa-truck"></i><span>Free delivery on ₹999+</span></div>
            <div className="auth-feat"><i className="fas fa-star"></i><span>Earn reward points</span></div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600&h=800&fit=crop"
          alt="Cosmetics"
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
          <h3 className="auth-title">Create Account</h3>
          <p className="auth-subtitle">
            Already have an account? <Link to="/login">Sign in</Link>
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
            {/* Full Name */}
            <div className="form-group-auth">
              <label>Full Name*</label>
              <div className="input-icon-wrap">
                <i className="fas fa-user input-icon"></i>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Priya Sharma"
                  className="auth-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group-auth">
              <label>Email Address*</label>
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
              <label>Password*</label>
              <div className="input-icon-wrap">
                <i className="fas fa-lock input-icon"></i>
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="auth-input"
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {form.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{ background: i <= pw ? strengthColor : '#e8c8dc' }}
                      />
                    ))}
                  </div>
                  <span style={{ color: strengthColor, fontSize: '0.75rem', fontWeight: 600 }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group-auth">
              <label>Confirm Password*</label>
              <div className="input-icon-wrap">
                <i className="fas fa-lock input-icon"></i>
                <input
                  name="confirm"
                  type={showPass ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="auth-input"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="form-group-auth terms-check">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms & Conditions</Link> and{' '}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn btn-glow w-100 auth-submit" disabled={loading}>
              {loading
                ? <><i className="fas fa-spinner fa-spin me-2"></i>Creating account…</>
                : 'Create Account'}
            </button>
          </form>

          <div className="divider-auth"><span>or sign up with</span></div>
          <div className="social-auth">
            <button className="social-btn"><i className="fab fa-google"></i> Google</button>
            <button className="social-btn"><i className="fab fa-facebook-f"></i> Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
}
