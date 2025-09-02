import { motion } from 'framer-motion';
import { Trophy, Medal, TrendingUp, Users, Zap } from 'lucide-react';
import { leaderboard } from '../data/demoData';

function Leaderboard() {
  const currentUserRank = leaderboard.find(entry => entry.isCurrentUser);

  return (
    <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
          <span className="hero-title">Community Champions</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#6B7280' }}>
          Compete with fellow DIY Heroes in your area!
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '48px' }}>
        {leaderboard.slice(0, 3).map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: index === 0 ? -20 : 0 }}
            transition={{ delay: index * 0.2 }}
            className="card"
            style={{
              background: index === 0 
                ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                : index === 1
                ? 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'
                : 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
              color: 'white',
              textAlign: 'center',
              transform: index === 0 ? 'scale(1.1)' : 'scale(1)',
              order: index === 0 ? 2 : index === 1 ? 1 : 3
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '64px', marginBottom: '16px' }}
            >
              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
            </motion.div>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{entry.avatar}</div>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{entry.name}</h2>
            <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '16px' }}>Level {entry.level}</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{entry.xp.toLocaleString()}</div>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>XP Points</p>
            <p style={{ marginTop: '8px', fontSize: '14px' }}>{entry.repairs} repairs completed</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="card"
        style={{ marginBottom: '32px' }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={24} color="#FFD700" />
          Full Rankings
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                background: entry.isCurrentUser 
                  ? 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)'
                  : '#F5F7FA',
                borderRadius: '12px',
                color: entry.isCurrentUser ? 'white' : '#1A1A1A',
                border: entry.isCurrentUser ? '2px solid #0066FF' : 'none'
              }}
            >
              <div style={{ 
                width: '40px', 
                fontSize: '24px', 
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                #{entry.rank}
              </div>
              
              <div style={{ fontSize: '32px', margin: '0 16px' }}>{entry.avatar}</div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px' }}>{entry.name}</h3>
                  {entry.isCurrentUser && (
                    <span style={{ 
                      background: 'rgba(255,255,255,0.2)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      YOU
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                  Level {entry.level} • {entry.repairs} repairs
                </p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{entry.xp.toLocaleString()} XP</p>
                {index < leaderboard.length - 1 && (
                  <p style={{ fontSize: '12px', opacity: 0.7 }}>
                    {leaderboard[index + 1].xp - entry.xp} to next
                  </p>
                )}
              </div>
              
              {entry.rank <= 3 && (
                <div style={{ marginLeft: '16px', fontSize: '24px' }}>
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="card"
          style={{ background: 'linear-gradient(135deg, #00C853 0%, #00A843 100%)', color: 'white' }}
        >
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} />
            This Week's Challenge
          </h3>
          <p style={{ fontSize: '16px', marginBottom: '12px' }}>
            "Speed Week" - Complete 3 repairs in under 20 minutes each
          </p>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            Reward: 500 bonus XP + Speed Demon badge
          </div>
          <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', height: '8px' }}>
            <div style={{ background: 'white', height: '100%', width: '33%', borderRadius: '8px' }} />
          </div>
          <p style={{ marginTop: '8px', fontSize: '12px' }}>1/3 completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="card"
          style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)', color: 'white' }}
        >
          <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} />
            Community Goal
          </h3>
          <p style={{ fontSize: '16px', marginBottom: '12px' }}>
            Together we can save $10,000 this month!
          </p>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            Current: $7,245 saved
          </div>
          <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', height: '8px' }}>
            <div style={{ background: 'white', height: '100%', width: '72%', borderRadius: '8px' }} />
          </div>
          <p style={{ marginTop: '8px', fontSize: '12px' }}>72% complete • 5 days left</p>
        </motion.div>
      </div>

      {currentUserRank && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{ 
            textAlign: 'center', 
            marginTop: '48px',
            padding: '24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Your Progress</h3>
          <p style={{ fontSize: '18px' }}>
            You're rank #{currentUserRank.rank} with {currentUserRank.xp} XP!
          </p>
          <p style={{ marginTop: '8px', opacity: 0.9 }}>
            Complete {10 - currentUserRank.repairs} more repairs to reach the next level!
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Leaderboard;