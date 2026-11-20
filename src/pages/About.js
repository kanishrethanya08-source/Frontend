import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const values = [
  { icon: '💎', title: 'Premium Quality', desc: 'Every product is carefully sourced and verified for authenticity and quality.' },
  { icon: '🌿', title: 'Clean Beauty', desc: 'We prioritize clean, cruelty-free formulations that are good for you and the planet.' },
  { icon: '💖', title: 'Inclusivity', desc: 'Beauty for all skin tones, types, and textures. Everyone deserves to glow.' },
  { icon: '🚀', title: 'Innovation', desc: 'From cutting-edge skincare to trend-forward makeup, we stay ahead of the curve.' },
];

const team = [
  { name: 'Aanya Mehra', role: 'Founder & CEO', emoji: '👑', desc: 'Beauty industry veteran with 12 years of experience. Passionate about democratizing luxury beauty.' },
  { name: 'Riya Kapoor', role: 'Head of Curation', emoji: '💄', desc: 'Former makeup artist and beauty blogger. The mastermind behind our product selection.' },
  { name: 'Nisha Verma', role: 'Skincare Expert', emoji: '🌸', desc: 'Certified aesthetician and cosmetic chemist. Ensures every skincare product lives up to its claims.' },
];

export default function About() {
  return (
    <div className="page-wrapper about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="about-tag">Our Story</span>
              <h1 className="about-title">Born from a Passion for Beauty</h1>
              <p className="about-desc">
                GlowCart was founded in 2020 with one simple mission: make premium beauty accessible to everyone.
                We believe that great skin, stunning makeup, and radiant confidence shouldn't be a luxury — they should be a right.
              </p>
              <p className="about-desc">
                Today, we serve over 50,000 beauty lovers across India, curating the best of local and international cosmetics,
                skincare, and wellness products.
              </p>
              <div className="about-stats-row">
                <div className="about-stat"><span>50K+</span><p>Happy Customers</p></div>
                <div className="about-stat"><span>500+</span><p>Products</p></div>
                <div className="about-stat"><span>100%</span><p>Authentic</p></div>
                <div className="about-stat"><span>4.8★</span><p>Avg. Rating</p></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-img-collage">
                <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop" alt="Beauty" className="collage-main" />
                <img src="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=250&h=300&fit=crop" alt="Products" className="collage-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center">What We Stand For</h2>
            <p className="about-section-sub">Our values guide every decision we make</p>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="value-card card-hover">
                  <span className="value-icon">{v.icon}</span>
                  <h5 className="value-title">{v.title}</h5>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-inner">
            <div className="mission-text">
              <span className="about-tag">Our Mission</span>
              <h2>Empowering Every Individual to Shine</h2>
              <p>
                We believe beauty is personal. It's not about following trends — it's about discovering what makes you
                feel powerful, confident, and authentically you. GlowCart is here to give you the tools, the products,
                and the inspiration to do exactly that.
              </p>
              <Link to="/products" className="btn btn-glow mt-3">Explore Products</Link>
            </div>
            <div className="mission-image">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop" alt="Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title center">Meet the Team</h2>
            <p className="about-section-sub">The beauty enthusiasts behind GlowCart</p>
          </div>
          <div className="row g-4 justify-content-center">
            {team.map((member, i) => (
              <div key={i} className="col-md-4">
                <div className="team-card card-hover">
                  <div className="team-avatar">{member.emoji}</div>
                  <h5 className="team-name">{member.name}</h5>
                  <span className="team-role">{member.role}</span>
                  <p className="team-desc">{member.desc}</p>
                  <div className="team-socials">
                    <a href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container text-center">
          <h2>Ready to Start Your Glow Journey?</h2>
          <p>Join thousands of beauty lovers who trust GlowCart for their daily dose of glamour.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/signup" className="btn btn-glow btn-lg">Join GlowCart</Link>
            <Link to="/contact" className="btn btn-outline-glow btn-lg" style={{borderColor:'white',color:'white'}}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
