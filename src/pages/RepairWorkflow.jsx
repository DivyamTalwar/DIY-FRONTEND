import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, AlertTriangle, Clock, Wrench, Camera, HelpCircle, Award, ChevronRight, Shield } from 'lucide-react';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { demoRepairs } from '../data/demoData';

function RepairWorkflow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    const foundRepair = demoRepairs.find(r => r.id === id);
    if (foundRepair) {
      setRepair(foundRepair);
    }
  }, [id]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompleted = [...completedSteps, stepIndex];
      setCompletedSteps(newCompleted);
      
      const stepXp = Math.floor(repair.xpReward / repair.steps.length);
      setXpEarned(prev => prev + stepXp);
      
      toast.success(`Step completed! +${stepXp} XP`);
      
      if (newCompleted.length === repair.steps.length) {
        handleMissionComplete();
      } else if (stepIndex === currentStep) {
        setCurrentStep(prev => Math.min(prev + 1, repair.steps.length - 1));
      }
    }
  };

  const handleMissionComplete = () => {
    setIsTimerRunning(false);
    setShowConfetti(true);
    
    const bonusXp = timer < 1800 ? 50 : 0; // Bonus for completing under 30 mins
    const totalXp = xpEarned + bonusXp;
    
    toast.success(`Mission Complete! Total XP: ${totalXp}`);
    
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const handleCallTechnician = () => {
    toast.error('No worries Hero! Even legends need backup sometimes.');
    setTimeout(() => {
      navigate('/schedule-technician');
    }, 1500);
  };

  if (!repair) return <div>Loading...</div>;

  const progress = (completedSteps.length / repair.steps.length) * 100;

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ marginBottom: '32px', background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)', color: 'white' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Mission: {repair.title}</h1>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} />
                Timer: {formatTime(timer)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} />
                XP Earned: {xpEarned}
              </span>
              <span>Difficulty: {'⭐'.repeat(repair.difficulty)}</span>
            </div>
          </div>
          <button
            onClick={handleCallTechnician}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid white',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Shield size={20} />
            Call for Backup
          </button>
        </div>
        
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Mission Progress</span>
            <span>{completedSteps.length} / {repair.steps.length} steps</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', height: '12px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'white' }}
            />
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Tools Required</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {repair.tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="tool-card"
              >
                <Wrench size={24} color="#0066FF" />
                <p style={{ marginTop: '8px' }}>{tool}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="card" style={{ background: '#FFF9E6' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#FFA500" />
              Safety First!
            </h3>
            <ul style={{ fontSize: '14px', paddingLeft: '20px' }}>
              <li>Turn off power/water if needed</li>
              <li>Wear protective gear</li>
              <li>Work in well-lit area</li>
              <li>Keep tools organized</li>
            </ul>
          </div>
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px' }}>Repair Steps</h2>
            {!isTimerRunning && (
              <button
                className="button-primary"
                onClick={() => setIsTimerRunning(true)}
              >
                Start Mission
              </button>
            )}
          </div>
          
          <AnimatePresence>
            {repair.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`step-card ${completedSteps.includes(index) ? 'completed' : ''}`}
                style={{
                  opacity: index === currentStep || completedSteps.includes(index) ? 1 : 0.5,
                  transform: index === currentStep ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ minWidth: '32px' }}>
                    {completedSteps.includes(index) ? (
                      <CheckCircle size={32} color="#00C853" />
                    ) : (
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '3px solid #0066FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: '#0066FF'
                      }}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>{step.title}</h3>
                    
                    {index === currentStep && !completedSteps.includes(index) && (
                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button
                          style={{
                            background: '#0066FF',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Play size={16} />
                          Watch Video
                        </button>
                        
                        <button
                          style={{
                            background: '#00C853',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Camera size={16} />
                          Upload Photo
                        </button>
                        
                        <button
                          onClick={() => setShowHint(!showHint)}
                          style={{
                            background: '#FFD700',
                            color: '#1A1A1A',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <HelpCircle size={16} />
                          Hint (-10 XP)
                        </button>
                      </div>
                    )}
                    
                    {showHint && index === currentStep && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{
                          marginTop: '12px',
                          padding: '12px',
                          background: '#FFF9E6',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      >
                        💡 Pro Tip: Make sure to turn the valve clockwise to tighten. Use steady pressure but don't overtighten!
                      </motion.div>
                    )}
                    
                    {index === currentStep && !completedSteps.includes(index) && (
                      <motion.button
                        className="button-primary"
                        style={{ marginTop: '16px', width: '100%' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStepComplete(index)}
                      >
                        Complete Step
                        <ChevronRight size={20} style={{ marginLeft: '8px', display: 'inline' }} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {completedSteps.length === repair.steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card success-animation"
              style={{
                background: 'linear-gradient(135deg, #00C853 0%, #00A843 100%)',
                color: 'white',
                textAlign: 'center',
                marginTop: '32px'
              }}
            >
              <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>🎉 MISSION COMPLETE! 🎉</h2>
              <p style={{ fontSize: '20px', marginBottom: '24px' }}>You're a true DIY Hero!</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>XP Earned</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold' }}>+{xpEarned}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>Time</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{formatTime(timer)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>Money Saved</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold' }}>$150</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                style={{
                  marginTop: '24px',
                  background: 'white',
                  color: '#00C853',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RepairWorkflow;