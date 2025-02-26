/**
 * Enrolls a user in a challenge
 * @param {Object} challenge - The challenge to enroll in
 */
export const enrollInChallenge = (challenge) => {
  // Get current enrolled challenges from localStorage
  const enrolledChallenges = JSON.parse(localStorage.getItem('enrolledChallenges') || '[]');
  
  // Check if already enrolled
  const isAlreadyEnrolled = enrolledChallenges.some(c => c.challengeId === challenge.id);
  
  if (!isAlreadyEnrolled) {
    // Create enrollment object
    const enrollment = {
      challengeId: challenge.id,
      title: challenge.title,
      color: challenge.color,
      currentDay: 1,
      totalDays: challenge.tasks.length,
      completedTasks: [],
      enrolledDate: new Date().toISOString(),
    };
    
    // Add to enrolled challenges
    enrolledChallenges.push(enrollment);
    
    // Save to localStorage
    localStorage.setItem('enrolledChallenges', JSON.stringify(enrolledChallenges));
  }
};

/**
 * Updates a user's progress in a challenge
 * @param {string} challengeId - The ID of the challenge
 * @param {Array} completedTasks - Array of completed task IDs
 * @param {number} currentDay - The current day of the challenge
 */
export const updateChallengeProgress = (challengeId, completedTasks, currentDay) => {
  // Get current enrolled challenges from localStorage
  const enrolledChallenges = JSON.parse(localStorage.getItem('enrolledChallenges') || '[]');
  
  // Find the challenge to update
  const updatedChallenges = enrolledChallenges.map(challenge => {
    if (challenge.challengeId === challengeId) {
      return {
        ...challenge,
        completedTasks,
        currentDay,
        lastUpdated: new Date().toISOString()
      };
    }
    return challenge;
  });
  
  // Save to localStorage
  localStorage.setItem('enrolledChallenges', JSON.stringify(updatedChallenges));
};

/**
 * Unenrolls a user from a challenge
 * @param {string} challengeId - The ID of the challenge to unenroll from
 */
export const unenrollFromChallenge = (challengeId) => {
  // Get current enrolled challenges from localStorage
  const enrolledChallenges = JSON.parse(localStorage.getItem('enrolledChallenges') || '[]');
  
  // Filter out the challenge to unenroll from
  const updatedChallenges = enrolledChallenges.filter(
    challenge => challenge.challengeId !== challengeId
  );
  
  // Save to localStorage
  localStorage.setItem('enrolledChallenges', JSON.stringify(updatedChallenges));
};

/**
 * Gets all challenges a user is enrolled in
 * @returns {Array} Array of enrolled challenges
 */
export const getEnrolledChallenges = () => {
  return JSON.parse(localStorage.getItem('enrolledChallenges') || '[]');
};

/**
 * Checks if a user is enrolled in a specific challenge
 * @param {string} challengeId - The ID of the challenge to check
 * @returns {boolean} Whether the user is enrolled in the challenge
 */
export const isEnrolledInChallenge = (challengeId) => {
  const enrolledChallenges = getEnrolledChallenges();
  return enrolledChallenges.some(challenge => challenge.challengeId === challengeId);
}; 