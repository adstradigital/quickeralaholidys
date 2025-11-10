'use client';
import { useState } from 'react';
import './PackageView.css';

export default function PackageView({ package: pkg, onBack, onBookNow }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    infants: 0
  });

  // Calculate total price based on travelers
  const calculateTotalPrice = () => {
    const basePrice = parseInt(pkg.price.replace(/[^0-9]/g, ''));
    const total = basePrice * travelers.adults + 
                 (basePrice * 0.7) * travelers.children;
    return total;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'gallery', label: 'Gallery' }
  ];

  // Sample itinerary data
  const itinerary = [
    {
      day: 1,
      title: "Arrival & Welcome",
      activities: [
        "Arrive at Cochin International Airport",
        "Traditional welcome with garlands",
        "Transfer to hotel/resort",
        "Evening at leisure",
        "Welcome dinner with local cuisine"
      ],
      meals: ["Dinner"],
      accommodation: "Luxury Resort"
    },
    {
      day: 2,
      title: "Backwaters Experience",
      activities: [
        "Morning yoga session",
        "Houseboat cruise through backwaters",
        "Traditional Kerala lunch on board",
        "Village walk and local interactions",
        "Sunset viewing point"
      ],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "Houseboat"
    },
    {
      day: 3,
      title: "Cultural Immersion & Departure",
      activities: [
        "Ayurvedic massage session",
        "Visit to local spice plantation",
        "Traditional Kathakali dance performance",
        "Shopping for local handicrafts",
        "Transfer to airport for departure"
      ],
      meals: ["Breakfast", "Lunch"],
      accommodation: "None"
    }
  ];

  // Sample reviews
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely amazing experience! The houseboat stay was the highlight of our trip. The staff was incredibly friendly and the food was delicious.",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      date: "2024-01-10",
      comment: "Great package overall. The backwaters were beautiful, but I wish we had more time at each location. Would recommend for a short getaway.",
      verified: true
    },
    {
      id: 3,
      name: "Anita Desai",
      rating: 5,
      date: "2024-01-05",
      comment: "Perfect honeymoon package! The private villa was romantic and the candlelight dinner was magical. Will definitely come back.",
      verified: true
    }
  ];

  // Sample gallery images
  const galleryImages = [
    { id: 1, src: "/images/gallery/backwaters-1.jpg", alt: "Backwaters scenery" },
    { id: 2, src: "/images/gallery/houseboat-1.jpg", alt: "Luxury houseboat" },
    { id: 3, src: "/images/gallery/food-1.jpg", alt: "Traditional Kerala cuisine" },
    { id: 4, src: "/images/gallery/sunset-1.jpg", alt: "Backwaters sunset" },
    { id: 5, src: "/images/gallery/village-1.jpg", alt: "Local village life" },
    { id: 6, src: "/images/gallery/ayurveda-1.jpg", alt: "Ayurvedic treatment" }
  ];

  const inclusions = [
    { type: 'Accommodation', details: '2 nights in luxury resort, 1 night in deluxe houseboat' },
    { type: 'Meals', details: 'Daily breakfast, 2 lunches, 2 dinners including traditional Kerala cuisine' },
    { type: 'Transport', details: 'Airport transfers, all local transportation, houseboat cruise' },
    { type: 'Activities', details: 'Village tour, yoga session, Kathakali dance performance, spice plantation visit' },
    { type: 'Services', details: 'English speaking guide, all entry fees, taxes' }
  ];

  const exclusions = [
    'Airfare and travel insurance',
    'Personal expenses and tips',
    'Alcoholic beverages',
    'Any services not mentioned in inclusions',
    'Optional activities'
  ];

  return (
    <section className="package-view-section">
      <div className="container">
        {/* Back Button */}
        <div className="back-button-container">
          <button onClick={onBack} className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Packages
          </button>
        </div>

        <div className="package-view-layout">
          {/* Main Content */}
          <div className="package-view-main">
            {/* Package Header */}
            <div className="package-view-header">
              <div className="package-breadcrumb">
                <span>Packages</span>
                <span>›</span>
                <span>{pkg.category}</span>
                <span>›</span>
                <span className="current">{pkg.title}</span>
              </div>
              
              <div className="package-title-section">
                <h1>{pkg.title}</h1>
                <div className="package-meta">
                  <div className="rating-badge">
                    <span className="stars">⭐ {pkg.rating}</span>
                    <span className="reviews">({pkg.reviews} reviews)</span>
                  </div>
                  <div className="duration-badge">
                    {pkg.days} Days / {pkg.nights} Nights
                  </div>
                  <div className="category-badge">
                    {pkg.category}
                  </div>
                </div>
              </div>

              <div className="package-highlights-grid">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-icon">✓</div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Gallery */}
            <div className="package-gallery">
              <div className="main-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🏞️</span>
                </div>
              </div>
              <div className="thumbnail-grid">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <div key={image.id} className="thumbnail">
                    <div className="image-placeholder small">
                      <span className="placeholder-icon">📸</span>
                    </div>
                    {index === 3 && galleryImages.length > 4 && (
                      <div className="more-images">+{galleryImages.length - 4}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="package-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <div className="overview-section">
                    <h3>Package Description</h3>
                    <p>{pkg.description}</p>
                    <p>
                      Experience the magic of Kerala's backwaters with this carefully curated package. 
                      From serene houseboat cruises to authentic cultural experiences, this journey offers 
                      the perfect blend of relaxation and adventure.
                    </p>
                  </div>

                  <div className="overview-section">
                    <h3>Key Features</h3>
                    <div className="features-grid">
                      <div className="feature-item">
                        <div className="feature-icon">🛌</div>
                        <div className="feature-content">
                          <h4>Luxury Accommodation</h4>
                          <p>Stay in handpicked luxury resorts and traditional houseboats</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">🍽️</div>
                        <div className="feature-content">
                          <h4>Authentic Cuisine</h4>
                          <p>Enjoy traditional Kerala meals prepared with local ingredients</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">🧘</div>
                        <div className="feature-content">
                          <h4>Wellness Activities</h4>
                          <p>Yoga sessions and optional Ayurvedic treatments</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">🎭</div>
                        <div className="feature-content">
                          <h4>Cultural Experiences</h4>
                          <p>Traditional dance performances and local village visits</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <div className="itinerary-content">
                  <div className="itinerary-timeline">
                    {itinerary.map(day => (
                      <div key={day.day} className="timeline-day">
                        <div className="timeline-header">
                          <div className="day-number">Day {day.day}</div>
                          <h3 className="day-title">{day.title}</h3>
                        </div>
                        
                        <div className="timeline-content">
                          <div className="activities-section">
                            <h4>Activities</h4>
                            <ul className="activities-list">
                              {day.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="day-details">
                            <div className="detail-item">
                              <span className="detail-label">Meals:</span>
                              <span className="detail-value">{day.meals.join(', ')}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Accommodation:</span>
                              <span className="detail-value">{day.accommodation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions Tab */}
              {activeTab === 'inclusions' && (
                <div className="inclusions-content">
                  <div className="inclusions-section">
                    <h3>What's Included</h3>
                    <div className="inclusions-list">
                      {inclusions.map((item, index) => (
                        <div key={index} className="inclusion-item">
                          <div className="inclusion-icon">✅</div>
                          <div className="inclusion-content">
                            <strong>{item.type}</strong>
                            <p>{item.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="exclusions-section">
                    <h3>What's Not Included</h3>
                    <div className="exclusions-list">
                      {exclusions.map((item, index) => (
                        <div key={index} className="exclusion-item">
                          <div className="exclusion-icon">❌</div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="reviews-content">
                  <div className="reviews-summary">
                    <div className="overall-rating">
                      <div className="rating-score">{pkg.rating}</div>
                      <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                      <div className="rating-count">{pkg.reviews} reviews</div>
                    </div>
                    <div className="rating-breakdown">
                      <div className="rating-bar">
                        <span>5 stars</span>
                        <div className="bar">
                          <div className="fill" style={{width: '80%'}}></div>
                        </div>
                        <span>80%</span>
                      </div>
                      <div className="rating-bar">
                        <span>4 stars</span>
                        <div className="bar">
                          <div className="fill" style={{width: '15%'}}></div>
                        </div>
                        <span>15%</span>
                      </div>
                      <div className="rating-bar">
                        <span>3 stars</span>
                        <div className="bar">
                          <div className="fill" style={{width: '5%'}}></div>
                        </div>
                        <span>5%</span>
                      </div>
                    </div>
                  </div>

                  <div className="reviews-list">
                    {reviews.map(review => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <h4>{review.name}</h4>
                            {review.verified && <span className="verified-badge">✓ Verified</span>}
                          </div>
                          <div className="review-meta">
                            <div className="review-rating">⭐ {review.rating}.0</div>
                            <div className="review-date">{review.date}</div>
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div className="gallery-content">
                  <div className="gallery-grid">
                    {galleryImages.map(image => (
                      <div key={image.id} className="gallery-item">
                        <div className="image-placeholder gallery">
                          <span className="placeholder-icon">🏞️</span>
                        </div>
                        <div className="image-caption">{image.alt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="package-booking-sidebar">
            <div className="booking-card">
              <div className="booking-header">
                <h3>Book This Package</h3>
                <div className="price-section">
                  <div className="current-price">{pkg.price}</div>
                  <div className="original-price">{pkg.originalPrice}</div>
                  <div className="discount-badge">
                    Save ₹{(parseInt(pkg.originalPrice.replace(/[^0-9]/g, '')) - parseInt(pkg.price.replace(/[^0-9]/g, ''))).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="booking-form">
                <div className="form-group">
                  <label>Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                  

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Base Price ({travelers.adults} adults)</span>
                    <span>₹{(parseInt(pkg.price.replace(/[^0-9]/g, '')) * travelers.adults).toLocaleString()}</span>
                  </div>
                  {travelers.children > 0 && (
                    <div className="price-row">
                      <span>Children ({travelers.children})</span>
                      <span>₹{(parseInt(pkg.price.replace(/[^0-9]/g, '') * 0.7 * travelers.children)).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="price-row total">
                    <span>Total Amount</span>
                    <span>₹{calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  className="book-now-btn"
                  onClick={() => onBookNow && onBookNow(pkg, travelers, selectedDate)}
                >
                  Book Now
                </button>

                <div className="booking-features">
                  <div className="feature">
                    <div className="feature-icon">🔒</div>
                    <span>Free Cancellation</span>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">💳</div>
                    <span>Pay Later Available</span>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">📞</div>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="quick-contact-card">
              <div className="contact-icon">💬</div>
              <h4>Need Help?</h4>
              <p>Our travel experts are here to assist you</p>
              <div className="contact-buttons">
                <button className="contact-btn secondary" onClick={() => router.push('/contacts')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22.0016 20.1985 21.944 20.4743 21.831 20.7292C21.718 20.9841 21.5522 21.2123 21.345 21.3988C21.1378 21.5853 20.8939 21.7259 20.6295 21.8115C20.3651 21.8972 20.0864 21.926 19.81 21.896C16.7426 21.4855 13.7874 20.4405 11.12 18.828C8.68089 17.3566 6.54833 15.4241 4.86 13.14C3.24795 10.4681 2.20528 7.50683 1.8 4.43203C1.76922 4.15614 1.79717 3.87735 1.88183 3.61356C1.9665 3.34977 2.10582 3.10691 2.29082 2.9012C2.47582 2.69549 2.70235 2.53174 2.95517 2.42072C3.20799 2.30971 3.48117 2.25403 3.757 2.25703H6.757C7.19487 2.25413 7.61928 2.40765 7.953 2.69003C8.461 3.11003 8.757 4.00103 8.757 4.00103C8.757 4.00103 8.939 4.72603 9.11 5.36703C9.281 6.00803 9.56 6.55303 9.914 6.77403C10.268 6.99503 11.192 7.32903 11.192 7.32903L11.935 7.48903C13.267 7.80303 14.539 8.36703 15.682 9.15203L15.869 9.27803C16.053 9.43203 16.2686 9.5463 16.5011 9.61321C16.7337 9.68012 16.978 9.69816 17.218 9.66603C17.458 9.63203 18.108 9.53703 18.108 9.53703C18.108 9.53703 19.001 9.83403 19.511 10.254C19.793 10.5877 19.9465 11.0121 19.9436 11.45C19.944 11.682 19.901 11.912 19.817 12.128C19.788 12.203 19.754 12.276 19.717 12.347C19.396 13.011 18.822 13.773 18.822 13.773C18.822 13.773 19.39 15.579 19.607 16.283C19.824 16.987 22 16.92 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}