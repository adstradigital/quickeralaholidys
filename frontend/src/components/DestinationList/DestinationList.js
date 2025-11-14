// components/DestinationList/DestinationList.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DestinationDetails from "@/components/DestinationDetails/DestinationDetails";
import { 
  destinations, 
  categories, 
  allDurations, 
  getDestinationById 
} from "../Data/DestinationData";
import "./DestinationList.css";

export default function DestinationList() {
  const searchParams = useSearchParams();
  const destinationId = searchParams.get('id');
  
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState(null);

  // Auto-open destination if ID is in URL
  useEffect(() => {
    if (destinationId) {
      const destination = getDestinationById(destinationId);
      if (destination) {
        setSelectedDestination(destination);
      }
    }
  }, [destinationId]);

  const filteredDestinations = destinations.filter((destination) => {
    const categoryMatch =
      activeFilter === "all" || destination.category === activeFilter;
    const durationMatch =
      !selectedDuration ||
      destination.packages.some((pkg) => pkg.days === selectedDuration.days);
    return categoryMatch && durationMatch;
  });

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
  };

  const DestinationCard = ({ destination }) => {
    const cardRef = useRef(null);

    return (
      <div
        ref={cardRef}
        className="destination-card"
        onClick={() => handleCardClick(destination)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(destination);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${destination.name} - ${destination.category}`}
      >
        <div className="card-image">
          <img src={destination.image} alt={destination.name} />
          <div className="image-overlay">
            <div className="category-badge">{destination.category}</div>
            <div className="rating">
              <span className="star">⭐</span>
              <span className="rating-value">{destination.rating}</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="card-header">
            <h3 className="destination-name">{destination.name}</h3>
            <div className="duration">{destination.duration}</div>
          </div>

          <p className="destination-desc">{destination.shortDesc}</p>

          <div className="destination-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{destination.bestTime}</span>
            </div>
          </div>

          <div className="highlights-container">
            {destination.highlights.slice(0, 3).map((highlight, index) => (
              <span key={index} className="highlight-pill">
                {highlight}
              </span>
            ))}
            {destination.highlights.length > 3 && (
              <span className="highlight-pill more">
                +{destination.highlights.length - 3}
              </span>
            )}
          </div>

          <div className="available-durations">
            <span className="durations-label">Available Durations:</span>
            <div className="duration-pills">
              {destination.packages.slice(0, 3).map((pkg) => (
                <span key={pkg.id} className="duration-pill">
                  {pkg.days}D/{pkg.nights}N
                </span>
              ))}
              {destination.packages.length > 3 && (
                <span className="duration-pill more">
                  +{destination.packages.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DurationFilter = () => {
    return (
      <div className="duration-sidebar">
        <div className="duration-header">
          <h3>Filter by Duration</h3>
          <p>Choose your trip length</p>
        </div>

        <div className="duration-list">
          {allDurations.map((duration, index) => (
            <div
              key={index}
              className={`duration-item ${
                selectedDuration?.days === duration.days ? "active" : ""
              }`}
              onClick={() =>
                setSelectedDuration(
                  selectedDuration?.days === duration.days ? null : duration
                )
              }
            >
              <div className="duration-icon">🗓️</div>
              <div className="duration-info">
                <span className="duration-label">{duration.label}</span>
                <span className="duration-count">
                  {
                    destinations.filter((dest) =>
                      dest.packages.some((pkg) => pkg.days === duration.days)
                    ).length
                  }{" "}
                  destinations
                </span>
              </div>
              <div className="duration-arrow">→</div>
            </div>
          ))}
        </div>

        {selectedDuration && (
          <div className="selected-duration-info">
            <div className="selected-duration-header">
              <h4>{selectedDuration.label}</h4>
              <button
                className="clear-filter"
                onClick={() => setSelectedDuration(null)}
              >
                Clear
              </button>
            </div>
            <div className="matching-destinations">
              <span>Available in:</span>
              <div className="matching-tags">
                {destinations
                  .filter((dest) =>
                    dest.packages.some(
                      (pkg) => pkg.days === selectedDuration.days
                    )
                  )
                  .map((dest) => (
                    <span key={dest.id} className="matching-tag">
                      {dest.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="destinations-modern">
      <div className="container">
        {!selectedDestination ? (
          <div className="layout-container">
            <div className="main-content">
              <div className="section-header">
                <h1 className="section-title">Discover Kerala</h1>
                <p className="section-subtitle">
                  Explore the most beautiful destinations in God's Own Country
                </p>

                <div className="filter-tabs">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`filter-tab ${
                        activeFilter === category ? "active" : ""
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category === "all" ? "All Destinations" : category}
                    </button>
                  ))}
                </div>

                {(activeFilter !== "all" || selectedDuration) && (
                  <div className="active-filters">
                    <span className="filters-label">Active Filters:</span>
                    {activeFilter !== "all" && (
                      <span className="active-filter-tag">
                        Category: {activeFilter}
                        <button
                          onClick={() => setActiveFilter("all")}
                          className="remove-filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedDuration && (
                      <span className="active-filter-tag">
                        Duration: {selectedDuration.label}
                        <button
                          onClick={() => setSelectedDuration(null)}
                          className="remove-filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="destinations-grid">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <h3>No destinations found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                    <button
                      className="reset-filters-btn"
                      onClick={() => {
                        setActiveFilter("all");
                        setSelectedDuration(null);
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <DurationFilter />
          </div>
        ) : (
          <DestinationDetails
            destination={selectedDestination}
            onBack={() => setSelectedDestination(null)}
          />
        )}
      </div>
    </section>
  );
}
