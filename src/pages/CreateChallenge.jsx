import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getUserStorageKey } from '../utils/emailAuth';
import './CreateChallenge.css';

function CreateChallenge() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [difficulty, setDifficulty] = useState('medium');
  const [duration, setDuration] = useState(7);
  const [color, setColor] = useState('#4285f4');
  
  // Change to store tasks grouped by day
  const [tasksByDay, setTasksByDay] = useState({});
  
  // Generate empty task groups when duration changes
  useEffect(() => {
    const newTasksByDay = { ...tasksByDay };
    
    // Create task arrays for each day
    for (let day = 1; day <= duration; day++) {
      // If no tasks exist for this day yet, initialize with one empty task
      if (!newTasksByDay[day] || newTasksByDay[day].length === 0) {
        newTasksByDay[day] = [{ id: uuidv4(), text: '' }];
      }
    }
    
    // Remove days that are beyond the new duration
    Object.keys(newTasksByDay).forEach(day => {
      if (parseInt(day, 10) > duration) {
        delete newTasksByDay[day];
      }
    });
    
    setTasksByDay(newTasksByDay);
  }, [duration]);
  
  // Add a new task for a specific day
  const addTaskForDay = (day) => {
    setTasksByDay(prev => {
      const updatedTasks = { ...prev };
      if (!updatedTasks[day]) {
        updatedTasks[day] = [];
      }
      updatedTasks[day] = [...updatedTasks[day], { id: uuidv4(), text: '' }];
      return updatedTasks;
    });
  };
  
  // Remove a specific task
  const removeTask = (day, taskId) => {
    setTasksByDay(prev => {
      const updatedTasks = { ...prev };
      // Don't remove if it's the only task for the day
      if (updatedTasks[day].length <= 1) {
        return prev;
      }
      updatedTasks[day] = updatedTasks[day].filter(task => task.id !== taskId);
      return updatedTasks;
    });
  };
  
  // Update a task's text
  const updateTaskText = (day, taskId, text) => {
    setTasksByDay(prev => {
      const updatedTasks = { ...prev };
      updatedTasks[day] = updatedTasks[day].map(task => 
        task.id === taskId ? { ...task, text } : task
      );
      return updatedTasks;
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      alert('Please enter a title for your challenge');
      return;
    }
    
    // Check if all tasks have text
    let hasEmptyTasks = false;
    Object.values(tasksByDay).forEach(dayTasks => {
      dayTasks.forEach(task => {
        if (!task.text.trim()) {
          hasEmptyTasks = true;
        }
      });
    });
    
    if (hasEmptyTasks) {
      alert('Please fill in all task descriptions');
      return;
    }
    
    // Format tasks for storage
    const formattedTasks = {};
    Object.keys(tasksByDay).forEach(day => {
      formattedTasks[day] = tasksByDay[day].map(task => ({
        id: task.id,
        text: task.text,
        completed: false
      }));
    });
    
    // Create new challenge
    const newChallenge = {
      id: uuidv4(),
      title,
      description,
      category,
      difficulty,
      totalDays: parseInt(duration, 10),
      tasks: formattedTasks,
      color,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const customChallengesKey = getUserStorageKey('customChallenges');
    const existingChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
    existingChallenges.push(newChallenge);
    localStorage.setItem(customChallengesKey, JSON.stringify(existingChallenges));
    
    // Navigate to challenges page
    navigate('/challenges');
  };
  
  return (
    <div className="create-challenge-page">
      <div className="container">
        <h1>Create New Challenge</h1>
        
        <form onSubmit={handleSubmit} className="create-challenge-form">
          <div className="form-group">
            <label htmlFor="title">Challenge Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter a title for your challenge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="What is this challenge about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="personal">Personal Development</option>
                <option value="fitness">Fitness</option>
                <option value="health">Health</option>
                <option value="coding">Coding</option>
                <option value="creativity">Creativity</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (days)</label>
              <input
                type="number"
                id="duration"
                min="1"
                max="90"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10) || 1)}
              />
              <p className="help-text">Choose how many days your challenge will run</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          
          {/* Daily Tasks Section */}
          <div className="daily-tasks-section">
            <h2>Daily Tasks</h2>
            <p className="help-text">Specify tasks to complete on each day. You can add multiple tasks per day.</p>
            
            <div className="tasks-container">
              {Array.from({ length: duration }, (_, i) => i + 1).map(day => (
                <div key={day} className="day-tasks-group">
                  <div className="day-header">
                    <span className="day-number">Day {day}</span>
                  </div>
                  
                  <div className="day-tasks">
                    {tasksByDay[day]?.map((task, index) => (
                      <div key={task.id} className="task-item-form">
                        <div className="task-indicator">
                          <span className="task-number">{index + 1}</span>
                        </div>
                        
                        <div className="task-text-input">
                          <input
                            type="text"
                            placeholder={`Task ${index + 1} for day ${day}`}
                            value={task.text}
                            onChange={(e) => updateTaskText(day, task.id, e.target.value)}
                          />
                        </div>
                        
                        <button 
                          type="button"
                          className="task-remove-btn"
                          onClick={() => removeTask(day, task.id)}
                          aria-label="Remove task"
                          disabled={tasksByDay[day]?.length <= 1}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      className="add-task-btn"
                      onClick={() => addTaskForDay(day)}
                    >
                      <i className="fas fa-plus"></i> Add Another Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/challenges')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChallenge; 