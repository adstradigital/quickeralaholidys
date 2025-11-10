"use client"

import React, { useState } from 'react';
import './PlanYourTrip.css';

const PlanYourTrip = () => {
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    tripType: 'vacation'
  });

  const [tripCalculation, setTripCalculation] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const tripTypes = [
    'vacation', 'business', 'adventure', 'romantic', 'family', 'solo'
  ];

  // Exchange rate (USD to INR)
  const EXCHANGE_RATE = 83;

  // Fixed travel packages with costs in USD
  const travelPackages = {
    bali: [
      {
        name: "Bali Budget Package",
        duration: "5D/4N",
        price: 299,
        includes: ["3-star hotel", "Breakfast", "Airport transfers", "Half-day city tour"],
        description: "Perfect for budget travelers exploring Bali's culture"
      },
      {
        name: "Bali Premium Package",
        duration: "7D/6N",
        price: 699,
        includes: ["5-star resort", "All meals", "Private transfers", "Full island tour", "Spa treatment"],
        description: "Luxury experience with premium amenities"
      }
    ],
    paris: [
      {
        name: "Paris Essential Package",
        duration: "4D/3N",
        price: 599,
        includes: ["4-star hotel", "Breakfast", "Eiffel Tower tickets", "Seine River cruise"],
        description: "Classic Parisian experience with key attractions"
      },
      {
        name: "Paris Romance Package",
        duration: "6D/5N",
        price: 999,
        includes: ["Boutique hotel", "Fine dining", "Louvre Museum", "Versailles tour", "Romantic dinner cruise"],
        description: "Perfect romantic getaway in the city of love"
      }
    ],
    dubai: [
      {
        name: "Dubai City Package",
        duration: "5D/4N",
        price: 799,
        includes: ["4-star hotel", "Desert safari", "Burj Khalifa tickets", "Dubai Mall visit"],
        description: "Modern Dubai experience with desert adventure"
      },
      {
        name: "Dubai Luxury Package",
        duration: "7D/6N",
        price: 1499,
        includes: ["5-star beach resort", "All meals", "Private yacht tour", "Gold souk shopping", "Luxury car transfers"],
        description: "Ultimate luxury experience in Dubai"
      }
    ],
    thailand: [
      {
        name: "Thailand Explorer",
        duration: "6D/5N",
        price: 399,
        includes: ["4-star hotels", "Breakfast", "Temple tours", "Beach transfers"],
        description: "Explore Thailand's beautiful temples and beaches"
      }
    ],
    singapore: [
      {
        name: "Singapore Family Package",
        duration: "5D/4N",
        price: 899,
        includes: ["Family suite", "Universal Studios tickets", "Zoo admission", "All transfers"],
        description: "Perfect family vacation with theme parks"
      }
    ]
  };

  // Price estimates per day per person (in USD)
  const destinationRates = {
    default: { accommodation: 100, food: 50, activities: 75, transportation: 40 },
    paris: { accommodation: 150, food: 80, activities: 100, transportation: 30 },
    bali: { accommodation: 60, food: 25, activities: 50, transportation: 20 },
    tokyo: { accommodation: 120, food: 70, activities: 90, transportation: 35 },
    newyork: { accommodation: 200, food: 100, activities: 120, transportation: 45 },
    london: { accommodation: 180, food: 90, activities: 110, transportation: 40 },
    dubai: { accommodation: 220, food: 110, activities: 150, transportation: 50 },
    bangkok: { accommodation: 50, food: 20, activities: 40, transportation: 15 },
    thailand: { accommodation: 55, food: 22, activities: 45, transportation: 18 },
    singapore: { accommodation: 130, food: 60, activities: 80, transportation: 25 }
  };

  const tripTypeMultipliers = {
    vacation: 1.0,
    business: 1.4,
    adventure: 1.2,
    romantic: 1.3,
    family: 0.9,
    solo: 1.1
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTripDetails = () => {
    if (!tripData.startDate || !tripData.endDate) {
      alert('Please select start and end dates');
      return;
    }

    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const tripDuration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (tripDuration <= 0) {
      alert('End date must be after start date');
      return;
    }

    const destinationKey = getDestinationKey(tripData.destination);
    const rates = destinationRates[destinationKey] || destinationRates.default;
    const multiplier = tripTypeMultipliers[tripData.tripType] || 1.0;

    const calculations = {
      duration: tripDuration,
      totalCost: 0,
      breakdown: {
        accommodation: Math.round(rates.accommodation * tripDuration * tripData.travelers * multiplier),
        food: Math.round(rates.food * tripDuration * tripData.travelers * multiplier),
        activities: Math.round(rates.activities * tripDuration * tripData.travelers * multiplier),
        transportation: Math.round(rates.transportation * tripDuration * tripData.travelers * multiplier)
      }
    };

    calculations.totalCost = Object.values(calculations.breakdown).reduce((sum, cost) => sum + cost, 0);
    
    // Calculate daily breakdown
    calculations.dailyBreakdown = {
      accommodation: Math.round(rates.accommodation * tripData.travelers * multiplier),
      food: Math.round(rates.food * tripData.travelers * multiplier),
      activities: Math.round(rates.activities * tripData.travelers * multiplier),
      transportation: Math.round(rates.transportation * tripData.travelers * multiplier)
    };

    calculations.dailyTotal = Object.values(calculations.dailyBreakdown).reduce((sum, cost) => sum + cost, 0);

    // Calculate budget status if budget is provided
    if (tripData.budget) {
      const budget = parseFloat(tripData.budget);
      calculations.budgetStatus = {
        total: budget,
        remaining: budget - calculations.totalCost,
        percentageUsed: Math.round((calculations.totalCost / budget) * 100),
        isWithinBudget: calculations.totalCost <= budget
      };
    }

    setTripCalculation(calculations);
    setSelectedPackage(null);
  };

  const getDestinationKey = (destination) => {
    const dest = destination.toLowerCase();
    if (dest.includes('bali')) return 'bali';
    if (dest.includes('paris')) return 'paris';
    if (dest.includes('dubai')) return 'dubai';
    if (dest.includes('thailand') || dest.includes('bangkok')) return 'thailand';
    if (dest.includes('singapore')) return 'singapore';
    if (dest.includes('london')) return 'london';
    if (dest.includes('tokyo')) return 'tokyo';
    if (dest.includes('new york')) return 'newyork';
    return dest.replace(/\s+/g, '');
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    const destinationKey = getDestinationKey(tripData.destination);
    const packageCost = pkg.price * tripData.travelers;
    
    const calculations = {
      duration: parseInt(pkg.duration),
      totalCost: packageCost,
      isPackage: true,
      packageName: pkg.name,
      packageDetails: pkg
    };

    setTripCalculation(calculations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTripDetails();
  };

  const formatCurrency = (amount, currency = 'INR') => {
    if (currency === 'INR') {
      const inrAmount = amount * EXCHANGE_RATE;
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(inrAmount);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAvailablePackages = () => {
    const destinationKey = getDestinationKey(tripData.destination);
    return travelPackages[destinationKey] || [];
  };

  const availablePackages = getAvailablePackages();

  return (
    <div className="plan-your-trip">
      <h2>Plan Your Perfect Trip</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={tripData.destination}
            onChange={handleChange}
            placeholder="Enter destination (e.g., Bali, Paris, Dubai...)"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={tripData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={tripData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="travelers">Travelers</label>
            <select
              id="travelers"
              name="travelers"
              value={tripData.travelers}
              onChange={handleChange}
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tripType">Trip Type</label>
            <select
              id="tripType"
              name="tripType"
              value={tripData.tripType}
              onChange={handleChange}
            >
              {tripTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget (optional - in USD)</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={tripData.budget}
            onChange={handleChange}
            placeholder="Enter your budget in USD"
          />
        </div>

        <button type="submit" className="submit-btn">
          Calculate Custom Trip
        </button>
      </form>

      {/* Available Packages Section */}
      {availablePackages.length > 0 && (
        <div className="packages-section">
          <h3>Available Fixed Packages for {tripData.destination}</h3>
          <div className="packages-grid">
            {availablePackages.map((pkg, index) => (
              <div 
                key={index} 
                className={`package-card ${selectedPackage?.name === pkg.name ? 'selected' : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <div className="package-header">
                  <h4>{pkg.name}</h4>
                  <span className="package-duration">{pkg.duration}</span>
                </div>
                <p className="package-description">{pkg.description}</p>
                <div className="package-price">
                  <div className="usd-price">{formatCurrency(pkg.price)} per person</div>
                  <div className="inr-price">≈ {formatCurrency(pkg.price, 'INR')} per person</div>
                  <div className="total-price">
                    Total for {tripData.travelers} {tripData.travelers === 1 ? 'person' : 'people'}: {formatCurrency(pkg.price * tripData.travelers)}
                  </div>
                </div>
                <ul className="package-includes">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
                <button 
                  className="select-package-btn"
                  onClick={() => handlePackageSelect(pkg)}
                >
                  {selectedPackage?.name === pkg.name ? 'Selected' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tripCalculation && (
        <div className="trip-calculation">
          <h3>Trip Calculation Details</h3>
          
          {tripCalculation.isPackage ? (
            // Package Calculation View
            <div className="package-calculation">
              <div className="package-badge">Fixed Package</div>
              <div className="calculation-summary">
                <div className="summary-card">
                  <h4>Package Name</h4>
                  <p>{tripCalculation.packageName}</p>
                </div>
                <div className="summary-card">
                  <h4>Duration</h4>
                  <p>{tripCalculation.duration} days</p>
                </div>
                <div className="summary-card">
                  <h4>Travelers</h4>
                  <p>{tripData.travelers}</p>
                </div>
                <div className="summary-card total-cost">
                  <h4>Total Package Cost</h4>
                  <p>{formatCurrency(tripCalculation.totalCost)}</p>
                  <div className="inr-conversion">
                    {formatCurrency(tripCalculation.totalCost, 'INR')}
                  </div>
                </div>
              </div>

              <div className="package-details">
                <h4>Package Includes:</h4>
                <ul>
                  {tripCalculation.packageDetails.includes.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            // Custom Calculation View
            <>
              <div className="calculation-summary">
                <div className="summary-card">
                  <h4>Trip Duration</h4>
                  <p>{tripCalculation.duration} days</p>
                </div>
                <div className="summary-card">
                  <h4>Total Travelers</h4>
                  <p>{tripData.travelers}</p>
                </div>
                <div className="summary-card total-cost">
                  <h4>Total Estimated Cost</h4>
                  <p>{formatCurrency(tripCalculation.totalCost)}</p>
                  <div className="inr-conversion">
                    {formatCurrency(tripCalculation.totalCost, 'INR')}
                  </div>
                </div>
              </div>

              <div className="cost-breakdown">
                <h4>Cost Breakdown</h4>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span>Accommodation</span>
                    <span>{formatCurrency(tripCalculation.breakdown.accommodation)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Food & Dining</span>
                    <span>{formatCurrency(tripCalculation.breakdown.food)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Activities & Entertainment</span>
                    <span>{formatCurrency(tripCalculation.breakdown.activities)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Transportation</span>
                    <span>{formatCurrency(tripCalculation.breakdown.transportation)}</span>
                  </div>
                </div>
              </div>

              <div className="daily-breakdown">
                <h4>Daily Cost (per day)</h4>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span>Accommodation</span>
                    <span>{formatCurrency(tripCalculation.dailyBreakdown.accommodation)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Food & Dining</span>
                    <span>{formatCurrency(tripCalculation.dailyBreakdown.food)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Activities</span>
                    <span>{formatCurrency(tripCalculation.dailyBreakdown.activities)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Transportation</span>
                    <span>{formatCurrency(tripCalculation.dailyBreakdown.transportation)}</span>
                  </div>
                  <div className="breakdown-item total">
                    <span>Daily Total</span>
                    <span>{formatCurrency(tripCalculation.dailyTotal)}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {tripCalculation.budgetStatus && (
            <div className={`budget-status ${tripCalculation.budgetStatus.isWithinBudget ? 'within-budget' : 'over-budget'}`}>
              <h4>Budget Analysis</h4>
              <div className="budget-details">
                <div className="budget-item">
                  <span>Your Budget:</span>
                  <span>{formatCurrency(tripCalculation.budgetStatus.total)}</span>
                </div>
                <div className="budget-item">
                  <span>Estimated Cost:</span>
                  <span>{formatCurrency(tripCalculation.totalCost)}</span>
                </div>
                <div className="budget-item">
                  <span>Remaining:</span>
                  <span className={tripCalculation.budgetStatus.remaining >= 0 ? 'positive' : 'negative'}>
                    {formatCurrency(tripCalculation.budgetStatus.remaining)}
                  </span>
                </div>
                <div className="budget-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min(tripCalculation.budgetStatus.percentageUsed, 100)}%` }}
                    ></div>
                  </div>
                  <span>{tripCalculation.budgetStatus.percentageUsed}% of budget used</span>
                </div>
                <div className="budget-message">
                  {tripCalculation.budgetStatus.isWithinBudget ? 
                    '🎉 Your trip is within budget!' : 
                    '⚠️ Your trip exceeds your budget. Consider adjusting your plans.'}
                </div>
              </div>
            </div>
          )}

          <div className="calculation-notes">
            <p><strong>Note:</strong> 
              {tripCalculation.isPackage 
                ? ' Package prices are fixed and include all listed amenities. Additional expenses may apply for personal spending.'
                : ' These are estimated costs based on average prices. Actual costs may vary.'
              }
              Exchange rate: 1 USD = {EXCHANGE_RATE} INR
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanYourTrip;