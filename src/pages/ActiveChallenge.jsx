import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import { getUserStorageKey } from '../utils/emailAuth';
import { 
  awardTaskCompletionPoints, 
  awardDayCompletionPoints, 
  awardChallengeCompletionPoints,
  awardStreakBonus 
} from '../utils/pointsSystem';
import { formatDate } from '../utils/dateUtils';
import CompletionAnimation from '../components/CompletionAnimation';
import './ActiveChallenge.css';

function ActiveChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  
  useEffect(() => {
    loadChallengeData();
  }, [id]);
  
  const loadChallengeData = () => {
    setIsLoading(true);
    
    // Get user-specific enrolled challenges
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    const challenge = enrolledChallenges.find(c => c.challengeId === id);
    
    if (challenge) {
      setChallenge(challenge);
      setCompletedTasks(challenge.completedTasks || {});
      
      // Check if today's tasks are all completed
      const todayKey = challenge.currentDay.toString();
      
      // Handle both task formats (array or object by day)
      const todayTasks = getTodaysTasks(challenge);
      const completedTasksForToday = challenge.completedTasks?.[todayKey] || [];
      
      // Check if all today's tasks are completed
      setAllTasksCompleted(
        completedTasksForToday.length === todayTasks.length && 
        completedTasksForToday.every(status => status)
      );
    }
    
    setIsLoading(false);
  };
  
  // Helper function to get today's tasks from either task format
  const getTodaysTasks = (challenge) => {
    if (!challenge) return [];
    
    const currentDayStr = challenge.currentDay.toString();
    
    // Check if tasks is an object with day keys (new format)
    if (challenge.tasks && typeof challenge.tasks === 'object' && !Array.isArray(challenge.tasks)) {
      return challenge.tasks[currentDayStr] || [];
    }
    
    // Fallback to old format (array of tasks)
    return Array.isArray(challenge.tasks) ? challenge.tasks : [];
  };
  
  const handleTaskToggle = (taskIndex) => {
    const todayKey = challenge.currentDay.toString();
    
    // Create a copy of the completed tasks
    const updatedCompletedTasks = { ...completedTasks };
    
    // Initialize the array for today if it doesn't exist
    if (!updatedCompletedTasks[todayKey]) {
      updatedCompletedTasks[todayKey] = [];
    }
    
    // Ensure the array is long enough
    while (updatedCompletedTasks[todayKey].length <= taskIndex) {
      updatedCompletedTasks[todayKey].push(false);
    }
    
    // Toggle the task completion status
    updatedCompletedTasks[todayKey][taskIndex] = !updatedCompletedTasks[todayKey][taskIndex];
    
    // Check if all tasks are completed
    const todayTasks = getTodaysTasks(challenge);
    const allCompleted = updatedCompletedTasks[todayKey].length === todayTasks.length && 
                         updatedCompletedTasks[todayKey].every(status => status);
    
    // Update state
    setCompletedTasks(updatedCompletedTasks);
    setAllTasksCompleted(allCompleted);
    
    // Award points for task completion
    if (updatedCompletedTasks[todayKey][taskIndex]) {
      awardTaskCompletionPoints(challenge.category);
    }
    
    // Save to localStorage
    const updatedChallenge = { ...challenge, completedTasks: updatedCompletedTasks };
    updateChallengeInStorage(updatedChallenge);
  };
  
  const completeDay = () => {
    if (!allTasksCompleted) {
      return;
    }
    
    // Show completion animation
    setShowCompletionAnimation(true);
    
    // Handle challenge completion logic
    const updatedChallenge = { ...challenge };
    
    // Check if this is the last day
    const isLastDay = updatedChallenge.currentDay + 1 >= updatedChallenge.totalDays;
    
    // Award points for completing the day
    awardDayCompletionPoints();
    
    if (isLastDay) {
      // Mark challenge as completed
      updatedChallenge.completed = true;
      updatedChallenge.completedDate = new Date().toISOString();
      
      // Award completion points based on difficulty
      awardChallengeCompletionPoints(updatedChallenge.difficulty || 'medium');
      
      // Check for streak bonuses
      if (updatedChallenge.streak) {
        awardStreakBonus(updatedChallenge.streak);
      }
    } else {
      // Move to the next day
      updatedChallenge.currentDay += 1;
      
      // Update streak if applicable
      if (!updatedChallenge.streak) {
        updatedChallenge.streak = 1;
      } else {
        updatedChallenge.streak += 1;
      }
    }
    
    updatedChallenge.lastCompletedDate = new Date().toISOString();
    
    // Update state and storage
    setChallenge(updatedChallenge);
    updateChallengeInStorage(updatedChallenge);
  };
  
  const updateChallengeInStorage = (updatedChallenge) => {
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    const updatedChallenges = enrolledChallenges.map(c => 
      c.challengeId === id ? updatedChallenge : c
    );
    
    localStorage.setItem(enrolledChallengesKey, JSON.stringify(updatedChallenges));
  };
  
  const finishCompletionAnimation = () => {
    setShowCompletionAnimation(false);
    
    // If challenge is completed, navigate to dashboard
    if (challenge.completed) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }
  };
  
  if (isLoading) {
    return (
      <div className="active-challenge-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading challenge...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!challenge) {
    return (
      <div className="active-challenge-page">
        <div className="container">
          <div className="error-state">
            <h2>Challenge Not Found</h2>
            <p>We couldn't find the challenge you're looking for.</p>
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="active-challenge-page">
      {showCompletionAnimation && (
        <CompletionAnimation 
          title={challenge.completed ? "Challenge Completed!" : "Day Completed!"}
          onComplete={finishCompletionAnimation}
        />
      )}
      
      <div className="container">
        <div 
          className="active-challenge-card"
          style={{
            borderTopColor: challenge.color,
            borderTopWidth: '4px',
            borderTopStyle: 'solid'
          }}
        >
          <div className="active-challenge-header">
            <h1>{challenge.title}</h1>
            <div className="challenge-meta">
              <span className="challenge-day">
                <i className="fas fa-calendar-day"></i> 
                Day {challenge.currentDay} of {challenge.totalDays}
              </span>
              {challenge.category && (
                <span className="challenge-category">
                  <i className="fas fa-tag"></i> {challenge.category}
                </span>
              )}
            </div>
          </div>
          
          <div className="active-challenge-content">
            <div className="progress-section">
              <h2>Your Progress</h2>
              <ProgressTracker 
                currentDay={challenge.currentDay} 
                totalDays={challenge.totalDays}
                startDate={challenge.startDate}
              />
              
              <div className="challenge-dates">
                <div className="date-item">
                  <span className="date-label">Started</span>
                  <span className="date-value">{formatDate(challenge.startDate)}</span>
                </div>
                
                {challenge.lastCompletedDate && (
                  <div className="date-item">
                    <span className="date-label">Last Completed</span>
                    <span className="date-value">{formatDate(challenge.lastCompletedDate)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="today-tasks">
              <h2><i className="fas fa-tasks"></i> Today's Tasks</h2>
              <div className="tasks-list">
                {getTodaysTasks(challenge).map((task, index) => {
                  const todayKey = challenge.currentDay.toString();
                  const isCompleted = completedTasks[todayKey]?.[index] || false;
                  
                  return (
                    <div 
                      key={index} 
                      className={`task-item ${isCompleted ? 'completed' : ''}`}
                      onClick={() => handleTaskToggle(index)}
                    >
                      <div className="task-checkbox">
                        {isCompleted && <span className="checkmark">✓</span>}
                      </div>
                      <div className="task-content">
                        <div className="task-text">
                          {typeof task === 'object' ? task.text || task.title : task}
                        </div>
                        {typeof task === 'object' && task.description && (
                          <div className="task-description">
                            {task.description}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button 
                className={`complete-day-btn ${!allTasksCompleted ? 'disabled' : ''}`}
                disabled={!allTasksCompleted}
                onClick={completeDay}
              >
                <i className={`fas ${challenge.currentDay + 1 >= challenge.totalDays ? 'fa-flag-checkered' : 'fa-check-circle'}`}></i>
                {challenge.currentDay + 1 >= challenge.totalDays 
                  ? 'Complete Challenge!' 
                  : 'Complete Day'}
              </button>
            </div>
          </div>
          
          <div className="challenge-actions">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-secondary"
            >
              <i className="fas fa-arrow-left"></i> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveChallenge; 