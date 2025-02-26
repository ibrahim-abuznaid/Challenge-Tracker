import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <input 
        type="checkbox" 
        id="theme-switch" 
        checked={darkMode} 
        onChange={toggleTheme} 
      />
      <label htmlFor="theme-switch" className="toggle-label">
        <span className="toggle-icon">
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM12 5a7 7 0 110 14 7 7 0 010-14zm0-3a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 19a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.64 7.05a1 1 0 01.71.29l.7.7a1 1 0 11-1.41 1.41l-.7-.7a1 1 0 01.7-1.7zm12.02 12.02a1 1 0 01-.71-.29l-.7-.7a1 1 0 111.41-1.41l.7.7a1 1 0 01-.7 1.7zM3 13a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm17 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM6.34 19.66a1 1 0 01-.71-.29 1 1 0 010-1.41l.7-.7a1 1 0 111.41 1.41l-.7.7a1 1 0 01-.7.29zm12.02-12.02a1 1 0 01-.7-.29 1 1 0 010-1.41l.7-.7a1 1 0 111.41 1.41l-.7.7a1 1 0 01-.71.29z" />
            </svg>
          )}
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle; 