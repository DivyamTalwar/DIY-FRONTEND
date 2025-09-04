import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Building, Truck,
  Activity, BarChart3, PieChart, Target, Award, Wrench,
  Clock, CheckCircle, Calendar, Filter, Download, RefreshCw,
  ChevronUp, ChevronDown, ArrowUpRight, ArrowDownRight,
  Zap, Gauge, Timer, Shield, Sparkles, Rocket,
  Brain, Map, Eye, Info, FileText, Package
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ComposedChart
} from 'recharts';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

const DIYHeroAnalytics = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    loadAnalyticsData();
    
    // Celebration
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
      });
    }, 500);
  }, [timeRange]);

  const loadAnalyticsData = () => {
    setLoading(true);
    
    // Comprehensive Analytics Data
    const data = {
      overview: {
        truckRollsMinimized: 487,
        totalMoneySaved: 178950,
        diyResolutionRate: 76.8,
        avgResponseTime: 1.9,
        tenantSatisfaction: 4.8,
        activeProperties: 12,
        totalTenants: 856,
        monthlyGrowth: 18.5
      },
      trends: {
        savingsOverTime: [
          { month: 'Jan', saved: 12500, trucks: 42, diyRate: 68 },
          { month: 'Feb', saved: 14200, trucks: 48, diyRate: 71 },
          { month: 'Mar', saved: 16800, trucks: 56, diyRate: 73 },
          { month: 'Apr', saved: 19500, trucks: 65, diyRate: 75 },
          { month: 'May', saved: 22300, trucks: 74, diyRate: 77 },
          { month: 'Jun', saved: 26800, trucks: 89, diyRate: 79 },
          { month: 'Jul', saved: 31200, trucks: 104, diyRate: 82 }
        ],
        issueTypes: [
          { type: 'Plumbing', total: 156, diy: 128, tech: 28 },
          { type: 'Electrical', total: 89, diy: 52, tech: 37 },
          { type: 'HVAC', total: 112, diy: 78, tech: 34 },
          { type: 'Appliance', total: 203, diy: 172, tech: 31 },
          { type: 'General', total: 267, diy: 241, tech: 26 }
        ],
        propertyPerformance: [
          { property: 'Sunset Apartments', score: 92, savings: 42500, engagement: 88 },
          { property: 'Green Valley', score: 85, savings: 38200, engagement: 82 },
          { property: 'Downtown Towers', score: 94, savings: 56800, engagement: 91 },
          { property: 'Park View', score: 78, savings: 28900, engagement: 75 },
          { property: 'Harbor Heights', score: 81, savings: 32400, engagement: 79 }
        ]
      },
      resolutionBreakdown: [
        { name: 'DIY Completed', value: 68, color: '#22c55e' },
        { name: 'DIY In Progress', value: 12, color: '#3b82f6' },
        { name: 'Tech Required', value: 15, color: '#f59e0b' },
        { name: 'Scheduled', value: 5, color: '#8b5cf6' }
      ],
      tenantEngagement: {
        activeUsers: 742,
        totalDiyPoints: 186500,
        avgPointsPerUser: 251,
        topPerformers: [
          { name: 'John Smith', points: 2850, repairs: 42 },
          { name: 'Sarah Johnson', points: 2620, repairs: 38 },
          { name: 'Mike Chen', points: 2480, repairs: 35 },
          { name: 'Emily Davis', points: 2350, repairs: 33 },
          { name: 'Chris Wilson', points: 2200, repairs: 31 }
        ]
      },
      costAnalysis: {
        traditionalCost: 425000,
        actualCost: 246050,
        savedAmount: 178950,
        savingsPercentage: 42.1,
        projectedAnnualSavings: 358900,
        avgSavingPerIssue: 216
      },
      predictions: {
        nextMonthTrucks: 115,
        nextMonthSavings: 34500,
        diyRateProjection: 84,
        roiMultiplier: 3.8
      }
    };
    
    setAnalyticsData(data);
    setTimeout(() => setLoading(false), 500);
  };

  const MetricCard = ({ icon: Icon, title, value, change, color, subtitle }) => (
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
        
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
          {value}
        </h3>
        <p style={{ fontSize: '14px', color: '#374151', margin: '0', fontWeight: '600' }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  if (loading || !analyticsData) {
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
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>
            Loading Analytics...
          </h2>
        </motion.div>
      </div>
    );
  }

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
              📊 DIY Hero Analytics Center
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Track performance, savings, and tenant engagement
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                padding: '10px 16px',
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            
            <button
              onClick={() => loadAnalyticsData()}
              style={{
                padding: '10px 16px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            
            <button
              style={{
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Download size={16} />
              Export
            </button>
            
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px 16px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>

      {/* View Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        padding: '4px',
        background: 'white',
        borderRadius: '12px',
        width: 'fit-content'
      }}>
        {['overview', 'savings', 'engagement', 'predictions'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            style={{
              padding: '10px 20px',
              background: activeView === view ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
              color: activeView === view ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s'
            }}
          >
            {view}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <MetricCard
                icon={Truck}
                title="Truck Rolls Minimized"
                value={analyticsData.overview.truckRollsMinimized}
                change={24}
                color="linear-gradient(135deg, #FF6B6B, #FF8E53)"
                subtitle="This period"
              />
              <MetricCard
                icon={DollarSign}
                title="Total Money Saved"
                value={`$${analyticsData.overview.totalMoneySaved.toLocaleString()}`}
                change={18.5}
                color="linear-gradient(135deg, #4ECDC4, #44A08D)"
                subtitle="vs traditional model"
              />
              <MetricCard
                icon={Wrench}
                title="DIY Resolution Rate"
                value={`${analyticsData.overview.diyResolutionRate}%`}
                change={8.2}
                color="linear-gradient(135deg, #667eea, #764ba2)"
                subtitle="Tenant-resolved issues"
              />
              <MetricCard
                icon={Clock}
                title="Avg Response Time"
                value={`${analyticsData.overview.avgResponseTime} hrs`}
                change={-22}
                color="linear-gradient(135deg, #f093fb, #f5576c)"
                subtitle="For critical issues"
              />
            </div>

            {/* Charts Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px',
              marginBottom: '24px'
            }}>
              {/* Savings Trend */}
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
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                  💰 Savings & Truck Rolls Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={analyticsData.trends.savingsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis yAxisId="left" stroke="#6b7280" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="saved" fill="#4ECDC4" name="Money Saved ($)" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="trucks"
                      stroke="#FF6B6B"
                      strokeWidth={3}
                      name="Trucks Avoided"
                      dot={{ fill: '#FF6B6B', r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Resolution Breakdown */}
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
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                  🔧 Resolution Types
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={analyticsData.resolutionBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.resolutionBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div style={{ marginTop: '20px' }}>
                  {analyticsData.resolutionBreakdown.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '3px',
                          background: item.color
                        }} />
                        <span style={{ fontSize: '13px', color: '#374151' }}>{item.name}</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Property Performance */}
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
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                🏢 Property Performance Matrix
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={analyticsData.trends.propertyPerformance}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="property" stroke="#6b7280" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar
                    name="Performance Score"
                    dataKey="score"
                    stroke="#667eea"
                    fill="#667eea"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Engagement"
                    dataKey="engagement"
                    stroke="#4ECDC4"
                    fill="#4ECDC4"
                    fillOpacity={0.4}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        )}

        {activeView === 'savings' && (
          <motion.div
            key="savings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Cost Analysis */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '24px'
            }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  borderRadius: '20px',
                  padding: '32px',
                  color: 'white'
                }}
              >
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                  💎 Total Savings Analysis
                </h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                      Traditional Model Cost
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      ${analyticsData.costAnalysis.traditionalCost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                      DIY Hero Model Cost
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      ${analyticsData.costAnalysis.actualCost.toLocaleString()}
                    </p>
                  </div>
                  <div style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      You've Saved
                    </p>
                    <p style={{ fontSize: '40px', fontWeight: 'bold' }}>
                      ${analyticsData.costAnalysis.savedAmount.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '16px', marginTop: '8px' }}>
                      {analyticsData.costAnalysis.savingsPercentage}% reduction
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1a1a1a' }}>
                  📈 Projections
                </h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{
                    padding: '16px',
                    background: '#f3f4f6',
                    borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Rocket size={18} style={{ color: '#667eea' }} />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        Annual Savings Projection
                      </span>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#22c55e' }}>
                      ${analyticsData.costAnalysis.projectedAnnualSavings.toLocaleString()}
                    </p>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: '#f3f4f6',
                    borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Target size={18} style={{ color: '#667eea' }} />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        Average Saving Per Issue
                      </span>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                      ${analyticsData.costAnalysis.avgSavingPerIssue}
                    </p>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: '#f3f4f6',
                    borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Zap size={18} style={{ color: '#667eea' }} />
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        ROI Multiplier
                      </span>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>
                      {analyticsData.predictions.roiMultiplier}x
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Issue Type Analysis */}
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
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                🔍 Issue Resolution by Type
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.trends.issueTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="type" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="diy" stackId="a" fill="#4ECDC4" name="DIY Resolved" />
                  <Bar dataKey="tech" stackId="a" fill="#FF6B6B" name="Tech Required" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        )}

        {activeView === 'engagement' && (
          <motion.div
            key="engagement"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Engagement Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
              }}>
                <Users size={32} style={{ color: '#667eea', marginBottom: '12px' }} />
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {analyticsData.tenantEngagement.activeUsers}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Active DIY Heroes</p>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
              }}>
                <Award size={32} style={{ color: '#f59e0b', marginBottom: '12px' }} />
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {analyticsData.tenantEngagement.totalDiyPoints.toLocaleString()}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Points Earned</p>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
              }}>
                <Target size={32} style={{ color: '#22c55e', marginBottom: '12px' }} />
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {analyticsData.tenantEngagement.avgPointsPerUser}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Avg Points/User</p>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
              }}>
                <CheckCircle size={32} style={{ color: '#4ECDC4', marginBottom: '12px' }} />
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {analyticsData.overview.tenantSatisfaction}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Satisfaction Score</p>
              </div>
            </div>

            {/* Top Performers */}
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
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                🏆 Top DIY Heroes This Month
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {analyticsData.tenantEngagement.topPerformers.map((performer, index) => (
                  <motion.div
                    key={performer.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: '20px',
                      background: index === 0 ? 'linear-gradient(135deg, #ffd700, #ffed4e)' :
                                 index === 1 ? 'linear-gradient(135deg, #c0c0c0, #e8e8e8)' :
                                 index === 2 ? 'linear-gradient(135deg, #cd7f32, #e8a87c)' :
                                 '#f9fafb',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: index < 3 ? 'white' : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: index === 0 ? '#ffd700' :
                               index === 1 ? '#c0c0c0' :
                               index === 2 ? '#cd7f32' : '#6b7280'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: index < 3 ? 'white' : '#1a1a1a',
                          margin: '0 0 4px 0'
                        }}>
                          {performer.name}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: index < 3 ? 'rgba(255,255,255,0.9)' : '#6b7280',
                          margin: 0
                        }}>
                          {performer.repairs} repairs completed
                        </p>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: index < 3 ? 'white' : '#667eea'
                    }}>
                      {performer.points} pts
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeView === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* AI Predictions */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '20px',
                  padding: '32px',
                  color: 'white'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Brain size={32} />
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    AI Predictions
                  </h3>
                </div>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                      Next Month Truck Avoidance
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {analyticsData.predictions.nextMonthTrucks} trucks
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                      Projected Savings
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      ${analyticsData.predictions.nextMonthSavings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                      DIY Rate Projection
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {analyticsData.predictions.diyRateProjection}%
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Growth Indicators */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <TrendingUp size={32} style={{ color: '#22c55e' }} />
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
                    Growth Indicators
                  </h3>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    { label: 'Platform Adoption', value: 87, change: 12 },
                    { label: 'User Engagement', value: 92, change: 8 },
                    { label: 'Cost Efficiency', value: 78, change: 15 },
                    { label: 'Response Speed', value: 95, change: 22 }
                  ].map((indicator) => (
                    <div key={indicator.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>{indicator.label}</span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e' }}>
                          +{indicator.change}%
                        </span>
                      </div>
                      <div style={{
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${indicator.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #22c55e, #10b981)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Sparkles size={32} style={{ color: '#f59e0b' }} />
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
                    AI Recommendations
                  </h3>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    { icon: Target, text: 'Focus on HVAC training - 34% improvement potential', color: '#667eea' },
                    { icon: Users, text: 'Engage low-activity tenants with incentives', color: '#4ECDC4' },
                    { icon: Wrench, text: 'Stock basic plumbing tools in 3 properties', color: '#f59e0b' },
                    { icon: Award, text: 'Launch weekend DIY challenge for 25% boost', color: '#22c55e' }
                  ].map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        padding: '12px',
                        background: '#f9fafb',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <rec.icon size={20} style={{ color: rec.color }} />
                      <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>
                        {rec.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DIYHeroAnalytics;