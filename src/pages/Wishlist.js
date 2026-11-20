import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [added, setAdded] = useState({});

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-wishlist">
          <div className="ew-icon">🤍</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favourite products here and come back to them anytime.</p>
          <Link to="/products" className="btn btn-glow btn-lg">Discover Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper wishlist-page">
      {/* Header */}
      <div className="page-header">
        <div className="container text-center">
          <h1 className="page-title">My Wishlist</h1>
          <p className="page-desc">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Top bar */}
        <div className="wl-topbar">
          <span className="wl-count">
            <i className="fas fa-heart me-2"></i>
            {wishlistItems.length} Saved Item{wishlistItems.length !== 1 ? 's' : ''}
          </span>
          <Link to="/products" className="wl-browse-link">
            <i className="fas fa-plus me-1"></i> Add More Products
          </Link>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {wishlistItems.map(product => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            return (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <div className="wl-card card-hover">
                  {/* Remove button */}
                  <button
                    className="wl-remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from wishlist"
                  >
                    <i className="fas fa-times"></i>
                  </button>

                  {/* Image */}
                  <div className="wl-img-wrap">
                    <img src={product.image} alt={product.name} className="wl-img" />
                    {product.badge && <span className="wl-badge">{product.badge}</span>}
                    <span className="wl-discount">-{discount}%</span>
                    {/* Heart filled */}
                    <div className="wl-heart">
                      <i className="fas fa-heart"></i>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="wl-body">
                    <span className="wl-brand">{product.brand}</span>
                    <h6 className="wl-name">{product.name}</h6>

                    {/* Stars */}
                    <div className="wl-rating">
                      {[1,2,3,4,5].map(s => (
                        <i key={s} className={`fas fa-star ${s <= Math.floor(product.rating) ? 'filled' : ''}`}></i>
                      ))}
                      <span className="wl-rev">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="wl-price-row">
                      <span className="wl-price">₹{product.price.toLocaleString()}</span>
                      <span className="wl-orig">₹{product.originalPrice.toLocaleString()}</span>
                    </div>

                    {/* Shades */}
                    {product.shades.length > 0 && (
                      <div className="wl-shades">
                        {product.shades.slice(0, 3).map((s, i) => (
                          <span key={i} className="wl-shade-chip">{s}</span>
                        ))}
                        {product.shades.length > 3 && (
                          <span className="wl-shade-more">+{product.shades.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="wl-btn-group">
                      <button
                        className={`wl-cart-btn ${added[product.id] ? 'added' : ''}`}
                        onClick={() => handleAdd(product)}
                      >
                        {added[product.id]
                          ? <><i className="fas fa-check me-2"></i>Added!</>
                          : <><i className="fas fa-shopping-bag me-2"></i>Add to Cart</>}
                      </button>
                      <button
                        className="wl-del-btn"
                        onClick={() => removeFromWishlist(product.id)}
                        title="Remove"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Move all to cart */}
        <div className="wl-footer-actions">
          <button
            className="btn btn-glow btn-lg"
            onClick={() => wishlistItems.forEach(p => handleAdd(p))}
          >
            <i className="fas fa-shopping-bag me-2"></i>
            Add All to Cart
          </button>
          <Link to="/products" className="btn btn-outline-glow btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
