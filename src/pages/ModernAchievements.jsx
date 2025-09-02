import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Star,
  Lock,
  Unlock,
  TrendingUp,
  Target,
  Award,
  Zap,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Heart,
  Shield,
  Flame,
  Medal,
  Gift,
  Sparkles,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/mockApi';
import toast from 'react-hot-toast';

function ModernAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All', icon: Trophy, color: '#667eea' },
    { id: 'speed', name: 'Speed', icon: Zap, color: '#f59e0b' },
    { id: 'savings', name: 'Savings', icon: DollarSign, color: '#10b981' },
    { id: 'streak', name: 'Streaks', icon: Flame, color: '#ef4444' },
    { id: 'mastery', name: 'Mastery', icon: Crown, color: '#8b5cf6' },
    { id: 'community', name: 'Community', icon: Users, color: '#3b82f6' }
  ];

  const allAchievements = [
    // Speed Achievements
    {
      id: 1,
      category: 'speed',
      name: 'Lightning Fast',
      description: 'Complete a repair in under 5 minutes',
      icon: '⚡',
      xp: 100,
      rarity: 'common',
      progress: 1,
      total: 1,
      unlocked: true,
      unlockedDate: '2024-01-15'
    },
    {
      id: 2,
      category: 'speed',
      name: 'Speed Demon',
      description: 'Complete 5 repairs under 10 minutes',
      icon: '🏎️',
      xp: 250,
      rarity: 'rare',
      progress: 3,
      total: 5,
      unlocked: false
    },
    {
      id: 3,
      category: 'speed',
      name: 'Time Lord',
      description: 'Complete 20 repairs under 15 minutes',
      icon: '⏱️',
      xp: 500,
      rarity: 'epic',
      progress: 12,
      total: 20,
      unlocked: false
    },
    // Savings Achievements
    {
      id: 4,
      category: 'savings',
      name: 'Penny Pincher',
      description: 'Save $100 on repairs',
      icon: '💰',
      xp: 150,
      rarity: 'common',
      progress: 100,
      total: 100,
      unlocked: true,
      unlockedDate: '2024-01-10'
    },
    {
      id: 5,
      category: 'savings',
      name: 'Money Saver',
      description: 'Save $500 on repairs',
      icon: '💵',
      xp: 300,
      rarity: 'rare',
      progress: 425,
      total: 500,
      unlocked: false
    },
    {
      id: 6,
      category: 'savings',
      name: 'Financial Wizard',
      description: 'Save $2000 on repairs',
      icon: '🏦',
      xp: 750,
      rarity: 'legendary',
      progress: 847,
      total: 2000,
      unlocked: false
    },
    // Streak Achievements
    {
      id: 7,
      category: 'streak',
      name: 'Getting Started',
      description: '3 day repair streak',
      icon: '🔥',
      xp: 100,
      rarity: 'common',
      progress: 3,
      total: 3,
      unlocked: true,
      unlockedDate: '2024-02-01'
    },
    {
      id: 8,
      category: 'streak',
      name: 'On Fire',
      description: '7 day repair streak',
      icon: '🔥',
      xp: 200,
      rarity: 'rare',
      progress: 7,
      total: 7,
      unlocked: true,
      unlockedDate: '2024-02-05'
    },
    {
      id: 9,
      category: 'streak',
      name: 'Unstoppable',
      description: '30 day repair streak',
      icon: '🌟',
      xp: 1000,
      rarity: 'legendary',
      progress: 7,
      total: 30,
      unlocked: false
    },
    // Mastery Achievements
    {
      id: 10,
      category: 'mastery',
      name: 'Apprentice',
      description: 'Reach Level 5',
      icon: '🎓',
      xp: 150,
      rarity: 'common',
      progress: 5,
      total: 5,
      unlocked: true,
      unlockedDate: '2024-01-20'
    },
    {
      id: 11,
      category: 'mastery',
      name: 'Expert',
      description: 'Reach Level 20',
      icon: '🏅',
      xp: 500,
      rarity: 'rare',
      progress: 12,
      total: 20,
      unlocked: false
    },
    {
      id: 12,
      category: 'mastery',
      name: 'Master',
      description: 'Reach Level 50',
      icon: '👑',
      xp: 2000,
      rarity: 'legendary',
      progress: 12,
      total: 50,
      unlocked: false
    },
    // Community Achievements
    {
      id: 13,
      category: 'community',
      name: 'Helper',
      description: 'Help 5 community members',
      icon: '🤝',
      xp: 200,
      rarity: 'common',
      progress: 3,
      total: 5,
      unlocked: false
    },
    {
      id: 14,
      category: 'community',
      name: 'Mentor',
      description: 'Get 10 helpful votes',
      icon: '👨‍🏫',
      xp: 400,
      rarity: 'rare',
      progress: 6,
      total: 10,
      unlocked: false
    },
    {
      id: 15,
      category: 'community',
      name: 'Legend',
      description: 'Reach #1 on leaderboard',
      icon: '🏆',
      xp: 1500,
      rarity: 'legendary',
      progress: 0,
      total: 1,
      unlocked: false
    }
  ];

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const userResult = await api.getUser();
      setUserStats(userResult.user);
      setAchievements(allAchievements);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load achievements');
      setIsLoading(false);
    }
  };

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    if (achievement.unlocked && !achievement.celebrated) {
      celebrateAchievement();
    }
  };

  const celebrateAchievement = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return '#6b7280';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getRarityGlow = (rarity) => {
    switch(rarity) {
      case 'common': return 'none';
      case 'rare': return '0 0 20px rgba(59,130,246,0.3)';
      case 'epic': return '0 0 30px rgba(139,92,246,0.4)';
      case 'legendary': return '0 0 40px rgba(245,158,11,0.5)';
      default: return 'none';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionRate = Math.round((unlockedCount / achievements.length) * 100);

  const AchievementCard = ({ achievement, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ 
        scale: achievement.unlocked ? 1.05 : 1.02,
        boxShadow: achievement.unlocked ? getRarityGlow(achievement.rarity) : 'none'
      }}
      onClick={() => handleAchievementClick(achievement)}
      style={{
        background: achievement.unlocked ? 'white' : '#f3f4f6',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        border: `2px solid ${achievement.unlocked ? getRarityColor(achievement.rarity) : '#e5e7eb'}`,
        opacity: achievement.unlocked ? 1 : 0.7,
        transition: 'all 0.3s ease'
      }}
    >
      {achievement.unlocked && (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(245,158,11,0.4)'
          }}
        >
          <Sparkles size={20} color="white" />
        </motion.div>
      )}
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <motion.div
          animate={achievement.unlocked ? {
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: '48px',
            marginBottom: '12px',
            filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
          }}
        >
          {achievement.icon}
        </motion.div>
        
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '4px',
          color: achievement.unlocked ? '#1a1a1a' : '#6b7280'
        }}>
          {achievement.name}
        </h3>
        
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          marginBottom: '12px'
        }}>
          {achievement.description}
        </p>
        
        {!achievement.unlocked && (
          <div style={{ width: '100%', marginBottom: '8px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#6b7280',
              marginBottom: '4px'
            }}>
              <span>Progress</span>
              <span>{achievement.progress}/{achievement.total}</span>
            </div>
            <div style={{
              height: '6px',
              background: '#e5e7eb',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.05 }}
                style={{
                  height: '100%',
                  background: getRarityColor(achievement.rarity)
                }}
              />
            </div>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            padding: '4px 8px',
            background: achievement.unlocked ? `${getRarityColor(achievement.rarity)}20` : '#f3f4f6',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            color: achievement.unlocked ? getRarityColor(achievement.rarity) : '#9ca3af'
          }}>
            {achievement.rarity.toUpperCase()}
          </span>
          <span style={{
            padding: '4px 8px',
            background: achievement.unlocked ? '#fef3c7' : '#f3f4f6',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            color: achievement.unlocked ? '#92400e' : '#9ca3af'
          }}>
            +{achievement.xp} XP
          </span>
        </div>
        
        {achievement.unlocked && achievement.unlockedDate && (
          <p style={{
            marginTop: '8px',
            fontSize: '10px',
            color: '#9ca3af'
          }}>
            Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </motion.div>
  );

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
          <Trophy size={48} color="#667eea" />
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
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Trophy size={40} />
                Your Achievements
              </h1>
              <p style={{
                fontSize: '18px',
                opacity: 0.9
              }}>
                Unlock badges, earn XP, and become a DIY legend!
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.2)',
              padding: '20px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                {unlockedCount}/{achievements.length}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Achievements Unlocked
              </div>
              <div style={{
                marginTop: '8px',
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {completionRate}% Complete
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <Star size={24} color="#f59e0b" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
              {totalXP}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total XP Earned</div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <Medal size={24} color="#3b82f6" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
              {achievements.filter(a => a.rarity === 'legendary').filter(a => a.unlocked).length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Legendary</div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <Flame size={24} color="#ef4444" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
              {userStats?.streak || 7}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Day Streak</div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <Crown size={24} color="#8b5cf6" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
              Level {userStats?.level || 12}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Current Level</div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            overflowX: 'auto',
            padding: '4px'
          }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '12px 24px',
                background: selectedCategory === category.id ? category.color : 'white',
                color: selectedCategory === category.id ? 'white' : '#6b7280',
                border: `2px solid ${selectedCategory === category.id ? category.color : '#e5e7eb'}`,
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <category.icon size={18} />
              {category.name}
              <span style={{
                padding: '2px 6px',
                background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {category.id === 'all' 
                  ? achievements.length 
                  : achievements.filter(a => a.category === category.id).length}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>

        {/* Next Achievement Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            padding: '32px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            Next Achievement Within Reach!
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px'
          }}>
            <div style={{
              fontSize: '64px',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.2))'
            }}>
              🏎️
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Speed Demon
              </h3>
              <p style={{
                fontSize: '16px',
                opacity: 0.9,
                marginBottom: '12px'
              }}>
                Complete 5 repairs under 10 minutes
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      height: '100%',
                      background: 'white'
                    }}
                  />
                </div>
                <span style={{ fontWeight: 'bold' }}>3/5</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
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
                maxWidth: '500px',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '80px',
                marginBottom: '24px',
                filter: selectedAchievement.unlocked ? 'none' : 'grayscale(100%)'
              }}>
                {selectedAchievement.icon}
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#1a1a1a'
              }}>
                {selectedAchievement.name}
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                {selectedAchievement.description}
              </p>
              {selectedAchievement.unlocked ? (
                <div style={{
                  padding: '16px',
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}>
                  <CheckCircle size={24} color="#10b981" style={{ marginBottom: '8px' }} />
                  <p style={{ color: '#065f46', fontWeight: '600' }}>
                    Unlocked on {new Date(selectedAchievement.unlockedDate).toLocaleDateString()}
                  </p>
                  <p style={{ color: '#10b981', fontSize: '14px', marginTop: '4px' }}>
                    +{selectedAchievement.xp} XP Earned
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{
                    marginBottom: '16px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#6b7280' }}>Progress</span>
                      <span style={{ fontWeight: '600', color: '#1a1a1a' }}>
                        {selectedAchievement.progress}/{selectedAchievement.total}
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          width: `${(selectedAchievement.progress / selectedAchievement.total) * 100}%`,
                          height: '100%',
                          background: getRarityColor(selectedAchievement.rarity)
                        }}
                      />
                    </div>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    Keep going! You're {Math.round((selectedAchievement.progress / selectedAchievement.total) * 100)}% there!
                  </p>
                </div>
              )}
              <button
                onClick={() => setSelectedAchievement(null)}
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
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModernAchievements;