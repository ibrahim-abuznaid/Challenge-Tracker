import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserStorageKey } from '../utils/emailAuth';
import { v4 as uuidv4 } from 'uuid';
import './AdminDashboard.css';
import EmailLogs from '../components/EmailLogs';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalChallenges: 0,
    completedChallenges: 0
  });
  const [customChallenges, setCustomChallenges] = useState([]);
  const [globalChallenges, setGlobalChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for new global challenge form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    category: 'productivity',
    difficulty: 'medium',
    duration: '7',
    color: '#4285f4'
  });
  const [tasks, setTasks] = useState([{ id: uuidv4(), text: '' }]);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    setIsLoading(true);
    
    // Get all user data
    const users = getAllUsers();
    const activeUsers = users.filter(user => user.lastActive && 
      new Date(user.lastActive) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    // Get all challenges
    const customChallengesKey = getUserStorageKey('customChallenges');
    const customChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
    
    // Get global challenges created by admin
    const globalChallenges = JSON.parse(localStorage.getItem('globalChallenges') || '[]');
    
    // Get enrolled challenges to count completions
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    const completedChallenges = enrolledChallenges.filter(challenge => challenge.completed);
    
    // Update stats
    setStats({
      totalUsers: users.length,
      activeUsers: activeUsers.length,
      totalChallenges: customChallenges.length + globalChallenges.length,
      completedChallenges: completedChallenges.length
    });
    
    // Set custom challenges for display
    setCustomChallenges(customChallenges);
    setGlobalChallenges(globalChallenges);
    
    setIsLoading(false);
  };
  
  // Helper function to get all registered users
  const getAllUsers = () => {
    try {
      const usersData = localStorage.getItem('registeredUsers');
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  };
  
  const handleDeleteChallenge = (challengeId, isGlobal = false) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      if (isGlobal) {
        // Delete from global challenges
        const updatedChallenges = globalChallenges.filter(c => c.id !== challengeId);
        localStorage.setItem('globalChallenges', JSON.stringify(updatedChallenges));
        setGlobalChallenges(updatedChallenges);
      } else {
        // Delete from custom challenges
        const customChallengesKey = getUserStorageKey('customChallenges');
        const updatedChallenges = customChallenges.filter(c => c.id !== challengeId);
        localStorage.setItem(customChallengesKey, JSON.stringify(updatedChallenges));
        setCustomChallenges(updatedChallenges);
      }
      
      // Refresh stats
      loadAdminData();
    }
  };
  
  // Handle input changes for new challenge form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge(prev => ({ ...prev, [name]: value }));
  };
  
  // Add new task for the challenge
  const addTask = () => {
    setTasks([...tasks, { id: uuidv4(), text: '' }]);
  };
  
  // Update task text
  const updateTaskText = (id, text) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text } : task
    ));
  };
  
  // Remove a task
  const removeTask = (id) => {
    if (tasks.length <= 1) return; // Keep at least one task
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Create a new global challenge
  const createGlobalChallenge = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newChallenge.title.trim()) {
      alert('Please enter a challenge title');
      return;
    }
    
    if (tasks.some(task => !task.text.trim())) {
      alert('Please fill in all task descriptions');
      return;
    }
    
    // Format tasks for storage - convert to day-based structure
    const formattedTasks = {};
    const totalDays = parseInt(newChallenge.duration, 10);
    
    // Distribute tasks across days
    for (let i = 1; i <= totalDays; i++) {
      formattedTasks[i] = tasks.map(task => ({
        id: uuidv4(),
        text: task.text,
        completed: false
      }));
    }
    
    // Create new challenge object
    const challenge = {
      id: uuidv4(),
      title: newChallenge.title,
      description: newChallenge.description,
      category: newChallenge.category,
      difficulty: newChallenge.difficulty,
      totalDays: totalDays,
      tasks: formattedTasks,
      color: newChallenge.color,
      isGlobal: true,
      createdAt: new Date().toISOString(),
      createdBy: 'admin'
    };
    
    // Add to global challenges
    const updatedGlobalChallenges = [...globalChallenges, challenge];
    localStorage.setItem('globalChallenges', JSON.stringify(updatedGlobalChallenges));
    setGlobalChallenges(updatedGlobalChallenges);
    
    // Reset form
    setNewChallenge({
      title: '',
      description: '',
      category: 'productivity',
      difficulty: 'medium',
      duration: '7',
      color: '#4285f4'
    });
    setTasks([{ id: uuidv4(), text: '' }]);
    setShowCreateForm(false);
    
    // Refresh stats
    loadAdminData();
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h2>Total Users</h2>
            <div className="stat-value">{stats.totalUsers}</div>
          </div>
          
          <div className="stat-card">
            <h2>Active Users</h2>
            <div className="stat-value">{stats.activeUsers}</div>
          </div>
          
          <div className="stat-card">
            <h2>Total Challenges</h2>
            <div className="stat-value">{stats.totalChallenges}</div>
          </div>
          
          <div className="stat-card">
            <h2>Completed Challenges</h2>
            <div className="stat-value">{stats.completedChallenges}</div>
          </div>
        </div>
        
        {/* Global Challenges Section */}
        <div className="admin-section">
          <div className="section-header">
            <h2>Global Challenges</h2>
            <button 
              className="btn btn-create" 
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Cancel' : '+ Add Global Challenge'}
            </button>
          </div>
          
          {showCreateForm && (
            <div className="create-challenge-form">
              <form onSubmit={createGlobalChallenge}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newChallenge.title}
                    onChange={handleInputChange}
                    placeholder="Challenge title"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newChallenge.description}
                    onChange={handleInputChange}
                    placeholder="Describe the challenge"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      name="category" 
                      value={newChallenge.category}
                      onChange={handleInputChange}
                    >
                      <option value="fitness">Fitness</option>
                      <option value="productivity">Productivity</option>
                      <option value="learning">Learning</option>
                      <option value="mindfulness">Mindfulness</option>
                      <option value="health">Health</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Difficulty</label>
                    <select 
                      name="difficulty" 
                      value={newChallenge.difficulty}
                      onChange={handleInputChange}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Duration (days)</label>
                    <select 
                      name="duration" 
                      value={newChallenge.duration}
                      onChange={handleInputChange}
                    >
                      <option value="3">3 days</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="21">21 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Color</label>
                    <input
                      type="color"
                      name="color"
                      value={newChallenge.color}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="tasks-section">
                  <h3>Challenge Tasks</h3>
                  <p className="helper-text">These tasks will repeat each day of the challenge</p>
                  
                  {tasks.map((task, index) => (
                    <div key={task.id} className="task-item">
                      <input
                        type="text"
                        value={task.text}
                        onChange={(e) => updateTaskText(task.id, e.target.value)}
                        placeholder={`Task ${index + 1}`}
                        required
                      />
                      <button 
                        type="button" 
                        className="btn btn-icon" 
                        onClick={() => removeTask(task.id)}
                        disabled={tasks.length <= 1}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={addTask}
                  >
                    <i className="fas fa-plus"></i> Add Task
                  </button>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Create Global Challenge
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {isLoading ? (
            <div className="loading">Loading challenges...</div>
          ) : globalChallenges.length > 0 ? (
            <div className="challenges-grid">
              {globalChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-card-header" style={{ backgroundColor: challenge.color }}>
                    <h3>{challenge.title}</h3>
                    <span className="global-badge">GLOBAL</span>
                  </div>
                  <div className="challenge-card-body">
                    <p>{challenge.description.substring(0, 100)}{challenge.description.length > 100 ? '...' : ''}</p>
                    <div className="challenge-meta">
                      <span><i className="fas fa-tag"></i> {challenge.category}</span>
                      <span><i className="fas fa-signal"></i> {challenge.difficulty}</span>
                      <span><i className="fas fa-calendar-day"></i> {challenge.totalDays} days</span>
                    </div>
                    <div className="challenge-actions">
                      <button 
                        onClick={() => navigate(`/challenge/${challenge.id}`)} 
                        className="btn btn-primary"
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                      <button 
                        onClick={() => handleDeleteChallenge(challenge.id, true)} 
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No global challenges have been created yet.</p>
            </div>
          )}
        </div>
        
        {/* Custom Challenges Section */}
        <div className="admin-section">
          <h2>Your Custom Challenges</h2>
          
          {isLoading ? (
            <div className="loading">Loading challenges...</div>
          ) : customChallenges.length > 0 ? (
            <div className="challenges-grid">
              {customChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-card-header" style={{ backgroundColor: challenge.color }}>
                    <h3>{challenge.title}</h3>
                  </div>
                  <div className="challenge-card-body">
                    <p>{challenge.description.substring(0, 100)}{challenge.description.length > 100 ? '...' : ''}</p>
                    <div className="challenge-meta">
                      <span><i className="fas fa-tag"></i> {challenge.category}</span>
                      <span><i className="fas fa-signal"></i> {challenge.difficulty}</span>
                      <span><i className="fas fa-calendar-day"></i> {challenge.totalDays} days</span>
                    </div>
                    <div className="challenge-actions">
                      <button 
                        onClick={() => navigate(`/challenge/${challenge.id}`)} 
                        className="btn btn-primary"
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                      <button 
                        onClick={() => handleDeleteChallenge(challenge.id)} 
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't created any custom challenges yet.</p>
              <Link to="/create-challenge" className="btn btn-create">
                CREATE CHALLENGE
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Email Logs section */}
      <EmailLogs />
    </div>
  );
}

export default AdminDashboard; 