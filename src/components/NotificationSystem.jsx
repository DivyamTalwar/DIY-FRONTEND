import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Trophy, 
  Users, 
  X,
  Zap,
  TrendingUp,
  ChevronRight,
  Wrench,
  Building,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { api } from '../services/mockApi';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const location = useLocation();
  
  // Check if user is manager or tenant based on route
  const isManager = location.pathname.includes('manager') || location.pathname.includes('property-manager');

  useEffect(() => {
    // Determine mock notifications based on current path
    const currentMockNotifications = isManager ? [
      { 
        id: 1, 
        type: 'urgent', 
        title: 'Emergency Maintenance Request', 
        message: 'Unit 8A - AC system failure requires immediate attention', 
        time: '5 mins ago', 
        read: false, 
        priority: 'high',
        property: 'Sunset Apartments',
        unit: '8A',
        tenant: 'John Smith',
        estimatedCost: '$450',
        data: { xpBonus: 50, saved: 200 }
      },
      { 
        id: 2, 
        type: 'financial', 
        title: 'Revenue Milestone Achieved', 
        message: 'Q1 revenue exceeded targets by 15% - $3.2M achieved!', 
        time: '30 mins ago', 
        read: false,
        amount: '+$450K',
        percentage: '+15%',
        data: { saved: 450000 }
      },
      { 
        id: 3, 
        type: 'tenant', 
        title: 'New Tenant Applications', 
        message: '3 new applications received for Downtown Towers', 
        time: '1 hour ago', 
        read: false,
        count: 3,
        property: 'Downtown Towers',
        data: {}
      },
      { 
        id: 4, 
        type: 'compliance', 
        title: 'Inspection Report Available', 
        message: 'Building C passed annual safety inspection with excellence', 
        time: '2 hours ago', 
        read: true,
        rating: '98/100',
        inspector: 'City Safety Department',
        data: {}
      },
      { 
        id: 5, 
        type: 'performance', 
        title: 'DIY Success Rate Update', 
        message: 'Tenant DIY repairs saved $47K this month', 
        time: '3 hours ago', 
        read: true,
        savings: '$47,892',
        repairsCompleted: 156,
        data: { saved: 47892 }
      }
    ] : [
      { 
        id: 1, 
        type: 'repair', 
        title: 'Faucet Leak Fixed!', 
        message: 'Great job! You saved $200 by fixing it yourself', 
        time: '2 mins ago', 
        read: false,
        points: 75,
        savedAmount: '$200',
        data: { xpBonus: 75, saved: 200 }
      },
      { 
        id: 2, 
        type: 'achievement', 
        title: 'New Badge Unlocked', 
        message: 'You earned the "Speed Demon" badge for quick repairs!', 
        time: '1 hour ago', 
        read: false,
        badge: '🏆',
        points: 200,
        data: { xpBonus: 200 }
      },
      { 
        id: 3, 
        type: 'reminder', 
        title: 'AC Filter Replacement Due', 
        message: 'Time to replace your AC filter for optimal performance', 
        time: '3 hours ago', 
        read: false,
        dueIn: '2 days',
        tutorial: 'Available',
        data: {}
      },
      { 
        id: 4, 
        type: 'community', 
        title: 'Neighbor Needs Help', 
        message: 'John in 4B needs help with a toilet issue', 
        time: '5 hours ago', 
        read: true,
        reward: '50 points',
        unit: '4B',
        data: { xpBonus: 50 }
      },
      { 
        id: 5, 
        type: 'reward', 
        title: 'Points Milestone Reached!', 
        message: 'You reached 5000 points! Claim your reward', 
        time: 'Yesterday', 
        read: true,
        milestone: 5000,
        rewardType: 'Gift Card',
        data: { xpBonus: 500 }
      }
    ];
    
    // Load mock notifications based on user type
    setNotifications(currentMockNotifications);
    setUnreadCount(currentMockNotifications.filter(n => !n.read).length);
    
    // Listen for real-time notifications
    window.onNotification = (notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 10));
      setUnreadCount(prev => prev + 1);
      
      // Show toast notification
      showToast(notification);
    };

    return () => {
      window.onNotification = null;
    };
  }, [location.pathname, isManager]); // Re-run when path or user type changes

  const loadNotifications = async () => {
    const { notifications: data } = await api.getNotifications();
    setNotifications(data);
    setUnreadCount(data.filter(n => !n.read).length);
  };

  const showToast = (notification) => {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        ${getIcon(notification.type)}
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">${notification.title}</div>
          <div style="font-size: 14px; opacity: 0.9;">${notification.message}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 4000);
  };

  const getIcon = (type) => {
    const icons = {
      success: '<svg width="20" height="20" fill="#10b981"><circle cx="10" cy="10" r="10"/></svg>',
      warning: '<svg width="20" height="20" fill="#f59e0b"><circle cx="10" cy="10" r="10"/></svg>',
      error: '<svg width="20" height="20" fill="#ef4444"><circle cx="10" cy="10" r="10"/></svg>',
      info: '<svg width="20" height="20" fill="#3b82f6"><circle cx="10" cy="10" r="10"/></svg>',
      achievement: '🏆',
      community_update: '👥',
      booking_confirmed: '✅',
      feedback_received: '⭐'
    };
    return icons[type] || icons.info;
  };

  const getIconComponent = (type) => {
    switch(type) {
      case 'success':
      case 'booking_confirmed':
        return <CheckCircle size={20} color="#10b981" />;
      case 'warning':
        return <AlertCircle size={20} color="#f59e0b" />;
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'achievement':
        return <Trophy size={20} color="#f59e0b" />;
      case 'community_update':
        return <Users size={20} color="#3b82f6" />;
      case 'feedback_received':
        return <Zap size={20} color="#667eea" />;
      default:
        return <Bell size={20} color="#6b7280" />;
    }
  };

  const markAsRead = async (notificationId) => {
    await api.markRead(notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <>
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPanel(!showPanel)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'white',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <Bell size={24} color="#667eea" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#ef4444',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            style={{
              position: 'fixed',
              top: '80px',
              right: '20px',
              width: '380px',
              maxHeight: '70vh',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              zIndex: 999,
              overflow: 'hidden'
            }}
          >
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                Notifications
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    style={{
                      padding: '4px 8px',
                      background: 'transparent',
                      border: 'none',
                      color: '#6b7280',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setShowPanel(false)}
                  style={{
                    padding: '4px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>
            </div>

            <div style={{
              maxHeight: 'calc(70vh - 80px)',
              overflowY: 'auto'
            }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  <Bell size={48} color="#e5e7eb" style={{ marginBottom: '16px' }} />
                  <p>No notifications yet</p>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>
                    We'll notify you when something important happens
                  </p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      if (!notification.read) markAsRead(notification.id);
                      setSelectedNotification(notification);
                      setShowDetailModal(true);
                    }}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #f3f4f6',
                      background: notification.read ? 'white' : '#f9fafb',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <div style={{ marginTop: '2px' }}>
                        {getIconComponent(notification.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '4px',
                          color: '#1a1a1a'
                        }}>
                          {notification.title}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#6b7280',
                          marginBottom: '4px'
                        }}>
                          {notification.message}
                        </div>
                        {notification.data && (
                          <div style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            marginTop: '8px'
                          }}>
                            {notification.data.xpBonus && (
                              <span style={{
                                padding: '2px 6px',
                                background: '#fef3c7',
                                borderRadius: '4px',
                                color: '#92400e',
                                marginRight: '8px'
                              }}>
                                +{notification.data.xpBonus} XP
                              </span>
                            )}
                            {notification.data.saved && (
                              <span style={{
                                padding: '2px 6px',
                                background: '#d1fae5',
                                borderRadius: '4px',
                                color: '#065f46'
                              }}>
                                ${notification.data.saved} saved
                              </span>
                            )}
                          </div>
                        )}
                        <div style={{
                          fontSize: '11px',
                          color: '#9ca3af',
                          marginTop: '4px'
                        }}>
                          {notification.time || new Date(notification.timestamp || Date.now()).toLocaleTimeString()}
                        </div>
                        {notification.property && (
                          <span style={{
                            padding: '2px 6px',
                            background: '#e0e7ff',
                            borderRadius: '4px',
                            color: '#4338ca',
                            marginTop: '4px',
                            fontSize: '11px',
                            display: 'inline-block'
                          }}>
                            {notification.property}
                          </span>
                        )}
                        {notification.priority === 'high' && (
                          <span style={{
                            padding: '2px 6px',
                            background: '#fee2e2',
                            borderRadius: '4px',
                            color: '#dc2626',
                            fontWeight: 'bold',
                            marginTop: '4px',
                            marginLeft: '4px',
                            fontSize: '11px',
                            display: 'inline-block'
                          }}>
                            URGENT
                          </span>
                        )}
                      </div>
                      {!notification.read && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#3b82f6',
                          marginTop: '6px'
                        }} />
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px',
                    background: selectedNotification.type === 'urgent' || selectedNotification.type === 'error' ? '#fee2e2' :
                               selectedNotification.type === 'financial' || selectedNotification.type === 'achievement' ? '#fef3c7' :
                               selectedNotification.type === 'tenant' || selectedNotification.type === 'community' ? '#dbeafe' :
                               '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {selectedNotification.type === 'achievement' ? '🏆' :
                     selectedNotification.type === 'repair' ? '🔧' :
                     selectedNotification.type === 'urgent' ? <AlertCircle size={24} color="#ef4444" /> :
                     selectedNotification.type === 'financial' ? <DollarSign size={24} color="#f59e0b" /> :
                     selectedNotification.type === 'tenant' || selectedNotification.type === 'community' ? <Users size={24} color="#3b82f6" /> :
                     <Bell size={24} color="#6b7280" />}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                      {selectedNotification.title}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                      {selectedNotification.time}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
                  {selectedNotification.message}
                </p>
              </div>

              {/* Additional Details Based on Type */}
              {isManager && selectedNotification.property && (
                <div style={{ 
                  background: '#f9fafb', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#6b7280' }}>
                    Property Details
                  </h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {selectedNotification.property && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Property:</span>
                        <span style={{ fontWeight: '600' }}>{selectedNotification.property}</span>
                      </div>
                    )}
                    {selectedNotification.unit && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Unit:</span>
                        <span style={{ fontWeight: '600' }}>{selectedNotification.unit}</span>
                      </div>
                    )}
                    {selectedNotification.tenant && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Tenant:</span>
                        <span style={{ fontWeight: '600' }}>{selectedNotification.tenant}</span>
                      </div>
                    )}
                    {selectedNotification.estimatedCost && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Est. Cost:</span>
                        <span style={{ fontWeight: '600', color: '#ef4444' }}>{selectedNotification.estimatedCost}</span>
                      </div>
                    )}
                    {selectedNotification.amount && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Amount:</span>
                        <span style={{ fontWeight: '600', color: '#10b981' }}>{selectedNotification.amount}</span>
                      </div>
                    )}
                    {selectedNotification.savings && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Savings:</span>
                        <span style={{ fontWeight: '600', color: '#10b981' }}>{selectedNotification.savings}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!isManager && (selectedNotification.points || selectedNotification.savedAmount) && (
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '16px',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', opacity: 0.9 }}>
                    Rewards & Savings
                  </h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {selectedNotification.points && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.9 }}>Points Earned:</span>
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>+{selectedNotification.points} XP</span>
                      </div>
                    )}
                    {selectedNotification.savedAmount && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.9 }}>Money Saved:</span>
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{selectedNotification.savedAmount}</span>
                      </div>
                    )}
                    {selectedNotification.badge && (
                      <div style={{ textAlign: 'center', marginTop: '8px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '8px' }}>{selectedNotification.badge}</div>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>New Badge Unlocked!</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                {selectedNotification.type === 'urgent' && isManager && (
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Assign Technician
                  </button>
                )}
                {selectedNotification.type === 'tenant' && isManager && (
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Review Applications
                  </button>
                )}
                {selectedNotification.type === 'reminder' && !isManager && (
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    View Tutorial
                  </button>
                )}
                {selectedNotification.type === 'community' && !isManager && (
                  <button
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Offer Help
                  </button>
                )}
                <button
                  onClick={() => setShowDetailModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f3f4f6',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .notification-toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          z-index: 10000;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default NotificationSystem;