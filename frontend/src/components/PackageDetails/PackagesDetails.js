"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PackageView from "../PackageView/PackageView";
import packagesData from "../Data/PackageData";
import "./PackagesDetails.css";

export default function PackageDetails({ onBack }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categories = [
    { id: "all", name: "All Packages", icon: "🌟" },
    { id: "kerala", name: "Kerala Holidays", icon: "🏞️" },
    { id: "ayurvedic", name: "Ayurvedic Retreats", icon: "🌿" },
    { id: "honeymoon", name: "Honeymoon", icon: "💝" },
  ];

  const daysOptions = [
    { days: 2, nights: 1, label: "2 Days / 1 Night" },
    { days: 3, nights: 2, label: "3 Days / 2 Nights" },
    { days: 4, nights: 3, label: "4 Days / 3 Nights" },
    { days: 5, nights: 4, label: "5 Days / 4 Nights" },
    { days: 6, nights: 5, label: "6 Days / 5 Nights" },
    { days: 7, nights: 6, label: "7 Days / 6 Nights" },
    { days: 8, nights: 7, label: "8 Days / 7 Nights" },
    { days: 10, nights: 9, label: "10 Days / 9 Nights" },
  ];

  // Use imported packagesData instead of local array
  const packages = packagesData;

  // Filter logic
  const filteredPackages = packages.filter((pkg) => {
    const categoryMatch =
      activeCategory === "all" || pkg.category === activeCategory;
    const daysMatch =
      !selectedDays ||
      (pkg.days === selectedDays.days && pkg.nights === selectedDays.nights);
    return categoryMatch && daysMatch;
  });

  const handlePackageSelect = (pkg) => setSelectedPackage(pkg);
  const handleBackFromPackageView = () => setSelectedPackage(null);

  const handleBookNow = (pkg, travelers, selectedDate) => {
    console.log("Booking package:", pkg, travelers, selectedDate);
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSelectedDays(null);
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
                {(
                  packages.reduce((sum, pkg) => sum + pkg.rating, 0) /
                  packages.length
                ).toFixed(1)}
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        <div className="package-layout">
          {/* Main Content */}
          <div className="package-main">
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
                  {(activeCategory !== "all" || selectedDays) && (
                    <button onClick={clearFilters} className="clear-filters">
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              <div className="packages-grid">
                {filteredPackages.map((pkg) => (
                  <div key={pkg.id} className="package-card">
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
                        {
                          categories.find((cat) => cat.id === pkg.category)
                            ?.name
                        }
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
                          onClick={() => handlePackageSelect(pkg)}
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
                    <button
                      onClick={clearFilters}
                      className="clear-filters-btn"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Days Filter */}
          <div className="package-sidebar">
            <div className="days-filter-widget">
              <div className="widget-header">
                <h3>Filter by Duration</h3>
                <p>Choose your preferred trip length</p>
              </div>

              <div className="days-options">
                {daysOptions.map((option) => (
                  <button
                    key={`${option.days}-${option.nights}`}
                    className={`days-option ${
                      selectedDays?.days === option.days ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedDays(
                        selectedDays?.days === option.days ? null : option
                      )
                    }
                  >
                    <div className="days-info">
                      <span className="days-count">{option.days} Days</span>
                      <span className="nights-count">
                        {option.nights} Nights
                      </span>
                    </div>
                    <div className="package-count">
                      {
                        packages.filter(
                          (pkg) =>
                            pkg.days === option.days &&
                            pkg.nights === option.nights
                        ).length
                      }{" "}
                      packages
                    </div>
                  </button>
                ))}
              </div>

              {selectedDays && (
                <div className="selected-filter">
                  <div className="selected-info">
                    <span>Selected: {selectedDays.label}</span>
                    <button
                      onClick={() => setSelectedDays(null)}
                      className="remove-filter"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact */}
            <div className="contact-widget">
              <div className="contact-icon">💬</div>
              <h4>Need Help Choosing?</h4>
              <p>Our travel experts can help you find the perfect package</p>
              <button
                className="contact-expert-btn"
                onClick={() => router.push("/contacts")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
