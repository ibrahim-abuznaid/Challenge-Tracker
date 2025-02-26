import { challenges } from '../data/challenges';

// Function to add the 7-Day Reading Challenge to the application
export function add7DayReadingChallenge() {
  // Check if challenge already exists
  const challengeExists = challenges.some(challenge => challenge.id === "7-day-reading-habit");
  
  if (challengeExists) {
    console.log("7-Day Reading Challenge already exists in the challenges library");
    return;
  }
  
  // Create the 7-Day Reading Challenge
  const readingChallenge = {
    id: "7-day-reading-habit",
    title: "7-Day Reading Habit Builder",
    description: "Develop a consistent reading habit with structured daily reading tasks to enhance knowledge, focus, and comprehension.",
    duration: 7,
    category: "learning",
    color: "#9C27B0", // Purple theme
    benefits: [
      "Build a sustainable daily reading habit",
      "Improve concentration and focus",
      "Enhance vocabulary and language skills",
      "Boost knowledge acquisition and retention",
      "Reduce stress and improve mental well-being"
    ],
    tasks: [
      {
        title: "Day 1: Reading Assessment & Goal Setting",
        description: "Assess your current reading habits and set achievable goals for the week.",
        activities: [
          {
            id: "reading-1-1",
            title: "Current Reading Assessment",
            description: "Take 10 minutes to reflect on your current reading habits. How often do you read? What types of material do you enjoy? What prevents you from reading more?",
            resourceUrl: "https://www.lifehack.org/articles/lifestyle/10-benefits-reading-why-you-should-read-everyday.html"
          },
          {
            id: "reading-1-2",
            title: "Set Your Reading Goal",
            description: "Choose a book you'd like to read this week. It can be fiction or non-fiction, but select something you're genuinely interested in.",
            resourceUrl: ""
          },
          {
            id: "reading-1-3",
            title: "15-Minute Reading Session",
            description: "Read your chosen book for at least 15 minutes. Note how many pages you can comfortably read in this time.",
            resourceUrl: ""
          }
        ]
      },
      // Day 2-7 tasks as in the data file above
      // ...
    ]
  };
  
  // Add challenge to the challenges array
  challenges.push(readingChallenge);
  
  console.log("7-Day Reading Challenge added successfully to the challenges library");
  return readingChallenge;
} 