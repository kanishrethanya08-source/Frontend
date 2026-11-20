import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './QuickViewModal.css';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedShade, setSelectedShade] = useState(product.shades[0] || null);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="qv-overlay" onClick={onClose}>
      <div className="qv-modal" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="qv-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="qv-inner">
          {/* Left — Image */}
          <div className="qv-img-col">
            <div className="qv-img-wrap">
              <img src={product.image} alt={product.name} className="qv-img" />
              {product.badge && <span className="qv-badge">{product.badge}</span>}
              <span className="qv-discount-tag">-{discount}% OFF</span>
            </div>
          </div>

          {/* Right — Details */}
          <div className="qv-details-col">
            <span className="qv-brand">{product.brand}</span>
            <h2 className="qv-name">{product.name}</h2>

            {/* Rating */}
            <div className="qv-rating">
              <div className="qv-stars">
                {[1,2,3,4,5].map(s => (
                  <i key={s} className={`fas fa-star ${s <= Math.floor(product.rating) ? 'filled' : ''}`}></i>
                ))}
              </div>
              <span className="qv-rating-num">{product.rating}</span>
              <span className="qv-reviews">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="qv-price-block">
              <span className="qv-price">₹{product.price.toLocaleString()}</span>
              <span className="qv-orig">₹{product.originalPrice.toLocaleString()}</span>
              <span className="qv-save-tag">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
            </div>

            {/* Description */}
            <p className="qv-desc">{product.description}</p>

            {/* Shades */}
            {product.shades.length > 0 && (
              <div className="qv-shades-block">
                <p className="qv-shades-label">
                  Shade: <strong>{selectedShade}</strong>
                </p>
                <div className="qv-shades-list">
                  {product.shades.map((s, i) => (
                    <button
                      key={i}
                      className={`qv-shade-btn ${selectedShade === s ? 'active' : ''}`}
                      onClick={() => setSelectedShade(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="qv-qty-block">
              <span className="qv-qty-label">Quantity</span>
              <div className="qv-qty-ctrl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="qv-actions">
              <button
                className={`qv-add-btn ${added ? 'added' : ''}`}
                onClick={handleAdd}
              >
                {added
                  ? <><i className="fas fa-check me-2"></i>Added to Cart!</>
                  : <><i className="fas fa-shopping-bag me-2"></i>Add to Cart</>}
              </button>
              <button
                className={`qv-wish-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                title={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <i className={`${isWishlisted(product.id) ? 'fas' : 'far'} fa-heart`}></i>
              </button>
            </div>

            {/* Trust badges */}
            <div className="qv-trust">
              <span><i className="fas fa-shield-alt"></i> 100% Authentic</span>
              <span><i className="fas fa-truck"></i> Free Delivery ₹999+</span>
              <span><i className="fas fa-undo"></i> Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
