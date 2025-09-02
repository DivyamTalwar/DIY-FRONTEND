import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Wrench, TrendingUp, Award, Heart, DollarSign, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { userProgress, demoRepairs, leaderboard } from '../data/demoData';

function HeroDashboard() {
  const [showConfetti, setShowConfetti] = useState(false);
  const xpPercentage = (userProgress.xp / userProgress.nextLevelXp) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const DifficultyStars = ({ level }) => {
    return (
      <div className="difficulty-stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < level ? 'star' : 'star empty'} fill={i < level ? '#FFD700' : '#E5E7EB'} />
        ))}
      </div>
    );
  };

  const ProgressRing = ({ progress }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width="100" height="100" className="progress-ring">
        <circle
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="none"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="progress-ring-circle"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="#1A1A1A">
          {progress}%
        </text>
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)', padding: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '32px' }}
      >
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div className="hero-avatar float-animation">
                🦸‍♂️
              </div>
              <div>
                <h2 style={{ fontSize: '28px', margin: 0 }}>{userProgress.title}</h2>
                <p style={{ color: '#6B7280', margin: '4px 0' }}>Level {userProgress.level} Hero</p>
                <div className="streak-badge">
                  🔥 {userProgress.streak} day streak!
                </div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>XP Progress</span>
                <span style={{ color: '#6B7280' }}>{userProgress.xp} / {userProgress.nextLevelXp}</span>
              </div>
              <div className="xp-bar">
                <motion.div 
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {Math.round(xpPercentage)}%
                </motion.div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                {userProgress.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="badge badge-gold"
                    title={badge.description}
                  >
                    {badge.icon} {badge.name}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <ProgressRing progress={Math.round(userProgress.successRate)} />
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280' }}>Success Rate</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Active Missions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {demoRepairs.slice(0, 3).map((repair, index) => (
              <motion.div
                key={repair.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/repair/${repair.id}`} style={{ textDecoration: 'none' }}>
                  <div className="mission-card">
                    {repair.urgent && <div className="urgent-badge pulse-animation">URGENT</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#1A1A1A' }}>{repair.title}</h3>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                          <DifficultyStars level={repair.difficulty} />
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '14px' }}>
                            <Clock size={14} /> {repair.estimatedTime}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '14px' }}>
                            <Wrench size={14} /> {repair.tools.length} tools
                          </span>
                        </div>
                        <div className="badge badge-blue">
                          +{repair.xpReward} XP
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Success Rate</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#00C853' }}>{repair.successRate}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <Link to="/new-repair">
            <motion.button
              className="button-primary"
              style={{ marginTop: '24px', width: '100%' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              + Start New Mission
            </motion.button>
          </Link>
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
            style={{ marginBottom: '24px' }}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Quick Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={20} color="#FF3B30" />
                  Lives Remaining
                </span>
                <span style={{ fontWeight: 'bold' }}>{userProgress.livesRemaining}/3</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={20} color="#00C853" />
                  Money Saved
                </span>
                <span style={{ fontWeight: 'bold' }}>${userProgress.savedMoney}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={20} color="#0066FF" />
                  Repairs Done
                </span>
                <span style={{ fontWeight: 'bold' }}>{userProgress.completedRepairs}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={20} color="#FFD700" />
                  Success Rate
                </span>
                <span style={{ fontWeight: 'bold' }}>{userProgress.successRate}%</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Community Feed</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#F5F7FA', borderRadius: '8px' }}>
                <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                  <strong>John</strong> just fixed his dishwasher!
                </p>
                <span className="badge badge-gold" style={{ fontSize: '11px' }}>+250 XP</span>
              </div>
              <div style={{ padding: '12px', background: '#F5F7FA', borderRadius: '8px' }}>
                <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                  <strong>Sarah</strong> unlocked Master Plumber badge!
                </p>
                <span style={{ fontSize: '24px' }}>🏆</span>
              </div>
              <div style={{ padding: '12px', background: '#F5F7FA', borderRadius: '8px' }}>
                <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                  <strong>Mike</strong> is on a 30-day streak!
                </p>
                <span style={{ fontSize: '24px' }}>🔥</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default HeroDashboard;