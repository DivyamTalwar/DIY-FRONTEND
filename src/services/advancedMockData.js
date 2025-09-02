// ADVANCED MOCK DATA GENERATOR FOR PRODUCTION-LEVEL APP
import { api } from './mockApi';

// Generate realistic property data
export const generateProperties = () => {
  const propertyTypes = ['Apartment Complex', 'Office Building', 'Shopping Mall', 'Industrial Park', 'Mixed Use', 'Residential Tower'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: `prop_${i + 1}`,
    name: `${['Sunset', 'Green Valley', 'Harbor', 'Mountain View', 'Park Place', 'City Center'][Math.floor(Math.random() * 6)]} ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]}`,
    type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Elm', 'Park', 'First', 'Second'][Math.floor(Math.random() * 6)]} Street`,
    city: cities[Math.floor(Math.random() * cities.length)],
    state: 'CA',
    zip: `${90000 + Math.floor(Math.random() * 999)}`,
    units: Math.floor(Math.random() * 200) + 10,
    occupiedUnits: 0,
    sqft: Math.floor(Math.random() * 100000) + 5000,
    yearBuilt: 1970 + Math.floor(Math.random() * 50),
    value: Math.floor(Math.random() * 10000000) + 500000,
    monthlyRevenue: Math.floor(Math.random() * 100000) + 10000,
    maintenanceBudget: Math.floor(Math.random() * 50000) + 5000,
    manager: {
      name: `${['John', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa'][Math.floor(Math.random() * 6)]} ${['Smith', 'Johnson', 'Williams', 'Brown'][Math.floor(Math.random() * 4)]}`,
      phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `manager${i + 1}@property.com`
    },
    metrics: {
      occupancyRate: Math.floor(Math.random() * 20) + 75,
      maintenanceScore: Math.floor(Math.random() * 30) + 65,
      tenantSatisfaction: (Math.random() * 2 + 3).toFixed(1),
      avgRepairTime: Math.floor(Math.random() * 48) + 2,
      outstandingIssues: Math.floor(Math.random() * 15),
      completedThisMonth: Math.floor(Math.random() * 30) + 5,
      energyEfficiencyRating: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
      lastInspection: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    },
    amenities: ['Parking', 'Gym', 'Pool', 'Security', 'Laundry', 'Storage', 'Elevator', 'Garden'].filter(() => Math.random() > 0.5),
    utilities: {
      electric: Math.floor(Math.random() * 5000) + 1000,
      water: Math.floor(Math.random() * 3000) + 500,
      gas: Math.floor(Math.random() * 2000) + 300,
      internet: Math.floor(Math.random() * 500) + 100,
      waste: Math.floor(Math.random() * 1000) + 200
    }
  })).map(prop => ({
    ...prop,
    occupiedUnits: Math.floor(prop.units * (prop.metrics.occupancyRate / 100))
  }));
};

// Generate tenant data
export const generateTenants = () => {
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  return Array.from({ length: 200 }, (_, i) => ({
    id: `tenant_${i + 1}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `tenant${i + 1}@email.com`,
    phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    unit: `${Math.floor(Math.random() * 50) + 1}${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}`,
    propertyId: `prop_${Math.floor(Math.random() * 25) + 1}`,
    moveInDate: new Date(Date.now() - Math.random() * 365 * 5 * 24 * 60 * 60 * 1000).toISOString(),
    leaseEnd: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    rentAmount: Math.floor(Math.random() * 3000) + 1000,
    paymentStatus: ['Current', 'Late', 'Paid'][Math.floor(Math.random() * 3)],
    balance: Math.random() > 0.8 ? Math.floor(Math.random() * 500) : 0,
    maintenanceRequests: Math.floor(Math.random() * 10),
    satisfactionScore: (Math.random() * 2 + 3).toFixed(1),
    emergencyContact: {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      relationship: ['Parent', 'Sibling', 'Spouse', 'Friend'][Math.floor(Math.random() * 4)]
    },
    pets: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0,
    parkingSpots: Math.floor(Math.random() * 3),
    notes: ['Good tenant', 'Always on time', 'Quiet', 'Friendly', null][Math.floor(Math.random() * 5)]
  }));
};

// Generate maintenance requests
export const generateMaintenanceRequests = () => {
  const categories = ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'Structural', 'Pest Control', 'Landscaping', 'Security'];
  const priorities = ['Emergency', 'High', 'Medium', 'Low'];
  const statuses = ['Open', 'In Progress', 'Scheduled', 'Completed', 'Cancelled'];
  
  return Array.from({ length: 500 }, (_, i) => ({
    id: `req_${i + 1}`,
    ticketNumber: `TKT-${String(i + 1).padStart(6, '0')}`,
    tenantId: `tenant_${Math.floor(Math.random() * 200) + 1}`,
    propertyId: `prop_${Math.floor(Math.random() * 25) + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    title: [
      'Water leak in bathroom',
      'AC not cooling',
      'Power outlet not working',
      'Dishwasher error',
      'Door lock broken',
      'Window won\'t close',
      'Heating issue',
      'Refrigerator not cooling',
      'Garbage disposal jammed',
      'Smoke detector beeping'
    ][Math.floor(Math.random() * 10)],
    description: 'Detailed description of the issue with specific symptoms and when it started.',
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    scheduledFor: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
    completedAt: null,
    technicianId: Math.random() > 0.5 ? `tech_${Math.floor(Math.random() * 20) + 1}` : null,
    estimatedCost: Math.floor(Math.random() * 500) + 50,
    actualCost: null,
    laborHours: Math.random() * 4 + 0.5,
    parts: Math.random() > 0.5 ? ['Filter', 'Valve', 'Switch', 'Belt', 'Fuse'][Math.floor(Math.random() * 5)] : null,
    photos: Math.random() > 0.3 ? [`/photo${i + 1}_1.jpg`, `/photo${i + 1}_2.jpg`] : [],
    notes: [],
    rating: null,
    feedback: null
  }));
};

// Generate vendor data
export const generateVendors = () => {
  const companies = ['Pro Fix Services', 'Quick Repair Co', 'Reliable Maintenance', 'Expert Solutions', '24/7 Emergency Services'];
  const specialties = ['Plumbing', 'Electrical', 'HVAC', 'General Maintenance', 'Roofing', 'Painting', 'Landscaping'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `vendor_${i + 1}`,
    companyName: `${companies[Math.floor(Math.random() * companies.length)]} ${i + 1}`,
    contactName: `${['John', 'Sarah', 'Mike', 'Emma'][Math.floor(Math.random() * 4)]} ${['Smith', 'Johnson'][Math.floor(Math.random() * 2)]}`,
    email: `vendor${i + 1}@company.com`,
    phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    specialties: specialties.filter(() => Math.random() > 0.5),
    rating: (Math.random() * 2 + 3).toFixed(1),
    completedJobs: Math.floor(Math.random() * 500) + 50,
    avgResponseTime: `${Math.floor(Math.random() * 4) + 1} hours`,
    hourlyRate: Math.floor(Math.random() * 50) + 50,
    insurance: {
      liability: true,
      workersComp: Math.random() > 0.2,
      bonded: Math.random() > 0.3,
      expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    },
    certifications: ['Licensed', 'EPA Certified', 'OSHA Compliant'].filter(() => Math.random() > 0.5),
    availability: ['24/7', 'Business Hours', 'Emergency Only'][Math.floor(Math.random() * 3)],
    paymentTerms: ['Net 30', 'Net 15', 'Due on Receipt'][Math.floor(Math.random() * 3)],
    preferredVendor: Math.random() > 0.7,
    activeContracts: Math.floor(Math.random() * 5),
    totalSpent: Math.floor(Math.random() * 100000) + 5000
  }));
};

// Generate inventory data
export const generateInventory = () => {
  const categories = ['Plumbing', 'Electrical', 'HVAC', 'Hardware', 'Cleaning', 'Safety', 'Tools'];
  const units = ['pcs', 'boxes', 'gallons', 'rolls', 'sets'];
  
  return Array.from({ length: 150 }, (_, i) => ({
    id: `inv_${i + 1}`,
    sku: `SKU-${String(i + 1).padStart(5, '0')}`,
    name: [
      'PVC Pipe 2"',
      'Circuit Breaker 20A',
      'Air Filter 20x20',
      'Door Handle Set',
      'Paint - White',
      'Safety Goggles',
      'Screwdriver Set',
      'LED Bulb 60W',
      'Toilet Flapper',
      'Wire Nuts Assorted'
    ][Math.floor(Math.random() * 10)],
    category: categories[Math.floor(Math.random() * categories.length)],
    quantity: Math.floor(Math.random() * 100) + 1,
    unit: units[Math.floor(Math.random() * units.length)],
    minStock: Math.floor(Math.random() * 20) + 5,
    maxStock: Math.floor(Math.random() * 100) + 50,
    location: `${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}-${Math.floor(Math.random() * 10) + 1}`,
    unitCost: (Math.random() * 50 + 1).toFixed(2),
    supplier: `vendor_${Math.floor(Math.random() * 50) + 1}`,
    reorderPoint: Math.floor(Math.random() * 30) + 10,
    lastOrdered: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: Math.random() > 0.7 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() : null,
    notes: Math.random() > 0.8 ? 'Preferred brand' : null
  }));
};

// Generate financial data
export const generateFinancialData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  return {
    revenue: months.map((month, i) => ({
      month,
      rent: Math.floor(Math.random() * 50000) + 150000,
      fees: Math.floor(Math.random() * 5000) + 2000,
      other: Math.floor(Math.random() * 3000) + 1000,
      total: 0
    })).map(item => ({ ...item, total: item.rent + item.fees + item.other })),
    
    expenses: months.map((month, i) => ({
      month,
      maintenance: Math.floor(Math.random() * 20000) + 10000,
      utilities: Math.floor(Math.random() * 10000) + 5000,
      insurance: Math.floor(Math.random() * 5000) + 3000,
      management: Math.floor(Math.random() * 15000) + 10000,
      other: Math.floor(Math.random() * 5000) + 2000,
      total: 0
    })).map(item => ({ 
      ...item, 
      total: item.maintenance + item.utilities + item.insurance + item.management + item.other 
    })),
    
    cashflow: months.map((month, i) => {
      const revenue = Math.floor(Math.random() * 50000) + 150000;
      const expenses = Math.floor(Math.random() * 40000) + 30000;
      return {
        month,
        revenue,
        expenses,
        net: revenue - expenses,
        cumulative: 0
      };
    }).map((item, i, arr) => ({
      ...item,
      cumulative: arr.slice(0, i + 1).reduce((sum, curr) => sum + curr.net, 0)
    })),
    
    budgetVsActual: {
      maintenance: { budget: 150000, actual: 142000, variance: -8000 },
      utilities: { budget: 80000, actual: 85000, variance: 5000 },
      insurance: { budget: 40000, actual: 38000, variance: -2000 },
      management: { budget: 120000, actual: 118000, variance: -2000 },
      capital: { budget: 50000, actual: 45000, variance: -5000 }
    },
    
    kpis: {
      totalRevenue: 2156789,
      totalExpenses: 1823456,
      netIncome: 333333,
      occupancyRate: 92.5,
      avgRentPerUnit: 1850,
      collectionRate: 98.2,
      maintenanceCostPerUnit: 125,
      capRate: 7.8,
      cashOnCashReturn: 12.3,
      debtServiceCoverage: 1.45
    }
  };
};

// Generate predictive maintenance data
export const generatePredictiveData = () => {
  const equipment = [
    { name: 'HVAC Unit A', failureProbability: 15, daysToFailure: 45, lastService: '2024-01-15' },
    { name: 'Elevator 1', failureProbability: 8, daysToFailure: 120, lastService: '2024-02-01' },
    { name: 'Water Heater B', failureProbability: 32, daysToFailure: 20, lastService: '2023-12-10' },
    { name: 'Roof Section C', failureProbability: 45, daysToFailure: 10, lastService: '2023-11-20' },
    { name: 'Parking Gate', failureProbability: 12, daysToFailure: 60, lastService: '2024-01-20' },
    { name: 'Fire Alarm System', failureProbability: 5, daysToFailure: 180, lastService: '2024-02-15' },
    { name: 'Pool Pump', failureProbability: 28, daysToFailure: 30, lastService: '2024-01-05' },
    { name: 'Generator', failureProbability: 18, daysToFailure: 90, lastService: '2023-12-20' }
  ];
  
  return equipment.map(item => ({
    ...item,
    recommendedAction: item.failureProbability > 30 ? 'Schedule Immediate Service' : 
                       item.failureProbability > 15 ? 'Plan Maintenance' : 'Monitor',
    estimatedCost: Math.floor(Math.random() * 2000) + 200,
    priority: item.failureProbability > 30 ? 'High' : item.failureProbability > 15 ? 'Medium' : 'Low',
    healthScore: 100 - item.failureProbability
  }));
};

// Generate compliance data
export const generateComplianceData = () => {
  return {
    inspections: [
      { type: 'Fire Safety', dueDate: '2024-03-15', status: 'Scheduled', lastCompleted: '2023-03-10', result: 'Passed' },
      { type: 'Elevator', dueDate: '2024-04-01', status: 'Pending', lastCompleted: '2023-04-01', result: 'Passed' },
      { type: 'Building Code', dueDate: '2024-06-30', status: 'Compliant', lastCompleted: '2023-06-25', result: 'Passed' },
      { type: 'Health & Safety', dueDate: '2024-02-28', status: 'Overdue', lastCompleted: '2023-02-20', result: 'Minor Issues' },
      { type: 'ADA Compliance', dueDate: '2024-12-31', status: 'Compliant', lastCompleted: '2022-12-15', result: 'Passed' },
      { type: 'Environmental', dueDate: '2024-09-30', status: 'Compliant', lastCompleted: '2023-09-20', result: 'Passed' }
    ],
    
    permits: [
      { name: 'Business License', number: 'BL-2024-1234', expiryDate: '2024-12-31', status: 'Active' },
      { name: 'Rental Permit', number: 'RP-2024-5678', expiryDate: '2024-06-30', status: 'Active' },
      { name: 'Pool Operation', number: 'PO-2024-9012', expiryDate: '2024-08-31', status: 'Active' },
      { name: 'Parking Facility', number: 'PF-2024-3456', expiryDate: '2024-10-31', status: 'Renewal Required' }
    ],
    
    certificates: [
      { name: 'Insurance Certificate', provider: 'State Insurance Co', expiryDate: '2024-12-31', coverage: '$5M' },
      { name: 'Liability Insurance', provider: 'National Coverage', expiryDate: '2024-11-30', coverage: '$10M' },
      { name: 'Workers Comp', provider: 'Workers Insurance Inc', expiryDate: '2024-09-30', coverage: 'Full' }
    ]
  };
};

// Generate document data
export const generateDocuments = () => {
  const types = ['Lease', 'Invoice', 'Contract', 'Report', 'Permit', 'Insurance', 'Manual', 'Warranty'];
  
  return Array.from({ length: 100 }, (_, i) => ({
    id: `doc_${i + 1}`,
    name: `${types[Math.floor(Math.random() * types.length)]}_${Date.now()}_${i + 1}.pdf`,
    type: types[Math.floor(Math.random() * types.length)],
    size: `${(Math.random() * 5 + 0.1).toFixed(1)} MB`,
    uploadedBy: `User ${Math.floor(Math.random() * 10) + 1}`,
    uploadedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Important', 'Archived', 'Active', 'Pending'].filter(() => Math.random() > 0.5),
    propertyId: `prop_${Math.floor(Math.random() * 25) + 1}`,
    expiryDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() : null,
    shared: Math.random() > 0.5,
    version: Math.floor(Math.random() * 3) + 1
  }));
};

// Generate analytics data
export const generateAnalyticsData = () => {
  return {
    performance: {
      responseTime: {
        current: 2.3,
        target: 2.0,
        trend: -15,
        data: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          value: Math.random() * 2 + 1.5
        }))
      },
      resolutionRate: {
        current: 87,
        target: 90,
        trend: 5,
        data: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          value: Math.floor(Math.random() * 20) + 75
        }))
      },
      customerSatisfaction: {
        current: 4.6,
        target: 4.5,
        trend: 8,
        data: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          value: (Math.random() * 1 + 4).toFixed(1)
        }))
      },
      costPerTicket: {
        current: 125,
        target: 100,
        trend: -10,
        data: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          value: Math.floor(Math.random() * 50) + 100
        }))
      }
    },
    
    heatmap: {
      issuesByPropertyAndCategory: generateProperties().slice(0, 10).map(prop => ({
        property: prop.name.substring(0, 15),
        plumbing: Math.floor(Math.random() * 20),
        electrical: Math.floor(Math.random() * 15),
        hvac: Math.floor(Math.random() * 25),
        appliance: Math.floor(Math.random() * 18),
        structural: Math.floor(Math.random() * 8)
      }))
    },
    
    trends: {
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        tickets: Math.floor(Math.random() * 100) + 150,
        resolved: Math.floor(Math.random() * 90) + 140,
        avgTime: (Math.random() * 24 + 12).toFixed(1),
        cost: Math.floor(Math.random() * 5000) + 10000
      })),
      
      seasonal: [
        { season: 'Winter', hvacIssues: 245, plumbingIssues: 189, totalIssues: 523 },
        { season: 'Spring', hvacIssues: 156, plumbingIssues: 234, totalIssues: 456 },
        { season: 'Summer', hvacIssues: 312, plumbingIssues: 145, totalIssues: 512 },
        { season: 'Fall', hvacIssues: 178, plumbingIssues: 198, totalIssues: 434 }
      ]
    }
  };
};

// Export all data generators
export const mockDataGenerators = {
  properties: generateProperties(),
  tenants: generateTenants(),
  maintenanceRequests: generateMaintenanceRequests(),
  vendors: generateVendors(),
  inventory: generateInventory(),
  financialData: generateFinancialData(),
  predictiveData: generatePredictiveData(),
  complianceData: generateComplianceData(),
  documents: generateDocuments(),
  analyticsData: generateAnalyticsData()
};

// Enhanced API functions
export const enhancedAPI = {
  ...api,
  
  // Property Management
  getProperties: () => Promise.resolve({ success: true, data: mockDataGenerators.properties }),
  getPropertyById: (id) => Promise.resolve({ 
    success: true, 
    data: mockDataGenerators.properties.find(p => p.id === id) 
  }),
  updateProperty: (id, data) => Promise.resolve({ success: true, data: { id, ...data } }),
  
  // Tenant Management
  getTenants: () => Promise.resolve({ success: true, data: mockDataGenerators.tenants }),
  getTenantById: (id) => Promise.resolve({ 
    success: true, 
    data: mockDataGenerators.tenants.find(t => t.id === id) 
  }),
  
  // Maintenance Management
  getMaintenanceRequests: () => Promise.resolve({ 
    success: true, 
    data: mockDataGenerators.maintenanceRequests 
  }),
  updateMaintenanceRequest: (id, data) => Promise.resolve({ success: true, data: { id, ...data } }),
  
  // Vendor Management
  getVendors: () => Promise.resolve({ success: true, data: mockDataGenerators.vendors }),
  assignVendor: (requestId, vendorId) => Promise.resolve({ success: true }),
  
  // Inventory Management
  getInventory: () => Promise.resolve({ success: true, data: mockDataGenerators.inventory }),
  updateInventory: (id, quantity) => Promise.resolve({ success: true, data: { id, quantity } }),
  
  // Financial APIs
  getFinancialData: () => Promise.resolve({ success: true, data: mockDataGenerators.financialData }),
  getBudget: () => Promise.resolve({ success: true, data: mockDataGenerators.financialData.budgetVsActual }),
  
  // Predictive Maintenance
  getPredictiveData: () => Promise.resolve({ success: true, data: mockDataGenerators.predictiveData }),
  
  // Compliance
  getComplianceData: () => Promise.resolve({ success: true, data: mockDataGenerators.complianceData }),
  
  // Documents
  getDocuments: () => Promise.resolve({ success: true, data: mockDataGenerators.documents }),
  uploadDocument: (file) => Promise.resolve({ success: true, data: { id: `doc_${Date.now()}` } }),
  
  // Analytics
  getAnalytics: () => Promise.resolve({ success: true, data: mockDataGenerators.analyticsData }),
  
  // Real-time simulations
  simulateRealTimeUpdate: (callback) => {
    setInterval(() => {
      const updates = {
        type: ['maintenance', 'financial', 'tenant', 'alert'][Math.floor(Math.random() * 4)],
        data: {
          message: `New update at ${new Date().toLocaleTimeString()}`,
          value: Math.floor(Math.random() * 100)
        }
      };
      callback(updates);
    }, 5000);
  }
};

export default enhancedAPI;