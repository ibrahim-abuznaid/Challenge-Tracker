import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { challenges } from '../data/challenges';
import { getUserStorageKey } from '../utils/emailAuth';
import './Admin.css';

function Admin() {
  const [allChallenges, setAllChallenges] = useState([]);
  const [customChallenges, setCustomChallenges] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalChallenges: 0,
    completedChallenges: 0
  });

  useEffect(() => {
    // Load built-in challenges
    const builtInChallenges = challenges.map(challenge => ({
      ...challenge,
      isBuiltIn: true
    }));
    
    // Load user-specific custom challenges
    const customChallengesKey = getUserStorageKey('customChallenges');
    const storedCustomChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
    
    setAllChallenges([...builtInChallenges, ...storedCustomChallenges]);
    setCustomChallenges(storedCustomChallenges);
    
    // Load user stats
    loadUserStats();
  }, []);
  
  const loadUserStats = () => {
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Get current user's enrolled challenges
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    // Calculate completed challenges
    const completedChallenges = enrolledChallenges.filter(
      challenge => challenge.currentDay >= challenge.totalDays
    ).length;
    
    // Set stats
    setUserStats({
      totalUsers: users.length,
      activeUsers: users.filter(user => {
        const lastLogin = new Date(user.lastLogin);
        const now = new Date();
        const daysSinceLogin = (now - lastLogin) / (1000 * 60 * 60 * 24);
        return daysSinceLogin < 7; // Active if logged in within last 7 days
      }).length,
      totalChallenges: enrolledChallenges.length,
      completedChallenges
    });
  };
  
  const deleteCustomChallenge = (challengeId) => {
    if (window.confirm('Are you sure you want to delete this custom challenge?')) {
      // Get user-specific custom challenges
      const customChallengesKey = getUserStorageKey('customChallenges');
      const storedCustomChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
      
      // Filter out the challenge to delete
      const updatedChallenges = storedCustomChallenges.filter(
        challenge => challenge.id !== challengeId
      );
      
      // Save back to localStorage
      localStorage.setItem(customChallengesKey, JSON.stringify(updatedChallenges));
      
      // Update state
      setCustomChallenges(updatedChallenges);
      setAllChallenges([
        ...challenges.map(challenge => ({ ...challenge, isBuiltIn: true })),
        ...updatedChallenges
      ]);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <div className="stat-value">{userStats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <div className="stat-value">{userStats.activeUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Total Challenges</h3>
            <div className="stat-value">{userStats.totalChallenges}</div>
          </div>
          <div className="stat-card">
            <h3>Completed Challenges</h3>
            <div className="stat-value">{userStats.completedChallenges}</div>
          </div>
        </div>
        
        <div className="admin-section">
          <h2>Your Custom Challenges</h2>
          
          {customChallenges.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any custom challenges yet.</p>
              <Link to="/challenges/create" className="btn btn-primary">
                Create Challenge
              </Link>
            </div>
          ) : (
            <div className="challenges-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customChallenges.map(challenge => (
                    <tr key={challenge.id}>
                      <td>{challenge.title}</td>
                      <td>{challenge.category}</td>
                      <td>{challenge.duration} days</td>
                      <td>{new Date(challenge.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteCustomChallenge(challenge.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin; 