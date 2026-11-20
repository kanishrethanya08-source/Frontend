import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './BeautyQuiz.css';

// ── Quiz Questions ────────────────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    question: "What's your skin type?",
    emoji: '🌿',
    subtitle: 'Choose the one that best describes your skin day-to-day',
    type: 'single',
    options: [
      { label: 'Oily', emoji: '💦', value: 'oily' },
      { label: 'Dry', emoji: '🌵', value: 'dry' },
      { label: 'Combination', emoji: '☯️', value: 'combination' },
      { label: 'Normal', emoji: '✨', value: 'normal' },
      { label: 'Sensitive', emoji: '🌸', value: 'sensitive' },
    ],
  },
  {
    id: 2,
    question: 'What are your skin concerns?',
    emoji: '🔍',
    subtitle: 'Pick all that apply',
    type: 'multi',
    options: [
      { label: 'Dark spots', emoji: '🟤', value: 'darkspots' },
      { label: 'Dullness', emoji: '😴', value: 'dullness' },
      { label: 'Acne / Breakouts', emoji: '😤', value: 'acne' },
      { label: 'Fine lines', emoji: '📏', value: 'aging' },
      { label: 'Dryness', emoji: '🏜️', value: 'dryness' },
      { label: 'Uneven texture', emoji: '🪨', value: 'texture' },
    ],
  },
  {
    id: 3,
    question: 'What kind of makeup look do you love?',
    emoji: '💄',
    subtitle: 'Your everyday vibe',
    type: 'single',
    options: [
      { label: 'No-makeup makeup', emoji: '🤍', value: 'natural' },
      { label: 'Bold & Dramatic', emoji: '🖤', value: 'bold' },
      { label: 'Glam & Glowy', emoji: '✨', value: 'glam' },
      { label: 'Colourful & Fun', emoji: '🌈', value: 'colorful' },
    ],
  },
  {
    id: 4,
    question: 'Which areas do you want to focus on?',
    emoji: '🎯',
    subtitle: 'Select everything you want to level up',
    type: 'multi',
    options: [
      { label: 'Lips', emoji: '👄', value: 'Lips' },
      { label: 'Eyes', emoji: '👁️', value: 'Eyes' },
      { label: 'Face / Base', emoji: '✨', value: 'Face' },
      { label: 'Skincare', emoji: '🌿', value: 'Skincare' },
    ],
  },
  {
    id: 5,
    question: "What's your budget per product?",
    emoji: '💰',
    subtitle: 'We\'ll find the best picks for you',
    type: 'single',
    options: [
      { label: 'Under ₹600', emoji: '🪙', value: 'low' },
      { label: '₹600 – ₹1,200', emoji: '💵', value: 'mid' },
      { label: '₹1,200 – ₹2,000', emoji: '💳', value: 'high' },
      { label: 'No limit!', emoji: '🤑', value: 'any' },
    ],
  },
];

// ── Recommendation Engine ─────────────────────────────────────────────────────
function getRecommendations(answers) {
  const { skinConcerns = [], focusAreas = [], budget, lookStyle } = answers;

  return products
    .map(p => {
      let score = 0;

      // Focus area match
      if (focusAreas.includes(p.category)) score += 40;

      // Budget match
      if (budget === 'low' && p.price < 600) score += 30;
      else if (budget === 'mid' && p.price >= 600 && p.price <= 1200) score += 30;
      else if (budget === 'high' && p.price > 1200 && p.price <= 2000) score += 30;
      else if (budget === 'any') score += 20;

      // Skin concerns → skincare products score higher
      if (skinConcerns.includes('darkspots') && p.category === 'Skincare') score += 20;
      if (skinConcerns.includes('dullness') && p.category === 'Skincare') score += 20;
      if (skinConcerns.includes('aging') && p.category === 'Skincare') score += 20;
      if (skinConcerns.includes('dryness') && p.category === 'Skincare') score += 15;

      // Look style match
      if (lookStyle === 'bold' && (p.category === 'Eyes' || p.category === 'Lips')) score += 20;
      if (lookStyle === 'glam' && (p.category === 'Face' || p.category === 'Eyes')) score += 20;
      if (lookStyle === 'natural' && p.category === 'Face') score += 20;
      if (lookStyle === 'colorful' && (p.category === 'Lips' || p.category === 'Eyes')) score += 20;

      // Rating bonus
      score += p.rating * 3;

      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BeautyQuiz() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [step, setStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState({
    skinType: null,
    skinConcerns: [],
    lookStyle: null,
    focusAreas: [],
    budget: null,
  });
  const [added, setAdded] = useState({});
  const [results, setResults] = useState([]);

  const currentQ = questions[step - 1];

  const handleSingle = (value) => {
    const key = ['skinType', null, 'lookStyle', null, 'budget'][step - 1];
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleMulti = (value) => {
    const key = [null, 'skinConcerns', null, 'focusAreas', null][step - 1];
    setAnswers(prev => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      };
    });
  };

  const isSelected = (value) => {
    if (!currentQ) return false;
    if (currentQ.type === 'single') {
      const key = ['skinType', null, 'lookStyle', null, 'budget'][step - 1];
      return answers[key] === value;
    } else {
      const key = [null, 'skinConcerns', null, 'focusAreas', null][step - 1];
      return answers[key]?.includes(value);
    }
  };

  const canProceed = () => {
    if (!currentQ) return false;
    if (currentQ.type === 'single') {
      const key = ['skinType', null, 'lookStyle', null, 'budget'][step - 1];
      return !!answers[key];
    } else {
      const key = [null, 'skinConcerns', null, 'focusAreas', null][step - 1];
      return answers[key]?.length > 0;
    }
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(s => s + 1);
    } else {
      const recs = getRecommendations(answers);
      setResults(recs);
      setStep(questions.length + 1);
    }
  };

  const handleBack = () => setStep(s => s - 1);

  const handleAddCart = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({ skinType: null, skinConcerns: [], lookStyle: null, focusAreas: [], budget: null });
    setResults([]);
    setAdded({});
  };

  const progress = step === 0 ? 0 : Math.round((step / questions.length) * 100);

  // ── Intro Screen ────────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-intro">
          <div className="qi-bg-shapes">
            <div className="qi-shape qi-shape-1"></div>
            <div className="qi-shape qi-shape-2"></div>
            <div className="qi-shape qi-shape-3"></div>
          </div>
          <div className="qi-content">
            <div className="qi-badge">✦ Personalised For You</div>
            <div className="qi-emoji">💄✨🌸</div>
            <h1 className="qi-title">Find Your <span>Perfect</span><br />Beauty Match</h1>
            <p className="qi-desc">
              Answer 5 quick questions and our beauty AI will handpick the products
              that are perfect for your skin type, concerns, and style.
            </p>
            <div className="qi-features">
              <div className="qi-feat"><i className="fas fa-bolt"></i> 2 minutes</div>
              <div className="qi-feat"><i className="fas fa-star"></i> Personalised picks</div>
              <div className="qi-feat"><i className="fas fa-redo"></i> Retake anytime</div>
            </div>
            <button className="btn btn-glow btn-lg qi-start-btn" onClick={() => setStep(1)}>
              Start My Beauty Quiz <i className="fas fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results Screen ──────────────────────────────────────────────────────────
  if (step === questions.length + 1) {
    const skinLabels = { oily:'Oily', dry:'Dry', combination:'Combination', normal:'Normal', sensitive:'Sensitive' };
    return (
      <div className="page-wrapper quiz-page">
        <div className="quiz-results">
          <div className="qr-header">
            <div className="qr-confetti">🎉✨💄🌸⭐💅</div>
            <h1 className="qr-title">Your Beauty Matches Are Here!</h1>
            <p className="qr-subtitle">
              Based on your <strong>{skinLabels[answers.skinType]}</strong> skin and your preferences,
              we've curated these picks just for you.
            </p>
            <div className="qr-tags">
              {answers.focusAreas.map((f, i) => (
                <span key={i} className="qr-tag">{f}</span>
              ))}
              {answers.skinConcerns.map((c, i) => (
                <span key={i} className="qr-tag qr-tag-concern">{c}</span>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="row g-4 justify-content-center">
              {results.map((product, idx) => {
                const discount = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );
                return (
                  <div key={product.id} className="col-6 col-md-4 col-lg-4">
                    <div className={`qr-card card-hover ${idx === 0 ? 'top-pick' : ''}`}>
                      {idx === 0 && <div className="top-pick-crown">👑 Top Pick For You</div>}
                      <div className="qr-img-wrap">
                        <img src={product.image} alt={product.name} className="qr-img" />
                        {product.badge && <span className="qr-badge">{product.badge}</span>}
                        <span className="qr-discount">-{discount}%</span>
                        <button
                          className={`qr-wish-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                          onClick={() => toggleWishlist(product)}
                        >
                          <i className={`${isWishlisted(product.id) ? 'fas' : 'far'} fa-heart`}></i>
                        </button>
                      </div>
                      <div className="qr-body">
                        <span className="qr-brand">{product.brand}</span>
                        <h6 className="qr-name">{product.name}</h6>
                        <div className="qr-stars">
                          {[1,2,3,4,5].map(s => (
                            <i key={s} className={`fas fa-star ${s <= Math.floor(product.rating) ? 'filled' : ''}`}></i>
                          ))}
                          <span>({product.reviews})</span>
                        </div>
                        <div className="qr-price-row">
                          <span className="qr-price">₹{product.price.toLocaleString()}</span>
                          <span className="qr-orig">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                        <button
                          className={`qr-cart-btn ${added[product.id] ? 'added' : ''}`}
                          onClick={() => handleAddCart(product)}
                        >
                          {added[product.id]
                            ? <><i className="fas fa-check me-2"></i>Added!</>
                            : <><i className="fas fa-shopping-bag me-2"></i>Add to Cart</>}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="qr-footer-actions">
              <button className="btn btn-outline-glow" onClick={handleRestart}>
                <i className="fas fa-redo me-2"></i>Retake Quiz
              </button>
              <Link to="/products" className="btn btn-glow">
                <i className="fas fa-th me-2"></i>Browse All Products
              </Link>
              <Link to="/cart" className="btn btn-outline-glow">
                <i className="fas fa-shopping-bag me-2"></i>View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Question Screen ─────────────────────────────────────────────────────────
  return (
    <div className="quiz-page quiz-question-page">
      <div className="quiz-q-wrap">
        {/* Progress bar */}
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Step indicator */}
        <div className="quiz-step-row">
          <span className="quiz-step-label">Question {step} of {questions.length}</span>
          <span className="quiz-step-pct">{progress}% complete</span>
        </div>

        {/* Question card */}
        <div className="quiz-q-card">
          <div className="quiz-q-emoji">{currentQ.emoji}</div>
          <h2 className="quiz-q-title">{currentQ.question}</h2>
          <p className="quiz-q-sub">{currentQ.subtitle}</p>

          {/* Options */}
          <div className={`quiz-options ${currentQ.options.length > 4 ? 'grid-3' : 'grid-2'}`}>
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                className={`quiz-opt-btn ${isSelected(opt.value) ? 'selected' : ''}`}
                onClick={() =>
                  currentQ.type === 'single'
                    ? handleSingle(opt.value)
                    : handleMulti(opt.value)
                }
              >
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
                {isSelected(opt.value) && (
                  <span className="opt-check"><i className="fas fa-check"></i></span>
                )}
              </button>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="quiz-nav">
            {step > 1 && (
              <button className="quiz-back-btn" onClick={handleBack}>
                <i className="fas fa-arrow-left me-2"></i>Back
              </button>
            )}
            <button
              className="quiz-next-btn"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === questions.length ? (
                <><i className="fas fa-magic me-2"></i>Show My Matches</>
              ) : (
                <>Next <i className="fas fa-arrow-right ms-2"></i></>
              )}
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="quiz-dots">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`quiz-dot ${i + 1 < step ? 'done' : ''} ${i + 1 === step ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
