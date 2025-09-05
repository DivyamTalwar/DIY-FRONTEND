import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, Truck, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Activity, BarChart3, Building, Wrench, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight, Zap, Shield, Award,
  Target, Cpu, Globe, Layers, BookOpen, MessageSquare, Phone,
  Video, Settings, LogOut, Menu, X, Search, Filter, Download,
  Star, Heart, ThumbsUp, Eye, Share2, Info, HelpCircle, Map,
  Package, CreditCard, PieChart, Database, Cloud, Lock,
  Smartphone, Monitor, Wifi, Battery, Mic, Camera, Paperclip, Plus,
  ToggleLeft, ToggleRight, UserCheck, UserCog, DollarSign, Hammer,
  Gauge, TrendingDown, RefreshCw, Save, AlertCircle, FileText,
  PlayCircle, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { enhancedMockData, getActivityDetails, getRepairDetails, getPropertyDetails, getTrendingFixDetails } from '../services/enhancedMockData';

// Store dashboard mode in localStorage for persistence
const DASHBOARD_MODE_KEY = 'diy-hero-dashboard-mode';

const InteractiveDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardMode, setDashboardMode] = useState(() => {
    // Get saved mode from localStorage or default to 'tenant'
    return localStorage.getItem(DASHBOARD_MODE_KEY) || 'tenant';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFixModal, setShowFixModal] = useState(false);
  const [selectedFix, setSelectedFix] = useState(null);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    // Save dashboard mode to localStorage whenever it changes
    localStorage.setItem(DASHBOARD_MODE_KEY, dashboardMode);
  }, [dashboardMode]);

  useEffect(() => {
    setLoading(false);
    // Welcome celebration
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6B3', '#FFA07A'],
        origin: { y: 0.4 }
      });
      toast.success(`Welcome to ${dashboardMode === 'tenant' ? 'DIY Hero' : 'Property Manager'} Dashboard!`, {
        icon: dashboardMode === 'tenant' ? '🦸‍♂️' : '👔',
        duration: 4000
      });
    }, 500);
  }, []);

  const handleModeSwitch = () => {
    setIsTransitioning(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.9, y: 0.1 }
    });
    
    setTimeout(() => {
      const newMode = dashboardMode === 'tenant' ? 'manager' : 'tenant';
      setDashboardMode(newMode);
      localStorage.setItem(DASHBOARD_MODE_KEY, newMode);
      setIsTransitioning(false);
      toast.success(`Switched to ${newMode === 'manager' ? 'Property Manager' : 'Tenant'} Dashboard`, {
        icon: newMode === 'manager' ? '👔' : '🏠'
      });
    }, 300);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleRepairClick = (repair) => {
    setSelectedRepair(repair);
    setShowRepairModal(true);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  const handleFixClick = (fix) => {
    setSelectedFix(fix);
    setShowFixModal(true);
  };

  const handleVideoPlay = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setShowVideoPlayer(true);
  };

  // Activity Modal Component
  const ActivityModal = () => (
    <AnimatePresence>
      {showActivityModal && selectedActivity && (
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
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setShowActivityModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                Activity Details
              </h2>
              <button
                onClick={() => setShowActivityModal(false)}
                style={{
                  padding: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px' }}>{selectedActivity.avatar}</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>
                  {selectedActivity.user}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  {selectedActivity.action}
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {selectedActivity.time} • {selectedActivity.property}
                </p>
              </div>
            </div>

            {selectedActivity.details && (
              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Repair Details
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Duration:</span>
                    <span style={{ fontWeight: '600' }}>{selectedActivity.details.duration}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Tools Used:</span>
                    <span style={{ fontWeight: '600' }}>{selectedActivity.details.tools.length} items</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Rating:</span>
                    <span style={{ fontWeight: '600' }}>{'⭐'.repeat(selectedActivity.details.rating)}</span>
                  </div>
                </div>
                {selectedActivity.details.comment && (
                  <p style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontStyle: 'italic'
                  }}>
                    "{selectedActivity.details.comment}"
                  </p>
                )}
              </div>
            )}

            {selectedActivity.achievement && (
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '20px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '48px' }}>{selectedActivity.achievement.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {selectedActivity.achievement.name}
                    </h4>
                    <p style={{ fontSize: '14px', opacity: 0.9 }}>
                      {selectedActivity.achievement.description}
                    </p>
                    <p style={{ fontSize: '12px', marginTop: '4px' }}>
                      +{selectedActivity.achievement.xpReward} XP • {selectedActivity.achievement.rarity}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowActivityModal(false);
                  toast.success('Following ' + selectedActivity.user);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Follow User
              </button>
              <button
                onClick={() => {
                  setShowActivityModal(false);
                  toast.success('Activity shared!');
                }}
                style={{
                  padding: '12px 20px',
                  background: '#f3f4f6',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Repair Modal Component  
  const RepairModal = () => (
    <AnimatePresence>
      {showRepairModal && selectedRepair && (
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
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setShowRepairModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {selectedRepair.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                  {selectedRepair.property} • {selectedRepair.tenant}
                </p>
              </div>
              <button
                onClick={() => setShowRepairModal(false)}
                style={{
                  padding: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Status and Priority */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                padding: '8px 16px',
                background: selectedRepair.status === 'completed' ? '#d4f4dd' : 
                          selectedRepair.status === 'in_progress' ? '#fef3c7' : '#ffd4d4',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: selectedRepair.status === 'completed' ? '#22c55e' : 
                       selectedRepair.status === 'in_progress' ? '#f59e0b' : '#ef4444'
              }}>
                {selectedRepair.status.replace('_', ' ').toUpperCase()}
              </div>
              <div style={{
                padding: '8px 16px',
                background: selectedRepair.priority === 'high' ? '#ffd4d4' : 
                          selectedRepair.priority === 'medium' ? '#fef3c7' : '#e0e7ff',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: selectedRepair.priority === 'high' ? '#ef4444' : 
                       selectedRepair.priority === 'medium' ? '#f59e0b' : '#4f46e5'
              }}>
                {selectedRepair.priority.toUpperCase()} PRIORITY
              </div>
            </div>

            {/* Description */}
            <div style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Description
              </h4>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6 }}>
                {selectedRepair.description}
              </p>
            </div>

            {/* Video Tutorial */}
            {selectedRepair.videoTutorial && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Video Tutorial Available
                </h4>
                <button
                  onClick={() => handleVideoPlay(selectedRepair.videoTutorial)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
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
                  <PlayCircle size={20} /> Watch Tutorial
                </button>
              </div>
            )}

            {/* Progress Steps */}
            {selectedRepair.steps && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Progress Steps ({selectedRepair.currentStep}/{selectedRepair.totalSteps})
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {selectedRepair.steps.map((step) => (
                    <div
                      key={step.id}
                      style={{
                        padding: '12px',
                        background: step.completed ? '#d4f4dd' : '#f9fafb',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      {step.completed ? (
                        <CheckCircle size={20} style={{ color: '#22c55e' }} />
                      ) : (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%'
                        }} />
                      )}
                      <span style={{
                        flex: 1,
                        fontSize: '14px',
                        color: step.completed ? '#22c55e' : '#4b5563',
                        textDecoration: step.completed ? 'line-through' : 'none'
                      }}>
                        {step.name}
                      </span>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                        {step.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedRepair.status !== 'completed' && (
                <button
                  onClick={() => {
                    navigate(`/guided-repair/${selectedRepair.id}`);
                    setShowRepairModal(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Start Repair
                </button>
              )}
              <button
                onClick={() => {
                  setShowRepairModal(false);
                  toast.success('Calling technician...');
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#f3f4f6',
                  color: '#1a1a1a',
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
                <Phone size={18} /> Call Technician
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Video Player Modal
  const VideoPlayerModal = () => (
    <AnimatePresence>
      {showVideoPlayer && currentVideo && (
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
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20000,
            padding: '20px'
          }}
          onClick={() => setShowVideoPlayer(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px'
            }}
          >
            <button
              onClick={() => setShowVideoPlayer(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <X size={24} />
            </button>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px'
            }}>
              <iframe
                src={currentVideo}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Trending Fix Modal
  const FixModal = () => (
    <AnimatePresence>
      {showFixModal && selectedFix && (
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
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setShowFixModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {selectedFix.title}
                </h2>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    background: selectedFix.difficulty === 'Easy' ? '#d4f4dd' : '#fef3c7',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: selectedFix.difficulty === 'Easy' ? '#22c55e' : '#f59e0b'
                  }}>
                    {selectedFix.difficulty}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    ⏱️ {selectedFix.avgTime}
                  </span>
                  <span style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>
                    💰 Save {selectedFix.avgSavings}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowFixModal(false)}
                style={{
                  padding: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                  {selectedFix.successRate}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Success Rate</div>
              </div>
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>
                  {selectedFix.popularity}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Completions</div>
              </div>
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
                  {selectedFix.avgSavings}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Avg Saved</div>
              </div>
            </div>

            {/* Description */}
            <div style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Description
              </h4>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6 }}>
                {selectedFix.description}
              </p>
            </div>

            {/* Video Tutorial */}
            {selectedFix.videoUrl && (
              <div style={{ marginBottom: '24px' }}>
                <button
                  onClick={() => handleVideoPlay(selectedFix.videoUrl)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
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
                  <PlayCircle size={20} /> Watch Tutorial Video
                </button>
              </div>
            )}

            {/* Steps */}
            {selectedFix.steps && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Steps to Complete
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {selectedFix.steps.map((step, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>
                      <span style={{ fontSize: '14px', color: '#4b5563' }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Needed */}
            {selectedFix.tools && (
              <div style={{
                background: '#fef3c7',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                  Tools Needed
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedFix.tools.map((tool, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '4px 12px',
                        background: 'white',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#78350f'
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pro Tip */}
            {selectedFix.proTip && (
              <div style={{
                background: '#e0e7ff',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Zap size={16} style={{ color: '#4f46e5' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#4f46e5' }}>
                    Pro Tip
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: '#4338ca' }}>
                  {selectedFix.proTip}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  navigate(`/guided-repair/${selectedFix.id}`);
                  setShowFixModal(false);
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Start This Fix
              </button>
              <button
                onClick={() => {
                  setShowFixModal(false);
                  toast.success('Fix saved to your list!');
                }}
                style={{
                  padding: '14px 24px',
                  background: '#f3f4f6',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Save for Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Property Modal Component
  const PropertyModal = () => (
    <AnimatePresence>
      {showPropertyModal && selectedProperty && (
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
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setShowPropertyModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {selectedProperty.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                  {selectedProperty.address}
                </p>
              </div>
              <button
                onClick={() => setShowPropertyModal(false)}
                style={{
                  padding: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Property Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {selectedProperty.units}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Total Units</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {selectedProperty.occupancy}%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Occupancy</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  ${(selectedProperty.monthlyRevenue / 1000).toFixed(0)}k
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Revenue/mo</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {selectedProperty.diyStats.successRate}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>DIY Success</div>
              </div>
            </div>

            {/* DIY Performance */}
            <div style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                DIY Performance Metrics
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Total DIY Repairs:</span>
                  <span style={{ fontWeight: '600' }}>{selectedProperty.diyStats.totalRepairs}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Avg Savings:</span>
                  <span style={{ fontWeight: '600', color: '#22c55e' }}>{selectedProperty.diyStats.avgSavings}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Success Rate:</span>
                  <span style={{ fontWeight: '600' }}>{selectedProperty.diyStats.successRate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Avg Completion:</span>
                  <span style={{ fontWeight: '600' }}>{selectedProperty.diyStats.avgCompletionTime}</span>
                </div>
              </div>
            </div>

            {/* Maintenance Requests */}
            <div style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                Maintenance Requests
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{
                  padding: '12px',
                  background: '#ffd4d4',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>
                    {selectedProperty.maintenanceRequests.pending}
                  </div>
                  <div style={{ fontSize: '12px', color: '#991b1b' }}>Pending</div>
                </div>
                <div style={{
                  padding: '12px',
                  background: '#fef3c7',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>
                    {selectedProperty.maintenanceRequests.inProgress}
                  </div>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>In Progress</div>
                </div>
                <div style={{
                  padding: '12px',
                  background: '#d4f4dd',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>
                    {selectedProperty.maintenanceRequests.completed}
                  </div>
                  <div style={{ fontSize: '12px', color: '#14532d' }}>Completed</div>
                </div>
              </div>
            </div>

            {/* Upcoming Maintenance */}
            {selectedProperty.upcomingMaintenance && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Upcoming Maintenance
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {selectedProperty.upcomingMaintenance.map((task, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: '14px', color: '#4b5563' }}>
                        {task.task}
                      </span>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>
                          {task.date}
                        </span>
                        <span style={{
                          padding: '4px 8px',
                          background: '#e0e7ff',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#4f46e5'
                        }}>
                          {task.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <button
                onClick={() => {
                  navigate('/property-manager');
                  setShowPropertyModal(false);
                }}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Manage Property
              </button>
              <button
                onClick={() => {
                  setShowPropertyModal(false);
                  toast.success('Report generated!');
                }}
                style={{
                  padding: '14px',
                  background: '#f3f4f6',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Generate Report
              </button>
              <button
                onClick={() => {
                  setShowPropertyModal(false);
                  toast.success('Viewing tenants...');
                }}
                style={{
                  padding: '14px',
                  background: '#f3f4f6',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View Tenants
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // All Properties View
  const AllPropertiesView = () => (
    <AnimatePresence>
      {showAllProperties && (
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
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setShowAllProperties(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>
                All Properties
              </h2>
              <button
                onClick={() => setShowAllProperties(false)}
                style={{
                  padding: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {enhancedMockData.propertiesData.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => {
                    setSelectedProperty(property);
                    setShowAllProperties(false);
                    setShowPropertyModal(true);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '2px solid #667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '2px solid transparent';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                        {property.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                        {property.address}
                      </p>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>
                          <strong>{property.units}</strong> units
                        </span>
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>
                          <strong>{property.occupancy}%</strong> occupied
                        </span>
                        <span style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>
                          ${(property.monthlyRevenue / 1000).toFixed(0)}k/mo
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={20} style={{ color: '#6b7280' }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => {
                navigate('/property-manager');
                setShowAllProperties(false);
              }}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '24px'
              }}
            >
              Manage All Properties
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Tenant Dashboard Component
  const TenantDashboard = () => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          {
            title: 'DIY Points',
            value: 450,
            icon: Award,
            color: 'linear-gradient(135deg, #667eea, #764ba2)',
            change: '+50 today',
            trend: 'up'
          },
          {
            title: 'Active Repairs',
            value: 3,
            icon: Wrench,
            color: 'linear-gradient(135deg, #f093fb, #f5576c)',
            change: '2 pending',
            trend: 'neutral'
          },
          {
            title: 'Money Saved',
            value: '$900',
            icon: DollarSign,
            color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            change: '+$100 this month',
            trend: 'up'
          },
          {
            title: 'Success Rate',
            value: '85%',
            icon: Target,
            color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            change: '+5% improvement',
            trend: 'up'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)',
              cursor: metric.title === 'Active Repairs' ? 'pointer' : 'default'
            }}
            onClick={() => {
              if (metric.title === 'Active Repairs') {
                const firstRepair = enhancedMockData.detailedRepairs[0];
                handleRepairClick(firstRepair);
              }
            }}
          >
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: '100px',
              height: '100px',
              background: metric.color,
              borderRadius: '50%',
              opacity: 0.1
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: metric.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <metric.icon size={28} style={{ color: 'white' }} />
                </div>
                
                {metric.trend !== 'neutral' && (
                  <div style={{
                    padding: '6px 12px',
                    background: metric.trend === 'up' ? '#d4f4dd' : '#ffd4d4',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {metric.trend === 'up' ? 
                      <ArrowUpRight size={14} style={{ color: '#22c55e' }} /> :
                      <ArrowDownRight size={14} style={{ color: '#ef4444' }} />
                    }
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: metric.trend === 'up' ? '#22c55e' : '#ef4444'
                    }}>
                      {metric.change}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                {metric.value}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: '500' }}>
                {metric.title}
                {metric.title === 'Active Repairs' && (
                  <span style={{ marginLeft: '8px', fontSize: '12px' }}>
                    (click to view)
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Repairs Section */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            🔧 Active Repairs
          </h3>
          <button
            onClick={() => navigate('/new-repair')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} /> New Repair
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {enhancedMockData.detailedRepairs.map((repair) => (
            <motion.div
              key={repair.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ x: 10 }}
              style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: '2px solid transparent',
                transition: 'all 0.3s'
              }}
              onClick={() => handleRepairClick(repair)}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: repair.status === 'completed' ? '#22c55e' : 
                            repair.status === 'in_progress' ? '#f59e0b' : '#ef4444',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Wrench size={24} style={{ color: 'white' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {repair.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: repair.priority === 'high' ? '#ffd4d4' : 
                                repair.priority === 'medium' ? '#fef3c7' : '#d4f4dd',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: repair.priority === 'high' ? '#ef4444' : 
                             repair.priority === 'medium' ? '#f59e0b' : '#22c55e'
                    }}>
                      {repair.priority.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>
                      {repair.category}
                    </span>
                    {repair.videoTutorial && (
                      <span style={{
                        padding: '4px 8px',
                        background: '#e0e7ff',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#4f46e5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoPlay(repair.videoTutorial);
                      }}
                      >
                        <PlayCircle size={12} /> Video
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e', margin: '0 0 4px 0' }}>
                    Save {repair.estimatedSavings || repair.savedAmount}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                    {repair.status === 'completed' ? 'Completed' : `Step ${repair.currentStep}/${repair.totalSteps}`}
                  </p>
                </div>
                <ChevronRight size={20} style={{ color: '#6b7280' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending DIY Fixes */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            🔥 Trending DIY Fixes
          </h3>
          <button
            onClick={() => navigate('/guided-repair/new')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            View All
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {enhancedMockData.trendingFixes.slice(0, 3).map((fix) => (
            <motion.div
              key={fix.id}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '16px',
                color: 'white',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => handleFixClick(fix)}
            >
              {fix.trending && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  🔥 TRENDING
                </div>
              )}
              
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                {fix.title}
              </h4>
              <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px' }}>
                {fix.description}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  ⏱️ {fix.avgTime}
                </div>
                <div style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  💰 Save {fix.avgSavings}
                </div>
                <div style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  📊 {fix.successRate} success
                </div>
                <div style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  👥 {fix.popularity} done
                </div>
              </div>
              
              {fix.videoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoPlay(fix.videoUrl);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    marginTop: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <PlayCircle size={16} /> Watch Tutorial
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Manager Dashboard Component
  const ManagerDashboard = () => (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Key Performance Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          {
            title: 'Truck Rolls Minimized',
            value: enhancedMockData.managerAnalytics.kpis.truckRollReduction.value,
            icon: Truck,
            color: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            change: enhancedMockData.managerAnalytics.kpis.truckRollReduction.change,
            trend: 'up'
          },
          {
            title: 'Money Saved',
            value: `$${enhancedMockData.managerAnalytics.kpis.costSavings.value.toLocaleString()}`,
            icon: DollarSign,
            color: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            change: enhancedMockData.managerAnalytics.kpis.costSavings.change,
            trend: 'up'
          },
          {
            title: 'DIY Resolution Rate',
            value: `${enhancedMockData.managerAnalytics.kpis.diySuccessRate.value}%`,
            icon: Wrench,
            color: 'linear-gradient(135deg, #667eea, #764ba2)',
            change: enhancedMockData.managerAnalytics.kpis.diySuccessRate.change,
            trend: 'up'
          },
          {
            title: 'Avg Response Time',
            value: enhancedMockData.managerAnalytics.kpis.avgResponseTime.value,
            icon: Clock,
            color: 'linear-gradient(135deg, #f093fb, #f5576c)',
            change: enhancedMockData.managerAnalytics.kpis.avgResponseTime.change,
            trend: 'up'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: '100px',
              height: '100px',
              background: metric.color,
              borderRadius: '50%',
              opacity: 0.1
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: metric.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <metric.icon size={28} style={{ color: 'white' }} />
                </div>
                
                <div style={{
                  padding: '6px 12px',
                  background: '#d4f4dd',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ArrowUpRight size={14} style={{ color: '#22c55e' }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#22c55e'
                  }}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                {metric.value}
              </h3>
              <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 4px 0', fontWeight: '600' }}>
                {metric.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Activity Feed & Properties Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Live Activity Feed */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
              🔴 Live Activity Feed
            </h3>
            <div style={{
              padding: '6px 12px',
              background: '#ffd4d4',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#ef4444',
              animation: 'pulse 2s infinite'
            }}>
              LIVE
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
            {enhancedMockData.liveActivityItems.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 10 }}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s'
                }}
                onClick={() => handleActivityClick(activity)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '2px solid #667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '2px solid transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{ fontSize: '24px' }}>{activity.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>
                        {activity.time}
                      </span>
                      {activity.points && (
                        <span style={{
                          padding: '2px 6px',
                          background: '#d4f4dd',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#22c55e'
                        }}>
                          +{activity.points} pts
                        </span>
                      )}
                      {activity.saved && (
                        <span style={{
                          padding: '2px 6px',
                          background: '#e0e7ff',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#4f46e5'
                        }}>
                          {activity.saved} saved
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: '#9ca3af', marginTop: '4px' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Properties Overview */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
              🏢 Properties Overview
            </h3>
            <button
              onClick={() => setShowAllProperties(true)}
              style={{
                padding: '6px 12px',
                background: 'transparent',
                color: '#667eea',
                border: 'none',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enhancedMockData.propertiesData.slice(0, 3).map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => handlePropertyClick(property)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                      {property.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {property.units} units • {property.occupancy}% occupied
                    </p>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#22c55e'
                  }}>
                    ${(property.monthlyRevenue / 1000).toFixed(0)}k
                  </div>
                </div>
                
                <div style={{
                  marginTop: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px'
                }}>
                  <div style={{
                    padding: '4px',
                    background: 'white',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#ef4444' }}>
                      {property.maintenanceRequests.pending}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Pending</div>
                  </div>
                  <div style={{
                    padding: '4px',
                    background: 'white',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#f59e0b' }}>
                      {property.maintenanceRequests.inProgress}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Active</div>
                  </div>
                  <div style={{
                    padding: '4px',
                    background: 'white',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#22c55e' }}>
                      {property.diyStats.successRate}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>DIY Rate</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '24px' }}>
          📊 Performance Analytics
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {enhancedMockData.managerAnalytics.topPerformers.map((property) => (
            <div
              key={property.property}
              style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '16px',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                {property.property}
              </h4>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                {property.score}%
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Performance Score
              </div>
              <div style={{
                marginTop: '12px',
                padding: '6px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                {property.improvement} vs last month
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTopColor: 'white',
              borderRadius: '50%'
            }}
          />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            DIY Hero Platform
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Initializing your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        width: '100%'
      }}>
        {/* Header */}
        <header style={{
          background: 'white',
          borderBottom: '2px solid #e5e7eb',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Logo */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
                }}
              >
                <span style={{ fontSize: '24px' }}>🦸‍♂️</span>
              </motion.div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
                  DIY Hero
                </h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  Revolutionary Property Management
                </p>
              </div>
            </div>

            {/* Dashboard Mode Switcher */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onClick={handleModeSwitch}
            >
              {dashboardMode === 'tenant' ? (
                <>
                  <UserCheck size={20} style={{ color: 'white' }} />
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Tenant Mode</span>
                </>
              ) : (
                <>
                  <UserCog size={20} style={{ color: 'white' }} />
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Manager Mode</span>
                </>
              )}
              <motion.div
                animate={{ rotate: isTransitioning ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {dashboardMode === 'tenant' ? 
                  <ToggleLeft size={24} style={{ color: 'white' }} /> :
                  <ToggleRight size={24} style={{ color: 'white' }} />
                }
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 24px'
        }}>
          {/* Welcome Section */}
          <motion.div
            key={dashboardMode}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '32px' }}
          >
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '8px'
            }}>
              {dashboardMode === 'tenant' ? 
                'Welcome back, DIY Hero Champion! 🦸‍♂️' : 
                'Welcome back, Property Manager! 🏢'}
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              {dashboardMode === 'tenant' ?
                'Ready to conquer repairs and earn legendary rewards!' :
                'Managing your $4.2M property empire efficiently'}
            </p>
          </motion.div>

          {/* Dashboard Content */}
          <AnimatePresence mode="wait">
            {isTransitioning ? (
              <motion.div
                key="transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 auto 20px',
                      border: '3px solid #e5e7eb',
                      borderTopColor: '#667eea',
                      borderRadius: '50%'
                    }}
                  />
                  <p style={{ color: '#6b7280', fontSize: '16px' }}>Switching dashboard...</p>
                </div>
              </motion.div>
            ) : (
              <div key={dashboardMode}>
                {dashboardMode === 'tenant' ? <TenantDashboard /> : <ManagerDashboard />}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Modals */}
        <ActivityModal />
        <RepairModal />
        <PropertyModal />
        <FixModal />
        <AllPropertiesView />
        <VideoPlayerModal />
      </div>
    </>
  );
};

export default InteractiveDashboard;