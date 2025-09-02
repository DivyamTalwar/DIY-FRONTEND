import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Mic,
  Type,
  Upload,
  Scan,
  Search,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Wrench,
  ChevronRight,
  ChevronLeft,
  X,
  Loader,
  Sparkles,
  Cpu,
  Image,
  FileText,
  BarChart3,
  Shield,
  Zap,
  Award,
  Play,
  Pause,
  Volume2,
  History,
  Filter,
  Grid,
  List,
  Star
} from 'lucide-react';
import { api } from '../services/mockApi';
import toast from 'react-hot-toast';

function UltimateNewRepair() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [inputMethod, setInputMethod] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [popularFixes, setPopularFixes] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceWaveform, setVoiceWaveform] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const appliances = [
    { id: 'washer', name: 'Washing Machine', icon: '🌊', color: '#3b82f6', issues: 234 },
    { id: 'dishwasher', name: 'Dishwasher', icon: '🍽️', color: '#10b981', issues: 189 },
    { id: 'fridge', name: 'Refrigerator', icon: '❄️', color: '#06b6d4', issues: 156 },
    { id: 'ac', name: 'AC Unit', icon: '🌡️', color: '#8b5cf6', issues: 143 },
    { id: 'dryer', name: 'Dryer', icon: '🔥', color: '#ef4444', issues: 128 },
    { id: 'oven', name: 'Oven', icon: '🔥', color: '#f59e0b', issues: 112 },
    { id: 'microwave', name: 'Microwave', icon: '📡', color: '#ec4899', issues: 98 },
    { id: 'water-heater', name: 'Water Heater', icon: '♨️', color: '#f97316', issues: 87 }
  ];

  useEffect(() => {
    loadInitialData();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setVoiceWaveform(Array.from({ length: 20 }, () => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const loadInitialData = async () => {
    try {
      const result = await api.search('');
      setPopularFixes(result.results || []);
      setRecentIssues([
        { id: 1, title: 'Washer not spinning', time: '5 min ago', solved: true },
        { id: 2, title: 'Dishwasher E24 error', time: '12 min ago', solved: true },
        { id: 3, title: 'Fridge too warm', time: '1 hour ago', solved: false },
        { id: 4, title: 'AC not cooling', time: '2 hours ago', solved: true }
      ]);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

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
      toast.error('Camera access denied');
    }
  };

  const captureImage = async () => {
    setIsScanning(true);
    
    // Simulate AI processing
    setTimeout(async () => {
      const result = await api.diagnose('captured-image', 'AI detected washing machine issue');
      if (result.success) {
        setDiagnosis(result.diagnosis);
        setStep(3);
        toast.success('Issue identified! Here are your solutions.');
      }
      setIsScanning(false);
    }, 2000);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      processVoiceInput();
    } else {
      setIsRecording(true);
      toast('Listening... Describe your problem');
    }
  };

  const processVoiceInput = async () => {
    setIsScanning(true);
    const result = await api.diagnose('voice', 'User described washing machine noise issue');
    if (result.success) {
      setDiagnosis(result.diagnosis);
      setStep(3);
      toast.success('Got it! I found the perfect solution.');
    }
    setIsScanning(false);
  };

  const handleTextSubmit = async (text) => {
    if (!text.trim()) return;
    setIsScanning(true);
    const result = await api.diagnose('text', text);
    if (result.success) {
      setDiagnosis(result.diagnosis);
      setStep(3);
      toast.success('Problem analyzed! Solutions ready.');
    }
    setIsScanning(false);
  };

  const InputMethodCard = ({ method, icon: Icon, title, description, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        cursor: 'pointer',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        border: '3px solid transparent',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 20px 60px ${color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '100px',
        height: '100px',
        background: `${color}10`,
        borderRadius: '50%'
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 10px 30px ${color}40`
          }}
        >
          <Icon size={40} color="white" />
        </motion.div>
        
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#1a1a1a'
        }}>
          {title}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          {description}
        </p>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 12px',
          background: `${color}10`,
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '600',
          color: color
        }}>
          <Sparkles size={14} />
          {method === 'camera' ? 'AI Vision' : method === 'voice' ? 'AI Voice' : 'AI Text'}
        </div>
      </div>
    </motion.div>
  );

  const ApplianceCard = ({ appliance, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, boxShadow: `0 10px 40px ${appliance.color}30` }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        setSelectedAppliance(appliance);
        setStep(2);
      }}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        border: `2px solid ${selectedAppliance?.id === appliance.id ? appliance.color : '#e5e7eb'}`,
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '4px 8px',
        background: `${appliance.color}15`,
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: '600',
        color: appliance.color
      }}>
        {appliance.issues} issues
      </div>
      
      <div style={{
        fontSize: '32px',
        marginBottom: '12px',
        filter: `drop-shadow(0 4px 8px ${appliance.color}30)`
      }}>
        {appliance.icon}
      </div>
      
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#1a1a1a'
      }}>
        {appliance.name}
      </h4>
    </motion.div>
  );

  const SolutionCard = ({ solution, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: solution.successRate > 85 ? '2px solid #10b981' : '2px solid #e5e7eb'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: solution.successRate > 85 ? 
                'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              {index + 1}
            </div>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1a1a1a'
              }}>
                {solution.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#6b7280'
              }}>
                {solution.description}
              </p>
            </div>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: solution.successRate > 85 ? '#d1fae5' : '#dbeafe',
          borderRadius: '12px',
          minWidth: '100px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: solution.successRate > 85 ? '#065f46' : '#1e40af'
          }}>
            {solution.successRate}%
          </div>
          <div style={{
            fontSize: '11px',
            color: solution.successRate > 85 ? '#065f46' : '#1e40af'
          }}>
            Success Rate
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '8px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Clock size={16} color="#6b7280" style={{ marginBottom: '4px' }} />
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
            {solution.time}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Time</div>
        </div>
        
        <div style={{
          padding: '8px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Wrench size={16} color="#6b7280" style={{ marginBottom: '4px' }} />
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
            Level {solution.difficulty}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Difficulty</div>
        </div>
        
        <div style={{
          padding: '8px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <DollarSign size={16} color="#6b7280" style={{ marginBottom: '4px' }} />
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
            Save ${Math.floor(Math.random() * 100) + 100}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Savings</div>
        </div>
        
        <div style={{
          padding: '8px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {solution.videoAvailable ? (
            <>
              <Play size={16} color="#10b981" style={{ marginBottom: '4px' }} />
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>
                Video
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Available</div>
            </>
          ) : (
            <>
              <FileText size={16} color="#6b7280" style={{ marginBottom: '4px' }} />
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
                Guide
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Text only</div>
            </>
          )}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/guided-repair/${solution.id}`)}
        style={{
          width: '100%',
          padding: '16px',
          background: solution.successRate > 85 ?
            'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
            'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        Start This Repair
        <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03
      }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: `${i * 20}%`,
              left: `${i * 15}%`,
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${appliances[i]?.color || '#667eea'} 0%, transparent 100%)`
            }}
          />
        ))}
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: '40px'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Start New Repair
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Cpu size={16} />
                AI-Powered Diagnosis
              </motion.div>
              
              <div style={{
                padding: '8px 16px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                <History size={16} style={{ display: 'inline', marginRight: '6px' }} />
                {recentIssues.filter(i => i.solved).length}/{recentIssues.length} Recent Fixed
              </div>
            </div>
          </div>
          
          <p style={{
            fontSize: '18px',
            color: '#6b7280'
          }}>
            Let's identify and fix your appliance issue in minutes
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {[
            { num: 1, label: 'Select Appliance' },
            { num: 2, label: 'Describe Issue' },
            { num: 3, label: 'Get Solutions' }
          ].map((s, index) => (
            <div
              key={s.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: step >= s.num ? 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                    '#e5e7eb',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  boxShadow: step >= s.num ? '0 4px 20px rgba(102,126,234,0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {step > s.num ? <CheckCircle size={20} /> : s.num}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: step >= s.num ? '#1a1a1a' : '#9ca3af'
                }}>
                  {s.label}
                </span>
              </div>
              {index < 2 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: step > s.num ? '#667eea' : '#e5e7eb',
                  transition: 'all 0.3s ease'
                }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: '#1a1a1a'
                }}>
                  What needs fixing?
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px'
                }}>
                  {appliances.map((appliance, index) => (
                    <ApplianceCard 
                      key={appliance.id} 
                      appliance={appliance} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>

              {/* Popular Issues */}
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#1a1a1a'
                  }}>
                    Trending Issues Right Now
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => setViewMode('grid')}
                      style={{
                        padding: '8px',
                        background: viewMode === 'grid' ? '#667eea' : 'transparent',
                        color: viewMode === 'grid' ? 'white' : '#6b7280',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      style={{
                        padding: '8px',
                        background: viewMode === 'list' ? '#667eea' : 'transparent',
                        color: viewMode === 'list' ? 'white' : '#6b7280',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
                
                <div style={{
                  display: viewMode === 'grid' ? 'grid' : 'flex',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {popularFixes.slice(0, 4).map((fix, index) => (
                    <motion.div
                      key={fix.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        toast('Loading solution...');
                        navigate(`/repair/${fix.id}`);
                      }}
                      style={{
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <TrendingUp size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '2px',
                          color: '#1a1a1a'
                        }}>
                          {fix.title}
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          color: '#6b7280'
                        }}>
                          {fix.views} people fixed this • {fix.solutions} solutions
                        </p>
                      </div>
                      <ChevronRight size={18} color="#6b7280" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
              }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginBottom: '24px'
                  }}
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    fontSize: '48px',
                    filter: `drop-shadow(0 4px 12px ${selectedAppliance?.color}40)`
                  }}>
                    {selectedAppliance?.icon}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#1a1a1a'
                    }}>
                      Diagnose Your {selectedAppliance?.name}
                    </h2>
                    <p style={{
                      fontSize: '16px',
                      color: '#6b7280'
                    }}>
                      Choose how you'd like to describe the problem
                    </p>
                  </div>
                </div>

                {!inputMethod ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px'
                  }}>
                    <InputMethodCard
                      method="camera"
                      icon={Camera}
                      title="Show Me"
                      description="Point camera at the issue"
                      color="#10b981"
                      onClick={() => {
                        setInputMethod('camera');
                        startCamera();
                      }}
                    />
                    <InputMethodCard
                      method="voice"
                      icon={Mic}
                      title="Tell Me"
                      description="Describe it verbally"
                      color="#f59e0b"
                      onClick={() => setInputMethod('voice')}
                    />
                    <InputMethodCard
                      method="text"
                      icon={Type}
                      title="Type It"
                      description="Write the details"
                      color="#3b82f6"
                      onClick={() => setInputMethod('text')}
                    />
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {inputMethod === 'camera' && (
                      <motion.div
                        key="camera"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <div style={{
                          position: 'relative',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          marginBottom: '20px'
                        }}>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{
                              width: '100%',
                              height: '400px',
                              background: '#000',
                              objectFit: 'cover'
                            }}
                          />
                          
                          {isScanning && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(0,0,0,0.7)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <Scan size={48} color="white" />
                              </motion.div>
                              <p style={{
                                color: 'white',
                                fontSize: '18px',
                                marginTop: '16px'
                              }}>
                                AI is analyzing the issue...
                              </p>
                            </div>
                          )}
                          
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '200px',
                              height: '200px',
                              border: '3px dashed rgba(255,255,255,0.5)',
                              borderRadius: '20px',
                              pointerEvents: 'none'
                            }}
                          />
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          gap: '12px'
                        }}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={captureImage}
                            disabled={isScanning}
                            style={{
                              flex: 1,
                              padding: '16px',
                              background: isScanning ? '#e5e7eb' : 
                                'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              cursor: isScanning ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px'
                            }}
                          >
                            <Camera size={20} />
                            {isScanning ? 'Analyzing...' : 'Capture & Diagnose'}
                          </motion.button>
                          
                          <button
                            onClick={() => setInputMethod(null)}
                            style={{
                              padding: '16px 24px',
                              background: '#f3f4f6',
                              color: '#6b7280',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {inputMethod === 'voice' && (
                      <motion.div
                        key="voice"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ textAlign: 'center' }}
                      >
                        <motion.div
                          animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          onClick={handleVoiceRecord}
                          style={{
                            width: '160px',
                            height: '160px',
                            margin: '0 auto 32px',
                            borderRadius: '50%',
                            background: isRecording ?
                              'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                              'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(245,158,11,0.3)',
                            position: 'relative'
                          }}
                        >
                          {isRecording ? (
                            <Volume2 size={60} color="white" />
                          ) : (
                            <Mic size={60} color="white" />
                          )}
                          
                          {isRecording && (
                            <div style={{
                              position: 'absolute',
                              bottom: '-40px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              display: 'flex',
                              gap: '2px'
                            }}>
                              {voiceWaveform.map((height, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ height }}
                                  style={{
                                    width: '3px',
                                    background: '#f59e0b',
                                    borderRadius: '2px'
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </motion.div>
                        
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          marginBottom: '8px',
                          color: '#1a1a1a'
                        }}>
                          {isRecording ? 'Listening...' : 'Tap to Start Recording'}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          marginBottom: '24px'
                        }}>
                          {isRecording ? 
                            'Describe what\'s wrong with your appliance' :
                            'AI will transcribe and analyze your description'
                          }
                        </p>
                        
                        {!isRecording && (
                          <button
                            onClick={() => setInputMethod(null)}
                            style={{
                              padding: '12px 24px',
                              background: '#f3f4f6',
                              color: '#6b7280',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '14px',
                              cursor: 'pointer'
                            }}
                          >
                            Choose Different Method
                          </button>
                        )}
                      </motion.div>
                    )}

                    {inputMethod === 'text' && (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <textarea
                          placeholder="Describe the issue in detail... (e.g., 'My washing machine is making a loud banging noise during the spin cycle and vibrating excessively')"
                          style={{
                            width: '100%',
                            minHeight: '200px',
                            padding: '20px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '16px',
                            fontSize: '16px',
                            resize: 'vertical',
                            outline: 'none',
                            fontFamily: 'inherit'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#667eea'}
                          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                        
                        <div style={{
                          display: 'flex',
                          gap: '12px',
                          marginTop: '20px'
                        }}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              const text = e.target.parentElement.previousSibling.value;
                              handleTextSubmit(text);
                            }}
                            style={{
                              flex: 1,
                              padding: '16px',
                              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
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
                            <Cpu size={20} />
                            Analyze Issue
                          </motion.button>
                          
                          <button
                            onClick={() => setInputMethod(null)}
                            style={{
                              padding: '16px 24px',
                              background: '#f3f4f6',
                              color: '#6b7280',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && diagnosis && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: '32px',
                border: '2px solid #10b981'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#065f46',
                      marginBottom: '8px'
                    }}>
                      Issue Identified!
                    </h2>
                    <p style={{
                      fontSize: '18px',
                      color: '#047857'
                    }}>
                      {diagnosis.appliance} - {diagnosis.issue}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      marginTop: '16px'
                    }}>
                      <div style={{
                        padding: '8px 16px',
                        background: 'white',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#065f46'
                      }}>
                        <Shield size={16} style={{ display: 'inline', marginRight: '4px' }} />
                        {diagnosis.confidence}% Confidence
                      </div>
                      <div style={{
                        padding: '8px 16px',
                        background: 'white',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#065f46'
                      }}>
                        <Clock size={16} style={{ display: 'inline', marginRight: '4px' }} />
                        {diagnosis.estimatedTime}
                      </div>
                      <div style={{
                        padding: '8px 16px',
                        background: 'white',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#065f46'
                      }}>
                        <DollarSign size={16} style={{ display: 'inline', marginRight: '4px' }} />
                        Save ${diagnosis.estimatedCost}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      fontSize: '80px',
                      filter: 'drop-shadow(0 8px 16px rgba(16,185,129,0.3))'
                    }}
                  >
                    ✅
                  </motion.div>
                </div>
              </div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#1a1a1a'
              }}>
                Recommended Solutions
              </h3>
              
              {diagnosis.solutions.map((solution, index) => (
                <SolutionCard key={solution.id} solution={solution} index={index} />
              ))}
              
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                marginTop: '32px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>
                  Not comfortable with DIY repair?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/schedule-technician')}
                  style={{
                    padding: '16px 32px',
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
                  <Award size={20} />
                  Book Professional Technician
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ marginBottom: '20px' }}
              >
                <Cpu size={60} color="#667eea" />
              </motion.div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#1a1a1a'
              }}>
                AI is Analyzing...
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Identifying the issue and finding solutions
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UltimateNewRepair;