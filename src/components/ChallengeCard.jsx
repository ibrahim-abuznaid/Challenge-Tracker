import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChallengeCard.css';

function ChallengeCard({ challenge }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/challenge/${challenge.id}`);
  };

  return (
    <div className="challenge-card" onClick={handleClick}>
      <div 
        className="challenge-card-header" 
        style={{ 
          backgroundColor: challenge.color || '#4285f4',
          backgroundImage: challenge.image ? `url(${challenge.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h3>{challenge.title}</h3>
        {challenge.isGlobal && <span className="global-badge">GLOBAL</span>}
      </div>
      <div className="challenge-card-body">
        <p className="challenge-card-description">
          {challenge.description?.substring(0, 100)}
          {challenge.description?.length > 100 ? '...' : ''}
        </p>
        
        <div className="challenge-meta">
          <span className="challenge-category">
            <i className="fas fa-tag"></i> {challenge.category}
          </span>
          <span className="challenge-difficulty">
            <i className="fas fa-signal"></i> {challenge.difficulty}
          </span>
          <span className="challenge-duration">
            <i className="fas fa-calendar-day"></i> {challenge.totalDays || challenge.duration} days
          </span>
        </div>
        
        <div className="challenge-card-footer">
          <button 
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/challenge/${challenge.id}`);
            }}
          >
            VIEW DETAILS
          </button>
          {challenge.enrolled && (
            <span className="enrolled-badge">
              <i className="fas fa-check-circle"></i> Enrolled
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard; 