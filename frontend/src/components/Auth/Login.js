"use client";
import { useState } from 'react';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';
import './Auth.css';

export default function CompactLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      router.push('/profile');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="kerala-auth">
      <div className="auth-backdrop">
        <div className="houseboat"></div>
        <div className="wave"></div>
      </div>
      
      <div className="kerala-card">
        <div className="kerala-header">
          <div className="kerala-icon">🛶</div>
          <h3>Welcome Back to Kerala</h3> 
          <p>Continue your magical journey</p>
        </div>

        <form onSubmit={handleSubmit} className="kerala-form">
          {error && <div className="kerala-error">{error}</div>}

          <div className="kerala-input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="kerala-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <button type="submit" className="kerala-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Continue Journey'}
          </button>
        </form>

        <div className="kerala-footer">
          <div className="footer-links">
            <a href="/register">Create new account</a>
          </div>
        </div>
      </div>
    </div>
  );
}