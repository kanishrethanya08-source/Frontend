import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const steps = ['Shipping', 'Payment', 'Confirm'];

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    payMethod: 'card',
  });

  const delivery = cartTotal >= 999 ? 0 : 99;
  const discount = Math.round(cartTotal * 0.05);
  const total = cartTotal + delivery - discount;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePlace = () => {
    setPlaced(true);
    clearCart();
  };

  if (cartItems.length === 0 && !placed) {
    return (
      <div className="page-wrapper">
        <div className="empty-cart" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'70vh', textAlign:'center', padding:'40px' }}>
          <div style={{ fontSize:'4rem', marginBottom:'20px' }}>🛍️</div>
          <h2 style={{ fontFamily:'var(--font-heading)', marginBottom:'12px' }}>Your cart is empty</h2>
          <Link to="/products" className="btn btn-glow btn-lg mt-3">Start Shopping</Link>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="page-wrapper">
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with GlowCart. Your order is being processed and will be delivered soon.</p>
          <div className="order-id-box">
            Order ID: <strong>#GC{Math.floor(Math.random() * 900000 + 100000)}</strong>
          </div>
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
            <Link to="/" className="btn btn-glow">Back to Home</Link>
            <Link to="/products" className="btn btn-outline-glow">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper checkout-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <div className="checkout-steps">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <div className="step-circle">{i < step ? <i className="fas fa-check"></i> : i + 1}</div>
                  <span>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Form */}
          <div className="col-lg-7">
            {step === 0 && (
              <div className="checkout-card">
                <h5 className="checkout-section-title"><i className="fas fa-map-marker-alt me-2"></i>Shipping Information</h5>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label-custom">First Name*</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="form-control-glow form-control" placeholder="Priya" />
                  </div>
                  <div className="col-6">
                    <label className="form-label-custom">Last Name*</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="form-control-glow form-control" placeholder="Sharma" />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">Email Address*</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control-glow form-control" placeholder="priya@email.com" />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">Phone Number*</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-control-glow form-control" placeholder="+91 98765 43210" />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">Address*</label>
                    <textarea name="address" value={form.address} onChange={handleChange} className="form-control-glow form-control" rows="2" placeholder="House No, Street, Locality"></textarea>
                  </div>
                  <div className="col-6">
                    <label className="form-label-custom">City*</label>
                    <input name="city" value={form.city} onChange={handleChange} className="form-control-glow form-control" placeholder="Mumbai" />
                  </div>
                  <div className="col-6">
                    <label className="form-label-custom">State*</label>
                    <input name="state" value={form.state} onChange={handleChange} className="form-control-glow form-control" placeholder="Maharashtra" />
                  </div>
                  <div className="col-6">
                    <label className="form-label-custom">Pincode*</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} className="form-control-glow form-control" placeholder="400001" />
                  </div>
                </div>
                <button className="btn btn-glow mt-4 w-100" onClick={handleNext}>
                  Continue to Payment <i className="fas fa-arrow-right ms-2"></i>
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="checkout-card">
                <h5 className="checkout-section-title"><i className="fas fa-credit-card me-2"></i>Payment Method</h5>
                <div className="pay-methods">
                  {[{v:'card',l:'Credit / Debit Card',ic:'fa-credit-card'},{v:'upi',l:'UPI',ic:'fa-mobile-alt'},{v:'netbanking',l:'Net Banking',ic:'fa-university'},{v:'cod',l:'Cash on Delivery',ic:'fa-money-bill-wave'}].map(m => (
                    <label key={m.v} className={`pay-method-opt ${form.payMethod === m.v ? 'active' : ''}`}>
                      <input type="radio" name="payMethod" value={m.v} checked={form.payMethod === m.v} onChange={handleChange} hidden />
                      <i className={`fas ${m.ic}`}></i>
                      <span>{m.l}</span>
                      {form.payMethod === m.v && <i className="fas fa-check-circle ms-auto check"></i>}
                    </label>
                  ))}
                </div>
                {form.payMethod === 'card' && (
                  <div className="row g-3 mt-2">
                    <div className="col-12">
                      <label className="form-label-custom">Name on Card*</label>
                      <input name="cardName" value={form.cardName} onChange={handleChange} className="form-control-glow form-control" placeholder="PRIYA SHARMA" />
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">Card Number*</label>
                      <input name="cardNumber" value={form.cardNumber} onChange={handleChange} className="form-control-glow form-control" placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div className="col-6">
                      <label className="form-label-custom">Expiry (MM/YY)*</label>
                      <input name="expiry" value={form.expiry} onChange={handleChange} className="form-control-glow form-control" placeholder="12/26" maxLength={5} />
                    </div>
                    <div className="col-6">
                      <label className="form-label-custom">CVV*</label>
                      <input name="cvv" value={form.cvv} onChange={handleChange} className="form-control-glow form-control" placeholder="•••" maxLength={4} type="password" />
                    </div>
                  </div>
                )}
                {form.payMethod === 'upi' && (
                  <div className="mt-3">
                    <label className="form-label-custom">UPI ID*</label>
                    <input className="form-control-glow form-control" placeholder="yourname@upi" />
                  </div>
                )}
                <div className="d-flex gap-3 mt-4">
                  <button className="btn btn-outline-glow" onClick={() => setStep(0)}>
                    <i className="fas fa-arrow-left me-2"></i>Back
                  </button>
                  <button className="btn btn-glow flex-fill" onClick={handleNext}>
                    Review Order <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-card">
                <h5 className="checkout-section-title"><i className="fas fa-clipboard-check me-2"></i>Review Your Order</h5>
                <div className="review-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="review-item">
                      <img src={item.image} alt={item.name} />
                      <div className="review-item-info">
                        <span className="ri-brand">{item.brand}</span>
                        <span className="ri-name">{item.name}</span>
                        <span className="ri-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="ri-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="review-address">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  <strong>Delivering to: </strong>
                  {form.address || '123 Sample St'}, {form.city || 'Mumbai'}, {form.state || 'Maharashtra'} - {form.pincode || '400001'}
                </div>
                <div className="d-flex gap-3 mt-4">
                  <button className="btn btn-outline-glow" onClick={() => setStep(1)}>
                    <i className="fas fa-arrow-left me-2"></i>Back
                  </button>
                  <button className="btn btn-glow flex-fill" onClick={handlePlace}>
                    Place Order <i className="fas fa-check ms-2"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="col-lg-5">
            <div className="checkout-summary">
              <h5 className="summary-title">Order Summary</h5>
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="si-info">
                    <span className="si-name">{item.name}</span>
                    <span className="si-qty">x{item.quantity}</span>
                  </div>
                  <span className="si-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-divider mt-3"></div>
              <div className="summary-row mt-3"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="summary-row discount"><span>Discount (5%)</span><span style={{color:'#2d8b5a'}}>−₹{discount.toLocaleString()}</span></div>
              <div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? <span style={{color:'#2d8b5a', fontWeight:700}}>FREE</span> : `₹${delivery}`}</span></div>
              <div className="summary-divider"></div>
              <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              <div className="trust-badges mt-3">
                <span><i className="fas fa-shield-alt"></i> Secure & Encrypted</span>
                <span><i className="fas fa-award"></i> 100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
