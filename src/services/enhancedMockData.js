// Enhanced Mock Data for Complete Functionality
export const enhancedMockData = {
  // Demo videos for repairs
  demoVideos: {
    leakyFaucet: 'https://www.youtube.com/embed/nbKTiLsq0LI',
    acRepair: 'https://www.youtube.com/embed/5CLFwCUyWqY', 
    doorLock: 'https://www.youtube.com/embed/DYHOcJvQp0c',
    cloggedDrain: 'https://www.youtube.com/embed/Pk2R5fPiE4E',
    electricalOutlet: 'https://www.youtube.com/embed/UwGoU3XVpnI',
    windowRepair: 'https://www.youtube.com/embed/mQZZ0A0MTQU',
    toiletRunning: 'https://www.youtube.com/embed/Gg5K2J5KQBE',
    garbageDisposal: 'https://www.youtube.com/embed/LXZN51YnSLA',
    waterHeater: 'https://www.youtube.com/embed/dq7g3y7z0co',
    hvacFilter: 'https://www.youtube.com/embed/Ll6-eGDpimU',
    generalMaintenance: 'https://www.youtube.com/embed/7ATlDYLy-5s'
  },

  // Live Activity Feed Items
  liveActivityItems: [
    {
      id: 1,
      type: 'repair_complete',
      user: 'Sarah Johnson',
      avatar: '👩',
      action: 'completed fixing a leaky faucet',
      property: 'Sunset Apartments #204',
      time: '2 minutes ago',
      points: 75,
      saved: '$150',
      difficulty: 'Medium',
      details: {
        duration: '45 minutes',
        tools: ['Wrench', 'Plumbers tape', 'Replacement washer'],
        steps: 5,
        helpRequested: false,
        rating: 5,
        photos: ['before.jpg', 'after.jpg'],
        comment: 'Great tutorial! Saved me from calling a plumber.'
      }
    },
    {
      id: 2,
      type: 'achievement_unlocked',
      user: 'Mike Chen',
      avatar: '👨',
      action: 'unlocked "Weekend Warrior" achievement',
      property: 'Green Valley #512',
      time: '5 minutes ago',
      achievement: {
        name: 'Weekend Warrior',
        description: 'Complete 5 repairs during weekends',
        icon: '🏆',
        rarity: 'Rare',
        xpReward: 200
      }
    },
    {
      id: 3,
      type: 'new_record',
      user: 'Emily Davis',
      avatar: '👩‍🦰',
      action: 'set a new speed record for AC filter replacement',
      property: 'Downtown Towers #1807',
      time: '12 minutes ago',
      record: {
        previousTime: '15 minutes',
        newTime: '8 minutes',
        improvement: '53%',
        rank: '#1 in building'
      }
    },
    {
      id: 4,
      type: 'help_offered',
      user: 'Robert Kim',
      avatar: '👨‍🔧',
      action: 'offered to help neighbors with electrical issues',
      property: 'Riverside Complex',
      time: '18 minutes ago',
      helpDetails: {
        expertise: ['Electrical', 'Plumbing', 'HVAC'],
        availability: 'Weekends 10am-4pm',
        helpedCount: 23,
        rating: 4.9
      }
    },
    {
      id: 5,
      type: 'streak_milestone',
      user: 'Lisa Wong',
      avatar: '👩‍💼',
      action: 'reached a 30-day DIY streak',
      property: 'The Heights #302',
      time: '25 minutes ago',
      streak: {
        days: 30,
        totalPoints: 1500,
        totalSaved: '$2,340',
        nextMilestone: '50 days'
      }
    },
    {
      id: 6,
      type: 'tutorial_created',
      user: 'James Martinez',
      avatar: '👨‍🏫',
      action: 'created a video tutorial for garbage disposal repair',
      property: 'Park Place #908',
      time: '32 minutes ago',
      tutorial: {
        views: 145,
        likes: 89,
        difficulty: 'Easy',
        duration: '10 minutes',
        saves: 34
      }
    },
    {
      id: 7,
      type: 'group_repair',
      user: 'Community Team',
      avatar: '👥',
      action: 'organized a building-wide maintenance day',
      property: 'Oakwood Residences',
      time: '45 minutes ago',
      group: {
        participants: 15,
        repairsCompleted: 28,
        totalSaved: '$4,200',
        nextEvent: 'Next Saturday 9am'
      }
    },
    {
      id: 8,
      type: 'first_repair',
      user: 'Alex Thompson',
      avatar: '🆕',
      action: 'completed their first DIY repair',
      property: 'Metro Lofts #405',
      time: '1 hour ago',
      first: {
        repair: 'Unclogged bathroom drain',
        difficulty: 'Easy',
        timeSpent: '20 minutes',
        confidence: '85%',
        nextChallenge: 'Fix running toilet'
      }
    }
  ],

  // Detailed Repair Items
  detailedRepairs: [
    {
      id: 'repair-001',
      title: 'Kitchen Sink Leak',
      status: 'in_progress',
      priority: 'high',
      property: 'Sunset Apartments #204',
      tenant: 'Sarah Johnson',
      reportedDate: '2024-03-14',
      startedDate: '2024-03-15',
      estimatedCompletion: '2024-03-15',
      description: 'Water dripping from under kitchen sink, getting worse',
      category: 'Plumbing',
      difficulty: 'Medium',
      estimatedSavings: '$250',
      currentStep: 3,
      totalSteps: 5,
      steps: [
        { id: 1, name: 'Turn off water supply', completed: true, time: '2 min' },
        { id: 2, name: 'Identify leak source', completed: true, time: '5 min' },
        { id: 3, name: 'Replace worn gasket', completed: false, time: '15 min' },
        { id: 4, name: 'Test for leaks', completed: false, time: '5 min' },
        { id: 5, name: 'Clean up area', completed: false, time: '3 min' }
      ],
      tools: ['Adjustable wrench', 'Bucket', 'New gasket', 'Plumbers tape'],
      photos: ['leak-before.jpg', 'progress.jpg'],
      videoTutorial: 'https://www.youtube.com/embed/nbKTiLsq0LI',
      notes: 'Gasket showing signs of wear, hardware store trip needed',
      helpers: [],
      successRate: '92%'
    },
    {
      id: 'repair-002',
      title: 'AC Unit Not Cooling',
      status: 'pending',
      priority: 'urgent',
      property: 'Green Valley #512',
      tenant: 'Mike Chen',
      reportedDate: '2024-03-14',
      description: 'AC running but not producing cold air, filter recently changed',
      category: 'HVAC',
      difficulty: 'Hard',
      estimatedSavings: '$400',
      diagnostics: {
        filterStatus: 'Clean (replaced last week)',
        thermostatReading: '78°F',
        outsideUnitStatus: 'Running',
        possibleCauses: ['Low refrigerant', 'Frozen coils', 'Compressor issue'],
        recommendedAction: 'Check for ice buildup on coils'
      },
      videoTutorial: 'https://www.youtube.com/embed/5CLFwCUyWqY',
      professionalQuote: '$450-600',
      diyConfidence: '65%'
    },
    {
      id: 'repair-003',
      title: 'Front Door Lock Sticking',
      status: 'completed',
      priority: 'medium',
      property: 'Downtown Towers #1807',
      tenant: 'Emily Davis',
      reportedDate: '2024-03-10',
      completedDate: '2024-03-11',
      description: 'Door lock hard to turn, key gets stuck',
      category: 'Security',
      difficulty: 'Easy',
      savedAmount: '$180',
      completionTime: '25 minutes',
      solution: 'Applied graphite lubricant to lock mechanism',
      rating: 5,
      review: 'Quick fix! The graphite powder worked perfectly.',
      videoTutorial: 'https://www.youtube.com/embed/DYHOcJvQp0c',
      beforeAfter: {
        before: 'Lock requiring excessive force',
        after: 'Smooth operation restored'
      }
    }
  ],

  // Properties Data
  propertiesData: [
    {
      id: 'prop-001',
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, Los Angeles, CA 90028',
      type: 'Multi-family',
      units: 48,
      occupancy: 94,
      yearBuilt: 2015,
      totalSqft: 52000,
      amenities: ['Pool', 'Gym', 'Parking', 'Laundry'],
      monthlyRevenue: 72000,
      monthlyExpenses: 18000,
      netIncome: 54000,
      maintenanceRequests: {
        pending: 5,
        inProgress: 8,
        completed: 127
      },
      diyStats: {
        totalRepairs: 89,
        avgSavings: '$285',
        successRate: '87%',
        avgCompletionTime: '2.3 days'
      },
      tenants: [
        { unit: '101', name: 'John Smith', lease: 'Active', rent: 1500 },
        { unit: '102', name: 'Sarah Johnson', lease: 'Active', rent: 1550 },
        { unit: '103', name: 'Mike Brown', lease: 'Active', rent: 1500 },
        { unit: '104', name: 'Emily White', lease: 'Renewing', rent: 1600 }
      ],
      upcomingMaintenance: [
        { task: 'Pool cleaning', date: '2024-03-18', cost: '$200' },
        { task: 'HVAC inspection', date: '2024-03-22', cost: '$350' },
        { task: 'Parking lot restriping', date: '2024-03-25', cost: '$800' }
      ],
      photos: ['sunset-front.jpg', 'sunset-pool.jpg', 'sunset-units.jpg']
    },
    {
      id: 'prop-002',
      name: 'Green Valley Complex',
      address: '456 Valley Road, Los Angeles, CA 90025',
      type: 'Townhomes',
      units: 36,
      occupancy: 89,
      yearBuilt: 2018,
      totalSqft: 45000,
      amenities: ['Park', 'Playground', 'BBQ Area', 'Dog Park'],
      monthlyRevenue: 54000,
      monthlyExpenses: 14000,
      netIncome: 40000,
      maintenanceRequests: {
        pending: 3,
        inProgress: 5,
        completed: 98
      },
      diyStats: {
        totalRepairs: 67,
        avgSavings: '$312',
        successRate: '91%',
        avgCompletionTime: '1.8 days'
      },
      marketAnalysis: {
        avgRentArea: '$1650',
        ourAvgRent: '$1500',
        demandScore: '8.5/10',
        competitionLevel: 'Medium'
      }
    },
    {
      id: 'prop-003',
      name: 'Downtown Towers',
      address: '789 Main St, Los Angeles, CA 90013',
      type: 'High-rise',
      units: 120,
      occupancy: 96,
      yearBuilt: 2020,
      totalSqft: 150000,
      amenities: ['Concierge', 'Rooftop Pool', 'Co-working Space', 'Wine Cellar', 'Pet Spa'],
      monthlyRevenue: 240000,
      monthlyExpenses: 65000,
      netIncome: 175000,
      maintenanceRequests: {
        pending: 12,
        inProgress: 18,
        completed: 342
      },
      diyStats: {
        totalRepairs: 234,
        avgSavings: '$428',
        successRate: '83%',
        avgCompletionTime: '2.9 days'
      },
      luxuryFeatures: {
        smartHome: true,
        evCharging: 20,
        privateBalconies: 120,
        floorToCeilingWindows: true
      }
    }
  ],

  // Trending DIY Fixes
  trendingFixes: [
    {
      id: 'fix-001',
      title: 'Quick Drain Unclogging',
      category: 'Plumbing',
      difficulty: 'Easy',
      trending: true,
      popularity: 1243,
      avgTime: '15 minutes',
      successRate: '95%',
      avgSavings: '$120',
      tools: ['Plunger', 'Drain snake', 'Baking soda', 'Vinegar'],
      description: 'Natural solution for slow drains without harsh chemicals',
      videoUrl: 'https://www.youtube.com/embed/Pk2R5fPiE4E',
      steps: [
        'Pour hot water down the drain',
        'Add 1/2 cup baking soda',
        'Follow with 1 cup vinegar',
        'Cover and wait 15 minutes',
        'Flush with hot water'
      ],
      proTip: 'Do this monthly to prevent clogs',
      userReviews: [
        { user: 'Jane D.', rating: 5, comment: 'Worked like magic!' },
        { user: 'Bob S.', rating: 4, comment: 'Took two tries but worked' }
      ]
    },
    {
      id: 'fix-002',
      title: 'AC Filter Replacement',
      category: 'HVAC',
      difficulty: 'Easy',
      trending: true,
      popularity: 987,
      avgTime: '5 minutes',
      successRate: '99%',
      avgSavings: '$80',
      tools: ['New filter (check size)'],
      description: 'Improve air quality and AC efficiency',
      videoUrl: 'https://www.youtube.com/embed/Ll6-eGDpimU',
      frequency: 'Every 1-3 months',
      benefits: ['Better air quality', 'Lower energy bills', 'Extended AC life'],
      commonMistakes: ['Wrong filter size', 'Installing backwards', 'Forgetting to turn off AC']
    },
    {
      id: 'fix-003',
      title: 'Running Toilet Fix',
      category: 'Plumbing',
      difficulty: 'Medium',
      trending: true,
      popularity: 856,
      avgTime: '30 minutes',
      successRate: '88%',
      avgSavings: '$200',
      tools: ['Toilet flapper kit', 'Adjustable wrench'],
      description: 'Stop wasting water and money',
      videoUrl: 'https://www.youtube.com/embed/Gg5K2J5KQBE',
      diagnostic: [
        'Check if flapper is sealing properly',
        'Adjust chain length if needed',
        'Replace flapper if worn'
      ],
      waterSaved: '200 gallons/day',
      ecoImpact: 'High'
    },
    {
      id: 'fix-004',
      title: 'Door Hinge Squeaks',
      category: 'General',
      difficulty: 'Easy',
      trending: false,
      popularity: 623,
      avgTime: '10 minutes',
      successRate: '98%',
      avgSavings: '$75',
      tools: ['WD-40 or cooking oil', 'Rag', 'Screwdriver (optional)'],
      description: 'Silence annoying door squeaks instantly',
      videoUrl: 'https://www.youtube.com/embed/mQZZ0A0MTQU',
      quickFix: 'Spray WD-40 on hinges and work door back and forth',
      permanentFix: 'Remove hinge pins, clean, apply grease, reinstall'
    },
    {
      id: 'fix-005',
      title: 'Garbage Disposal Reset',
      category: 'Kitchen',
      difficulty: 'Easy',
      trending: true,
      popularity: 745,
      avgTime: '5 minutes',
      successRate: '92%',
      avgSavings: '$150',
      tools: ['Allen wrench (usually included)', 'Flashlight'],
      description: 'Get your disposal working again',
      videoUrl: 'https://www.youtube.com/embed/LXZN51YnSLA',
      safetyFirst: 'NEVER put hand in disposal',
      steps: [
        'Turn off power at breaker',
        'Check for obstructions with flashlight',
        'Use Allen wrench to manually turn motor',
        'Press reset button on bottom',
        'Restore power and test'
      ]
    }
  ],

  // Manager Analytics Data
  managerAnalytics: {
    kpis: {
      truckRollReduction: { value: 67, change: '+12%', target: 75 },
      avgResponseTime: { value: '2.4h', change: '-18%', target: '2h' },
      tenantSatisfaction: { value: 4.8, change: '+0.3', target: 4.5 },
      costSavings: { value: 45780, change: '+23%', target: 50000 },
      diySuccessRate: { value: 87, change: '+5%', target: 90 },
      occupancyRate: { value: 94.3, change: '+1.2%', target: 95 }
    },
    monthlyTrends: {
      repairs: [45, 52, 48, 61, 58, 67],
      savings: [3200, 3800, 4100, 4500, 4800, 5380],
      satisfaction: [4.2, 4.3, 4.5, 4.6, 4.7, 4.8]
    },
    topPerformers: [
      { property: 'Green Valley', score: 92, improvement: '+8%' },
      { property: 'Sunset Apartments', score: 89, improvement: '+5%' },
      { property: 'Downtown Towers', score: 85, improvement: '+12%' }
    ]
  }
};

// Helper function to get random video URL
export const getRepairVideo = (repairType) => {
  const videoMap = {
    plumbing: enhancedMockData.demoVideos.leakyFaucet,
    hvac: enhancedMockData.demoVideos.acRepair,
    electrical: enhancedMockData.demoVideos.electricalOutlet,
    security: enhancedMockData.demoVideos.doorLock,
    general: enhancedMockData.demoVideos.generalMaintenance
  };
  
  return videoMap[repairType] || enhancedMockData.demoVideos.generalMaintenance;
};

// Get activity details
export const getActivityDetails = (activityId) => {
  return enhancedMockData.liveActivityItems.find(item => item.id === activityId);
};

// Get repair details
export const getRepairDetails = (repairId) => {
  return enhancedMockData.detailedRepairs.find(repair => repair.id === repairId);
};

// Get property details
export const getPropertyDetails = (propertyId) => {
  return enhancedMockData.propertiesData.find(property => property.id === propertyId);
};

// Get trending fix details
export const getTrendingFixDetails = (fixId) => {
  return enhancedMockData.trendingFixes.find(fix => fix.id === fixId);
};