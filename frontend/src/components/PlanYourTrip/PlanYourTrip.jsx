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
    'vacation', 'honeymoon', 'family', 'adventure', 'wellness', 'solo'
  ];

  // Kerala Tour Packages with realistic pricing
  const travelPackages = {
    munnar: [
      {
        name: "Munnar Hill Station Escape",
        duration: "2D/3N",
        price: 8500,
        includes: ["3-star hotel", "Breakfast", "Tea plantation tour", "Eravikulam National Park", "Transport"],
        description: "Explore the beautiful tea gardens and hill station"
      },
      {
        name: "Munnar Premium Package",
        duration: "3D/4N",
        price: 15000,
        includes: ["4-star resort", "All meals", "Tea factory visit", "Mattupetty Dam", "Echo Point", "Private cab"],
        description: "Luxury hill station experience with premium amenities"
      }
    ],
    alleppey: [
      {
        name: "Alleppey Backwater Experience",
        duration: "1D/2N",
        price: 9500,
        includes: ["Deluxe houseboat", "All meals", "Backwater cruise", "Village tour"],
        description: "Classic houseboat stay in Kerala backwaters"
      },
      {
        name: "Alleppey Premium Houseboat",
        duration: "1D/2N",
        price: 18000,
        includes: ["Premium houseboat", "AC rooms", "Chef-prepared meals", "Sunset cruise", "Fishing experience"],
        description: "Luxury houseboat with premium facilities"
      }
    ],
    kovalam: [
      {
        name: "Kovalam Beach Retreat",
        duration: "3D/4N",
        price: 12000,
        includes: ["Beach resort", "Breakfast", "Ayurvedic massage", "Beach activities", "Trivandrum sightseeing"],
        description: "Relax at Kerala's famous beach destination"
      },
      {
        name: "Kovalam Luxury Beach Package",
        duration: "4D/5N",
        price: 25000,
        includes: ["5-star beach resort", "All meals", "Spa treatments", "Water sports", "Private beach access"],
        description: "Ultimate luxury beach vacation"
      }
    ],
    thekkady: [
      {
        name: "Thekkady Wildlife Safari",
        duration: "2D/3N",
        price: 10000,
        includes: ["3-star hotel", "Breakfast & dinner", "Periyar boat safari", "Spice plantation tour", "Elephant ride"],
        description: "Explore wildlife and spice plantations"
      },
      {
        name: "Thekkady Adventure Package",
        duration: "3D/4N",
        price: 18500,
        includes: ["Jungle resort", "All meals", "Jungle safari", "Bamboo rafting", "Tribal village visit", "Nature walks"],
        description: "Complete adventure and wildlife experience"
      }
    ],
    wayanad: [
      {
        name: "Wayanad Nature Package",
        duration: "3D/4N",
        price: 11000,
        includes: ["Hill resort", "Breakfast", "Edakkal Caves", "Soochipara Falls", "Wildlife sanctuary visit"],
        description: "Explore Wayanad's natural beauty"
      },
      {
        name: "Wayanad Premium Stay",
        duration: "4D/5N",
        price: 22000,
        includes: ["5-star resort", "All meals", "Plantation tours", "Trekking", "Zipline adventure", "Private guide"],
        description: "Luxury nature retreat in Wayanad hills"
      }
    ],
    kochi: [
      {
        name: "Kochi Heritage Tour",
        duration: "2D/3N",
        price: 7500,
        includes: ["Heritage hotel", "Breakfast", "Fort Kochi tour", "Kathakali show", "Chinese fishing nets", "Jew Town"],
        description: "Explore the heritage and culture of Kochi"
      },
      {
        name: "Kochi Cultural Experience",
        duration: "3D/4N",
        price: 14000,
        includes: ["Boutique hotel", "All meals", "Heritage walks", "Spice market tour", "Backwater cruise", "Art gallery visits"],
        description: "Complete cultural immersion in Kochi"
      }
    ],
    kumarakom: [
      {
        name: "Kumarakom Backwater Stay",
        duration: "2D/3N",
        price: 13000,
        includes: ["Lake resort", "All meals", "Backwater cruise", "Bird sanctuary visit", "Village tour"],
        description: "Peaceful backwater experience at Kumarakom"
      },
      {
        name: "Kumarakom Luxury Retreat",
        duration: "3D/4N",
        price: 28000,
        includes: ["5-star resort", "All meals", "Ayurvedic spa", "Houseboat cruise", "Sunset cruise", "Private pool villa"],
        description: "Ultimate luxury backwater experience"
      }
    ],
    varkala: [
      {
        name: "Varkala Cliff Beach Package",
        duration: "3D/4N",
        price: 9000,
        includes: ["Cliff resort", "Breakfast", "Beach activities", "Janardhana Temple", "Ayurvedic massage"],
        description: "Unique cliff beach experience"
      }
    ]
  };

  // Kerala destination-specific daily rates (in INR per person per day)
  const destinationRates = {
    default: { accommodation: 2500, food: 1000, activities: 1500, transportation: 800 },
    munnar: { accommodation: 3000, food: 1200, activities: 1800, transportation: 1000 },
    alleppey: { accommodation: 4500, food: 1500, activities: 2000, transportation: 800 },
    kovalam: { accommodation: 3500, food: 1300, activities: 1700, transportation: 900 },
    thekkady: { accommodation: 2800, food: 1100, activities: 2200, transportation: 1000 },
    wayanad: { accommodation: 2700, food: 1000, activities: 1600, transportation: 1100 },
    kochi: { accommodation: 2500, food: 1200, activities: 1400, transportation: 700 },
    kumarakom: { accommodation: 4000, food: 1500, activities: 1800, transportation: 800 },
    varkala: { accommodation: 2200, food: 1000, activities: 1500, transportation: 800 },
    trivandrum: { accommodation: 2000, food: 900, activities: 1200, transportation: 600 }
  };

  const tripTypeMultipliers = {
    vacation: 1.0,
    honeymoon: 1.3,
    family: 0.9,
    adventure: 1.2,
    wellness: 1.4,
    solo: 1.0
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
    
    calculations.dailyBreakdown = {
      accommodation: Math.round(rates.accommodation * tripData.travelers * multiplier),
      food: Math.round(rates.food * tripData.travelers * multiplier),
      activities: Math.round(rates.activities * tripData.travelers * multiplier),
      transportation: Math.round(rates.transportation * tripData.travelers * multiplier)
    };

    calculations.dailyTotal = Object.values(calculations.dailyBreakdown).reduce((sum, cost) => sum + cost, 0);

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
    if (dest.includes('munnar')) return 'munnar';
    if (dest.includes('alleppey') || dest.includes('alappuzha')) return 'alleppey';
    if (dest.includes('kovalam')) return 'kovalam';
    if (dest.includes('thekkady') || dest.includes('periyar')) return 'thekkady';
    if (dest.includes('wayanad')) return 'wayanad';
    if (dest.includes('kochi') || dest.includes('cochin')) return 'kochi';
    if (dest.includes('kumarakom')) return 'kumarakom';
    if (dest.includes('varkala')) return 'varkala';
    if (dest.includes('trivandrum') || dest.includes('thiruvananthapuram')) return 'trivandrum';
    return 'default';
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getAvailablePackages = () => {
    const destinationKey = getDestinationKey(tripData.destination);
    return travelPackages[destinationKey] || [];
  };

  const availablePackages = getAvailablePackages();

  return (
    <div className="plan-your-trip">
      <h2>Plan Your Perfect Kerala Trip</h2>
      <p className="subtitle">Explore God's Own Country - Kerala Tourism</p>
      
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label htmlFor="destination">Kerala Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={tripData.destination}
            onChange={handleChange}
            placeholder="e.g., Munnar, Alleppey, Kovalam, Thekkady, Wayanad, Kochi..."
            required
          />
          <small className="hint">Popular: Munnar (Hill Station) • Alleppey (Houseboats) • Kovalam (Beach) • Thekkady (Wildlife)</small>
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
            <label htmlFor="travelers">Number of Travelers</label>
            <select
              id="travelers"
              name="travelers"
              value={tripData.travelers}
              onChange={handleChange}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
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
          <label htmlFor="budget">Your Budget (optional - in ₹)</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={tripData.budget}
            onChange={handleChange}
            placeholder="Enter your budget in Indian Rupees (₹)"
          />
        </div>

        <button type="submit" className="submit-btn">
          Calculate Custom Trip Cost
        </button>
      </form>

      {availablePackages.length > 0 && (
        <div className="packages-section">
          <h3>Available Packages for {tripData.destination}</h3>
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
                  <div className="price-main">{formatCurrency(pkg.price)} per person</div>
                  <div className="total-price">
                    Total for {tripData.travelers} {tripData.travelers === 1 ? 'person' : 'people'}: <strong>{formatCurrency(pkg.price * tripData.travelers)}</strong>
                  </div>
                </div>
                <ul className="package-includes">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
                <button 
                  className="select-package-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePackageSelect(pkg);
                  }}
                >
                  {selectedPackage?.name === pkg.name ? '✓ Selected' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tripCalculation && (
        <div className="trip-calculation">
          <h3>Trip Cost Breakdown</h3>
          
          {tripCalculation.isPackage ? (
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
                  <p>{tripData.travelers} {tripData.travelers === 1 ? 'person' : 'people'}</p>
                </div>
                <div className="summary-card total-cost">
                  <h4>Total Package Cost</h4>
                  <p className="total-amount">{formatCurrency(tripCalculation.totalCost)}</p>
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
                  <p className="total-amount">{formatCurrency(tripCalculation.totalCost)}</p>
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
                    <span>Activities & Sightseeing</span>
                    <span>{formatCurrency(tripCalculation.breakdown.activities)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Transportation</span>
                    <span>{formatCurrency(tripCalculation.breakdown.transportation)}</span>
                  </div>
                </div>
              </div>

              <div className="daily-breakdown">
                <h4>Daily Cost Estimate (per day)</h4>
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
                    <span><strong>Daily Total</strong></span>
                    <span><strong>{formatCurrency(tripCalculation.dailyTotal)}</strong></span>
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
                    {formatCurrency(Math.abs(tripCalculation.budgetStatus.remaining))}
                    {tripCalculation.budgetStatus.remaining < 0 ? ' over budget' : ' remaining'}
                  </span>
                </div>
                <div className="budget-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(tripCalculation.budgetStatus.percentageUsed, 100)}%`,
                        backgroundColor: tripCalculation.budgetStatus.isWithinBudget ? '#4caf50' : '#f44336'
                      }}
                    ></div>
                  </div>
                  <span>{tripCalculation.budgetStatus.percentageUsed}% of budget used</span>
                </div>
                <div className="budget-message">
                  {tripCalculation.budgetStatus.isWithinBudget ? 
                    '🎉 Your trip is within budget!' : 
                    '⚠️ Your trip exceeds your budget. Consider adjusting your plans or choosing a different package.'}
                </div>
              </div>
            </div>
          )}

          <div className="calculation-notes">
            <p><strong>Note:</strong> 
              {tripCalculation.isPackage 
                ? ' Package prices include all listed amenities. Additional personal expenses may apply.'
                : ' These are estimated costs based on average prices in Kerala. Actual costs may vary depending on season and hotel choice.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanYourTrip;
