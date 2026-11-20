import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const delivery = cartTotal >= 999 ? 0 : 99;
  const discount = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + delivery - discount;

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-cart">
          <div className="empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Discover beautiful products!</p>
          <Link to="/products" className="btn btn-glow btn-lg">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper cart-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-desc">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="cart-items-wrap">
              <div className="cart-header-row">
                <span>Product</span>
                <span>Qty</span>
                <span>Price</span>
              </div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <span className="ci-brand">{item.brand}</span>
                    <h6 className="ci-name">{item.name}</h6>
                    <span className="ci-price-sm">₹{item.price.toLocaleString()} each</span>
                  </div>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="ci-total">
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Remove">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-actions">
                <Link to="/products" className="btn btn-outline-glow">
                  <i className="fas fa-arrow-left me-2"></i>Continue Shopping
                </Link>
                <button className="btn-clear" onClick={clearCart}>
                  <i className="fas fa-times me-2"></i>Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h5 className="summary-title">Order Summary</h5>
              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((s,i) => s + i.quantity, 0)} items)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount (5%)</span>
                <span>−₹{discount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{delivery === 0 ? <span className="free-tag">FREE</span> : `₹${delivery}`}</span>
              </div>
              {delivery > 0 && (
                <div className="free-delivery-hint">
                  Add ₹{(999 - cartTotal).toLocaleString()} more for free delivery
                  <div className="delivery-progress">
                    <div className="delivery-fill" style={{ width: `${Math.min((cartTotal/999)*100, 100)}%` }}></div>
                  </div>
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="btn btn-glow w-100 mt-4" style={{ display:'block', textAlign:'center' }}>
                Proceed to Checkout <i className="fas fa-arrow-right ms-2"></i>
              </Link>
              <div className="secure-tags">
                <span><i className="fas fa-lock"></i> Secure Checkout</span>
                <span><i className="fas fa-undo"></i> Easy Returns</span>
              </div>
            </div>

            <div className="promo-box">
              <h6>Have a promo code?</h6>
              <div className="promo-input-row">
                <input type="text" placeholder="Enter code (e.g. GLOW20)" className="promo-input" />
                <button className="promo-apply-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
