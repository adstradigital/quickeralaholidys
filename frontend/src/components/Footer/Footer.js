"use client"

import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    "Luxury Houseboats",
    "Cultural Tours", 
    "Wildlife Safaris",
    "Ayurveda Retreats",
    "Adventure Sports",
    "Honeymoon Packages"
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      text: "+91 98765 43210",
      subtext: "Mon-Sun: 6AM - 10PM"
    },
    {
      icon: FaEnvelope,
      text: "info@quickkerala.com",
      subtext: "Quick response guaranteed"
    },
    {
      icon: FaMapMarkerAlt,
      text: "Marine Drive, Kochi",
      subtext: "Kerala, India - 682001"
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, name: "LinkedIn", url: "#" },
    { icon: FaTwitter, name: "Twitter", url: "#" },
    { icon: FaInstagram, name: "Instagram", url: "#" },
    { icon: FaFacebookF, name: "Facebook", url: "#" }
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="company-info">
            <div className="logo-section">
              <div className="logo">
                <span className="logo-text">QK</span>
              </div>
              <div className="company-details">
                <h3>Quick Kerala Holidays</h3>
                <p className="company-tagline">
                  Premium travel experiences in God's Own Country
                </p>
              </div>
            </div>
            
            <div className="contact-info">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">
                      <IconComponent />
                    </div>
                    <div className="contact-details">
                      <p className="contact-text">{contact.text}</p>
                      <p className="contact-subtext">{contact.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="social-section">
              <p className="social-title">Connect With Us</p>
              <div className="social-links">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="social-link"
                      aria-label={social.name}
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="navigation-section">
            <h4 className="section-title">Quick Links</h4>
            <nav className="navigation-links">
              {navigationLinks.map((link, index) => (
                <a key={index} href={link.path} className="nav-link">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="services-section">
            <h4 className="section-title">Our Services</h4>
            <div className="services-list">
              {services.map((service, index) => (
                <span key={index} className="service-item">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="newsletter-section">
            <h4 className="section-title">Stay Informed</h4>
            <div className="newsletter-card">
              <p className="newsletter-text">
                Subscribe to receive travel insights and exclusive offers
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-button">
                  Subscribe
                </button>
              </div>
              <p className="newsletter-note">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="copyright-section">
            <p>&copy; {currentYear} Quick Kerala Holidays. All rights reserved.</p>
            <div className="certifications">
              <span className="cert-badge">Kerala Tourism Certified</span>
              <span className="cert-badge">IATA Approved</span>
            </div>
          </div>
          
          <div className="legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cancellation-policy">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;