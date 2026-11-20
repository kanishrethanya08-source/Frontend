import React from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly when you create an account, place an order, or contact us. This includes your name, email address, phone number, delivery address, and payment details. We also automatically collect usage data such as browsing history, device information, and IP address to improve your experience.`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use your information to process orders and payments, deliver products, send order confirmations and tracking updates, provide customer support, personalise your shopping experience, and send promotional emails (with your consent). We do not sell your personal data to third parties.`
  },
  {
    title: '3. Data Sharing',
    content: `We may share your information with trusted third-party service providers who assist us in operating our Platform — such as payment processors, logistics partners, and email service providers. These parties are contractually obligated to keep your information confidential and use it only for the services they provide to us.`
  },
  {
    title: '4. Cookies and Tracking',
    content: `GlowCart uses cookies and similar technologies to enhance your experience, remember your preferences, and analyse site traffic. You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect the functionality of the Platform.`
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your personal information. While we take every precaution, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
  },
  {
    title: '6. Your Rights',
    content: `You have the right to access, update, or delete your personal data at any time by logging into your account or contacting us. You may also opt out of marketing communications by clicking "Unsubscribe" in any email we send. We will respond to data requests within 30 days.`
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal data for as long as your account is active or as needed to provide services and comply with legal obligations. Order data is retained for 7 years for accounting and legal compliance purposes.`
  },
  {
    title: '8. Children\'s Privacy',
    content: `GlowCart is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with personal data, we will delete it immediately.`
  },
  {
    title: '9. Changes to this Policy',
    content: `We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on the Platform. Your continued use of GlowCart after changes are posted constitutes acceptance of the updated policy.`
  },
  {
    title: '10. Contact Us',
    content: `For privacy-related concerns, write to us at privacy@glowcart.in or by post to GlowCart Privacy Team, 204 Beauty Avenue, BKC, Mumbai — 400051. We aim to respond within 48 hours.`
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="page-wrapper legal-page">
      <div className="page-header">
        <div className="container text-center">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-desc">Last updated: January 1, 2025</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="legal-card">
              <div className="legal-intro">
                <div className="legal-icon">🔒</div>
                <p>
                  Your privacy matters to us. This Privacy Policy explains how GlowCart collects, uses, and protects
                  your personal information when you use our Platform and services.
                </p>
              </div>

              <div className="legal-toc">
                <h6>Table of Contents</h6>
                <ul>
                  {sections.map((s, i) => (
                    <li key={i}><a href={`#psection-${i}`}>{s.title}</a></li>
                  ))}
                </ul>
              </div>

              {sections.map((s, i) => (
                <div key={i} id={`psection-${i}`} className="legal-section">
                  <h5 className="legal-section-title">{s.title}</h5>
                  <p className="legal-section-content">{s.content}</p>
                </div>
              ))}

              <div className="legal-footer-note">
                <i className="fas fa-info-circle me-2"></i>
                For more information, visit our <Link to="/faq">FAQ</Link> or <Link to="/contact">Contact Us</Link> page.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
