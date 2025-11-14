// components/Destination.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destinations, filters, getDestinationsByType } from "../Data/DestinationData";
import "./Destination.css";

export default function Destination() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredDestinations = getDestinationsByType(activeFilter);

  // Navigate to separate destination details page
  const handleExploreClick = (destinationId) => {
    router.push(`/destinations/${destinationId}`);
  };

  const particleConfigs = [
    { width: 60, height: 60, top: "10%", left: "10%", duration: 8, delay: 0 },
    { width: 80, height: 80, top: "70%", left: "80%", duration: 12, delay: 2 },
    { width: 40, height: 40, top: "20%", left: "85%", duration: 10, delay: 4 },
    { width: 70, height: 70, top: "80%", left: "15%", duration: 15, delay: 1 },
    { width: 50, height: 50, top: "40%", left: "5%", duration: 9, delay: 3 },
  ];

  if (!isClient) {
    return (
      <section className="destinations">
        <div className="destinations__container">
          <div className="destinations__header">
            <div className="destinations__badge">
              <div className="destinations__badge-dot" />
              <span className="destinations__badge-text">Explore Kerala</span>
            </div>
            <h2 className="destinations__title">Kerala Destinations</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="destinations">
      <div className="destinations__particles">
        {particleConfigs.map((config, i) => (
          <div
            key={i}
            className="destinations__particle"
            style={{
              width: config.width,
              height: config.height,
              top: config.top,
              left: config.left,
              animationDuration: `${config.duration}s`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="destinations__container">
        <div className="destinations__header">
          <div className="destinations__badge">
            <div className="destinations__badge-dot" />
            <span className="destinations__badge-text">Explore Kerala</span>
          </div>

          <h2 className="destinations__title">Discover God's Own Country</h2>

          <p className="destinations__subtitle">
            From serene backwaters to misty hill stations, explore the diverse landscapes 
            and rich cultural heritage of Kerala's most beautiful destinations.
          </p>
        </div>

        <div className="destinations__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`destinations__filter ${
                activeFilter === filter.id ? "active" : ""
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="destinations__grid">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="destinations__card">
              <div 
                className="destinations__card-image"
                style={{
                  backgroundImage: `url(${destination.image})`,
                }}
              />

              <div className="destinations__card-content">
                <div className="destinations__card-header">
                  <div className="destinations__card-info">
                    <h3 className="destinations__card-title">
                      {destination.title}
                    </h3>
                    <div className="destinations__card-location">
                      <svg
                        className="destinations__card-location-icon"
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
                      {destination.location}
                    </div>
                  </div>
                  <div className="destinations__card-rating">
                    <span className="destinations__card-stars">★</span>
                    <span className="destinations__card-rating-text">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="destinations__card-description">
                  {destination.description}
                </p>

                <div className="destinations__card-features">
                  {destination.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="destinations__feature">
                      <svg
                        className="destinations__feature-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="destinations__card-footer">
                  <div className="destinations__card-price">
                    <span className="destinations__price-from">From</span>
                    <span className="destinations__price-amount">
                      ₹{destination.price}
                    </span>
                  </div>
                  <button 
                    className="destinations__card-cta"
                    onClick={() => handleExploreClick(destination.id)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
