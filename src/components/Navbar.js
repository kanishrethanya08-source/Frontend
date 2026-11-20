import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const { cartCount }               = useCart();
  const { wishlistCount }           = useWishlist();
  const { currentUser, logout }     = useAuth();
  const location                    = useLocation();
  const navigate                    = useNavigate();
  const dropRef                     = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setDropOpen(false);
    navigate('/');
  };

  // First letter of name for avatar
  const avatar = currentUser?.name?.charAt(0).toUpperCase() || '';

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Glow<span className="logo-accent">Cart</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
          <li><Link to="/products" className={isActive('/products') ? 'active' : ''}>Products</Link></li>
          <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          <li>
            <Link to="/quiz" className={`nav-quiz-link ${isActive('/quiz') ? 'active' : ''}`}>
              ✨ Beauty Quiz
            </Link>
          </li>
        </ul>

        {/* Nav Actions */}
        <div className="nav-actions">
          <Link to="/products" className="nav-search" title="Search">
            <i className="fas fa-search"></i>
          </Link>

          {/* User — show avatar+dropdown if logged in, else link to login */}
          {currentUser ? (
            <div className="nav-user-dropdown" ref={dropRef}>
              <button
                className="nav-avatar-btn"
                onClick={() => setDropOpen(!dropOpen)}
                title={currentUser.name}
              >
                <span className="nav-avatar">{avatar}</span>
              </button>
              {dropOpen && (
                <div className="nav-dropdown-menu">
                  <div className="ndm-header">
                    <span className="ndm-avatar">{avatar}</span>
                    <div>
                      <p className="ndm-name">{currentUser.name}</p>
                      <p className="ndm-email">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="ndm-divider"></div>
                  <Link to="/wishlist" className="ndm-item">
                    <i className="fas fa-heart"></i> My Wishlist
                  </Link>
                  <Link to="/cart" className="ndm-item">
                    <i className="fas fa-shopping-bag"></i> My Cart
                  </Link>
                  <div className="ndm-divider"></div>
                  <button className="ndm-item ndm-logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-user" title="Sign In">
              <i className="fas fa-user"></i>
            </Link>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="nav-wishlist" title="Wishlist">
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-cart" title="Cart">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
