// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Sitemap</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Use</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>123 Main Street, Your City</p>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h4>Connect with Us</h4>
          <div className="social-icons">
            <a href="/" className="icon facebook">F</a>
            <a href="/" className="icon twitter">T</a>
            <a href="/" className="icon instagram">I</a>
            <a href="/" className="icon linkedin">L</a>
          </div>
        </div>
        <div className="footer-section copyright">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
