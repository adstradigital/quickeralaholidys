"use client";

import { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import "./footer.css";

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
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Luxury Houseboats",
    "Cultural Tours",
    "Wildlife Safaris",
    "Ayurveda Retreats",
    "Adventure Sports",
    "Honeymoon Packages",
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      text: "+91 9447823767",
      subtext: "Mon-Sun: 6AM - 10PM",
    },
    {
      icon: FaEnvelope,
      text: "info@quickeralaholidays.com",
      subtext: "Quick response guaranteed",
    },
    {
      icon: FaMapMarkerAlt,
      text: "Quick Kerala Holidays, Thodupuzha",
      subtext: "Kerala, India - 685607",
    },
  ];

  const socialLinks = [
    { icon: FaLinkedin, name: "LinkedIn", url: "#" },
    { icon: FaTwitter, name: "Twitter", url: "#" },
    { icon: FaInstagram, name: "Instagram", url: "#" },
    { icon: FaFacebookF, name: "Facebook", url: "#" },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="company-info">
            <div className="logo-section">
              <img
                src="/assets/quikerala_logo.png"
                alt="Quick Kerala Holidays logo"
                className="logo-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/assets/logo-fallback.png";
                }}
              />
            </div>

            <div className="contact-infos">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="contact-items">
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
              <p className="social-title">Follow Us</p>
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
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="copyright-section">
            <p>&copy; {currentYear} Quick Kerala Holidays. All rights reserved.</p>
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