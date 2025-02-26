// Sample challenge data
export const challenges = [
  {
    id: 'coding-basics',
    title: 'Coding Basics: JavaScript Fundamentals',
    description: 'Learn the fundamentals of JavaScript programming through daily coding exercises and mini-projects.',
    duration: 7,
    category: 'coding',
    color: '#4285f4',
    benefits: [
      'Understand JavaScript syntax and basic concepts',
      'Learn to solve problems with code',
      'Build simple interactive web elements',
      'Gain confidence in your programming abilities'
    ],
    tasks: [
      {
        title: 'Variables and Data Types',
        description: 'Learn about JavaScript variables, primitive data types, and how to use them in your code.',
        activities: [
          {
            id: 'coding-basics-1-1',
            title: 'Read: Introduction to JavaScript Variables',
            description: 'Learn about var, let, and const keywords and when to use each one.',
            resourceUrl: 'https://javascript.info/variables'
          },
          {
            id: 'coding-basics-1-2',
            title: 'Practice: Create and Use Variables',
            description: 'Complete the exercise by creating variables of different types and performing operations with them.'
          },
          {
            id: 'coding-basics-1-3',
            title: 'Code Challenge: Temperature Converter',
            description: 'Write a simple program that converts temperatures between Celsius and Fahrenheit.'
          }
        ]
      },
      {
        title: 'Functions and Control Flow',
        description: 'Learn how to create reusable code with functions and control program flow with conditionals.',
        activities: [
          {
            id: 'coding-basics-2-1',
            title: 'Read: JavaScript Functions',
            description: 'Learn about function declarations, expressions, and arrow functions.',
            resourceUrl: 'https://javascript.info/function-basics'
          },
          {
            id: 'coding-basics-2-2',
            title: 'Practice: Create Your Own Functions',
            description: 'Write functions that accept parameters and return values.'
          },
          {
            id: 'coding-basics-2-3',
            title: 'Code Challenge: Grade Calculator',
            description: 'Create a function that calculates a letter grade based on a numerical score.'
          }
        ]
      },
      {
        title: 'Arrays and Loops',
        description: 'Learn how to work with collections of data using arrays and process them with loops.',
        activities: [
          {
            id: 'coding-basics-3-1',
            title: 'Read: JavaScript Arrays',
            description: 'Learn about array creation, accessing elements, and common array methods.',
            resourceUrl: 'https://javascript.info/array'
          },
          {
            id: 'coding-basics-3-2',
            title: 'Practice: Array Manipulation',
            description: 'Complete exercises on adding, removing, and modifying array elements.'
          },
          {
            id: 'coding-basics-3-3',
            title: 'Code Challenge: Shopping List App',
            description: 'Create a simple shopping list that allows adding and removing items.'
          }
        ]
      },
      {
        title: 'Objects and Properties',
        description: 'Learn about JavaScript objects, properties, and methods for organizing complex data.',
        activities: [
          {
            id: 'coding-basics-4-1',
            title: 'Read: JavaScript Objects',
            description: 'Learn about object creation, properties, and methods.',
            resourceUrl: 'https://javascript.info/object'
          },
          {
            id: 'coding-basics-4-2',
            title: 'Practice: Creating and Using Objects',
            description: 'Complete exercises on creating objects and accessing their properties.'
          },
          {
            id: 'coding-basics-4-3',
            title: 'Code Challenge: Contact Book',
            description: 'Create a simple contact book that stores and displays contact information.'
          }
        ]
      },
      {
        title: 'DOM Manipulation',
        description: 'Learn how to interact with HTML elements using JavaScript and the Document Object Model.',
        activities: [
          {
            id: 'coding-basics-5-1',
            title: 'Read: Introduction to the DOM',
            description: 'Learn about the Document Object Model and how JavaScript interacts with HTML.',
            resourceUrl: 'https://javascript.info/document'
          },
          {
            id: 'coding-basics-5-2',
            title: 'Practice: Selecting and Modifying Elements',
            description: 'Complete exercises on selecting HTML elements and changing their content and styles.'
          },
          {
            id: 'coding-basics-5-3',
            title: 'Code Challenge: Interactive To-Do List',
            description: 'Create a simple to-do list that allows adding tasks and marking them as complete.'
          }
        ]
      },
      {
        title: 'Events and Listeners',
        description: 'Learn how to make your web pages interactive by responding to user actions.',
        activities: [
          {
            id: 'coding-basics-6-1',
            title: 'Read: JavaScript Events',
            description: 'Learn about different types of events and how to handle them.',
            resourceUrl: 'https://javascript.info/events'
          },
          {
            id: 'coding-basics-6-2',
            title: 'Practice: Adding Event Listeners',
            description: 'Complete exercises on adding event listeners to elements and handling user interactions.'
          },
          {
            id: 'coding-basics-6-3',
            title: 'Code Challenge: Interactive Image Gallery',
            description: 'Create a simple image gallery with navigation buttons.'
          }
        ]
      },
      {
        title: 'Final Project: Interactive Quiz App',
        description: 'Apply everything you\'ve learned to build a complete interactive quiz application.',
        activities: [
          {
            id: 'coding-basics-7-1',
            title: 'Plan Your Quiz App',
            description: 'Design the structure and features of your quiz application.'
          },
          {
            id: 'coding-basics-7-2',
            title: 'Build the Quiz Interface',
            description: 'Create the HTML and CSS for your quiz application.'
          },
          {
            id: 'coding-basics-7-3',
            title: 'Implement Quiz Functionality',
            description: 'Add JavaScript to make your quiz interactive, track scores, and display results.'
          }
        ]
      }
    ]
  },
  {
    id: 'meditation-mindfulness',
    title: '7-Day Mindfulness Meditation',
    description: 'Develop a daily meditation practice with guided sessions designed for beginners.',
    duration: 7,
    category: 'wellness',
    color: '#0f9d58',
    benefits: [
      'Reduce stress and anxiety',
      'Improve focus and concentration',
      'Develop greater self-awareness',
      'Build a sustainable meditation habit'
    ],
    tasks: [
      {
        title: 'Introduction to Mindfulness',
        description: 'Learn the basics of mindfulness meditation and set your intentions for the week.',
        activities: [
          {
            id: 'meditation-1-1',
            title: 'Read: What is Mindfulness?',
            description: 'Learn about the principles and benefits of mindfulness meditation.',
            resourceUrl: 'https://www.mindful.org/what-is-mindfulness/'
          },
          {
            id: 'meditation-1-2',
            title: 'Practice: 5-Minute Breathing Meditation',
            description: 'Complete a simple guided meditation focusing on your breath.'
          },
          {
            id: 'meditation-1-3',
            title: 'Reflection: Set Your Intentions',
            description: 'Write down why you want to develop a meditation practice and what you hope to gain.'
          }
        ]
      },
      {
        title: 'Body Scan Meditation',
        description: 'Learn to bring awareness to different parts of your body to release tension.',
        activities: [
          {
            id: 'meditation-2-1',
            title: 'Read: The Body Scan Practice',
            description: 'Learn about the body scan technique and its benefits.',
            resourceUrl: 'https://www.mindful.org/the-body-scan-practice/'
          },
          {
            id: 'meditation-2-2',
            title: 'Practice: 10-Minute Body Scan',
            description: 'Complete a guided body scan meditation.'
          },
          {
            id: 'meditation-2-3',
            title: 'Reflection: Notice Physical Sensations',
            description: 'Throughout the day, take moments to notice physical sensations in your body.'
          }
        ]
      },
      {
        title: 'Mindful Breathing',
        description: 'Deepen your practice by focusing on the breath as an anchor for your attention.',
        activities: [
          {
            id: 'meditation-3-1',
            title: 'Read: The Science of Breathing',
            description: 'Learn how breathing affects your nervous system and mental state.',
            resourceUrl: 'https://www.mindful.org/the-science-of-breathing/'
          },
          {
            id: 'meditation-3-2',
            title: 'Practice: 15-Minute Breathing Meditation',
            description: 'Complete a guided meditation focusing on different aspects of the breath.'
          },
          {
            id: 'meditation-3-3',
            title: 'Mindful Moment: Breath Awareness',
            description: 'Set reminders to take three mindful breaths at different points throughout your day.'
          }
        ]
      },
      {
        title: 'Loving-Kindness Meditation',
        description: 'Cultivate feelings of compassion and goodwill toward yourself and others.',
        activities: [
          {
            id: 'meditation-4-1',
            title: 'Read: Loving-Kindness Practice',
            description: 'Learn about loving-kindness meditation and its effects on wellbeing.',
            resourceUrl: 'https://www.mindful.org/loving-kindness-practice/'
          },
          {
            id: 'meditation-4-2',
            title: 'Practice: 15-Minute Loving-Kindness Meditation',
            description: 'Complete a guided meditation to develop feelings of compassion.'
          },
          {
            id: 'meditation-4-3',
            title: 'Reflection: Acts of Kindness',
            description: 'Perform a small act of kindness for someone else and notice how it feels.'
          }
        ]
      },
      {
        title: 'Mindfulness of Thoughts',
        description: 'Learn to observe your thoughts without getting caught up in them.',
        activities: [
          {
            id: 'meditation-5-1',
            title: 'Read: Working with Thoughts',
            description: 'Learn techniques for observing thoughts without judgment.',
            resourceUrl: 'https://www.mindful.org/working-with-thoughts/'
          },
          {
            id: 'meditation-5-2',
            title: 'Practice: Clouds in the Sky Meditation',
            description: 'Complete a guided meditation visualizing thoughts as clouds passing by.'
          },
          {
            id: 'meditation-5-3',
            title: 'Mindful Moment: Thought Labeling',
            description: 'Practice labeling thoughts as they arise throughout the day (e.g., "planning," "worrying").'
          }
        ]
      },
      {
        title: 'Mindful Walking',
        description: 'Extend your mindfulness practice to movement with walking meditation.',
        activities: [
          {
            id: 'meditation-6-1',
            title: 'Read: Walking Meditation Guide',
            description: 'Learn how to practice mindfulness while walking.',
            resourceUrl: 'https://www.mindful.org/walking-meditation/'
          },
          {
            id: 'meditation-6-2',
            title: 'Practice: 15-Minute Walking Meditation',
            description: 'Complete a guided walking meditation outdoors or in your home.'
          },
          {
            id: 'meditation-6-3',
            title: 'Mindful Moment: Everyday Walking',
            description: 'Bring mindfulness to a routine walk, such as to your car or around your office.'
          }
        ]
      },
      {
        title: 'Creating a Sustainable Practice',
        description: 'Reflect on your week and develop a plan to continue your meditation practice.',
        activities: [
          {
            id: 'meditation-7-1',
            title: 'Read: Maintaining a Meditation Practice',
            description: 'Learn strategies for making meditation a regular part of your life.',
            resourceUrl: 'https://www.mindful.org/maintaining-a-meditation-practice/'
          },
          {
            id: 'meditation-7-2',
            title: 'Practice: Open Awareness Meditation',
            description: 'Complete a guided meditation that incorporates elements from the entire week.'
          },
          {
            id: 'meditation-7-3',
            title: 'Reflection: Your Meditation Plan',
            description: 'Create a realistic plan for continuing your meditation practice after the challenge.'
          }
        ]
      }
    ]
  },
  {
    id: 'home-declutter',
    title: '10-Day Home Decluttering Challenge',
    description: 'Transform your living space with daily decluttering tasks that will help you create a more organized and peaceful home.',
    duration: 10,
    category: 'lifestyle',
    color: '#ea4335',
    benefits: [
      'Reduce stress by creating an organized environment',
      'Save time by making items easier to find',
      'Create more space in your home',
      'Develop sustainable organization habits'
    ],
    tasks: [
      {
        title: 'Kitchen Counters & Table',
        description: 'Clear and organize your kitchen countertops and dining table to create a clean cooking and eating space.',
        activities: [
          {
            id: 'declutter-1-1',
            title: 'Clear Kitchen Counters',
            description: 'Remove everything from your countertops, wipe them down, and only put back items you use daily.'
          },
          {
            id: 'declutter-1-2',
            title: 'Organize Dining Table',
            description: 'Clear off your dining table completely and create a simple centerpiece that is easy to move for meals.'
          },
          {
            id: 'declutter-1-3',
            title: 'Create a "Catch-All" Solution',
            description: 'Designate a specific spot for mail, keys, and other items that tend to accumulate on counters.'
          }
        ]
      },
      {
        title: 'Refrigerator & Pantry',
        description: 'Organize your food storage areas to reduce waste and make meal preparation easier.',
        activities: [
          {
            id: 'declutter-2-1',
            title: 'Clean Out Refrigerator',
            description: 'Remove expired items, wipe down shelves, and organize remaining food by category.'
          },
          {
            id: 'declutter-2-2',
            title: 'Organize Pantry Staples',
            description: 'Check expiration dates, consolidate packages, and arrange items by type or frequency of use.'
          },
          {
            id: 'declutter-2-3',
            title: 'Create a Meal Planning Station',
            description: 'Set up a space for meal planning with a notepad, calendar, or whiteboard near your food storage.'
          }
        ]
      },
      {
        title: 'Bathroom Cabinets & Counters',
        description: 'Declutter your bathroom to create a calming space for your daily routines.',
        activities: [
          {
            id: 'declutter-3-1',
            title: 'Sort Bathroom Products',
            description: 'Discard expired medications and cosmetics, and organize remaining items by category.'
          },
          {
            id: 'declutter-3-2',
            title: 'Clear Bathroom Counters',
            description: 'Remove everything from countertops, clean thoroughly, and only return daily essentials.'
          },
          {
            id: 'declutter-3-3',
            title: 'Organize Shower & Bath Area',
            description: 'Reduce shower products to those you actually use and create a storage solution for them.'
          }
        ]
      },
      {
        title: 'Bedroom Nightstands & Dressers',
        description: 'Create a peaceful bedroom environment by decluttering surfaces and organizing essentials.',
        activities: [
          {
            id: 'declutter-4-1',
            title: 'Clear Nightstands',
            description: 'Remove everything, dust thoroughly, and only return items you use before bed or upon waking.'
          },
          {
            id: 'declutter-4-2',
            title: 'Organize Dresser Tops',
            description: 'Clear off dresser surfaces and create intentional displays with only a few meaningful items.'
          },
          {
            id: 'declutter-4-3',
            title: 'Declutter One Dresser Drawer',
            description: 'Empty one drawer completely, clean it out, and refold items neatly before returning them.'
          }
        ]
      },
      {
        title: 'Closet Refresh',
        description: 'Streamline your wardrobe to make getting dressed easier and more enjoyable.',
        activities: [
          {
            id: 'declutter-5-1',
            title: 'Sort Clothing by Category',
            description: 'Group similar items together (shirts, pants, etc.) to see how many you actually have.'
          },
          {
            id: 'declutter-5-2',
            title: 'Remove Unworn Items',
            description: 'Create a donation pile for clothes you haven't worn in the past year or that don't fit anymore.'
          },
          {
            id: 'declutter-5-3',
            title: 'Organize Remaining Clothes',
            description: 'Arrange clothes by category and color, and ensure everything has a proper place.'
          }
        ]
      },
      {
        title: 'Living Room Reset',
        description: 'Transform your main living space into an organized area for relaxation and entertainment.',
        activities: [
          {
            id: 'declutter-6-1',
            title: 'Clear Coffee Table & Side Tables',
            description: 'Remove everything, dust thoroughly, and only return a few decorative or functional items.'
          },
          {
            id: 'declutter-6-2',
            title: 'Organize Entertainment Center',
            description: 'Sort through media, games, and electronics, discarding or donating unused items.'
          },
          {
            id: 'declutter-6-3',
            title: 'Create a Reading/Relaxation Nook',
            description: 'Designate a comfortable spot with good lighting and only the current books or magazines you're reading.'
          }
        ]
      },
      {
        title: 'Home Office & Paperwork',
        description: 'Organize your workspace and important documents to increase productivity and reduce stress.',
        activities: [
          {
            id: 'declutter-7-1',
            title: 'Clear Desk Surface',
            description: 'Remove everything from your desk, clean it thoroughly, and only return essential items.'
          },
          {
            id: 'declutter-7-2',
            title: 'Sort Through Paper Piles',
            description: 'Process mail and papers into categories: action required, to file, and to recycle.'
          },
          {
            id: 'declutter-7-3',
            title: 'Create a Simple Filing System',
            description: 'Set up folders or digital storage for important documents and establish a routine for processing new papers.'
          }
        ]
      },
      {
        title: 'Digital Declutter',
        description: 'Organize your digital life to reduce distractions and make finding information easier.',
        activities: [
          {
            id: 'declutter-8-1',
            title: 'Clean Up Email Inbox',
            description: 'Delete or archive old emails, unsubscribe from newsletters you do not read, and create folders for important messages.'
          },
          {
            id: 'declutter-8-2',
            title: 'Organize Computer Files',
            description: 'Create a logical folder structure and move files into appropriate locations.'
          },
          {
            id: 'declutter-8-3',
            title: 'Declutter Phone Apps & Photos',
            description: 'Delete unused apps, organize remaining ones into folders, and back up and sort through photos.'
          }
        ]
      },
      {
        title: 'Storage Areas',
        description: 'Tackle one storage area in your home to reduce clutter and find items more easily.',
        activities: [
          {
            id: 'declutter-9-1',
            title: 'Choose One Storage Area',
            description: 'Select a closet, cabinet, or small section of basement/garage to focus on today.'
          },
          {
            id: 'declutter-9-2',
            title: 'Sort Items by Category',
            description: 'Group similar items together and decide what to keep, donate, or discard.'
          },
          {
            id: 'declutter-9-3',
            title: 'Create Organized Storage Solutions',
            description: 'Use bins, labels, or shelving to create a system that makes items easy to find and access.'
          }
        ]
      },
      {
        title: 'Maintenance Plan',
        description: 'Create a sustainable system to maintain your newly organized spaces.',
        activities: [
          {
            id: 'declutter-10-1',
            title: 'Daily Reset Routine',
            description: 'Establish a 10-minute end-of-day routine to return items to their proper places.'
          },
          {
            id: 'declutter-10-2',
            title: 'Weekly Maintenance Schedule',
            description: 'Create a simple schedule for regular cleaning and organizing tasks.'
          },
          {
            id: 'declutter-10-3',
            title: 'One-In-One-Out Rule',
            description: 'Commit to removing one item whenever you bring a new item into your home.'
          }
        ]
      }
    ]
  },
  {
    id: 'declutter-challenge',
    title: 'Home Declutter Challenge',
    description: 'Transform your living space with a systematic decluttering approach.',
    duration: 10,
    category: 'lifestyle',
    color: '#34a853',
    benefits: [
      'Create a more organized living space',
      'Reduce stress and anxiety',
      'Find items more easily',
      'Develop better organizational habits'
    ],
    tasks: [
      {
        title: 'Home Office & Paperwork',
        description: 'Organize your workspace and important documents to increase productivity and reduce stress.',
        activities: [
          {
            id: 'declutter-7-1',
            title: 'Clear Desk Surface',
            description: 'Remove everything from your desk, clean it thoroughly, and only return essential items.'
          },
          {
            id: 'declutter-7-2',
            title: 'Sort Through Paper Piles',
            description: 'Process mail and papers into categories: action required, to file, and to recycle.'
          },
          {
            id: 'declutter-7-3',
            title: 'Create a Simple Filing System',
            description: 'Set up folders or digital storage for important documents and establish a routine for processing new papers.'
          }
        ]
      }
    ]
  }
]; 