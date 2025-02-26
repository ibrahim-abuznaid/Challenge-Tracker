import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import { getUserStorageKey } from '../utils/emailAuth';
import { getUserPoints, getUserLevel } from '../utils/pointsSystem';
import './Dashboard.css';

function Dashboard() {
  const [activeEnrolledChallenges, setActiveEnrolledChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setIsLoading(true);
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    const active = enrolledChallenges.filter(challenge => !challenge.completed);
    const completed = enrolledChallenges.filter(challenge => challenge.completed);
    
    setActiveEnrolledChallenges(active);
    setCompletedChallenges(completed);
    
    setUserPoints(getUserPoints());
    setUserLevel(getUserLevel());
    setIsLoading(false);
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
    setActiveEnrolledChallenges(updatedChallenges);
    
    // Optional: Show a success toast or notification
    // toast('Challenge deleted successfully');
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-stats-container">
          <div className="user-stat-card">
            <span className="stat-label">Level</span>
            <span className="stat-value">{userLevel?.level || 1}</span>
          </div>
          <div className="user-stat-card">
            <span className="stat-label">Points</span>
            <span className="stat-value">{userPoints}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="active-challenges-section">
          <div className="section-header">
            <h2>Active Challenges</h2>
            <Link to="/challenges" className="btn-find-challenges">
              Find New Challenges
            </Link>
          </div>
          
          <div className="challenges-grid">
            {activeEnrolledChallenges.length > 0 ? (
              activeEnrolledChallenges.map(challenge => (
                <Link 
                  key={challenge.challengeId} 
                  to={`/active-challenge/${challenge.challengeId}`}
                  className="challenge-card"
                >
                  <div 
                    className="challenge-card-header"
                    style={{ backgroundColor: challenge.color || '#4285f4' }}
                  >
                    <h3>{challenge.title}</h3>
                    <div className="challenge-progress">
                      Day {challenge.currentDay} of {challenge.totalDays}
                    </div>
                  </div>
                  <div className="challenge-card-content">
                    <ProgressTracker 
                      current={challenge.currentDay} 
                      total={challenge.totalDays}
                    />
                    <div className="challenge-meta">
                      <span className="challenge-category">
                        <i className="fas fa-tag"></i> {challenge.category}
                      </span>
                      <span className="challenge-difficulty">
                        <i className="fas fa-signal"></i> {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <p>You haven't enrolled in any challenges yet.</p>
                <Link to="/challenges" className="btn-browse-challenges">
                  Browse Challenges
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="completed-challenges-section">
          <h2>Completed Challenges</h2>
          <div className="challenges-grid">
            {completedChallenges.length > 0 ? (
              completedChallenges.map(challenge => (
                <div key={challenge.challengeId} className="challenge-card completed">
                  <div 
                    className="challenge-card-header"
                    style={{ backgroundColor: challenge.color || '#4285f4' }}
                  >
                    <h3>{challenge.title}</h3>
                    <span className="completion-badge">
                      <i className="fas fa-check-circle"></i> Completed
                    </span>
                  </div>
                  <div className="challenge-card-content">
                    <p>Completed all {challenge.totalDays} days!</p>
                    <div className="challenge-meta">
                      <span className="challenge-category">
                        <i className="fas fa-tag"></i> {challenge.category}
                      </span>
                      <span className="challenge-difficulty">
                        <i className="fas fa-signal"></i> {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Complete challenges to see them here!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard; 