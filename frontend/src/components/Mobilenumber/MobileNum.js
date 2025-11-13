'use client';

import React, { useState, useEffect } from 'react';
import './MobileNum.css';
import { FaPhone, FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingPhone = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Phone numbers
  const phoneNumber = '+919447823767'; // For calling
  const whatsappNumber = '9778436950'; // 👈 CHANGE THIS NUMBER - WhatsApp profile number (without + sign)

  // Show/hide based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I am interested in Kerala tour packages. Can you help me?');
    // This line opens WhatsApp with the number specified in whatsappNumber variable
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Floating Button */}
      <div className={`floating-phone-container ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="floating-phone-btn main-btn"
          onClick={toggleExpanded}
          aria-label="Contact us"
        >
          {isExpanded ? <FaTimes /> : <FaPhone />}
          <span className="phone-pulse"></span>
        </button>

        {/* Expanded Menu */}
        {isExpanded && (
          <div className="floating-phone-menu">
            <button 
              className="floating-phone-option call-btn"
              onClick={handleCall}
              aria-label="Call us"
            >
              <FaPhone className="option-icon" />
              <div className="option-details">
                <span className="option-label">Call Now</span>
                <span className="option-number">+91 9447823767</span>
              </div>
            </button>

            <button 
              className="floating-phone-option whatsapp-btn"
              onClick={handleWhatsApp}
              aria-label="WhatsApp us"
            >
              <FaWhatsapp className="option-icon" />
              <div className="option-details">
                <span className="option-label">WhatsApp</span>
                <span className="option-number">Chat with us</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div 
          className="floating-phone-backdrop"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default FloatingPhone;
