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
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showDIYModal, setShowDIYModal] = useState(false);
  const [showPredictionsModal, setShowPredictionsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDIY, setSelectedDIY] = useState(null);
  
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
                      onClick={() => {
                        setSelectedRepair(repair);
                        setShowRepairModal(true);
                        toast('Opening repair details...', { icon: '🔧' });
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
                    whileHover={{ y: -2, scale: 1.02 }}
                    style={{
                      padding: '16px',
                      background: activity.type === 'achievement' ? 'linear-gradient(135deg, #fef3c7, #fed7aa)' :
                                 activity.type === 'milestone' ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' :
                                 '#f9fafb',
                      borderRadius: '12px',
                      display: 'flex',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setShowActivityModal(true);
                      toast('Loading activity details...', { icon: '📊' });
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
                      onClick={() => {
                        setSelectedDIY(fix);
                        setShowDIYModal(true);
                        toast('Opening DIY tutorial...', { icon: '🔥' });
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

          {/* Live Support Status - ENHANCED */}
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(78,205,196,0.3)',
              y: -5
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              borderRadius: '20px',
              padding: '24px',
              color: 'white',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s'
            }}
            onClick={() => {
              setShowSupportModal(true);
              toast('Connecting to support...', { icon: '💬' });
            }}
          >
            <div style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: '12px',
              height: '12px',
              background: '#22c55e',
              borderRadius: '50%',
              border: '2px solid white',
              animation: 'pulse 2s infinite'
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <MessageSquare size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  24/7 Live Support
                </h3>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                  Expert help anytime
                </p>
              </div>
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.8 }}>
              <motion.p 
                whileHover={{ x: 5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}
              >
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  background: '#22c55e',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite'
                }} /> 3 Experts Online Now
              </motion.p>
              <motion.p 
                whileHover={{ x: 5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}
              >
                <span style={{ fontSize: '16px' }}>⏱️</span> Response: 30 seconds
              </motion.p>
              <motion.p 
                whileHover={{ x: 5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}
              >
                <span style={{ fontSize: '16px' }}>🎥</span> Video Call Available
              </motion.p>
              <motion.p 
                whileHover={{ x: 5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}
              >
                <span style={{ fontSize: '16px' }}>🏆</span> 98% Resolution Rate
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '10px',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid white',
                borderRadius: '10px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              Start Live Chat →
            </motion.button>
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


      {/* MODALS FOR CLICKABLE SECTIONS */}
      {showRepairModal && selectedRepair && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowRepairModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', color: '#1a1a1a' }}>🔧 Repair Details</h2>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '8px' }}>{selectedRepair.title}</h3>
              <p style={{ color: '#6b7280' }}>Status: {selectedRepair.status}</p>
              <p style={{ color: '#6b7280' }}>Due: {selectedRepair.dueIn}</p>
              <p style={{ color: '#10b981', fontWeight: 'bold' }}>Save ${selectedRepair.saves} by fixing yourself!</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Step-by-Step Instructions:</h4>
              <ol style={{ color: '#4b5563', lineHeight: 1.8 }}>
                <li>Turn off water supply valve under the sink</li>
                <li>Place bucket underneath to catch drips</li>
                <li>Unscrew aerator from faucet spout</li>
                <li>Replace O-ring and washer</li>
                <li>Reassemble and test for leaks</li>
              </ol>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Tools Needed:</h4>
              <ul style={{ color: '#4b5563' }}>
                <li>Adjustable wrench</li>
                <li>Replacement O-ring</li>
                <li>Plumber's tape</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowRepairModal(false);
                  toast.success('Starting repair tutorial!', { icon: '🎥' });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Watch Video Tutorial
              </button>
              <button
                onClick={() => setShowRepairModal(false)}
                style={{
                  padding: '12px 24px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showActivityModal && selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowActivityModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', color: '#1a1a1a' }}>📊 Activity Details</h2>
            <div style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '12px' }}>{selectedActivity.title}</h3>
              <p style={{ color: '#6b7280', marginBottom: '8px' }}>Completed: {selectedActivity.time}</p>
              <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '24px' }}>+{selectedActivity.points} points earned!</p>
              {selectedActivity.saved && (
                <p style={{ color: '#059669', fontWeight: '600' }}>Saved ${selectedActivity.saved}</p>
              )}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Impact:</h4>
              <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
                Great job! This repair prevented a service call and saved both time and money. 
                You're contributing to a more sustainable living environment!
              </p>
            </div>
            <button
              onClick={() => setShowActivityModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {showDIYModal && selectedDIY && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowDIYModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', color: '#1a1a1a' }}>🔥 {selectedDIY.title}</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <span style={{
                padding: '6px 12px',
                background: selectedDIY.difficulty === 'Easy' ? '#d1fae5' : '#fed7aa',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: selectedDIY.difficulty === 'Easy' ? '#065f46' : '#92400e'
              }}>
                {selectedDIY.difficulty}
              </span>
              <span style={{
                padding: '6px 12px',
                background: '#e0e7ff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#3730a3'
              }}>
                ⏱ {selectedDIY.time}
              </span>
              <span style={{
                padding: '6px 12px',
                background: '#d1fae5',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#065f46'
              }}>
                💰 Save ${selectedDIY.saves}
              </span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Success Rate: {selectedDIY.success}%</h4>
              <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${selectedDIY.success}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }} />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Available Tutorials: {selectedDIY.tutorials}</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                {[...Array(selectedDIY.tutorials)].map((_, i) => (
                  <div key={i} style={{
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <PlayCircle size={20} style={{ color: '#667eea' }} />
                    <span style={{ flex: 1, color: '#4b5563' }}>Tutorial {i + 1}: Step-by-step guide</span>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>5-10 min</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#6b7280' }}>
                <Users size={16} style={{ display: 'inline', marginRight: '6px' }} />
                {selectedDIY.completions} heroes have completed this fix
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowDIYModal(false);
                  toast.success('Starting tutorial!', { icon: '🎥' });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Start Tutorial
              </button>
              <button
                onClick={() => setShowDIYModal(false)}
                style={{
                  padding: '12px 24px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showPredictionsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowPredictionsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Brain size={32} style={{ color: '#667eea' }} />
              AI Home Analysis
            </h2>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '16px' }}>Predictive Maintenance Alert</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                  <h4 style={{ color: '#ef4444', marginBottom: '8px' }}>🌡️ AC Unit Service Required</h4>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>Based on usage patterns and age, your AC unit will need service in 2 weeks</p>
                  <p style={{ color: '#10b981', fontWeight: 'bold', marginTop: '8px' }}>Estimated savings: $450 vs emergency repair</p>
                </div>
                <div style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                  <h4 style={{ color: '#f59e0b', marginBottom: '8px' }}>💧 Water Heater Efficiency</h4>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>12% efficiency loss detected. Simple maintenance can restore performance</p>
                  <p style={{ color: '#10b981', fontWeight: 'bold', marginTop: '8px' }}>Monthly savings potential: $28</p>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>This Month's Projections:</h4>
              <ul style={{ color: '#4b5563', lineHeight: 2 }}>
                <li>💵 Total DIY Savings: $187</li>
                <li>🏆 Points to earn: 450</li>
                <li>🎯 Next achievement in 3 repairs</li>
                <li>📈 Efficiency improvement: 8%</li>
              </ul>
            </div>
            <button
              onClick={() => setShowPredictionsModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Got It!
            </button>
          </motion.div>
        </motion.div>
      )}

      {showSupportModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowSupportModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', color: '#1a1a1a' }}>💬 Live Support</h2>
            <div style={{
              padding: '16px',
              background: '#d1fae5',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#065f46', fontWeight: '600', fontSize: '18px' }}>
                🟢 3 Experts Online Now
              </p>
              <p style={{ color: '#047857', fontSize: '14px' }}>Average wait time: 30 seconds</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Available Support Channels:</h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                <button style={{
                  padding: '16px',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  <MessageSquare size={24} style={{ color: '#4ECDC4' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>Live Chat</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Instant text support</p>
                  </div>
                </button>
                <button style={{
                  padding: '16px',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <Video size={24} style={{ color: '#667eea' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>Video Call</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Face-to-face help</p>
                  </div>
                </button>
                <button style={{
                  padding: '16px',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <Phone size={24} style={{ color: '#f59e0b' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>Phone</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Call an expert</p>
                  </div>
                </button>
              </div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
              🏆 98% Issue Resolution Rate
            </p>
            <button
              onClick={() => {
                setShowSupportModal(false);
                toast.success('Connecting to support...', { icon: '📡' });
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Start Chat Now
            </button>
          </motion.div>
        </motion.div>
      )}

      {showSavingsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowSavingsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', color: '#1a1a1a', textAlign: 'center' }}>
              🏆 Your Lifetime Achievement
            </h2>
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              borderRadius: '16px',
              color: 'white',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '8px' }}>Total Saved</p>
              <p style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>$47,892</p>
              <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '8px' }}>Since joining DIY Heroes</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '32px', margin: 0 }}>🚚</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', margin: '8px 0' }}>312</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Truck Rolls Avoided</p>
              </div>
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '32px', margin: 0 }}>⏱</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: '8px 0' }}>892</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Hours Saved</p>
              </div>
            </div>
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              borderRadius: '12px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                🌟 Top 1% of All DIY Heroes 🌟
              </p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Breakdown by Category:</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f9fafb', borderRadius: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Plumbing</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981' }}>$18,450</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f9fafb', borderRadius: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Electrical</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981' }}>$12,320</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f9fafb', borderRadius: '8px' }}>
                  <span style={{ color: '#6b7280' }}>HVAC</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981' }}>$9,872</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f9fafb', borderRadius: '8px' }}>
                  <span style={{ color: '#6b7280' }}>General Maintenance</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981' }}>$7,250</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSavingsModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Amazing Work! Close
            </button>
          </motion.div>
        </motion.div>
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
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
};

export default UltimateTenantDashboard;