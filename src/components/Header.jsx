import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Get user's first initial for avatar
  const getInitial = () => {
    if (!user || !user.displayName) return '?';
    return user.displayName.charAt(0);
  };
  
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/check.png" alt="Challenge Tracker" className="logo-icon" />
            <span>Challenge Tracker</span>
          </Link>
          
          {/* Main navigation menu */}
          {isAuthenticated && (
            <nav className="main-nav">
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
              <Link to="/rewards" className={`nav-link ${isActive('/rewards') ? 'active' : ''}`}>
                <i className="fas fa-trophy"></i>
                <span>Rewards</span>
              </Link>
              <Link to="/challenges" className={`nav-link ${isActive('/challenges') ? 'active' : ''}`}>
                <i className="fas fa-tasks"></i>
                <span>Challenges</span>
              </Link>
            </nav>
          )}
        </div>
        
        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="user-menu" ref={menuRef}>
              <div 
                className="user-info" 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <div className="user-avatar">
                  {getInitial()}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.displayName}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
              
              <div className={`dropdown-menu ${menuOpen ? 'active' : ''}`}>
                <Link to="/dashboard" className="menu-item">
                  <i className="fas fa-tachometer-alt"></i>Dashboard
                </Link>
                <Link to="/rewards" className="menu-item">
                  <i className="fas fa-trophy"></i>Rewards
                </Link>
                <Link to="/challenges" className="menu-item">
                  <i className="fas fa-tasks"></i>Challenges
                </Link>
                <div className="menu-divider"></div>
                <button onClick={handleLogout} className="menu-item logout-btn">
                  <i className="fas fa-sign-out-alt"></i>Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 