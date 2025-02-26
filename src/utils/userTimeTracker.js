/**
 * Utility for tracking user's time and location for challenge progress
 */

// Get user's current date in their local timezone
export const getUserLocalDate = () => {
  return new Date();
};

// Format date as YYYY-MM-DD for consistent storage
export const formatDateForStorage = (date) => {
  return date.toISOString().split('T')[0];
};

// Get user's current day key for challenge tracking
export const getCurrentDayKey = () => {
  const today = getUserLocalDate();
  return formatDateForStorage(today);
};

// Check if a new day has started for the user
export const hasNewDayStarted = (lastActivityDate) => {
  if (!lastActivityDate) return true;
  
  const today = getCurrentDayKey();
  return today !== lastActivityDate;
};

// Get user's timezone information
export const getUserTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
};

// Calculate time remaining in the current day
export const getTimeRemainingInDay = () => {
  const now = getUserLocalDate();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  return tomorrow - now; // Returns milliseconds remaining
};

// Format time remaining in a human-readable format
export const formatTimeRemaining = (milliseconds) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

// Try to get user's location if they permit it
export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log("Geolocation error:", error);
        resolve(null);
      },
      { timeout: 10000 }
    );
  });
};

// Save user's daily activity with timestamp and location
export const logDailyActivity = async (challengeId, dayNumber) => {
  try {
    const timestamp = new Date().toISOString();
    const timezone = getUserTimezone();
    const location = await getUserLocation();
    
    const activityLog = {
      challengeId,
      dayNumber,
      completedAt: timestamp,
      timezone,
      location,
      dayKey: getCurrentDayKey()
    };
    
    // Get existing logs
    const existingLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    existingLogs.push(activityLog);
    
    // Save updated logs
    localStorage.setItem('activityLogs', JSON.stringify(existingLogs));
    
    return activityLog;
  } catch (error) {
    console.error("Error logging daily activity:", error);
    return null;
  }
}; 