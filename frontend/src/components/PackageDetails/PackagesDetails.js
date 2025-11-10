"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PackageView from "../PackageView/PackageView"; // Import the PackageView component
import "./PackagesDetails.css";

export default function PackageDetails({ onBack }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categories = [
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
  ];

  const packages = [
    {
      id: 1,
      title: "Classic Kerala Backwaters",
      category: "kerala",
      days: 3,
      nights: 2,
      price: "₹12,499",
      originalPrice: "₹15,999",
      description: `Escape into the heart of Kerala with a quick backwaters retreat — where time slows and tranquility takes over. Glide through serene canals lined with swaying palms and rustic village scenes aboard a traditional houseboat.
The gentle rhythm of the water, the golden light on rippling reflections, and the aroma of fresh coconut and spices create a sensory experience like no other. It’s a perfect pause from the everyday — intimate, scenic, and soul-soothing.
Whether it’s a romantic getaway or a solo recharge, Kerala’s backwaters offer a timeless charm that stays with you long after the journey ends. Let nature cradle you in its calm.`,
      image: "/assets/backwater-package_quick.jpeg",
      highlights: [
        "Houseboat Stay",
        "Traditional Lunch",
        "Village Tour",
        "Sunset Cruise",
      ],
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      category: "ayurvedic",
      days: 5,
      nights: 4,
      price: "₹18,999",
      originalPrice: "₹24,999",
      description: `Reclaim your balance with an Ayurvedic wellness retreat that nurtures body, mind, and spirit. Rooted in centuries-old healing traditions, this experience offers personalized therapies, herbal treatments, and mindful rituals tailored to your unique constitution.
Each day unfolds with rejuvenating massages, nourishing sattvic meals, and guided practices like yoga and meditation — all designed to restore inner harmony and vitality. The serene natural surroundings amplify the healing, inviting deep rest and renewal.
Whether you're seeking detox, stress relief, or a deeper connection to self, Ayurveda offers a gentle yet profound path to wellness. Step into stillness, and let nature and tradition guide your transformation.`,
      image: "/assets/retreat_quick.png",
      highlights: [
        "Daily Yoga",
        "Ayurvedic Massages",
        "Meditation",
        "Organic Meals",
      ],
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      title: "Romantic Honeymoon Escape",
      category: "honeymoon",
      days: 4,
      nights: 3,
      price: "₹22,999",
      originalPrice: "₹28,999",
      description: `Celebrate love with a romantic honeymoon escape that’s as unforgettable as your story. Whether nestled in the hills, floating on tranquil waters, or walking hand-in-hand along sun-kissed shores, every moment is designed to deepen your connection.
Wake up to breathtaking views, indulge in candlelit dinners, and unwind with couple’s spa rituals that soothe the senses. From private excursions to cozy hideaways, the experience is intimate, luxurious, and tailored to your rhythm.
This is more than a getaway — it’s the beginning of a beautiful journey together. Let nature, comfort, and romance set the tone for memories that last a lifetime.`,
      image: "/assets/romantic_honeymoon_quick.png",
      highlights: [
        "Private Villa",
        "Candlelight Dinner",
        "Couple Spa",
        "Photo Session",
      ],
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      title: "Kerala Wildlife Adventure",
      category: "kerala",
      days: 2,
      nights: 1,
      price: "₹8,499",
      originalPrice: "₹10,999",
      description: `Kerala wilde life adventure
Embark on a thrilling wildlife adventure through Kerala’s lush forests and protected reserves. From the misty hills of Wayanad to the dense jungles of Thekkady, each destination offers a chance to witness nature in its raw, untamed beauty.
Spot majestic elephants, elusive tigers, and vibrant birdlife as you trek, boat, or jeep through biodiverse landscapes. The experience is immersive — filled with the sounds of the wild and the scent of rain-soaked earth.
Perfect for nature lovers and thrill-seekers alike, Kerala’s wildlife escapes blend excitement with serenity, offering unforgettable encounters and a deep connection to the natural world.`,
      image: "/assets/wildlife_quick.png",
      highlights: [
        "Wildlife Safari",
        "Nature Walk",
        "Bird Watching",
        "Campfire",
      ],
      rating: 4.6,
      reviews: 67,
    },
    {
      id: 5,
      title: "Panchakarma Detox Program",
      category: "ayurvedic",
      days: 7,
      nights: 6,
      price: "₹32,999",
      originalPrice: "₹39,999",
      description: `Cleanse, heal, and renew with a traditional Panchakarma detox program, the crown jewel of Ayurvedic healing. Rooted in ancient wisdom, this holistic therapy gently eliminates toxins from the body while restoring balance to the mind and spirit.
The program includes a personalized combination of treatments such as Abhyanga (therapeutic oil massage), Swedana (herbal steam), and internal cleansing therapies — all tailored to your unique dosha constitution. Guided by experienced Ayurvedic practitioners, each step is designed to rejuvenate your system from the inside out.
Ideal for those seeking deep detoxification, stress relief, or a fresh start, Panchakarma offers more than just physical benefits — it’s a journey toward clarity, vitality, and long-term well-being. Let nature’s intelligence reset your rhythm.`,
      image: "/assets/ayurvedic_rejuvation_quick.png",
      highlights: [
        "Panchakarma Therapy",
        "Diet Consultation",
        "Daily Treatments",
        "Follow-up",
      ],
      rating: 4.9,
      reviews: 45,
    },
    {
      id: 6,
      title: "Luxury Honeymoon Suite",
      category: "honeymoon",
      days: 6,
      nights: 5,
      price: "₹35,999",
      originalPrice: "₹42,999",
      description: `Indulge in the ultimate romantic escape with a luxury honeymoon suite designed for intimacy and elegance. From plush interiors to panoramic views, every detail is curated to celebrate love in style and comfort.
Enjoy private amenities like a jacuzzi, candlelit dining, and personalized service that makes every moment feel special. Whether nestled in the hills or overlooking the sea, the ambiance is serene and unforgettable.
Perfect for newlyweds seeking privacy and pampering, the suite offers a sanctuary where romance blooms and memories are made. It's not just a stay — it's a celebration of togetherness.`,
      image: "/assets/luxury_honeymoon_quick.png",
      highlights: [
        "Private Pool",
        "Butler Service",
        "Fine Dining",
        "Helicopter Tour",
      ],
      rating: 4.8,
      reviews: 92,
    },
    {
      id: 7,
      title: "Kerala Cultural Tour",
      category: "kerala",
      days: 4,
      nights: 3,
      price: "₹14,999",
      originalPrice: "₹18,999",
      description: `Immerse yourself in the vibrant soul of Kerala with a cultural tour that celebrates tradition, artistry, and heritage. From classical dance performances like Kathakali and Mohiniyattam to temple rituals and folk music, every experience offers a glimpse into the region’s rich identity.
Wander through spice markets, historic towns, and artisan villages where age-old crafts like coir weaving and mural painting come alive. Taste authentic Kerala cuisine served on banana leaves and learn the stories behind its flavors and customs.
This journey is more than sightseeing — it’s a heartfelt connection to Kerala’s rhythm, rituals, and warmth. Perfect for travelers seeking depth, authenticity, and unforgettable cultural moments.`,
      image: "/assets/cultural_kerala_quick.png",
      highlights: [
        "Temple Tours",
        "Kathakali Show",
        "Spice Garden",
        "Cooking Class",
      ],
      rating: 4.5,
      reviews: 78,
    },
    {
      id: 8,
      title: "Weekend Ayurvedic Rejuvenation",
      category: "ayurvedic",
      days: 2,
      nights: 1,
      price: "₹6,999",
      originalPrice: "₹8,999",
      description: `Recharge your body and mind with a weekend Ayurvedic rejuvenation program designed for deep relaxation and gentle healing. Rooted in ancient wisdom, this short escape offers a curated blend of therapies to restore balance and vitality.
Experience soothing oil massages, herbal steam baths, and personalized treatments that detoxify and energize. Complemented by yoga, meditation, and sattvic meals, each moment invites calm and clarity.
Perfect for busy professionals or wellness seekers, this weekend retreat is a reset button — helping you return refreshed, centered, and ready to embrace life with renewed energy.`,
      highlights: ["Stress Relief", "Basic Massages", "Yoga", "Healthy Meals"],
      image: "/assets/ayurvedic_weeked_quick.png",
      rating: 4.4,
      reviews: 112,
    },
  ];

  // Filter packages based on category and days
  const filteredPackages = packages.filter((pkg) => {
    const categoryMatch =
      activeCategory === "all" || pkg.category === activeCategory;
    const daysMatch =
      !selectedDays ||
      (pkg.days === selectedDays.days && pkg.nights === selectedDays.nights);
    return categoryMatch && daysMatch;
  });

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleBackFromPackageView = () => {
    setSelectedPackage(null);
  };

  const handleBookNow = (pkg, travelers, selectedDate) => {
    // Handle booking logic here
    console.log(
      "Booking package:",
      pkg,
      "for travelers:",
      travelers,
      "on date:",
      selectedDate
    );
    // You can navigate to booking page or show booking modal
    // Example: router.push('/booking');
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSelectedDays(null);
  };

  // If a package is selected, show the PackageView component
  if (selectedPackage) {
    return (
      <PackageView
        package={selectedPackage}
        onBack={handleBackFromPackageView}
        onBookNow={handleBookNow}
      />
    );
  }

  // Otherwise, show the packages grid
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
              <span className="stat-number">4.8</span>
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
                          backgroundSize: "cover", // Make the image fill the div
                          backgroundPosition: "center", // Center the image
                          backgroundRepeat: "no-repeat", // Prevent tiling
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
              <button className="contact-expert-btn" onClick={() => router.push('/contacts')}>
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
