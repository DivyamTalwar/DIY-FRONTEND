// PRODUCTION-LEVEL MOCK API SERVICE
// Simulates real backend with delays, errors, and realistic responses

class MockAPI {
  constructor() {
    this.users = this.generateUsers();
    this.repairs = this.generateRepairs();
    this.appliances = this.generateAppliances();
    this.technicians = this.generateTechnicians();
    this.notifications = [];
    this.activeRepairs = new Map();
  }

  // Simulate network delay
  delay(ms = Math.random() * 1000 + 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Simulate occasional errors (5% chance)
  simulateError() {
    if (Math.random() < 0.05) {
      throw new Error('Network error - please try again');
    }
  }

  generateUsers() {
    return {
      current: {
        id: 'user_001',
        name: 'John Smith',
        email: 'john@example.com',
        level: 12,
        xp: 3250,
        nextLevelXp: 4000,
        streak: 7,
        totalSaved: 2847,
        repairsCompleted: 23,
        successRate: 87,
        badges: [
          { id: 1, name: 'Quick Fixer', icon: '⚡', earned: '2024-01-15' },
          { id: 2, name: 'Money Saver', icon: '💰', earned: '2024-01-20' },
          { id: 3, name: 'DIY Master', icon: '🏆', earned: '2024-02-01' }
        ],
        preferences: {
          difficulty: 'intermediate',
          notifications: true,
          videoGuidance: true,
          aiAssist: true
        }
      }
    };
  }

  generateRepairs() {
    const statuses = ['pending', 'in_progress', 'completed', 'failed'];
    const appliances = ['Washing Machine', 'Dishwasher', 'Refrigerator', 'AC Unit', 'Dryer', 'Oven', 'Microwave'];
    const issues = [
      'Not draining properly',
      'Making loud noise',
      'Not heating',
      'Water leak detected',
      'Error code E24',
      'Not cooling',
      'Door won\'t close',
      'Not spinning'
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: `repair_${i + 1}`,
      userId: 'user_001',
      appliance: appliances[Math.floor(Math.random() * appliances.length)],
      issue: issues[Math.floor(Math.random() * issues.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
      difficulty: Math.floor(Math.random() * 5) + 1,
      estimatedTime: Math.floor(Math.random() * 45) + 15,
      actualTime: Math.random() > 0.5 ? Math.floor(Math.random() * 60) + 10 : null,
      moneySaved: Math.floor(Math.random() * 300) + 50,
      xpEarned: Math.floor(Math.random() * 200) + 50,
      successRate: Math.floor(Math.random() * 30) + 70,
      steps: Math.floor(Math.random() * 5) + 3,
      toolsRequired: ['Screwdriver', 'Wrench', 'Pliers'][Math.floor(Math.random() * 3)],
      videoUrl: '/demo-video.mp4',
      images: ['/image1.jpg', '/image2.jpg']
    }));
  }

  generateAppliances() {
    return [
      {
        id: 'app_001',
        brand: 'Samsung',
        model: 'WF45R6100AW',
        type: 'Washing Machine',
        age: 3,
        warrantyExpired: false,
        commonIssues: [
          { issue: 'Not draining', frequency: 'High', fixRate: 89 },
          { issue: 'Loud noise', frequency: 'Medium', fixRate: 76 },
          { issue: 'Door lock error', frequency: 'Low', fixRate: 92 }
        ],
        manualUrl: '/manual-samsung-wf45.pdf',
        serialNumber: 'SM2021WF1234567'
      },
      {
        id: 'app_002',
        brand: 'LG',
        model: 'LRFDS3006S',
        type: 'Refrigerator',
        age: 2,
        warrantyExpired: false,
        commonIssues: [
          { issue: 'Not cooling', frequency: 'Medium', fixRate: 82 },
          { issue: 'Ice maker problem', frequency: 'High', fixRate: 91 },
          { issue: 'Noise from compressor', frequency: 'Low', fixRate: 67 }
        ],
        manualUrl: '/manual-lg-fridge.pdf',
        serialNumber: 'LG2022RF7654321'
      }
    ];
  }

  generateTechnicians() {
    return [
      {
        id: 'tech_001',
        name: 'Mike Johnson',
        rating: 4.9,
        reviews: 312,
        specialties: ['Washing Machines', 'Dishwashers', 'Dryers'],
        availability: this.generateAvailability(),
        responseTime: '2 hours',
        cost: 89,
        distance: '3.2 miles',
        completedRepairs: 1847,
        profileImage: '/tech-mike.jpg'
      },
      {
        id: 'tech_002',
        name: 'Sarah Williams',
        rating: 4.8,
        reviews: 287,
        specialties: ['Refrigerators', 'AC Units', 'Ovens'],
        availability: this.generateAvailability(),
        responseTime: '90 minutes',
        cost: 95,
        distance: '5.1 miles',
        completedRepairs: 1523,
        profileImage: '/tech-sarah.jpg'
      }
    ];
  }

  generateAvailability() {
    const slots = [];
    const today = new Date();
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() + d);
      const daySlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
      daySlots.forEach(time => {
        if (Math.random() > 0.3) {
          slots.push({
            date: date.toISOString().split('T')[0],
            time,
            available: true
          });
        }
      });
    }
    return slots;
  }

  // API METHODS

  async diagnoseIssue(imageData, description) {
    await this.delay(2000);
    this.simulateError();

    const confidence = Math.floor(Math.random() * 20) + 75;
    const appliances = ['Washing Machine', 'Dishwasher', 'Refrigerator', 'AC Unit'];
    const issues = [
      'Clogged drain filter',
      'Faulty door seal',
      'Broken pump motor',
      'Electrical connection issue',
      'Control board malfunction'
    ];

    return {
      success: true,
      diagnosis: {
        appliance: appliances[Math.floor(Math.random() * appliances.length)],
        issue: issues[Math.floor(Math.random() * issues.length)],
        confidence,
        severity: confidence > 85 ? 'low' : confidence > 70 ? 'medium' : 'high',
        estimatedTime: `${Math.floor(Math.random() * 30) + 10} minutes`,
        estimatedCost: Math.floor(Math.random() * 200) + 50,
        successRate: Math.floor(Math.random() * 20) + 75,
        solutions: [
          {
            id: 1,
            title: 'Quick Fix Solution',
            description: 'Most common solution with highest success rate',
            steps: this.generateSteps(3),
            time: '10-15 minutes',
            difficulty: 2,
            successRate: 89,
            toolsRequired: ['Screwdriver', 'Towel'],
            videoAvailable: true
          },
          {
            id: 2,
            title: 'Thorough Repair',
            description: 'Complete fix that addresses root cause',
            steps: this.generateSteps(5),
            time: '20-30 minutes',
            difficulty: 3,
            successRate: 95,
            toolsRequired: ['Screwdriver', 'Wrench', 'Multimeter'],
            videoAvailable: true
          },
          {
            id: 3,
            title: 'Temporary Workaround',
            description: 'Quick temporary fix until proper repair',
            steps: this.generateSteps(2),
            time: '5 minutes',
            difficulty: 1,
            successRate: 65,
            toolsRequired: [],
            videoAvailable: false
          }
        ]
      }
    };
  }

  generateSteps(count) {
    const allSteps = [
      'Turn off power at the circuit breaker',
      'Remove the access panel',
      'Locate the problematic component',
      'Clean or replace the part',
      'Reassemble and test',
      'Check for proper drainage',
      'Inspect electrical connections',
      'Test the control board',
      'Verify water flow',
      'Run a diagnostic cycle'
    ];
    return allSteps.slice(0, count).map((step, i) => ({
      id: i + 1,
      instruction: step,
      warning: Math.random() > 0.7 ? 'Be careful with water/electricity' : null,
      image: Math.random() > 0.5 ? `/step-${i + 1}.jpg` : null
    }));
  }

  async startRepair(repairId, solutionId) {
    await this.delay(500);
    
    const repair = {
      id: `active_${Date.now()}`,
      repairId,
      solutionId,
      startTime: new Date().toISOString(),
      currentStep: 1,
      totalSteps: 5,
      status: 'in_progress'
    };
    
    this.activeRepairs.set(repair.id, repair);
    return { success: true, repair };
  }

  async updateRepairProgress(repairId, stepNumber, completed) {
    await this.delay(300);
    
    const repair = this.activeRepairs.get(repairId);
    if (repair) {
      repair.currentStep = stepNumber;
      if (completed) {
        repair.status = 'completed';
        repair.endTime = new Date().toISOString();
        repair.xpEarned = Math.floor(Math.random() * 100) + 150;
        repair.moneySaved = Math.floor(Math.random() * 100) + 150;
      }
    }
    
    return { success: true, repair };
  }

  async scheduleTechnician(technicianId, slot) {
    await this.delay(1500);
    this.simulateError();
    
    const booking = {
      id: `booking_${Date.now()}`,
      technicianId,
      slot,
      status: 'confirmed',
      confirmationCode: Math.random().toString(36).substring(7).toUpperCase(),
      estimatedArrival: slot.time,
      cost: Math.floor(Math.random() * 50) + 80
    };
    
    this.sendNotification({
      type: 'booking_confirmed',
      title: 'Technician Scheduled!',
      message: `Your technician will arrive on ${slot.date} at ${slot.time}`,
      data: booking
    });
    
    return { success: true, booking };
  }

  async searchIssues(query) {
    await this.delay(500);
    
    const allIssues = [
      { id: 1, title: 'Washing machine not draining', views: 15234, solutions: 3 },
      { id: 2, title: 'Dishwasher error E24', views: 12456, solutions: 2 },
      { id: 3, title: 'Refrigerator not cooling', views: 9876, solutions: 4 },
      { id: 4, title: 'AC unit frozen', views: 8234, solutions: 2 },
      { id: 5, title: 'Dryer not heating', views: 7654, solutions: 3 }
    ];
    
    const filtered = allIssues.filter(issue => 
      issue.title.toLowerCase().includes(query.toLowerCase())
    );
    
    return { success: true, results: filtered };
  }

  async getVideoGuidance(stepId) {
    await this.delay(800);
    
    return {
      success: true,
      video: {
        url: '/demo-video.mp4',
        thumbnail: '/video-thumb.jpg',
        duration: '2:34',
        transcript: 'Step-by-step instructions...',
        keyPoints: [
          'Safety first - turn off power',
          'Locate the component',
          'Follow the sequence exactly'
        ]
      }
    };
  }

  async submitFeedback(repairId, rating, comment) {
    await this.delay(500);
    
    const xpBonus = rating >= 4 ? 50 : 25;
    this.sendNotification({
      type: 'feedback_received',
      title: 'Thanks for your feedback!',
      message: `You earned ${xpBonus} bonus XP!`,
      data: { xpBonus }
    });
    
    return { success: true, xpBonus };
  }

  async getLeaderboard() {
    await this.delay(700);
    
    const users = [
      { rank: 1, name: 'DIYMaster', level: 45, xp: 12500, repairs: 156, saved: 8945 },
      { rank: 2, name: 'FixItFelix', level: 42, xp: 11200, repairs: 143, saved: 7623 },
      { rank: 3, name: 'HomeHero', level: 38, xp: 9800, repairs: 128, saved: 6234 },
      { rank: 4, name: 'You', level: 12, xp: 3250, repairs: 23, saved: 2847, highlight: true },
      { rank: 5, name: 'RepairRanger', level: 11, xp: 3100, repairs: 21, saved: 2456 }
    ];
    
    return { success: true, leaderboard: users };
  }

  async getCompanyMetrics() {
    await this.delay(1000);
    
    return {
      success: true,
      metrics: {
        live: {
          activeUsers: Math.floor(Math.random() * 500) + 1000,
          ongoingRepairs: Math.floor(Math.random() * 50) + 80,
          techniciansSaved: Math.floor(Math.random() * 10) + 35,
          todayRevenue: Math.floor(Math.random() * 5000) + 15000
        },
        performance: {
          truckRollReduction: 87,
          avgResolutionTime: 18,
          firstTimeFixRate: 82,
          customerSatisfaction: 4.8,
          costPerResolution: 12.50,
          monthlyGrowth: 23
        },
        predictions: {
          nextHourDemand: 'High',
          topIssue: 'Washing Machine - Drainage',
          technicianUtilization: 94,
          revenueProjection: 485000
        }
      }
    };
  }

  sendNotification(notification) {
    notification.id = Date.now();
    notification.timestamp = new Date().toISOString();
    notification.read = false;
    this.notifications.push(notification);
    
    // Simulate real-time notification
    if (window.onNotification) {
      window.onNotification(notification);
    }
  }

  async getNotifications() {
    await this.delay(200);
    return { success: true, notifications: this.notifications };
  }

  async markNotificationRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    return { success: true };
  }

  // Simulate real-time updates
  startRealTimeUpdates() {
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.sendNotification({
          type: 'community_update',
          title: 'Community Update',
          message: `Someone just fixed their ${['dishwasher', 'washing machine', 'dryer'][Math.floor(Math.random() * 3)]}!`,
          data: {
            user: ['John', 'Sarah', 'Mike', 'Emma'][Math.floor(Math.random() * 4)],
            saved: Math.floor(Math.random() * 100) + 100,
            time: '2 minutes ago'
          }
        });
      }
    }, 30000); // Every 30 seconds
  }

  // Emergency response
  async handleEmergency(type) {
    await this.delay(200);
    
    const emergencySteps = {
      'water-leak': [
        'SHUT OFF main water valve NOW',
        'Turn off electricity to affected area',
        'Move valuables to safety',
        'Document damage for insurance'
      ],
      'gas-smell': [
        'DO NOT use any switches',
        'EVACUATE immediately',
        'Call 911 from outside',
        'Do not return until cleared'
      ],
      'no-power': [
        'Check circuit breaker',
        'Look for tripped GFCI outlets',
        'Check if neighbors affected',
        'Call power company if widespread'
      ]
    };
    
    return {
      success: true,
      emergency: {
        type,
        severity: 'critical',
        steps: emergencySteps[type] || [],
        technicianETA: '45 minutes',
        emergencyLine: '1-800-EMERGENCY'
      }
    };
  }
}

// Create singleton instance
const mockAPI = new MockAPI();
mockAPI.startRealTimeUpdates();

// Export for use in components
export default mockAPI;

// Helper function for components
export const api = {
  diagnose: (image, desc) => mockAPI.diagnoseIssue(image, desc),
  startRepair: (repairId, solutionId) => mockAPI.startRepair(repairId, solutionId),
  updateProgress: (id, step, done) => mockAPI.updateRepairProgress(id, step, done),
  scheduleTech: (techId, slot) => mockAPI.scheduleTechnician(techId, slot),
  search: (query) => mockAPI.searchIssues(query),
  getVideo: (stepId) => mockAPI.getVideoGuidance(stepId),
  submitFeedback: (id, rating, comment) => mockAPI.submitFeedback(id, rating, comment),
  getLeaderboard: () => mockAPI.getLeaderboard(),
  getMetrics: () => mockAPI.getCompanyMetrics(),
  getNotifications: () => mockAPI.getNotifications(),
  markRead: (id) => mockAPI.markNotificationRead(id),
  emergency: (type) => mockAPI.handleEmergency(type),
  getTechnicians: () => Promise.resolve({ success: true, technicians: mockAPI.technicians }),
  getUser: () => Promise.resolve({ success: true, user: mockAPI.users.current }),
  getPropertyData: () => Promise.resolve({ 
    success: true, 
    properties: [
      { id: 1, name: 'Sunset Apartments', units: 24, occupied: 22 },
      { id: 2, name: 'Green Valley Complex', units: 36, occupied: 34 }
    ]
  })
};