import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Phone,
  Camera,
  Mic,
  ChevronRight,
  Shield,
  TrendingDown,
  Users,
  Zap
} from 'lucide-react';

function EmergencyLanding() {
  const navigate = useNavigate();
  const [userMood, setUserMood] = useState(null);
  const [trustScore, setTrustScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTrustScore(97), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMoodSelect = (mood) => {
    setUserMood(mood);
    localStorage.setItem('userMood', mood);
    
    setTimeout(() => {
      if (mood === 'emergency') {
        navigate('/quick-fix');
      } else {
        navigate('/smart-diagnosis');
      }
    }, 300);
  };

  const startQuickHelp = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/smart-diagnosis');
    }, 800);
  };

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card"
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '16px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      <Icon size={24} color={color} style={{ marginBottom: '8px' }} />
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>{value}</div>
      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>{label}</div>
    </motion.div>
  );

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(30,58,138,0.1) 0%, rgba(0,0,0,0.2) 100%)'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '24px',
            marginBottom: '24px'
          }}>
            <Shield size={20} color="white" />
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
              Trusted by 50,000+ homeowners
            </span>
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Something broken?
          </h1>
          <p style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '8px'
          }}>
            We'll fix it together in minutes, not hours
          </p>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)'
          }}>
            Average fix time: 15 minutes | Save $200+ per repair
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            marginBottom: '32px'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '20px',
              color: '#1a1a1a',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              How urgent is your situation?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMoodSelect('emergency')}
                style={{
                  padding: '20px',
                  border: '2px solid #ef4444',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Zap size={32} color="#ef4444" />
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#991b1b', marginTop: '8px' }}>
                  Emergency Fix
                </div>
                <div style={{ fontSize: '14px', color: '#7f1d1d', marginTop: '4px' }}>
                  Water leak, no power, etc
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMoodSelect('frustrated')}
                style={{
                  padding: '20px',
                  border: '2px solid #f59e0b',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                  cursor: 'pointer'
                }}
              >
                <AlertCircle size={32} color="#f59e0b" />
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#92400e', marginTop: '8px' }}>
                  It's Frustrating
                </div>
                <div style={{ fontSize: '14px', color: '#78350f', marginTop: '4px' }}>
                  Not working properly
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMoodSelect('curious')}
                style={{
                  padding: '20px',
                  border: '2px solid #10b981',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  cursor: 'pointer'
                }}
              >
                <CheckCircle size={32} color="#10b981" />
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#064e3b', marginTop: '8px' }}>
                  Want to Learn
                </div>
                <div style={{ fontSize: '14px', color: '#065f46', marginTop: '4px' }}>
                  Preventive maintenance
                </div>
              </motion.button>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '24px',
            marginTop: '24px'
          }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuickHelp}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 4px 20px rgba(102,126,234,0.4)'
              }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Clock size={24} />
                </motion.div>
              ) : (
                <>
                  <Camera size={24} />
                  Just Show Me the Problem
                  <ChevronRight size={24} />
                </>
              )}
            </motion.button>

            <p style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Point your camera or describe it - AI identifies in seconds
            </p>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <StatCard 
            icon={Clock} 
            value="15 min" 
            label="Avg Fix Time" 
            color="#10b981"
          />
          <StatCard 
            icon={DollarSign} 
            value="$200+" 
            label="Saved per Fix" 
            color="#f59e0b"
          />
          <StatCard 
            icon={TrendingDown} 
            value="85%" 
            label="Less Truck Rolls" 
            color="#ef4444"
          />
          <StatCard 
            icon={Users} 
            value="50k+" 
            label="Happy Fixers" 
            color="#667eea"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <p style={{
            color: 'white',
            fontSize: '16px',
            marginBottom: '16px'
          }}>
            Still prefer a technician? No problem!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/schedule-technician')}
            style={{
              padding: '12px 24px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Phone size={20} />
            Book Technician (2hr arrival)
          </motion.button>
        </motion.div>

        {showDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: 'white',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              maxWidth: '300px'
            }}
          >
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Demo Mode Active</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Try: Washing machine not draining, AC not cooling, Dishwasher error E24
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default EmergencyLanding;