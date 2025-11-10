'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './SpecialOfferDetails.css';

export default function SpecialOffersClient() {
  const [activeOffer, setActiveOffer] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const [highlightedOffer, setHighlightedOffer] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a highlighted offer from TripOffers
    const highlight = searchParams.get('highlight');
    if (highlight) {
      const offerIndex = specialOffers.findIndex(offer => offer.relatedTripId === parseInt(highlight));
      if (offerIndex !== -1) {
        setActiveOffer(offerIndex);
        setHighlightedOffer(parseInt(highlight));
      }
    }
  }, [searchParams]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleBookOffer = (offerId, relatedTripId) => {
    if (relatedTripId) {
      router.push(`/booking?offer=${relatedTripId}`);
    } else {
      router.push('/booking');
    }
  };

  const specialOffers = [
    {
      id: 1,
      title: "Early Bird Kerala Special",
      subtitle: "Book 60 Days in Advance",
      discount: "25% OFF",
      description: "Plan your Kerala getaway in advance and save big! Perfect for backwaters and hill station tours.",
      code: "KERALA25",
      validUntil: "2024-12-31",
      features: [
        "Free airport transfer in Kochi",
        "Traditional welcome drink",
        "Complimentary Ayurvedic head massage",
        "Flexible cancellation policy"
      ],
      color: "#3B82F6",
      gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
      lightColor: "#EFF6FF",
      icon: "🕐",
      relatedTripId: 1
    },
    {
      id: 2,
      title: "Family Kerala Getaway",
      subtitle: "Perfect for Family Vacations",
      discount: "30% OFF",
      description: "Create unforgettable memories with your family in God's Own Country. Special rates for families.",
      code: "FAMILY30",
      validUntil: "2024-11-30",
      features: [
        "Kids stay & eat free (under 12)",
        "Family-friendly houseboat cruise",
        "Traditional Kerala puppet show",
        "Child-friendly Ayurvedic treatments"
      ],
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #34D399)",
      lightColor: "#ECFDF5",
      icon: "👨‍👩‍👧‍👦",
      relatedTripId: 4
    },
    {
      id: 3,
      title: "Kerala Honeymoon Suite",
      subtitle: "Romantic Kerala Escape",
      discount: "40% OFF",
      description: "Celebrate your love in paradise. Exclusive honeymoon packages with romantic houseboat stays.",
      code: "LOVE40",
      validUntil: "2024-10-31",
      features: [
        "Romantic candlelight dinner on houseboat",
        "Couples Ayurvedic spa treatment",
        "Private backwater cruise",
        "Honeymoon suite upgrade"
      ],
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
      lightColor: "#F5F3FF",
      icon: "💝",
      relatedTripId: 3
    },
    {
      id: 4,
      title: "Last Minute Kerala Deal",
      subtitle: "Spontaneous Kerala Getaway",
      discount: "35% OFF",
      description: "Ready for a spontaneous Kerala adventure? Grab these last-minute deals for quick getaways.",
      code: "KERALA35",
      validUntil: "2024-09-30",
      features: [
        "Instant confirmation",
        "24/7 Kerala travel support",
        "Quick booking process",
        "Best available rates"
      ],
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)",
      lightColor: "#FFFBEB",
      icon: "⚡",
      relatedTripId: 2
    },
    {
      id: 5,
      title: "Extended Kerala Stay",
      subtitle: "Long Kerala Vacation",
      discount: "20% OFF",
      description: "Stay longer and explore more of Kerala! Special discounts for extended stays of 7 nights or more.",
      code: "STAY20",
      validUntil: "2024-12-31",
      features: [
        "Weekly traditional housekeeping",
        "Complimentary Ayurvedic consultation",
        "Free cultural activity credits",
        "Priority dining reservations"
      ],
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #F87171)",
      lightColor: "#FEF2F2",
      icon: "🏖️",
      relatedTripId: 5
    }
  ];

  const limitedTimeOffers = [
    {
      id: 1,
      title: "Kerala Holidays",
      discount: "15% OFF",
      description: "Perfect short escape to experience Alleppey backwaters over the weekend",
      validUntil: "2024-08-15",
      tag: "Weekend Special",
      color: "#F59E0B",
      lightColor: "#FFFBEB",
      relatedTripId: 1
    },
    {
      id: 2,
      title: "Monsoon Ayurveda",
      discount: "20% OFF",
      description: "Experience the healing power of Ayurveda during Kerala's monsoon season",
      validUntil: "2024-09-30",
      tag: "Seasonal",
      color: "#06B6D4",
      lightColor: "#ECFEFF",
      relatedTripId: 2
    },
    {
      id: 3,
      title: "Group Kerala Tour",
      discount: "25% OFF",
      description: "Special rates for groups of 6 or more exploring Kerala together",
      validUntil: "2024-12-31",
      tag: "Group Deal",
      color: "#8B5CF6",
      lightColor: "#F5F3FF",
      relatedTripId: 4
    }
  ];

  return (
    <section className="special-offers-section">
      <div className="container">
        {/* Back Button */}
        <div className="back-button-container">
          <button onClick={handleBack} className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Packages
          </button>
        </div>

        {/* Section Header */}
        <div className="offers-header">
          <div className="header-content">
            <div className="badge">✨ Kerala Exclusive Offers</div>
            <h2>Special Kerala Travel Deals</h2>
            <p>Handpicked offers to make your Kerala experience unforgettable with amazing discounts</p>
          </div>
          <div className="header-decoration">
            <div className="decoration-star">🎯</div>
            <div className="decoration-sparkle">💫</div>
          </div>
        </div>

        {/* Limited Time Offers Grid */}
        <div className="limited-offers-section">
          <div className="limited-offers-grid">
            {limitedTimeOffers.map((offer) => (
              <div 
                key={offer.id} 
                className="limited-offer-card"
                style={{ '--card-color': offer.color, '--card-light': offer.lightColor }}
              >
                <div className="offer-tag" style={{ backgroundColor: offer.color }}>
                  {offer.tag}
                </div>
                
                <div className="limited-offer-content">
                  <h4>{offer.title}</h4>
                  <div className="limited-discount" style={{ color: offer.color }}>
                    {offer.discount}
                  </div>
                  <p>{offer.description}</p>
                  
                  <div className="limited-offer-footer">
                    <div className="time-remaining">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Ends {offer.validUntil}
                    </div>
                    <button 
                      className="quick-book-btn"
                      style={{ backgroundColor: offer.color }}
                      onClick={() => handleBookOffer(offer.id, offer.relatedTripId)}
                    >
                      Book Kerala Trip
                    </button>
                  </div>
                </div>

                <div className="limited-offer-glow" style={{ backgroundColor: offer.color }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="offers-cta">
          <div className="cta-card">
            <div className="cta-content">
              <h3>Need a Custom Kerala Package?</h3>
              <p>Our Kerala travel experts are ready to create your perfect itinerary through God's Own Country</p>
              <div className="cta-buttons">
                <button 
                  className="cta-btn primary"
                  onClick={() => router.push('/contacts')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Chat with Kerala Expert
                </button>
                <button 
                  className="cta-btn secondary"
                  onClick={() => router.push('/booking')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Get Custom Kerala Quote
                </button>
              </div>
            </div>
            <div className="cta-decoration">
              <div className="cta-star">🌟</div>
              <div className="cta-sparkle">💎</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}