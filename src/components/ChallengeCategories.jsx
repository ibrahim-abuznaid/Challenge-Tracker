import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeCategories = () => {
  return (
    <div className="categories-wrapper">
      {/* Existing category buttons */}
      <Link to="/create-challenge" className="btn btn-create">
        <i className="fas fa-plus"></i> Create Challenge
      </Link>
    </div>
  );
};

export default ChallengeCategories; 