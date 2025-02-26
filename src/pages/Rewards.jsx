import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserPoints, getUserLevel, getUserAchievements } from '../utils/pointsSystem';
import PointsDisplay from '../components/PointsDisplay';
import './Rewards.css';

function Rewards() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(null);
  const [achievements, setAchievements] = useState([]);
  
  useEffect(() => {
    // Load user's points, level and achievements
    loadUserData();
  }, []);
  
  const loadUserData = () => {
    // These functions already use getUserStorageKey internally
    const currentPoints = getUserPoints();
    const currentLevel = getUserLevel();
    const userAchievements = getUserAchievements();
    
    setPoints(currentPoints);
    setLevel(currentLevel);
    setAchievements(userAchievements);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="rewards-page">
      <div className="container">
        <div className="rewards-header">
          <h1>Your Rewards & Achievements</h1>
          <p>Track your progress and unlock new rewards as you complete challenges!</p>
        </div>
        
        <div className="rewards-grid">
          <div className="rewards-section points-section">
            <h2>Points & Level</h2>
            <div className="rewards-card">
              <PointsDisplay showLevel={true} />
              
              <div className="level-benefits">
                <h3>Level {level?.current.level} Benefits</h3>
                <ul>
                  <li>Access to {level?.current.level} special challenges</li>
                  <li>{level?.current.level * 5}% bonus points on all completions</li>
                  <li>Unlock custom themes and badges</li>
                </ul>
              </div>
              
              {level?.next && (
                <div className="next-level">
                  <h3>Next Level: {level.next.title}</h3>
                  <p>Complete {Math.ceil(level.pointsToNextLevel / 10)} more tasks to reach Level {level.next.level}!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="rewards-section achievements-section">
            <h2>Achievements</h2>
            {achievements.length === 0 ? (
              <div className="empty-state">
                <h3>No achievements yet</h3>
                <p>Complete challenges and tasks to earn achievements!</p>
                <Link to="/challenges" className="btn btn-primary">Find Challenges</Link>
              </div>
            ) : (
              <div className="achievements-list">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="achievement-card">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-details">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                      <div className="achievement-metadata">
                        <span className="achievement-date">Earned on {formatDate(achievement.earnedOn)}</span>
                        {achievement.points && (
                          <span className="achievement-points">+{achievement.points} points</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="rewards-section leaderboard-preview">
          <h2>Points Leaderboard</h2>
          <div className="rewards-card">
            <p>Feature coming soon! Compare your progress with other users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rewards; 