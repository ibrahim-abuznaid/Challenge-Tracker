import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, signInWithEmail, signOut } from '../utils/emailAuth';

// Create the auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Sign in with email
  const login = async (email) => {
    setLoading(true);
    const result = await signInWithEmail(email);
    if (result.success) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  // Sign out
  const logout = async () => {
    setLoading(true);
    const result = await signOut();
    if (result.success) {
      setUser(null);
    }
    setLoading(false);
    return result;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 