import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ChallengeLibrary from './pages/ChallengeLibrary';
import ChallengeDetails from './pages/ChallengeDetails';
import CreateChallenge from './pages/CreateChallenge';
import Dashboard from './pages/Dashboard';
import ActiveChallenge from './pages/ActiveChallenge';
import Admin from './pages/Admin';
import Rewards from './pages/Rewards';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { add75HardChallenge } from './utils/addHardChallenge';
import { add7DayReadingChallenge } from './utils/addReadingChallenge';
import './App.css';
import './styles/buttons.css';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  useEffect(() => {
    // Add challenges when app initializes
    add75HardChallenge();
    add7DayReadingChallenge();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/challenges" element={<ChallengeLibrary />} />
                <Route path="/challenges/:id" element={<ChallengeDetails />} />
                <Route 
                  path="/challenges/create" 
                  element={
                    <ProtectedRoute>
                      <CreateChallenge />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/active-challenge/:id" 
                  element={
                    <ProtectedRoute>
                      <ActiveChallenge />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/rewards" 
                  element={
                    <ProtectedRoute>
                      <Rewards />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/create-challenge" element={<CreateChallenge />} />
                <Route path="/challenge/:id" element={
                  <ProtectedRoute>
                    <ChallengeDetails />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 