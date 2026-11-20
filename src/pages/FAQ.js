import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const faqData = [
  {
    category: 'Orders & Shipping',
    icon: '📦',
    items: [
      { q: 'How do I place an order?', a: 'Simply browse our products, add items to your cart, and proceed to checkout. You can pay via card, UPI, net banking, or cash on delivery.' },
      { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available for select pin codes at an additional charge.' },
      { q: 'Is there free shipping?', a: 'Yes! Orders above ₹999 qualify for free standard shipping anywhere in India.' },
      { q: 'Can I change my delivery address after placing an order?', a: 'Address changes can be made within 1 hour of placing the order by contacting our support team at support@glowcart.in.' },
    ]
  },
  {
    category: 'Products & Authenticity',
    icon: '💄',
    items: [
      { q: 'Are all products 100% authentic?', a: 'Absolutely. We source directly from brands and authorized distributors. Every product comes with an authenticity guarantee.' },
      { q: 'Do you sell cruelty-free products?', a: 'We carry a wide range of cruelty-free and vegan-certified products. Look for the "Clean Beauty" badge on product pages.' },
      { q: 'What if a product causes an allergic reaction?', a: 'If you experience any adverse reaction, discontinue use immediately. Contact us and we will process a full refund or exchange.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    icon: '🔄',
    items: [
      { q: 'What is the return policy?', a: 'We accept returns within 7 days of delivery for unused products in their original sealed packaging. Opened items are non-returnable due to hygiene reasons.' },
      { q: 'How long does a refund take?', a: 'Refunds are processed within 5–7 business days after we receive the returned item. The amount is credited to your original payment method.' },
      { q: 'What if I receive a damaged product?', a: 'We\'re sorry to hear that! Take a photo and email us at support@glowcart.in within 48 hours. We\'ll replace or refund immediately.' },
    ]
  },
  {
    category: 'Payments & Offers',
    icon: '💳',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, wallets, and cash on delivery for most pin codes.' },
      { q: 'Are there any ongoing offers?', a: 'Yes! Use code GLOW20 for 20% off your first order. Subscribe to our newsletter for exclusive member deals and flash sales.' },
      { q: 'Is my payment information secure?', a: 'Yes. We use 256-bit SSL encryption and are PCI-DSS compliant. We never store your complete card details.' },
    ]
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState('');

  const allItems = faqData.flatMap(c => c.items.map(i => ({ ...i, cat: c.category })));
  const filtered = search
    ? allItems.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <div className="page-wrapper faq-page">
      <div className="page-header">
        <div className="container text-center">
          <h1 className="page-title">Help Center</h1>
          <p className="page-desc">Find answers to the most common questions</p>
          <div className="faq-search-wrap">
            <i className="fas fa-search faq-search-icon"></i>
            <input
              type="text"
              placeholder="Search your question…"
              className="faq-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container py-5">
        {filtered ? (
          <div className="faq-search-results">
            <p className="faq-result-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</p>
            {filtered.map((item, i) => (
              <FAQItem key={i} item={item} index={`s-${i}`} open={openItem === `s-${i}`} toggle={() => setOpenItem(openItem === `s-${i}` ? null : `s-${i}`)} showCat />
            ))}
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="faq-nav">
                {faqData.map((cat, i) => (
                  <button
                    key={i}
                    className={`faq-nav-item ${activeCategory === i ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(i); setOpenItem(null); }}
                  >
                    <span className="faq-nav-icon">{cat.icon}</span>
                    <span>{cat.category}</span>
                    <span className="faq-count">{cat.items.length}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-lg-9">
              <div className="faq-content">
                <h4 className="faq-cat-title">
                  <span>{faqData[activeCategory].icon}</span>
                  {faqData[activeCategory].category}
                </h4>
                {faqData[activeCategory].items.map((item, i) => (
                  <FAQItem
                    key={i}
                    item={item}
                    index={`${activeCategory}-${i}`}
                    open={openItem === `${activeCategory}-${i}`}
                    toggle={() => setOpenItem(openItem === `${activeCategory}-${i}` ? null : `${activeCategory}-${i}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="faq-cta">
          <h4>Still have questions?</h4>
          <p>Our beauty experts are ready to help you.</p>
          <Link to="/contact" className="btn btn-glow">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item, index, open, toggle, showCat }) {
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={toggle}>
      <div className="faq-question">
        {showCat && <span className="faq-item-cat">{item.cat}</span>}
        <span>{item.q}</span>
        <span className="faq-toggle">{open ? '−' : '+'}</span>
      </div>
      {open && <div className="faq-answer">{item.a}</div>}
    </div>
  );
}
