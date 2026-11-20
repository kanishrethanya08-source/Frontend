import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-5">
            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <div className="footer-logo">
                  <span className="logo-icon">✦</span>
                  <span className="logo-text">Glow<span className="logo-accent">Cart</span></span>
                </div>
                <p className="footer-desc">
                  Your ultimate destination for premium beauty & cosmetics. Discover curated collections
                  that make you feel radiant, confident, and utterly gorgeous.
                </p>
                <div className="social-links">
                  <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#!" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href="#!" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-lg-2 col-md-6">
              <h6 className="footer-heading">Help & Info</h6>
              <ul className="footer-links">
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/faq">Returns Policy</Link></li>
                <li><Link to="/faq">Shipping Info</Link></li>
                <li><Link to="/contact">Support</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-4 col-md-6">
              <h6 className="footer-heading">Stay Glowing</h6>
              <p className="footer-newsletter-text">
                Subscribe for exclusive deals, beauty tips, and new arrivals.
              </p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button className="newsletter-btn">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className="footer-badges">
                <div className="footer-badge"><i className="fas fa-shield-alt"></i> Secure Payment</div>
                <div className="footer-badge"><i className="fas fa-truck"></i> Free Delivery ₹999+</div>
                <div className="footer-badge"><i className="fas fa-undo"></i> Easy Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <p className="mb-0 footer-copy">
              © 2025 GlowCart. Made with <span className="heart">♥</span> for beauty lovers.
            </p>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-stripe"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
