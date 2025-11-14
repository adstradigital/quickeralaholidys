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
  const [isMounted, setIsMounted] = useState(false); // Hydration fix

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const destinationStats = {
    rating: destination.rating || 4.8,
    reviews: 1247,
    bestSeason: destination.bestTime || "October - March",
    popularity: "Very High",
  };

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
    .replace(/[^\w-]/g, "");

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

  // Dynamically build experiences from destination data
  const experiences =
    destination.details?.unforgettableExperiences?.map((desc, index) => {
      const icons = ["🚡", "🏛️", "🍽️", "🛶"];
      const colors = ["#3B82F6", "#8B5CF6", "#EF4444", "#06B6D4"];
      return {
        icon: icons[index % icons.length],
        title: desc.split(",")[0],
        description: desc,
        duration: "Varies",
        difficulty: "Moderate",
        color: colors[index % colors.length],
      };
    }) || [];

  const insights = destination.details?.destinationInsights || {};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // You can optionally implement packages similarly if available

  return (
    <div className="destination-details">
      {/* HERO SECTION omitted for brevity */}

      {/* MAIN CONTENT */}
      <main className="details-main">
        <div className="container">
          <div className="content-layout">
            {/* LEFT COLUMN */}
            <div className="content-column">
              {/* IMAGE GALLERY */}
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
                      style={{ transform: `translateX(-${activeImage * 100}%)` }}
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
                    "Nestled in the heart of breathtaking landscapes, this destination offers unparalleled experiences for travelers."}
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
                          <span className="duration">{experience.duration}</span>
                          <button className="experience-cta">
                            Learn More
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
                      <span className="fact-value">{insights.climate || "N/A"}</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">🗣️</div>
                    <div className="fact-content">
                      <span className="fact-label">Language</span>
                      <span className="fact-value">{insights.language || "N/A"}</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">💵</div>
                    <div className="fact-content">
                      <span className="fact-label">Currency</span>
                      <span className="fact-value">{insights.currency || "N/A"}</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">⏰</div>
                    <div className="fact-content">
                      <span className="fact-label">Time Zone</span>
                      <span className="fact-value">{insights.timeZone || "N/A"}</span>
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-icon">📅</div>
                    <div className="fact-content">
                      <span className="fact-label">Best Season</span>
                      <span className="fact-value">{destination.bestTime || "N/A"}</span>
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
                  <p>Our travel experts are here to create your perfect itinerary</p>
                  <button className="cta-button">
                    Contact Expert
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
              {/* Booking form content (adjust based on your packages and form needs) */}
              <h4>Contact Information</h4>
              <form className="booking-form">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" required />
                <input type="text" placeholder="Travel Dates" />
                <input type="number" placeholder="Number of Travelers" min="1" />
                <textarea
                  placeholder="Additional Requirements"
                  rows="4"
                ></textarea>
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="confirm-btn">
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
