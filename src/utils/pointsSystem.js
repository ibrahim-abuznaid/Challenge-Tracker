/**
 * Points and rewards system for challenge completions
 */

import { getUserStorageKey } from './emailAuth';

// Point values for different actions
const POINTS = {
  // Points for completing tasks by category
  taskCompletion: {
    fitness: 10,
    health: 8,
    productivity: 7,
    learning: 9,
    mindfulness: 8,
    personal: 5,
    default: 5
  },
  
  // Points for completing a full day
  dayCompletion: 25,
  
  // Points for completing a challenge
  challengeCompletion: {
    easy: 50,
    medium: 100,
    hard: 200,
    default: 100
  },
  
  // Streak bonuses
  streakBonus: {
    3: 15,  // 3-day streak
    7: 50,  // 7-day streak
    14: 100, // 14-day streak
    30: 300  // 30-day streak
  }
};

// Get user's current points
export const getUserPoints = () => {
  const userPointsKey = getUserStorageKey('userPoints');
  return parseInt(localStorage.getItem(userPointsKey) || '0', 10);
};

// Update user points
export const updateUserPoints = (pointsToAdd) => {
  const key = getUserStorageKey('userPoints');
  const currentPoints = getUserPoints();
  const newPoints = currentPoints + pointsToAdd;
  localStorage.setItem(key, newPoints.toString());
  return newPoints;
};

/**
 * Award points for completing a task
 * @param {string} category - The category of the task
 * @param {number} multiplier - Optional multiplier for points (default: 1)
 */
export const awardTaskCompletionPoints = (category, multiplier = 1) => {
  // Get the points for this category or use default
  const pointsToAward = (POINTS.taskCompletion[category] || POINTS.taskCompletion.default) * multiplier;
  
  // Get current user points
  const userPointsKey = getUserStorageKey('userPoints');
  const currentPoints = parseInt(localStorage.getItem(userPointsKey) || '0', 10);
  
  // Add points
  const newPoints = currentPoints + pointsToAward;
  
  // Save updated points
  localStorage.setItem(userPointsKey, newPoints.toString());
  
  // Log points awarded (for debugging)
  console.log(`Awarded ${pointsToAward} points for completing a ${category} task. Total: ${newPoints}`);
  
  // Return the points awarded
  return pointsToAward;
};

/**
 * Award points for completing a full day of a challenge
 */
export const awardDayCompletionPoints = () => {
  // Get current user points
  const userPointsKey = getUserStorageKey('userPoints');
  const currentPoints = parseInt(localStorage.getItem(userPointsKey) || '0', 10);
  
  // Add points
  const newPoints = currentPoints + POINTS.dayCompletion;
  
  // Save updated points
  localStorage.setItem(userPointsKey, newPoints.toString());
  
  // Log points awarded
  console.log(`Awarded ${POINTS.dayCompletion} points for completing a day. Total: ${newPoints}`);
  
  return POINTS.dayCompletion;
};

/**
 * Award points for completing an entire challenge
 * @param {string} difficulty - The difficulty of the challenge
 */
export const awardChallengeCompletionPoints = (difficulty) => {
  // Get the points for this difficulty or use default
  const pointsToAward = POINTS.challengeCompletion[difficulty] || POINTS.challengeCompletion.default;
  
  // Get current user points
  const userPointsKey = getUserStorageKey('userPoints');
  const currentPoints = parseInt(localStorage.getItem(userPointsKey) || '0', 10);
  
  // Add points
  const newPoints = currentPoints + pointsToAward;
  
  // Save updated points
  localStorage.setItem(userPointsKey, newPoints.toString());
  
  // Log points awarded
  console.log(`Awarded ${pointsToAward} points for completing a ${difficulty} challenge. Total: ${newPoints}`);
  
  return pointsToAward;
};

/**
 * Award bonus points for maintaining a streak
 * @param {number} streakDays - Number of days in the streak
 */
export const awardStreakBonus = (streakDays) => {
  // Check if this streak milestone has a bonus
  if (!POINTS.streakBonus[streakDays]) {
    return 0;
  }
  
  const bonusPoints = POINTS.streakBonus[streakDays];
  
  // Get current user points
  const userPointsKey = getUserStorageKey('userPoints');
  const currentPoints = parseInt(localStorage.getItem(userPointsKey) || '0', 10);
  
  // Add points
  const newPoints = currentPoints + bonusPoints;
  
  // Save updated points
  localStorage.setItem(userPointsKey, newPoints.toString());
  
  // Log points awarded
  console.log(`Awarded ${bonusPoints} bonus points for a ${streakDays}-day streak! Total: ${newPoints}`);
  
  return bonusPoints;
};

// Get current date string for tracking
const getCurrentDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// Check for achievements based on completed tasks
const checkForAchievements = (challengeId) => {
  try {
    // Get completed tasks
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '{}');
    const tasksCount = Object.keys(completedTasks).length;
    
    // Get streak information
    const enrolledChallenges = JSON.parse(localStorage.getItem('enrolledChallenges') || '[]');
    const challenge = enrolledChallenges.find(c => c.challengeId === challengeId);
    
    // Unlock achievements based on progress
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    const earnedAchievementIds = achievements.map(a => a.id);
    
    // First 10 tasks
    if (tasksCount >= 10 && !earnedAchievementIds.includes('first-10-tasks')) {
      unlockAchievement({
        id: 'first-10-tasks',
        title: 'Getting Started',
        description: 'Completed your first 10 tasks',
        points: 20,
        icon: '🌱'
      });
    }
    
    // Check for streaks
    if (challenge && challenge.currentStreak >= 7 && !earnedAchievementIds.includes('7-day-streak')) {
      unlockAchievement({
        id: '7-day-streak',
        title: 'Week Warrior',
        description: 'Maintained a 7-day streak',
        points: POINTS.streakBonus[7],
        icon: '🔥'
      });
    }
    
    // More achievements can be added here
    
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
};

// Unlock a new achievement
export const unlockAchievement = (achievement) => {
  try {
    // Add timestamp
    const achievementWithTimestamp = {
      ...achievement,
      earnedOn: new Date().toISOString()
    };
    
    // Save achievement
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    localStorage.setItem('achievements', JSON.stringify([...achievements, achievementWithTimestamp]));
    
    // Award points if specified
    if (achievement.points) {
      updateUserPoints(achievement.points);
    }
    
    return achievementWithTimestamp;
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return null;
  }
};

// Get all user achievements
export const getUserAchievements = () => {
  try {
    return JSON.parse(localStorage.getItem('achievements') || '[]');
  } catch (error) {
    console.error('Error getting achievements:', error);
    return [];
  }
};

// Get user level based on points
export const getUserLevel = () => {
  const points = getUserPoints();
  
  // Level thresholds
  const levels = [
    { level: 1, threshold: 0, title: "Beginner" },
    { level: 2, threshold: 100, title: "Novice" },
    { level: 3, threshold: 300, title: "Apprentice" },
    { level: 4, threshold: 600, title: "Explorer" },
    { level: 5, threshold: 1000, title: "Adept" },
    { level: 6, threshold: 1500, title: "Expert" },
    { level: 7, threshold: 2200, title: "Master" },
    { level: 8, threshold: 3000, title: "Grandmaster" },
    { level: 9, threshold: 4000, title: "Legend" },
    { level: 10, threshold: 5000, title: "Champion" }
  ];
  
  // Find the highest level the user has reached
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].threshold) {
      const nextLevel = levels[i + 1] || null;
      
      return {
        current: levels[i],
        next: nextLevel,
        pointsToNextLevel: nextLevel ? nextLevel.threshold - points : 0,
        progress: nextLevel ? ((points - levels[i].threshold) / (nextLevel.threshold - levels[i].threshold)) * 100 : 100
      };
    }
  }
  
  return {
    current: levels[0],
    next: levels[1],
    pointsToNextLevel: levels[1].threshold,
    progress: (points / levels[1].threshold) * 100
  };
}; 