"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';
import './Profile.css';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState('');

  useEffect(() => {
    // Check if user has a promo code and show popup on first visit
    if (user?.promoCode && !user?.promoShown) {
      setShowPromoPopup(true);
      // Mark promo as shown
      updateProfile({ ...user, promoShown: true });
    }
  }, [user, updateProfile]);

  if (!user) {
    router.push('/');
    return null;
  }

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getProgressColor = (points) => {
    if (points < 500) return '#ef4444';
    if (points < 1000) return '#f59e0b';
    return '#10b981';
  };

  const nextLevel = () => {
    const points = user.loyaltyPoints || 0;
    if (points < 500) return { level: 'Explorer', needed: 500 - points };
    if (points < 1000) return { level: 'Adventurer', needed: 1000 - points };
    if (points < 2000) return { level: 'Voyager', needed: 2000 - points };
    return { level: 'Elite', needed: 0 };
  };

  const copyPromoCode = (promoCode) => {
    navigator.clipboard.writeText(promoCode);
    setCopiedPromo(promoCode);
    setTimeout(() => setCopiedPromo(''), 2000);
  };

  const levelInfo = nextLevel();

  return (
    <div className="profile-container">
      {/* Promo Code Popup */}
      {showPromoPopup && user.promoCode && (
        <div className="promo-popup-overlay">
          <div className="promo-popup">
            <div className="popup-header">
              <div className="popup-icon">🎁</div>
              <h3>Welcome Gift!</h3>
              <button 
                className="close-popup"
                onClick={() => setShowPromoPopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-content">
              <p>Your special welcome promo code is ready to use!</p>
              <div 
                className="promo-code-large"
                onClick={() => copyPromoCode(user.promoCode)}
              >
                <span>{user.promoCode}</span>
                <span className="copy-indicator">
                  {copiedPromo === user.promoCode ? '✅ Copied!' : '📋 Click to copy'}
                </span>
              </div>
              <p className="promo-description">
                15% off your first booking • Valid for 30 days
              </p>
            </div>
            <div className="popup-actions">
              <button 
                className="popup-cta"
                onClick={() => router.push('/booking')}
              >
                Book Now with Discount
              </button>
              <button 
                className="popup-secondary"
                onClick={() => setShowPromoPopup(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="profile-bg">
        <div className="bg-mountain">⛰️</div>
        <div className="bg-palm">🌴</div>
        <div className="bg-beach">🏖️</div>
        <div className="bg-temple">🛕</div>
      </div>

      <div className="profile-content">
        {/* Header Section */}
        <div className="profile-header">
          <button onClick={() => router.back()} className="back-btn">
            ← Back
          </button>
          <h1>My Travel Profile</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout 🚪
          </button>
        </div>

        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="user-card">
              <div className="avatar-section">
                <div className="user-avatar">{user.avatar || '👤'}</div>
                <div className="online-dot"></div>
              </div>
              <h2>{user.name}</h2>
              <p className="user-email">{user.email}</p>
              
              {/* Promo Code Badge in Sidebar */}
              {user.promoCode && (
                <div className="promo-badge">
                  <span className="badge-icon">🎁</span>
                  <span className="badge-text">Promo Available</span>
                </div>
              )}
              
              <div className="member-since">
                <span>🌟 Member since {user.memberSince || '2024'}</span>
              </div>
            </div>

            <nav className="profile-nav">
              <button 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span>📊</span> Overview
              </button>
              <button 
                className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <span>🎫</span> My Bookings
              </button>
              <button 
                className={`nav-item ${activeTab === 'loyalty' ? 'active' : ''}`}
                onClick={() => setActiveTab('loyalty')}
              >
                <span>🏆</span> Loyalty Program
              </button>
              <button 
                className={`nav-item ${activeTab === 'promo' ? 'active' : ''}`}
                onClick={() => setActiveTab('promo')}
              >
                <span>🎁</span> Promo Codes
              </button>
              <button 
                className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <span>⚙️</span> Preferences
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="profile-main">
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="welcome-banner">
                  <h2>Welcome back, {user.name}! 🌴</h2>
                  <p>Ready for your next Kerala adventure?</p>
                  
                  {/* Promo Code Quick Access */}
                  {user.promoCode && (
                    <div className="promo-quick-access">
                      <div className="promo-quick-card">
                        <div className="promo-quick-icon">🎁</div>
                        <div className="promo-quick-content">
                          <h4>Your Welcome Promo</h4>
                          <p>15% off your first booking</p>
                          <button 
                            onClick={() => setActiveTab('promo')}
                            className="promo-quick-btn"
                          >
                            View Promo Code
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="stats-grid">
                  <div className="stat-large">
                    <div className="stat-large-icon">🏆</div>
                    <div className="stat-large-content">
                      <h3>Loyalty Level</h3>
                      <p>{levelInfo.level}</p>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${((user.loyaltyPoints || 0) / 2000) * 100}%`,
                            backgroundColor: getProgressColor(user.loyaltyPoints || 0)
                          }}
                        ></div>
                      </div>
                      <small>{levelInfo.needed} points to next level</small>
                    </div>
                  </div>

                  <div className="stat-large">
                    <div className="stat-large-icon">🎫</div>
                    <div className="stat-large-content">
                      <h3>Upcoming Trips</h3>
                      <p>{user.bookings?.filter(b => b.status === 'Confirmed').length || 0}</p>
                      <small>Confirmed bookings</small>
                    </div>
                  </div>

                  {/* Promo Code Stat */}
                  {user.promoCode && (
                    <div className="stat-large">
                      <div className="stat-large-icon">🎁</div>
                      <div className="stat-large-content">
                        <h3>Active Promo</h3>
                        <p>15% OFF</p>
                        <small>First booking discount</small>
                        <button 
                          onClick={() => setActiveTab('promo')}
                          className="view-promo-btn"
                        >
                          Use Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="recent-activity">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    {user.bookings?.map(booking => (
                      <div key={booking.id} className="activity-item">
                        <div className="activity-icon">✅</div>
                        <div className="activity-content">
                          <p><strong>{booking.package}</strong> booked</p>
                          <small>{booking.date} • {booking.travelers} travelers</small>
                        </div>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                    {(!user.bookings || user.bookings.length === 0) && (
                      <div className="empty-state">
                        <div className="empty-icon">🌴</div>
                        <p>No bookings yet</p>
                        <button 
                          onClick={() => router.push('/booking')}
                          className="cta-button"
                        >
                          Plan Your First Trip
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'promo' && (
              <div className="tab-content">
                <div className="promo-header">
                  <h2>My Promo Codes 🎁</h2>
                  <p>Special discounts and offers for you</p>
                </div>

                <div className="promo-codes-grid">
                  {/* Welcome Promo Code */}
                  {user.promoCode && (
                    <div className="promo-card featured">
                      <div className="promo-card-header">
                        <div className="promo-badge-featured">WELCOME GIFT</div>
                        <div className="promo-discount">15% OFF</div>
                      </div>
                      <div className="promo-card-content">
                        <h3>First Booking Discount</h3>
                        <p>Get 15% off on your first Kerala adventure package</p>
                        <div className="promo-code-display">
                          <code>{user.promoCode}</code>
                          <button 
                            className={`copy-promo-btn ${copiedPromo === user.promoCode ? 'copied' : ''}`}
                            onClick={() => copyPromoCode(user.promoCode)}
                          >
                            {copiedPromo === user.promoCode ? '✅ Copied!' : '📋 Copy'}
                          </button>
                        </div>
                        <div className="promo-details">
                          <div className="promo-detail">
                            <span>📅 Valid until:</span>
                            <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                          </div>
                          <div className="promo-detail">
                            <span>✅ Applicable:</span>
                            <span>All tour packages</span>
                          </div>
                        </div>
                      </div>
                      <div className="promo-card-actions">
                        <button 
                          className="use-promo-btn"
                          onClick={() => router.push('/booking')}
                        >
                          Book with Discount
                        </button>
                      </div>
                    </div>
                  )}

                  {/* More promo codes can be added here */}
                  <div className="promo-card upcoming">
                    <div className="promo-card-header">
                      <div className="promo-badge-upcoming">COMING SOON</div>
                    </div>
                    <div className="promo-card-content">
                      <h3>More Rewards Await!</h3>
                      <p>Complete your first booking to unlock more exclusive promo codes and loyalty rewards.</p>
                      <div className="upcoming-promo-placeholder">
                        <span>🔒 Earn more promo codes through bookings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="promo-terms">
                  <h4>How to Use Your Promo Code:</h4>
                  <ol>
                    <li>Go to the booking page and select your preferred package</li>
                    <li>During checkout, paste your promo code in the discount field</li>
                    <li>The discount will be automatically applied to your total</li>
                    <li>Complete your booking to enjoy the savings!</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="tab-content">
                <h2>My Bookings</h2>
                <div className="bookings-list">
                  {user.bookings?.map(booking => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-header">
                        <h3>{booking.package}</h3>
                        <span className={`booking-status ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="booking-details">
                        <div className="detail">
                          <span>📅</span>
                          <span>{booking.date}</span>
                        </div>
                        <div className="detail">
                          <span>👥</span>
                          <span>{booking.travelers} travelers</span>
                        </div>
                      </div>
                      <div className="booking-actions">
                        <button className="action-btn">View Details</button>
                        <button className="action-btn secondary">Download Invoice</button>
                      </div>
                    </div>
                  ))}
                  {(!user.bookings || user.bookings.length === 0) && (
                    <div className="empty-state">
                      <div className="empty-icon">🎫</div>
                      <p>No bookings yet</p>
                      <button 
                        onClick={() => router.push('/booking')}
                        className="cta-button"
                      >
                        Make Your First Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="tab-content">
                <h2>Loyalty Program</h2>
                <div className="loyalty-card">
                  <div className="loyalty-header">
                    <div className="loyalty-badge">
                      <span>🏆</span>
                    </div>
                    <div className="loyalty-info">
                      <h3>{levelInfo.level}</h3>
                      <p>{user.loyaltyPoints || 0} Points</p>
                    </div>
                  </div>
                  
                  <div className="loyalty-levels">
                    <div className={`level ${(user.loyaltyPoints || 0) >= 0 ? 'unlocked' : ''}`}>
                      <span>🌱 Explorer (0+ points)</span>
                      <span>5% discount</span>
                    </div>
                    <div className={`level ${(user.loyaltyPoints || 0) >= 500 ? 'unlocked' : ''}`}>
                      <span>🚀 Adventurer (500+ points)</span>
                      <span>10% discount + Priority support</span>
                    </div>
                    <div className={`level ${(user.loyaltyPoints || 0) >= 1000 ? 'unlocked' : ''}`}>
                      <span>🌟 Voyager (1000+ points)</span>
                      <span>15% discount + Free upgrades</span>
                    </div>
                    <div className={`level ${(user.loyaltyPoints || 0) >= 2000 ? 'unlocked' : ''}`}>
                      <span>👑 Elite (2000+ points)</span>
                      <span>20% discount + Personal travel planner</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="tab-content">
                <h2>Travel Preferences</h2>
                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={editData.phone || ''}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-actions">
                      <button onClick={handleSave} className="save-btn">Save Changes</button>
                      <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="preferences-display">
                    <div className="preference-item">
                      <label>Preferred Destinations</label>
                      <div className="tags">
                        {user.preferences?.destinations?.map(dest => (
                          <span key={dest} className="tag">{dest}</span>
                        ))}
                      </div>
                    </div>
                    <div className="preference-item">
                      <label>Travel Style</label>
                      <p>{user.preferences?.travelStyle}</p>
                    </div>
                    <div className="preference-item">
                      <label>Budget Range</label>
                      <p>{user.preferences?.budgetRange}</p>
                    </div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="edit-btn"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}