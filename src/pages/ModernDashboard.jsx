import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Star,
  Target,
  Trophy,
  Users,
  ArrowRight,
  Plus,
  Calendar,
  BarChart3,
  Activity,
  Wrench,
  ChevronRight,
  Shield,
  Flame,
  Heart,
  RefreshCw,
  Play
} from 'lucide-react';
import { api } from '../services/mockApi';
import toast from 'react-hot-toast';

function ModernDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeRepairs, setActiveRepairs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [streakAnimation, setStreakAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState(null);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadRecentActivity, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const [userResult, repairsResult] = await Promise.all([
        api.getUser(),
        api.search('')
      ]);
      
      setUserData(userResult.user);
      setActiveRepairs(repairsResult.results || []);
      setIsLoading(false);
      
      // Animate streak on load
      if (userResult.user.streak > 0) {
        setTimeout(() => setStreakAnimation(true), 500);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setIsLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    const activities = [
      { type: 'repair', message: 'Fixed washing machine', time: '2 min ago', xp: 150 },
      { type: 'achievement', message: 'Unlocked Quick Fixer badge', time: '1 hour ago' },
      { type: 'save', message: 'Saved $225 on dishwasher repair', time: '3 hours ago' },
      { type: 'level', message: 'Reached Level 13!', time: '1 day ago' }
    ];
    setRecentActivity(activities);
  };

  const StatCard = ({ icon: Icon, label, value, trend, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: selectedStat === label ? `2px solid ${color}` : '2px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        background: `${color}15`,
        borderRadius: '50%'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={24} color="white" />
          </div>
          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                background: trend > 0 ? '#d1fae5' : '#fee2e2',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: trend > 0 ? '#065f46' : '#991b1b'
              }}
            >
              <TrendingUp size={12} />
              {trend > 0 ? '+' : ''}{trend}%
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '4px',
            lineHeight: '1'
          }}>
            {value}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {label}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const QuickActionCard = ({ icon: Icon, title, description, color, action, badge }) => (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      onClick={action}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        border: '2px solid transparent',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {badge && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#ef4444',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 'bold'
          }}
        >
          {badge}
        </motion.div>
      )}
      
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={28} color={color} />
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '4px',
          color: '#1a1a1a'
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          {description}
        </p>
      </div>
      
      <ChevronRight size={20} color="#9ca3af" />
    </motion.div>
  );

  const ActiveRepairCard = ({ repair, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #e5e7eb',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/repair/${repair.id}`)}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          margin: 0,
          color: '#1a1a1a'
        }}>
          {repair.title}
        </h4>
        <span style={{
          padding: '4px 8px',
          background: '#fef3c7',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#92400e'
        }}>
          {repair.views} views
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '16px',
        fontSize: '13px',
        color: '#6b7280'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Wrench size={14} />
          {repair.solutions} solutions
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} />
          15-30 min
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <DollarSign size={14} />
          Save $150+
        </span>
      </div>
      
      <div style={{
        marginTop: '12px',
        height: '4px',
        background: '#e5e7eb',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.random() * 60 + 20}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
          }}
        />
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw size={48} color="#667eea" />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
      padding: '40px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            padding: '40px',
            marginBottom: '32px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Welcome back, {userData?.name?.split(' ')[0]}! 👋
              </h1>
              <p style={{
                fontSize: '18px',
                opacity: 0.9,
                marginBottom: '24px'
              }}>
                You're doing amazing - Level {userData?.level} DIY Hero
              </p>
              
              <div style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center'
              }}>
                <AnimatePresence>
                  {streakAnimation && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Flame size={24} color="#fbbf24" />
                      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {userData?.streak} Day Streak!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Trophy size={20} />
                  <span>{userData?.badges?.length || 0} Badges</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <DollarSign size={20} />
                  <span>${userData?.totalSaved || 0} Saved</span>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: '80px',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
              }}
            >
              🦸
            </motion.div>
          </div>
          
          {/* XP Progress Bar */}
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{ fontWeight: '600' }}>Level {userData?.level} Progress</span>
              <span>{userData?.xp} / {userData?.nextLevelXp} XP</span>
            </div>
            <div style={{
              height: '12px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userData?.xp / userData?.nextLevelXp) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                  boxShadow: '0 0 20px rgba(251,191,36,0.5)'
                }}
              />
            </div>
            <p style={{
              marginTop: '8px',
              fontSize: '14px',
              opacity: 0.8
            }}>
              {userData?.nextLevelXp - userData?.xp} XP to Level {userData?.level + 1}
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <StatCard
            icon={CheckCircle}
            label="Repairs Completed"
            value={userData?.repairsCompleted || 0}
            trend={12}
            color="#10b981"
            onClick={() => setSelectedStat('Repairs Completed')}
          />
          <StatCard
            icon={DollarSign}
            label="Money Saved"
            value={`$${userData?.totalSaved || 0}`}
            trend={23}
            color="#f59e0b"
            onClick={() => setSelectedStat('Money Saved')}
          />
          <StatCard
            icon={Target}
            label="Success Rate"
            value={`${userData?.successRate || 0}%`}
            trend={5}
            color="#3b82f6"
            onClick={() => setSelectedStat('Success Rate')}
          />
          <StatCard
            icon={Clock}
            label="Avg Fix Time"
            value="18 min"
            trend={-15}
            color="#8b5cf6"
            onClick={() => setSelectedStat('Avg Fix Time')}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '32px' }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#1a1a1a'
          }}>
            Quick Actions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            <QuickActionCard
              icon={Plus}
              title="Start New Repair"
              description="Fix something right now"
              color="#10b981"
              action={() => navigate('/new-repair')}
              badge="QUICK"
            />
            <QuickActionCard
              icon={AlertCircle}
              title="Emergency Fix"
              description="Urgent help needed"
              color="#ef4444"
              action={() => navigate('/quick-fix')}
            />
            <QuickActionCard
              icon={Calendar}
              title="Schedule Technician"
              description="Book professional help"
              color="#3b82f6"
              action={() => navigate('/schedule-technician')}
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '32px'
        }}>
          {/* Active Repairs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1a1a1a'
              }}>
                Popular Fixes Right Now
              </h2>
              <Link
                to="/new-repair"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div>
              {activeRepairs.slice(0, 4).map((repair, index) => (
                <ActiveRepairCard key={repair.id} repair={repair} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Recent Activity & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Achievement Progress */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#1a1a1a'
              }}>
                Next Achievement
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  🏅
                </div>
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: '#1a1a1a'
                  }}>
                    Speed Demon
                  </h4>
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    Complete 5 repairs under 10 minutes
                  </p>
                </div>
              </div>
              
              <div style={{
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
                  }}
                />
              </div>
              <p style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                3 of 5 completed
              </p>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#1a1a1a'
              }}>
                Recent Activity
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: '#f9fafb',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: activity.type === 'repair' ? '#d1fae5' :
                                  activity.type === 'achievement' ? '#fef3c7' :
                                  activity.type === 'save' ? '#dbeafe' : '#ede9fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {activity.type === 'repair' ? <Wrench size={18} color="#065f46" /> :
                       activity.type === 'achievement' ? <Trophy size={18} color="#92400e" /> :
                       activity.type === 'save' ? <DollarSign size={18} color="#1e40af" /> :
                       <Star size={18} color="#5b21b6" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '2px',
                        color: '#1a1a1a'
                      }}>
                        {activity.message}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        {activity.time}
                        {activity.xp && (
                          <span style={{
                            marginLeft: '8px',
                            padding: '2px 6px',
                            background: '#fef3c7',
                            borderRadius: '4px',
                            color: '#92400e',
                            fontWeight: '600'
                          }}>
                            +{activity.xp} XP
                          </span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Link
                to="/achievements"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '16px',
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                View All Activity →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '32px',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '24px',
            padding: '32px',
            border: '2px solid #0ea5e9'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#0369a1'
              }}>
                Join the Community Challenge!
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#0c4a6e'
              }}>
                This week: Most appliances fixed wins $500 in tools!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/leaderboard')}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Users size={20} />
              View Leaderboard
            </motion.button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            {[
              { name: 'You', repairs: 23, rank: 4, avatar: '🦸' },
              { name: 'DIYMaster', repairs: 45, rank: 1, avatar: '👑' },
              { name: 'FixItFelix', repairs: 38, rank: 2, avatar: '🔧' },
              { name: 'HomeHero', repairs: 31, rank: 3, avatar: '🏠' }
            ].map((user, index) => (
              <motion.div
                key={user.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                style={{
                  background: user.name === 'You' ? 'white' : 'rgba(255,255,255,0.7)',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: user.name === 'You' ? '2px solid #0ea5e9' : 'none'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{user.avatar}</div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '4px',
                  color: '#1a1a1a'
                }}>
                  {user.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {user.repairs} repairs
                </div>
                <div style={{
                  marginTop: '8px',
                  padding: '4px 8px',
                  background: user.rank === 1 ? '#fbbf24' :
                             user.rank === 2 ? '#d1d5db' :
                             user.rank === 3 ? '#f97316' : '#e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: user.rank <= 3 ? 'white' : '#6b7280'
                }}>
                  #{user.rank}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ModernDashboard;