import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import { getUserStorageKey } from '../utils/emailAuth';
import { getUserPoints, getUserLevel } from '../utils/pointsSystem';
import './Dashboard.css';

function Dashboard() {
  const [enrolledChallenges, setEnrolledChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(null);
  
  useEffect(() => {
    // Load user-specific data
    loadUserData();
  }, []);
  
  const loadUserData = () => {
    // Get user-specific enrolled challenges
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolled = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    const completed = enrolled.filter(challenge => 
      challenge.currentDay >= challenge.totalDays
    );
    
    const active = enrolled.filter(challenge => 
      challenge.currentDay < challenge.totalDays
    );
    
    setEnrolledChallenges(active);
    setCompletedChallenges(completed);
    
    // Get user points and level
    setUserPoints(getUserPoints());
    const level = getUserLevel();
    setUserLevel(level);
  };
  
  const deleteChallenge = (challengeId) => {
    // Skip the confirmation dialog and directly delete the challenge
    const challengesKey = getUserStorageKey('enrolledChallenges');
    const existingChallenges = JSON.parse(localStorage.getItem(challengesKey) || '[]');
    
    // Filter out the challenge with the specified ID
    const updatedChallenges = existingChallenges.filter(
      challenge => challenge.challengeId !== challengeId
    );
    
    // Save the updated challenges list back to localStorage
    localStorage.setItem(challengesKey, JSON.stringify(updatedChallenges));
    
    // Update the state to reflect the changes
    setEnrolledChallenges(updatedChallenges);
    
    // Optional: Show a success toast or notification
    // toast('Challenge deleted successfully');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header container">
        <h1>Your Dashboard</h1>
        <div className="dashboard-stats container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Level</span>
              <span className="stat-value">1</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Points</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active</span>
              <span className="stat-value">{enrolledChallenges.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completed</span>
              <span className="stat-value">0</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <section className="dashboard-section active-challenges container">
          <h2>Active Challenges</h2>
          
          {enrolledChallenges.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any active challenges yet.</p>
              <Link to="/challenges" className="btn btn-primary">
                <i className="fas fa-search"></i> Browse Challenges
              </Link>
            </div>
          ) : (
            <div className="challenges-list">
              {enrolledChallenges.map(challenge => (
                <div key={challenge.challengeId} className="challenge-item card">
                  <div className="challenge-item-header" style={{ backgroundColor: challenge.color || '#4285f4' }}>
                    <h3>{challenge.title}</h3>
                    <button 
                      className="delete-challenge-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChallenge(challenge.challengeId);
                      }}
                      title="Delete Challenge"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="challenge-item-content">
                    <ProgressTracker 
                      currentDay={challenge.currentDay} 
                      totalDays={challenge.totalDays} 
                    />
                    
                    <div className="challenge-item-footer">
                      <span className="days-left">
                        {challenge.totalDays - challenge.currentDay} days left
                      </span>
                      <Link 
                        to={`/active-challenge/${challenge.challengeId}`}
                        className="view-challenge-btn"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        <section className="dashboard-section completed-challenges container">
          <h2>Completed Challenges</h2>
          
          <div className="empty-state">
            <p>You haven't completed any challenges yet.</p>
            <p className="motivation-text">Complete your active challenges to see them here!</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 