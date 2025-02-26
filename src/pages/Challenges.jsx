const loadChallenges = () => {
  setIsLoading(true);
  
  // Get user-specific custom challenges
  const customChallengesKey = getUserStorageKey('customChallenges');
  const customChallenges = JSON.parse(localStorage.getItem(customChallengesKey) || '[]');
  
  // Get global challenges
  const globalChallenges = JSON.parse(localStorage.getItem('globalChallenges') || '[]')
    .map(challenge => ({
      ...challenge,
      isGlobal: true
    }));
    
  // Get default challenges
  const defaultChallenges = JSON.parse(localStorage.getItem('defaultChallenges') || '[]')
    .map(challenge => ({
      ...challenge,
      isDefault: true
    }));
  
  // Get enrolled challenges to check which ones the user is already enrolled in
  const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
  const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
  const enrolledIds = enrolledChallenges.map(c => c.challengeId);
  
  // Include custom, global, and default challenges
  const allChallenges = [...customChallenges, ...globalChallenges, ...defaultChallenges]
    .map(challenge => ({
      ...challenge,
      enrolled: enrolledIds.includes(challenge.id)
    }));
  
  setChallenges(allChallenges);
  setFilteredChallenges(allChallenges);
  setIsLoading(false);
}; 