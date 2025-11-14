"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PackageView from "../PackageView/PackageView";
import packagesData from "../Data/PackageData";
import "./PackagesDetails.css";

export default function PackageDetails({ onBack }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categories = [
    { id: "all", name: "All Packages", icon: "🌟" },
    { id: "kerala", name: "Kerala Holidays", icon: "🏞️" },
    { id: "ayurvedic", name: "Ayurvedic Retreats", icon: "🌿" },
    { id: "honeymoon", name: "Honeymoon", icon: "💝" },
  ];

  const packages = packagesData;

  const filteredPackages = packages.filter((pkg) => {
    return activeCategory === "all" || pkg.category === activeCategory;
  });

  const handlePackageSelect = (pkg) => setSelectedPackage(pkg);
  const handleBackFromPackageView = () => setSelectedPackage(null);

  const handleBookNow = (pkg, travelers, selectedDate) => {
    console.log("Booking package:", pkg, travelers, selectedDate);
  };

  const clearFilters = () => {
    setActiveCategory("all");
  };

  if (selectedPackage) {
    return (
      <PackageView
        package={selectedPackage}
        onBack={handleBackFromPackageView}
        onBookNow={handleBookNow}
      />
    );
  }

  return (
    <section className="package-details-section">
      <div className="container">
        {/* Back Button */}
        <div className="back-button-container">
          <button onClick={onBack} className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Header */}
        <div className="package-header">
          <div className="header-content">
            <h1>Explore Our Packages</h1>
            <p>
              Discover the perfect getaway with our carefully curated packages
            </p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{packages.length}</span>
              <span className="stat-label">Packages</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {(packages.reduce((sum, pkg) => sum + pkg.rating, 0) /
                  packages.length).toFixed(1)}
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        <div className="package-layout">
          {/* Main Content */}
          <div className="package-main" style={{ width: "100%" }}>
            {/* Category Filters */}
            <div className="category-filters">
              <h3>Choose Category</h3>
              <div className="category-buttons">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-btn ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Packages Grid */}
            <div className="packages-grid-section">
              <div className="section-header">
                <h2>
                  {activeCategory === "all"
                    ? "All Packages"
                    : categories.find((cat) => cat.id === activeCategory)?.name}
                </h2>
                <div className="results-info">
                  <span>{filteredPackages.length} packages found</span>
                  {activeCategory !== "all" && (
                    <button onClick={clearFilters} className="clear-filters">
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              <div className="packages-grid">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="package-card"
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    onClick={() => handlePackageSelect(pkg)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handlePackageSelect(pkg);
                      }
                    }}
                  >
                    <div className="package-image">
                      <div
                        className="image-placeholder"
                        style={{
                          backgroundImage: `url(${pkg.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "200px",
                        }}
                      ></div>

                      <div className="package-badge">
                        {pkg.days}D/{pkg.nights}N
                      </div>
                      <div className="category-tag">
                        {categories.find((cat) => cat.id === pkg.category)?.name}
                      </div>
                    </div>

                    <div className="package-content">
                      <div className="package-header">
                        <h3>{pkg.title}</h3>
                        <div className="rating">
                          <span className="stars">⭐ {pkg.rating}</span>
                          <span className="reviews">({pkg.reviews})</span>
                        </div>
                      </div>

                      <p className="package-description">
                        {pkg.description.length > 150
                          ? pkg.description.slice(0, 150) + "..."
                          : pkg.description}
                      </p>
                      <div className="package-highlights">
                        {pkg.highlights.map((highlight, index) => (
                          <span key={index} className="highlight-tag">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="package-footer">
                        <div className="pricing">
                          <span className="current-price">{pkg.price}</span>
                          <span className="original-price">
                            {pkg.originalPrice}
                          </span>
                          <span className="discount">
                            Save ₹
                            {(
                              parseInt(
                                pkg.originalPrice.replace(/[^0-9]/g, "")
                              ) - parseInt(pkg.price.replace(/[^0-9]/g, ""))
                            ).toLocaleString()}
                          </span>
                        </div>
                        <button
                          className="select-package-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePackageSelect(pkg);
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredPackages.length === 0 && (
                  <div className="no-packages">
                    <div className="no-packages-icon">🔍</div>
                    <h3>No packages found</h3>
                    <p>Try adjusting your filters to see more results</p>
                    <button onClick={clearFilters} className="clear-filters-btn">
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
