/**
 * Simple email-based authentication utility
 * Allows users to authenticate with just their email
 */

// Check if email is valid format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sign in with email only
export const signInWithEmail = (email) => {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }
  
  try {
    // Get existing users or create empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // If user doesn't exist, create a new user profile
    if (!user) {
      user = {
        id: `user_${Date.now()}`,
        email: email.toLowerCase(),
        displayName: email.split('@')[0],
        created: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      // Update last login time
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Set current user in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: 'Error signing in' };
  }
};

// Sign out current user
export const signOut = () => {
  try {
    localStorage.removeItem('currentUser');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: 'Error signing out' };
  }
};

// Get current user
export const getCurrentUser = () => {
  try {
    const userString = localStorage.getItem('currentUser');
    if (!userString) return null;
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Update user profile
export const updateUserProfile = (updates) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, error: 'No user is logged in' };
    
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return { success: false, error: 'User not found' };
    
    // Update user data
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    
    // Save updated users
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: 'Error updating profile' };
  }
};

// Get user-specific storage key
export const getUserStorageKey = (key) => {
  const user = getCurrentUser();
  if (!user) return key; // Fallback for when not logged in
  return `${user.id}_${key}`;
}; 