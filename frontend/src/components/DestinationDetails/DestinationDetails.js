"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./DestinationDetails.css";

export default function DestinationDetails({ destination, onBack }) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const destinationStats = {
    rating: destination.rating || 4.8,
    reviews: 1247,
    bestSeason: destination.bestTime || "October - March",
    popularity: "Very High",
  };

  const packages = destination.details?.packages || [
    {
      id: 1,
      name: "Essential Escape",
      slug: "essential-3d2n",
      days: 3,
      nights: 2,
      tag: "Most Popular",
    },
    {
      id: 2,
      name: "Premium Explorer",
      slug: "premium-5d4n",
      days: 5,
      nights: 4,
      tag: "Best Value",
    },
    {
      id: 3,
      name: "Luxury Retreat",
      slug: "luxury-7d6n",
      days: 7,
      nights: 6,
      tag: "Ultimate Luxury",
    },
  ];

  const highlights = destination.highlights || [
    "Breathtaking Landscapes",
    "Rich Cultural Heritage",
    "Adventure Activities",
    "Local Cuisine Experience",
    "Luxury Accommodation",
    "Guided Tours",
  ];

  const safeName = destination.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, ""); // remove special characters

  const images = destination.detailImages || [
    {
      id: 1,
      src: `/assets/destinations/details/${safeName}-hero.jpg`,
      type: "landscape",
      caption: `${destination.name} - Scenic View`,
    },
    {
      id: 2,
      src: `/assets/destinations/details/${safeName}-gallery1.jpg`,
      type: "culture",
      caption: `${destination.name} - Local Life`,
    },
    {
      id: 3,
      src: `/assets/destinations/details/${safeName}-gallery2.jpg`,
      type: "nature",
      caption: `${destination.name} - Nature & Experience`,
    },
  ];
  console.log("Loading destination images:", images);
  // ✅ Convert string URLs into full image objects
  const formattedImages = images.map((img, i) =>
    typeof img === "string"
      ? {
          id: i + 1,
          src: img,
          type: i === 0 ? "landscape" : i === 1 ? "culture" : "nature",
          caption: `${destination.name} - Image ${i + 1}`,
        }
      : img
  );

  console.log("Formatted destination images:", formattedImages);

  const experiences = [
    {
      icon: "🚡",
      title: "Mountain Adventure",
      description: "Cable car rides and hiking through pristine landscapes",
      duration: "4-6 hours",
      difficulty: "Moderate",
      color: "#3B82F6",
    },
    {
      icon: "🏛️",
      title: "Cultural Heritage",
      description: "Explore ancient temples and local traditions",
      duration: "Full day",
      difficulty: "Easy",
      color: "#8B5CF6",
    },
    {
      icon: "🍽️",
      title: "Culinary Journey",
      description: "Cooking classes and authentic local cuisine tasting",
      duration: "3-4 hours",
      difficulty: "Easy",
      color: "#EF4444",
    },
    {
      icon: "🛶",
      title: "Water Activities",
      description: "Boat tours and water sports in crystal clear waters",
      duration: "2-3 hours",
      difficulty: "Beginner",
      color: "#06B6D4",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDestinationImage = (destName) => {
    const imageMap = {
      Munnar: "/images/destinations/munnar-tea-gardens.jpg",
      Wayanad: "/images/destinations/wayanad.jpg",
      Alleppey: "/images/destinations/alleppey.jpg",
      Kovalam: "/images/destinations/kovalam.jpg",
    };
    return imageMap[destName] || `/images/destinations/default.jpg`;
  };

  return (
    <div className="destination-details">
      {/* HERO SECTION */}
      <section className="destination-hero-section">
        <div className="destination-hero-background">
          <div className="destination-hero-gradient"></div>
          <div className="destination-hero-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container">
          <nav
            className={`destination-hero-nav ${isScrolled ? "scrolled" : ""}`}
          >
            <button onClick={onBack} className="back-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Destinations
            </button>

            <div className="nav-actions">
              <button className="share-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 5L9 12M9 12L15 19"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Share
              </button>

              <button className="wishlist-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Save
              </button>
            </div>
          </nav>

          <div className="destination-hero-content">
            <h1 className="destination-hero-title">
              <span className="title-main">{destination.name}</span>
              <span className="title-glow"></span>
            </h1>
            <p className="destination-hero-description">
              {destination.shortDesc}
            </p>
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-value">{destinationStats.rating}</div>
                  <div className="stat-label">Rating</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-value">1.2K+</div>
                  <div className="stat-label">Travelers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <div className="stat-value">Top 5%</div>
                  <div className="stat-label">Global Rank</div>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <button
                className="cta-button primary"
                onClick={() => setShowBookingModal(true)}
              >
                Plan Your Trip
              </button>
              <button className="cta-button secondary">View Packages</button>
            </div>
          </div>
        </div>

        <div className="destination-hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>
      {/* MAIN CONTENT */}
      <main className="details-main">
        <div className="container">
          <div className="content-layout">
            {/* LEFT COLUMN */}
            <div className="content-column">
              {/* IMAGE GALLERY SECTION */}
              <section className="image-gallery-section">
                <div className="gallery-header">
                  <h2>Visual Journey</h2>
                  <div className="gallery-controls">
                    <button
                      className="gallery-nav prev"
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev > 0 ? prev - 1 : formattedImages.length - 1
                        )
                      }
                    >
                      ←
                    </button>
                    <button
                      className="gallery-nav next"
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev < formattedImages.length - 1 ? prev + 1 : 0
                        )
                      }
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="main-gallery">
                  <div className="featured-image">
                    <div
                      className="image-container"
                      style={{
                        transform: `translateX(-${activeImage * 100}%)`,
                      }}
                    >
                      {formattedImages.map((image, index) => (
                        <div
                          key={`${image.id || index}-${destination.name}`}
                          className="gallery-slide"
                        >
                          <div className="image-wrapper">
                            <img
                              src={image.src}
                              alt={image.caption || destination.name}
                              className="gallery-image large"
                            />
                            <div className="image-overlay">
                              <span className="image-type">{image.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="gallery-indicators">
                    {formattedImages.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${
                          index === activeImage ? "active" : ""
                        }`}
                        onClick={() => setActiveImage(index)}
                      />
                    ))}
                  </div>

                  {formattedImages.map((image, index) => (
                    <button
                      key={`${destination.name}-${image.id || index}-thumb`}
                      className={`thumbnail ${
                        index === activeImage ? "active" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <div className="thumbnail-wrapper">
                        <img
                          src={image.src}
                          alt={`${destination.name} thumbnail ${index + 1}`}
                          className="gallery-thumbnail-image"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* DESCRIPTION SECTION */}
              <section className="description-section">
                <div className="section-header">
                  <h2>About {destination.name}</h2>
                  <div className="section-decoration">
                    <div className="decoration-line"></div>
                    <div className="decoration-dot"></div>
                  </div>
                </div>

                <p className="description-text">
                  {destination.details?.description ||
                    "Nestled in the heart of breathtaking landscapes, this destination offers an unparalleled experience for travelers seeking adventure, culture, and relaxation. From majestic mountains to pristine beaches, every moment here is a memory in the making."}
                </p>

                <div className="highlights-showcase">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="highlight-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="highlight-glow"></div>
                      <div className="highlight-icon">✨</div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* EXPERIENCES SECTION */}
              <section className="experiences-section">
                <div className="section-header">
                  <h2>Unforgettable Experiences</h2>
                  <span className="section-subtitle">
                    Curated activities for every traveler
                  </span>
                </div>

                <div className="experiences-showcase">
                  {experiences.map((experience, index) => (
                    <div
                      key={index}
                      className="experience-card"
                      style={{ "--accent-color": experience.color }}
                    >
                      <div className="experience-header">
                        <div
                          className="experience-icon"
                          style={{ backgroundColor: experience.color }}
                        >
                          {experience.icon}
                        </div>
                        <div
                          className="experience-badge"
                          style={{ backgroundColor: experience.color }}
                        >
                          {experience.difficulty}
                        </div>
                      </div>

                      <div className="experience-content">
                        <h3>{experience.title}</h3>
                        <p>{experience.description}</p>

                        <div className="experience-meta">
                          <span className="duration">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 8V12L15 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                            {experience.duration}
                          </span>

                          <button className="experience-cta">
                            Learn More
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div
                        className="experience-glow"
                        style={{ backgroundColor: experience.color }}
                      ></div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            {/* RIGHT COLUMN (SIDEBAR) */}
            <div className="sidebar-column">
              {/* PACKAGES WIDGET */}
              <div className="packages-widget">
                <div className="widget-header">
                  <div className="widget-title">
                    <h3>Journey Packages</h3>
                    <div className="title-ornament">✨</div>
                  </div>
                  <div className="packages-badge">
                    <span>{packages.length} Options</span>
                  </div>
                </div>

                <div className="packages-showcase">
                  {packages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className={`package-card ${
                        selectedPackage === pkg.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {pkg.tag && (
                        <div className="package-ribbon">
                          <span>{pkg.tag}</span>
                        </div>
                      )}

                      <div className="package-header">
                        <h4>{pkg.name}</h4>
                        <div className="package-duration">
                          <span className="days">{pkg.days} Days</span>
                          <span className="nights">{pkg.nights} Nights</span>
                        </div>
                      </div>

                      <div className="package-features">
                        <div className="feature">
                          <div className="feature-icon">🏨</div>
                          <span>Luxury Stay</span>
                        </div>
                        <div className="feature">
                          <div className="feature-icon">🍽️</div>
                          <span>Gourmet Dining</span>
                        </div>
                        <div className="feature">
                          <div className="feature-icon">🚗</div>
                          <span>Private Transport</span>
                        </div>
                        <div className="feature">
                          <div className="feature-icon">🎯</div>
                          <span>Expert Guides</span>
                        </div>
                      </div>

                      <div className="package-footer">
                        <button
                          className="select-package-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowBookingModal(true);
                          }}
                        >
                          <span>Select Package</span>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="package-glow"></div>
                    </div>
                  ))}
                </div>

                <div className="widget-footer">
                  <button className="custom-trip-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4V20M4 12H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Customize Your Trip
                  </button>
                </div>
              </div>

              {/* QUICK FACTS */}
              <div className="quick-facts-widget">
                <div className="widget-header">
                  <h4>Destination Insights</h4>
                  <div className="info-icon">ℹ️</div>
                </div>

                <div className="facts-grid">
                  <div className="fact-item">
                    <div className="fact-icon">🌡️</div>
                    <div className="fact-content">
                      <span className="fact-label">Climate</span>
                      <span className="fact-value">Mild & Pleasant</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">🗣️</div>
                    <div className="fact-content">
                      <span className="fact-label">Language</span>
                      <span className="fact-value">English, Local</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">💵</div>
                    <div className="fact-content">
                      <span className="fact-label">Currency</span>
                      <span className="fact-value">Local</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">⏰</div>
                    <div className="fact-content">
                      <span className="fact-label">Time Zone</span>
                      <span className="fact-value">GMT +5:30</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">📅</div>
                    <div className="fact-content">
                      <span className="fact-label">Best Season</span>
                      <span className="fact-value">{destination.bestTime}</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">⭐</div>
                    <div className="fact-content">
                      <span className="fact-label">Rating</span>
                      <span className="fact-value">{destination.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTACT CTA */}
              <div className="contact-cta">
                <div className="cta-content">
                  <div className="cta-icon">💬</div>
                  <h5>Need Help Planning?</h5>
                  <p>
                    Our travel experts are here to create your perfect itinerary
                  </p>
                  <button className="cta-button">
                    Contact Expert
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="cta-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowBookingModal(false)}
        >
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Start Your Journey</h3>
              <button
                className="close-button"
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="package-summary">
                <h4>Selected Experience</h4>
                <div className="summary-highlight">
                  <span className="package-name">
                    {packages.find((p) => p.id === selectedPackage)?.name}
                  </span>
                  <span className="package-duration">
                    {packages.find((p) => p.id === selectedPackage)?.days} Days
                    • {packages.find((p) => p.id === selectedPackage)?.nights}{" "}
                    Nights
                  </span>
                </div>
              </div>

              <div className="booking-form">
                <h4>Contact Information</h4>
                <div className="form-grid">
                  <input type="text" placeholder="Full Name" />
                  <input type="email" placeholder="Email Address" />
                  <input type="tel" placeholder="Phone Number" />
                  <input type="text" placeholder="Travel Dates" />
                  <input type="number" placeholder="Number of Travelers" />
                  <select>
                    <option>Package Preference</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id}>{pkg.name}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Additional Requirements"
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="confirm-btn">Send Inquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
