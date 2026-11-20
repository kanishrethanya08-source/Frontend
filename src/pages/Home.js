import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Home.css';

const brands = [
  { name: "LuxeGlow", emoji: "💄" },
  { name: "RadiantBase", emoji: "✨" },
  { name: "DramaTique", emoji: "👁️" },
  { name: "GlowGarden", emoji: "🌸" },
  { name: "LuminaGlow", emoji: "⭐" },
  { name: "GlowLab", emoji: "🧴" },
];

const categories = [
  { name: "Lips", icon: "💋", count: "120+ Products", color: "#c9184a" },
  { name: "Eyes", icon: "👁️", count: "95+ Products", color: "#7b2d8b" },
  { name: "Face", icon: "✨", count: "180+ Products", color: "#d4a853" },
  { name: "Skincare", icon: "🌿", count: "60+ Products", color: "#2d8b5a" },
];

const testimonials = [
  { name: "Priya S.", text: "GlowCart is my go-to for all beauty finds! The quality is unmatched and delivery is super fast.", rating: 5, avatar: "P" },
  { name: "Meera K.", text: "Love the curation — every product I've tried has been amazing. The packaging is gorgeous too!", rating: 5, avatar: "M" },
  { name: "Anjali R.", text: "Finally found a site that stocks all my favourite brands. The deals are absolutely incredible.", rating: 5, avatar: "A" },
];

export default function Home() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState({});
  const featured = products.slice(0, 4);
  const trending = products.slice(4, 8);

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container h-100">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className="hero-badge">
                  <span className="badge-dot"></span>
                  New Arrivals Every Week
                </div>
                <h1 className="hero-title">
                  Discover Your<br />
                  <span className="highlight">Perfect Glow</span><br />
                  This Season
                </h1>
                <p className="hero-subtitle">
                  Explore 500+ premium beauty products from India's most loved brands.
                  Lipsticks, serums, palettes and more — all curated just for you.
                </p>
                <div className="hero-actions">
                  <Link to="/products" className="btn btn-glow btn-lg">
                    Shop Now <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                  <Link to="/about" className="btn btn-outline-glow btn-lg">
                    Our Story
                  </Link>
                </div>
                <div className="hero-stats">
                  <div className="stat"><span>500+</span><p>Products</p></div>
                  <div className="stat-divider"></div>
                  <div className="stat"><span>50K+</span><p>Happy Customers</p></div>
                  <div className="stat-divider"></div>
                  <div className="stat"><span>100%</span><p>Authentic</p></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-image-wrap">
                <div className="hero-image-card">
                  <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=700&fit=crop" alt="Beauty products" className="hero-img" />
                  <div className="hero-float-card float-1">
                    <i className="fas fa-star text-warning"></i>
                    <span>4.9 Rated</span>
                  </div>
                  <div className="hero-float-card float-2">
                    <i className="fas fa-truck"></i>
                    <span>Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section categories-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <div className="row g-4 justify-content-center">
            {categories.map((cat, i) => (
              <div key={i} className="col-6 col-md-3">
                <Link to={`/products?cat=${cat.name}`} className="category-card card-hover">
                  <div className="cat-icon" style={{ background: `${cat.color}18`, color: cat.color }}>
                    <span>{cat.icon}</span>
                  </div>
                  <h5 className="cat-name">{cat.name}</h5>
                  <p className="cat-count">{cat.count}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section featured-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle mt-3">Handpicked by our beauty experts</p>
            </div>
            <Link to="/products" className="btn btn-outline-glow">View All</Link>
          </div>
          <div className="row g-4">
            {featured.map(product => (
              <div key={product.id} className="col-6 col-md-3">
                <ProductCard product={product} onAdd={handleAdd} added={added[product.id]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="promo-banner">
        <div className="container">
          <div className="banner-inner">
            <div className="banner-content">
              <span className="banner-tag">Limited Time</span>
              <h2>Get 20% Off Your First Order</h2>
              <p>Use code <strong>GLOW20</strong> at checkout. New customers only.</p>
              <Link to="/products" className="btn btn-glow">Claim Offer</Link>
            </div>
            <div className="banner-emoji-grid">
              {['💄','🌸','✨','💅','👄','🌟','💎','🏆'].map((e,i) => (
                <span key={i} className="banner-emoji" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section trending-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
            <div>
              <h2 className="section-title">Trending Now</h2>
              <p className="section-subtitle mt-3">What beauty lovers are adding to cart</p>
            </div>
            <Link to="/products" className="btn btn-outline-glow">View All</Link>
          </div>
          <div className="row g-4">
            {trending.map(product => (
              <div key={product.id} className="col-6 col-md-3">
                <ProductCard product={product} onAdd={handleAdd} added={added[product.id]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-section section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center">Our Brands</h2>
            <p className="section-subtitle">Premium labels you can trust</p>
          </div>
          <div className="brands-scroll">
            {[...brands, ...brands].map((brand, i) => (
              <div key={i} className="brand-pill">
                <span>{brand.emoji}</span>
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEAUTY QUIZ PROMO BANNER */}
      <section className="quiz-promo-banner section">
        <div className="container">
          <div className="qpb-inner">
            <div className="qpb-left">
              <span className="qpb-tag">✨ New Feature</span>
              <h2 className="qpb-title">Not sure what to buy?<br/>Let us guide you!</h2>
              <p className="qpb-desc">
                Take our 2-minute Beauty Match Quiz and get personalised product
                recommendations based on your skin type, concerns, and style.
              </p>
              <Link to="/quiz" className="btn btn-glow btn-lg">
                <i className="fas fa-magic me-2"></i>Take the Quiz
              </Link>
            </div>
            <div className="qpb-right">
              <div className="qpb-steps">
                {[
                  { emoji: '🌿', text: 'Tell us your skin type' },
                  { emoji: '🎯', text: 'Share your concerns' },
                  { emoji: '💄', text: 'Pick your style' },
                  { emoji: '✨', text: 'Get matched!' },
                ].map((s, i) => (
                  <div key={i} className="qpb-step">
                    <span className="qpb-step-num">{i + 1}</span>
                    <span className="qpb-step-emoji">{s.emoji}</span>
                    <span className="qpb-step-text">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real beauty lovers</p>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={i} className="col-md-4">
                <div className="testimonial-card card-hover">
                  <div className="stars">{'★'.repeat(t.rating)}</div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.avatar}</div>
                    <span>{t.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Glow?</h2>
          <p>Join 50,000+ beauty lovers who shop with GlowCart every day.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/signup" className="btn btn-glow btn-lg">Create Account</Link>
            <Link to="/products" className="btn btn-outline-glow btn-lg" style={{color:'white', borderColor:'white'}}>Browse Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onAdd, added }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return (
    <div className="product-card card-hover">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <div className="product-overlay">
          <button className="overlay-btn" onClick={() => onAdd(product)}>
            <i className="fas fa-shopping-bag me-2"></i>Quick Add
          </button>
        </div>
        <span className="discount-tag">-{discount}%</span>
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h6 className="product-name">{product.name}</h6>
        <div className="product-rating">
          <span className="stars-sm">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-num">({product.reviews})</span>
        </div>
        <div className="product-price-row">
          <span className="price-current">₹{product.price.toLocaleString()}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={() => onAdd(product)}>
          {added ? <><i className="fas fa-check me-2"></i>Added!</> : <><i className="fas fa-shopping-bag me-2"></i>Add to Cart</>}
        </button>
      </div>
    </div>
  );
}
