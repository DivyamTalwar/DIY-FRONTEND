export const demoRepairs = [
  {
    id: "SERIAL-12345",
    title: "Leaky Faucet Fix",
    difficulty: 2,
    xpReward: 150,
    estimatedTime: "30 mins",
    tools: ["Wrench", "Plumber's tape", "Bucket"],
    steps: [
      { id: 1, title: "Turn off water supply", completed: false, videoUrl: "/videos/step1.mp4" },
      { id: 2, title: "Remove faucet handle", completed: false, videoUrl: "/videos/step2.mp4" },
      { id: 3, title: "Replace O-ring", completed: false, videoUrl: "/videos/step3.mp4" },
      { id: 4, title: "Apply plumber's tape", completed: false, videoUrl: "/videos/step4.mp4" },
      { id: 5, title: "Reassemble faucet", completed: false, videoUrl: "/videos/step5.mp4" },
      { id: 6, title: "Test for leaks", completed: false, videoUrl: "/videos/step6.mp4" }
    ],
    successRate: "89%",
    category: "Plumbing",
    urgent: false
  },
  {
    id: "SERIAL-67890",
    title: "Toilet Running Constantly",
    difficulty: 3,
    xpReward: 250,
    estimatedTime: "45 mins",
    tools: ["Screwdriver", "New flapper", "Gloves"],
    steps: [
      { id: 1, title: "Turn off water valve", completed: false },
      { id: 2, title: "Remove tank lid", completed: false },
      { id: 3, title: "Inspect flapper chain", completed: false },
      { id: 4, title: "Check float adjustment", completed: false },
      { id: 5, title: "Replace flapper if needed", completed: false },
      { id: 6, title: "Adjust water level", completed: false },
      { id: 7, title: "Test flush mechanism", completed: false },
      { id: 8, title: "Check for proper seal", completed: false }
    ],
    successRate: "76%",
    category: "Plumbing",
    urgent: true
  },
  {
    id: "SERIAL-11111",
    title: "Squeaky Door Hinge",
    difficulty: 1,
    xpReward: 50,
    estimatedTime: "10 mins",
    tools: ["WD-40", "Cloth", "Screwdriver"],
    steps: [
      { id: 1, title: "Open door fully", completed: false },
      { id: 2, title: "Apply lubricant to hinges", completed: false },
      { id: 3, title: "Work door back and forth", completed: false },
      { id: 4, title: "Wipe excess lubricant", completed: false }
    ],
    successRate: "95%",
    category: "General",
    urgent: false
  },
  {
    id: "SERIAL-22222",
    title: "Clogged Sink Drain",
    difficulty: 2,
    xpReward: 175,
    estimatedTime: "25 mins",
    tools: ["Plunger", "Drain snake", "Bucket", "Gloves"],
    steps: [
      { id: 1, title: "Remove standing water", completed: false },
      { id: 2, title: "Try plunger first", completed: false },
      { id: 3, title: "Use drain snake if needed", completed: false },
      { id: 4, title: "Flush with hot water", completed: false },
      { id: 5, title: "Test drainage", completed: false }
    ],
    successRate: "82%",
    category: "Plumbing",
    urgent: false
  },
  {
    id: "SERIAL-33333",
    title: "Light Switch Not Working",
    difficulty: 4,
    xpReward: 350,
    estimatedTime: "60 mins",
    tools: ["Voltage tester", "Screwdriver", "New switch", "Wire nuts"],
    steps: [
      { id: 1, title: "Turn off circuit breaker", completed: false },
      { id: 2, title: "Test with voltage tester", completed: false },
      { id: 3, title: "Remove switch plate", completed: false },
      { id: 4, title: "Disconnect old switch", completed: false },
      { id: 5, title: "Connect new switch", completed: false },
      { id: 6, title: "Test before closing", completed: false },
      { id: 7, title: "Replace cover plate", completed: false }
    ],
    successRate: "71%",
    category: "Electrical",
    urgent: true
  }
];

export const userProgress = {
  level: 3,
  title: "Repair Rookie",
  xp: 1250,
  nextLevelXp: 2000,
  streak: 7,
  badges: [
    { id: 1, name: "First Fix", icon: "🎯", description: "Complete your first repair" },
    { id: 2, name: "Weekend Warrior", icon: "⚔️", description: "Complete 5 repairs in a weekend" },
    { id: 3, name: "Speed Demon", icon: "⚡", description: "Complete repair under estimated time" }
  ],
  savedMoney: 450,
  completedRepairs: 8,
  livesRemaining: 3,
  successRate: 87.5
};

export const technicians = [
  {
    id: 1,
    name: "Mike Patterson",
    specialty: "Plumber",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 75,
    availability: ["Tomorrow 2PM", "Tomorrow 4PM", "Thursday 10AM"],
    profilePic: "👨‍🔧",
    certifications: ["Licensed Plumber", "EPA Certified"],
    yearsExperience: 12
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialty: "Electrician",
    rating: 4.8,
    reviews: 98,
    hourlyRate: 85,
    availability: ["Today 5PM", "Tomorrow 9AM", "Wednesday 2PM"],
    profilePic: "👩‍🔧",
    certifications: ["Master Electrician", "OSHA Certified"],
    yearsExperience: 15
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    specialty: "General Handyman",
    rating: 4.7,
    reviews: 203,
    hourlyRate: 60,
    availability: ["Today 3PM", "Tomorrow 11AM", "Anytime weekends"],
    profilePic: "👨‍🔧",
    certifications: ["Certified Handyman", "Insured"],
    yearsExperience: 8
  },
  {
    id: 4,
    name: "Lisa Chen",
    specialty: "HVAC Specialist",
    rating: 5.0,
    reviews: 76,
    hourlyRate: 95,
    availability: ["Wednesday 9AM", "Thursday 2PM", "Friday 10AM"],
    profilePic: "👩‍🔧",
    certifications: ["HVAC Certified", "Refrigeration License"],
    yearsExperience: 10
  }
];

export const leaderboard = [
  { rank: 1, name: "John Smith", level: 8, xp: 5250, repairs: 42, avatar: "🦸‍♂️" },
  { rank: 2, name: "Emily Davis", level: 7, xp: 4800, repairs: 38, avatar: "🦸‍♀️" },
  { rank: 3, name: "You", level: 3, xp: 1250, repairs: 8, avatar: "🦾", isCurrentUser: true },
  { rank: 4, name: "Michael Brown", level: 3, xp: 1100, repairs: 7, avatar: "🦸‍♂️" },
  { rank: 5, name: "Jessica Wilson", level: 2, xp: 850, repairs: 5, avatar: "🦸‍♀️" }
];

export const achievements = [
  {
    id: 1,
    name: "First Fix",
    description: "Complete your first repair",
    icon: "🎯",
    unlocked: true,
    xpReward: 50
  },
  {
    id: 2,
    name: "Weekend Warrior",
    description: "Complete 5 repairs in a weekend",
    icon: "⚔️",
    unlocked: true,
    xpReward: 200
  },
  {
    id: 3,
    name: "Speed Demon",
    description: "Complete repair under estimated time",
    icon: "⚡",
    unlocked: true,
    xpReward: 100
  },
  {
    id: 4,
    name: "Tool Master",
    description: "Use 10+ different tools",
    icon: "🔧",
    unlocked: false,
    xpReward: 150,
    progress: "7/10"
  },
  {
    id: 5,
    name: "Money Saver",
    description: "Save $1000+ in repair costs",
    icon: "💰",
    unlocked: false,
    xpReward: 500,
    progress: "$450/$1000"
  },
  {
    id: 6,
    name: "Perfect Score",
    description: "Complete 10 repairs without calling technician",
    icon: "🏆",
    unlocked: false,
    xpReward: 1000,
    progress: "8/10"
  }
];

export const propertyManagerData = {
  properties: [
    {
      id: 1,
      name: "Sunset Apartments",
      units: 24,
      activeRepairs: 3,
      tenantSatisfaction: 4.2
    },
    {
      id: 2,
      name: "Oak Tree Complex",
      units: 36,
      activeRepairs: 5,
      tenantSatisfaction: 4.5
    },
    {
      id: 3,
      name: "River View Condos",
      units: 18,
      activeRepairs: 2,
      tenantSatisfaction: 4.8
    }
  ],
  totalSaved: 12500,
  avgResolutionTime: "2.3 days",
  diySuccessRate: 78,
  monthlyData: [
    { month: "Jan", diy: 45, professional: 12, saved: 2100 },
    { month: "Feb", diy: 52, professional: 8, saved: 2800 },
    { month: "Mar", diy: 38, professional: 15, saved: 1900 },
    { month: "Apr", diy: 61, professional: 10, saved: 3200 },
    { month: "May", diy: 55, professional: 11, saved: 2900 },
    { month: "Jun", diy: 48, professional: 9, saved: 2600 }
  ]
};