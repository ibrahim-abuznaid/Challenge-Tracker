import { v4 as uuidv4 } from 'uuid';

const defaultChallenges = [
  {
    id: uuidv4(),
    title: "30-Day Music Mastery Challenge",
    description: "Learn the fundamentals of music, including theory, playing an instrument, and ear training, with daily structured tasks.",
    category: "Music Learning",
    difficulty: "medium",
    duration: "30",
    color: "#6C5CE7",
    isDefault: true,
    tasks: [
      "Music Theory: Study a new concept (e.g., scales, chords, rhythm)",
      "Instrument Practice: Play an instrument for at least 30 minutes",
      "Ear Training: Identify musical notes, intervals, or chords through exercises",
      "Listening Challenge: Listen to a song and analyze its structure"
    ]
  },
  {
    id: uuidv4(),
    title: "30-Day Guitar Mastery Challenge",
    description: "Build strong foundational skills in guitar playing through daily structured practice.",
    category: "Music Learning",
    difficulty: "medium",
    duration: "30",
    color: "#00B894",
    isDefault: true,
    tasks: [
      "Warm-Up: 10 minutes of finger exercises",
      "Chords & Scales: Practice new chords and scales daily",
      "Song Practice: Learn a small section of a song",
      "Strumming/Picking Techniques: Focus on improving rhythm and technique",
      "Music Theory: Learn about chord progressions and song structures"
    ]
  },
  {
    id: uuidv4(),
    title: "90-Day Language Immersion Challenge",
    description: "Achieve conversational fluency in a new language through daily immersive activities.",
    category: "Language Learning",
    difficulty: "hard",
    duration: "90",
    color: "#FF7675",
    isDefault: true,
    tasks: [
      "Vocabulary Building: Learn 10 new words",
      "Speaking Practice: Have a 10-minute conversation or record yourself speaking",
      "Listening Exercise: Listen to a podcast or watch a short video in the target language",
      "Grammar Study: Learn a new grammar rule and apply it in writing",
      "Reading Practice: Read an article, short story, or book passage"
    ]
  },
  {
    id: uuidv4(),
    title: "30-Day Skill Development Challenge",
    description: "Learn and master a new skill like coding, graphic design, or video editing.",
    category: "Personal Development",
    difficulty: "medium",
    duration: "30",
    color: "#74B9FF",
    isDefault: true,
    tasks: [
      "Learning Module: Complete a tutorial or lesson on the skill",
      "Hands-On Practice: Apply what you learned by building or creating something",
      "Review & Reflect: Write down what you learned and identify areas to improve",
      "Community Engagement: Participate in a forum or ask for feedback",
      "Project Progress: Work on a long-term project using the new skill"
    ]
  },
  {
    id: uuidv4(),
    title: "30-Day Self-Improvement Challenge",
    description: "A challenge to enhance productivity, mental clarity, and self-discipline.",
    category: "Personal Development",
    difficulty: "medium",
    duration: "30",
    color: "#A8E6CF",
    isDefault: true,
    tasks: [
      "Morning Routine: Wake up early and plan your day",
      "Reading: Read 10 pages of a non-fiction book",
      "Exercise: Engage in a physical activity for at least 30 minutes",
      "Meditation or Journaling: Practice mindfulness or write about your thoughts",
      "Skill Learning: Spend 30 minutes developing a new skill or hobby"
    ]
  },
  {
    id: uuidv4(),
    title: "30-Day Creativity Boost Challenge",
    description: "Enhance creative thinking and artistic skills through structured daily exercises.",
    category: "Creativity & Art",
    difficulty: "easy",
    duration: "30",
    color: "#FFB8B8",
    isDefault: true,
    tasks: [
      "Drawing or Writing Exercise: Sketch, write a short story, or design something",
      "Brainstorming Session: Generate 10 new ideas on a topic",
      "Inspiration Time: Explore creative works (books, music, art)",
      "Collaboration or Feedback: Share your work and get feedback",
      "Creative Challenge: Experiment with a new style, tool, or technique"
    ]
  }
];

export const addDefaultChallenges = () => {
  const existingChallenges = JSON.parse(localStorage.getItem('defaultChallenges') || '[]');
  
  if (existingChallenges.length === 0) {
    // Format challenges with proper task structure
    const formattedChallenges = defaultChallenges.map(challenge => {
      // Convert duration to number
      const totalDays = parseInt(challenge.duration, 10);
      
      // Create tasks object with day structure
      const formattedTasks = {};
      for (let day = 1; day <= totalDays; day++) {
        formattedTasks[day] = challenge.tasks.map(taskText => ({
          id: uuidv4(),
          text: taskText,
          completed: false
        }));
      }
      
      return {
        ...challenge,
        totalDays,
        tasks: formattedTasks
      };
    });
    
    localStorage.setItem('defaultChallenges', JSON.stringify(formattedChallenges));
    console.log('Default challenges added:', formattedChallenges);
  }
}; 