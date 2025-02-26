// Theme utility to force dark mode
export const initDarkTheme = () => {
  // Set dark theme on document
  document.documentElement.setAttribute('data-theme', 'dark');
  // Save preference to localStorage
  localStorage.setItem('theme', 'dark');
};

// Simplified theme utility (removes toggle functionality)
export const getTheme = () => {
  return 'dark';
}; 