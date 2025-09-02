import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  Flame,
  Target,
  Gift,
  DollarSign,
  Clock,
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Globe,
  MapPin,
  Calendar,
  BarChart3,
  Activity,
  Sparkles,
  Shield,
  Sword,
  Heart
} from 'lucide-react';
import { api } from '../services/mockApi';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

function EpicLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('week');
  const [categoryFilter, setCategoryFilter] = useState('overall');
  const [regionFilter, setRegionFilter] = useState('global');
  const [userRank, setUserRank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [animateRankChange, setAnimateRankChange] = useState({});

  const categories = [
    { id: 'overall', name: 'Overall', icon: Trophy, color: '#fbbf24' },
    { id: 'repairs', name: 'Most Repairs', icon: Wrench, color: '#10b981' },
    { id: 'speed', name: 'Fastest Fixes', icon: Zap, color: '#3b82f6' },
    { id: 'savings', name: 'Money Saved', icon: DollarSign, color: '#8b5cf6' },
    { id: 'streak', name: 'Longest Streak', icon: Flame, color: '#ef4444' },
    { id: 'helper', name: 'Community Helper', icon: Heart, color: '#ec4899' }
  ];

  const timeFilters = [
    { id: 'today', name: 'Today', icon: Clock },
    { id: 'week', name: 'This Week', icon: Calendar },
    { id: 'month', name: 'This Month', icon: Calendar },
    { id: 'all', name: 'All Time', icon: Globe }
  ];

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(updateRankings, 10000);
    return () => clearInterval(interval);
  }, [timeFilter, categoryFilter, regionFilter]);

  const loadLeaderboard = async () => {
    try {
      const result = await api.getLeaderboard();
      const enhancedData = result.leaderboard.map((user, index) => ({
        ...user,
        previousRank: user.rank,
        avatar: ['🦸', '👨‍🔧', '👩‍🔧', '🧑‍🔧', '👷', '🦹'][index % 6],
        country: ['USA', 'UK', 'Canada', 'Australia', 'Germany'][index % 5],
        badge: index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : null,
        isOnline: Math.random() > 0.3,
        streak: Math.floor(Math.random() * 30) + 1,
        trophies: Math.floor(Math.random() * 10) + 1,
        avgTime: Math.floor(Math.random() * 20) + 10,
        successRate: Math.floor(Math.random() * 20) + 75,
        trending: Math.random() > 0.7
      }));
      
      setLeaderboardData(enhancedData);
      const currentUser = enhancedData.find(u => u.highlight);
      setUserRank(currentUser);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load leaderboard');
      setIsLoading(false);
    }
  };

  const updateRankings = () => {
    // Simulate rank changes
    setLeaderboardData(prev => {
      const updated = [...prev];
      const changes = {};
      
      // Randomly change some ranks
      for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * Math.min(5, updated.length));
        if (idx > 0) {
          [updated[idx], updated[idx - 1]] = [updated[idx - 1], updated[idx]];
          changes[updated[idx].name] = 'up';
          changes[updated[idx - 1].name] = 'down';
        }
      }
      
      setAnimateRankChange(changes);
      setTimeout(() => setAnimateRankChange({}), 2000);
      
      return updated.map((user, index) => ({
        ...user,
        rank: index + 1
      }));
    });
  };

  const celebrateRank = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#d97706']
    });
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#fbbf24';
    if (rank === 2) return '#9ca3af';
    if (rank === 3) return '#f97316';
    if (rank <= 10) return '#8b5cf6';
    if (rank <= 50) return '#3b82f6';
    return '#6b7280';
  };

  const LeaderboardRow = ({ user, index }) => {
    const isCurrentUser = user.highlight;
    const rankChange = animateRankChange[user.name];
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        whileHover={{ scale: 1.02, x: 10 }}
        onClick={() => setSelectedUser(user)}
        style={{
          background: isCurrentUser ? 
            'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)' : 
            'white',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '12px',
          cursor: 'pointer',
          border: isCurrentUser ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: user.rank <= 3 ? `0 8px 30px ${getRankColor(user.rank)}20` : '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {user.trending && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '6px',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <TrendingUp size={12} />
            HOT
          </motion.div>
        )}
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Rank */}
          <div style={{
            position: 'relative',
            minWidth: '60px',
            textAlign: 'center'
          }}>
            {user.rank <= 3 ? (
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontSize: '36px',
                  filter: `drop-shadow(0 4px 8px ${getRankColor(user.rank)}40)`
                }}
              >
                {user.badge}
              </motion.div>
            ) : (
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: getRankColor(user.rank)
              }}>
                #{user.rank}
              </div>
            )}
            
            {rankChange && (
              <motion.div
                initial={{ opacity: 0, y: rankChange === 'up' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  color: rankChange === 'up' ? '#10b981' : '#ef4444'
                }}
              >
                {rankChange === 'up' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.div>
            )}
          </div>
          
          {/* Avatar & User Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: 1
          }}>
            <div style={{
              position: 'relative'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${getRankColor(user.rank)} 0%, ${getRankColor(user.rank)}dd 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                boxShadow: `0 4px 20px ${getRankColor(user.rank)}30`
              }}>
                {user.avatar}
              </div>
              {user.isOnline && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '16px',
                  height: '16px',
                  background: '#10b981',
                  border: '3px solid white',
                  borderRadius: '50%'
                }} />
              )}
            </div>
            
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1a1a1a'
                }}>
                  {user.name}
                  {isCurrentUser && ' (You)'}
                </h3>
                {user.level >= 40 && (
                  <Shield size={16} color="#8b5cf6" />
                )}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '13px',
                color: '#6b7280'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} />
                  {user.country}
                </span>
                <span>Level {user.level}</span>
                {user.streak > 7 && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#ef4444'
                  }}>
                    <Flame size={12} />
                    {user.streak} days
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1a1a1a'
              }}>
                {user.repairs}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#6b7280'
              }}>
                Repairs
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#10b981'
              }}>
                ${user.saved}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#6b7280'
              }}>
                Saved
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#f59e0b'
              }}>
                {user.xp.toLocaleString()}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#6b7280'
              }}>
                XP
              </div>
            </div>
          </div>
          
          {/* Trophies */}
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            {[...Array(Math.min(user.trophies, 3))].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trophy size={18} color="white" />
              </motion.div>
            ))}
            {user.trophies > 3 && (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#6b7280'
              }}>
                +{user.trophies - 3}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Trophy size={60} color="#fbbf24" />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
      position: 'relative'
    }}>
      {/* Animated Background */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-100, 100],
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${categories[i]?.color}10 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
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
                fontSize: '40px',
                fontWeight: 'bold',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Trophy size={48} />
                Global Leaderboard
              </h1>
              <p style={{
                fontSize: '18px',
                opacity: 0.95
              }}>
                Compete with DIY heroes worldwide and claim your spot at the top!
              </p>
            </div>
            
            {userRank && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                onClick={celebrateRank}
                style={{
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '24px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  #{userRank.rank}
                </div>
                <div style={{
                  fontSize: '14px',
                  opacity: 0.9
                }}>
                  Your Global Rank
                </div>
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  opacity: 0.8
                }}>
                  Top {Math.round((userRank.rank / leaderboardData.length) * 100)}%
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            {/* Category Filter */}
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              {categories.map(cat => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategoryFilter(cat.id)}
                  style={{
                    padding: '10px 16px',
                    background: categoryFilter === cat.id ? 
                      `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}dd 100%)` : 
                      'white',
                    color: categoryFilter === cat.id ? 'white' : '#6b7280',
                    border: `2px solid ${categoryFilter === cat.id ? cat.color : '#e5e7eb'}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <cat.icon size={16} />
                  {cat.name}
                </motion.button>
              ))}
            </div>
            
            {/* Time Filter */}
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              {timeFilters.map(time => (
                <button
                  key={time.id}
                  onClick={() => setTimeFilter(time.id)}
                  style={{
                    padding: '10px 16px',
                    background: timeFilter === time.id ? '#667eea' : 'white',
                    color: timeFilter === time.id ? 'white' : '#6b7280',
                    border: `2px solid ${timeFilter === time.id ? '#667eea' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <time.icon size={14} />
                  {time.name}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div style={{
              position: 'relative',
              width: '200px'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr 1fr',
            gap: '20px',
            marginBottom: '40px',
            alignItems: 'flex-end'
          }}
        >
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <motion.div
              whileHover={{ y: -10 }}
              style={{
                background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '12px'
              }}>
                🥈
              </div>
              <div style={{
                fontSize: '36px',
                marginBottom: '8px'
              }}>
                {leaderboardData[1].avatar}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '4px'
              }}>
                {leaderboardData[1].name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '12px'
              }}>
                Level {leaderboardData[1].level}
              </p>
              <div style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {leaderboardData[1].xp.toLocaleString()} XP
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {leaderboardData[1].repairs} repairs
                </div>
              </div>
            </motion.div>
          )}
          
          {/* 1st Place */}
          {leaderboardData[0] && (
            <motion.div
              whileHover={{ y: -10 }}
              animate={{
                boxShadow: [
                  '0 20px 60px rgba(251,191,36,0.3)',
                  '0 20px 80px rgba(245,158,11,0.4)',
                  '0 20px 60px rgba(251,191,36,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontSize: '64px',
                  marginBottom: '12px',
                  filter: 'drop-shadow(0 8px 16px rgba(251,191,36,0.4))'
                }}
              >
                👑
              </motion.div>
              <div style={{
                fontSize: '48px',
                marginBottom: '8px'
              }}>
                {leaderboardData[0].avatar}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '4px'
              }}>
                {leaderboardData[0].name}
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '16px'
              }}>
                Level {leaderboardData[0].level} • {leaderboardData[0].country}
              </p>
              <div style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {leaderboardData[0].xp.toLocaleString()} XP
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.9)'
                }}>
                  {leaderboardData[0].repairs} repairs • ${leaderboardData[0].saved} saved
                </div>
              </div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  transform: 'rotate(12deg)'
                }}
              >
                CHAMPION
              </motion.div>
            </motion.div>
          )}
          
          {/* 3rd Place */}
          {leaderboardData[2] && (
            <motion.div
              whileHover={{ y: -10 }}
              style={{
                background: 'linear-gradient(135deg, #fed7aa 0%, #f97316 100%)',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '12px'
              }}>
                🥉
              </div>
              <div style={{
                fontSize: '36px',
                marginBottom: '8px'
              }}>
                {leaderboardData[2].avatar}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '4px'
              }}>
                {leaderboardData[2].name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '12px'
              }}>
                Level {leaderboardData[2].level}
              </p>
              <div style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {leaderboardData[2].xp.toLocaleString()} XP
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {leaderboardData[2].repairs} repairs
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Full Leaderboard */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#1a1a1a'
          }}>
            Complete Rankings
          </h2>
          
          {leaderboardData
            .filter(user => 
              searchQuery ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
            )
            .map((user, index) => (
              <LeaderboardRow key={user.name} user={user} index={index} />
            ))}
        </div>

        {/* Prize Pool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '40px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
            borderRadius: '24px',
            padding: '32px',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            🎁 Weekly Prize Pool
          </h2>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            $1,000
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🥇</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$500</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>1st Place</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🥈</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$300</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>2nd Place</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🥉</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$200</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>3rd Place</div>
            </div>
          </div>
          <p style={{
            marginTop: '20px',
            fontSize: '14px',
            opacity: 0.9
          }}>
            Contest ends in 3 days, 14 hours
          </p>
        </motion.div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '600px',
                width: '100%'
              }}
            >
              <div style={{
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <div style={{
                  fontSize: '64px',
                  marginBottom: '16px'
                }}>
                  {selectedUser.avatar}
                </div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#1a1a1a'
                }}>
                  {selectedUser.name}
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  Rank #{selectedUser.rank} • Level {selectedUser.level} • {selectedUser.country}
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
                    {selectedUser.repairs}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Total Repairs</div>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                    ${selectedUser.saved}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Money Saved</div>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
                    {selectedUser.xp.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Total XP</div>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>
                    {selectedUser.streak}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Day Streak</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <button
                  onClick={() => {
                    toast.success(`Following ${selectedUser.name}!`);
                    setSelectedUser(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Follow User
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  style={{
                    padding: '12px 24px',
                    background: '#f3f4f6',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EpicLeaderboard;