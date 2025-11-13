"use client";

import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";
import "./HeroSection.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTimes,
  FaGift,
} from "react-icons/fa";

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [hasSeenOffer, setHasSeenOffer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const heroRef = useRef(null);
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Special Offers", href: "/specialoffers" },
    { name: "Packages", href: "/packages" },
    { name: "Discover Kerala", href: "/destinations" },
    { name: "Plan Your Trip", href: "/PlanYourTrip" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contacts" },
  ];

  const texts = [
    "Serene Backwaters",
    "Lush Hill Stations",
    "Pristine Beaches",
    "Rich Culture",
    "Exotic Wildlife",
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Perfect blend of adventure and relaxation. Amazing tour guides!",
      author: "Lisa, Australia",
      rating: "5/5",
      videoUrl: "/assets/videos/testimonial5.mp4",
      thumbnail: "/assets/testimonials/test.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1464822759844-4c0a1e853086?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      quote: "Best Kerala experience ever! The backwaters were magical.",
      author: "Sarah, UK Traveler",
      rating: "4.9/5",
      videoUrl: "/assets/videos/testimonial1.mp4",
      thumbnail: "/assets/testmonials/test1.png",
      fallbackImage: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      quote: "Unforgettable journey through God's Own Country. Highly recommended!",
      author: "Michael, USA",
      rating: "5/5",
      videoUrl: "/assets/videos/testimonial2.mp4",
      thumbnail: "/assets/testmonials/test2.png",
      fallbackImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      quote: "The houseboat stay in Alleppey was the highlight of our trip!",
      author: "Priya, India",
      rating: "4.8/5",
      videoUrl: "/assets/videos/testimonial4.mp4",
      thumbnail: "/assets/testmonials/test3.png",
      fallbackImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      quote: "Kerala's nature and hospitality left us speechless. Will return!",
      author: "Carlos, Spain",
      rating: "4.9/5",
      videoUrl: "/assets/videos/testimonial3.mp4",
      thumbnail: "/assets/testmonials/test4.png",
      fallbackImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  ];

  const socialMedia = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      color: "#E4405F",
      url: "https://www.instagram.com/quickeralaholidays/",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      color: "#1877F2",
      url: "https://www.facebook.com/QuickeralaHolidays/",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      color: "#FF0000",
      url: "https://youtube.com",
    },
    {
      name: "Twitter",
      icon: <FaXTwitter />,
      color: "#000101ff",
      url: "https://x.com/qkeralaholidays",
    },
  ];

  const promoCode = "WELCOME20";
  const discountPercentage = 20;

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % 5);
    }, 20000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    const offerTimer = setTimeout(() => {
      if (!user) {
        setShowOfferPopup(true);
      }
    }, 20000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(textInterval);
      clearInterval(testimonialInterval);
      clearTimeout(offerTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user]);

  const handleBookNow = () => {
    window.location.href = "/booking";
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleCloseOfferPopup = () => {
    setShowOfferPopup(false);
    setHasSeenOffer(true);
    localStorage.setItem("hasSeenOfferPopup", "true");
  };

  const handleCopyPromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    alert(`Promo code ${promoCode} copied to clipboard!`);
  };

  const handleRegisterNow = () => {
    handleCloseOfferPopup();
    window.location.href = "/register";
  };

  const handleVideoClick = async (testimonial) => {
    try {
      // Check if video exists before trying to play
      const response = await fetch(testimonial.videoUrl, { method: 'HEAD' });
      if (response.ok) {
        setSelectedVideo(testimonial.videoUrl);
        setVideoError(false);
      } else {
        setVideoError(true);
        // Show fallback image in modal instead
        setSelectedVideo(null);
        // You can show a message or fallback content here
        console.log('Video not found, showing fallback');
      }
    } catch (error) {
      setVideoError(true);
      console.log('Video error:', error);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    // You can add a user notification here if needed
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setVideoError(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (window.innerWidth <= 768 && isProfileOpen) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isProfileOpen]);

  return (
    <section ref={heroRef} className="hero-section">
      {/* Special Offer Popup */}
      {showOfferPopup && (
        <div className="offer-popup-overlay">
          <div className="offer-popup">
            <button
              className="offer-popup-close"
              onClick={handleCloseOfferPopup}
              aria-label="Close offer popup"
            >
              <FaTimes />
            </button>

            <div className="offer-popup-content">
              <div className="offer-icon">
                <FaGift />
              </div>

              <h3 className="offer-title">Special Welcome Offer! 🎉</h3>

              <p className="offer-description">
                Register now and get{" "}
                <span className="highlight">{discountPercentage}% OFF</span> on
                your first booking with Kerala's best travel experiences!
              </p>

              <div className="promo-code-section">
                <label className="promo-code-label">Your Promo Code:</label>
                <div className="promo-code-container">
                  <span className="promo-code">{promoCode}</span>
                  <button
                    className="copy-promo-btn"
                    onClick={handleCopyPromoCode}
                  >
                    Copy
                  </button>
                </div>
                <small className="promo-note">
                  *Valid for new registrations only. Apply at checkout.
                </small>
              </div>

              <div className="offer-actions">
                <button
                  className="offer-primary-btn"
                  onClick={handleRegisterNow}
                >
                  Register & Get {discountPercentage}% OFF
                </button>
                <button
                  className="offer-secondary-btn"
                  onClick={handleCloseOfferPopup}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header
        className={`hero-header ${isScrolled ? "scrolled" : ""} white-nav`}
      >
        <nav className="hero-nav">
          <div className="nav-content">
            <Link href="/" className="nav-logo">
              <img
                src="/assets/quikerala_logo.png"
                alt="Quick Kerala Holidays"
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className = "logo-fallback";
                  fallback.textContent = "QK Holidays";
                  e.target.parentNode.appendChild(fallback);
                }}
              />
            </Link>

            <div className="desktop-nav">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="nav-link">
                  {item.name}
                </Link>
              ))}

              <div className="auth-section">
                {user ? (
                  <div className="profile-section">
                    <button
                      className="profile-button"
                      onClick={handleProfileClick}
                    >
                      <div className="profile-avatar">
                        {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                      </div>
                      <span className="profile-name">
                        {user.name?.split(" ")[0] || "User"}
                      </span>
                    </button>

                    {isProfileOpen && (
                      <div className="profile-dropdown">
                        <div className="profile-info">
                          <div className="profile-dropdown-avatar">
                            {user.name?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </div>
                          <div className="profile-details">
                            <div className="profile-dropdown-name">
                              {user.name || "User"}
                            </div>
                            <div className="profile-dropdown-email">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="profile-menu">
                          <Link
                            href="/profile"
                            className="profile-menu-item"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            My Profile
                          </Link>
                          <Link
                            href="/bookings"
                            className="profile-menu-item"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            My Bookings
                          </Link>
                          <button
                            className="profile-menu-item logout-button"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="login-button">
                    Login
                  </Link>
                )}
              </div>

              <button className="book-button" onClick={handleBookNow}>
                Book Now
              </button>
            </div>

            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
                {isMenuOpen ? "✕" : "☰"}
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu white-nav-mobile">
              <div className="mobile-nav">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mobile-auth-section">
                  {user ? (
                    <>
                      <div className="mobile-profile-info">
                        <div className="mobile-profile-avatar">
                          {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </div>
                        <div className="mobile-profile-details">
                          <div className="mobile-profile-name">
                            {user.name || "User"}
                          </div>
                          <div className="mobile-profile-email">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="mobile-nav-link"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/bookings"
                        className="mobile-nav-link"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Bookings
                      </Link>
                      <button
                        className="mobile-logout-button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="mobile-login-button"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>

                <button
                  className="mobile-book-button"
                  onClick={() => {
                    handleBookNow();
                    setIsMenuOpen(false);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="hero-background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>

        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
        <div className="floating-particle particle-4"></div>
        <div className="floating-particle particle-5"></div>
      </div>

      <div className="hero-container">
        <div className="hero-left">
          <div className={`content-wrapper ${isVisible ? "visible" : ""}`}>
            <div className="animated-badge">
              <div className="badge-dot"></div>
              <span className="badge-text">Explore Kerala</span>
              <div className="badge-pulse"></div>
            </div>

            <div className="heading-container">
              <h1 className="main-heading">
                <span className="rotating-main-title">
                  {[
                    "Save Big on Kerala Holidays – Experience Nature, Culture & More",
                    "Celebrate Nature, Culture & Wellness – Unbeatable Kerala Holiday Deals!",
                    "Unlock Exclusive Kerala Packages & Unforgettable Experiences Today!",
                    "Explore God's Own Country with Our Kerala Holiday Sale Offers",
                    "Embark on the Journey of a Lifetime – Kerala Holiday Sale Awaits!",
                  ].map((title, index) => (
                    <span
                      key={index}
                      className={`main-title-item ${
                        index === currentText ? "active" : ""
                      }`}
                    >
                      {title}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            <div className="text-rotator-container">
              <div className="rotator-wrapper">
                <span className="static-text">Experience </span>
                <div className="rotating-text">
                  {texts.map((text, index) => (
                    <span
                      key={index}
                      className={`rotator-item ${
                        index === currentText ? "active" : ""
                      }`}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="description-container">
              <p className="description">
                Embark on an unforgettable journey through Kerala's breathtaking
                landscapes, where every moment reveals new wonders and every
                destination tells a unique story of nature's beauty and cultural
                richness.
              </p>
            </div>

            <div className="cta-container">
              <Link href="/destinations" className="cta-buttons primary">
                <span className="button-text">Start Your Journey</span>
                <span className="button-arrow">→</span>
                <div className="button-shine"></div>
              </Link>

              <Link href="/packages" className="cta-buttons secondary">
                <span className="button-text">View Packages</span>
                <div className="button-glow"></div>
              </Link>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Destinations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Travelers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="social-media-container">
            <div className="social-icons">
              {socialMedia.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-icon"
                  style={{
                    "--delay": index * 0.1 + "s",
                    "--brand-color": social.color,
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                >
                  <span className="icon-text">{social.icon}</span>
                  <div
                    className="icon-hover"
                    style={{ backgroundColor: social.color }}
                  ></div>
                </a>
              ))}
            </div>
          </div>

          {/* Updated Testimonial Carousel with Video Handling */}
          <div className="testimonial-carousel">
            <div className="carousel-track">
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentTestimonial;
                const angle = index * 222 - 150;

                return (
                  <div
                    key={testimonial.id}
                    className={`testimonial-item ${isActive ? "active" : ""}`}
                    style={{
                      transform: `rotate(${angle}deg) translateY(-180px) rotate(-${angle}deg)`,
                      "--angle": `${angle}deg`,
                    }}
                  >
                    <div className="testimonial-content">
                      <div className="video-placeholder">
                        {/* Thumbnail Image */}
                        <div className="testimonial-thumbnail">
                          <img 
                            src={testimonial.thumbnail} 
                            alt={testimonial.author}
                            className="thumbnail-image"
                            onError={(e) => {
                              // If thumbnail fails, use fallback image
                              e.target.src = testimonial.fallbackImage;
                            }}
                          />
                          
                          {/* Play Button Overlay */}
                          <div
                            className="play-button"
                            onClick={() => handleVideoClick(testimonial)}
                          >
                            <div className="play-icon">▶</div>
                          </div>

                        </div>

                        {/* Testimonial Info */}
                        <div className="video-overlay">
                          <div className="quote">"{testimonial.quote}"</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="carousel-controls">
              <button
                className="control-btn prev"
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
              >
                ‹
              </button>
              <div className="carousel-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${
                      index === currentTestimonial ? "active" : ""
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <button
                className="control-btn next"
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev + 1) % testimonials.length
                  )
                }
              >
                ›
              </button>
            </div>
          </div>

          <div className="floating-elements">
            <div className="floating-card card-1">
              <span className="card-icon">🌴</span>
              <span className="card-text">Eco Tourism</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">🏆</span>
              <span className="card-text">Award Winning</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">⭐</span>
              <span className="card-text">5 Star Rated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="indicator-line">
          <div className="indicator-dot"></div>
        </div>
      </div>

      {/* Video Modal with Error Handling */}
      {selectedVideo && (
        <div
          className="video-modal-overlay"
          onClick={closeVideoModal}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {videoError ? (
              <div className="video-error-message">
                <div className="error-icon">📹</div>
                <h3>Video Not Available</h3>
                <p>We're working on adding testimonial videos soon!</p>
                <p className="error-note">In the meantime, explore our amazing Kerala packages.</p>
                <button 
                  className="error-close-btn"
                  onClick={closeVideoModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="video-player"
                  onEnded={closeVideoModal}
                  onError={handleVideoError}
                />
                <button
                  className="close-btn"
                  onClick={closeVideoModal}
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}