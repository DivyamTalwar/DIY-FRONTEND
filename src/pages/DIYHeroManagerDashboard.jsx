import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, Truck, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Activity, BarChart3, Building, Wrench, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight, Zap, Shield, Award,
  Target, Cpu, Globe, Layers, BookOpen, MessageSquare, Phone,
  DollarSign, Gauge, Eye, Plus, Star, MapPin, Package,
  CreditCard, PieChart, Database, Cloud, Lock, Sparkles,
  Timer, Battery, Wifi, Signal, Heart, ThumbsUp, Info
} from 'lucide-react';

const ManagerDashboard = ({ navigate, realTimeMetrics, managerData }) => {
  // Activity Feed Data
  const activityFeed = [
    { type: 'success', title: 'Maintenance Completed', desc: 'Unit 12B - Water heater replaced', time: 'Just now', icon: CheckCircle },
    { type: 'warning', title: 'Urgent Request', desc: 'Unit 8A - AC not working', time: '2 min ago', icon: AlertTriangle },
    { type: 'info', title: 'New Tenant', desc: 'Sarah Johnson moved into Unit 15C', time: '5 min ago', icon: Users },
    { type: 'success', title: 'Payment Received', desc: '$2,500 from Unit 10D', time: '8 min ago', icon: DollarSign },
    { type: 'info', title: 'Inspection Scheduled', desc: 'Building C - March 15, 2024', time: '12 min ago', icon: Calendar },
    { type: 'success', title: 'Issue Resolved', desc: 'Parking complaint at Building A', time: '15 min ago', icon: CheckCircle }
  ];

  // Properties data
  const properties = managerData?.properties || [
    { id: 1, name: 'Sunset Apartments', units: 48, occupied: 45, revenue: 135000, rating: 4.8 },
    { id: 2, name: 'Green Valley Complex', units: 36, occupied: 34, revenue: 102000, rating: 4.6 },
    { id: 3, name: 'Downtown Towers', units: 120, occupied: 115, revenue: 345000, rating: 4.9 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Metrics Row - ALL METRICS INCLUDING THE ONES YOU REQUESTED */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Truck Rolls Minimized */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <Truck size={32} style={{ color: '#FF6B6B' }} />
              <div style={{
                padding: '4px 8px',
                background: '#d4f4dd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowUpRight size={12} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e' }}>
                  +18%
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              {realTimeMetrics?.truckRollsSaved || 127}
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Truck Rolls Minimized
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              This month
            </p>
          </div>
        </motion.div>

        {/* Money Saved */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <DollarSign size={32} style={{ color: '#4ECDC4' }} />
              <div style={{
                padding: '4px 8px',
                background: '#d4f4dd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowUpRight size={12} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e' }}>
                  +24%
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              ${(realTimeMetrics?.moneySaved || 67890).toLocaleString()}
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Money Saved
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              Through DIY
            </p>
          </div>
        </motion.div>

        {/* Active Properties */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <Building size={32} style={{ color: '#667eea' }} />
              <div style={{
                padding: '4px 8px',
                background: '#d4f4dd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowUpRight size={12} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e' }}>
                  +12
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              127
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Active Properties
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              Across 8 cities
            </p>
          </div>
        </motion.div>

        {/* Occupancy Rate */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <Home size={32} style={{ color: '#f093fb' }} />
              <div style={{
                padding: '4px 8px',
                background: '#d4f4dd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowUpRight size={12} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e' }}>
                  +2.3%
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              94.8%
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Occupancy Rate
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              2,847 units occupied
            </p>
          </div>
        </motion.div>

        {/* Maintenance Efficiency */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <Wrench size={32} style={{ color: '#43e97b' }} />
              <div style={{
                padding: '4px 8px',
                background: '#d4f4dd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowUpRight size={12} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e' }}>
                  +8%
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              92%
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Maintenance Efficiency
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              Same-day resolution
            </p>
          </div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <Clock size={32} style={{ color: '#ffd700' }} />
              <div style={{
                padding: '4px 8px',
                background: '#d4f4dd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowDownRight size={12} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e' }}>
                  -45min
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
              1.8 hrs
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Avg Response Time
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              For critical issues
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Section for PAM */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' }}>
          ⚡ Quick Management Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: Building, title: 'Properties', subtitle: 'Manage all', color: '#667eea', path: '/property-manager' },
            { icon: BarChart3, title: 'Analytics', subtitle: 'Performance', color: '#4ECDC4', path: '/analytics' },
            { icon: DollarSign, title: 'Financials', subtitle: 'Revenue & costs', color: '#10b981', path: '/financial' },
            { icon: Calendar, title: 'Scheduling', subtitle: 'Technicians', color: '#f59e0b', path: '/schedule-technician' },
            { icon: Users, title: 'Tenant Portal', subtitle: 'View as tenant', color: '#8b5cf6', path: '/tenant-portal' },
            { icon: Wrench, title: 'New Repair', subtitle: 'Create ticket', color: '#ef4444', path: '/new-repair' }
          ].map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: `${action.color}15`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <action.icon size={20} style={{ color: action.color }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                  {action.title}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                  {action.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.2fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Live Activity Feed - LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
              Live Activity Feed
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                background: '#22c55e',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>Live</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activityFeed.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: `4px solid ${
                    activity.type === 'success' ? '#22c55e' :
                    activity.type === 'warning' ? '#f59e0b' : '#3b82f6'
                  }`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: activity.type === 'success' ? '#d4f4dd' :
                             activity.type === 'warning' ? '#fef3c7' : '#dbeafe'
                }}>
                  <activity.icon size={20} style={{
                    color: activity.type === 'success' ? '#22c55e' :
                           activity.type === 'warning' ? '#f59e0b' : '#3b82f6'
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                    {activity.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    {activity.desc}
                  </p>
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            View All Activities
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>

        {/* Properties Overview - MIDDLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
              🏢 Properties Overview
            </h3>
            <button style={{
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                      {property.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {property.units} units • {property.occupied} occupied
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} style={{ color: '#ffd700' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
                      {property.rating}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Monthly Revenue</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>
                      ${(property.revenue / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <ChevronRight size={18} style={{ color: '#9ca3af' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Assistant - RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                AI Assistant
              </h3>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.9 }}>
                Your intelligent property advisor
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: Zap, title: 'Smart Prediction', desc: '3 units need maintenance soon', color: '#ffd700' },
              { icon: Target, title: 'Cost Optimization', desc: 'Save 15% on maintenance', color: '#22c55e' },
              { icon: TrendingUp, title: 'Revenue Forecast', desc: '8% growth expected', color: '#4ECDC4' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  x: 5
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <item.icon size={18} style={{ color: item.color }} />
                  <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '12px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={18} />
            Ask AI Assistant
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Advanced Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px'
      }}>
        {/* Real-time Performance */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            ⚡ Real-time Performance
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { label: 'DIY Resolution Rate', value: 79, color: '#667eea' },
              { label: 'Tenant Satisfaction', value: 92, color: '#22c55e' },
              { label: 'Cost Efficiency', value: 87, color: '#4ECDC4' }
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>{item.value}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      height: '100%',
                      background: item.color,
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            🚀 Quick Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: Plus, label: 'Add Property', color: '#667eea' },
              { icon: Users, label: 'New Tenant', color: '#22c55e' },
              { icon: Wrench, label: 'Schedule Repair', color: '#f59e0b' },
              { icon: BarChart3, label: 'View Analytics', color: '#4ECDC4' }
            ].map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '16px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <action.icon size={24} style={{ color: action.color }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            📅 Upcoming Tasks
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { time: '10:00 AM', task: 'Property inspection - Building A', urgent: true },
              { time: '2:00 PM', task: 'Tenant meeting - Unit 45B', urgent: false },
              { time: '4:30 PM', task: 'Review maintenance reports', urgent: false }
            ].map((task, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  background: task.urgent ? '#fef2f2' : '#f9fafb',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${task.urgent ? '#ef4444' : '#3b82f6'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Clock size={16} style={{ color: task.urgent ? '#ef4444' : '#3b82f6' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                    {task.time}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                    {task.task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* LEGENDARY NEW PAM FEATURES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginTop: '32px'
      }}>
        {/* Portfolio Performance */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            💼 Portfolio Performance
          </h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' }}>
            $12.8M
          </div>
          <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <p>📈 +23% YoY Growth</p>
            <p>🏢 487 Total Units</p>
            <p>💎 96.8% Occupancy Rate</p>
            <p>⭐ 4.9/5 Tenant Satisfaction</p>
            <p>🚀 #1 in District Rankings</p>
          </div>
        </motion.div>

        {/* AI Cost Optimizer */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            🤖 AI Cost Optimizer
          </h3>
          <div style={{ fontSize: '14px', lineHeight: 1.8 }}>
            <p>💰 Saved $892K This Year</p>
            <p>🔧 67% DIY Resolution Rate</p>
            <p>⚡ 4,287 Truck Rolls Avoided</p>
            <p>📊 Predictive Maintenance Active</p>
            <p>🎯 $1.2M Projected Savings Next Year</p>
            <p>🏆 Industry-Leading Efficiency</p>
          </div>
        </motion.div>

        {/* Real-Time Alerts */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            🚨 Real-Time Command Center
          </h3>
          <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <p>🟢 All Systems Operational</p>
            <p>👥 2,847 Active Tenants</p>
            <p>🔧 12 DIY Repairs in Progress</p>
            <p>📱 89% Mobile App Adoption</p>
            <p>⏱️ 1.2hr Avg Response Time</p>
            <p>💬 3 Live Support Chats</p>
          </div>
        </motion.div>

        {/* Revenue Streams */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            💎 Revenue Streams
          </h3>
          <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <p>🏠 Rent: $487K/month</p>
            <p>🅿️ Parking: $28K/month</p>
            <p>📦 Storage: $15K/month</p>
            <p>🏋️ Amenities: $12K/month</p>
            <p>📈 Total: $542K/month</p>
            <p>🚀 +18% vs Last Year</p>
          </div>
        </motion.div>

        {/* Tenant Happiness Index */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            borderRadius: '20px',
            padding: '24px',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            😊 Tenant Happiness Index
          </h3>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '12px' }}>
            98.7%
          </div>
          <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <p>⭐ 4.9/5 Average Rating</p>
            <p>🔄 92% Renewal Rate</p>
            <p>📣 487 Positive Reviews</p>
            <p>🏆 Best Property Award 2024</p>
          </div>
        </motion.div>

        {/* Market Intelligence */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
            borderRadius: '20px',
            padding: '24px',
            color: '#1a1a1a'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            📊 Market Intelligence
          </h3>
          <div style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <p>📈 Market Rent: +7.2%</p>
            <p>🏢 Competition: 3.2% vacancy</p>
            <p>💡 Opportunity: Expand Building C</p>
            <p>🎯 ROI Projection: 23%</p>
            <p>🔮 AI Recommends: Buy adjacent lot</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </motion.div>
  );
};

export default ManagerDashboard;