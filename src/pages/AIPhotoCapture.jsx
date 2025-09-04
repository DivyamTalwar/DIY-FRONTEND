import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Camera, Upload, Search, Zap, CheckCircle, AlertCircle,
  X, Download, Share2, RotateCw, Maximize2, Image,
  Cpu, Sparkles, FileImage, Info, ChevronRight, 
  ArrowLeft, Grid, List, Filter, Eye, Trash2, Wrench,
  Gauge, Clock, DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

// AI Analysis Mock Service with comprehensive data
const aiAnalysisService = {
  analyzeImage: async (imageData) => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate varied mock results
    const issues = [
      {
        mainIssue: 'Leaking Pipe Joint',
        severity: 'Medium',
        confidence: 92,
        recommendations: [
          { step: 1, action: 'Turn off water supply immediately', difficulty: 'Easy', time: '2 min' },
          { step: 2, action: 'Apply pipe thread tape to threads', difficulty: 'Easy', time: '5 min' },
          { step: 3, action: 'Tighten joint connection with wrench', difficulty: 'Medium', time: '10 min' },
          { step: 4, action: 'Turn water back on and test for leaks', difficulty: 'Easy', time: '5 min' }
        ],
        estimatedCost: '$15-25',
        timeRequired: '30-45 minutes',
        toolsNeeded: ['Adjustable Wrench', 'Thread tape', 'Towel', 'Bucket'],
        diyFeasibility: 85,
        warningMessage: '⚠️ If leak persists, shut off water and call a plumber',
        videoTutorialUrl: '/tutorials/pipe-leak-fix',
        successRate: '89% DIY success rate'
      },
      {
        mainIssue: 'Damaged Drywall',
        severity: 'Low',
        confidence: 88,
        recommendations: [
          { step: 1, action: 'Clean the damaged area', difficulty: 'Easy', time: '5 min' },
          { step: 2, action: 'Apply spackling compound', difficulty: 'Easy', time: '10 min' },
          { step: 3, action: 'Sand smooth when dry', difficulty: 'Easy', time: '5 min' },
          { step: 4, action: 'Prime and paint to match', difficulty: 'Medium', time: '20 min' }
        ],
        estimatedCost: '$10-20',
        timeRequired: '2-3 hours (including drying)',
        toolsNeeded: ['Putty knife', 'Sandpaper', 'Spackling', 'Paint'],
        diyFeasibility: 95,
        warningMessage: 'Allow proper drying time between steps',
        videoTutorialUrl: '/tutorials/drywall-repair',
        successRate: '96% DIY success rate'
      },
      {
        mainIssue: 'Clogged Drain',
        severity: 'Medium',
        confidence: 90,
        recommendations: [
          { step: 1, action: 'Try plunging first', difficulty: 'Easy', time: '5 min' },
          { step: 2, action: 'Use drain snake if needed', difficulty: 'Medium', time: '15 min' },
          { step: 3, action: 'Apply enzymatic cleaner', difficulty: 'Easy', time: '5 min' },
          { step: 4, action: 'Flush with hot water', difficulty: 'Easy', time: '2 min' }
        ],
        estimatedCost: '$5-30',
        timeRequired: '20-30 minutes',
        toolsNeeded: ['Plunger', 'Drain snake', 'Enzymatic cleaner'],
        diyFeasibility: 80,
        warningMessage: 'Avoid chemical drain cleaners - they can damage pipes',
        videoTutorialUrl: '/tutorials/unclog-drain',
        successRate: '82% DIY success rate'
      }
    ];
    
    // Randomly select an issue
    const selectedIssue = issues[Math.floor(Math.random() * issues.length)];
    
    return {
      ...selectedIssue,
      similarIssues: [
        { id: 1, title: 'Similar issue fixed by neighbor', date: '2 weeks ago', success: true, savings: '$150' },
        { id: 2, title: 'Video tutorial available', views: 2847, rating: 4.9, duration: '12 min' },
        { id: 3, title: 'Community discussion', replies: 23, helpful: 19 }
      ],
      proTips: [
        '💡 Take before and after photos',
        '💡 Work in good lighting',
        '💡 Have all tools ready before starting'
      ],
      alternativeOptions: [
        { option: 'Schedule DIY Hero Expert', cost: '$50', time: 'Tomorrow' },
        { option: 'Call Professional', cost: '$150-200', time: 'Same day' },
        { option: 'Ask Community Help', cost: 'Free', time: 'Today' }
      ]
    };
  }
};

function AIPhotoCapture() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [mode, setMode] = useState('capture'); // capture, upload, history
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    // Load image history from localStorage or use mock data
    const history = localStorage.getItem('diyHeroImageHistory');
    if (history) {
      setImageHistory(JSON.parse(history));
    } else {
      // Initialize with comprehensive mock history
      const mockHistory = [
        {
          id: 1,
          timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
          issue: 'Leaking Faucet',
          severity: 'Low',
          confidence: 94,
          status: 'Fixed',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2UyZTJlMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+TGVha2luZyBGYXVjZXQ8L3RleHQ+PC9zdmc+'
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
          issue: 'Broken Cabinet Hinge',
          severity: 'Low',
          confidence: 88,
          status: 'Fixed',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2UyZTJlMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+Q2FiaW5ldCBIaW5nZTwvdGV4dD48L3N2Zz4='
        },
        {
          id: 3,
          timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
          issue: 'Wall Crack',
          severity: 'Medium',
          confidence: 76,
          status: 'In Progress',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2UyZTJlMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+V2FsbCBDcmFjazwvdGV4dD48L3N2Zz4='
        },
        {
          id: 4,
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
          issue: 'Electrical Outlet Issue',
          severity: 'High',
          confidence: 91,
          status: 'Tech Required',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2UyZTJlMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+T3V0bGV0IElzc3VlPC90ZXh0Pjwvc3ZnPg=='
        }
      ];
      setImageHistory(mockHistory);
      localStorage.setItem('diyHeroImageHistory', JSON.stringify(mockHistory));
    }

    // Show welcome message
    toast.success('AI Photo Analysis Ready! 📸', {
      icon: '🤖',
      duration: 3000
    });

    return () => {
      // Cleanup camera on unmount
      if (cameraActive) {
        stopCamera();
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      toast.error('Failed to access camera');
      console.error('Camera error:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      const imageData = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      stopCamera();
      
      toast.success('Photo captured successfully!', { icon: '📸' });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        toast.success('Image uploaded successfully!', { icon: '✅' });
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    toast.loading('AI is analyzing your image...', { id: 'analyzing' });
    
    try {
      const result = await aiAnalysisService.analyzeImage(capturedImage);
      setAnalysisResult(result);
      
      // Save to history
      const historyItem = {
        id: Date.now(),
        image: capturedImage,
        analysis: result,
        date: new Date().toISOString()
      };
      
      const newHistory = [historyItem, ...imageHistory].slice(0, 20); // Keep last 20
      setImageHistory(newHistory);
      localStorage.setItem('diyHeroImageHistory', JSON.stringify(newHistory));
      
      toast.success('Analysis complete!', { id: 'analyzing', icon: '🎯' });
      
      // Celebration for high DIY feasibility
      if (result.diyFeasibility > 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success("Great news! This is perfect for DIY!", { icon: '🦸‍♂️' });
      }
    } catch (error) {
      toast.error('Analysis failed. Please try again.', { id: 'analyzing' });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setMode('capture');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '24px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '20px 24px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                🤖 AI Photo Analysis
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Snap, analyze, and fix with AI assistance
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '4px',
            background: '#f3f4f6',
            borderRadius: '10px'
          }}>
            {[
              { id: 'capture', icon: Camera, label: 'Capture' },
              { id: 'upload', icon: Upload, label: 'Upload' },
              { id: 'history', icon: Grid, label: 'History' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                style={{
                  padding: '8px 16px',
                  background: mode === item.id ? 'white' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: mode === item.id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <item.icon size={18} style={{ color: mode === item.id ? '#667eea' : '#6b7280' }} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: mode === item.id ? '600' : '400',
                  color: mode === item.id ? '#667eea' : '#6b7280'
                }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <AnimatePresence mode="wait">
          {mode === 'capture' && (
            <motion.div
              key="capture"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                display: 'grid',
                gridTemplateColumns: capturedImage ? '1fr 1fr' : '1fr',
                gap: '24px'
              }}
            >
              {/* Camera View */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                  📷 Camera Capture
                </h3>
                
                {!capturedImage ? (
                  <div>
                    {!cameraActive ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={startCamera}
                        style={{
                          height: '400px',
                          background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                          borderRadius: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: '2px dashed #9ca3af'
                        }}
                      >
                        <Camera size={48} style={{ color: '#6b7280', marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                          Start Camera
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                          Click to activate camera and capture repair issue
                        </p>
                      </motion.div>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          style={{
                            width: '100%',
                            borderRadius: '16px',
                            background: 'black'
                          }}
                        />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        
                        {/* Camera Controls */}
                        <div style={{
                          position: 'absolute',
                          bottom: '20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: '16px'
                        }}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={capturePhoto}
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '50%',
                              background: 'white',
                              border: '4px solid #667eea',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Camera size={28} style={{ color: '#667eea' }} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={stopCamera}
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              background: 'rgba(239, 68, 68, 0.9)',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <X size={24} style={{ color: 'white' }} />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      style={{
                        width: '100%',
                        borderRadius: '16px',
                        marginBottom: '20px'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          opacity: isAnalyzing ? 0.7 : 1
                        }}
                      >
                        {isAnalyzing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RotateCw size={18} />
                            </motion.div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Analyze with AI
                          </>
                        )}
                      </motion.button>
                      <button
                        onClick={resetCapture}
                        style={{
                          padding: '12px 20px',
                          background: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                      🔍 AI Analysis Results
                    </h3>
                    <div style={{
                      padding: '6px 12px',
                      background: analysisResult.severity === 'High' ? '#fef2f2' :
                                  analysisResult.severity === 'Medium' ? '#fef3c7' : '#d1fae5',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: analysisResult.severity === 'High' ? '#dc2626' :
                             analysisResult.severity === 'Medium' ? '#f59e0b' : '#10b981'
                    }}>
                      {analysisResult.severity} Priority
                    </div>
                  </div>

                  {/* Main Issue */}
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    borderRadius: '16px',
                    marginBottom: '20px'
                  }}>
                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' }}>
                      {analysisResult.mainIssue}
                    </h4>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Gauge size={16} style={{ color: '#667eea' }} />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>
                          {analysisResult.confidence}% Confidence
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={16} style={{ color: '#667eea' }} />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>
                          {analysisResult.timeRequired}
                        </span>
                      </div>
                    </div>
                    
                    {/* DIY Feasibility */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          DIY Feasibility
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                          {analysisResult.diyFeasibility}%
                        </span>
                      </div>
                      <div style={{
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisResult.diyFeasibility}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #22c55e, #10b981)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                      📋 Step-by-Step Guide
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {analysisResult.recommendations.map((rec, index) => (
                        <motion.div
                          key={rec.step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          style={{
                            padding: '12px',
                            background: '#f9fafb',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                        >
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}>
                            {rec.step}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#1a1a1a' }}>
                              {rec.action}
                            </p>
                          </div>
                          <span style={{
                            padding: '4px 8px',
                            background: rec.difficulty === 'Easy' ? '#d1fae5' : '#fef3c7',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            color: rec.difficulty === 'Easy' ? '#10b981' : '#f59e0b'
                          }}>
                            {rec.difficulty}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Cost and Tools */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <DollarSign size={18} style={{ color: '#667eea' }} />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Estimated Cost
                        </span>
                      </div>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                        {analysisResult.estimatedCost}
                      </p>
                    </div>
                    <div style={{
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Wrench size={18} style={{ color: '#667eea' }} />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Tools Needed
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {analysisResult.toolsNeeded.map((tool) => (
                          <span
                            key={tool}
                            style={{
                              padding: '2px 8px',
                              background: '#e5e7eb',
                              borderRadius: '6px',
                              fontSize: '12px',
                              color: '#374151'
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/guided-repair/ai-generated')}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Start DIY Repair
                    </motion.button>
                    <button
                      onClick={() => navigate('/schedule-technician')}
                      style={{
                        padding: '12px 20px',
                        background: 'transparent',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Call Expert
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {mode === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>
                📤 Upload Image
              </h3>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '60px',
                  background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '3px dashed #9ca3af'
                }}
              >
                <Upload size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Click or Drag to Upload
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                  Support for JPG, PNG, HEIC up to 10MB
                </p>
                <button style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Choose File
                </button>
              </motion.div>
            </motion.div>
          )}

          {mode === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    📸 Analysis History
                  </h3>
                  <button
                    onClick={() => {
                      setImageHistory([]);
                      localStorage.removeItem('diyHeroImageHistory');
                      toast.success('History cleared');
                    }}
                    style={{
                      padding: '8px 16px',
                      background: '#fef2f2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={16} />
                    Clear History
                  </button>
                </div>

                {imageHistory.length === 0 ? (
                  <div style={{
                    padding: '60px',
                    textAlign: 'center',
                    background: '#f9fafb',
                    borderRadius: '16px'
                  }}>
                    <Image size={48} style={{ color: '#9ca3af', marginBottom: '16px' }} />
                    <p style={{ fontSize: '16px', color: '#6b7280' }}>
                      No analysis history yet. Start by capturing or uploading an image!
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '20px'
                  }}>
                    {imageHistory.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          border: '1px solid #e5e7eb',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onClick={() => {
                          setCapturedImage(item.image);
                          setAnalysisResult(item.analysis);
                          setMode('capture');
                        }}
                      >
                        <div style={{
                          height: '160px',
                          background: `url(${item.image}) center/cover`
                        }} />
                        <div style={{ padding: '16px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                            {item.analysis.mainIssue}
                          </h4>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{
                              padding: '4px 8px',
                              background: item.analysis.severity === 'High' ? '#fef2f2' :
                                         item.analysis.severity === 'Medium' ? '#fef3c7' : '#d1fae5',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: item.analysis.severity === 'High' ? '#dc2626' :
                                     item.analysis.severity === 'Medium' ? '#f59e0b' : '#10b981'
                            }}>
                              {item.analysis.severity}
                            </span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AIPhotoCapture;