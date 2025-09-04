import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Wrench, DollarSign, Trophy, Target, Clock, AlertTriangle,
  ChevronRight, ArrowUpRight, Plus, Calendar, Phone, Video,
  CheckCircle, TrendingUp, Star, Zap, Shield, Award, Users,
  MessageSquare, Camera, BookOpen, PlayCircle, Sparkles,
  Timer, Battery, Gauge, Heart, ThumbsUp, Share2, Bell, Activity,
  Flame, Crown, Rocket, Diamond, Gift, Medal, Flag, Map,
  Package, CreditCard, PieChart, Brain, Lightbulb,
  AlertCircle, ArrowDownRight, Eye, Filter, Search, Settings
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

const UltimateTenantDashboard = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Initialize with celebration
  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4ECDC4', '#FFD700']
      });
      toast.success('Welcome back, DIY Hero! 🦸‍♂️', { duration: 3000 });
    }, 500);
  }, []);

  // MASSIVE MOCK DATA
  const heroStats = {
    level: 15,
    title: 'Master DIY Hero',
    totalPoints: 4850,
    monthlyPoints: 850,
    weeklyPoints: 250,
    todayPoints: 75,
    totalSaved: 9875,
    monthlySaved: 1250,
    repairsCompleted: 89,
    successRate: 94.5,
    avgTimeToFix: '1.2 hrs',
    nextLevelPoints: 5000,
    ranking: 3,
    totalUsers: 2847,
    badges: ['Speed Demon', 'Money Saver', 'Tutorial Master', 'Weekend Warrior', 'Quick Fixer']
  };

  const activeRepairs = [
    { id: 1, title: 'Leaking Kitchen Faucet', status: 'in_progress', urgency: 'high', dueIn: '2 hours', points: 75, saves: 200 },
    { id: 2, title: 'AC Filter Replacement', status: 'pending', urgency: 'medium', dueIn: 'Tomorrow', points: 50, saves: 150 },
    { id: 3, title: 'Toilet Running Issue', status: 'pending', urgency: 'low', dueIn: '3 days', points: 60, saves: 180 }
  ];

  const recentActivity = [
    { type: 'repair', title: 'Fixed Bathroom Door Lock', points: 85, saved: 250, time: '2 hours ago', rating: 5 },
    { type: 'achievement', title: 'Unlocked: Plumbing Expert', points: 200, time: '5 hours ago' },
    { type: 'tutorial', title: 'Completed: Advanced Electrical Safety', points: 50, time: 'Yesterday' },
    { type: 'milestone', title: 'Reached 50 Repairs!', points: 500, time: 'Yesterday' },
    { type: 'community', title: 'Helped John with AC issue', points: 30, time: '2 days ago' },
    { type: 'review', title: 'Manager praised your work!', points: 100, time: '3 days ago' }
  ];

  const popularFixes = [
    { title: 'Unclog Sink Drain', difficulty: 'Easy', time: '15 min', saves: 200, trending: true, success: 98, tutorials: 5, completions: 456 },
    { title: 'Fix Running Toilet', difficulty: 'Easy', time: '20 min', saves: 180, trending: true, success: 95, tutorials: 3, completions: 389 },
    { title: 'Replace Light Switch', difficulty: 'Medium', time: '30 min', saves: 150, trending: false, success: 92, tutorials: 4, completions: 234 },
    { title: 'Patch Drywall Hole', difficulty: 'Medium', time: '45 min', saves: 300, trending: true, success: 89, tutorials: 6, completions: 198 },
    { title: 'Fix Squeaky Door', difficulty: 'Easy', time: '10 min', saves: 50, trending: false, success: 99, tutorials: 2, completions: 567 },
    { title: 'Install Shelf', difficulty: 'Medium', time: '40 min', saves: 120, trending: false, success: 87, tutorials: 3, completions: 145 }
  ];

  const achievements = [
    { name: 'Speed Demon', icon: Zap, progress: 100, color: '#FFD700', description: 'Complete 10 repairs under 30 min' },
    { name: 'Money Saver Elite', icon: DollarSign, progress: 85, color: '#4ECDC4', description: 'Save $10,000 total' },
    { name: 'Tutorial Master', icon: BookOpen, progress: 70, color: '#667eea', description: 'Watch 50 tutorials' },
    { name: 'Community Hero', icon: Users, progress: 60, color: '#f093fb', description: 'Help 20 neighbors' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', points: 5230, repairs: 112, badge: '🏆', trend: 'stable' },
    { rank: 2, name: 'Mike Chen', points: 4920, repairs: 98, badge: '🥈', trend: 'up' },
    { rank: 3, name: 'You', points: 4850, repairs: 89, badge: '🥉', trend: 'up', highlight: true },
    { rank: 4, name: 'Emma Davis', points: 4620, repairs: 87, badge: '🎖️', trend: 'down' },
    { rank: 5, name: 'James Wilson', points: 4410, repairs: 82, badge: '⭐', trend: 'up' }
  ];

  const upcomingChallenges = [
    { title: 'Weekend Warrior', prize: '500 points', deadline: '2 days', participants: 234, difficulty: 'Medium' },
    { title: 'Speed Fix Marathon', prize: '1000 points', deadline: '5 days', participants: 189, difficulty: 'Hard' },
    { title: 'Beginner Friendly', prize: '250 points', deadline: '7 days', participants: 456, difficulty: 'Easy' }
  ];

  const tutorialLibrary = [
    { category: 'Plumbing', videos: 24, duration: '3.5 hrs', popularity: 95 },
    { category: 'Electrical', videos: 18, duration: '2.8 hrs', popularity: 88 },
    { category: 'HVAC', videos: 15, duration: '2.2 hrs', popularity: 82 },
    { category: 'General', videos: 32, duration: '4.1 hrs', popularity: 91 }
  ];

  const rewards = [
    { title: '$10 Home Depot Card', points: 1000, available: true, icon: CreditCard },
    { title: 'Free Tool Kit', points: 2000, available: true, icon: Wrench },
    { title: 'Pro Membership', points: 3000, available: false, icon: Crown },
    { title: 'Skip Technician Fee', points: 500, available: true, icon: Gift }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      {/* EPIC HERO HEADER */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* User Profile Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  border: '4px solid white'
                }}
              >
                🦸‍♂️
              </motion.div>
              
              <div>
                <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                  {heroStats.title}
                </h1>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Crown size={20} style={{ color: '#FFD700' }} />
                    <span style={{ color: 'white', fontWeight: '600' }}>Level {heroStats.level}</span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Trophy size={20} style={{ color: '#FFD700' }} />
                    <span style={{ color: 'white', fontWeight: '600' }}>Rank #{heroStats.ranking}</span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Flame size={20} style={{ color: '#FF6B6B' }} />
                    <span style={{ color: 'white', fontWeight: '600' }}>{heroStats.weeklyPoints} streak</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {heroStats.badges.map((badge, idx) => (
                    <span key={idx} style={{
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: '500'
                    }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                padding: '16px',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', marginBottom: '4px' }}>Today's Points</p>
                <p style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>+{heroStats.todayPoints}</p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                padding: '16px',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', marginBottom: '4px' }}>Success Rate</p>
                <p style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>{heroStats.successRate}%</p>
              </div>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { icon: Award, label: 'Total Points', value: heroStats.totalPoints.toLocaleString(), change: `+${heroStats.monthlyPoints} this month`, color: '#FFD700' },
              { icon: DollarSign, label: 'Money Saved', value: `$${heroStats.totalSaved.toLocaleString()}`, change: `+$${heroStats.monthlySaved} this month`, color: '#4ECDC4' },
              { icon: Wrench, label: 'Repairs Done', value: heroStats.repairsCompleted, change: '+12 this week', color: '#f093fb' },
              { icon: Clock, label: 'Avg Fix Time', value: heroStats.avgTimeToFix, change: '15min faster', color: '#667eea' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                  <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                    {stat.value}
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', margin: '0 0 4px 0' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '12px', color: stat.color }}>
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Level Progress */}
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '16px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'white', fontWeight: '600' }}>Level {heroStats.level} Progress</span>
              <span style={{ color: '#FFD700', fontWeight: '600' }}>
                {heroStats.totalPoints} / {heroStats.nextLevelPoints} XP
              </span>
            </div>
            <div style={{
              height: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(heroStats.totalPoints / heroStats.nextLevelPoints) * 100}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                  borderRadius: '6px',
                  boxShadow: '0 0 10px rgba(255,215,0,0.5)'
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        padding: '4px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        {['overview', 'repairs', 'achievements', 'community', 'rewards'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: activeTab === tab ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
              color: activeTab === tab ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.3s'
            }}
          >
            {tab === 'overview' && '🏠 Overview'}
            {tab === 'repairs' && '🔧 Repairs'}
            {tab === 'achievements' && '🏆 Achievements'}
            {tab === 'community' && '👥 Community'}
            {tab === 'rewards' && '🎁 Rewards'}
          </button>
        ))}
      </div>

      {/* Quick Actions - ALWAYS VISIBLE */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: Plus, title: 'Start New Repair', subtitle: 'Fix something now', color: '#667eea', path: '/new-repair' },
            { icon: AlertTriangle, title: 'Emergency Fix', subtitle: 'Urgent help', color: '#ef4444', path: '/emergency', urgent: true },
            { icon: Calendar, title: 'Schedule Tech', subtitle: 'Book a pro', color: '#4ECDC4', path: '/schedule-technician' },
            { icon: Camera, title: 'Photo Diagnosis', subtitle: 'AI analysis', color: '#f093fb', path: '/photo-capture' },
            { icon: BookOpen, title: 'Watch Tutorial', subtitle: 'Learn & earn', color: '#f59e0b', path: '/guided-repair/1' },
            { icon: Users, title: 'Help Neighbor', subtitle: 'Community support', color: '#10b981', path: '/tenant-portal' },
            { icon: Zap, title: 'Quick Fix', subtitle: 'Instant solutions', color: '#fbbf24', path: '/quick-fix' },
            { icon: Brain, title: 'Smart Diagnosis', subtitle: 'AI-powered help', color: '#8b5cf6', path: '/smart-diagnosis' },
            { icon: Trophy, title: 'Achievements', subtitle: 'Your badges', color: '#f97316', path: '/achievements' },
            { icon: Crown, title: 'Leaderboard', subtitle: 'Top heroes', color: '#eab308', path: '/leaderboard' }
          ].map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                border: action.urgent ? '2px solid #ef4444' : '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
            >
              {action.urgent && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #ef4444, #dc2626)',
                  animation: 'pulse 2s infinite'
                }} />
              )}
              <div style={{
                width: '48px',
                height: '48px',
                background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <action.icon size={24} style={{ color: 'white' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                  {action.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  {action.subtitle}
                </p>
              </div>
              <ChevronRight size={20} style={{ color: '#9ca3af' }} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Main Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Active Repairs */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>
                    🔧 Active Repairs
                  </h3>
                  <span style={{
                    padding: '6px 12px',
                    background: '#fef3c7',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#92400e'
                  }}>
                    {activeRepairs.length} ACTIVE
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activeRepairs.map((repair) => (
                    <motion.div
                      key={repair.id}
                      whileHover={{ x: 5 }}
                      style={{
                        padding: '20px',
                        background: repair.urgency === 'high' ? '#fef2f2' : '#f9fafb',
                        borderRadius: '16px',
                        border: `2px solid ${repair.urgency === 'high' ? '#fca5a5' : '#e5e7eb'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '56px',
                        height: '56px',
                        background: repair.urgency === 'high' ? '#ef4444' : repair.urgency === 'medium' ? '#f59e0b' : '#10b981',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Wrench size={28} style={{ color: 'white' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                          {repair.title}
                        </h4>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#6b7280' }}>
                            ⏰ Due: {repair.dueIn}
                          </span>
                          <span style={{ fontSize: '13px', color: '#667eea', fontWeight: '600' }}>
                            +{repair.points} pts
                          </span>
                          <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '600' }}>
                            Save ${repair.saves}
                          </span>
                        </div>
                      </div>
                      <div style={{
                        padding: '8px 16px',
                        background: repair.status === 'in_progress' ? '#dbeafe' : '#f3f4f6',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: repair.status === 'in_progress' ? '#1e40af' : '#6b7280'
                      }}>
                        {repair.status === 'in_progress' ? 'IN PROGRESS' : 'PENDING'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                  🏆 Top Heroes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {leaderboard.map((user) => (
                    <motion.div
                      key={user.rank}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        padding: '12px',
                        background: user.highlight ? 'linear-gradient(135deg, #667eea15, #764ba215)' : '#f9fafb',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: user.highlight ? '2px solid #667eea' : '1px solid transparent'
                      }}
                    >
                      <div style={{
                        fontSize: '20px',
                        width: '32px',
                        textAlign: 'center'
                      }}>
                        {user.badge}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: user.highlight ? '#667eea' : '#1a1a1a',
                          marginBottom: '2px'
                        }}>
                          {user.name}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                          {user.points.toLocaleString()} pts • {user.repairs} repairs
                        </p>
                      </div>
                      {user.trend === 'up' && <ArrowUpRight size={16} style={{ color: '#10b981' }} />}
                      {user.trend === 'down' && <ArrowDownRight size={16} style={{ color: '#ef4444' }} />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>
                  📊 Recent Activity
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['All', 'Repairs', 'Achievements', 'Community'].map((filter) => (
                    <button
                      key={filter}
                      style={{
                        padding: '6px 12px',
                        background: filter === 'All' ? '#667eea' : 'transparent',
                        color: filter === 'All' ? 'white' : '#6b7280',
                        border: `1px solid ${filter === 'All' ? '#667eea' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -2 }}
                    style={{
                      padding: '16px',
                      background: activity.type === 'achievement' ? 'linear-gradient(135deg, #fef3c7, #fed7aa)' :
                                 activity.type === 'milestone' ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' :
                                 '#f9fafb',
                      borderRadius: '12px',
                      display: 'flex',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: activity.type === 'repair' ? '#10b981' :
                                 activity.type === 'achievement' ? '#f59e0b' :
                                 activity.type === 'milestone' ? '#3b82f6' :
                                 '#8b5cf6',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {activity.type === 'repair' && <Wrench size={20} style={{ color: 'white' }} />}
                      {activity.type === 'achievement' && <Trophy size={20} style={{ color: 'white' }} />}
                      {activity.type === 'milestone' && <Flag size={20} style={{ color: 'white' }} />}
                      {activity.type === 'tutorial' && <PlayCircle size={20} style={{ color: 'white' }} />}
                      {activity.type === 'community' && <Users size={20} style={{ color: 'white' }} />}
                      {activity.type === 'review' && <Star size={20} style={{ color: 'white' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                        {activity.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          {activity.time}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#667eea' }}>
                          +{activity.points} pts
                        </span>
                        {activity.saved && (
                          <span style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>
                            Saved ${activity.saved}
                          </span>
                        )}
                        {activity.rating && (
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} style={{
                                color: i < activity.rating ? '#fbbf24' : '#e5e7eb',
                                fill: i < activity.rating ? '#fbbf24' : 'transparent'
                              }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Popular Fixes & Challenges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px'
            }}>
              {/* Popular Fixes */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>
                    🔥 Trending DIY Fixes
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame size={20} style={{ color: '#ef4444' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#ef4444' }}>
                      HOT NOW
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {popularFixes.map((fix, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      style={{
                        padding: '16px',
                        background: fix.trending ? 'linear-gradient(135deg, #fef3c7, #fed7aa)' : '#f9fafb',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: fix.trending ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                        position: 'relative'
                      }}
                    >
                      {fix.trending && (
                        <div style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '8px',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          TRENDING
                        </div>
                      )}
                      
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        {fix.title}
                      </h4>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
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
                          💰 ${fix.saves}
                        </span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '12px',
                        borderTop: '1px solid #e5e7eb'
                      }}>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                          <span>{fix.success}% success</span>
                          <span>{fix.tutorials} videos</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: '#6b7280'
                        }}>
                          <Users size={12} />
                          {fix.completions}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '20px',
                padding: '28px',
                color: 'white'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                  🎯 Active Challenges
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {upcomingChallenges.map((challenge, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600' }}>
                          {challenge.title}
                        </h4>
                        <span style={{
                          padding: '2px 8px',
                          background: challenge.difficulty === 'Easy' ? 'rgba(34,197,94,0.2)' :
                                     challenge.difficulty === 'Medium' ? 'rgba(245,158,11,0.2)' :
                                     'rgba(239,68,68,0.2)',
                          borderRadius: '6px',
                          fontSize: '11px'
                        }}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                          <span style={{ opacity: 0.9 }}>Prize: {challenge.prize}</span>
                          <span style={{ opacity: 0.9 }}>{challenge.deadline}</span>
                        </div>
                        <div style={{
                          height: '4px',
                          background: 'rgba(0,0,0,0.2)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(challenge.participants / 500) * 100}%`,
                            height: '100%',
                            background: '#FFD700'
                          }} />
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', opacity: 0.9 }}>
                        {challenge.participants} participants
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEGENDARY NEW FEATURES SECTION */}
      {activeTab === 'overview' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '32px'
        }}>
          {/* AI Predictions */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              🤖 AI Predictions
            </h3>
            <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
              <p>📊 Your AC unit may need service in 2 weeks</p>
              <p>💧 Water heater efficiency down 12%</p>
              <p>⚡ You'll save $187 this month with DIY</p>
              <p>🎯 Next achievement unlocked in 3 repairs</p>
            </div>
          </motion.div>

          {/* Live Support Status */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              💬 24/7 Live Support
            </h3>
            <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
              <p>🟢 3 Experts Online Now</p>
              <p>⏱️ Average Response: 30 seconds</p>
              <p>🎥 Video Call Available</p>
              <p>🏆 98% Issue Resolution Rate</p>
            </div>
          </motion.div>

          {/* Savings Tracker */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              💰 Lifetime Savings
            </h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
              $47,892
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              <p>🚚 312 Truck Rolls Avoided</p>
              <p>⚡ 892 Hours Saved</p>
              <p>🌟 Top 1% of All Heroes</p>
            </div>
          </motion.div>
        </div>
      )}


      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </motion.div>
  );
};

export default UltimateTenantDashboard;