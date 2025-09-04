import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, Truck, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, MapPin, Activity, BarChart3,
  Settings, Bell, Filter, Search, Plus, Eye,
  Wrench, Calendar, Star, Shield, Zap, Award,
  DollarSign, Building, Wrench as Tool, Target, Gauge,
  TrendingDown, ChevronRight, ArrowUpRight,
  ArrowDownRight, Sparkles, Camera, Download,
  Share2, RefreshCw, Info, FileText, Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

const EnhancedPropertyManager = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    truckRollsMinimized: 0,
    moneySaved: 0,
    diyResolutionRate: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    loadDashboardData();
    startRealTimeUpdates();
    
    // Welcome effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
      });
      toast.success('DIY Hero Manager Dashboard Ready!', {
        icon: '🏢',
        duration: 3000
      });
    }, 500);
  }, []);

  const loadDashboardData = () => {
    // Enhanced Properties with DIY metrics
    const props = [
      { 
        id: 1, 
        name: 'Sunset Apartments', 
        units: 48, 
        occupied: 45, 
        revenue: 135000,
        truckRollsSaved: 23,
        moneySavedMonth: 8750,
        diySuccessRate: 82,
        rating: 4.8, 
        status: 'excellent',
        address: '123 Sunset Blvd',
        issues: { total: 15, diy: 12, tech: 3 },
        tenantDiyPoints: 4500
      },
      {
        id: 2,
        name: 'Green Valley Complex',
        units: 36,
        occupied: 34,
        revenue: 102000,
        truckRollsSaved: 18,
        moneySavedMonth: 6400,
        diySuccessRate: 75,
        rating: 4.6,
        status: 'good',
        address: '456 Valley Road',
        issues: { total: 22, diy: 16, tech: 6 },
        tenantDiyPoints: 3200
      },
      {
        id: 3,
        name: 'Downtown Towers',
        units: 120,
        occupied: 115,
        revenue: 345000,
        truckRollsSaved: 67,
        moneySavedMonth: 24500,
        diySuccessRate: 88,
        rating: 4.9,
        status: 'excellent',
        address: '789 Main Street',
        issues: { total: 45, diy: 39, tech: 6 },
        tenantDiyPoints: 12800
      },
      {
        id: 4,
        name: 'Park View Residences',
        units: 64,
        occupied: 58,
        revenue: 174000,
        truckRollsSaved: 31,
        moneySavedMonth: 11200,
        diySuccessRate: 71,
        rating: 4.5,
        status: 'attention',
        address: '321 Park Ave',
        issues: { total: 38, diy: 25, tech: 13 },
        tenantDiyPoints: 5600
      },
      {
        id: 5,
        name: 'Harbor Heights',
        units: 80,
        occupied: 76,
        revenue: 228000,
        truckRollsSaved: 42,
        moneySavedMonth: 15600,
        diySuccessRate: 79,
        rating: 4.7,
        status: 'good',
        address: '654 Harbor Dr',
        issues: { total: 28, diy: 22, tech: 6 },
        tenantDiyPoints: 7200
      }
    ];
    setProperties(props);

    // Maintenance Requests with DIY tracking
    const requests = [];
    const types = ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'General'];
    const priorities = ['urgent', 'high', 'medium', 'low'];
    const resolutionTypes = ['DIY Resolved', 'DIY In Progress', 'Tech Required', 'Scheduled'];
    
    for (let i = 0; i < 25; i++) {
      requests.push({
        id: i + 1,
        property: props[i % 5].name,
        unit: `${100 + Math.floor(Math.random() * 50)}`,
        type: types[Math.floor(Math.random() * types.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        resolution: resolutionTypes[Math.floor(Math.random() * resolutionTypes.length)],
        tenant: `Tenant ${i + 1}`,
        created: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        description: [
          'Leak under sink', 
          'AC not cooling', 
          'Outlet not working', 
          'Dishwasher broken',
          'Door lock jammed',
          'Toilet running',
          'Light fixture flickering'
        ][i % 7],
        diyAttempted: Math.random() > 0.3,
        costSaved: Math.floor(Math.random() * 500)
      });
    }
    setMaintenanceRequests(requests);

    // Enhanced Analytics
    setAnalytics({
      totalRevenue: 984000,
      monthlyGrowth: 12.5,
      occupancyRate: 94.2,
      truckRollsMinimized: 181,
      moneySavedTotal: 66450,
      diyResolutionRate: 78,
      avgResponseTime: '1.8 hours',
      satisfactionScore: 4.8,
      maintenanceCostReduction: 42,
      tenantEngagement: 87,
      chartData: {
        savings: [
          { month: 'Jan', saved: 8500, trucks: 23 },
          { month: 'Feb', saved: 9200, trucks: 25 },
          { month: 'Mar', saved: 10100, trucks: 28 },
          { month: 'Apr', saved: 11300, trucks: 31 },
          { month: 'May', saved: 12800, trucks: 35 },
          { month: 'Jun', saved: 14500, trucks: 39 }
        ],
        resolutions: [
          { name: 'DIY Resolved', value: 68, color: '#22c55e' },
          { name: 'Tech Called', value: 22, color: '#f59e0b' },
          { name: 'In Progress', value: 10, color: '#3b82f6' }
        ],
        performance: [
          { property: 'Sunset', diy: 82, satisfaction: 88, savings: 75 },
          { property: 'Green Valley', diy: 75, satisfaction: 85, savings: 68 },
          { property: 'Downtown', diy: 88, satisfaction: 92, savings: 85 },
          { property: 'Park View', diy: 71, satisfaction: 78, savings: 62 },
          { property: 'Harbor', diy: 79, satisfaction: 84, savings: 72 }
        ]
      }
    });
  };

  const startRealTimeUpdates = () => {
    setInterval(() => {
      setRealTimeMetrics(prev => ({
        truckRollsMinimized: prev.truckRollsMinimized + Math.floor(Math.random() * 2),
        moneySaved: prev.moneySaved + Math.floor(Math.random() * 200),
        diyResolutionRate: Math.min(100, prev.diyResolutionRate + Math.random() * 2),
        avgResponseTime: Math.max(0.5, prev.avgResponseTime - Math.random() * 0.1)
      }));
    }, 5000);
  };

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: '100px',
        height: '100px',
        background: color,
        borderRadius: '50%',
        opacity: 0.1
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: color,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={24} style={{ color: 'white' }} />
          </div>
          
          {change && (
            <div style={{
              padding: '4px 8px',
              background: change > 0 ? '#d4f4dd' : '#ffd4d4',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {change > 0 ? 
                <ArrowUpRight size={14} style={{ color: '#22c55e' }} /> :
                <ArrowDownRight size={14} style={{ color: '#ef4444' }} />
              }
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: change > 0 ? '#22c55e' : '#ef4444'
              }}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        
        <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
          {value}
        </h3>
        <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 4px 0', fontWeight: '600' }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '24px'
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' }}>
              🏢 DIY Hero Property Manager
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Maximize efficiency with DIY resolution tracking
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/photo-capture')}
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Camera size={18} />
              AI Photo Analysis
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '12px 20px',
                background: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <MetricCard
          title="Truck Rolls Minimized"
          value={analytics.truckRollsMinimized || 0}
          change={18}
          icon={Truck}
          color="linear-gradient(135deg, #FF6B6B, #FF8E53)"
          subtitle="This month"
        />
        <MetricCard
          title="Money Saved"
          value={`$${(analytics.moneySavedTotal || 0).toLocaleString()}`}
          change={24}
          icon={DollarSign}
          color="linear-gradient(135deg, #4ECDC4, #44A08D)"
          subtitle="Through DIY resolutions"
        />
        <MetricCard
          title="DIY Resolution Rate"
          value={`${analytics.diyResolutionRate || 0}%`}
          change={12}
          icon={Tool}
          color="linear-gradient(135deg, #667eea, #764ba2)"
          subtitle="Issues resolved by tenants"
        />
        <MetricCard
          title="Avg Response Time"
          value={analytics.avgResponseTime || '0'}
          change={-15}
          icon={Clock}
          color="linear-gradient(135deg, #f093fb, #f5576c)"
          subtitle="For critical issues"
        />
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Savings Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            💰 Monthly Savings Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analytics.chartData?.savings || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="saved"
                stroke="#4ECDC4"
                fill="url(#savingsGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ECDC4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4ECDC4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Resolution Types */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            🔧 Resolution Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.chartData?.resolutions || []}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {(analytics.chartData?.resolutions || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Properties Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            🏠 Property Performance
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                padding: '8px 16px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Filter size={16} />
              Filter
            </button>
            <button
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={16} />
              Add Property
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {properties.map((property) => (
            <motion.div
              key={property.id}
              whileHover={{ y: -5 }}
              style={{
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'linear-gradient(135deg, #ffffff, #f9fafb)'
              }}
              onClick={() => setSelectedProperty(property)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {property.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    {property.units} units • {property.occupied} occupied
                  </p>
                </div>
                <div style={{
                  padding: '4px 8px',
                  background: property.status === 'excellent' ? '#d4f4dd' :
                             property.status === 'good' ? '#fef3c7' : '#ffd4d4',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: property.status === 'excellent' ? '#22c55e' :
                         property.status === 'good' ? '#f59e0b' : '#ef4444'
                }}>
                  {property.status.toUpperCase()}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  padding: '12px',
                  background: '#f3f4f6',
                  borderRadius: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Truck size={14} style={{ color: '#FF6B6B' }} />
                    <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>
                      Truck Rolls Saved
                    </span>
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                    {property.truckRollsSaved}
                  </p>
                </div>
                <div style={{
                  padding: '12px',
                  background: '#f3f4f6',
                  borderRadius: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <DollarSign size={14} style={{ color: '#4ECDC4' }} />
                    <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>
                      Monthly Saved
                    </span>
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                    ${property.moneySavedMonth.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* DIY Success Meter */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>DIY Success Rate</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#667eea' }}>
                    {property.diySuccessRate}%
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  background: '#e5e7eb',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${property.diySuccessRate}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    {property.tenantDiyPoints} DIY Points
                  </span>
                </div>
                <ChevronRight size={18} style={{ color: '#9ca3af' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Maintenance Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          marginTop: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            🔧 Recent Maintenance Requests
          </h3>
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '4px',
            background: '#f3f4f6',
            borderRadius: '8px'
          }}>
            {['All', 'DIY Active', 'Tech Required', 'Resolved'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterStatus(filter.toLowerCase())}
                style={{
                  padding: '6px 12px',
                  background: filterStatus === filter.toLowerCase() ? 'white' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: filterStatus === filter.toLowerCase() ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  PROPERTY
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  UNIT
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  ISSUE
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  STATUS
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  PRIORITY
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  COST SAVED
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRequests.slice(0, 8).map((request) => (
                <tr key={request.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#1a1a1a' }}>
                    {request.property}
                  </td>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#1a1a1a' }}>
                    #{request.unit}
                  </td>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#1a1a1a' }}>
                    {request.description}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: request.resolution === 'DIY Resolved' ? '#d4f4dd' :
                                 request.resolution === 'DIY In Progress' ? '#e0e7ff' :
                                 request.resolution === 'Tech Required' ? '#fef3c7' : '#f3f4f6',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: request.resolution === 'DIY Resolved' ? '#22c55e' :
                             request.resolution === 'DIY In Progress' ? '#4f46e5' :
                             request.resolution === 'Tech Required' ? '#f59e0b' : '#6b7280'
                    }}>
                      {request.resolution}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: request.priority === 'urgent' ? '#fef2f2' :
                                 request.priority === 'high' ? '#fef3c7' :
                                 request.priority === 'medium' ? '#e0e7ff' : '#f3f4f6',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: request.priority === 'urgent' ? '#dc2626' :
                             request.priority === 'high' ? '#f59e0b' :
                             request.priority === 'medium' ? '#4f46e5' : '#6b7280'
                    }}>
                      {request.priority.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>
                    {request.diyAttempted ? `$${request.costSaved}` : '-'}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          padding: '6px',
                          background: 'transparent',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Eye size={14} style={{ color: '#6b7280' }} />
                      </button>
                      <button
                        style={{
                          padding: '6px',
                          background: 'transparent',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Share2 size={14} style={{ color: '#6b7280' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedPropertyManager;