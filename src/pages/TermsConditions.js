import React from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using GlowCart ("the Platform"), you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our Platform. We reserve the right to update these terms at any time, and continued use of the Platform constitutes acceptance of the updated terms.`
  },
  {
    title: '2. Use of the Platform',
    content: `You agree to use GlowCart only for lawful purposes and in a manner that does not infringe the rights of others. You must not use the Platform to transmit any harmful, offensive, or illegal content. We reserve the right to terminate or restrict your access to the Platform if we believe you have violated these terms.`
  },
  {
    title: '3. Products and Pricing',
    content: `All product descriptions, images, and prices are subject to change without notice. While we strive for accuracy, we do not guarantee that all product information is complete or error-free. Prices are displayed in Indian Rupees (₹) and include applicable taxes unless stated otherwise. We reserve the right to cancel any order if a pricing error is detected.`
  },
  {
    title: '4. Orders and Payment',
    content: `By placing an order, you confirm that you are legally capable of entering into binding contracts. Payment must be made in full at the time of purchase. We accept major credit/debit cards, UPI, net banking, and cash on delivery. All transactions are processed securely using industry-standard encryption.`
  },
  {
    title: '5. Shipping and Delivery',
    content: `Delivery timelines are estimates and not guaranteed. GlowCart is not liable for delays caused by third-party courier services, natural disasters, or other circumstances beyond our control. Free shipping applies to orders above ₹999. Express delivery charges apply as indicated at checkout.`
  },
  {
    title: '6. Returns and Refunds',
    content: `Products may be returned within 7 days of delivery, provided they are unused and in original sealed packaging. Opened cosmetics and skincare items are non-returnable due to hygiene and safety reasons. Refunds will be processed within 5–7 business days after receipt and inspection of returned items.`
  },
  {
    title: '7. Intellectual Property',
    content: `All content on GlowCart — including logos, product images, text, and design — is the intellectual property of GlowCart or its content suppliers. You may not reproduce, distribute, or create derivative works without prior written permission.`
  },
  {
    title: '8. Limitation of Liability',
    content: `GlowCart shall not be held liable for any indirect, incidental, or consequential damages arising from your use of the Platform or the products purchased. Our maximum liability for any claim shall not exceed the value of the product purchased.`
  },
  {
    title: '9. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.`
  },
  {
    title: '10. Contact',
    content: `For questions regarding these Terms, please contact us at legal@glowcart.in or write to GlowCart, 204 Beauty Avenue, BKC, Mumbai — 400051.`
  }
];

export default function TermsConditions() {
  return (
    <div className="page-wrapper legal-page">
      <div className="page-header">
        <div className="container text-center">
          <h1 className="page-title">Terms & Conditions</h1>
          <p className="page-desc">Last updated: January 1, 2025</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="legal-card">
              <div className="legal-intro">
                <div className="legal-icon">📋</div>
                <p>
                  Please read these Terms and Conditions carefully before using GlowCart. These terms govern your
                  use of our website and services. By using GlowCart, you agree to these terms in full.
                </p>
              </div>

              <div className="legal-toc">
                <h6>Table of Contents</h6>
                <ul>
                  {sections.map((s, i) => (
                    <li key={i}><a href={`#section-${i}`}>{s.title}</a></li>
                  ))}
                </ul>
              </div>

              {sections.map((s, i) => (
                <div key={i} id={`section-${i}`} className="legal-section">
                  <h5 className="legal-section-title">{s.title}</h5>
                  <p className="legal-section-content">{s.content}</p>
                </div>
              ))}

              <div className="legal-footer-note">
                <i className="fas fa-info-circle me-2"></i>
                For further queries, visit our <Link to="/faq">FAQ</Link> or <Link to="/contact">Contact Us</Link> page.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
