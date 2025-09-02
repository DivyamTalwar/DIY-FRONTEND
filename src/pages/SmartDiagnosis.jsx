import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/mockApi';
import toast from 'react-hot-toast';
import {
  Camera,
  Mic,
  Type,
  Upload,
  ChevronRight,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Wrench,
  X,
  Loader,
  PhoneCall,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

function SmartDiagnosis() {
  const navigate = useNavigate();
  const [inputMethod, setInputMethod] = useState('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [voiceText, setVoiceText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const commonIssues = [
    { id: 1, title: 'Washing Machine Not Draining', icon: '🌊', match: 95 },
    { id: 2, title: 'Dishwasher Error E24', icon: '🍽️', match: 92 },
    { id: 3, title: 'AC Not Cooling', icon: '❄️', match: 88 },
    { id: 4, title: 'Refrigerator Making Noise', icon: '🔊', match: 85 },
    { id: 5, title: 'Dryer Not Heating', icon: '🔥', match: 82 }
  ];

  useEffect(() => {
    if (inputMethod === 'camera') {
      startCamera();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [inputMethod]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      processImage();
    }
  };

  const processImage = async () => {
    setIsProcessing(true);
    
    try {
      const result = await api.diagnose(capturedImage, 'User captured image');
      
      if (result.success) {
      setDiagnosis({
        appliance: result.diagnosis.appliance,
        model: 'Auto-detected Model',
        issue: result.diagnosis.issue,
        confidence: result.diagnosis.confidence,
        estimatedTime: result.diagnosis.estimatedTime,
        difficulty: result.diagnosis.solutions[0].difficulty,
        savingsAmount: result.diagnosis.estimatedCost,
        successRate: result.diagnosis.successRate,
        commonCause: `${result.diagnosis.issue} (${result.diagnosis.confidence}% confidence)`,
        solutions: result.diagnosis.solutions.map(sol => ({
          id: sol.id,
          title: sol.title,
          time: sol.time,
          difficulty: sol.difficulty,
          successRate: sol.successRate,
          steps: sol.steps.map(step => step.instruction),
          videoAvailable: sol.videoAvailable
        }))
      });
      setConfidence(result.diagnosis.confidence);
      toast.success('Diagnosis complete! We found the issue.');
      } else {
        toast.error('Could not diagnose the issue. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
      console.error('Diagnosis error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceText("My washing machine is making a loud noise and won't drain the water. It's a Samsung front loader about 3 years old.");
      processVoice();
    }, 3000);
  };

  const processVoice = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setDiagnosis({
        appliance: 'Washing Machine',
        model: 'Samsung Front Loader',
        issue: 'Not draining + loud noise',
        confidence: 87,
        estimatedTime: '20-25 minutes',
        difficulty: 2,
        savingsAmount: 250,
        successRate: 82,
        commonCause: 'Foreign object in pump (65% of cases)',
        solutions: [
          {
            id: 1,
            title: 'Check pump for foreign objects',
            time: '15 minutes',
            difficulty: 2,
            successRate: 78,
            steps: [
              'Access pump through front panel',
              'Check for coins, buttons, or debris',
              'Remove any foreign objects',
              'Clean pump impeller',
              'Reassemble and test'
            ]
          }
        ]
      });
      setConfidence(87);
      setIsProcessing(false);
    }, 2000);
  };

  const SolutionCard = ({ solution, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '16px',
        border: '2px solid',
        borderColor: solution.successRate > 80 ? '#10b981' : 
                     solution.successRate > 60 ? '#f59e0b' : '#6b7280'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            Solution {index + 1}: {solution.title}
          </h3>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={16} /> {solution.time}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Wrench size={16} /> Difficulty: {solution.difficulty}/5
            </span>
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '8px 16px',
          background: solution.successRate > 80 ? '#d1fae5' : 
                       solution.successRate > 60 ? '#fef3c7' : '#f3f4f6',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            {solution.successRate}%
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Success Rate</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
          Steps:
        </h4>
        {solution.steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + idx * 0.05 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '8px'
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
              {idx + 1}
            </div>
            <span style={{ flex: 1, color: '#4b5563' }}>{step}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/guided-repair/${solution.id}`)}
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        Start This Fix
        <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
      padding: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Let's Fix This Together
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Show me the problem and I'll guide you through the solution
          </p>
        </motion.div>

        {!diagnosis ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '12px'
              }}>
                {['camera', 'voice', 'text'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setInputMethod(method)}
                    style={{
                      padding: '8px 16px',
                      background: inputMethod === method ? '#667eea' : 'transparent',
                      color: inputMethod === method ? 'white' : '#6b7280',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {method === 'camera' && <Camera size={20} />}
                    {method === 'voice' && <Mic size={20} />}
                    {method === 'text' && <Type size={20} />}
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {inputMethod === 'camera' && (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {!capturedImage ? (
                    <div>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{
                          width: '100%',
                          maxHeight: '400px',
                          borderRadius: '16px',
                          background: '#000',
                          marginBottom: '20px'
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={captureImage}
                        style={{
                          width: '100%',
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
                          gap: '12px'
                        }}
                      >
                        <Camera size={24} />
                        Capture Problem
                      </motion.button>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={capturedImage}
                        alt="Captured"
                        style={{
                          width: '100%',
                          maxHeight: '400px',
                          objectFit: 'cover',
                          borderRadius: '16px',
                          marginBottom: '20px'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={() => {
                            setCapturedImage(null);
                            startCamera();
                          }}
                          style={{
                            flex: 1,
                            padding: '16px',
                            background: '#f3f4f6',
                            color: '#4b5563',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <RotateCcw size={20} />
                          Retake
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {inputMethod === 'voice' && (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 24px',
                    borderRadius: '50%',
                    background: isRecording ? 
                      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}
                  onClick={isRecording ? () => setIsRecording(false) : startVoiceRecording}
                  >
                    {isRecording ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '4px solid rgba(239,68,68,0.3)'
                        }}
                      />
                    ) : null}
                    <Mic size={40} color="white" />
                  </div>
                  <p style={{ fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                    {isRecording ? 'Listening...' : 'Tap to describe the problem'}
                  </p>
                  {voiceText && (
                    <div style={{
                      background: '#f9fafb',
                      padding: '16px',
                      borderRadius: '12px',
                      marginTop: '20px',
                      textAlign: 'left'
                    }}>
                      <p style={{ fontSize: '16px', color: '#1a1a1a' }}>"{voiceText}"</p>
                    </div>
                  )}
                </motion.div>
              )}

              {inputMethod === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <textarea
                    placeholder="Describe what's wrong... (e.g., 'My dishwasher shows error E24 and won't start')"
                    style={{
                      width: '100%',
                      minHeight: '150px',
                      padding: '16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processImage}
                    style={{
                      width: '100%',
                      padding: '20px',
                      marginTop: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Analyze Problem
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {isProcessing && (
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
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center'
                }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ marginBottom: '16px' }}
                  >
                    <Loader size={48} color="#667eea" />
                  </motion.div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Analyzing...</h3>
                  <p style={{ color: '#6b7280' }}>AI is identifying the problem</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                    We Found The Problem!
                  </h2>
                  <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '16px' }}>
                    {diagnosis.appliance} - {diagnosis.issue}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: '#fef3c7',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <AlertTriangle size={20} color="#f59e0b" />
                    <span style={{ color: '#92400e', fontWeight: '500' }}>
                      Most likely: {diagnosis.commonCause}
                    </span>
                  </div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  borderRadius: '16px'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#064e3b' }}>
                    {diagnosis.confidence}%
                  </div>
                  <div style={{ fontSize: '14px', color: '#065f46' }}>Confidence</div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock size={20} color="#667eea" />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{diagnosis.estimatedTime}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>To fix</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <DollarSign size={20} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>${diagnosis.savingsAmount}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>You'll save</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={20} color="#f59e0b" />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{diagnosis.successRate}%</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Success rate</div>
                  </div>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              Solutions (Try in Order)
            </h3>
            {diagnosis.solutions.map((solution, index) => (
              <SolutionCard key={solution.id} solution={solution} index={index} />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                borderRadius: '16px',
                padding: '24px',
                marginTop: '24px',
                textAlign: 'center'
              }}
            >
              <p style={{ fontSize: '16px', color: '#991b1b', marginBottom: '16px' }}>
                Not comfortable doing this yourself?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/schedule-technician')}
                style={{
                  padding: '16px 32px',
                  background: 'white',
                  color: '#991b1b',
                  border: '2px solid #ef4444',
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
                Get Expert Help (2hr arrival)
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: 'white',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Common Issues Right Now</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {commonIssues.map(issue => (
              <motion.button
                key={issue.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setDiagnosis({
                      appliance: issue.title.split(' ')[0],
                      issue: issue.title,
                      confidence: issue.match,
                      estimatedTime: '10-15 minutes',
                      difficulty: 2,
                      savingsAmount: 180,
                      successRate: 85,
                      commonCause: 'Common mechanical issue',
                      solutions: [
                        {
                          id: 1,
                          title: 'Quick Fix Solution',
                          time: '10 minutes',
                          difficulty: 1,
                          successRate: 85,
                          steps: [
                            'Turn off and unplug the appliance',
                            'Perform basic troubleshooting',
                            'Check for obvious issues',
                            'Apply the fix',
                            'Test the appliance'
                          ]
                        }
                      ]
                    });
                    setIsProcessing(false);
                  }, 1000);
                }}
                style={{
                  padding: '8px 16px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{issue.icon}</span>
                {issue.title}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartDiagnosis;