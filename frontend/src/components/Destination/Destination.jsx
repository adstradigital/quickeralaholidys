// components/Destination.jsx
"use client";

import { useState, useEffect } from "react";
import "./Destination.css";

export default function Destination() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);

  const filters = [
    { id: "all", name: "All Destinations" },
    { id: "backwaters", name: "Backwaters" },
    { id: "hillstation", name: "Hill Stations" },
    { id: "beach", name: "Beaches" },
    { id: "wildlife", name: "Wildlife" },
    { id: "cultural", name: "Cultural" },
  ];

  const destinations = [
    {
      id: 1,
      title: "Alleppey Backwaters",
      location: "Alleppey, Kerala",
      description:
        "Experience the serene backwaters of Kerala with traditional houseboat stays, coconut lagoons, and authentic local cuisine.",
      price: 8999,
      rating: 4.9,
      reviews: 342,
      type: "backwaters",
      badge: "Popular",
      image: "/assets/destinations/alleppey-backwaters.png",
      features: [
        "Houseboat Stay",
        "Village Tours",
        "Traditional Lunch",
        "Sunset Cruise",
      ],
      featured: true,
    },
    {
      id: 2,
      title: "Munnar Tea Gardens",
      location: "Munnar, Kerala",
      description:
        "Explore the lush green tea plantations, misty mountains, and waterfalls in Kerala's famous hill station.",
      price: 7599,
      rating: 4.8,
      reviews: 287,
      type: "hillstation",
      badge: "Scenic",
      image: "/assets/destinations/munnar-tea-gardens.png",
      features: [
        "Tea Plantation Tour",
        "Waterfall Visit",
        "Trekking",
        "Spice Garden",
      ],
    },
    {
      id: 3,
      title: "Kochi Fort",
      location: "Kochi, Kerala",
      description:
        "Discover the rich colonial history, Chinese fishing nets, and vibrant art scene in this coastal city.",
      price: 6899,
      rating: 4.7,
      reviews: 231,
      type: "cultural",
      badge: "Historic",
      image: "/assets/destinations/kochi-fort.png",
      features: [
        "Chinese Nets",
        "Jewish Synagogue",
        "Art Galleries",
        "Local Markets",
      ],
    },
    {
      id: 4,
      title: "Kovalam Beach",
      location: "Kovalam, Kerala",
      description:
        "Relax on pristine beaches, enjoy Ayurvedic treatments, and witness spectacular sunsets over the Arabian Sea.",
      price: 8299,
      rating: 4.6,
      reviews: 198,
      type: "beach",
      badge: "Relaxing",
      image: "/assets/destinations/kovalam-beach.png",
      features: [
        "Beach Activities",
        "Ayurvedic Spa",
        "Lighthouse",
        "Seafood Dining",
      ],
    },
    {
      id: 5,
      title: "Wayanad Wildlife",
      location: "Wayanad, Kerala",
      description:
        "Embark on jungle safaris, explore ancient caves, and witness diverse wildlife in the Western Ghats.",
      price: 9499,
      rating: 4.8,
      reviews: 176,
      type: "wildlife",
      badge: "Adventure",
      image: "/assets/destinations/wayanad-wildlife.png",
      features: [
        "Wildlife Safari",
        "Ancient Caves",
        "Trekking",
        "Coffee Plantation",
      ],
    },
    {
      id: 6,
      title: "Thekkady Periyar",
      location: "Thekkady, Kerala",
      description:
        "Experience wildlife in its natural habitat with boat cruises, spice plantations, and tribal culture.",
      price: 8799,
      rating: 4.7,
      reviews: 213,
      type: "wildlife",
      badge: "Nature",
      image: "/assets/destinations/thekkady-periyar.png",
      features: [
        "Boat Safari",
        "Spice Garden",
        "Elephant Ride",
        "Cultural Shows",
      ],
    },
    {
      id: 7,
      title: "Varkala Cliffs",
      location: "Varkala, Kerala",
      description:
        "Stunning cliffside beaches with mineral springs, yoga retreats, and breathtaking ocean views.",
      price: 7699,
      rating: 4.9,
      reviews: 154,
      type: "beach",
      badge: "Spiritual",
      image: "/assets/destinations/varkala-cliffs.png",
      features: [
        "Cliff Views",
        "Mineral Baths",
        "Yoga Retreats",
        "Beach Cafes",
      ],
    },
    {
      id: 8,
      title: "Kumarakom Backwaters",
      location: "Kumarakom, Kerala",
      description:
        "Luxury houseboat experience in tranquil backwaters with bird watching and village life experiences.",
      price: 11299,
      rating: 4.9,
      reviews: 189,
      type: "backwaters",
      badge: "Luxury",
      image: "/assets/destinations/kumarakom-backwaters.png",
      features: [
        "Luxury Houseboat",
        "Bird Sanctuary",
        "Fishing",
        "Village Walks",
      ],
    },
    {
      id: 9,
      title: "Bekal Fort Beach",
      location: "Bekal, Kerala",
      description:
        "Historic fort overlooking the Arabian Sea with pristine beaches and panoramic views.",
      price: 6999,
      rating: 4.6,
      reviews: 132,
      type: "beach",
      badge: "Historic",
      image: "/assets/destinations/bekal-fort.png",
      features: [
        "Fort Visit",
        "Beach Activities",
        "Photography",
        "Local Cuisine",
      ],
    },
    {
      id: 10,
      title: "Athirappilly Waterfalls",
      location: "Thrissur, Kerala",
      description:
        "Witness the magnificent 'Niagara of India' surrounded by lush green forests and wildlife.",
      price: 5899,
      rating: 4.7,
      reviews: 167,
      type: "nature",
      badge: "Spectacular",
      image: "/assets/destinations/athirappilly-waterfalls.png",
      features: [
        "Waterfall Views",
        "Rainforest Trek",
        "Wildlife Spotting",
        "Photography",
      ],
    },
    {
      id: 11,
      title: "Poovar Island",
      location: "Trivandrum, Kerala",
      description:
        "Unique island where the backwaters meet the sea, offering secluded beaches and mangrove forests.",
      price: 9899,
      rating: 4.8,
      reviews: 145,
      type: "backwaters",
      badge: "Exclusive",
      image: "/assets/destinations/poovar-island.png",
      features: [
        "Island Resort",
        "Boat Cruise",
        "Mangrove Forest",
        "Secluded Beaches",
      ],
    },
    {
      id: 12,
      title: "Silent Valley National Park",
      location: "Palakkad, Kerala",
      description:
        "Explore one of the last undisturbed rainforests in Western Ghats with rich biodiversity.",
      price: 8199,
      rating: 4.7,
      reviews: 98,
      type: "wildlife",
      badge: "Eco",
      image: "/assets/destinations/silent-valley.png",
      features: [
        "Jungle Trek",
        "Bird Watching",
        "Nature Photography",
        "Eco Tourism",
      ],
    },
  ];

  const particleConfigs = [
    { width: 60, height: 60, top: "10%", left: "10%", duration: 8, delay: 0 },
    { width: 80, height: 80, top: "70%", left: "80%", duration: 12, delay: 2 },
    { width: 40, height: 40, top: "20%", left: "85%", duration: 10, delay: 4 },
    { width: 70, height: 70, top: "80%", left: "15%", duration: 15, delay: 1 },
    { width: 50, height: 50, top: "40%", left: "5%", duration: 9, delay: 3 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredDestinations = activeFilter === "all" 
    ? destinations 
    : destinations.filter(dest => dest.type === activeFilter);

  const regularDestinations = filteredDestinations

  // Fallback icons for different destination types


  // Fallback background gradients for images
  const getImageBackground = (type) => {
    const gradients = {
      backwaters: "linear-gradient(135deg, #1e6b52 0%, #2d936c 100%)",
      hillstation: "linear-gradient(135deg, #38b2ac 0%, #319795 100%)",
      beach: "linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%)",
      wildlife: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      cultural: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
      nature: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    };
    return gradients[type] || "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)";
  };

  if (!isClient) {
    return (
      <section className="destinations">
        <div className="destinations__container">
          <div className="destinations__header">
            <div className="destinations__badge">
              <div className="destinations__badge-dot" />
              <span className="destinations__badge-text">
                Explore Kerala
              </span>
            </div>
            <h2 className="destinations__title">Kerala Destinations</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="destinations">
      {/* Background Elements */}
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
        {/* Header */}
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

        {/* Filters */}
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

        {/* Regular Destinations */}
        <div className="destinations__grid">
          {regularDestinations.map((destination) => (
            <div key={destination.id} className="destinations__card">
              <div 
                className="destinations__card-image"
                style={{
                  backgroundImage: `url(${destination.image})`,
                }}
              >
              </div>

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
                  <button className="destinations__card-cta">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}