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
  TrendingUp
} from 'lucide-react';
import { api } from '../services/mockApi';

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Listen for real-time notifications
    window.onNotification = (notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 10));
      setUnreadCount(prev => prev + 1);
      
      // Show toast notification
      showToast(notification);
    };

    // Load initial notifications
    loadNotifications();

    return () => {
      window.onNotification = null;
    };
  }, []);

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
                    onClick={() => !notification.read && markAsRead(notification.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #f3f4f6',
                      background: notification.read ? 'white' : '#f9fafb',
                      cursor: notification.read ? 'default' : 'pointer',
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
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </div>
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

      <style jsx>{`
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