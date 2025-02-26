// Logging utility for storing email activities
export const logEmailActivity = (email, action) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    email,
    action, // 'login', 'signup', 'logout'
    timestamp,
  };

  // Get existing logs
  const existingLogs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
  
  // Add new log entry
  existingLogs.push(logEntry);
  
  // Store updated logs
  localStorage.setItem('emailLogs', JSON.stringify(existingLogs));
};

// Get all email logs
export const getEmailLogs = () => {
  return JSON.parse(localStorage.getItem('emailLogs') || '[]');
};

// Clear all logs
export const clearEmailLogs = () => {
  localStorage.removeItem('emailLogs');
}; 