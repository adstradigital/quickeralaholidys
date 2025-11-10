"use client"

import { motion } from 'framer-motion';
import './About.css';

const HomeAbout = () => {
  const stats = [
    { number: '12+', label: 'Years Experience', icon: '🎯' },
    { number: '50K+', label: 'Happy Travelers', icon: '😊' },
    { number: '500+', label: 'Destinations', icon: '📍' },
    { number: '24/7', label: 'Support', icon: '🛡️' }
  ];

  const values = [
    {
      title: 'Sustainable Tourism',
      description: 'Eco-friendly practices that preserve Kerala\'s natural beauty',
      icon: '🌿'
    },
    {
      title: 'Authentic Experiences',
      description: 'Curated journeys beyond typical tourist spots',
      icon: '🎭'
    },
    {
      title: 'Trust & Safety',
      description: 'Your safety and comfort are our top priorities',
      icon: '⭐'
    }
  ];

  return (
    <section className="home-about">
      <div className="container">
        {/* Header Section */}
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose Quick Kerala Holidays?</h2>
          <p>Experience Kerala like never before with our expert-curated journeys</p>
        </motion.div>

        <div className="about-content">
          {/* Left Side - Story & Stats */}
          <div className="about-left">
            <motion.div 
              className="story-section glass-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="section-icon">✨</div>
              <h3>Your Gateway to God's Own Country</h3>
              <p>
                Since 2010, Quick Kerala Holidays has been crafting unforgettable travel 
                experiences in Kerala. Born from a deep love for this beautiful land, we've 
                grown from a small family operation to one of Kerala's most trusted travel 
                partners.

                Our team of local experts ensures you discover the authentic Kerala - from 
                serene backwaters and misty hill stations to vibrant cultural experiences 
                and wildlife adventures.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="stats-grid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card glass-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Values */}
          <div className="about-right">
            <motion.div 
              className="values-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="section-header">
                <div className="section-icon">💎</div>
                <h3>Our Promise to You</h3>
              </div>
              <div className="values-grid">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="value-card glass-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="value-icon">{value.icon}</div>
                    <div className="value-content">
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="cta-section glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="cta-content">
                <div className="cta-icon">🚀</div>
                <h4>Ready to Explore Kerala?</h4>
                <p>Let us create your perfect Kerala itinerary</p>
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;