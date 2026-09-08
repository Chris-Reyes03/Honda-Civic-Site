import React from 'react';
import { Link } from 'react-router';
import '../styles/footer2.css';

export const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Top Section - Brand + Navigation */}
      <div className="footer-top">
        {/* Left - Brand Name (Large) */}
        <div className="footer-brand-section">
          <h2 className="footer-brand-name">HONDA CIVIC</h2>
          <p className="footer-brand-subtitle">DEALERSHIP</p>
        </div>

        {/* Center - Navigation Links */}
        <div className="footer-nav-section">
          <ul className="footer-nav-links">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/products">SHOP</Link>
            </li>
            <li>
              <a href="#about">ABOUT</a>
            </li>
            <li>
              <a href="#contact">CONTACT</a>
            </li>
          </ul>
        </div>

        {/* Right - Social & Contact */}
        <div className="footer-info-section">
          <div className="footer-social-links">
            <a href="#instagram" className="info-link">
              INSTAGRAM
            </a>
            <a href="#tiktok" className="info-link">
              TIKTOK
            </a>
            <a href="#youtube" className="info-link">
              YOUTUBE
            </a>
          </div>
          <div className="footer-contact-info">
            <a href="mailto:hello@civicparts.com">hello@civicparts.com</a>
          </div>
        </div>
      </div>

      {/* Middle Section - Image Gallery
      <div className="footer-image-section">
        <div className="footer-image-placeholder">
          <img
            src="/catalog-image/Honda-logo.png"
            alt="Featured car parts"
          />
        </div>
      </div> */}

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <a href="#privacy">PRIVACY POLICY</a>
          <a href="#terms">TERMS OF SERVICE</a>
          <a href="#cookies">COOKIE POLICY</a>
        </div>
        <div className="footer-bottom-center">
          <p>&copy;2026 CIVIC PARTS CO.</p>
        </div>
        <div className="footer-bottom-right">
          <p>WEBSITE BY YOUR STUDIO</p>
        </div>
      </div>
    </footer>
  );
};
