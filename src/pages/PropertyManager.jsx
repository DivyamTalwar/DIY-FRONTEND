import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, DollarSign, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, MapPin, Activity, BarChart3,
  Settings, Bell, Filter, Search, Plus, Eye,
  Wrench, Calendar, Star, Shield, Zap, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import mockApi from '../services/mockApi';
import toast from 'react-hot-toast';
import './PropertyManager.css';

const PropertyManager = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [liveActivity, setLiveActivity] = useState([]);
  const [performanceScore, setPerformanceScore] = useState(92);

  useEffect(() => {
    loadDashboardData();
    startLiveUpdates();
  }, []);

  const loadDashboardData = async () => {
    const data = await mockApi.getPropertyData();
    setProperties(generateProperties());
    setMaintenanceRequests(generateMaintenanceRequests());
    setTenants(generateTenants());
    setAnalytics(generateAnalytics());
  };

  const generateProperties = () => {
    return [
      { id: 1, name: 'Sunset Apartments', units: 24, occupied: 22, revenue: 48500, rating: 4.8, status: 'excellent', address: '123 Sunset Blvd', issues: 2 },
      { id: 2, name: 'Green Valley Complex', units: 36, occupied: 34, revenue: 72300, rating: 4.6, status: 'good', address: '456 Valley Road', issues: 5 },
      { id: 3, name: 'Downtown Lofts', units: 18, occupied: 18, revenue: 54000, rating: 4.9, status: 'excellent', address: '789 Main Street', issues: 1 },
      { id: 4, name: 'Park View Residences', units: 42, occupied: 38, revenue: 86400, rating: 4.5, status: 'attention', address: '321 Park Ave', issues: 8 },
      { id: 5, name: 'Harbor Heights', units: 30, occupied: 28, revenue: 65000, rating: 4.7, status: 'good', address: '654 Harbor Dr', issues: 3 }
    ];
  };

  const generateMaintenanceRequests = () => {
    const requests = [];
    const types = ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'General'];
    const priorities = ['urgent', 'high', 'medium', 'low'];
    const statuses = ['pending', 'in-progress', 'scheduled', 'completed'];
    
    for (let i = 0; i < 15; i++) {
      requests.push({
        id: i + 1,
        property: ['Sunset Apartments', 'Green Valley Complex', 'Downtown Lofts'][i % 3],
        unit: `${Math.floor(Math.random() * 100) + 100}`,
        type: types[Math.floor(Math.random() * types.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        tenant: `Tenant ${i + 1}`,
        created: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        description: ['Leak under sink', 'AC not cooling', 'Outlet not working', 'Dishwasher broken'][i % 4]
      });
    }
    return requests;
  };

  const generateTenants = () => {
    const tenants = [];
    for (let i = 0; i < 20; i++) {
      tenants.push({
        id: i + 1,
        name: `John Doe ${i + 1}`,
        unit: `${Math.floor(Math.random() * 100) + 100}`,
        property: ['Sunset Apartments', 'Green Valley Complex', 'Downtown Lofts'][i % 3],
        leaseEnd: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        rentStatus: Math.random() > 0.2 ? 'paid' : 'pending',
        satisfaction: 3 + Math.random() * 2,
        monthlyRent: 1500 + Math.floor(Math.random() * 1500)
      });
    }
    return tenants;
  };

  const generateAnalytics = () => {
    return {
      totalRevenue: 326200,
      monthlyGrowth: 8.5,
      occupancyRate: 92,
      avgResponseTime: '2.5 hours',
      satisfactionScore: 4.7,
      maintenanceCost: 18500,
      collectionsRate: 98.2,
      renewalRate: 85
    };
  };

  const startLiveUpdates = () => {
    const interval = setInterval(() => {
      const activities = [
        '🔧 Maintenance completed at Unit 204',
        '💰 Rent payment received from Unit 318',
        '📝 New lease signed for Unit 105',
        '⭐ 5-star review from Tenant Johnson',
        '🚨 Urgent request from Unit 412',
        '✅ Inspection passed at Building C'
      ];
      setLiveActivity(prev => [
        { text: activities[Math.floor(Math.random() * activities.length)], time: new Date() },
        ...prev
      ].slice(0, 5));
    }, 5000);
    return () => clearInterval(interval);
  };

  const handleQuickAction = (action) => {
    toast.success(`${action} initiated successfully!`);
    if (action === 'Schedule Maintenance') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'attention': return '#f59e0b';
      case 'urgent': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'urgent': return <AlertTriangle size={16} color="#ef4444" />;
      case 'high': return <Zap size={16} color="#f59e0b" />;
      case 'medium': return <Activity size={16} color="#3b82f6" />;
      case 'low': return <Clock size={16} color="#6b7280" />;
      default: return null;
    }
  };

  return (
    <div className="property-manager-container">
      <motion.div 
        className="pm-background"
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="pm-content">
        <motion.div 
          className="pm-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-left">
            <h1>
              <Home className="header-icon" />
              Property Command Center
            </h1>
            <p>Managing {properties.length} properties • {tenants.length} tenants</p>
          </div>
          
          <div className="header-right">
            <div className="performance-badge">
              <Shield size={20} />
              <div>
                <div className="performance-score">{performanceScore}%</div>
                <div className="performance-label">Health Score</div>
              </div>
            </div>
            <motion.button 
              className="add-property-btn"
              onClick={() => setShowAddProperty(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Add Property
            </motion.button>
          </div>
        </motion.div>

        <div className="view-tabs">
          {['overview', 'properties', 'maintenance', 'tenants', 'analytics'].map(view => (
            <motion.button
              key={view}
              className={`view-tab ${activeView === view ? 'active' : ''}`}
              onClick={() => setActiveView(view)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {view === 'overview' && <BarChart3 size={18} />}
              {view === 'properties' && <Home size={18} />}
              {view === 'maintenance' && <Wrench size={18} />}
              {view === 'tenants' && <Users size={18} />}
              {view === 'analytics' && <TrendingUp size={18} />}
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              className="view-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="stats-grid">
                <motion.div 
                  className="stat-card revenue"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="stat-icon">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">${analytics.totalRevenue.toLocaleString()}</div>
                    <div className="stat-label">Monthly Revenue</div>
                    <div className="stat-change positive">
                      <TrendingUp size={16} />
                      +{analytics.monthlyGrowth}%
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="stat-card occupancy"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.occupancyRate}%</div>
                    <div className="stat-label">Occupancy Rate</div>
                    <div className="stat-progress">
                      <div className="progress-bar" style={{ width: `${analytics.occupancyRate}%` }} />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="stat-card satisfaction"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="stat-icon">
                    <Star size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.satisfactionScore}</div>
                    <div className="stat-label">Satisfaction Score</div>
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.floor(analytics.satisfactionScore) ? '#fbbf24' : 'none'}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="stat-card response"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="stat-icon">
                    <Clock size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.avgResponseTime}</div>
                    <div className="stat-label">Avg Response Time</div>
                    <div className="stat-badge excellent">Excellent</div>
                  </div>
                </motion.div>
              </div>

              <div className="dashboard-grid">
                <div className="quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    {[
                      { icon: Wrench, label: 'Schedule Maintenance', color: '#3b82f6' },
                      { icon: Users, label: 'Add Tenant', color: '#10b981' },
                      { icon: Bell, label: 'Send Notice', color: '#f59e0b' },
                      { icon: Calendar, label: 'Schedule Inspection', color: '#8b5cf6' }
                    ].map((action, i) => (
                      <motion.button
                        key={i}
                        className="action-btn"
                        onClick={() => handleQuickAction(action.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ borderColor: action.color }}
                      >
                        <action.icon size={20} style={{ color: action.color }} />
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="live-activity-feed">
                  <h3>Live Activity</h3>
                  <div className="activity-list">
                    <AnimatePresence>
                      {liveActivity.map((activity, i) => (
                        <motion.div
                          key={`${activity.text}-${i}`}
                          className="activity-item"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                        >
                          <span className="activity-dot" />
                          <div className="activity-content">
                            <div className="activity-text">{activity.text}</div>
                            <div className="activity-time">
                              {activity.time.toLocaleTimeString()}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="properties-overview">
                <h3>Properties Overview</h3>
                <div className="properties-grid">
                  {properties.map((property, i) => (
                    <motion.div
                      key={property.id}
                      className="property-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="property-header">
                        <h4>{property.name}</h4>
                        <div 
                          className="property-status"
                          style={{ background: getStatusColor(property.status) }}
                        >
                          {property.status}
                        </div>
                      </div>
                      <div className="property-stats">
                        <div className="property-stat">
                          <Users size={16} />
                          <span>{property.occupied}/{property.units} units</span>
                        </div>
                        <div className="property-stat">
                          <DollarSign size={16} />
                          <span>${property.revenue.toLocaleString()}</span>
                        </div>
                        <div className="property-stat">
                          <Star size={16} />
                          <span>{property.rating}</span>
                        </div>
                        {property.issues > 0 && (
                          <div className="property-stat issues">
                            <AlertTriangle size={16} />
                            <span>{property.issues} issues</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'maintenance' && (
            <motion.div
              key="maintenance"
              className="view-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="maintenance-header">
                <h2>Maintenance Requests</h2>
                <div className="maintenance-controls">
                  <div className="search-box">
                    <Search size={20} />
                    <input 
                      type="text"
                      placeholder="Search requests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select 
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="maintenance-table">
                <table>
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Property</th>
                      <th>Unit</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Tenant</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceRequests
                      .filter(req => filterStatus === 'all' || req.status === filterStatus)
                      .filter(req => 
                        searchQuery === '' || 
                        req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        req.property.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((request, i) => (
                        <motion.tr
                          key={request.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <td>{getPriorityIcon(request.priority)}</td>
                          <td>{request.property}</td>
                          <td>{request.unit}</td>
                          <td>{request.type}</td>
                          <td>{request.description}</td>
                          <td>{request.tenant}</td>
                          <td>{request.created}</td>
                          <td>
                            <span className={`status-badge ${request.status}`}>
                              {request.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="view-btn">
                                <Eye size={16} />
                              </button>
                              <button className="assign-btn">
                                <Users size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeView === 'tenants' && (
            <motion.div
              key="tenants"
              className="view-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="tenants-header">
                <h2>Tenant Management</h2>
                <div className="tenant-stats">
                  <div className="tenant-stat">
                    <CheckCircle size={20} color="#10b981" />
                    <span>{tenants.filter(t => t.rentStatus === 'paid').length} Paid</span>
                  </div>
                  <div className="tenant-stat">
                    <Clock size={20} color="#f59e0b" />
                    <span>{tenants.filter(t => t.rentStatus === 'pending').length} Pending</span>
                  </div>
                </div>
              </div>

              <div className="tenants-grid">
                {tenants.map((tenant, i) => (
                  <motion.div
                    key={tenant.id}
                    className="tenant-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="tenant-header">
                      <div className="tenant-avatar">
                        <Users size={24} />
                      </div>
                      <div className="tenant-info">
                        <h4>{tenant.name}</h4>
                        <p>Unit {tenant.unit} • {tenant.property}</p>
                      </div>
                    </div>
                    <div className="tenant-details">
                      <div className="tenant-detail">
                        <span className="detail-label">Monthly Rent</span>
                        <span className="detail-value">${tenant.monthlyRent}</span>
                      </div>
                      <div className="tenant-detail">
                        <span className="detail-label">Lease Ends</span>
                        <span className="detail-value">{tenant.leaseEnd}</span>
                      </div>
                      <div className="tenant-detail">
                        <span className="detail-label">Payment Status</span>
                        <span className={`payment-status ${tenant.rentStatus}`}>
                          {tenant.rentStatus === 'paid' ? <CheckCircle size={16} /> : <Clock size={16} />}
                          {tenant.rentStatus}
                        </span>
                      </div>
                      <div className="tenant-detail">
                        <span className="detail-label">Satisfaction</span>
                        <div className="satisfaction-stars">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j}
                              size={14}
                              fill={j < Math.floor(tenant.satisfaction) ? '#fbbf24' : 'none'}
                              color="#fbbf24"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="tenant-actions">
                      <button className="message-btn">Message</button>
                      <button className="renew-btn">Renew Lease</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'analytics' && (
            <motion.div
              key="analytics"
              className="view-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Performance Analytics</h2>
              
              <div className="analytics-grid">
                <motion.div 
                  className="analytics-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3>Revenue Trend</h3>
                  <div className="chart-placeholder">
                    <div className="chart-bar" style={{ height: '60%' }} />
                    <div className="chart-bar" style={{ height: '75%' }} />
                    <div className="chart-bar" style={{ height: '85%' }} />
                    <div className="chart-bar" style={{ height: '70%' }} />
                    <div className="chart-bar" style={{ height: '90%' }} />
                    <div className="chart-bar" style={{ height: '100%' }} />
                  </div>
                  <div className="chart-legend">
                    <span>Last 6 Months</span>
                    <span className="trend-up">+12.5%</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="analytics-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3>Occupancy by Property</h3>
                  <div className="occupancy-list">
                    {properties.map(property => (
                      <div key={property.id} className="occupancy-item">
                        <span className="property-name">{property.name}</span>
                        <div className="occupancy-bar">
                          <div 
                            className="occupancy-fill"
                            style={{ width: `${(property.occupied / property.units) * 100}%` }}
                          />
                        </div>
                        <span className="occupancy-percent">
                          {Math.round((property.occupied / property.units) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="analytics-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3>Key Metrics</h3>
                  <div className="metrics-list">
                    <div className="metric-item">
                      <Award size={20} color="#10b981" />
                      <div className="metric-info">
                        <span className="metric-label">Collection Rate</span>
                        <span className="metric-value">{analytics.collectionsRate}%</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <TrendingUp size={20} color="#3b82f6" />
                      <div className="metric-info">
                        <span className="metric-label">Renewal Rate</span>
                        <span className="metric-value">{analytics.renewalRate}%</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <DollarSign size={20} color="#f59e0b" />
                      <div className="metric-info">
                        <span className="metric-label">Maintenance Cost</span>
                        <span className="metric-value">${analytics.maintenanceCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyManager;