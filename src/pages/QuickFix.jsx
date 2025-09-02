import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Zap,
  CheckCircle,
  PhoneCall,
  Clock,
  ChevronRight,
  X,
  Shield,
  Droplets,
  Power,
  Thermometer,
  Volume2,
  Flame
} from 'lucide-react';

function QuickFix() {
  const navigate = useNavigate();
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isResolved, setIsResolved] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const emergencies = [
    {
      id: 'water-leak',
      title: 'Water Leak',
      icon: Droplets,
      color: '#3b82f6',
      severity: 'critical',
      steps: [
        {
          action: 'SHUT OFF MAIN WATER VALVE',
          detail: 'Usually in basement, garage, or outside near street',
          time: '30 seconds',
          critical: true
        },
        {
          action: 'Turn off electricity to affected area',
          detail: 'Go to breaker box, flip relevant switches',
          time: '1 minute'
        },
        {
          action: 'Document damage with photos',
          detail: 'For insurance claims',
          time: '2 minutes'
        },
        {
          action: 'Start removing water',
          detail: 'Use towels, mops, buckets',
          time: 'Ongoing'
        }
      ]
    },
    {
      id: 'no-power',
      title: 'No Power',
      icon: Power,
      color: '#eab308',
      severity: 'high',
      steps: [
        {
          action: 'CHECK YOUR BREAKER BOX',
          detail: 'Look for tripped breakers (middle position)',
          time: '1 minute',
          critical: true
        },
        {
          action: 'Reset tripped breakers',
          detail: 'Push to OFF, then back to ON',
          time: '30 seconds'
        },
        {
          action: 'Check GFCI outlets',
          detail: 'Press reset button on outlets in kitchen/bathroom',
          time: '2 minutes'
        },
        {
          action: 'Check neighborhood',
          detail: 'If others affected, call power company',
          time: '1 minute'
        }
      ]
    },
    {
      id: 'no-heat',
      title: 'No Heat/AC',
      icon: Thermometer,
      color: '#ef4444',
      severity: 'high',
      steps: [
        {
          action: 'CHECK THERMOSTAT',
          detail: 'Ensure it\'s on correct mode and has power',
          time: '30 seconds',
          critical: true
        },
        {
          action: 'Replace thermostat batteries',
          detail: 'If display is blank or dim',
          time: '2 minutes'
        },
        {
          action: 'Check furnace/AC breaker',
          detail: 'Ensure breaker hasn\'t tripped',
          time: '1 minute'
        },
        {
          action: 'Check air filter',
          detail: 'Replace if dirty (common cause)',
          time: '5 minutes'
        }
      ]
    },
    {
      id: 'gas-smell',
      title: 'Gas Smell',
      icon: Flame,
      color: '#dc2626',
      severity: 'emergency',
      steps: [
        {
          action: 'DO NOT USE ANY SWITCHES OR FLAMES',
          detail: 'No lights, phones, or appliances',
          time: 'Immediate',
          critical: true,
          emergency: true
        },
        {
          action: 'EVACUATE IMMEDIATELY',
          detail: 'Get everyone out of the house',
          time: 'Immediate',
          emergency: true
        },
        {
          action: 'SHUT OFF GAS IF SAFE',
          detail: 'Only if valve is outside and accessible',
          time: '30 seconds'
        },
        {
          action: 'CALL 911 FROM OUTSIDE',
          detail: 'Use neighbor\'s phone or cell outside',
          time: 'Immediate',
          emergency: true
        }
      ]
    }
  ];

  useEffect(() => {
    if (selectedEmergency && !isResolved) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedEmergency, isResolved]);

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency(emergency);
    setCurrentStep(0);
    setTimeElapsed(0);
    
    if (emergency.id === 'gas-smell') {
      // Immediately show critical warning for gas
      setTimeout(() => {
        if (window.confirm('This is a life-threatening emergency. Call 911 immediately. Continue only for safety steps.')) {
          // Continue with steps
        } else {
          navigate('/schedule-technician');
        }
      }, 100);
    }
  };

  const handleStepComplete = () => {
    if (currentStep < selectedEmergency.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsResolved(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const EmergencyCard = ({ emergency }) => {
    const Icon = emergency.icon;
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleEmergencySelect(emergency)}
        style={{
          width: '100%',
          padding: '24px',
          background: 'white',
          border: `3px solid ${emergency.color}`,
          borderRadius: '16px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {emergency.severity === 'emergency' && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              background: '#dc2626',
              color: 'white',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            EMERGENCY
          </motion.div>
        )}
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${emergency.color}20 0%, ${emergency.color}10 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={32} color={emergency.color} />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '4px'
            }}>
              {emergency.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              {emergency.steps.length} critical steps • {emergency.steps[0].time}
            </p>
          </div>
          <ChevronRight size={24} color="#6b7280" />
        </div>
      </motion.button>
    );
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: selectedEmergency?.id === 'gas-smell' ? 
        'linear-gradient(180deg, #fee2e2 0%, #fecaca 100%)' :
        'linear-gradient(180deg, #fef3c7 0%, #fed7aa 100%)',
      padding: '40px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {!selectedEmergency ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center',
                marginBottom: '32px'
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'rgba(239,68,68,0.1)',
                borderRadius: '24px',
                marginBottom: '16px'
              }}>
                <Zap size={20} color="#ef4444" />
                <span style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#991b1b'
                }}>
                  EMERGENCY RESPONSE MODE
                </span>
              </div>
              
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '8px'
              }}>
                What's Your Emergency?
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#92400e'
              }}>
                Select your situation for immediate step-by-step help
              </p>
            </motion.div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {emergencies.map((emergency, index) => (
                <motion.div
                  key={emergency.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EmergencyCard emergency={emergency} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              <Shield size={32} color="#10b981" style={{ marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Not Sure? Call for Help
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                Our emergency technicians can arrive in under 2 hours
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/schedule-technician')}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <PhoneCall size={20} />
                Call Emergency Line
              </motion.button>
            </motion.div>
          </>
        ) : (
          <AnimatePresence mode="wait">
            {!isResolved ? (
              <motion.div
                key="steps"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <selectedEmergency.icon size={32} color={selectedEmergency.color} />
                      <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                          {selectedEmergency.title} Response
                        </h2>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                          Step {currentStep + 1} of {selectedEmergency.steps.length}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      padding: '8px 16px',
                      background: '#fee2e2',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Clock size={16} color="#ef4444" />
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#991b1b' }}>
                        {formatTime(timeElapsed)}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '32px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / selectedEmergency.steps.length) * 100}%` }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${selectedEmergency.color} 0%, ${selectedEmergency.color}dd 100%)`
                      }}
                    />
                  </div>

                  {selectedEmergency.steps[currentStep].emergency && (
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '24px',
                        textAlign: 'center'
                      }}
                    >
                      <AlertTriangle size={32} style={{ marginBottom: '8px' }} />
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                        LIFE SAFETY CRITICAL
                      </h3>
                      <p style={{ fontSize: '16px' }}>
                        Follow this step exactly as described
                      </p>
                    </motion.div>
                  )}

                  <div style={{
                    textAlign: 'center',
                    marginBottom: '32px'
                  }}>
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        fontSize: selectedEmergency.steps[currentStep].critical ? '32px' : '28px',
                        fontWeight: 'bold',
                        color: selectedEmergency.steps[currentStep].critical ? '#dc2626' : '#1a1a1a',
                        marginBottom: '16px',
                        lineHeight: '1.2'
                      }}
                    >
                      {selectedEmergency.steps[currentStep].action}
                    </motion.div>
                    <p style={{
                      fontSize: '20px',
                      color: '#4b5563',
                      marginBottom: '8px'
                    }}>
                      {selectedEmergency.steps[currentStep].detail}
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: '#f3f4f6',
                      borderRadius: '8px'
                    }}>
                      <Clock size={16} />
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>
                        Estimated time: {selectedEmergency.steps[currentStep].time}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStepComplete}
                      style={{
                        flex: 1,
                        padding: '20px',
                        background: `linear-gradient(135deg, ${selectedEmergency.color} 0%, ${selectedEmergency.color}dd 100%)`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {currentStep === selectedEmergency.steps.length - 1 ? (
                        <>
                          Complete Emergency Response
                          <CheckCircle size={20} />
                        </>
                      ) : (
                        <>
                          Done - Next Step
                          <ChevronRight size={20} />
                        </>
                      )}
                    </motion.button>
                  </div>

                  <button
                    onClick={() => navigate('/schedule-technician')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '12px',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <PhoneCall size={16} />
                    Need Professional Help Now
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="resolved"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '48px 20px'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Shield size={60} color="white" />
                </motion.div>

                <h2 style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}>
                  Emergency Contained!
                </h2>
                <p style={{
                  fontSize: '20px',
                  color: '#6b7280',
                  marginBottom: '32px'
                }}>
                  You've successfully handled the immediate crisis
                </p>

                <div style={{
                  padding: '24px',
                  background: '#fef3c7',
                  borderRadius: '16px',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#92400e'
                  }}>
                    Next Steps
                  </h3>
                  <ul style={{
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#78350f',
                    listStyle: 'none',
                    padding: 0
                  }}>
                    <li style={{ marginBottom: '8px' }}>✓ Document all damage with photos</li>
                    <li style={{ marginBottom: '8px' }}>✓ Contact your insurance company</li>
                    <li style={{ marginBottom: '8px' }}>✓ Schedule professional inspection</li>
                    <li>✓ Keep all receipts for repairs</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/schedule-technician')}
                    style={{
                      padding: '16px 32px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Schedule Follow-up
                  </motion.button>
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      padding: '16px 32px',
                      background: 'white',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default QuickFix;