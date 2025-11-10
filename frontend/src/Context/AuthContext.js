"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('tourism_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const generatePromoCode = () => {
    return `KERALA${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const login = async (email, password) => {
    // Simulate API call
    setLoading(true);
    try {
      // In real app, this would be an API call
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: '👨‍💼',
        memberSince: '2024',
        loyaltyPoints: 1250,
        promoCode: generatePromoCode(),
        promoShown: true,
        preferences: {
          destinations: ['Beach', 'Mountains', 'Cultural'],
          travelStyle: 'Adventure',
          budgetRange: 'Medium'
        },
        bookings: [
          {
            id: 'BK001',
            package: 'Classic Kerala Backwaters',
            date: '2024-12-15',
            travelers: 2,
            status: 'Confirmed'
          }
        ]
      };
      
      setUser(userData);
      localStorage.setItem('tourism_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: '👤',
        memberSince: new Date().getFullYear().toString(),
        loyaltyPoints: 100, // Welcome points
        promoCode: generatePromoCode(), // Generate promo code for new users
        promoShown: false, // Track if promo has been shown
        preferences: {
          destinations: ['Munnar', 'Alleppey', 'Kochi'],
          travelStyle: 'Cultural & Adventure',
          budgetRange: 'Mid-range'
        },
        bookings: []
      };
      
      setUser(newUser);
      localStorage.setItem('tourism_user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tourism_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('tourism_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};