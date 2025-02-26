import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserStorageKey } from '../utils/emailAuth';
import './ChallengeDetails.css';

function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadChallengeData();
  }, [id]);

  const loadChallengeData = () => {
    setIsLoading(true);
    
    // Get challenge from all possible sources
    const customChallengesKey = getUserStorageKey('customChallenges');
    const customChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
    
    const globalChallenges = JSON.parse(localStorage.getItem('globalChallenges') || '[]');
    const defaultChallenges = JSON.parse(localStorage.getItem('defaultChallenges') || '[]');
    
    // Combine all challenges
    const allChallenges = [...customChallenges, ...globalChallenges, ...defaultChallenges];
    
    // Find the challenge
    const foundChallenge = allChallenges.find(c => c.id === id);
    
    if (foundChallenge) {
      // Check if user is enrolled
      const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
      const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
      const isEnrolled = enrolledChallenges.some(c => c.challengeId === id);
      
      setChallenge({
        ...foundChallenge,
        enrolled: isEnrolled
      });
    } else {
      console.error(`Challenge with ID ${id} not found`);
    }
    
    setIsLoading(false);
  };
  
  const enrollInChallenge = () => {
    if (!challenge) return;
    
    // Create enrolled challenge object
    const enrolledChallenge = {
      challengeId: challenge.id,
      title: challenge.title,
      description: challenge.description,
      category: challenge.category,
      difficulty: challenge.difficulty,
      color: challenge.color,
      totalDays: challenge.totalDays,
      currentDay: 1,
      completedTasks: {},
      startDate: new Date().toISOString(),
      tasks: challenge.tasks,
      isGlobal: challenge.isGlobal || false,
      completed: false,
      streak: 0
    };
    
    // Add to enrolled challenges
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    // Check if already enrolled
    if (enrolledChallenges.some(c => c.challengeId === id)) {
      alert('You are already enrolled in this challenge');
      return;
    }
    
    // Add to enrolled challenges
    enrolledChallenges.push(enrolledChallenge);
    localStorage.setItem(enrolledChallengesKey, JSON.stringify(enrolledChallenges));
    
    // Navigate to active challenge
    navigate(`/active-challenge/${challenge.id}`);
  };
  
  // Helper function to render tasks in the new format
  const renderTasks = () => {
    if (!challenge || !challenge.tasks) return null;
    
    // Check if tasks is an object (new format) or array (old format)
    if (Array.isArray(challenge.tasks)) {
      // Old format - simple array of tasks
      return (
        <ul className="challenge-tasks-list">
          {challenge.tasks.map((task, index) => (
            <li key={index} className="challenge-task-item">
              <span className="task-bullet">•</span> 
              {typeof task === 'string' 
                ? task 
                : (typeof task === 'object' && task !== null)
                  ? (task.text || task.title || JSON.stringify(task))
                  : String(task)
              }
            </li>
          ))}
        </ul>
      );
    } else {
      // New format - tasks grouped by day
      return (
        <div className="challenge-tasks-by-day">
          {Object.keys(challenge.tasks).map(day => (
            <div key={day} className="day-tasks">
              <div className="day-title">Day {day}</div>
              <ul className="challenge-tasks-list">
                {challenge.tasks[day].map((task, index) => (
                  <li key={index} className="challenge-task-item">
                    <span className="task-bullet">•</span> 
                    {typeof task === 'string' 
                      ? task 
                      : (typeof task === 'object' && task !== null)
                        ? (task.text || task.title || JSON.stringify(task))
                        : String(task)
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="challenge-details-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading challenge details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!challenge) {
    return (
      <div className="challenge-details-page">
        <div className="container">
          <div className="error-state">
            <h2>Challenge Not Found</h2>
            <p>The challenge you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/challenges')}
            >
              Back to Challenges
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="challenge-details-page">
      <div className="container">
        <div className="challenge-details-card" style={{borderTop: `4px solid ${challenge.color || '#4285f4'}`}}>
          <div className="challenge-header">
          <h1>{challenge.title}</h1>
          <div className="challenge-meta">
              <span className="challenge-category">
                <i className="fas fa-tag"></i> {challenge.category}
              </span>
              <span className="challenge-difficulty">
                <i className="fas fa-signal"></i> {challenge.difficulty || 'Medium'}
              </span>
              <span className="challenge-duration">
                <i className="fas fa-calendar-day"></i> {challenge.totalDays || challenge.duration || 7} days
              </span>
            </div>
          </div>
          
          <div className="challenge-description">
            <p>{challenge.description || 'No description available for this challenge.'}</p>
      </div>
      
          <div className="challenge-tasks">
            <h2><i className="fas fa-tasks"></i> Daily Tasks</h2>
            {renderTasks()}
          </div>
          
          <div className="challenge-benefits">
            <h2><i className="fas fa-star"></i> Benefits</h2>
            <ul className="benefits-list">
              <li>Build consistency and discipline</li>
              <li>Track your progress visually</li>
              <li>Earn points and achievements</li>
              <li>Develop lasting habits</li>
            </ul>
          </div>
          
          <div className="challenge-actions">
          {!challenge.enrolled ? (
              <button 
                className="btn btn-primary" 
                onClick={enrollInChallenge}
              >
                <i className="fas fa-play-circle"></i> Start Challenge
            </button>
          ) : (
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(`/active-challenge/${challenge.id}`)}
              >
                <i className="fas fa-check-circle"></i> Continue Challenge
              </button>
            )}
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-left"></i> Go Back
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeDetails; 