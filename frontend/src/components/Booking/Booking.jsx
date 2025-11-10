"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/Context/AuthContext';
import "./Booking.css";

export default function BookingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState({
    package: null,
    travelDates: {
      startDate: "",
      endDate: "",
    },
    travelers: {
      adults: 2,
      children: 0,
    },
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "India",
    },
    preferences: {
      specialRequests: "",
    },
  });

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Sample packages
  const packages = [
    {
      id: 1,
      name: "Classic Kerala Backwaters",
      duration: "3 Days / 2 Nights",
      price: 12499,
      originalPrice: 15999,
      category: "Backwaters",
      highlights: ["Houseboat Stay", "Traditional Lunch", "Village Tour", "Sunset Cruise"],
      description: "Experience the serene backwaters of Kerala with houseboat stay and traditional cuisine.",
      image: "/assets/images/backwaters.jpeg",
      color: "#0ea5e9"
    },
    {
      id: 2,
      name: "Ayurvedic Wellness Retreat",
      duration: "5 Days / 4 Nights",
      price: 18999,
      originalPrice: 24999,
      category: "Wellness",
      highlights: ["Daily Yoga", "Ayurvedic Massages", "Meditation", "Organic Meals"],
      description: "Rejuvenate your mind and body with authentic Ayurvedic treatments and yoga sessions.",
      image: "/assets/images/Ayurvedic.jpeg",
      color: "#10b981"
    },
    {
      id: 3,
      name: "Romantic Honeymoon Escape",
      duration: "4 Days / 3 Nights",
      price: 22999,
      originalPrice: 28999, 
      category: "Honeymoon",
      highlights: ["Private Villa", "Candlelight Dinner", "Couple Spa", "Photo Session"],
      description: "Perfect romantic getaway with private villas, candlelight dinners, and couple spa.",
      image: "/assets/images/Romantic.jpeg",
      color: "#ec4899"
    },
    {
      id: 4,
      name: "Wildlife Adventure",
      duration: "4 Days / 3 Nights",
      price: 16999,
      originalPrice: 20999,
      category: "Adventure",
      highlights: ["Jungle Safari", "Elephant Ride", "Bird Watching", "Nature Walk"],
      description: "Explore the rich wildlife and natural beauty of Kerala's forests.",
      image: "/assets/images/wildlife.jpeg",
      color: "#f59e0b"
    },
    {
      id: 5,
      name: "Cultural Heritage Tour ",
      duration: "5 Days / 4 Nights",
      price: 14999,
      originalPrice: 18999,
      category: "Cultural",
      highlights: ["Temple Visits", "Traditional Arts", "Local Cuisine", "Heritage Sites"],
      description: "Immerse yourself in Kerala's rich cultural heritage and traditions.",
      image: "/assets/images/Cultural.jpeg",
      color: "#8b5cf6"
    },
  ];

  // Available promo codes - including user's personal promo code
  const availablePromoCodes = useMemo(() => {
    const basePromoCodes = [
      {
        code: "WELCOME15",
        discount: 15,
        type: "percentage",
        description: "15% off on first booking",
        minAmount: 0,
        valid: true
      },
      {
        code: "SUMMER20",
        discount: 20,
        type: "percentage",
        description: "20% off summer special",
        minAmount: 15000,
        valid: true
      },
      {
        code: "KERALA500",
        discount: 500,
        type: "fixed",
        description: "₹500 off on any package",
        minAmount: 10000,
        valid: true
      }
    ];

    // Add user's personal promo code if available
    if (user?.promoCode) {
      basePromoCodes.push({
        code: user.promoCode,
        discount: 15,
        type: "percentage",
        description: "15% off your first booking - Welcome Gift!",
        minAmount: 0,
        valid: true,
        isPersonal: true
      });
    }

    return basePromoCodes;
  }, [user?.promoCode]);

  // Calculate base total
  const calculateBaseTotal = () => {
    if (!bookingData.package) return 0;
    const basePrice = bookingData.package.price;
    const adults = bookingData.travelers.adults;
    const children = bookingData.travelers.children;
    return basePrice * adults + basePrice * 0.7 * children;
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    const baseTotal = calculateBaseTotal();
    
    if (appliedPromo.type === "percentage") {
      return (baseTotal * appliedPromo.discount) / 100;
    } else {
      return Math.min(appliedPromo.discount, baseTotal);
    }
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    const baseTotal = calculateBaseTotal();
    const discount = calculateDiscount();
    const subtotal = baseTotal - discount;
    const taxes = subtotal * 0.18;
    return subtotal + taxes;
  };

  // Apply promo code
  const applyPromoCode = () => {
    setPromoError("");
    setPromoSuccess("");

    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    const promo = availablePromoCodes.find(
      p => p.code.toUpperCase() === promoCode.toUpperCase().trim()
    );

    if (!promo) {
      setPromoError("Invalid promo code");
      return;
    }

    if (!promo.valid) {
      setPromoError("This promo code has expired");
      return;
    }

    const baseTotal = calculateBaseTotal();
    if (baseTotal < promo.minAmount) {
      setPromoError(`Minimum booking amount of ₹${promo.minAmount.toLocaleString()} required`);
      return;
    }

    setAppliedPromo(promo);
    setPromoSuccess(`Promo code applied! ${promo.description}`);
    setPromoCode("");
  };

  // Remove promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError("");
    setPromoSuccess("");
  };

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setBookingData((prev) => ({
      ...prev,
      package: pkg,
    }));
    // Clear applied promo when package changes
    if (appliedPromo) {
      removePromoCode();
    }
  };

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle traveler counter
  const handleTravelerChange = (type, operation) => {
    setBookingData((prev) => ({
      ...prev,
      travelers: {
        ...prev.travelers,
        [type]:
          operation === "increment"
            ? prev.travelers[type] + 1
            : Math.max(type === "adults" ? 1 : 0, prev.travelers[type] - 1),
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final booking submitted:", {
      ...bookingData,
      appliedPromo,
      finalAmount: calculateFinalTotal()
    });
    
    // Show success message with discount details
    const discountMessage = appliedPromo 
      ? ` with ${appliedPromo.discount}% discount applied!` 
      : "!";
    
    alert(`Booking submitted successfully${discountMessage}`);
    router.push("/");
  };

  const isFormValid = () => {
    return (
      bookingData.package &&
      bookingData.travelDates.startDate &&
      bookingData.travelDates.endDate &&
      bookingData.personalInfo.firstName &&
      bookingData.personalInfo.lastName &&
      bookingData.personalInfo.email &&
      bookingData.personalInfo.phone
    );
  };

  // Auto-fill user's promo code if available
  const fillUserPromoCode = () => {
    if (user?.promoCode) {
      setPromoCode(user.promoCode);
    }
  };

  // Auto-apply user's promo code on component mount if package is selected
  useState(() => {
    if (user?.promoCode && bookingData.package && !appliedPromo) {
      const userPromo = availablePromoCodes.find(p => p.code === user.promoCode);
      if (userPromo) {
        const baseTotal = calculateBaseTotal();
        if (baseTotal >= userPromo.minAmount) {
          setAppliedPromo(userPromo);
          setPromoSuccess(`Your welcome promo applied! ${userPromo.description}`);
        }
      }
    }
  });

  return (
    <section className="booking-page">
      <div className="container">
        {/* Header */}
        <div className="booking-header" style={{marginTop: "70px"}}>
          <h1>Book Your Kerala Adventure</h1>
          <p>Complete your booking in one simple step</p>
        </div>

        <div className="booking-content">
          {/* Left Side - Horizontal Package Scroll */}
          <div className="packages-section">
            <h2>Select Your Package</h2>
            <div className="packages-scroll">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`package-card ${bookingData.package?.id === pkg.id ? "selected" : ""}`}
                  onClick={() => handlePackageSelect(pkg)}
                  style={{ '--accent-color': pkg.color }}
                >
                  <div className="package-image" style={{ backgroundColor: pkg.color }}>
                    <img src={pkg.image} alt="" />
                  </div>
                  <div className="package-info">
                    <h3>{pkg.name}</h3>
                    <p className="package-category">{pkg.category}</p>
                    <div className="package-pricing">
                      <span className="current-price">₹{pkg.price.toLocaleString()}</span>
                      <span className="original-price">₹{pkg.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="package-duration">{pkg.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle - Form */}
          <div className="form-section" >
            {bookingData.package ? (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="selected-package-header">
                  <div className="package-icon" style={{ backgroundColor: bookingData.package.color }}>
                    <img src={bookingData.package.image} alt="" />
                  </div>
                  <div>
                    <h2>{bookingData.package.name}</h2>
                    <p>{bookingData.package.description}</p>
                  </div>
                </div>

                <div className="form-content">
                  {/* Travel Details */}
                  <div className="form-group-section">
                    <h3>Travel Details</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Start Date *</label>
                        <input
                          type="date"
                          value={bookingData.travelDates.startDate}
                          onChange={(e) => handleInputChange("travelDates", "startDate", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>End Date *</label>
                        <input
                          type="date"
                          value={bookingData.travelDates.endDate}
                          onChange={(e) => handleInputChange("travelDates", "endDate", e.target.value)}
                          min={bookingData.travelDates.startDate || new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="form-group-section">
                    <h3>Personal Information</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input
                          type="text"
                          value={bookingData.personalInfo.firstName}
                          onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          value={bookingData.personalInfo.lastName}
                          onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          value={bookingData.personalInfo.email}
                          onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          value={bookingData.personalInfo.phone}
                          onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Country</label>
                        <select
                          value={bookingData.personalInfo.country}
                          onChange={(e) => handleInputChange("personalInfo", "country", e.target.value)}
                        >
                          <option value="India">India</option>
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Special Requests</label>
                      <textarea
                        value={bookingData.preferences.specialRequests}
                        onChange={(e) => handleInputChange("preferences", "specialRequests", e.target.value)}
                        rows="3"
                        placeholder="Any special requirements or requests..."
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{marginBottom: "50px"}}
                      disabled={!isFormValid()}
                    >
                      Complete Booking - ₹{calculateFinalTotal().toLocaleString()}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="no-package-selected">
                <div className="placeholder-icon">🎯</div>
                <h3>Select a Package to Continue</h3>
                <p>Choose from our amazing Kerala tour packages to start your booking</p>
              </div>
            )}
          </div>

          {/* Right Side - Preview */}
          <div className="preview-section">
            <div className="preview-header">
              <h3>Booking Preview</h3>
            </div>

            {bookingData.package ? (
              <div className="preview-content">
                {/* Promo Code Section */}
                <div className="promo-code-section">
                  <h4>Apply Promo Code</h4>
                  {!appliedPromo ? (
                    <div className="promo-input-group">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="promo-input"
                      />
                      <button 
                        type="button" 
                        onClick={applyPromoCode}
                        className="promo-apply-btn"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="promo-applied">
                      <div className="promo-success">
                        <span>✅ {appliedPromo.code} Applied</span>
                        <button 
                          onClick={removePromoCode}
                          className="promo-remove"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="promo-description">{appliedPromo.description}</p>
                    </div>
                  )}
                  
                  {promoError && (
                    <div className="promo-error">
                      ❌ {promoError}
                    </div>
                  )}
                  
                  {promoSuccess && (
                    <div className="promo-success-message">
                      ✅ {promoSuccess}
                    </div>
                  )}

                  {/* Auto-fill user's promo code */}
                  {user?.promoCode && !appliedPromo && (
                    <div className="user-promo-suggestion">
                      <p>Your personal promo code: <strong>{user.promoCode}</strong></p>
                      <button 
                        onClick={fillUserPromoCode}
                        className="use-my-promo-btn"
                      >
                        Use My Code
                      </button>
                    </div>
                  )}
                </div>

                <div className="package-preview">
                  <div className="preview-image">
                    <img src={bookingData.package.image} alt="" />
                  </div>
                  <div className="preview-info">
                    <h4>{bookingData.package.name}</h4>
                    <p className="preview-category">{bookingData.package.category}</p>
                    <p className="preview-duration">{bookingData.package.duration}</p>
                  </div>
                </div>

                <div className="preview-details">
                  <div className="detail-group">
                    <h4>Travel Details</h4>
                    <div className="detail-item">
                      <span>Travelers:</span>
                      <span>
                        {bookingData.travelers.adults} Adult{bookingData.travelers.adults !== 1 ? "s" : ""}
                        {bookingData.travelers.children > 0 && `, ${bookingData.travelers.children} Child${bookingData.travelers.children !== 1 ? "ren" : ""}`}
                      </span>
                    </div>

                    {bookingData.travelDates.startDate && (
                      <div className="detail-item">
                        <span>Dates:</span>
                        <span>
                          {new Date(bookingData.travelDates.startDate).toLocaleDateString()} - {" "}
                          {new Date(bookingData.travelDates.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="price-summary">
                    <h4>Price Summary</h4>
                    <div className="price-item">
                      <span>Base Price</span>
                      <span>₹{calculateBaseTotal().toLocaleString()}</span>
                    </div>

                    {/* Package Discount */}
                    <div className="price-item discount">
                      <span>Package Discount</span>
                      <span>-₹{(bookingData.package.originalPrice - bookingData.package.price).toLocaleString()}</span>
                    </div>

                    {/* Promo Code Discount */}
                    {appliedPromo && (
                      <div className="price-item promo-discount">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>-₹{calculateDiscount().toLocaleString()}</span>
                      </div>
                    )}

                    <div className="price-item subtotal">
                      <span>Subtotal</span>
                      <span>₹{(calculateBaseTotal() - calculateDiscount()).toLocaleString()}</span>
                    </div>

                    <div className="price-item taxes">
                      <span>Taxes (18%)</span>
                      <span>₹{((calculateBaseTotal() - calculateDiscount()) * 0.18).toLocaleString()}</span>
                    </div>

                    <div className="price-total">
                      <span>Total Amount</span>
                      <span>₹{calculateFinalTotal().toLocaleString()}</span>
                    </div>

                    {/* Savings Summary */}
                    {appliedPromo && (
                      <div className="savings-summary">
                        <div className="savings-item">
                          <span>You Save:</span>
                          <span className="savings-amount">
                            ₹{calculateDiscount().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-preview">
                <div className="empty-icon">📋</div>
                <p>Select a package to see booking preview</p>
              </div>
            )}

            {/* Support Card */}
            <div className="support-card">
              <div className="support-icon">💬</div>
              <h4>Need Help?</h4>
              <p>Our travel experts are here to assist you</p>
              <div className="support-contact">
                <div className="contact-item">
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <span>✉️</span>
                  <span>help@keralatours.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}