import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Home, Users, Truck, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Activity, BarChart3, Building, Wrench, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight, Zap, Shield, Award,
  Target, Cpu, Globe, Layers, BookOpen, MessageSquare, Phone,
  DollarSign, Gauge, Eye, Plus, Star, MapPin, Package,
  CreditCard, PieChart, Database, Cloud, Lock, Sparkles,
  Timer, Battery, Wifi, Signal, Heart, ThumbsUp, Info, X, Settings
} from 'lucide-react';

const ManagerDashboard = ({ navigate, realTimeMetrics, managerData }) => {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Activity Feed Data with IDs and more details
  const activityFeed = [
    { id: 'act_001', type: 'success', title: 'Maintenance Completed', desc: 'Unit 12B - Water heater replaced', time: 'Just now', icon: CheckCircle },
    { id: 'act_002', type: 'warning', title: 'Urgent Request', desc: 'Unit 8A - AC not working', time: '2 min ago', icon: AlertTriangle },
    { id: 'act_003', type: 'info', title: 'New Tenant', desc: 'Sarah Johnson moved into Unit 15C', time: '5 min ago', icon: Users },
    { id: 'act_004', type: 'success', title: 'Payment Received', desc: '$2,500 from Unit 10D', time: '8 min ago', icon: DollarSign },
    { id: 'act_005', type: 'info', title: 'Inspection Scheduled', desc: 'Building C - March 15, 2024', time: '12 min ago', icon: Calendar },
    { id: 'act_006', type: 'success', title: 'Issue Resolved', desc: 'Parking complaint at Building A', time: '15 min ago', icon: CheckCircle }
  ];

  // Properties data
  const properties = managerData?.properties || [
    { id: 1, name: 'Sunset Apartments', units: 48, occupied: 45, revenue: 135000, rating: 4.8 },
    { id: 2, name: 'Green Valley Complex', units: 36, occupied: 34, revenue: 102000, rating: 4.6 },
    { id: 3, name: 'Downtown Towers', units: 120, occupied: 115, revenue: 345000, rating: 4.9 }
  ];

  // Mock data for activity details
  const getActivityDetails = (activityId) => {
    const mockDetails = {
      'act_001': {
        title: 'Maintenance Completed',
        property: 'Sunset Apartments',
        unit: '12B',
        tenant: 'Michael Chen',
        technician: 'John Martinez',
        issue: 'Water heater malfunction',
        resolution: 'Replaced 40-gallon water heater with new energy-efficient model',
        duration: '2.5 hours',
        cost: '$1,250',
        savedCost: '$450 (vs emergency service)',
        images: ['before.jpg', 'after.jpg'],
        tenantFeedback: 'Excellent service! Very professional.',
        rating: 5,
        completedAt: '2024-03-15 10:30 AM',
        nextInspection: '2025-03-15'
      },
      'act_002': {
        title: 'Urgent AC Repair Request',
        property: 'Green Valley Complex',
        unit: '8A',
        tenant: 'Emily Rodriguez',
        issue: 'AC unit not cooling',
        reportedAt: '2024-03-15 11:45 AM',
        priority: 'HIGH',
        estimatedCost: '$200-400',
        diagnostics: 'Possible refrigerant leak or compressor issue',
        availableTechnicians: ['Sarah Williams', 'Mike Johnson'],
        nextAvailableSlot: '2:00 PM Today',
        tenantHistory: '3 previous repairs in last 6 months',
        unitDetails: '2BR/2BA, 950 sq ft',
        lastMaintenance: '2023-12-10'
      },
      'act_003': {
        title: 'New Tenant Move-In',
        property: 'Downtown Towers',
        unit: '15C',
        tenant: 'Sarah Johnson',
        moveInDate: '2024-03-15',
        leaseTerms: '12 months',
        monthlyRent: '$2,800',
        securityDeposit: '$2,800',
        emergencyContact: 'David Johnson (Brother)',
        occupation: 'Software Engineer',
        pets: 'None',
        parkingSpace: 'P-234',
        previousAddress: '123 Oak Street, Portland',
        creditScore: 750,
        backgroundCheck: 'Cleared',
        documentsCompleted: true
      }
    };
    return mockDetails[activityId] || null;
  };

  // Mock data for all activities
  const getAllActivities = () => {
    return [
      ...activityFeed,
      { id: 'act_007', type: 'info', title: 'Lease Renewal', desc: 'Unit 5A renewed for 12 months', time: '30 min ago', icon: Calendar },
      { id: 'act_008', type: 'warning', title: 'Late Payment', desc: 'Unit 22C - Rent overdue by 3 days', time: '45 min ago', icon: AlertTriangle },
      { id: 'act_009', type: 'success', title: 'DIY Repair Completed', desc: 'Unit 18B fixed dishwasher', time: '1 hour ago', icon: Wrench },
      { id: 'act_010', type: 'info', title: 'Amenity Booking', desc: 'Pool reserved for Unit 7D', time: '2 hours ago', icon: Calendar },
      { id: 'act_011', type: 'success', title: 'Security Update', desc: 'New keycard system activated', time: '3 hours ago', icon: Shield },
      { id: 'act_012', type: 'warning', title: 'Noise Complaint', desc: 'Unit 9F reported by neighbor', time: '4 hours ago', icon: AlertTriangle },
      { id: 'act_013', type: 'success', title: 'Energy Savings', desc: 'Building B reduced usage by 15%', time: '5 hours ago', icon: Zap },
      { id: 'act_014', type: 'info', title: 'Package Delivery', desc: '47 packages at mailroom', time: '6 hours ago', icon: Package },
      { id: 'act_015', type: 'success', title: 'Landscaping Done', desc: 'Garden maintenance completed', time: '7 hours ago', icon: CheckCircle }
    ];
  };

  // Mock data for property details
  const getPropertyDetails = (propertyId) => {
    const mockPropertyDetails = {
      1: {
        name: 'Sunset Apartments',
        address: '1234 Sunset Blvd, Los Angeles, CA 90028',
        yearBuilt: 2018,
        totalUnits: 48,
        occupiedUnits: 45,
        vacantUnits: 3,
        monthlyRevenue: 135000,
        yearlyRevenue: 1620000,
        maintenanceCosts: 15000,
        netOperatingIncome: 120000,
        capRate: '8.2%',
        rating: 4.8,
        amenities: ['Pool', 'Gym', 'Parking', 'Laundry', 'Security'],
        recentImprovements: ['New HVAC system', 'Lobby renovation', 'Smart locks'],
        upcomingMaintenance: ['Roof inspection', 'Parking lot resurfacing'],
        tenantSatisfaction: 92,
        averageRent: 2812,
        rentCollection: 98.5,
        utilities: 'Tenant paid',
        petPolicy: 'Allowed with deposit',
        parkingSpaces: 72,
        lastInspection: '2024-02-15',
        propertyManager: 'Jennifer Smith',
        emergencyContact: '(555) 123-4567'
      },
      2: {
        name: 'Green Valley Complex',
        address: '5678 Valley Road, San Diego, CA 92101',
        yearBuilt: 2020,
        totalUnits: 36,
        occupiedUnits: 34,
        vacantUnits: 2,
        monthlyRevenue: 102000,
        yearlyRevenue: 1224000,
        maintenanceCosts: 12000,
        netOperatingIncome: 90000,
        capRate: '7.8%',
        rating: 4.6,
        amenities: ['Gym', 'Rooftop Deck', 'EV Charging', 'Package Room'],
        recentImprovements: ['Solar panels installed', 'Fitness center upgrade'],
        upcomingMaintenance: ['HVAC servicing', 'Window cleaning'],
        tenantSatisfaction: 89,
        averageRent: 3000,
        rentCollection: 97.8,
        utilities: 'Included in rent',
        petPolicy: 'Cats only',
        parkingSpaces: 54,
        lastInspection: '2024-03-01',
        propertyManager: 'Robert Garcia',
        emergencyContact: '(555) 987-6543'
      },
      3: {
        name: 'Downtown Towers',
        address: '9012 Main Street, San Francisco, CA 94102',
        yearBuilt: 2019,
        totalUnits: 120,
        occupiedUnits: 115,
        vacantUnits: 5,
        monthlyRevenue: 345000,
        yearlyRevenue: 4140000,
        maintenanceCosts: 35000,
        netOperatingIncome: 310000,
        capRate: '9.1%',
        rating: 4.9,
        amenities: ['Concierge', 'Spa', 'Business Center', 'Wine Cellar', 'Theater'],
        recentImprovements: ['Lobby art installation', 'Security system upgrade'],
        upcomingMaintenance: ['Elevator modernization', 'Facade cleaning'],
        tenantSatisfaction: 95,
        averageRent: 3000,
        rentCollection: 99.2,
        utilities: 'Partially included',
        petPolicy: 'All pets welcome',
        parkingSpaces: 180,
        lastInspection: '2024-02-28',
        propertyManager: 'Amanda Thompson',
        emergencyContact: '(555) 456-7890'
      }
    };
    return mockPropertyDetails[propertyId] || null;
  };

  const handleActivityClick = (activity) => {
    const details = getActivityDetails(activity.id);
    if (details) {
      setSelectedActivity({ ...activity, details });
      setShowActivityModal(true);
      toast.success(`Viewing: ${activity.title}`, { icon: '👁️' });
    }
  };

  const handleViewAllActivities = () => {
    setShowAllActivities(true);
    toast.success('Loading all activities...', { icon: '📋' });
  };

  const handlePropertyClick = (property) => {
    try {
      const details = getPropertyDetails(property.id);
      if (details) {
        setSelectedProperty({ ...property, details });
        setShowPropertyModal(true);
        toast.success(`Viewing: ${property.name}`, { icon: '🏢' });
      } else {
        toast.error('Property details not available');
      }
    } catch (error) {
      console.error('Error loading property details:', error);
      toast.error('Failed to load property details');
    }
  };

  // Mock data for metric details
  const getMetricDetails = (metricType) => {
    const metricData = {
      truckRolls: {
        title: 'Truck Rolls Optimization',
        current: 847,
        previous: 1098,
        change: '-23%',
        trend: 'down',
        monthlyData: [1098, 1042, 985, 921, 892, 863, 847],
        breakdown: {
          'AI-Resolved': 423,
          'Video Guidance': 218,
          'Self-Service Portal': 142,
          'Predictive Prevention': 64
        },
        financialImpact: {
          'Monthly Savings': '$423,500',
          'Cost per Roll Avoided': '$500',
          'YTD Savings': '$2.54M',
          'Projected Annual': '$5.08M'
        },
        performance: {
          'Resolution Rate': '94.3%',
          'Avg Time to Resolve': '12 mins',
          'Customer Satisfaction': '4.8/5',
          'First-Time Fix': '89%'
        },
        topCategories: ['HVAC Systems', 'Plumbing', 'Electrical', 'Appliances', 'Security'],
        aiInsights: 'Predictive model preventing 64 truck rolls monthly',
        industryBenchmark: 'Outperforming by 312%',
        nextQuarterTarget: 750
      },
      moneySaved: {
        title: 'Cost Optimization Dashboard',
        current: 892000,
        previous: 695000,
        change: '+28%',
        trend: 'up',
        monthlyBreakdown: {
          'Labor Optimization': 345000,
          'Parts & Materials': 223000,
          'Emergency Prevention': 189000,
          'Vendor Negotiation': 135000
        },
        yearToDate: 5352000,
        performanceMetrics: {
          'Cost per Unit': '$183',
          'Savings per Repair': '$825',
          'ROI': '18.4x',
          'Payback Period': '2.1 months'
        },
        topSavingAreas: [
          'HVAC Optimization: $1.2M',
          'Preventive Maintenance: $980K', 
          'Energy Efficiency: $765K',
          'Water Conservation: $432K'
        ],
        aiContribution: '$2.1M (39% of total)',
        projectedAnnual: 10704000,
        industryComparison: '3.2x industry average'
      },
      properties: {
        title: 'Properties Portfolio',
        current: 238,
        previous: 220,
        change: '+18',
        trend: 'up',
        breakdown: {
          'Class A Residential': 142,
          'Commercial Office': 48,
          'Mixed-Use Development': 32,
          'Industrial': 16
        },
        portfolioValue: {
          'Total Value': '$1.87B',
          'Avg Property Value': '$7.86M',
          'YoY Appreciation': '12.3%',
          'Equity Position': '$687M'
        },
        geographicDistribution: {
          'California': 98,
          'Washington': 45,
          'Oregon': 38,
          'Arizona': 32,
          'Nevada': 25
        },
        performance: {
          'Total Units': 4865,
          'Avg Occupancy': '97.3%',
          'Avg Cap Rate': '8.7%',
          'Total NOI': '$118M'
        },
        topPerformers: 'Sunset Towers, Tech Quarter Plaza, Green Valley',
        expansionPipeline: '43 properties in due diligence',
        cities: 'Los Angeles, San Diego, San Francisco, San Jose, Sacramento, Portland, Seattle, Phoenix, Las Vegas, Reno, Tacoma, Spokane'
      },
      occupancy: {
        title: 'Occupancy Excellence',
        current: 97.3,
        previous: 94.1,
        change: '+3.2%',
        trend: 'up',
        unitMetrics: {
          'Total Units': 4865,
          'Occupied Units': 4734,
          'Vacant Units': 131,
          'Pre-Leased': 89
        },
        performanceIndicators: {
          'Turnover Rate': '6.8%',
          'Avg Days to Fill': '8.2',
          'Renewal Rate': '84%',
          'Lease Term Avg': '14.3 months'
        },
        demandMetrics: {
          'Active Waitlist': 423,
          'Applications/Week': 67,
          'Conversion Rate': '72%',
          'Tour-to-Lease': '58%'
        },
        revenueImpact: {
          'Monthly Revenue': '$3.12M',
          'Revenue per Unit': '$658',
          'Lost Revenue (Vacancy)': '$86K',
          'Potential Revenue': '$3.21M'
        },
        marketComparison: 'Outperforming market by 6.2%',
        projectedNext: '97.8% by Q2 2024'
      },
      maintenance: {
        title: 'AI Efficiency Score',
        current: 96.8,
        previous: 84.5,
        change: '+12%',
        trend: 'up',
        aiPerformance: {
          'Predictive Accuracy': '94.3%',
          'Issues Prevented': 423,
          'Auto-Resolved': 1847,
          'Human Escalation': '8.2%'
        },
        operationalMetrics: {
          'Same-Day Resolution': '96%',
          'Avg Resolution Time': '1.8 hours',
          'First-Time Fix': '91%',
          'SLA Compliance': '99.2%'
        },
        costSavings: {
          'Monthly Saved': '$74K',
          'YTD Saved': '$892K',
          'Cost per Ticket': '$42',
          'Industry Avg': '$185'
        },
        aiCapabilities: {
          'Predictive Maintenance': 'Active',
          'Smart Routing': 'Enabled',
          'Auto-Diagnostics': '94% accurate',
          'Learning Rate': '+2.3%/month'
        },
        technicianMetrics: {
          'Utilization': '94%',
          'Productivity': '+38%',
          'Job Satisfaction': '4.7/5',
          'Training Hours Saved': '142'
        },
        nextMilestone: '98% efficiency by Q2'
      },
      responseTime: {
        title: 'Response Time Analytics',
        current: 1.8,
        previous: 2.6,
        change: '-45min',
        trend: 'down',
        breakdown: {
          'Critical': '45 mins',
          'High Priority': '1.2 hours',
          'Normal': '2.8 hours',
          'Low Priority': '24 hours'
        },
        avgAcknowledgment: '3 mins',
        firstContactResolution: '67%',
        escalationRate: '12%',
        peakResponseTime: '11AM-2PM',
        slaCompliance: '98.7%'
      },
      revenue: {
        title: 'Revenue Performance',
        current: 3200000,
        quarterlyTotal: 3200000,
        yearlyProjected: 13500000,
        change: '+28%',
        trend: 'up',
        breakdown: {
          'Residential Rent': 2450000,
          'Commercial Lease': 485000,
          'Parking & Storage': 125000,
          'Amenities & Services': 89000,
          'Late Fees & Other': 51000
        },
        growthDrivers: {
          'New Properties': '$542K',
          'Rate Optimization': '$423K',
          'Occupancy Gains': '$318K',
          'Premium Services': '$198K'
        },
        portfolioMetrics: {
          'Revenue per Unit': '$658',
          'YoY Growth': '28%',
          'Cap Rate': '8.7%',
          'NOI Margin': '62%'
        },
        avgRentPerUnit: 2812,
        collectionRate: '98.5%',
        delinquencyRate: '1.5%',
        topRevenuProperty: 'Downtown Towers'
      },
      tenantHappiness: {
        title: 'Tenant Satisfaction Excellence',
        current: '4.9★',
        score: 4.9,
        previous: 4.6,
        change: '+0.3',
        trend: 'up',
        satisfactionMetrics: {
          'Overall Score': '4.9/5.0',
          'Total Reviews': 4567,
          'Response Rate': '92%',
          'NPS Score': 78
        },
        ratingBreakdown: {
          '5 Stars': 3987,
          '4 Stars': 456,
          '3 Stars': 98,
          '2 Stars': 23,
          '1 Star': 3
        },
        categoryScores: {
          'Maintenance': 4.8,
          'Communication': 4.9,
          'Amenities': 4.7,
          'Value': 4.6,
          'Management': 4.9
        },
        engagementMetrics: {
          'App Usage': '87%',
          'Portal Logins': '12.3/month',
          'Service Requests': '0.8/month',
          'Community Events': '68% attendance'
        },
        retentionImpact: {
          'Renewal Rate': '91%',
          'Referral Rate': '42%',
          'Avg Tenure': '3.2 years',
          'Lifetime Value': '$47,850'
        },
        satisfaction: '98.7%',
        topCompliments: [
          'Lightning-fast maintenance',
          'Exceptional management',
          'Premium amenities'
        ],
        improvementAreas: ['Parking availability', 'Gym hours'],
        targetScore: '4.95 by Q2 2024'
      },
      aiOptimizer: {
        title: 'AI Cost Optimizer Performance',
        savedThisYear: 892000,
        projectedSavings: 1200000,
        change: '+34%',
        trend: 'up',
        optimizations: {
          'Predictive Maintenance': 234,
          'Energy Efficiency': 156,
          'Staffing Optimization': 89,
          'Vendor Negotiations': 45
        },
        accuracy: '94.7%',
        implementationRate: '87%',
        roiAchieved: '23x',
        recommendations: 156
      }
    };
    return metricData[metricType] || null;
  };

  const handleMetricClick = (metricType, title, value) => {
    const details = getMetricDetails(metricType);
    if (details) {
      setSelectedMetric({ ...details, displayValue: value });
      setShowMetricModal(true);
      toast.success(`Viewing: ${title}`, { icon: '📊' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Premium Metrics Dashboard - 6 Core KPIs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {/* 🔥🔥🔥 LEGENDARY TRUCK ROLLS METRIC - THE MONEY MAKER 🔥🔥🔥 */}
        <motion.div
          whileHover={{ 
            scale: 1.08, 
            y: -12, 
            boxShadow: '0 40px 80px rgba(255,107,107,0.4)',
            rotate: [0, -1, 1, -1, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleMetricClick('truckRolls', '🚀 TRUCK ROLL DOMINATION', realTimeMetrics?.truckRollsSaved || 847)}
          animate={{
            boxShadow: [
              '0 10px 40px rgba(255,107,107,0.2)',
              '0 20px 60px rgba(255,142,83,0.3)',
              '0 10px 40px rgba(255,107,107,0.2)'
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 40%, #FFB347 100%)',
            borderRadius: '28px',
            padding: '16px',
            position: 'relative',
            overflow: 'visible',
            border: '3px solid rgba(255,255,255,0.5)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateZ(0)'
          }}
        >
          {/* EPIC Animated Shine Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            animation: 'shine 3s ease-in-out infinite'
          }} />
          
          {/* Floating Money Icons */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            fontSize: '20px',
            animation: 'bounce 2s ease-in-out infinite',
            zIndex: 10
          }}>
            💰
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '-5px',
            fontSize: '18px',
            animation: 'bounce 2s ease-in-out infinite 0.5s',
            zIndex: 10
          }}>
            💵
          </div>
          
          {/* Premium Glass Content */}
          <div style={{ position: 'relative', zIndex: 5 }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              {/* Icon with Pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.6)'
                }}
              >
                <Truck size={30} style={{ 
                  color: '#FF6B6B', 
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 3px 6px rgba(255,107,107,0.4))'
                }} />
              </motion.div>
              
              {/* Badges Stack */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px'
              }}>
                {/* Champion Badge */}
                <div style={{
                  padding: '3px 8px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(255,215,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.5)'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#7C2D12' }}>
                    👑 #1 KPI
                  </span>
                </div>
                {/* Savings Indicator */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    padding: '5px 10px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 6px 16px rgba(16,185,129,0.4)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <ArrowDownRight size={14} style={{ color: 'white', strokeWidth: 3 }} />
                  <span style={{ fontSize: '13px', fontWeight: '900', color: 'white' }}>
                    -23%
                  </span>
                </motion.div>
              </div>
            </div>
            
            {/* Main Display Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
              borderRadius: '20px',
              padding: '10px',
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}>
              {/* BIG NUMBERS */}
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <motion.div
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(255,107,107,0.5)',
                      '0 0 40px rgba(255,107,107,0.8)',
                      '0 0 20px rgba(255,107,107,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ 
                    fontSize: '42px', 
                    fontWeight: '900', 
                    background: 'linear-gradient(135deg, #FF6B6B, #FF8E53, #FFB347)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0,
                    letterSpacing: '-2px',
                    lineHeight: 1,
                    filter: 'drop-shadow(0 2px 4px rgba(255,107,107,0.3))'
                  }}
                >
                  {realTimeMetrics?.truckRollsSaved || 847}
                </motion.div>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#374151', 
                  margin: '4px 0 0 0', 
                  fontWeight: '800',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Truck Rolls Eliminated 🚫
                </p>
              </div>
              
              {/* MONEY SAVED HERO BOX */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                    'linear-gradient(135deg, #FDE68A, #FCD34D)',
                    'linear-gradient(135deg, #FEF3C7, #FDE68A)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  padding: '8px',
                  borderRadius: '12px',
                  border: '2px solid #F59E0B',
                  boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                  marginBottom: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>💸</span>
                    <div>
                      <p style={{ 
                        fontSize: '18px', 
                        fontWeight: '900',
                        color: '#7C2D12',
                        margin: 0,
                        letterSpacing: '-0.5px'
                      }}>
                        $423,500
                      </p>
                      <p style={{ 
                        fontSize: '8px', 
                        color: '#92400E',
                        margin: 0,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Saved This Month
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '2px'
                  }}>
                    <div style={{
                      padding: '3px 6px',
                      background: '#059669',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '9px', fontWeight: '800', color: 'white' }}>
                        $500/CALL
                      </span>
                    </div>
                    <div style={{
                      padding: '3px 6px',
                      background: '#DC2626',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '9px', fontWeight: '800', color: 'white' }}>
                        ROI: 1,247%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Real-time Status */}
              <div style={{
                padding: '6px',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                border: '1px solid rgba(16,185,129,0.2)'
              }}>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#10B981',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(16,185,129,0.6)'
                  }}
                />
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#047857'
                }}>
                  AI PREVENTING 4 CALLS/HOUR
                </span>
              </div>
            </div>
          </div>
          
          {/* Corner Sparkle */}
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            fontSize: '12px',
            animation: 'sparkle 1s ease-in-out infinite'
          }}>
            ✨
          </div>
        </motion.div>

        {/* 💎💎💎 LEGENDARY REVENUE EMPIRE - THE CASH KING 💎💎💎 */}
        <motion.div
          whileHover={{ 
            scale: 1.08, 
            y: -12, 
            boxShadow: '0 40px 80px rgba(16,185,129,0.4)',
            rotate: [0, 1, -1, 1, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleMetricClick('revenue', '💎 REVENUE EMPIRE', '$3.2M')}
          animate={{
            boxShadow: [
              '0 10px 40px rgba(16,185,129,0.2)',
              '0 20px 60px rgba(5,150,105,0.3)',
              '0 10px 40px rgba(16,185,129,0.2)'
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #047857 100%)',
            borderRadius: '28px',
            padding: '16px',
            position: 'relative',
            overflow: 'visible',
            border: '3px solid rgba(255,255,255,0.5)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateZ(0)'
          }}
        >
          {/* Money Rain Animation */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '10px',
            fontSize: '16px',
            animation: 'float 3s ease-in-out infinite'
          }}>💎</div>
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            right: '-5px',
            fontSize: '20px',
            animation: 'bounce 2s ease-in-out infinite 0.5s'
          }}>💵</div>
          
          {/* Shine Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            animation: 'shine 3s ease-in-out infinite'
          }} />
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 5 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.6)'
                }}
              >
                <DollarSign size={30} style={{ 
                  color: '#10b981', 
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 3px 6px rgba(16,185,129,0.4))'
                }} />
              </motion.div>
              
              {/* Badges */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px'
              }}>
                <div style={{
                  padding: '3px 8px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(255,215,0,0.4)'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#7C2D12' }}>
                    💰 CASH FLOW
                  </span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    padding: '5px 10px',
                    background: 'linear-gradient(135deg, #ffffff, #f0fdf4)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <ArrowUpRight size={14} style={{ color: '#10b981', strokeWidth: 3 }} />
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#10b981' }}>
                    +28%
                  </span>
                </motion.div>
              </div>
            </div>
            
            {/* Main Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
              borderRadius: '20px',
              padding: '10px',
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}>
              {/* Big Number */}
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <motion.div
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(16,185,129,0.5)',
                      '0 0 40px rgba(16,185,129,0.8)',
                      '0 0 20px rgba(16,185,129,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ 
                    fontSize: '42px', 
                    fontWeight: '900', 
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0,
                    letterSpacing: '-2px'
                  }}
                >
                  $3.2M
                </motion.div>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#374151', 
                  margin: '4px 0 0 0', 
                  fontWeight: '800',
                  textTransform: 'uppercase'
                }}>
                  Q1 2024 Revenue 💎
                </p>
              </div>
              
              {/* Growth Box */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                    'linear-gradient(135deg, #a7f3d0, #6ee7b7)',
                    'linear-gradient(135deg, #d1fae5, #a7f3d0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  padding: '8px',
                  borderRadius: '12px',
                  border: '2px solid #10b981',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '900', color: '#064e3b', margin: 0 }}>
                      +28% YoY
                    </p>
                    <p style={{ fontSize: '8px', color: '#047857', margin: 0, fontWeight: '700' }}>
                      CRUSHING TARGETS
                    </p>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    background: '#064e3b',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#d1fae5' }}>
                      $858K/MO
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 🏰🏰🏰 LEGENDARY PROPERTY EMPIRE - THE KINGDOM 🏰🏰🏰 */}
        <motion.div
          whileHover={{ 
            scale: 1.08, 
            y: -12, 
            boxShadow: '0 40px 80px rgba(102,126,234,0.4)',
            rotate: [0, -1, 1, -1, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleMetricClick('properties', '🏰 PROPERTY EMPIRE', '238')}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f7ff 100%)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(102,126,234,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(102,126,234,0.25)'
              }}>
                <Building size={22} style={{ color: 'white', strokeWidth: 2.5 }} />
              </div>
              <div style={{
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #d4f4dd 0%, #bbf7d0 100%)',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(34,197,94,0.15)'
              }}>
                <ArrowUpRight size={14} style={{ color: '#16a34a', strokeWidth: 3 }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>
                  +18
                </span>
              </div>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                color: '#0f172a', 
                margin: '0 0 4px 0',
                letterSpacing: '-0.5px'
              }}>
                238
              </h3>
              <p style={{ 
                fontSize: '13px', 
                color: '#475569', 
                margin: 0, 
                fontWeight: '600',
                letterSpacing: '0.3px'
              }}>
                Properties Managed
              </p>
              <p style={{ 
                fontSize: '11px', 
                color: '#94a3b8', 
                margin: '2px 0 0 0',
                fontWeight: '500'
              }}>
                12 cities • 4,865 units
              </p>
            </div>
          </div>
        </motion.div>

        {/* Occupancy Excellence - Premium Design */}
        <motion.div
          whileHover={{ scale: 1.03, y: -8, boxShadow: '0 25px 50px rgba(240,147,251,0.15)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleMetricClick('occupancy', 'Occupancy Excellence', '97.3%')}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(145deg, #ffffff 0%, #fdf4ff 100%)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(240,147,251,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(240,147,251,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(240,147,251,0.25)'
              }}>
                <Home size={22} style={{ color: 'white', strokeWidth: 2.5 }} />
              </div>
              <div style={{
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #d4f4dd 0%, #bbf7d0 100%)',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(34,197,94,0.15)'
              }}>
                <ArrowUpRight size={14} style={{ color: '#16a34a', strokeWidth: 3 }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>
                  3.2%
                </span>
              </div>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                color: '#0f172a', 
                margin: '0 0 4px 0',
                letterSpacing: '-0.5px'
              }}>
                97.3%
              </h3>
              <p style={{ 
                fontSize: '13px', 
                color: '#475569', 
                margin: 0, 
                fontWeight: '600',
                letterSpacing: '0.3px'
              }}>
                Occupancy Rate
              </p>
              <p style={{ 
                fontSize: '11px', 
                color: '#94a3b8', 
                margin: '2px 0 0 0',
                fontWeight: '500'
              }}>
                4,734 of 4,865 units
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI Efficiency Score - Premium Design */}
        <motion.div
          whileHover={{ scale: 1.03, y: -8, boxShadow: '0 25px 50px rgba(67,233,123,0.15)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleMetricClick('maintenance', 'AI Efficiency Score', '96.8%')}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(67,233,123,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(67,233,123,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(67,233,123,0.25)'
              }}>
                <Cpu size={22} style={{ color: 'white', strokeWidth: 2.5 }} />
              </div>
              <div style={{
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #d4f4dd 0%, #bbf7d0 100%)',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(34,197,94,0.15)'
              }}>
                <ArrowUpRight size={14} style={{ color: '#16a34a', strokeWidth: 3 }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>
                  12%
                </span>
              </div>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                color: '#0f172a', 
                margin: '0 0 4px 0',
                letterSpacing: '-0.5px'
              }}>
                96.8%
              </h3>
              <p style={{ 
                fontSize: '13px', 
                color: '#475569', 
                margin: 0, 
                fontWeight: '600',
                letterSpacing: '0.3px'
              }}>
                AI Efficiency
              </p>
              <p style={{ 
                fontSize: '11px', 
                color: '#94a3b8', 
                margin: '2px 0 0 0',
                fontWeight: '500'
              }}>
                $892K saved YTD
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tenant Satisfaction - Premium Design */}
        <motion.div
          whileHover={{ scale: 1.03, y: -8, boxShadow: '0 25px 50px rgba(255,215,0,0.15)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleMetricClick('tenantHappiness', 'Tenant Satisfaction', '4.9★')}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(145deg, #ffffff 0%, #fffef5 100%)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,215,0,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(255,215,0,0.25)'
              }}>
                <Star size={22} style={{ color: 'white', strokeWidth: 2.5 }} />
              </div>
              <div style={{
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #d4f4dd 0%, #bbf7d0 100%)',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(34,197,94,0.15)'
              }}>
                <ArrowUpRight size={14} style={{ color: '#16a34a', strokeWidth: 3 }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>
                  0.3
                </span>
              </div>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                color: '#0f172a', 
                margin: '0 0 4px 0',
                letterSpacing: '-0.5px'
              }}>
                4.9★
              </h3>
              <p style={{ 
                fontSize: '13px', 
                color: '#475569', 
                margin: 0, 
                fontWeight: '600',
                letterSpacing: '0.3px'
              }}>
                Tenant Rating
              </p>
              <p style={{ 
                fontSize: '11px', 
                color: '#94a3b8', 
                margin: '2px 0 0 0',
                fontWeight: '500'
              }}>
                98.7% satisfaction
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Section for PAM */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' }}>
          ⚡ Quick Management Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: Building, title: 'Properties', subtitle: 'Manage all', color: '#667eea', path: '/property-manager' },
            { icon: BarChart3, title: 'Analytics', subtitle: 'Performance', color: '#4ECDC4', path: '/analytics' },
            { icon: DollarSign, title: 'Financials', subtitle: 'Revenue & costs', color: '#10b981', path: '/financial' },
            { icon: Calendar, title: 'Scheduling', subtitle: 'Technicians', color: '#f59e0b', path: '/schedule-technician' },
            { icon: Users, title: 'Tenant Portal', subtitle: 'View as tenant', color: '#8b5cf6', path: '/tenant-portal' },
            { icon: Wrench, title: 'New Repair', subtitle: 'Create ticket', color: '#ef4444', path: '/new-repair' }
          ].map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: `${action.color}15`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <action.icon size={20} style={{ color: action.color }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                  {action.title}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                  {action.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.2fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Live Activity Feed - LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
              Live Activity Feed
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                background: '#22c55e',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>Live</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activityFeed.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: `4px solid ${
                    activity.type === 'success' ? '#22c55e' :
                    activity.type === 'warning' ? '#f59e0b' : '#3b82f6'
                  }`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                onClick={() => handleActivityClick(activity)}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: activity.type === 'success' ? '#d4f4dd' :
                             activity.type === 'warning' ? '#fef3c7' : '#dbeafe'
                }}>
                  <activity.icon size={20} style={{
                    color: activity.type === 'success' ? '#22c55e' :
                           activity.type === 'warning' ? '#f59e0b' : '#3b82f6'
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {activity.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    {activity.desc}
                  </p>
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewAllActivities}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            View All Activities
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>

        {/* Properties Overview - MIDDLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
              🏢 Properties Overview
            </h3>
            <button style={{
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handlePropertyClick(property)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                      {property.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {property.units} units • {property.occupied} occupied
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} style={{ color: '#ffd700' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
                      {property.rating}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Monthly Revenue</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>
                      ${(property.revenue / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <ChevronRight size={18} style={{ color: '#9ca3af' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Assistant - RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                AI Assistant
              </h3>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.9 }}>
                Your intelligent property advisor
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: Zap, title: 'Smart Prediction', desc: '3 units need maintenance soon', color: '#ffd700' },
              { icon: Target, title: 'Cost Optimization', desc: 'Save 15% on maintenance', color: '#22c55e' },
              { icon: TrendingUp, title: 'Revenue Forecast', desc: '8% growth expected', color: '#4ECDC4' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  x: 5
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <item.icon size={18} style={{ color: item.color }} />
                  <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '12px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={18} />
            Ask AI Assistant
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Advanced Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px'
      }}>
        {/* Real-time Performance */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            ⚡ Real-time Performance
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { label: 'DIY Resolution Rate', value: 79, color: '#667eea' },
              { label: 'Tenant Satisfaction', value: 92, color: '#22c55e' },
              { label: 'Cost Efficiency', value: 87, color: '#4ECDC4' }
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>{item.value}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      height: '100%',
                      background: item.color,
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            🚀 Quick Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: Plus, label: 'Add Property', color: '#667eea' },
              { icon: Users, label: 'New Tenant', color: '#22c55e' },
              { icon: Wrench, label: 'Schedule Repair', color: '#f59e0b' },
              { icon: BarChart3, label: 'View Analytics', color: '#4ECDC4' }
            ].map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '16px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <action.icon size={24} style={{ color: action.color }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            📅 Upcoming Tasks
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { 
                id: 'task_001',
                time: '10:00 AM', 
                task: 'Property inspection - Building A', 
                urgent: true,
                details: {
                  property: 'Sunset Towers Building A',
                  type: 'Quarterly Inspection',
                  units: ['A101', 'A102', 'A103', 'A104'],
                  inspector: 'Sarah Johnson',
                  duration: '2 hours',
                  checklist: ['Fire Safety', 'HVAC Systems', 'Plumbing', 'Electrical', 'Structural'],
                  lastInspection: '3 months ago',
                  notes: 'Focus on recent tenant complaints about water pressure'
                }
              },
              { 
                id: 'task_002',
                time: '2:00 PM', 
                task: 'Tenant meeting - Unit 45B', 
                urgent: false,
                details: {
                  tenant: 'Robert Martinez',
                  unit: '45B - Green Valley Complex',
                  purpose: 'Lease Renewal Discussion',
                  currentRent: '$2,850/month',
                  proposedRent: '$2,950/month',
                  tenantSince: 'March 2022',
                  paymentHistory: 'Excellent - Never late',
                  topics: ['Renewal terms', 'Parking space upgrade', 'Pet policy update'],
                  satisfaction: '4.8/5 rating'
                }
              },
              { 
                id: 'task_003',
                time: '4:30 PM', 
                task: 'Review maintenance reports', 
                urgent: false,
                details: {
                  reportCount: 23,
                  completed: 18,
                  pending: 5,
                  categories: {
                    'HVAC': 8,
                    'Plumbing': 6,
                    'Electrical': 4,
                    'Other': 5
                  },
                  avgCompletionTime: '3.2 hours',
                  costThisWeek: '$4,567',
                  criticalIssues: 2,
                  technicianPerformance: 'Above Average',
                  aiRecommendations: 'Schedule preventive maintenance for Units 12-18'
                }
              }
            ].map((task, index) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedTask(task);
                  setShowTaskModal(true);
                  toast.success(`Opening: ${task.task}`, { icon: '📋' });
                }}
                style={{
                  padding: '12px',
                  background: task.urgent ? '#fef2f2' : '#f9fafb',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${task.urgent ? '#ef4444' : '#3b82f6'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Clock size={16} style={{ color: task.urgent ? '#ef4444' : '#3b82f6' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                    {task.time}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                    {task.task}
                  </p>
                </div>
                <ChevronRight size={14} style={{ color: '#9ca3af' }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


      {/* Activity Details Modal - ULTRA PREMIUM */}
      <AnimatePresence>
        {showActivityModal && selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowActivityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #fafafa)',
                borderRadius: '32px',
                padding: '0',
                maxWidth: '700px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'hidden',
                boxShadow: `
                  0 50px 100px -20px rgba(0, 0, 0, 0.3),
                  0 30px 60px -30px rgba(0, 0, 0, 0.3),
                  inset 0 -2px 6px rgba(0, 0, 0, 0.1)
                `,
                border: '2px solid rgba(255, 255, 255, 0.9)',
                position: 'relative'
              }}
            >
              {/* Glowing Border Effect */}
              <div style={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: selectedActivity.type === 'success' 
                  ? 'linear-gradient(45deg, #22c55e, #16a34a, #22c55e)'
                  : selectedActivity.type === 'warning'
                  ? 'linear-gradient(45deg, #f59e0b, #d97706, #f59e0b)'
                  : 'linear-gradient(45deg, #3b82f6, #2563eb, #3b82f6)',
                borderRadius: '32px',
                opacity: 0.5,
                filter: 'blur(10px)',
                zIndex: -1,
                animation: 'glow 3s ease-in-out infinite'
              }} />
              
              {/* Modal Header with Gradient and Pattern */}
              <div style={{
                background: selectedActivity.type === 'success' 
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : selectedActivity.type === 'warning'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                padding: '28px 32px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <selectedActivity.icon size={28} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                        {selectedActivity.details.title}
                      </h2>
                      <p style={{ fontSize: '14px', opacity: 0.9, margin: '4px 0 0 0' }}>
                        {selectedActivity.time}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowActivityModal(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>
              
              {/* Modal Body with Better Layout */}
              <div style={{ padding: '32px', overflow: 'auto', maxHeight: 'calc(85vh - 120px)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {Object.entries(selectedActivity.details).map(([key, value], index) => {
                    if (key === 'title') return null;
                    
                    // Special handling for certain fields
                    const isImportant = ['cost', 'savedCost', 'rating', 'priority', 'monthlyRent'].includes(key);
                    const isFullWidth = ['resolution', 'diagnostics', 'tenantFeedback'].includes(key);
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          gridColumn: isFullWidth ? 'span 2' : 'span 1',
                          padding: '16px',
                          background: isImportant 
                            ? 'linear-gradient(135deg, #f0f9ff, #e0f2fe)'
                            : '#f9fafb',
                          borderRadius: '12px',
                          border: isImportant ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                        }}
                      >
                        <p style={{ 
                          fontSize: '12px', 
                          color: isImportant ? '#2563eb' : '#6b7280', 
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '600'
                        }}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p style={{ 
                          fontSize: isImportant ? '20px' : '15px', 
                          color: '#1a1a1a', 
                          fontWeight: isImportant ? 'bold' : '500',
                          margin: 0
                        }}>
                          {key === 'rating' && value ? '⭐'.repeat(value) : ''}
                          {Array.isArray(value) ? value.join(', ') : value}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Action Buttons */}
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                    }}
                  >
                    Take Action
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'white',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    View History
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Activities Modal - BLAZING FAST & GORGEOUS */}
      <AnimatePresence>
        {showAllActivities && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at center, rgba(102, 126, 234, 0.1), rgba(0, 0, 0, 0.9))',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowAllActivities(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                borderRadius: '24px',
                padding: '0',
                maxWidth: '850px',
                width: '90%',
                maxHeight: '85vh',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              {/* Enhanced Header */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                padding: '28px 32px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Activity size={28} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>
                        All Activities
                      </h2>
                      <p style={{ fontSize: '14px', opacity: 0.9, margin: '4px 0 0 0' }}>
                        Last 24 Hours • {getAllActivities().length} Total Events
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAllActivities(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                
                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                  {['All', 'Success', 'Warning', 'Info'].map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '8px 16px',
                        background: filter === 'All' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '20px',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Activity List */}
              <div style={{ 
                padding: '24px', 
                overflow: 'auto', 
                maxHeight: 'calc(85vh - 160px)',
                background: 'linear-gradient(to bottom, rgba(249, 250, 251, 0.5), rgba(255, 255, 255, 0.9))'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getAllActivities().map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.02, 0.3), duration: 0.2 }}
                      whileHover={{ scale: 1.01, x: 8 }}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '18px',
                        background: 'white',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        borderLeft: `5px solid ${
                          activity.type === 'success' ? '#22c55e' :
                          activity.type === 'warning' ? '#f59e0b' : '#3b82f6'
                        }`,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onClick={() => {
                        const details = getActivityDetails(activity.id);
                        if (details) {
                          setSelectedActivity({ ...activity, details });
                          setShowAllActivities(false);
                          setShowActivityModal(true);
                        }
                      }}
                    >
                      {/* Animated Background Gradient */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: -100,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, ${
                          activity.type === 'success' ? 'rgba(34, 197, 94, 0.1)' :
                          activity.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 
                          'rgba(59, 130, 246, 0.1)'
                        }, transparent)`,
                        transition: 'transform 0.3s',
                        transform: 'translateX(-100%)',
                        pointerEvents: 'none'
                      }} />
                      
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: activity.type === 'success' 
                            ? 'linear-gradient(135deg, #d4f4dd, #bbf7d0)' :
                            activity.type === 'warning' 
                            ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : 
                            'linear-gradient(135deg, #dbeafe, #bfdbfe)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <activity.icon size={22} style={{
                          color: activity.type === 'success' ? '#16a34a' :
                                 activity.type === 'warning' ? '#d97706' : '#2563eb'
                        }} />
                      </motion.div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontSize: '15px', 
                          fontWeight: '700', 
                          color: '#1a1a1a', 
                          margin: '0 0 6px 0',
                          letterSpacing: '-0.5px'
                        }}>
                          {activity.title}
                        </h4>
                        <p style={{ 
                          fontSize: '13px', 
                          color: '#64748b', 
                          margin: 0,
                          lineHeight: 1.4
                        }}>
                          {activity.desc}
                        </p>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-end',
                        gap: '4px'
                      }}>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#94a3b8', 
                          whiteSpace: 'nowrap',
                          fontWeight: '500'
                        }}>
                          {activity.time}
                        </span>
                        <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property Details Modal - ULTIMATE PREMIUM EDITION */}
      <AnimatePresence>
        {showPropertyModal && selectedProperty && selectedProperty.details && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2), rgba(0, 0, 0, 0.95))',
              backdropFilter: 'blur(40px) saturate(180%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowPropertyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                borderRadius: '28px',
                padding: '0',
                maxWidth: '750px',
                width: '90%',
                maxHeight: '88vh',
                overflow: 'hidden',
                boxShadow: '0 35px 70px -15px rgba(0, 0, 0, 0.35)',
                border: '2px solid rgba(255, 255, 255, 0.9)'
              }}
            >
              {/* Premium Property Header */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
                padding: '32px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Animated Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
                  animation: 'slide 20s linear infinite'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <Building size={32} />
                      </motion.div>
                      <div>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                          {selectedProperty.details?.name || selectedProperty.name}
                        </h2>
                        <p style={{ fontSize: '14px', opacity: 0.9, margin: '6px 0 0 0' }}>
                          📍 {selectedProperty.details?.address || 'Address not available'}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPropertyModal(false)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  
                  {/* Key Metrics Bar */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    marginTop: '24px'
                  }}>
                    {[
                      { label: 'Monthly Revenue', value: `$${((selectedProperty.details?.monthlyRevenue || selectedProperty.revenue || 0) / 1000).toFixed(0)}K`, icon: DollarSign },
                      { label: 'Occupancy', value: `${Math.round(((selectedProperty.details?.occupiedUnits || selectedProperty.occupied || 0) / (selectedProperty.details?.totalUnits || selectedProperty.units || 1)) * 100)}%`, icon: Home },
                      { label: 'Rating', value: `${selectedProperty.details?.rating || selectedProperty.rating || '4.5'} ⭐`, icon: Star },
                      { label: 'Cap Rate', value: selectedProperty.details?.capRate || '8.5%', icon: TrendingUp }
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          padding: '16px',
                          textAlign: 'center',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        <metric.icon size={20} style={{ opacity: 0.8, marginBottom: '8px' }} />
                        <p style={{ fontSize: '11px', opacity: 0.8, margin: '0 0 4px 0' }}>{metric.label}</p>
                        <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{metric.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Property Details Body */}
              <div style={{ padding: '32px', overflow: 'auto', maxHeight: 'calc(88vh - 240px)' }}>
                {/* Property Info Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {Object.entries(selectedProperty.details || {}).map(([key, value], index) => {
                    if (['name', 'address', 'monthlyRevenue', 'occupiedUnits', 'totalUnits', 'rating', 'capRate'].includes(key)) return null;
                    
                    const isHighlight = ['yearlyRevenue', 'netOperatingIncome', 'tenantSatisfaction'].includes(key);
                    const isList = Array.isArray(value);
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        style={{
                          padding: '18px',
                          background: isHighlight 
                            ? 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' 
                            : 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                          borderRadius: '14px',
                          border: isHighlight ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                          gridColumn: isList ? 'span 2' : 'span 1'
                        }}
                      >
                        <p style={{ 
                          fontSize: '12px', 
                          color: isHighlight ? '#2563eb' : '#64748b', 
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '600'
                        }}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p style={{ 
                          fontSize: isHighlight ? '18px' : '15px', 
                          color: '#1a1a1a', 
                          fontWeight: isHighlight ? 'bold' : '500',
                          margin: 0
                        }}>
                          {isList ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {value.map((item, i) => (
                                <span key={i} style={{
                                  padding: '4px 10px',
                                  background: 'white',
                                  borderRadius: '20px',
                                  fontSize: '13px',
                                  border: '1px solid #e5e7eb'
                                }}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : value}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/property-manager')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Settings size={18} />
                    Manage Property
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/analytics')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: 'white',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <BarChart3 size={18} />
                    View Analytics
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metric Details Modal - SUPER PREMIUM */}
      <AnimatePresence>
        {showMetricModal && selectedMetric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(102, 126, 234, 0.1))',
              backdropFilter: 'blur(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowMetricModal(false)}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotateX: -90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.3, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f9fafb)',
                borderRadius: '32px',
                padding: '0',
                maxWidth: '800px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'hidden',
                boxShadow: `
                  0 50px 100px -20px rgba(0, 0, 0, 0.5),
                  0 30px 60px -30px rgba(0, 0, 0, 0.4),
                  inset 0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
                position: 'relative'
              }}
            >
              {/* Animated Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1), transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1), transparent 50%)`,
                animation: 'float 20s ease-in-out infinite'
              }} />
              
              {/* Header */}
              <div style={{
                background: selectedMetric.trend === 'up' 
                  ? 'linear-gradient(135deg, #10b981, #059669)' 
                  : 'linear-gradient(135deg, #ef4444, #dc2626)',
                padding: '32px',
                color: 'white',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                      {selectedMetric.title}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                      <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                        {selectedMetric.displayValue || selectedMetric.current}
                      </span>
                      <div style={{
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {selectedMetric.trend === 'up' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>
                          {selectedMetric.change}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMetricModal(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '12px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>
              
              {/* Content */}
              <div style={{ padding: '32px', overflow: 'auto', maxHeight: 'calc(90vh - 150px)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  {Object.entries(selectedMetric).map(([key, value], index) => {
                    if (['title', 'displayValue', 'current', 'change', 'trend'].includes(key)) return null;
                    
                    const isObject = typeof value === 'object' && !Array.isArray(value);
                    const isArray = Array.isArray(value);
                    const isHighlight = ['savings', 'yearToDate', 'savedThisYear', 'monthlyTotal', 'score', 'totalValue'].includes(key);
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        style={{
                          gridColumn: isObject || isArray ? 'span 2' : 'span 1',
                          padding: '24px',
                          background: isHighlight 
                            ? 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' 
                            : 'linear-gradient(135deg, #ffffff, #f9fafb)',
                          borderRadius: '20px',
                          border: isHighlight ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <p style={{ 
                          fontSize: '14px', 
                          color: isHighlight ? '#2563eb' : '#6b7280', 
                          marginBottom: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </p>
                        {isObject ? (
                          <div style={{ display: 'grid', gap: '12px' }}>
                            {Object.entries(value).map(([k, v]) => (
                              <div key={k} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                background: 'white',
                                borderRadius: '8px'
                              }}>
                                <span style={{ fontSize: '14px', color: '#6b7280' }}>{k}</span>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                                  {typeof v === 'number' && !k.includes('Rate') && !k.includes('score') ? 
                                    (k.includes('Cost') || k.includes('Revenue') || k.includes('Saved') ? `$${v.toLocaleString()}` : v.toLocaleString()) : v}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : isArray ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {value.map((item, i) => (
                              <span key={i} style={{
                                padding: '6px 12px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white',
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '500'
                              }}>
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div style={{ 
                            fontSize: isHighlight ? '24px' : '18px', 
                            color: '#1a1a1a', 
                            fontWeight: isHighlight ? 'bold' : '600',
                            margin: 0
                          }}>
                            {typeof value === 'number' && !key.includes('Rate') && !key.includes('score') ? 
                              (key.includes('Cost') || key.includes('Revenue') || key.includes('Saved') || key.includes('savings') ? `$${value.toLocaleString()}` : value.toLocaleString()) : value}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Details Modal */}
      <AnimatePresence>
        {showTaskModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowTaskModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '28px',
                width: '90%',
                maxWidth: '600px',
                maxHeight: '85vh',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Task Modal Header */}
              <div style={{
                background: selectedTask.urgent 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                padding: '28px',
                color: 'white',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Calendar size={24} />
                      </div>
                      {selectedTask.urgent && (
                        <span style={{
                          padding: '4px 12px',
                          background: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '1px'
                        }}>
                          URGENT
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                      {selectedTask.task}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} />
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>
                        {selectedTask.time}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowTaskModal(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '10px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              
              {/* Task Modal Content */}
              <div style={{ padding: '28px', overflow: 'auto', maxHeight: 'calc(85vh - 120px)' }}>
                {selectedTask.details && (
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {Object.entries(selectedTask.details).map(([key, value], index) => {
                      const isObject = typeof value === 'object' && !Array.isArray(value);
                      const isArray = Array.isArray(value);
                      
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          style={{
                            padding: '20px',
                            background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <h4 style={{ 
                            fontSize: '14px', 
                            color: '#64748b', 
                            marginBottom: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '600'
                          }}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h4>
                          {isObject ? (
                            <div style={{ display: 'grid', gap: '8px' }}>
                              {Object.entries(value).map(([k, v]) => (
                                <div key={k} style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between',
                                  padding: '8px 12px',
                                  background: 'white',
                                  borderRadius: '8px'
                                }}>
                                  <span style={{ fontSize: '13px', color: '#64748b' }}>{k}</span>
                                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                                    {v}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : isArray ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {value.map((item, i) => (
                                <span key={i} style={{
                                  padding: '6px 12px',
                                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                  color: 'white',
                                  borderRadius: '20px',
                                  fontSize: '12px',
                                  fontWeight: '500'
                                }}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div style={{ 
                              fontSize: '16px', 
                              color: '#0f172a', 
                              fontWeight: '500'
                            }}>
                              {value}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                    
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: '14px',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                        }}
                        onClick={() => {
                          toast.success('Task marked as complete!', { icon: '✅' });
                          setShowTaskModal(false);
                        }}
                      >
                        Mark Complete
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: '14px',
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
                        }}
                        onClick={() => {
                          toast.success('Task rescheduled!', { icon: '📅' });
                          setShowTaskModal(false);
                        }}
                      >
                        Reschedule
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }
        @keyframes glow {
          0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </motion.div>
  );
};

export default ManagerDashboard;