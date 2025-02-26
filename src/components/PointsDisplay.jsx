import React, { useState, useEffect } from 'react';
import { getUserPoints, getUserLevel } from '../utils/pointsSystem';
import { getUserStorageKey } from '../utils/emailAuth';
import './PointsDisplay.css';

function PointsDisplay({ animated = false, showLevel = true }) {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(null);
  const [isPointAnimating, setIsPointAnimating] = useState(false);
  const [pointsAdded, setPointsAdded] = useState(0);
  
  useEffect(() => {
    // Get initial points and level
    updatePointsAndLevel();
    
    // Set up a listener for points updates
    const checkPointsInterval = setInterval(updatePointsAndLevel, 1000);
    
    return () => clearInterval(checkPointsInterval);
  }, []);
  
  // Watch for point changes to trigger animation
  useEffect(() => {
    const previousPointsKey = getUserStorageKey('previousPoints');
    const previousPoints = localStorage.getItem(previousPointsKey);
    const currentPoints = getUserPoints();
    
    if (previousPoints && parseInt(previousPoints) < currentPoints) {
      const difference = currentPoints - parseInt(previousPoints);
      animatePointsGain(difference);
    }
    
    localStorage.setItem(previousPointsKey, currentPoints.toString());
  }, [points]);
  
  const updatePointsAndLevel = () => {
    const currentPoints = getUserPoints();
    const currentLevel = getUserLevel();
    
    setPoints(currentPoints);
    setLevel(currentLevel);
  };
  
  const animatePointsGain = (amount) => {
    setPointsAdded(amount);
    setIsPointAnimating(true);
    
    setTimeout(() => {
      setIsPointAnimating(false);
    }, 2000);
  };
  
  return (
    <div className="points-display">
      <div className="points-container">
        <span className="points-icon">⭐</span>
        <span className="points-value">{points.toLocaleString()}</span>
        <span className="points-label">points</span>
        
        {isPointAnimating && (
          <span className="points-animation">+{pointsAdded}</span>
        )}
      </div>
      
      {showLevel && level && (
        <div className="level-container">
          <div className="level-badge">
            <span className="level-number">{level.current.level}</span>
          </div>
          <div className="level-info">
            <span className="level-title">{level.current.title}</span>
            {level.next && (
              <div className="level-progress-container">
                <div 
                  className="level-progress" 
                  style={{ width: `${level.progress}%` }}
                ></div>
                <span className="level-progress-text">
                  {level.pointsToNextLevel} points to level {level.next.level}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PointsDisplay; 