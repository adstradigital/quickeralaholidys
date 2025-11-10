// components/TripPackages.jsx
"use client";

import { useState, useEffect } from "react";
import "./Packages.css";

export default function TripPackages() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);

  const packages = [
    {
      id: 1,
      title: "Classic Kerala Backwaters",
      location: "Alleppey, Kerala",
      description:
        "Experience the serene backwaters of Kerala with traditional houseboat stay, village tours, and authentic local cuisine.",
      price: 12499,
      originalPrice: 15999,
      discount: "22% OFF",
      duration: "3 Days / 2 Nights",
      groupSize: "2-4 People",
      rating: 4.9,
      reviews: 284,
      type: "kerala",
      badge: "Popular",
      image: "/assets/pkg/backwaters_kerala.png",
      features: [
        "Houseboat Stay",
        "Traditional Lunch",
        "Village Tour",
        "Sunset Cruise",
      ],
      featured: true,
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      location: "Kochi, Kerala",
      description:
        "Rejuvenate your mind and body with authentic Ayurvedic treatments, yoga sessions, and organic meals in peaceful surroundings.",
      price: 18999,
      originalPrice: 24999,
      discount: "24% OFF",
      duration: "5 Days / 4 Nights",
      groupSize: "1-2 People",
      rating: 4.8,
      reviews: 156,
      type: "ayurvedic",
      badge: "Wellness",
      image: "/assets/pkg/retreat_ayurvedic.png",
      features: [
        "Daily Yoga",
        "Ayurvedic Massages",
        "Meditation",
        "Organic Meals",
      ],
    },
    {
      id: 3,
      title: "Romantic Honeymoon Escape",
      location: "Munnar, Kerala",
      description:
        "Perfect romantic getaway with private villas, candlelight dinners, couple spa treatments, and misty mountain views.",
      price: 22999,
      originalPrice: 28999,
      discount: "21% OFF",
      duration: "4 Days / 3 Nights",
      groupSize: "2 People",
      rating: 4.9,
      reviews: 203,
      type: "honeymoon",
      badge: "Romantic",
      image: "/assets/pkg/honey_normal.png",
      features: [
        "Private Villa",
        "Candlelight Dinner",
        "Couple Spa",
        "Photo Session",
      ],
    },
    {
      id: 4,
      title: "Kerala Hill Station Tour",
      location: "Wayanad, Kerala",
      description:
        "Explore the lush green hills, waterfalls, and wildlife sanctuaries of Kerala's beautiful hill stations.",
      price: 15999,
      originalPrice: 19999,
      discount: "20% OFF",
      duration: "4 Days / 3 Nights",
      groupSize: "4-6 People",
      rating: 4.7,
      reviews: 192,
      type: "kerala",
      badge: "Adventure",
      image: "/assets/pkg/hills_kerala.png",
      features: [
        "Hill Station Visit",
        "Waterfall Tour",
        "Wildlife Safari",
        "Trekking",
      ],
    },
    {
      id: 5,
      title: "Luxury Ayurvedic Rejuvenation",
      location: "Kovalam, Kerala",
      description:
        "Premium Ayurvedic experience with luxury accommodation, personalized treatments, and beachside relaxation.",
      price: 34999,
      originalPrice: 44999,
      discount: "22% OFF",
      duration: "7 Days / 6 Nights",
      groupSize: "1-2 People",
      rating: 4.9,
      reviews: 178,
      type: "ayurvedic",
      badge: "Premium",
      image: "/assets/pkg/luxury_ayurvedic.png",
      features: [
        "Luxury Villa",
        "Personalized Treatments",
        "Beach Access",
        "Gourmet Meals",
      ],
    },
    {
      id: 6,
      title: "Honeymoon Beach Paradise",
      location: "Varkala, Kerala",
      description:
        "Romantic beachside escape with cliff views, private beach dinners, and traditional Kerala experiences.",
      price: 27999,
      originalPrice: 34999,
      discount: "20% OFF",
      duration: "5 Days / 4 Nights",
      groupSize: "2 People",
      rating: 4.8,
      reviews: 134,
      type: "honeymoon",
      badge: "Beach",
      image: "/assets/pkg/honey_beach.png",
      features: [
        "Beach Villa",
        "Cliff Views",
        "Private Dinner",
        "Cultural Show",
      ],
    },
    {
      id: 7,
      title: "Monsoon Magic Kerala",
      location: "Thekkady, Kerala",
      description:
        "Experience Kerala's monsoon beauty with lush greenery, spice plantation tours, and traditional Kathakali performances.",
      price: 13999,
      originalPrice: 17999,
      discount: "22% OFF",
      duration: "4 Days / 3 Nights",
      groupSize: "2-4 People",
      rating: 4.6,
      reviews: 98,
      type: "seasonal",
      badge: "Seasonal",
      image: "/assets/pkg/monsoon_kerala.png",
      features: [
        "Spice Plantation",
        "Kathakali Show",
        "Monsoon Trekking",
        "Traditional Stay",
      ],
    },
    {
      id: 8,
      title: "Summer Hill Escape",
      location: "Munnar & Thekkady",
      description:
        "Escape the summer heat with cool hill station retreats, tea garden tours, and wildlife experiences.",
      price: 19999,
      originalPrice: 24999,
      discount: "20% OFF",
      duration: "5 Days / 4 Nights",
      groupSize: "2-4 People",
      rating: 4.7,
      reviews: 112,
      type: "seasonal",
      badge: "Summer Special",
      image: "/assets/pkg/summer_hills.png",
      features: [
        "Tea Garden Tour",
        "Wildlife Sanctuary",
        "Boating",
        "Cool Climate",
      ],
    },
  ];

  const filters = [
    {
      id: "all",
      name: "All Packages",
      icon: "🌍",
      count: packages.length
    },
    {
      id: "kerala",
      name: "Kerala Holidays",
      icon: "🏞️",
      count: packages.filter(pkg => pkg.type === "kerala").length
    },
    {
      id: "honeymoon",
      name: "Honeymoon",
      icon: "💖",
      count: packages.filter(pkg => pkg.type === "honeymoon").length
    },
    {
      id: "ayurvedic",
      name: "Ayurvedic",
      icon: "🌿",
      count: packages.filter(pkg => pkg.type === "ayurvedic").length
    },
    {
      id: "seasonal",
      name: "Seasonal",
      icon: "🌦️",
      count: packages.filter(pkg => pkg.type === "seasonal").length
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredPackages =
    activeFilter === "all"
      ? packages
      : packages.filter((pkg) => pkg.type === activeFilter);

  const regularPackages = filteredPackages;

  // Glass morphism backgrounds based on package type
  const getGlassBackground = (type) => {
    switch (type) {
      case "kerala":
        return "linear-gradient(135deg, rgba(30, 107, 82, 0.2) 0%, rgba(45, 147, 108, 0.2) 100%)";
      case "honeymoon":
        return "linear-gradient(135deg, rgba(214, 51, 132, 0.2) 0%, rgba(230, 133, 181, 0.2) 100%)";
      case "ayurvedic":
        return "linear-gradient(135deg, rgba(25, 135, 84, 0.2) 0%, rgba(32, 201, 151, 0.2) 100%)";
      case "seasonal":
        return "linear-gradient(135deg, rgba(41, 128, 185, 0.2) 0%, rgba(109, 213, 250, 0.2) 100%)";
      default:
        return "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)";
    }
  };

  const getFilterColor = (filterId) => {
    switch (filterId) {
      case "kerala":
        return "linear-gradient(135deg, #1e6b52, #4bb543)";
      case "honeymoon":
        return "linear-gradient(135deg, #d63384, #e685b5)";
      case "ayurvedic":
        return "linear-gradient(135deg, #198754, #20c997)";
      case "seasonal":
        return "linear-gradient(135deg, #2980b9, #6dd5fa)";
      default:
        return "linear-gradient(135deg, #667eea, #764ba2)";
    }
  };

  if (!isClient) {
    return (
      <section className="trip-packages">
        <div className="trip-packages__container">
          <div className="trip-packages__header">
            <div className="trip-packages__badge">
              <div className="trip-packages__badge-dot" />
              <span className="trip-packages__badge-text">Kerala Packages</span>
            </div>
            <h2 className="trip-packages__title">
              Amazing Kerala Trip Packages
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="trip-packages">
      {/* Animated Background Elements */}
      <div className="trip-packages__bg-elements">
        <div className="trip-packages__bg-element-1"></div>
        <div className="trip-packages__bg-element-2"></div>
        <div className="trip-packages__bg-element-3"></div>
      </div>

      <div className="trip-packages__container">
        {/* Header */}
        <div className="trip-packages__header">
          <div className="trip-packages__badge">
            <div className="trip-packages__badge-dot" />
            <span className="trip-packages__badge-text">Kerala Packages</span>
          </div>

          <h2 className="trip-packages__title">Amazing Kerala Trip Packages</h2>

          <p className="trip-packages__subtitle">
            Discover the magic of God's Own Country with our carefully curated
            Kerala packages. From serene backwaters to luxurious Ayurvedic
            retreats and romantic honeymoons.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="trip-packages__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`trip-packages__filter ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                background: activeFilter === filter.id ? getFilterColor(filter.id) : undefined
              }}
            >
              <span className="trip-packages__filter-icon">{filter.icon}</span>
              <span className="trip-packages__filter-text">{filter.name}</span>
              <span className="trip-packages__filter-count">
                ({filter.count})
              </span>
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="trip-packages__grid">
          {regularPackages.length > 0 ? (
            regularPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="trip-packages__card"
                style={{
                  background: getGlassBackground(pkg.type),
                }}
              >
                {/* Image Section with Glass Overlay */}
                <div className="trip-packages__card-image-section">
                  <div
                    className="trip-packages__card-image"
                    style={{
                      backgroundImage: `url(${pkg.image})`,
                    }}
                  >
                    {/* Fallback if image doesn't load */}
                    <div className="trip-packages__image-fallback">
                      <div className="trip-packages__fallback-icon">
                        {pkg.type === "kerala" && "🏞️"}
                        {pkg.type === "honeymoon" && "💖"}
                        {pkg.type === "ayurvedic" && "🌿"}
                        {pkg.type === "seasonal" && "🌦️"}
                      </div>
                    </div>
                  </div>

                  {/* Glass Overlay */}
                  <div className="trip-packages__card-overlay">
                    <div className="trip-packages__card-badge">{pkg.badge}</div>
                    <div className="trip-packages__card-rating">
                      <span className="trip-packages__card-stars">★</span>
                      <span className="trip-packages__card-rating-text">
                        {pkg.rating}
                      </span>
                      <span className="trip-packages__card-reviews">
                        ({pkg.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="trip-packages__card-content">
                  <div className="trip-packages__card-header">
                    <div className="trip-packages__card-info">
                      <h3 className="trip-packages__card-title">{pkg.title}</h3>
                      <div className="trip-packages__card-location">
                        <svg
                          className="trip-packages__card-location-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {pkg.location}
                      </div>
                    </div>
                  </div>

                  <p className="trip-packages__card-description">
                    {pkg.description}
                  </p>

                  <div className="trip-packages__card-details">
                    <div className="trip-packages__detail">
                      <svg
                        className="trip-packages__detail-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="trip-packages__detail-text">
                        {pkg.duration}
                      </span>
                    </div>
                    <div className="trip-packages__detail">
                      <svg
                        className="trip-packages__detail-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="trip-packages__detail-text">
                        {pkg.groupSize}
                      </span>
                    </div>
                  </div>

                  <div className="trip-packages__card-footer">
                    <div className="trip-packages__card-price">
                      <div className="trip-packages__price-discount">
                        {pkg.discount}
                      </div>
                      <div className="trip-packages__price-wrapper">
                        <span className="trip-packages__price-old">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                        <span className="trip-packages__price-new">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      className="trip-packages__card-cta"
                      onClick={() => {
                        window.location.href = "/packages";
                      }}
                    >
                      Explore
                      <svg
                        className="trip-packages__cta-icon"
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
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="trip-packages__empty">
              <div className="trip-packages__empty-icon">🔍</div>
              <h3 className="trip-packages__empty-title">No Packages Found</h3>
              <p className="trip-packages__empty-text">
                We couldn't find any packages matching your selected filter.
                Please try another category.
              </p>
              <button
                className="trip-packages__empty-cta"
                onClick={() => setActiveFilter("all")}
              >
                Show All Packages
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}