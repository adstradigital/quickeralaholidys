"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';
import './Auth.css';

export default function CompactSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPromo, setShowPromo] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { signup, loading, user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await signup(formData);
    if (result.success) {
      setShowPromo(true);
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    if (showPromo && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showPromo && countdown === 0) {
      router.push('/profile');
    }
  }, [showPromo, countdown, router]);

  const copyToClipboard = () => {
    if (user?.promoCode) {
      navigator.clipboard.writeText(user.promoCode);
      alert('Promo code copied to clipboard!');
    }
  };

  const goToProfileNow = () => {
    router.push('/profile');
  };

  return (
    <div className="kerala-auth">
      <div className="auth-backdrop">
        <div className="palm-tree">🌴</div>
        <div className="houseboat">🛶</div>
        <div className="wave"></div>
      </div>
      
      {/* Promo Code Success Animation */}
      {showPromo && user?.promoCode && (
        <div className="promo-success-overlay">
          <div className="promo-success-card">
            <div className="success-animation">
              <div className="success-icon">🎉</div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
            </div>
            
            <h2>Welcome to Kerala! 🌴</h2>
            <p>Your account has been created successfully</p>
            
            <div className="promo-code-section">
              <h3>Your Special Welcome Gift</h3>
              <div className="promo-code" onClick={copyToClipboard}>
                <span className="promo-text">{user.promoCode}</span>
                <span className="copy-icon">📋</span>
              </div>
              <p className="promo-description">
                Get 15% off your first booking! Valid for 30 days.
              </p>
            </div>

            <div className="redirect-countdown">
              <p>Redirecting to your profile in <span className="countdown">{countdown}</span> seconds...</p>
            </div>

            <button 
              onClick={goToProfileNow}
              className="go-to-profile-btn"
            >
              Go to Profile Now
            </button>
          </div>
        </div>
      )}
      
      <div className={`kerala-card ${showPromo ? 'blur-background' : ''}`}>
        <div className="kerala-header">
          <div className="kerala-icon">🌴</div>
          <h3>Begin Your Kerala Journey</h3>
          <p>Create account to explore God's Own Country</p>
        </div>

        <form onSubmit={handleSubmit} className="kerala-form">
          {error && <div className="kerala-error">{error}</div>}

          <div className="kerala-input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <span className="input-icon">👤</span>
          </div>

          <div className="kerala-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="kerala-input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <span className="input-icon">🔒</span>
          </div>

          <div className="kerala-input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="input-icon">✅</span>
          </div>

          <button type="submit" className="kerala-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Start Your Journey'}
          </button>
        </form>

        <div className="kerala-footer">
          <div className="footer-links">
            <p>Already have an account? <a href="/login">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}