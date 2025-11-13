// components/TripOffers.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./SpecialOffer.css";

export default function TripOffers() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const handleExploreClick = (offerId) => {
    router.push(`/specialoffers`);
  };

  const handleBookClick = (offerId) => {
    router.push(`/booking?offer=${offerId}`);
  };

  const trips = [
    {
      id: 1,
      title: "Special Kerala",
      discount: "15% OFF",
      description:
        "Perfect escape covering Munnar tea gardens, Thekkady wildlife, and Alleppey backwaters with deluxe houseboat stay",
      validUntil: "2024-08-15",
      tag: "Weekend Special",
      color: "#F59E0B",
      lightColor: "#FFFBEB",
      relatedTripId: 1,
      packageDetails: "4 Nights 5 Days | Munnar 2N, Thekkady 1N, Alleppey 1N",
      startingPrice: "₹36,200",
    },
    {
      id: 2,
      title: "Honeymoon Special",
      discount: "20% OFF",
      description:
        "Experience the healing power of Ayurveda during Kerala's monsoon season with Munnar hills and backwater cruise",
      validUntil: "2024-09-30",
      tag: "Seasonal",
      color: "#06B6D4",
      lightColor: "#ECFEFF",
      relatedTripId: 2,
      packageDetails: "4 Nights 5 Days | Munnar 2N, Thekkady 1N, Alleppey 1N",
      startingPrice: "₹36,200",
    },
    {
      id: 3,
      title: "Grand Kerala Group Tour",
      discount: "25% OFF",
      description:
        "Complete Kerala experience for groups of 6+: Cochin, Munnar, Thekkady, Alleppey, Kovalam & Kanyakumari day trip",
      validUntil: "2024-12-31",
      tag: "Group Deal",
      color: "#8B5CF6",
      lightColor: "#F5F3FF",
      relatedTripId: 4,
      packageDetails:
        "7 Nights 8 Days | Cochin 1N, Munnar 2N, Thekkady 1N, Alleppey 1N, Kovalam 2N",
      startingPrice: "₹58,500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "25+", label: "Kerala Destinations" },
    { number: "4.9", label: "Average Rating" },
    { number: "24/7", label: "Kerala Support" },
  ];

  const floatingElements = [
    { size: 80, top: "20%", left: "10%", delay: 0 },
    { size: 120, top: "70%", left: "80%", delay: -10 },
    { size: 100, top: "40%", left: "85%", delay: -20 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="trip-offers">
        <div className="trip-offers__container">
          <div className="trip-offers__header">
            <div className="trip-offers__badge">
              <div className="trip-offers__badge-dot" />
              <span className="trip-offers__badge-text">
                {" "}
                Kerala Travel Packages
              </span>
            </div>
            <h2 className="trip-offers__title">Kerala Specials</h2>
          </div>
        </div>
      </section>
    );
  }

  const regularTrips = trips;

  return (
    <section className="trip-offers">
      {/* Background Elements */}
      <div className="trip-offers__grid-bg" />
      <div className="trip-offers__floating-elements">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className="trip-offers__floating-element"
            style={{
              width: element.size,
              height: element.size,
              top: element.top,
              left: element.left,
              animationDelay: `${element.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="trip-offers__container">
        {/* Header */}
        <div className="trip-offers__header">
          <div className="trip-offers__badge">
            <div className="trip-offers__badge-dot" />
            <span className="trip-offers__badge-text">Kerala Specials</span>
          </div>

          <h2 className="trip-offers__title">Exclusive offer for you</h2>

          <p className="trip-offers__subtitle">
            Discover the magic of God's Own Country with our carefully curated
            Kerala packages. From serene backwaters to luxurious Ayurvedic
            retreats and romantic honeymoons.
          </p>
        </div>

        {/* Featured Trip */}
        {/* {featuredTrip && (
          <div className="trip-offers__cards">
            <div className="trip-offers__card trip-offers__card--featured">
              <div className="trip-offers__featured-content">
                <div className="trip-offers__card-badge">
                  {featuredTrip.discount}
                </div>
                
                <div className="trip-offers__card-header">
                  <div className="trip-offers__card-icon">
                    {featuredTrip.icon}
                  </div>
                  <div>
                    <h3 className="trip-offers__card-title">{featuredTrip.title}</h3>
                    <div className="trip-offers__card-location">{featuredTrip.location}</div>
                  </div>
                </div>

                <p className="trip-offers__card-description">{featuredTrip.description}</p>

                <div className="trip-offers__card-features">
                  {featuredTrip.features.map((feature, index) => (
                    <div key={index} className="trip-offers__feature">
                      <svg className="trip-offers__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="trip-offers__card-footer">
                  <div className="trip-offers__price">
                    <span className="trip-offers__price-old">₹{featuredTrip.originalPrice.toLocaleString()}</span>
                    <span className="trip-offers__price-new">₹{featuredTrip.price.toLocaleString()}</span>
                  </div>
                  <button 
                    className="trip-offers__card-cta"
                    onClick={() => handleBookClick(featuredTrip.id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="trip-offers__featured-image">
                <div className="trip-offers__featured-visual">
                  {featuredTrip.icon}
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Regular Trips */}
        <div className="trip-offers__cards">
          {regularTrips.map((trip) => (
            <div key={trip.id} className="trip-offers__card">
              <div className="trip-offers__card-badge">{trip.discount}</div>

              <div className="trip-offers__card-header">
                <div className="trip-offers__card-icon">
                  {/* optional icon here */}
                </div>
                <div>
                  <h3 className="trip-offers__card-title">{trip.title}</h3>
                  <div className="trip-offers__card-location">{trip.tag}</div>
                </div>
              </div>

              <p className="trip-offers__card-description">
                {trip.description}
              </p>

              <div className="trip-offers__card-features">
                <div className="trip-offers__feature">
                  <svg
                    className="trip-offers__feature-icon"
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
                  {trip.packageDetails}
                </div>

                <div className="trip-offers__feature">
                  <svg
                    className="trip-offers__feature-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h16v16H4z"
                    />
                  </svg>
                  Valid Until: {trip.validUntil}
                </div>
              </div>

              <div className="trip-offers__card-footer">
                <div className="trip-offers__price">
                  <span className="trip-offers__price-new">
                    {trip.startingPrice}
                  </span>
                </div>

                <button
                  className="trip-offers__card-cta"
                  onClick={() => handleExploreClick(trip.id)}
                >
                  View Offers
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Offers Button */}

        {/* Stats Section */}
        <div className="trip-offers__stats">
          {stats.map((stat, index) => (
            <div key={index} className="trip-offers__stat">
              <div className="trip-offers__stat-number">{stat.number}</div>
              <div className="trip-offers__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
