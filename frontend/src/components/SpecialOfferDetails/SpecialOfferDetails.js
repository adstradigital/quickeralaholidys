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
      description: "Plan your Kerala getaway in advance and save big!",
      code: "KERALA25",
      validUntil: "2024-12-31",
      features: [
        "Free airport transfer",
        "Traditional welcome drink",
        "Ayurvedic head massage"
      ],
      color: "#3B82F6",
      gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
      lightColor: "#EFF6FF",
      icon: "🕐",
      relatedTripId: 1,

      // ADD IMAGE HERE
      image: "/assets/romantic_honeymoon_quick."
    },
    {
      id: 2,
      title: "Family Kerala Getaway",
      subtitle: "Perfect for Family Vacations",
      discount: "30% OFF",
      description: "Great discounts for family vacation packages.",
      code: "FAMILY30",
      validUntil: "2024-11-30",
      features: [
        "Kids stay free",
        "Family-friendly houseboat",
        "Puppet show"
      ],
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #34D399)",
      lightColor: "#ECFDF5",
      icon: "👨‍👩‍👧‍👦",
      relatedTripId: 4,

      image: "/assets/offers/offer2.jpg"
    },
    {
      id: 3,
      title: "Kerala Honeymoon Suite",
      subtitle: "Romantic Kerala Escape",
      discount: "40% OFF",
      description: "Exclusive honeymoon packages.",
      code: "LOVE40",
      validUntil: "2024-10-31",
      features: [
        "Candlelight dinner",
        "Couples spa",
        "Private cruise"
      ],
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
      lightColor: "#F5F3FF",
      icon: "💝",
      relatedTripId: 3,

      image: "/assets/offers/offer3.jpg"
    }
  ];

  const limitedTimeOffers = [
    {
      id: 1,
      title: "Special Kerala",
      discount: "15% OFF",
      description: "Perfect escape covering Munnar and Alleppey.",
      validUntil: "2024-08-15",
      tag: "Weekend Special",
      color: "#F59E0B",
      lightColor: "#FFFBEB",
      relatedTripId: 1,
      packageDetails: "4 Nights 5 Days | Munnar, Thekkady, Alleppey",
      startingPrice: "₹36,200",

      // ADD IMAGE HERE
      image: "/assets/ayurvedic_rejuvation_quick.png"
    },
    {
      id: 2,
      title: "Honeymoon Special",
      discount: "20% OFF",
      description: "Romantic Kerala honeymoon trip.",
      validUntil: "2024-09-30",
      tag: "Seasonal",
      color: "#06B6D4",
      lightColor: "#ECFEFF",
      relatedTripId: 2,
      packageDetails: "4 Nights | Munnar & Alleppey",
      startingPrice: "₹36,200",

      image: "/assets/romantic_honeymoon_quick.png"
    },
    {
      id: 3,
      title: "Grand Kerala Group Tour",
      discount: "25% OFF",
      description: "Complete Kerala tour for groups.",
      validUntil: "2024-12-31",
      tag: "Group Deal",
      color: "#8B5CF6",
      lightColor: "#F5F3FF",
      relatedTripId: 4,
      packageDetails: "7 Nights | Cochin, Munnar, Kovalam",
      startingPrice: "₹58,500",

      image: "/assets/cultural_kerala_quick.png"
    }
  ];

  return (
    <section className="special-offers-section">
      <div className="container">

        {/* Back Button */}
        <div className="back-button-container">
          <button onClick={handleBack} className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" />
            </svg>
            Back to Packages
          </button>
        </div>

        {/* Header */}
        <div className="offers-header">
          <div className="header-content">
            <div className="badge">✨ Kerala Exclusive Offers</div>
            <h2>Special Kerala Travel Deals</h2>
            <p>Handpicked offers to make your Kerala experience unforgettable.</p>
          </div>
        </div>

        {/* LIMITED TIME OFFERS */}
        <div className="limited-offers-section">
          <div className="limited-offers-grid">
            {limitedTimeOffers.map((offer) => (
              <div 
                key={offer.id} 
                className="limited-offer-card"
                style={{ '--card-color': offer.color, '--card-light': offer.lightColor }}
              >

                {/* IMAGE ADDED HERE */}
                <div className="limited-offer-image">
                  <img src={offer.image} alt={offer.title} />
                </div>

                <div className="offer-tag" style={{ backgroundColor: offer.color }}>
                  {offer.tag}
                </div>

                <div className="limited-offer-content">
                  <h4>{offer.title}</h4>
                  <div className="package-duration" style={{ color: offer.color }}>
                    {offer.packageDetails}
                  </div>
                  <div className="limited-discount" style={{ color: offer.color }}>
                    {offer.discount}
                  </div>
                  <p>{offer.description}</p>

                  <div className="price-info">
                    Starting from <span style={{ color: offer.color }}>{offer.startingPrice}</span> per couple
                  </div>

                  <div className="limited-offer-footer">
                    <div className="time-remaining">
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

              </div>
            ))}
          </div>
        </div>

        {/* CUSTOM CTA */}
        <div className="offers-cta">
          <div className="cta-card">
            <div className="cta-content">
              <h3>Need a Custom Kerala Package?</h3>
              <p>Our Kerala experts can customize your perfect travel plan.</p>

              <div className="cta-buttons">
                <button 
                  className="cta-btn primary"
                  onClick={() => router.push('/contacts')}
                >
                  Chat with Expert
                </button>

                <button 
                  className="cta-btn secondary"
                  onClick={() => router.push('/booking')}
                >
                  Get Quote
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
