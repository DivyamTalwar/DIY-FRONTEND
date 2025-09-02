import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Video,
  Camera,
  PhoneCall,
  Wrench,
  X,
  Pause,
  Play,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';

function GuidedRepair() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [needsHelp, setNeedsHelp] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const repairData = {
    title: 'Clean the drain filter',
    appliance: 'Washing Machine',
    totalTime: '15 minutes',
    difficulty: 2,
    tools: ['Towel', 'Shallow pan', 'Flashlight (optional)'],
    steps: [
      {
        id: 1,
        title: 'Prepare your workspace',
        time: '2 minutes',
        description: 'Get ready with the right tools and safety measures',
        details: [
          'Turn off the washing machine at the power outlet',
          'Place a towel on the floor in front of the machine',
          'Have a shallow pan ready to catch water',
          'Put on rubber gloves if available'
        ],
        warning: 'Water will drain out when you open the filter',
        videoUrl: '/demo-video-1.mp4',
        imageUrl: '/demo-image-1.jpg',
        tips: 'Keep extra towels nearby just in case'
      },
      {
        id: 2,
        title: 'Locate the filter access',
        time: '1 minute',
        description: 'Find the small door at the bottom front of your machine',
        details: [
          'Look at the bottom front of your washing machine',
          'Find a small rectangular or square access panel',
          'It might be hidden behind a decorative panel',
          'Gently press or pull to open the access door'
        ],
        imageUrl: '/demo-image-2.jpg',
        tips: 'Use a flathead screwdriver if the panel is stuck'
      },
      {
        id: 3,
        title: 'Remove the drain filter',
        time: '3 minutes',
        description: 'Carefully unscrew and remove the filter',
        details: [
          'Place the shallow pan under the filter opening',
          'Slowly turn the filter cap counter-clockwise',
          'Let water drain into the pan (pause if needed)',
          'Once drained, fully remove the filter'
        ],
        warning: 'Go slow! Water will come out',
        videoUrl: '/demo-video-3.mp4',
        critical: true
      },
      {
        id: 4,
        title: 'Clean the filter',
        time: '5 minutes',
        description: 'Remove all debris and rinse thoroughly',
        details: [
          'Remove any visible debris (coins, lint, buttons)',
          'Rinse the filter under hot running water',
          'Use an old toothbrush to scrub if needed',
          'Check the filter housing for debris too'
        ],
        imageUrl: '/demo-image-4.jpg',
        tips: 'Take a photo before removing debris to show the AI if needed'
      },
      {
        id: 5,
        title: 'Reinstall and test',
        time: '4 minutes',
        description: 'Put everything back and run a test cycle',
        details: [
          'Insert the clean filter back into the housing',
          'Turn clockwise until firmly secured (don\'t overtighten)',
          'Close the access panel',
          'Run a short rinse cycle to test'
        ],
        videoUrl: '/demo-video-5.mp4',
        celebration: true
      }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStepComplete = () => {
    const newCompleted = [...completedSteps, currentStep];
    setCompletedSteps(newCompleted);
    
    if (currentStep === repairData.steps.length - 1) {
      setShowSuccess(true);
      setTimeout(() => setShowGamification(true), 1500);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNeedHelp = () => {
    setNeedsHelp(true);
  };

  const currentStepData = repairData.steps[currentStep];
  const progress = ((completedSteps.length / repairData.steps.length) * 100);

  const StepIndicator = ({ step, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: index <= currentStep ? 1 : 0.4
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: completedSteps.includes(index) ? '#10b981' :
                    index === currentStep ? '#667eea' : '#e5e7eb',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        {completedSteps.includes(index) ? <CheckCircle size={18} /> : index + 1}
      </div>
      {index < repairData.steps.length - 1 && (
        <div style={{
          width: '40px',
          height: '2px',
          background: completedSteps.includes(index) ? '#10b981' : '#e5e7eb'
        }} />
      )}
    </motion.div>
  );

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)'
    }}>
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: '8px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                {repairData.title}
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {repairData.appliance} Repair
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#f3f4f6',
              borderRadius: '8px'
            }}>
              <Clock size={16} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {formatTime(elapsedTime)}
              </span>
            </div>
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              style={{
                padding: '8px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '16px auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          {repairData.steps.map((step, index) => (
            <StepIndicator key={step.id} step={step} index={index} />
          ))}
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '16px auto 0'
        }}>
          <div style={{
            height: '4px',
            background: '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
              }}
            />
          </div>
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            marginTop: '4px',
            textAlign: 'center'
          }}>
            {completedSteps.length} of {repairData.steps.length} steps complete
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 20px'
      }}>
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '24px'
              }}>
                {currentStepData.critical && (
                  <div style={{
                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={20} color="#ef4444" />
                    <span style={{ color: '#991b1b', fontWeight: '500' }}>
                      Critical step - Take your time!
                    </span>
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    Step {currentStep + 1}: {currentStepData.title}
                  </h3>
                  <p style={{
                    fontSize: '18px',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>
                    {currentStepData.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={16} /> {currentStepData.time}
                    </span>
                  </div>
                </div>

                {currentStepData.videoUrl && (
                  <div style={{
                    background: '#000',
                    borderRadius: '16px',
                    height: '300px',
                    marginBottom: '24px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isVideoPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(0,0,0,0.5)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}>
                      <Video size={16} style={{ display: 'inline', marginRight: '4px' }} />
                      Demo Video
                    </div>
                  </div>
                )}

                {currentStepData.imageUrl && !currentStepData.videoUrl && (
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '24px'
                  }}>
                    <img
                      src="/api/placeholder/600/300"
                      alt={currentStepData.title}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>
                    What to do:
                  </h4>
                  {currentStepData.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px'
                      }}
                    >
                      <div style={{
                        minWidth: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#667eea',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>
                      <span style={{ flex: 1, fontSize: '16px', color: '#4b5563' }}>
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {currentStepData.warning && (
                  <div style={{
                    background: '#fef3c7',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={20} color="#f59e0b" />
                    <span style={{ color: '#92400e' }}>
                      {currentStepData.warning}
                    </span>
                  </div>
                )}

                {currentStepData.tips && (
                  <div style={{
                    background: '#f0f9ff',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Zap size={20} color="#0284c7" />
                    <span style={{ color: '#075985' }}>
                      Pro tip: {currentStepData.tips}
                    </span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStepComplete}
                    style={{
                      flex: 1,
                      padding: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                    {currentStep === repairData.steps.length - 1 ? (
                      <>
                        Complete Repair
                        <CheckCircle size={20} />
                      </>
                    ) : (
                      <>
                        Done! Next Step
                        <ChevronRight size={20} />
                      </>
                    )}
                  </motion.button>
                </div>

                <button
                  onClick={handleNeedHelp}
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
                  <MessageCircle size={16} />
                  I'm stuck - need help
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
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
                <CheckCircle size={60} color="white" />
              </motion.div>

              <h2 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                Great Job! It's Fixed!
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#6b7280',
                marginBottom: '32px'
              }}>
                Your {repairData.appliance.toLowerCase()} should be working perfectly now
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                maxWidth: '400px',
                margin: '0 auto 32px'
              }}>
                <div style={{
                  padding: '16px',
                  background: '#f0fdf4',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>
                    {formatTime(elapsedTime)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#15803d' }}>Time taken</div>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#fef3c7',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e' }}>
                    $225
                  </div>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>Saved</div>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#ede9fe',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#5b21b6' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '12px', color: '#6d28d9' }}>Success</div>
                </div>
              </div>

              {showGamification && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                    padding: '24px',
                    borderRadius: '16px',
                    marginBottom: '24px'
                  }}
                >
                  <p style={{
                    fontSize: '14px',
                    color: '#92400e',
                    marginBottom: '16px'
                  }}>
                    Achievement Unlocked!
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '32px' }}>🏆</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#92400e' }}>
                        Filter Master
                      </div>
                      <div style={{ fontSize: '14px', color: '#78350f' }}>
                        +250 XP earned
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/')}
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
                  Back to Home
                </motion.button>
                <button
                  onClick={() => navigate('/achievements')}
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
                  View Rewards
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {needsHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  No worries! Let's get you help
                </h3>
                <button
                  onClick={() => setNeedsHelp(false)}
                  style={{
                    padding: '4px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button
                  onClick={() => {
                    setNeedsHelp(false);
                    navigate('/video-call-support');
                  }}
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <Video size={20} />
                  Video Call with Expert (Free)
                </button>

                <button
                  onClick={() => {
                    setNeedsHelp(false);
                    navigate('/schedule-technician');
                  }}
                  style={{
                    padding: '20px',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <PhoneCall size={20} />
                  Book Technician Visit ($89)
                </button>

                <button
                  onClick={() => setNeedsHelp(false)}
                  style={{
                    padding: '12px',
                    background: 'transparent',
                    color: '#6b7280',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  I'll keep trying
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default GuidedRepair;