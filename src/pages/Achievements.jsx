import { motion } from 'framer-motion';
import { Trophy, Lock, TrendingUp, Star } from 'lucide-react';
import { achievements } from '../data/demoData';

function Achievements() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
          <span className="hero-title">Achievement Gallery</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '24px' }}>
          Your journey to DIY mastery!
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{unlockedCount}/{achievements.length}</p>
            <p style={{ color: '#6B7280' }}>Unlocked</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>⭐</div>
            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{totalXP}</p>
            <p style={{ color: '#6B7280' }}>Total XP</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>📈</div>
            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </p>
            <p style={{ color: '#6B7280' }}>Complete</p>
          </motion.div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: achievement.unlocked ? 1.05 : 1, rotate: achievement.unlocked ? 5 : 0 }}
            className="card"
            style={{
              position: 'relative',
              opacity: achievement.unlocked ? 1 : 0.7,
              background: achievement.unlocked 
                ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
                : 'white',
              color: achievement.unlocked ? 'white' : '#1A1A1A'
            }}
          >
            {!achievement.unlocked && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '50%',
                padding: '8px'
              }}>
                <Lock size={20} />
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ 
                fontSize: '48px',
                filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
              }}>
                {achievement.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>{achievement.name}</h3>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>{achievement.description}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} />
                <span style={{ fontWeight: 'bold' }}>+{achievement.xpReward} XP</span>
              </div>
              
              {!achievement.unlocked && achievement.progress && (
                <div style={{
                  padding: '4px 12px',
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {achievement.progress}
                </div>
              )}
              
              {achievement.unlocked && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '24px' }}
                >
                  ✨
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
        style={{ 
          marginTop: '48px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Next Milestone</h2>
        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
          Complete 2 more repairs to unlock "Perfect Score" achievement!
        </p>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎯</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <div style={{ width: '60px', height: '8px', background: 'white', borderRadius: '4px' }} />
          <div style={{ width: '60px', height: '8px', background: 'white', borderRadius: '4px' }} />
          <div style={{ width: '60px', height: '8px', background: 'white', borderRadius: '4px' }} />
          <div style={{ width: '60px', height: '8px', background: 'white', borderRadius: '4px' }} />
          <div style={{ width: '60px', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px' }} />
        </div>
        <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.9 }}>
          80% Complete • 1000 XP Reward
        </p>
      </motion.div>
    </div>
  );
}

export default Achievements;