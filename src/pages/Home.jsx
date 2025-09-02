import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, AlertCircle, Wrench, Phone, Video, ChevronRight, Shield, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

function Home() {
  const navigate = useNavigate();
  const [userMood, setUserMood] = useState(null);
  const [showVideoHelp, setShowVideoHelp] = useState(false);
  const [deflectionAttempts, setDeflectionAttempts] = useState(0);
  
  // Company metrics tracking
  const [companyMetrics] = useState({
    techniciansSaved: 142,
    moneySaved: 28500,
    successRate: 87,
    avgResolutionTime: 18
  });

  useEffect(() => {
    // Track user session for analytics
    const sessionId = Date.now();
    localStorage.setItem('sessionId', sessionId);
    
    // Preload AI diagnostic model
    setTimeout(() => {
      console.log('AI diagnostic model ready');
    }, 1000);
  }, []);

  const handleEmergencyClick = () => {
    setDeflectionAttempts(prev => prev + 1);
    
    if (deflectionAttempts < 2) {
      // First two clicks - try to deflect
      setShowVideoHelp(true);
      toast((t) => (
        <div>
          <p style={{ fontWeight: 600 }}>Before calling a technician...</p>
          <p style={{ fontSize: '14px', marginTop: '4px' }}>
            80% of issues are solved with our quick video guide
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setShowVideoHelp(true);
              }}
              className="btn btn-primary"
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              Watch 2-min video
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/schedule-technician');
              }}
              className="btn btn-ghost"
              style={{ fontSize: '14px' }}
            >
              Call anyway
            </button>
          </div>
        </div>
      ), {
        duration: 8000,
        style: { maxWidth: '400px' }
      });
    } else {
      // After 2 attempts, let them call
      navigate('/schedule-technician');
    }
  };

  const mostCommonFixes = [
    {
      issue: "Washing machine not draining",
      solution: "Clean the filter",
      time: "2 mins",
      successRate: 92,
      savedCost: 150
    },
    {
      issue: "No hot water",
      solution: "Reset water heater",
      time: "5 mins",
      successRate: 78,
      savedCost: 200
    },
    {
      issue: "AC not cooling",
      solution: "Replace air filter",
      time: "10 mins",
      successRate: 85,
      savedCost: 180
    },
    {
      issue: "Dishwasher not starting",
      solution: "Check door latch",
      time: "1 min",
      successRate: 94,
      savedCost: 120
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', width: '100%' }}>
      {/* Simplified Navigation */}
      <nav className="nav-simple" style={{ width: '100%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px' }}>
          <div className="nav-logo">FixIt</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span className="trust-badge">
              <CheckCircle size={16} />
              Trusted by 50,000+ homes
            </span>
            <span className="time-badge">
              <Clock size={16} />
              Avg fix: 15 mins
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Empathy First */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: 'var(--calm-gradient)',
          padding: '60px 32px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px', color: 'white' }}>
          Something broken?
        </h1>
        <p style={{ fontSize: '24px', marginBottom: '32px', opacity: 0.95 }}>
          We'll fix this together in minutes.
        </p>
        
        {/* Mood Selection */}
        <div className="mood-selector">
          <button
            className={`mood-button ${userMood === 'frustrated' ? 'selected' : ''}`}
            onClick={() => setUserMood('frustrated')}
          >
            😤 I'm frustrated
          </button>
          <button
            className={`mood-button ${userMood === 'learning' ? 'selected' : ''}`}
            onClick={() => setUserMood('learning')}
          >
            😊 I want to learn
          </button>
          <button
            className={`mood-button ${userMood === 'emergency' ? 'selected' : ''}`}
            onClick={() => setUserMood('emergency')}
          >
            ⚡ Emergency fix
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/diagnose')}
          style={{
            background: 'white',
            color: 'var(--primary)',
            padding: '20px 48px',
            fontSize: '20px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            marginTop: '24px',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          HELP ME NOW
        </motion.button>

        <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.9 }}>
          Most problems fixed in under 20 minutes • No experience needed
        </p>
      </motion.div>

      {/* Most Common Fixes - Instant Solutions */}
      <div style={{ padding: '48px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '32px', textAlign: 'center' }}>
          Common Issues - Instant Solutions
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {mostCommonFixes.map((fix, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="solution-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/instant-fix/${index}`)}
            >
              <div style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{fix.issue}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Solution: {fix.solution}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <span className="time-badge">
                  <Clock size={14} />
                  {fix.time}
                </span>
                <span className="success-rate-badge">
                  <CheckCircle size={14} />
                  {fix.successRate}% success
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>
                  Save ${fix.savedCost}
                </span>
                <ChevronRight size={20} color="var(--primary)" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Metrics - Hidden but trackable */}
      <div style={{ padding: '48px 32px', background: 'white', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div className="metric-card">
              <div className="metric-value">{companyMetrics.techniciansSaved}</div>
              <div className="metric-label">Technician calls avoided today</div>
              <div className="metric-change positive">
                <TrendingUp size={14} />
                +23% vs yesterday
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-value">${companyMetrics.moneySaved.toLocaleString()}</div>
              <div className="metric-label">Saved by users this month</div>
              <div className="metric-change positive">
                <TrendingUp size={14} />
                +15% vs last month
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{companyMetrics.successRate}%</div>
              <div className="metric-label">Self-service success rate</div>
              <div className="metric-change positive">
                <TrendingUp size={14} />
                +5% improvement
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{companyMetrics.avgResolutionTime} min</div>
              <div className="metric-label">Average resolution time</div>
              <div className="metric-change positive">
                <TrendingUp size={14} />
                -3 mins faster
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Help - Always visible but with deflection */}
      <button className="emergency-help" onClick={handleEmergencyClick}>
        <Phone size={20} />
        Need Help Now?
      </button>

      {/* Video Help Overlay */}
      {showVideoHelp && (
        <div className="video-help-overlay show">
          <h3 style={{ marginBottom: '12px' }}>Quick Video Guide</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Watch our 2-minute solution video first
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/video-guide')}>
              <Video size={16} />
              Watch Video
            </button>
            <button className="btn btn-ghost" onClick={() => setShowVideoHelp(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;