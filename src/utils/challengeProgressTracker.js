import { 
  getCurrentDayKey, 
  hasNewDayStarted, 
  logDailyActivity 
} from './userTimeTracker';
import { getUserStorageKey } from './emailAuth';

// Mark today's tasks as completed for a challenge
export const completeChallengeDayTasks = async (challengeId) => {
  try {
    // Use user-specific key
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    
    // Find the specific challenge
    const challengeIndex = enrolledChallenges.findIndex(c => c.challengeId === challengeId);
    
    if (challengeIndex === -1) {
      console.error("Challenge not found:", challengeId);
      return false;
    }
    
    const challenge = enrolledChallenges[challengeIndex];
    
    // Check if today's tasks are already completed
    if (challenge.lastCompletedDate === getCurrentDayKey()) {
      console.log("Tasks already completed for today");
      return false;
    }
    
    // Update challenge progress
    const updatedChallenge = {
      ...challenge,
      currentDay: challenge.currentDay + 1,
      lastCompletedDate: getCurrentDayKey(),
      completedDates: [...(challenge.completedDates || []), getCurrentDayKey()]
    };
    
    // Log the activity with time and location data
    await logDailyActivity(challengeId, updatedChallenge.currentDay);
    
    // Update the challenge in storage
    enrolledChallenges[challengeIndex] = updatedChallenge;
    localStorage.setItem(enrolledChallengesKey, JSON.stringify(enrolledChallenges));
    
    // Check if challenge is now complete
    if (updatedChallenge.currentDay >= updatedChallenge.totalDays) {
      const achievementData = {
        id: `${challengeId}-completion`,
        title: `Completed: ${updatedChallenge.title}`,
        description: `Successfully completed the ${updatedChallenge.title} challenge!`,
        earnedOn: new Date().toISOString(),
        icon: '🏆'
      };
      
      // Save achievement
      const achievementsKey = getUserStorageKey('achievements');
      const achievements = JSON.parse(localStorage.getItem(achievementsKey) || '[]');
      localStorage.setItem(achievementsKey, JSON.stringify([...achievements, achievementData]));
    }
    
    return true;
  } catch (error) {
    console.error("Error completing challenge tasks:", error);
    return false;
  }
};

// Get the user's challenge progress stats with time tracking
export const getChallengeProgressStats = (challengeId) => {
  try {
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    const challenge = enrolledChallenges.find(c => c.challengeId === challengeId);
    
    if (!challenge) return null;
    
    // Get activity logs for this challenge
    const allLogsKey = getUserStorageKey('activityLogs');
    const allLogs = JSON.parse(localStorage.getItem(allLogsKey) || '[]');
    const challengeLogs = allLogs.filter(log => log.challengeId === challengeId);
    
    // Calculate streak
    let currentStreak = 0;
    let longestStreak = 0;
    
    if (challenge.completedDates && challenge.completedDates.length > 0) {
      // Sort dates
      const sortedDates = [...challenge.completedDates].sort();
      
      // Calculate current streak
      const today = getCurrentDayKey();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split('T')[0];
      
      if (sortedDates.includes(today) || sortedDates.includes(yesterdayKey)) {
        currentStreak = 1;
        
        // Go backwards from yesterday to count streak
        let checkDate = new Date(yesterday);
        checkDate.setDate(checkDate.getDate() - 1);
        
        while (true) {
          const checkDateKey = checkDate.toISOString().split('T')[0];
          if (sortedDates.includes(checkDateKey)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
      
      // Calculate longest streak
      let tempStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i-1]);
        const currDate = new Date(sortedDates[i]);
        
        const diffTime = currDate - prevDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }
      
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    }
    
    return {
      currentDay: challenge.currentDay,
      totalDays: challenge.totalDays,
      progress: (challenge.currentDay / challenge.totalDays) * 100,
      lastCompletedDate: challenge.lastCompletedDate,
      todayCompleted: challenge.lastCompletedDate === getCurrentDayKey(),
      currentStreak,
      longestStreak,
      activityLogs: challengeLogs
    };
  } catch (error) {
    console.error("Error getting challenge stats:", error);
    return null;
  }
};

// Check if it's time to remind the user to complete their daily tasks
export const shouldRemindUser = (challengeId) => {
  try {
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    const challenge = enrolledChallenges.find(c => c.challengeId === challengeId);
    
    if (!challenge) return false;
    
    // If user hasn't completed today's tasks and it's past their preferred reminder time
    if (challenge.lastCompletedDate !== getCurrentDayKey()) {
      const now = new Date();
      const userPreferredTime = challenge.reminderTime || '20:00'; // Default 8 PM
      const [hours, minutes] = userPreferredTime.split(':').map(num => parseInt(num));
      
      if (now.getHours() >= hours && now.getMinutes() >= minutes) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error("Error checking reminder status:", error);
    return false;
  }
}; 