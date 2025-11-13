// components/TripOffers.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './SpecialOffer.css';

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
      title: "Kerala Backwaters Escape",
      location: "Alleppey, Kerala",
      description: "Experience the serene backwaters of Kerala with traditional houseboat stay, village tours, and authentic local cuisine.",
      price: 12499,
      originalPrice: 15999,
      discount: "22% OFF",
      duration: "3 Days / 2 Nights",
      groupSize: "2-4 People",
      difficulty: "Relaxing",
      rating: 4.9,
      icon: "🛶",
      image: "/assets/cultural_kerala_quick.png",
      features: ["Houseboat Stay", "Traditional Lunch", "Village Tour", "Sunset Cruise"],
      featured: true,
      type: "backwaters"
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      location: "Kochi, Kerala",
      description: "Rejuvenate your mind and body with authentic Ayurvedic treatments, yoga sessions, and organic meals in peaceful surroundings.",
      price: 18999,
      originalPrice: 24999,
      discount: "24% OFF",
      duration: "5 Days / 4 Nights",
      groupSize: "1-2 People",
      difficulty: "Wellness",
      rating: 4.8,
      icon: "🧘",
      image: "/assets/ayurvedic_rejuvation_quick.png",
      features: ["Daily Yoga", "Ayurvedic Massages", "Meditation", "Organic Meals"],
      type: "ayurvedic"
    },
    {
      id: 3,
      title: "Romantic Honeymoon Package",
      location: "Munnar, Kerala",
      description: "Perfect romantic getaway with private villas, candlelight dinners, couple spa treatments, and misty mountain views.",
      price: 22999,
      originalPrice: 28999,
      discount: "21% OFF",
      duration: "4 Days / 3 Nights",
      groupSize: "2 People",
      difficulty: "Luxury",
      rating: 4.9,
      icon: "💖",
      image: "/assets/romantic_honeymoon_quick.png",
      features: ["Private Villa", "Candlelight Dinner", "Couple Spa", "Photo Session"],
      type: "honeymoon"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "25+", label: "Kerala Destinations" },
    { number: "4.9", label: "Average Rating" },
    { number: "24/7", label: "Kerala Support" }
  ];

  const floatingElements = [
    { size: 80, top: "20%", left: "10%", delay: 0 },
    { size: 120, top: "70%", left: "80%", delay: -10 },
    { size: 100, top: "40%", left: "85%", delay: -20 }
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
              <span className="trip-offers__badge-text"> Kerala Travel Packages</span>
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
              animationDelay: `${element.delay}s`
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
            Discover the magic of God's Own Country with our carefully curated Kerala packages. 
            From serene backwaters to luxurious Ayurvedic retreats and romantic honeymoons.
          </p>
        </div>

        {/* Regular Trips with Images */}
        <div className="trip-offers__cards">
          {regularTrips.map(trip => (
            <div key={trip.id} className="trip-offers__card">
              {/* Card Image */}
              <div className="trip-offers__card-image-container">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="trip-offers__card-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Discount Badge */}
                <div className="trip-offers__card-badge">
                  {trip.discount}
                </div>
              </div>
              
              <div className="trip-offers__card-content">
                <div className="trip-offers__card-header">
                  <div className="trip-offers__card-icon">
                    {trip.icon}
                  </div>
                  <div>
                    <h3 className="trip-offers__card-title">{trip.title}</h3>
                    <div className="trip-offers__card-location">{trip.location}</div>
                  </div>
                </div>

                <p className="trip-offers__card-description">{trip.description}</p>

                <div className="trip-offers__card-features">
                  <div className="trip-offers__feature">
                    <svg className="trip-offers__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {trip.duration}
                  </div>
                  <div className="trip-offers__feature">
                    <svg className="trip-offers__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {trip.groupSize}
                  </div>
                  <div className="trip-offers__feature">
                    <svg className="trip-offers__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {trip.difficulty}
                  </div>
                </div>

                <div className="trip-offers__card-footer">
                  <div className="trip-offers__price">
                    <span className="trip-offers__price-old">₹{trip.originalPrice.toLocaleString()}</span>
                    <span className="trip-offers__price-new">₹{trip.price.toLocaleString()}</span>
                  </div>
                  <button 
                    className="trip-offers__card-cta"
                    onClick={() => handleExploreClick(trip.id)}
                  >
                    View Offers
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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