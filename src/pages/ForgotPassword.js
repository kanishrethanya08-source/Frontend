import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo">✦ GlowCart</span>
          <h2>Forgot your password?</h2>
          <p>No worries! We'll help you reset it quickly so you can get back to glowing.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop" alt="Cosmetics" className="auth-side-img" />
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <Link to="/login" className="auth-back"><i className="fas fa-arrow-left me-2"></i>Back to Login</Link>
          <div className="auth-logo-sm">✦ GlowCart</div>

          {!sent ? (
            <>
              <div className="forgot-icon-wrap"><i className="fas fa-key forgot-key-icon"></i></div>
              <h3 className="auth-title">Reset Password</h3>
              <p className="auth-subtitle">Enter your email address and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group-auth">
                  <label>Email Address</label>
                  <div className="input-icon-wrap">
                    <i className="fas fa-envelope input-icon"></i>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="auth-input" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-glow w-100 auth-submit" disabled={loading}>
                  {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Sending…</> : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="success-sent">
              <div className="sent-icon">📧</div>
              <h3 className="auth-title">Check Your Inbox!</h3>
              <p>We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions.</p>
              <div className="resend-hint">
                Didn't receive it? <button className="resend-link" onClick={() => setSent(false)}>Resend</button>
              </div>
              <Link to="/login" className="btn btn-glow mt-4" style={{ display:'inline-block' }}>Back to Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
