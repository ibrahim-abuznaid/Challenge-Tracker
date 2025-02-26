import React, { useEffect } from 'react';
import './CompletionAnimation.css';

function CompletionAnimation({ title, onComplete }) {
  useEffect(() => {
    // Auto-dismiss after animation completes
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500); // Shorter duration for a snappier feel
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="completion-animation-container">
      <div className="completion-card">
        <div className="completion-checkmark">
          <svg viewBox="0 0 52 52" className="checkmark-svg">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2>Day Complete!</h2>
        <p>{title || 'Keep up the great work!'}</p>
      </div>
    </div>
  );
}

export default CompletionAnimation; 