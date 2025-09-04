import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, Truck, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Activity, BarChart3, Building, Wrench, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight, Zap, Shield, Award,
  Target, Cpu, Globe, Layers, BookOpen, MessageSquare, Phone,
  Video, Settings, LogOut, Menu, X, Search, Filter, Download,
  Star, Heart, ThumbsUp, Eye, Share2, Info, HelpCircle, Map,
  Package, CreditCard, PieChart, Database, Cloud, Lock,
  Smartphone, Monitor, Wifi, Battery, Mic, Camera, Paperclip, Plus,
  ToggleLeft, ToggleRight, UserCheck, UserCog, DollarSign, Hammer,
  Gauge, TrendingDown, RefreshCw, Save, AlertCircle, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import ManagerDashboard from './DIYHeroManagerDashboard';
import TenantDashboard from './UltimateTenantDashboard';

// Mock Data Service
const mockDataService = {
  getTenantData: () => ({
    repairs: [
      { id: 1, title: 'Leaking Faucet', status: 'in_progress', date: '2024-03-15', urgency: 'medium' },
      { id: 2, title: 'AC Not Working', status: 'pending', date: '2024-03-14', urgency: 'high' },
      { id: 3, title: 'Door Lock Issue', status: 'completed', date: '2024-03-10', urgency: 'low' }
    ],
    payments: [
      { id: 1, amount: 1500, date: '2024-03-01', status: 'paid' },
      { id: 2, amount: 1500, date: '2024-02-01', status: 'paid' }
    ],
    notifications: [
      { id: 1, message: 'Maintenance scheduled for tomorrow', type: 'info' },
      { id: 2, message: 'Rent payment due in 5 days', type: 'warning' }
    ],
    diyTasks: [
      { id: 1, title: 'Fix Cabinet Door', difficulty: 'easy', points: 50, tutorial: true },
      { id: 2, title: 'Replace Air Filter', difficulty: 'easy', points: 30, tutorial: true },
      { id: 3, title: 'Unclog Drain', difficulty: 'medium', points: 75, tutorial: true }
    ],
    achievements: {
      totalPoints: 450,
      level: 'DIY Champion',
      badges: ['First Fix', 'Weekend Warrior', 'Tool Master']
    }
  }),
  
  getManagerData: () => ({
    properties: [
      { id: 1, name: 'Sunset Apartments', units: 48, occupancy: 94, revenue: 72000 },
      { id: 2, name: 'Green Valley Complex', units: 36, occupancy: 89, revenue: 54000 },
      { id: 3, name: 'Downtown Towers', units: 120, occupancy: 96, revenue: 240000 }
    ],
    truckRolls: {
      minimized: 67,
      moneySaved: 45780,
      avgResponseTime: '2.4 hours',
      diyResolved: 89,
      technicianCalls: 23
    },
    analytics: {
      monthlyTrend: [65, 70, 68, 75, 80, 85, 89, 92, 95, 98, 102, 110],
      costSavings: [3200, 3800, 4100, 4500, 4800, 5200],
      tenantSatisfaction: 4.8,
      maintenanceEfficiency: 94
    },
    alerts: [
      { id: 1, property: 'Sunset Apartments', issue: 'Water heater needs inspection', urgency: 'high' },
      { id: 2, property: 'Green Valley', issue: 'Scheduled HVAC maintenance', urgency: 'medium' }
    ]
  })
};

function DIYHeroDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardMode, setDashboardMode] = useState('tenant'); // 'tenant' or 'manager'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tenantData, setTenantData] = useState(null);
  const [managerData, setManagerData] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeRepairs: 12,
    truckRollsSaved: 67,
    moneySaved: 45780,
    tenantSatisfaction: 4.8
  });

  useEffect(() => {
    loadData();
    startRealTimeUpdates();
    
    // Welcome celebration
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6B3', '#FFA07A'],
        origin: { y: 0.4 }
      });
      toast.success('Welcome to DIY Hero Platform!', {
        icon: '🦸‍♂️',
        duration: 4000
      });
    }, 500);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const tenant = mockDataService.getTenantData();
      const manager = mockDataService.getManagerData();
      setTenantData(tenant);
      setManagerData(manager);
      setNotifications([
        { id: 1, type: 'success', message: 'DIY task completed! +50 points', time: 'Just now' },
        { id: 2, type: 'info', message: 'New tutorial available: Fix Leaky Faucet', time: '2 min ago' },
        { id: 3, type: 'warning', message: 'Maintenance reminder for Unit 12B', time: '5 min ago' }
      ]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const startRealTimeUpdates = () => {
    setInterval(() => {
      setRealTimeMetrics(prev => ({
        activeRepairs: Math.max(0, prev.activeRepairs + Math.floor(Math.random() * 3 - 1)),
        truckRollsSaved: prev.truckRollsSaved + Math.floor(Math.random() * 2),
        moneySaved: prev.moneySaved + Math.floor(Math.random() * 500),
        tenantSatisfaction: Math.min(5, Math.max(4, prev.tenantSatisfaction + (Math.random() * 0.1 - 0.05)))
      }));
    }, 5000);
  };

  const handleModeSwitch = () => {
    setIsTransitioning(true);
    
    // Smooth transition effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.9, y: 0.1 }
    });
    
    setTimeout(() => {
      setDashboardMode(dashboardMode === 'tenant' ? 'manager' : 'tenant');
      setIsTransitioning(false);
      toast.success(`Switched to ${dashboardMode === 'tenant' ? 'Property Manager' : 'Tenant'} Dashboard`, {
        icon: dashboardMode === 'tenant' ? '👔' : '🏠'
      });
    }, 300);
  };

  const TenantDashboardOld = () => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Metrics for Tenant */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          {
            title: 'DIY Points',
            value: tenantData?.achievements.totalPoints || 0,
            icon: Award,
            color: 'linear-gradient(135deg, #667eea, #764ba2)',
            change: '+50 today',
            trend: 'up'
          },
          {
            title: 'Active Repairs',
            value: tenantData?.repairs.filter(r => r.status !== 'completed').length || 0,
            icon: Wrench,
            color: 'linear-gradient(135deg, #f093fb, #f5576c)',
            change: '2 pending',
            trend: 'neutral'
          },
          {
            title: 'Money Saved',
            value: `$${(tenantData?.achievements.totalPoints * 2) || 0}`,
            icon: DollarSign,
            color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            change: '+$100 this month',
            trend: 'up'
          },
          {
            title: 'DIY Success Rate',
            value: '85%',
            icon: Target,
            color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            change: '+5% improvement',
            trend: 'up'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: '100px',
              height: '100px',
              background: metric.color,
              borderRadius: '50%',
              opacity: 0.1
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: metric.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <metric.icon size={28} style={{ color: 'white' }} />
                </div>
                
                {metric.trend !== 'neutral' && (
                  <div style={{
                    padding: '6px 12px',
                    background: metric.trend === 'up' ? '#d4f4dd' : '#ffd4d4',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {metric.trend === 'up' ? 
                      <ArrowUpRight size={14} style={{ color: '#22c55e' }} /> :
                      <ArrowDownRight size={14} style={{ color: '#ef4444' }} />
                    }
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: metric.trend === 'up' ? '#22c55e' : '#ef4444'
                    }}>
                      {metric.change}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                {metric.value}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: '500' }}>
                {metric.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DIY Tasks Section */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            🔧 DIY Tasks Available
          </h3>
          <button
            onClick={() => navigate('/guided-repair/new')}
            style={{
              padding: '10px 20px',
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
            <Plus size={18} /> Start New Task
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {tenantData?.diyTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: '2px solid transparent',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: task.difficulty === 'easy' ? '#22c55e' : task.difficulty === 'medium' ? '#f59e0b' : '#ef4444',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Wrench size={24} style={{ color: 'white' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {task.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: task.difficulty === 'easy' ? '#d4f4dd' : task.difficulty === 'medium' ? '#fef3c7' : '#ffd4d4',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: task.difficulty === 'easy' ? '#22c55e' : task.difficulty === 'medium' ? '#f59e0b' : '#ef4444'
                    }}>
                      {task.difficulty.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>
                      +{task.points} points
                    </span>
                    {task.tutorial && (
                      <span style={{
                        padding: '4px 8px',
                        background: '#e0e7ff',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#4f46e5'
                      }}>
                        📹 Tutorial Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#6b7280' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const ManagerDashboardOld = () => (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Key Performance Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          {
            title: 'Truck Rolls Minimized',
            value: realTimeMetrics.truckRollsSaved,
            icon: Truck,
            color: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            change: '+12 this week',
            trend: 'up',
            subtitle: 'Reduced service calls'
          },
          {
            title: 'Money Saved',
            value: `$${realTimeMetrics.moneySaved.toLocaleString()}`,
            icon: DollarSign,
            color: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            change: '+$5,780 this month',
            trend: 'up',
            subtitle: 'Through DIY resolutions'
          },
          {
            title: 'DIY Resolution Rate',
            value: '79%',
            icon: Wrench,
            color: 'linear-gradient(135deg, #667eea, #764ba2)',
            change: '+8% improvement',
            trend: 'up',
            subtitle: 'Issues resolved by tenants'
          },
          {
            title: 'Avg Response Time',
            value: '2.4 hrs',
            icon: Clock,
            color: 'linear-gradient(135deg, #f093fb, #f5576c)',
            change: '-45 min faster',
            trend: 'up',
            subtitle: 'For critical issues'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: '100px',
              height: '100px',
              background: metric.color,
              borderRadius: '50%',
              opacity: 0.1
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: metric.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <metric.icon size={28} style={{ color: 'white' }} />
                </div>
                
                <div style={{
                  padding: '6px 12px',
                  background: '#d4f4dd',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ArrowUpRight size={14} style={{ color: '#22c55e' }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#22c55e'
                  }}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                {metric.value}
              </h3>
              <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 4px 0', fontWeight: '600' }}>
                {metric.title}
              </p>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                {metric.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics and Properties Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Cost Savings Chart */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '24px' }}>
            💰 Monthly Savings Trend
          </h3>
          <div style={{ height: '200px', position: 'relative', background: '#f9fafb', borderRadius: '12px', padding: '20px' }}>
            <svg style={{ width: '100%', height: '100%' }}>
              <polyline
                points={managerData?.analytics.costSavings.map((v, i) => 
                  `${(i / (managerData.analytics.costSavings.length - 1)) * 100}%,${160 - (v / Math.max(...managerData.analytics.costSavings)) * 140}`
                ).join(' ')}
                fill="none"
                stroke="url(#savings-gradient)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="savings-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#44A08D" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '20px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#22c55e'
            }}>
              +18% MoM
            </div>
          </div>
        </div>

        {/* Properties Overview */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '24px' }}>
            🏢 Top Properties
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {managerData?.properties.slice(0, 3).map((property) => (
              <div
                key={property.id}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {property.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                    {property.units} units • {property.occupancy}% occupied
                  </p>
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#22c55e'
                }}>
                  ${(property.revenue / 1000).toFixed(0)}k
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTopColor: 'white',
              borderRadius: '50%'
            }}
          />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            DIY Hero Platform
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Initializing your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      width: '100%'
    }}>
      {/* Enhanced Header */}
      <header style={{
        background: 'white',
        borderBottom: '2px solid #e5e7eb',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo and Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: '10px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Menu size={24} style={{ color: '#4b5563' }} />
            </button>
            
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
                }}
              >
                <span style={{ fontSize: '24px' }}>🦸‍♂️</span>
              </motion.div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                  DIY Hero
                </h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  Revolutionary Property Management
                </p>
              </div>
            </div>
          </div>

          {/* Center Search Bar */}
          <div style={{
            flex: 1,
            maxWidth: '500px',
            margin: '0 32px'
          }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Search properties, tenants, or repairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = '#f9fafb';
                }}
              />
            </div>
          </div>

          {/* Dashboard Mode Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Mode Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onClick={handleModeSwitch}
            >
              {dashboardMode === 'tenant' ? (
                <>
                  <UserCheck size={20} style={{ color: 'white' }} />
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Tenant</span>
                </>
              ) : (
                <>
                  <UserCog size={20} style={{ color: 'white' }} />
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Manager</span>
                </>
              )}
              <motion.div
                animate={{ rotate: isTransitioning ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {dashboardMode === 'tenant' ? 
                  <ToggleLeft size={24} style={{ color: 'white' }} /> :
                  <ToggleRight size={24} style={{ color: 'white' }} />
                }
              </motion.div>
            </motion.div>

            {/* Notifications */}
            <button
              style={{
                position: 'relative',
                padding: '10px',
                background: '#f9fafb',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={20} style={{ color: '#4b5563' }} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '12px',
                height: '12px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white'
              }} />
            </button>

            {/* Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              background: '#f9fafb',
              borderRadius: '12px',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {dashboardMode === 'tenant' ? 'JT' : 'PM'}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                  {dashboardMode === 'tenant' ? 'John Tenant' : 'Property Manager'}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                  {dashboardMode === 'tenant' ? 'DIY Champion' : 'Administrator'}
                </p>
              </div>
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
        <motion.div
          key={dashboardMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>
            {dashboardMode === 'tenant' ? 
              'Welcome back, DIY Hero Champion! 🦸‍♂️' : 
              'Welcome back, PAM (Property Admin Master)! 🏆'}
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            {dashboardMode === 'tenant' ?
              '💪 Ready to conquer repairs and earn legendary rewards? Your DIY skills save $1000s!' :
              '🚀 Your $4.2M Empire: 127 Properties • 2,847 Happy Tenants • 94.8% Occupancy • $67K Saved This Month'}
          </p>
        </motion.div>

        {/* Dashboard Content */}
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto 20px',
                    border: '3px solid #e5e7eb',
                    borderTopColor: '#667eea',
                    borderRadius: '50%'
                  }}
                />
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Switching dashboard...</p>
              </div>
            </motion.div>
          ) : (
            <div key={dashboardMode}>
              {dashboardMode === 'tenant' ? <TenantDashboard navigate={navigate} tenantData={tenantData} realTimeMetrics={realTimeMetrics} /> : <ManagerDashboard navigate={navigate} realTimeMetrics={realTimeMetrics} managerData={managerData} />}
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default DIYHeroDashboard;