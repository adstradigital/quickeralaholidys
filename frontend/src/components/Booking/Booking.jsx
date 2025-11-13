"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from '@/Context/AuthContext';
import "./Booking.css";
import axios from "axios";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      address: "",
      country: "India",
    },
    tourDetails: {
      destination: "",
      preferences: ""
    },
    preferences: {
      specialRequests: "",
    },
  });

  // Get package data from URL if passed from package view
  useEffect(() => {
    const packageData = searchParams.get('packageData');
    if (packageData) {
      try {
        const pkg = JSON.parse(decodeURIComponent(packageData));
        setBookingData(prev => ({
          ...prev,
          package: pkg
        }));
      } catch (error) {
        console.error('Error parsing package data:', error);
      }
    }
  }, [searchParams]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

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
// ✅ Only one handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      package: bookingData.package ? { id: bookingData.package.id } : null,
      user: user?.id || null,
      travelDates: bookingData.travelDates,
      travelers: bookingData.travelers,
      personalInfo: bookingData.personalInfo,
      tourDetails: bookingData.tourDetails,
      preferences: bookingData.preferences,
      appliedPromo: appliedPromo,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/package/bookings/create/",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 201) {
      alert("Booking saved successfully!");
      console.log("Booking Response:", response.data);
      router.push("/"); // Redirect or show confirmation page
    }
  } catch (error) {
    console.error("Error submitting booking:", error);
    alert("Something went wrong while saving your booking!");
  }
};

  const isFormValid = () => {
    const hasPackageOrDestination = bookingData.package || bookingData.tourDetails.destination;
    
    return (
      hasPackageOrDestination &&
      bookingData.travelDates.startDate &&
      bookingData.travelDates.endDate &&
      bookingData.travelers.adults > 0 &&
      bookingData.personalInfo.firstName &&
      bookingData.personalInfo.lastName &&
      bookingData.personalInfo.email &&
      bookingData.personalInfo.phone &&
      bookingData.personalInfo.address
    );
  };

  // Auto-fill user's promo code if available
  const fillUserPromoCode = () => {
    if (user?.promoCode) {
      setPromoCode(user.promoCode);
    }
  };

  return (
    <section className="booking-page">
      <div className="container">
        {/* Header */}
        <div className="booking-header" style={{marginTop: "70px"}}>
          <h1>Book Your Kerala Adventure</h1>
          <p>Complete your booking in one simple step</p>
        </div>

        <div className="booking-content" style={{ 
          gridTemplateColumns: bookingData.package ? '1fr 350px' : '1fr' 
        }}>
          
          {/* Middle - Form */}
          <div className="form-section">
            <form onSubmit={handleSubmit} className="booking-form">
              {bookingData.package && (
                <div className="selected-package-header">
                  <div className="package-icon" style={{ backgroundColor: bookingData.package.color }}>
                    <img src={bookingData.package.image} alt="" />
                  </div>
                  <div>
                    <h2>{bookingData.package.name}</h2>
                    {/* <p>{bookingData.package.description}</p> */}
                  </div>
                </div>
              )}

              <div className="form-content">
                {/* Tour Destination (shown when no package selected) */}
                {!bookingData.package && (
                  <div className="form-group-section">
                    <h3>Tour Details</h3>
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Destination *</label>
                        <input
                          type="text"
                          value={bookingData.tourDetails.destination}
                          onChange={(e) => handleInputChange("tourDetails", "destination", e.target.value)}
                          placeholder="Where do you want to go? (e.g., Munnar, Alleppey)"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>Your Preferences</label>
                      <textarea
                        value={bookingData.tourDetails.preferences}
                        onChange={(e) => handleInputChange("tourDetails", "preferences", e.target.value)}
                        rows="3"
                        placeholder="Tell us about your ideal tour (activities, accommodation type, etc.)"
                      />
                    </div>
                  </div>
                )}

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

                  <div className="form-row">
                    <div className="form-group">
                      <label>Adults (18+ years) *</label>
                      <div className="counter-group">
                        <button
                          type="button"
                          onClick={() => handleTravelerChange("adults", "decrement")}
                          className="counter-btn"
                        >
                          -
                        </button>
                        <span className="counter-value">{bookingData.travelers.adults}</span>
                        <button
                          type="button"
                          onClick={() => handleTravelerChange("adults", "increment")}
                          className="counter-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Children (0-17 years)</label>
                      <div className="counter-group">
                        <button
                          type="button"
                          onClick={() => handleTravelerChange("children", "decrement")}
                          className="counter-btn"
                        >
                          -
                        </button>
                        <span className="counter-value">{bookingData.travelers.children}</span>
                        <button
                          type="button"
                          onClick={() => handleTravelerChange("children", "increment")}
                          className="counter-btn"
                        >
                          +
                        </button>
                      </div>
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

                  <div className="form-group full-width">
                    <label>Address *</label>
                    <textarea
                      value={bookingData.personalInfo.address}
                      onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                      rows="2"
                      placeholder="Your complete address"
                      required
                    />
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
                    {bookingData.package 
                      ? `Complete Booking - ₹${calculateFinalTotal().toLocaleString()}`
                      : 'Book Now'
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side - Preview (only shows when package is selected) */}
          {bookingData.package && (
            <div className="preview-section">
              <div className="preview-header">
                <h3>Booking Preview</h3>
              </div>

              <div className="preview-content">
                {/* Package Preview */}
                <div className="package-preview">
                  <div className="preview-image" style={{ backgroundColor: bookingData.package.color }}>
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
                    {bookingData.package.originalPrice && (
                      <div className="price-item discount">
                        <span>Package Discount</span>
                        <span>-₹{((bookingData.package.originalPrice - bookingData.package.price) * bookingData.travelers.adults).toLocaleString()}</span>
                      </div>
                    )}

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
              </div>

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
          )}
        </div>
      </div>
    </section>
  );
}
