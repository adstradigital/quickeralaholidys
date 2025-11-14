// components/VehicleSelection.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import './VehicleBooking.css';

export default function VehicleSelection() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    passengers: 1,
    notes: ''
  });
  const scrollContainerRef = useRef(null);

  const vehicles = [
    {
      id: 1,
      name: "Hyundai Creta",
      type: "suv",
      image: "/assets/vehicle/creta.png",
      badge: "Premium SUV",
      description: "Comfortable and spacious SUV perfect for family trips and long journeys.",
      features: ["Spacious Interior", "AC", "Comfort Seats", "Luggage Space"],
      capacity: "5 People",
      range: "500 km",
      price: "₹2,499/day"
    },
    {
      id: 2,
      name: "Toyota Innova Crysta",
      type: "muv",
      image: "/assets/vehicle/crysta.png",
      badge: "Luxury MUV",
      description: "Premium people carrier with exceptional comfort and reliability.",
      features: ["7 Seater", "Premium AC", "Comfort Ride", "Spacious"],
      capacity: "7 People",
      range: "600 km",
      price: "₹4,999/day"
    },
    {
      id: 3,
      name: "Force Tempo traveler",
      type: "muv",
      image: "/assets/vehicle/tembo.png",
      badge: "Family MUV",
      description: "Versatile and efficient family vehicle with great fuel economy.",
      features: ["Fuel Efficient", "Family Friendly", "AC", "7 Seater"],
      capacity: "7 People",
      range: "550 km",
      price: "₹3,499/day"
    },
    {
      id: 4,
      name: "Hyundai i20",
      type: "hatchback",
      image: "/assets/vehicle/i20.png",
      badge: "Premium Hatch",
      description: "Compact and stylish hatchback perfect for city driving and small groups.",
      features: ["Compact Size", "Fuel Efficient", "AC", "Easy Parking"],
      capacity: "4 People",
      range: "450 km",
      price: "₹1,999/day"
    },
    {
      id: 6,
      name: "Mini Bus",
      type: "bus",
      image: "/assets/vehicle/bus.png",
      badge: "Group Travel",
      description: "Perfect for large groups, corporate travel, and family gatherings.",
      features: ["15+ Seater", "AC", "Spacious", "Group Travel"],
      capacity: "15+ People",
      range: "700 km",
      price: "₹8,999/day"
    },
    {
      id: 5,
      name: "Maruti Suzuki Ignis",
      type: "compact",
      image: "/assets/vehicle/ignis.png",
      badge: "City Compact",
      description: "Compact crossover with modern features and excellent maneuverability.",
      features: ["Compact Design", "Good Mileage", "AC", "Modern Features"],
      capacity: "4 People",
      range: "400 km",
      price: "₹1,799/day"
    },
  ];

  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0]);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    
    console.log('Booking submitted:', {
      vehicle: selectedVehicle,
      personalDetails: bookingData
    });
    
    // Show confirmation
    alert(`Booking confirmed for ${selectedVehicle.name}! We'll contact you at ${bookingData.phone} shortly.`);
    
    // Reset form
    setShowBookingForm(false);
    setBookingData({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      passengers: 1,
      notes: ''
    });
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
  };

  const getVehicleImage = (vehicleType) => {
    // Fallback images if actual images are not available
    const imageMap = {
      suv: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
      muv: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
      hatchback: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
      compact: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
      bus: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop"
    };
    return imageMap[vehicleType] || imageMap.suv;
  };

  return (
    <section className="vehicle-selection">
      {/* Background Grid */}
      
      <div className="vehicle-selection__container">
        {/* Header */}
        <div className="vehicle-selection__header">
          <h1 className="vehicle-selection__title">Choose Your Vehicle</h1>
          <p className="vehicle-selection__subtitle">
            Select from our premium fleet of vehicles for your journey across Kerala
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          className="vehicle-selection__scroll-container"
          ref={scrollContainerRef}
        >
          {vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className={`vehicle-selection__card ${
                selectedVehicle?.id === vehicle.id ? 'selected' : ''
              }`}
              onClick={() => handleVehicleSelect(vehicle)}
            >
              {/* Vehicle Image */}
              <div className="vehicle-selection__image">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="vehicle-selection__vehicle-image"
                  onError={(e) => {
                    e.target.src = getVehicleImage(vehicle.type);
                  }}
                />
                <div className="vehicle-selection__badge">
                  {vehicle.badge}
                </div>
                <div className="vehicle-selection__price">
                  {vehicle.price}
                </div>
              </div>

              {/* Vehicle Content */}
              <div className="vehicle-selection__content">
                <h3 className="vehicle-selection__name">{vehicle.name}</h3>
                <p className="vehicle-selection__description">
                  {vehicle.description}
                </p>

                <div className="vehicle-selection__features">
                  <div className="vehicle-selection__feature">
                    <svg className="vehicle-selection__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {vehicle.capacity}
                  </div>
                  <div className="vehicle-selection__feature">
                    <svg className="vehicle-selection__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {vehicle.range}
                  </div>
                  {vehicle.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="vehicle-selection__feature">
                      <svg className="vehicle-selection__feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <button 
                  className={`vehicle-selection__action ${
                    selectedVehicle?.id === vehicle.id ? 'selected' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBookingForm(true);
                  }}
                >
                  {selectedVehicle?.id === vehicle.id ? 'Book Now' : 'Select Vehicle'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="vehicle-selection__navigation">
          <button className="vehicle-selection__nav-btn" onClick={scrollLeft}>
            ‹
          </button>
          <button className="vehicle-selection__nav-btn" onClick={scrollRight}>
            ›
          </button>
        </div>

        {/* Selection Indicator */}
        <div className="vehicle-selection__indicator">
          {vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className={`vehicle-selection__dot ${
                selectedVehicle?.id === vehicle.id ? 'active' : ''
              }`}
              onClick={() => handleVehicleSelect(vehicle)}
            />
          ))}
        </div>
      </div>

      {/* Booking Form Overlay */}
      {showBookingForm && selectedVehicle && (
        <div className="booking-form__overlay">
          <div className="booking-form__container">
            <div className="booking-form__header">
              <h2>Book Your {selectedVehicle.name}</h2>
              <button className="booking-form__close" onClick={closeBookingForm}>
                ×
              </button>
            </div>
            
            <form className="booking-form" onSubmit={handleSubmitBooking}>
              <div className="booking-form__vehicle-info">
                <img 
                  src={selectedVehicle.image} 
                  alt={selectedVehicle.name}
                  className="booking-form__vehicle-image"
                  onError={(e) => {
                    e.target.src = getVehicleImage(selectedVehicle.type);
                  }}
                />
                <div>
                  <h3>{selectedVehicle.name}</h3>
                  <p>{selectedVehicle.description}</p>
                  <div className="booking-form__vehicle-details">
                    <span>{selectedVehicle.capacity}</span>
                    <span>{selectedVehicle.range}</span>
                    <span className="booking-form__price">{selectedVehicle.price}</span>
                  </div>
                </div>
              </div>

              <div className="booking-form__fields">
                {/* Personal Details */}
                <div className="form-section">
                  <h4 className="section-title">Personal Details</h4>
                  <div className="booking-form__group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={bookingData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="booking-form__row">
                    <div className="booking-form__group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="booking-form__group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="form-section">
                  <h4 className="section-title">Trip Details</h4>
                  <div className="booking-form__row">
                    <div className="booking-form__group">
                      <label htmlFor="date">Date *</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="booking-form__group">
                      <label htmlFor="time">Time *</label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={bookingData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-form__group">
                    <label htmlFor="passengers">Number of Passengers *</label>
                    <select
                      id="passengers"
                      name="passengers"
                      value={bookingData.passengers}
                      onChange={handleInputChange}
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="booking-form__group">
                  <label htmlFor="notes">Special Requirements</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements, pickup location details, or additional notes..."
                    rows="3"
                  />
                </div>
              </div>

              <div className="booking-form__actions">
                <button type="button" className="booking-form__cancel" onClick={closeBookingForm}>
                  Cancel
                </button>
                <button type="submit" className="booking-form__submit">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}