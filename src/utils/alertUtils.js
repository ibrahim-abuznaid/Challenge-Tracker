/**
 * Alert utilities to replace browser dialogs with custom notifications
 */

// Store the original alert function
const originalAlert = window.alert;

// Replace default browser alert with silent version
export const disableBrowserAlerts = () => {
  // Override the alert function with a no-op function
  window.alert = () => {};
  
  // Return a function to restore the original behavior if needed
  return () => {
    window.alert = originalAlert;
  };
};

// Replace with custom toast notifications (if you prefer visual feedback)
export const replaceWithToasts = (toastFunction) => {
  window.alert = (message) => {
    if (toastFunction && typeof toastFunction === 'function') {
      toastFunction(message);
    }
    // Otherwise silently ignore
  };
  
  return () => {
    window.alert = originalAlert;
  };
}; 