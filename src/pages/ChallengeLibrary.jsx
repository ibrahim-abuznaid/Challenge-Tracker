import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';
import { getUserStorageKey } from '../utils/emailAuth';
import { addDefaultChallenges } from '../utils/addDefaultChallenges';
import './ChallengeLibrary.css';

function ChallengeLibrary() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [allChallenges, setAllChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Ensure default challenges are added
    addDefaultChallenges();
    // Load all challenges
    loadAllChallenges();
  }, []);
  
  const loadAllChallenges = () => {
    setIsLoading(true);
    
    // Get user-specific custom challenges
    const customChallengesKey = getUserStorageKey('customChallenges');
    const customChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
    console.log('Custom Challenges:', customChallenges);
    
    // Get global challenges
    const globalChallenges = JSON.parse(localStorage.getItem('globalChallenges') || '[]')
      .map(challenge => ({
        ...challenge,
        isGlobal: true
      }));
    console.log('Global Challenges:', globalChallenges);
    
    // Get default challenges
    const defaultChallenges = JSON.parse(localStorage.getItem('defaultChallenges') || '[]')
      .map(challenge => ({
        ...challenge,
        isDefault: true
      }));
    console.log('Default Challenges:', defaultChallenges);
    
    // Get enrolled challenges
    const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
    const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
    const enrolledIds = enrolledChallenges.map(c => c.challengeId);
    
    // Include all challenges
    const allChallenges = [...customChallenges, ...globalChallenges, ...defaultChallenges]
      .map(challenge => ({
        ...challenge,
        enrolled: enrolledIds.includes(challenge.id)
      }));
    
    console.log('All Challenges:', allChallenges);
    
    setAllChallenges(allChallenges);
    
    setIsLoading(false);
  };

  const categories = [
    ...new Set(allChallenges.map(c => c.category))
  ].filter(category => category !== undefined && category !== null && category !== '');
  
  const filteredChallenges = filter === 'all' 
    ? allChallenges 
    : allChallenges.filter(c => c.category === filter);

  return (
    <div className="challenge-library">
      <div className="library-container">
        <div className="library-title-section">
          <h1>Challenge Library</h1>
          <Link to="/create-challenge" className="btn btn-create">
            <i className="fas fa-plus"></i> Create Challenge
          </Link>
        </div>
        
        <div className="library-header">
          <h1>Discover Challenges</h1>
          <p>Browse our collection of challenges designed to help you grow and achieve your goals. Find something that inspires you or create your own challenge.</p>
        </div>
        
        <div className="filter-container">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Challenges
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="loading">Loading challenges...</div>
        ) : filteredChallenges.length > 0 ? (
          <div className="challenges-grid">
            {filteredChallenges.map(challenge => (
              <ChallengeCard 
                key={challenge.id}
                challenge={challenge}
                onClick={() => navigate(`/challenge/${challenge.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No challenges found</h3>
            <p>There are no challenges in this category yet. You can create your own!</p>
            <Link to="/create-challenge" className="btn btn-primary">Create Challenge</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChallengeLibrary; 