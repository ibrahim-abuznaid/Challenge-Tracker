import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ currentDay, totalDays, color = '#4285f4' }) {
  // Calculate progress percentage
  const progress = Math.min(Math.round((currentDay / totalDays) * 100), 100);
  
  // Generate day markers
  const dayMarkers = [];
  const markerInterval = totalDays <= 10 ? 1 : Math.ceil(totalDays / 10);
  
  for (let i = 0; i <= totalDays; i += markerInterval) {
    if (i === 0 || i === totalDays || i % markerInterval === 0) {
      const isCompleted = i <= currentDay;
      dayMarkers.push(
        <div 
          key={i} 
          className={`day-marker ${isCompleted ? 'completed' : ''}`}
          style={{ 
            left: `${(i / totalDays) * 100}%`,
            backgroundColor: isCompleted ? color : 'var(--background)'
          }}
        >
          <span className="day-number">{i}</span>
        </div>
      );
    }
  }

  return (
    <div className="progress-tracker-container">
      <div className="progress-stats">
        <div className="progress-percentage">{progress}% Complete</div>
        <div className="progress-days">Day {currentDay} of {totalDays}</div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`
          }}
        ></div>
        {dayMarkers}
      </div>
      
      <div className="progress-labels">
        <span>Start</span>
        <span>Finish</span>
      </div>
    </div>
  );
}

export default ProgressTracker; 