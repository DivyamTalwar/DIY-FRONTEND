import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Activity, BarChart3, Building, Wrench, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight, Zap, Shield, Award,
  Target, Cpu, Globe, Layers, BookOpen, MessageSquare, Phone,
  Video, Settings, LogOut, Menu, X, Search, Filter, Download,
  Star, Heart, ThumbsUp, Eye, Share2, Info, HelpCircle, Map,
  Package, Truck, CreditCard, PieChart, Database, Cloud, Lock,
  Smartphone, Monitor, Wifi, Battery, Mic, Camera, Paperclip, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import enhancedAPI from '../services/advancedMockData';

function UltraModernDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    ongoingRepairs: 89,
    revenue: 458923,
    satisfaction: 4.7
  });
  const [notifications, setNotifications] = useState([]);
  const [showCommandCenter, setShowCommandCenter] = useState(false);
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
    startRealTimeUpdates();
    
    // Welcome animation
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await enhancedAPI.getProperties();
      setProperties(data.data.slice(0, 6));
      
      // Simulate notifications
      setNotifications([
        { id: 1, type: 'success', message: 'New tenant onboarded successfully', time: '2 min ago', icon: Users },
        { id: 2, type: 'warning', message: 'Maintenance required at Building A', time: '5 min ago', icon: AlertTriangle },
        { id: 3, type: 'info', message: 'Monthly report ready for download', time: '10 min ago', icon: Download },
        { id: 4, type: 'success', message: 'Payment received from Unit 12B', time: '15 min ago', icon: DollarSign }
      ]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const startRealTimeUpdates = () => {
    setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        ongoingRepairs: prev.ongoingRepairs + Math.floor(Math.random() * 3 - 1),
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 200),
        satisfaction: Math.min(5, Math.max(4, prev.satisfaction + (Math.random() * 0.1 - 0.05)))
      }));
    }, 3000);
  };

  const heroMetrics = [
    {
      title: 'Total Revenue',
      value: '$4.2M',
      change: '+32.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-green-600',
      description: 'Year to date',
      sparkData: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90]
    },
    {
      title: 'Active Properties',
      value: '127',
      change: '+12',
      trend: 'up',
      icon: Building,
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-600',
      description: 'Across 8 cities',
      sparkData: [100, 105, 110, 108, 115, 118, 122, 125, 127]
    },
    {
      title: 'Occupancy Rate',
      value: '94.8%',
      change: '+2.3%',
      trend: 'up',
      icon: Home,
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-600',
      description: '2,847 units occupied',
      sparkData: [88, 89, 90, 91, 92, 92, 93, 94, 94.8]
    },
    {
      title: 'Maintenance Efficiency',
      value: '92%',
      change: '+8%',
      trend: 'up',
      icon: Wrench,
      color: 'orange',
      bgGradient: 'from-orange-500 to-red-600',
      description: 'Same-day resolution',
      sparkData: [75, 78, 80, 82, 85, 87, 89, 91, 92]
    }
  ];

  const quickActions = [
    { icon: Plus, label: 'New Repair', color: 'bg-purple-500', path: '/new-repair' },
    { icon: Users, label: 'Add Tenant', color: 'bg-blue-500', path: '/tenant-portal' },
    { icon: DollarSign, label: 'Payments', color: 'bg-green-500', path: '/financial' },
    { icon: BarChart3, label: 'Analytics', color: 'bg-orange-500', path: '/analytics' },
    { icon: Calendar, label: 'Schedule', color: 'bg-pink-500', path: '/schedule-technician' },
    { icon: Shield, label: 'Security', color: 'bg-red-500', path: '/property-manager' }
  ];

  const activityFeed = [
    { type: 'success', title: 'Maintenance Completed', desc: 'Unit 12B - Water heater replaced', time: 'Just now', icon: CheckCircle },
    { type: 'warning', title: 'Urgent Request', desc: 'Unit 8A - AC not working', time: '2 min ago', icon: AlertTriangle },
    { type: 'info', title: 'New Tenant', desc: 'Sarah Johnson moved into Unit 15C', time: '5 min ago', icon: Users },
    { type: 'success', title: 'Payment Received', desc: '$2,500 from Unit 10D', time: '8 min ago', icon: DollarSign },
    { type: 'info', title: 'Inspection Scheduled', desc: 'Building C - March 15, 2024', time: '12 min ago', icon: Calendar },
    { type: 'success', title: 'Issue Resolved', desc: 'Parking complaint at Building A', time: '15 min ago', icon: CheckCircle }
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Loading Dashboard
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Preparing your workspace...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f8f9fa',
      width: '100%'
    }}>
      {/* Modern Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Menu size={24} style={{ color: '#495057' }} />
            </button>
            
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Home size={24} style={{ color: 'white' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#212529', margin: 0 }}>
                  DIY Heroes
                </h1>
                <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
                  Property Management System
                </p>
              </div>
            </div>
          </div>

          {/* Center Search */}
          <div style={{
            flex: 1,
            maxWidth: '500px',
            margin: '0 32px'
          }}>
            <div style={{
              position: 'relative',
              width: '100%'
            }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d'
              }} />
              <input
                type="text"
                placeholder="Search properties, tenants, or tasks..."
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  background: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dee2e6';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Notifications */}
            <button style={{
              position: 'relative',
              padding: '8px',
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={20} style={{ color: '#495057' }} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '12px',
                height: '12px',
                background: '#dc3545',
                borderRadius: '50%',
                border: '2px solid white'
              }} />
            </button>

            {/* User Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              background: '#f8f9fa',
              borderRadius: '12px',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                JD
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#212529' }}>
                  John Doe
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#6c757d' }}>
                  Administrator
                </p>
              </div>
              <ChevronRight size={16} style={{ color: '#6c757d' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#212529',
            marginBottom: '8px'
          }}>
            Welcome back, John! 👋
          </h1>
          <p style={{ fontSize: '16px', color: '#6c757d' }}>
            Here's your property empire overview for today
          </p>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {heroMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e9ecef',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `linear-gradient(135deg, ${metric.bgGradient.replace('from-', '').replace('to-', ',').replace('-500', '').replace('-600', '')})`,
                opacity: 0.1,
                borderRadius: '50%',
                transform: 'translate(30%, -30%)'
              }} />

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: `linear-gradient(135deg, ${metric.bgGradient.replace('from-', '').replace('to-', ',').replace('-500', '').replace('-600', '')})`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <metric.icon size={24} style={{ color: 'white' }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    background: metric.trend === 'up' ? '#d1f4e0' : '#ffd4d4',
                    borderRadius: '8px'
                  }}>
                    {metric.trend === 'up' ? 
                      <ArrowUpRight size={16} style={{ color: '#28a745' }} /> : 
                      <ArrowDownRight size={16} style={{ color: '#dc3545' }} />
                    }
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: metric.trend === 'up' ? '#28a745' : '#dc3545'
                    }}>
                      {metric.change}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212529', margin: '0 0 4px 0' }}>
                    {metric.value}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6c757d', margin: '0 0 4px 0' }}>
                    {metric.title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#adb5bd', margin: 0 }}>
                    {metric.description}
                  </p>
                </div>

                {/* Mini Chart */}
                <div style={{ marginTop: '16px', height: '40px' }}>
                  <svg style={{ width: '100%', height: '100%' }}>
                    <polyline
                      points={metric.sparkData.map((v, i) => 
                        `${(i / (metric.sparkData.length - 1)) * 100}%,${40 - (v / Math.max(...metric.sparkData)) * 35}`
                      ).join(' ')}
                      fill="none"
                      stroke="url(#gradient-${index})"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#212529', marginBottom: '16px' }}>
            Quick Actions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px'
          }}>
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.path)}
                style={{
                  background: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                <div className={action.color} style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <action.icon size={24} style={{ color: 'white' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#495057' }}>
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '24px'
        }}>
          {/* Activity Feed */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#212529', margin: 0 }}>
                Live Activity Feed
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: '#28a745',
                  borderRadius: '50%',
                  display: 'inline-block'
                }} />
                <span style={{ fontSize: '14px', color: '#28a745' }}>Live</span>
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
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: activity.type === 'success' ? '#d1f4e0' :
                               activity.type === 'warning' ? '#fff3cd' : '#d1ecf1'
                  }}>
                    <activity.icon size={20} style={{
                      color: activity.type === 'success' ? '#28a745' :
                             activity.type === 'warning' ? '#ffc107' : '#17a2b8'
                    }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#212529', margin: '0 0 4px 0' }}>
                      {activity.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#6c757d', margin: 0 }}>
                      {activity.desc}
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', color: '#adb5bd' }}>
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>

            <button style={{
              width: '100%',
              marginTop: '16px',
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              View All Activities
            </button>
          </div>

          {/* AI Assistant */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white'
          }}>
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
                { icon: Zap, title: 'Smart Prediction', desc: '3 units need maintenance soon' },
                { icon: Target, title: 'Cost Optimization', desc: 'Save 15% on maintenance' },
                { icon: TrendingUp, title: 'Revenue Forecast', desc: '8% growth expected' }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <item.icon size={18} />
                    <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              marginTop: '16px',
              padding: '12px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Ask AI Assistant
            </button>
          </div>
        </div>

        {/* Properties Overview */}
        <div style={{ marginTop: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#212529' }}>
              Properties Overview
            </h3>
            <button style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#667eea',
              border: '1px solid #667eea',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#667eea';
            }}
            >
              View All Properties <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e9ecef',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  height: '120px',
                  background: `linear-gradient(135deg, ${
                    ['#667eea, #764ba2', '#f093fb, #f5576c', '#4facfe, #00f2fe', '#43e97b, #38f9d7'][index % 4]
                  })`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '4px 12px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: property.metrics.occupancyRate > 90 ? '#28a745' : '#ffc107'
                  }}>
                    {property.metrics.occupancyRate}% Occupied
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#212529', marginBottom: '12px' }}>
                    {property.name}
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Total Units</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#212529' }}>{property.units}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Monthly Revenue</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#212529' }}>
                        ${property.monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: property.metrics.maintenanceScore > 80 ? '#28a745' :
                                   property.metrics.maintenanceScore > 60 ? '#ffc107' : '#dc3545'
                      }} />
                      <span style={{ fontSize: '13px', color: '#6c757d' }}>Health Score</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#212529' }}>
                      {property.metrics.maintenanceScore}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UltraModernDashboard;