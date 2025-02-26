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
  
  // Get enrolled challenges to check which ones the user is already enrolled in
  const enrolledChallengesKey = getUserStorageKey('enrolledChallenges');
  const enrolledChallenges = JSON.parse(localStorage.getItem(enrolledChallengesKey) || '[]');
  const enrolledIds = enrolledChallenges.map(c => c.challengeId);
  
  // Only include custom and global challenges, no predefined ones
  const allChallenges = [...customChallenges, ...globalChallenges]
    .map(challenge => ({
      ...challenge,
      enrolled: enrolledIds.includes(challenge.id)
    }));
  
  setChallenges(allChallenges);
  setFilteredChallenges(allChallenges);
  setIsLoading(false);
}; 