import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Wrench, DollarSign, Trophy, Target, Clock, AlertTriangle,
  ChevronRight, ArrowUpRight, Plus, Calendar, Phone, Video,
  CheckCircle, TrendingUp, Star, Zap, Shield, Award, Users,
  MessageSquare, Camera, BookOpen, PlayCircle, Sparkles,
  Timer, Battery, Gauge, Heart, ThumbsUp, Share2, Bell, Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TenantDashboard = ({ navigate, tenantData, realTimeMetrics }) => {
  // Quick Actions Data
  const quickActions = [
    {
      icon: Plus,
      title: 'Start New Repair',
      subtitle: 'Fix something right now',
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      path: '/new-repair',
      urgent: false
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Fix',
      subtitle: 'Urgent help needed',
      color: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      path: '/emergency',
      urgent: true
    },
    {
      icon: Calendar,
      title: 'Schedule Technician',
      subtitle: 'Book professional help',
      color: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
      path: '/schedule-technician',
      urgent: false
    }
  ];

  // Recent Activity
  const recentActivity = [
    { 
      type: 'completed', 
      title: 'Fixed Leaky Faucet', 
      points: '+50 points',
      time: '2 hours ago',
      icon: CheckCircle,
      color: '#22c55e'
    },
    {
      type: 'tutorial',
      title: 'Watched: AC Filter Change',
      points: '+20 points',
      time: '5 hours ago',
      icon: PlayCircle,
      color: '#3b82f6'
    },
    {
      type: 'achievement',
      title: 'Earned: Weekend Warrior Badge',
      points: '+100 points',
      time: 'Yesterday',
      icon: Award,
      color: '#f59e0b'
    },
    {
      type: 'saved',
      title: 'Saved $150 on plumbing',
      points: 'DIY Success',
      time: '2 days ago',
      icon: DollarSign,
      color: '#10b981'
    }
  ];

  // Popular Fixes Right Now
  const popularFixes = [
    {
      title: 'Unclog Drain',
      difficulty: 'Easy',
      time: '15 min',
      saves: '$200',
      completions: 234,
      trending: true
    },
    {
      title: 'Fix Running Toilet',
      difficulty: 'Easy',
      time: '20 min',
      saves: '$150',
      completions: 189,
      trending: true
    },
    {
      title: 'Replace Door Handle',
      difficulty: 'Medium',
      time: '30 min',
      saves: '$100',
      completions: 156,
      trending: false
    },
    {
      title: 'Patch Drywall',
      difficulty: 'Medium',
      time: '45 min',
      saves: '$250',
      completions: 98,
      trending: false
    }
  ];

  // Navigation Menu Items
  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Camera, label: 'Photo Diagnosis', path: '/photo-capture' },
    { icon: Wrench, label: 'Start Repair', path: '/new-repair' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: Users, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Calendar, label: 'Schedule', path: '/schedule-technician' },
    { icon: MessageSquare, label: 'Community', path: '/tenant-portal' },
    { icon: BookOpen, label: 'Tutorials', path: '/guided-repair/tutorials' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Stats Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                Your DIY Hero Stats
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)' }}>
                Keep crushing it! You're in the top 10% of DIY Heroes
              </p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '12px 20px',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={20} style={{ color: '#ffd700' }} />
                <span style={{ color: 'white', fontWeight: '600' }}>Level 12</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px'
          }}>
            {[
              { label: 'Total Points', value: '2,450', icon: Award, change: '+150 this week' },
              { label: 'Money Saved', value: '$4,900', icon: DollarSign, change: '+$350 this month' },
              { label: 'Repairs Done', value: '47', icon: Wrench, change: '5 this week' },
              { label: 'Success Rate', value: '92%', icon: Target, change: '+5% improvement' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <stat.icon size={24} style={{ color: 'white' }} />
                  <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                    {stat.value}
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '0 0 4px 0' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '12px', color: '#a5f3fc' }}>
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: action.urgent ? '2px solid #ef4444' : '1px solid #e5e7eb'
              }}
            >
              {action.urgent && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#ef4444',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  URGENT
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: action.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <action.icon size={32} style={{ color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {action.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    {action.subtitle}
                  </p>
                </div>
                <ChevronRight size={24} style={{ color: '#9ca3af' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Recent Activity */}
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
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
              📊 Recent Activity
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} style={{ color: '#22c55e' }} />
              <span style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>
                Active
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map((activity, index) => (
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
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: `${activity.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <activity.icon size={22} style={{ color: activity.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {activity.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    {activity.time}
                  </p>
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: activity.color,
                  background: `${activity.color}15`,
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  {activity.points}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Fixes Right Now */}
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
              🔥 Popular Fixes Now
            </h3>
            <span style={{
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#92400e'
            }}>
              TRENDING
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {popularFixes.map((fix, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                style={{
                  padding: '16px',
                  background: fix.trending ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : '#f9fafb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: fix.trending ? '2px solid #fbbf24' : '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                    {fix.title}
                  </h4>
                  {fix.trending && (
                    <TrendingUp size={16} style={{ color: '#f59e0b' }} />
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 8px',
                    background: fix.difficulty === 'Easy' ? '#d1fae5' : '#fed7aa',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: fix.difficulty === 'Easy' ? '#065f46' : '#92400e'
                  }}>
                    {fix.difficulty}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    background: '#e0e7ff',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#3730a3'
                  }}>
                    ⏱ {fix.time}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    background: '#d1fae5',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#065f46'
                  }}>
                    💰 Save {fix.saves}
                  </span>
                </div>
                
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Users size={12} />
                  {fix.completions} completed today
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation Grid */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '24px' }}>
          🚀 Explore All Features
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px'
        }}>
          {navigationItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                e.currentTarget.querySelector('svg').style.color = 'white';
                e.currentTarget.querySelector('span').style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb, #f3f4f6)';
                e.currentTarget.querySelector('svg').style.color = '#6b7280';
                e.currentTarget.querySelector('span').style.color = '#374151';
              }}
            >
              <item.icon size={28} style={{ color: '#6b7280', transition: 'color 0.2s' }} />
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151', transition: 'color 0.2s' }}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Achievement Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '32px',
          background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
          borderRadius: '20px',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              Next Achievement: Master Fixer
            </h4>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Complete 3 more repairs to unlock
            </p>
          </div>
          <div style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            70% Complete
          </div>
        </div>
        <div style={{
          height: '12px',
          background: '#e5e7eb',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '6px'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TenantDashboard;