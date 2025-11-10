"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./Contacts.css";

const CompactContact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "I want to know more about Kerala packages",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Handle form submission
    };

    const popularDestinations = [
        { name: "Munnar", icon: "⛰️" },
        { name: "Alleppey", icon: "🚤" },
        { name: "Kovalam", icon: "🏖️" },
        { name: "Thekkady", icon: "🐘" },
        { name: "Wayanad", icon: "🌿" },
        { name: "Kochi", icon: "🏛️" },
    ];

    return (
        <div className="compact-contact-horizontal">
            <motion.div
                className="contact-card-horizontal"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Left Side - Brand & Info */}
                <div className="contact-left">
                    {/* Header with Branding */}
                    <div className="contact-header-horizontal">
                        <div className="brand-section-horizontal">
                            <div className="logo-horizontal">🌴</div>
                            <div className="brand-info-horizontal">
                                <h3>Quickerala Holidays</h3>
                                <p>Kerala's Trusted Travel Partner</p>
                            </div>
                        </div>
                        <motion.div
                            className="offer-badge-horizontal"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            🎉 15% Off First Booking!
                        </motion.div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="trust-indicators-horizontal">
                        <div className="trust-item-horizontal">
                            <span className="trust-icon-horizontal">⭐</span>
                            <span>4.9/5 (2.1K Reviews)</span>
                        </div>
                        <div className="trust-item-horizontal">
                            <span className="trust-icon-horizontal">⚡</span>
                            <span>Response in 30 mins</span>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="quick-stats-horizontal">
                        <div className="stat-horizontal">
                            <span className="stat-number-horizontal">12+</span>
                            <span className="stat-label-horizontal">Years Experience</span>
                        </div>
                        <div className="stat-horizontal">
                            <span className="stat-number-horizontal">5K+</span>
                            <span className="stat-label-horizontal">Happy Travelers</span>
                        </div>
                        <div className="stat-horizontal">
                            <span className="stat-number-horizontal">50+</span>
                            <span className="stat-label-horizontal">Packages</span>
                        </div>
                    </div>

                    {/* Popular Destinations */}
                    <div className="destinations-section-horizontal">
                        <h4>Popular Destinations</h4>
                        <div className="destinations-grid-horizontal">
                            {popularDestinations.map((dest, index) => (
                                <motion.div
                                    key={dest.name}
                                    className="destination-chip-horizontal"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="dest-icon-horizontal">{dest.icon}</span>
                                    <span>{dest.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Package Types */}
                    <div className="package-types-horizontal">
                        <h4>Package Types</h4>
                        <div className="package-tags-horizontal">
                            <span className="package-tag-horizontal">🏞️ Nature</span>
                            <span className="package-tag-horizontal">🏖️ Beach</span>
                            <span className="package-tag-horizontal">🌅 Luxury</span>
                            <span className="package-tag-horizontal">👨‍👩‍👧‍👦 Family</span>
                            <span className="package-tag-horizontal">💑 Honeymoon</span>
                            <span className="package-tag-horizontal">🚶‍♂️ Adventure</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form & Contact */}
                <div className="contact-right">
                    {/* Enhanced Compact Form */}
                    <form className="compact-form-horizontal" onSubmit={handleSubmit}>
                        <div className="form-header-horizontal">
                            <h3>Get Your Custom Quote</h3>
                            <p>Fill in your details and we'll get back within 30 minutes</p>
                        </div>

                        <div className="form-row-horizontal">
                            <div className="input-group-horizontal">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="form-input-horizontal"
                                    required
                                />
                            </div>
                            <div className="input-group-horizontal">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="form-input-horizontal"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group-horizontal">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="form-input-horizontal"
                                required
                            />
                        </div>

                        <div className="input-group-horizontal">
                            <select
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className="form-select-horizontal"
                                required
                            >
                                <option value="">Select Destination</option>
                                <option value="munnar">Munnar Hill Station</option>
                                <option value="alleppey">Alleppey Backwaters</option>
                                <option value="kovalam">Kovalam Beach</option>
                                <option value="thekkady">Thekkady Wildlife</option>
                                <option value="wayanad">Wayanad Nature</option>
                                <option value="custom">Custom Package</option>
                            </select>
                        </div>

                        <motion.button
                            type="submit"
                            className="cta-button-horizontal"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Get Custom Quote</span>
                            <svg
                                className="button-icon-horizontal"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </motion.button>
                    </form>

                    {/* Enhanced Quick Contact */}
                    <div className="quick-contact-horizontal">
                        <motion.div
                            className="contact-option-horizontal"
                            whileHover={{ scale: 1.05, backgroundColor: "#dcfce7" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="icon-horizontal">📞</span>
                            <div className="contact-info-horizontal">
                                <span className="contact-label-horizontal">Call Now</span>
                                <span className="contact-value-horizontal">
                                    +91 98765 43210
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="contact-option-horizontal"
                            whileHover={{ scale: 1.05, backgroundColor: "#dcfce7" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="icon-horizontal">💬</span>
                            <div className="contact-info-horizontal">
                                <span className="contact-label-horizontal">WhatsApp</span>
                                <span className="contact-value-horizontal">Quick Response</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Info */}
                    <div className="additional-info-horizontal">
                        <div className="info-item-horizontal">
                            <span className="info-icon-horizontal">🛡️</span>
                            <span>Verified & Safe</span>
                        </div>
                        <div className="info-item-horizontal">
                            <span className="info-icon-horizontal">💳</span>
                            <span>Easy EMI Options</span>
                        </div>
                        <div className="info-item-horizontal">
                            <span className="info-icon-horizontal">🏆</span>
                            <span>Award Winning</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CompactContact;
