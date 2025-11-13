'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/Context/AuthContext';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Special Offers', href: '/specialoffers' },
    { name: 'Packages', href: '/packages' },
    { name: 'Discover Kerala', href: '/destinations' },
    { name: 'Plan Your Trip', href: '/PlanYourTrip' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contacts' }
  ];

  const handleBookNow = () => {
    window.location.href = '/booking';
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'headerScrolled' : ''}`}>
      <nav className="nav">
        <div className="navContent">
          {/* Logo */}
            <Link href="/" className="nav-logoo">
              <img 
                src="/assets/quikerala_logo.png" 
                alt="Quick Kerala Holidays" 
                className="logoo-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'logo-fallback';
                  fallback.textContent = 'QK Holidays';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
            </Link>

          {/* Desktop Navigation */}
          <div className="desktopNav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="navLink"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Login/Profile Section */}
            {user ? (
              <div className="profileSection">
                <button 
                  className="profileButton"
                  onClick={handleProfileClick}
                >
                  <div className="profileAvatar">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="profileName">
                    {user.name?.split(' ')[0] || 'User'}
                  </span>
                </button>
                
                {isProfileOpen && (
                  <div className="profileDropdown">
                    <div className="profileInfo">
                      <div className="profileDropdownAvatar">
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="profileDetails">
                        <div className="profileDropdownName">{user.name || 'User'}</div>
                        <div className="profileDropdownEmail">{user.email}</div>
                      </div>
                    </div>
                    <div className="profileMenu">
                      <Link 
                        href="/profile" 
                        className="profileMenuItem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/bookings" 
                        className="profileMenuItem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Bookings
                      </Link>
                      <Link 
                        href="/settings" 
                        className="profileMenuItem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button 
                        className="profileMenuItem logoutButton"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="loginButton">
                Login
              </Link>
            )}
            
            <button 
              className="bookButton"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobileMenuButton"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`menuIcon ${isMenuOpen ? 'menuIconOpen' : ''}`}>
              {isMenuOpen ? '✕' : '☰'}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobileMenu">
            <div className="mobileNav">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="mobileNavLink"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Login/Profile Section */}
              <div className="mobileAuthSection">
                {user ? (
                  <>
                    <div className="mobileProfileInfo">
                      <div className="mobileProfileAvatar">
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="mobileProfileDetails">
                        <div className="mobileProfileName">{user.name || 'User'}</div>
                        <div className="mobileProfileEmail">{user.email}</div>
                      </div>
                    </div>
                    <Link href="/profile" className="mobileNavLink" onClick={() => setIsMenuOpen(false)}>
                      My Profile
                    </Link>
                    <Link href="/bookings" className="mobileNavLink" onClick={() => setIsMenuOpen(false)}>
                      My Bookings
                    </Link>
                    <button 
                      className="mobileLogoutButton"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/login" 
                    className="mobileLoginButton"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
              
              <button 
                className="mobileBookButton"
                onClick={() => {
                  handleBookNow();
                  setIsMenuOpen(false);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}