"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Packages.css";
import packagesData from "@/components/Data/PackageData";

export default function TripPackages() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const packages = packagesData;

  const getFilterColor = (filterId) => {
    switch(filterId) {
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

  const filters = [
    { id: "all", name: "All Packages", icon: "🌍", count: packages.length },
    { id: "kerala", name: "Kerala Holidays", icon: "🏞️", count: packages.filter(pkg => pkg.category === "kerala").length },
    { id: "honeymoon", name: "Honeymoon", icon: "💖", count: packages.filter(pkg => pkg.category === "honeymoon").length },
    { id: "ayurvedic", name: "Ayurvedic", icon: "🌿", count: packages.filter(pkg => pkg.category === "ayurvedic").length },
    { id: "seasonal", name: "Seasonal", icon: "🌦️", count: packages.filter(pkg => pkg.category === "seasonal").length }
  ];

  const filteredPackages = activeFilter === "all"
    ? packages
    : packages.filter(pkg => pkg.category === activeFilter);

  if (!isClient) {
    return null;
  }

  return (
    <section className="trip-packages">
      <div className="trip-packages__filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`trip-packages__filter ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
            style={{ background: activeFilter === filter.id ? getFilterColor(filter.id) : undefined }}
          >
            <span className="trip-packages__filter-icon">{filter.icon}</span>
            <span className="trip-packages__filter-text">{filter.name}</span>
            <span className="trip-packages__filter-count">({filter.count})</span>
          </button>
        ))}
      </div>

      <div className="trip-packages__grid">
        {filteredPackages.length > 0 ? (
          filteredPackages.map(pkg => {
            const price = parseInt(pkg.price.replace(/[^0-9]/g, ""));
            const original = parseInt(pkg.originalPrice.replace(/[^0-9]/g, ""));
            const discount =
              original > price
                ? `${Math.round((1 - price / original) * 100)}% OFF`
                : null;

            return (
              <div
                key={pkg.id}
                className="trip-packages__card"
                style={{ background: getGlassBackground(pkg.category), position: "relative", cursor: "pointer" }}
                onClick={() => router.push(`/packages/${pkg.id}`)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(`/packages/${pkg.id}`);
                  }
                }}
              >
                {/* Offer Badge */}
                {discount && (
                  <div className="trip-packages__offer-badge">{discount}</div>
                )}

                <div
                  className="trip-packages__card-image-section"
                  style={{
                    backgroundImage: `url(${pkg.image})`,
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                <div className="trip-packages__card-content">
                  <h3 className="trip-packages__card-title">{pkg.title}</h3>
                  <div className="trip-packages__card-location">
                    {(pkg.locations && Array.isArray(pkg.locations))
                      ? pkg.locations.join(", ")
                      : (pkg.location || "")}
                  </div>
                  <p className="trip-packages__card-description">{pkg.description}</p>
                  <div className="trip-packages__card-price">
                    <span>₹{price.toLocaleString()}</span>&nbsp;
                    <s>₹{original.toLocaleString()}</s>
                  </div>
                  <button className="trip-packages__card-cta" onClick={(e) => e.stopPropagation()}>
                    Explore
                    <svg
                      className="trip-packages__cta-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Packages Found</div>
        )}
      </div>
    </section>
  );
}
