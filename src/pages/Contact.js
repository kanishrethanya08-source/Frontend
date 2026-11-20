import React, { useState } from 'react';
import './Contact.css';

const faqs = [
  { q: "How can I track my order?", a: "You will receive a tracking link via email once your order is dispatched." },
  { q: "What is the return policy?", a: "We accept returns within 7 days of delivery for unused products in original packaging." },
  { q: "Do you ship pan India?", a: "Yes! We deliver to all pin codes across India with express options available." },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="page-wrapper contact-page">
      <div className="page-header">
        <div className="container text-center">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-desc">We'd love to hear from you. Our team replies within 24 hours.</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Info Cards */}
          <div className="col-lg-4">
            <div className="contact-info-wrap">
              {[
                { icon: 'fa-map-marker-alt', title: 'Visit Us', info: '204, Beauty Avenue, BKC, Mumbai — 400051', color: '#c9184a' },
                { icon: 'fa-phone-alt', title: 'Call Us', info: '+91 98765 43210\nMon–Sat, 9AM–7PM', color: '#7b2d8b' },
                { icon: 'fa-envelope', title: 'Email Us', info: 'support@glowcart.in\nhello@glowcart.in', color: '#d4a853' },
                { icon: 'fa-comments', title: 'Live Chat', info: 'Available on our app and website during business hours', color: '#2d8b5a' },
              ].map((c, i) => (
                <div key={i} className="contact-info-card">
                  <div className="contact-ic" style={{ background: `${c.color}18`, color: c.color }}>
                    <i className={`fas ${c.icon}`}></i>
                  </div>
                  <div>
                    <h6>{c.title}</h6>
                    <p style={{ whiteSpace: 'pre-line' }}>{c.info}</p>
                  </div>
                </div>
              ))}

              <div className="contact-social">
                <p className="cs-label">Follow us</p>
                <div className="cs-icons">
                  <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#!" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-8">
            <div className="contact-form-card">
              {!sent ? (
                <>
                  <h4 className="contact-form-title">Send us a Message</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label-custom">Your Name*</label>
                        <input name="name" value={form.name} onChange={handleChange} className="form-control-glow form-control" placeholder="Priya Sharma" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label-custom">Email Address*</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control-glow form-control" placeholder="priya@email.com" required />
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">Subject*</label>
                        <select name="subject" value={form.subject} onChange={handleChange} className="form-control-glow form-control" required>
                          <option value="">Select a topic</option>
                          <option>Order Issue</option>
                          <option>Product Query</option>
                          <option>Returns & Refunds</option>
                          <option>Partnership</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">Message*</label>
                        <textarea name="message" value={form.message} onChange={handleChange} className="form-control-glow form-control" rows="6" placeholder="Tell us how we can help…" required></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-glow px-5" disabled={loading}>
                          {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Sending…</> : <><i className="fas fa-paper-plane me-2"></i>Send Message</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <div className="contact-success">
                  <div className="cs-icon">🎉</div>
                  <h4>Message Received!</h4>
                  <p>Thank you for reaching out, <strong>{form.name}</strong>. We'll get back to you within 24 hours at <strong>{form.email}</strong>.</p>
                  <button className="btn btn-outline-glow mt-3" onClick={() => { setForm({name:'',email:'',subject:'',message:''}); setSent(false); }}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Quick FAQs */}
            <div className="quick-faqs">
              <h5 className="qf-title">Quick Answers</h5>
              {faqs.map((f, i) => (
                <details key={i} className="qf-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
