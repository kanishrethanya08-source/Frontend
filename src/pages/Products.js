import React, { useState } from 'react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuickViewModal from '../components/QuickViewModal';
import './Products.css';

export default function Products() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  let filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="page-wrapper products-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Products</h1>
          <p className="page-desc">Explore our curated collection of premium beauty & cosmetics</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Search + Sort Bar */}
        <div className="filter-bar">
          <div className="search-wrap">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search products or brands…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">A – Z</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="results-count">{filtered.length} products found</p>

        {/* Grid */}
        <div className="row g-4">
          {filtered.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <p>No products found. Try a different search or category.</p>
            </div>
          ) : filtered.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="prod-card card-hover">
                <div className="prod-img-wrap">
                  <img src={product.image} alt={product.name} className="prod-img" loading="lazy" />
                  {product.badge && <span className="prod-badge">{product.badge}</span>}

                  {/* Wishlist heart button */}
                  <button
                    className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label="Wishlist"
                  >
                    <i className={`${isWishlisted(product.id) ? 'fas' : 'far'} fa-heart`}></i>
                  </button>

                  <div className="discount-pill">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>

                  {/* Quick View overlay button */}
                  <div className="qv-hover-overlay">
                    <button
                      className="qv-trigger-btn"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <i className="fas fa-eye me-2"></i>Quick View
                    </button>
                  </div>
                </div>

                <div className="prod-body">
                  <span className="prod-brand">{product.brand}</span>
                  <h6 className="prod-name">{product.name}</h6>
                  <p className="prod-desc">{product.description.substring(0, 70)}…</p>
                  <div className="prod-rating">
                    <div className="stars-row">
                      {[1,2,3,4,5].map(s => (
                        <i key={s} className={`fas fa-star ${s <= Math.floor(product.rating) ? 'filled' : ''}`}></i>
                      ))}
                    </div>
                    <span className="rev-count">{product.reviews} reviews</span>
                  </div>
                  <div className="prod-price-row">
                    <span className="curr-price">₹{product.price.toLocaleString()}</span>
                    <span className="orig-price">₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  {product.shades.length > 0 && (
                    <div className="shade-row">
                      {product.shades.slice(0, 3).map((s, i) => (
                        <span key={i} className="shade-chip">{s}</span>
                      ))}
                      {product.shades.length > 3 && (
                        <span className="shade-more">+{product.shades.length - 3}</span>
                      )}
                    </div>
                  )}
                  <button
                    className={`btn-cart-add ${added[product.id] ? 'added' : ''}`}
                    onClick={() => handleAdd(product)}
                  >
                    {added[product.id]
                      ? <><i className="fas fa-check me-2"></i>Added to Cart</>
                      : <><i className="fas fa-shopping-bag me-2"></i>Add to Cart</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
