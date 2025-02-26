import { challenges } from '../data/challenges';

// Function to add the 75 Hard Challenge to the application
export function add75HardChallenge() {
  // Check if challenge already exists
  const challengeExists = challenges.some(challenge => challenge.id === "75-hard-challenge");
  
  if (challengeExists) {
    console.log("75 Hard Challenge already exists in the challenges library");
    return;
  }
  
  // Create the 75 Hard Challenge
  const hardChallenge = {
    id: "75-hard-challenge",
    title: "75 Hard Challenge",
    description: "A mental toughness program designed to build discipline, determination, and grit through daily non-negotiable tasks for 75 days straight.",
    category: "Mental Toughness",
    difficulty: "advanced",
    totalDays: 75,
    color: "#FF4757",
    benefits: [
      "Improved mental toughness",
      "Increased discipline",
      "Weight loss and physical transformation",
      "Greater self-confidence",
      "Enhanced resilience"
    ],
    tasks: [
      {
        title: "Daily Tasks",
        description: "Complete ALL of these tasks EVERY day for 75 days straight. If you miss ANY part of ANY task, you must start over from Day 1.",
        activities: [
          {
            id: "75-hard-challenge-1-1",
            title: "Two 45-minute workouts",
            description: "Complete two 45-minute workouts each day, with one of them being outdoors regardless of weather. The workouts must be separated by at least 3 hours.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-1-2",
            title: "Follow a diet",
            description: "Follow a diet of your choice with zero cheat meals or alcohol. Your diet should be focused on improving your physical health.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-1-3",
            title: "Drink 1 gallon of water",
            description: "Drink 1 gallon (3.8 liters) of water each day.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-1-4",
            title: "Read 10 pages",
            description: "Read 10 pages of a non-fiction, educational book. Audiobooks don't count.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-1-5",
            title: "Take a progress photo",
            description: "Take a progress photo each day to document your journey.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          }
        ]
      },
      {
        title: "Rules and Guidelines",
        description: "Understanding the framework of the challenge is critical for success.",
        activities: [
          {
            id: "75-hard-challenge-2-1",
            title: "No modifications",
            description: "The program cannot be modified. All tasks must be completed exactly as prescribed.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-2-2",
            title: "Start over if you fail",
            description: "If you miss any part of any task on any day, you must start over from Day 1.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-2-3",
            title: "Plan ahead",
            description: "Planning your day is essential. Schedule your workouts, meals, and reading time in advance.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          }
        ]
      },
      {
        title: "Tips for Success",
        description: "Strategies to help you complete the full 75 days.",
        activities: [
          {
            id: "75-hard-challenge-3-1",
            title: "Create a schedule",
            description: "Plan your entire day the night before, scheduling both workouts and when you'll complete other tasks.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-3-2",
            title: "Prepare your meals",
            description: "Meal prep in advance to avoid making poor food choices when hungry.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-3-3",
            title: "Carry a water bottle",
            description: "Keep a water bottle with you at all times and track your water intake throughout the day.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          },
          {
            id: "75-hard-challenge-3-4",
            title: "Join a community",
            description: "Connect with others doing the challenge for accountability and motivation.",
            resourceUrl: "https://www.crossrope.com/blogs/blog/75-hard-challenge/"
          }
        ]
      }
    ]
  };
  
  // Add challenge to the challenges array
  challenges.push(hardChallenge);
  
  console.log("75 Hard Challenge added successfully to the challenges library");
  return hardChallenge;
} 