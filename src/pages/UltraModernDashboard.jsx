import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Activity, BarChart3, Building, Wrench, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight, Zap, Shield, Award,
  Target, Cpu, Globe, Layers, BookOpen, MessageSquare, Phone,
  Video, Settings, LogOut, Menu, X, Search, Filter, Download,
  Star, Heart, ThumbsUp, Eye, Share2, Info, HelpCircle, Map,
  Package, Truck, CreditCard, PieChart, Database, Cloud, Lock,
  Smartphone, Monitor, Wifi, Battery, Mic, Camera, Paperclip
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import enhancedAPI from '../services/advancedMockData';

function UltraModernDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    ongoingRepairs: 89,
    revenue: 458923,
    satisfaction: 4.7
  });
  const [notifications, setNotifications] = useState([]);
  const [showCommandCenter, setShowCommandCenter] = useState(false);
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
    startRealTimeUpdates();
    
    // Welcome animation
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await enhancedAPI.getProperties();
      setProperties(data.data.slice(0, 6));
      
      // Simulate notifications
      setNotifications([
        { id: 1, type: 'success', message: 'New tenant onboarded successfully', time: '2 min ago', icon: Users },
        { id: 2, type: 'warning', message: 'Maintenance required at Building A', time: '5 min ago', icon: AlertTriangle },
        { id: 3, type: 'info', message: 'Monthly report ready for download', time: '10 min ago', icon: Download },
        { id: 4, type: 'success', message: 'Payment received from Unit 12B', time: '15 min ago', icon: DollarSign }
      ]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const startRealTimeUpdates = () => {
    setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        ongoingRepairs: prev.ongoingRepairs + Math.floor(Math.random() * 3 - 1),
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 200),
        satisfaction: Math.min(5, Math.max(4, prev.satisfaction + (Math.random() * 0.1 - 0.05)))
      }));
    }, 3000);
  };

  const heroMetrics = [
    {
      title: 'Total Revenue',
      value: '$4.2M',
      change: '+32.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-green-600',
      description: 'Year to date',
      sparkData: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90]
    },
    {
      title: 'Active Properties',
      value: '127',
      change: '+12',
      trend: 'up',
      icon: Building,
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-600',
      description: 'Across 8 cities',
      sparkData: [100, 105, 110, 108, 115, 118, 122, 125, 127]
    },
    {
      title: 'Occupancy Rate',
      value: '94.8%',
      change: '+2.3%',
      trend: 'up',
      icon: Home,
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-600',
      description: '2,847 units occupied',
      sparkData: [88, 89, 90, 91, 92, 92, 93, 94, 94.8]
    },
    {
      title: 'Maintenance Efficiency',
      value: '92%',
      change: '+8%',
      trend: 'up',
      icon: Wrench,
      color: 'orange',
      bgGradient: 'from-orange-500 to-red-600',
      description: 'Same-day resolution',
      sparkData: [75, 78, 80, 82, 85, 87, 89, 91, 92]
    }
  ];

  const quickActions = [
    { icon: Wrench, label: 'New Repair', color: 'purple', path: '/new-repair' },
    { icon: Users, label: 'Add Tenant', color: 'blue', path: '/tenant-portal' },
    { icon: DollarSign, label: 'Process Payment', color: 'green', path: '/financial' },
    { icon: BarChart3, label: 'View Analytics', color: 'orange', path: '/analytics' },
    { icon: Calendar, label: 'Schedule', color: 'pink', path: '/schedule-technician' },
    { icon: Shield, label: 'Security', color: 'red', path: '/property-manager' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8"
          >
            <div className="w-full h-full rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Loading Your Empire</h2>
          <p className="text-purple-300">Preparing something amazing...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Premium Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-black/20 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate('/')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Home className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">DIY Heroes</h1>
                  <p className="text-xs text-purple-300">Property Management Platform</p>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <motion.div
                initial={{ width: 200 }}
                whileHover={{ width: 300 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur rounded-full text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-500"
                />
              </motion.div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-all"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </motion.button>

              {/* User Profile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur rounded-full cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">John Smith</p>
                  <p className="text-xs text-purple-300">Super Admin</p>
                </div>
                <ChevronRight className="text-white/50" size={16} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome back, John! 👋
          </h2>
          <p className="text-purple-300">
            Here's what's happening with your properties today
          </p>
        </motion.div>

        {/* Hero Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {heroMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-10`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 bg-gradient-to-br ${metric.bgGradient} rounded-xl`}>
                    <metric.icon className="text-white" size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {metric.change}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-400 mb-1">{metric.title}</p>
                <p className="text-xs text-purple-300">{metric.description}</p>

                {/* Mini Chart */}
                <div className="mt-4 h-12">
                  <svg className="w-full h-full">
                    <polyline
                      points={metric.sparkData.map((v, i) => `${i * 20},${48 - v * 0.4}`).join(' ')}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.path)}
                className="relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <p className="text-sm font-medium text-white">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Activity className="text-purple-400" size={24} />
                Live Activity Feed
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Live</span>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                { type: 'success', title: 'Maintenance Completed', desc: 'Unit 12B - Water heater replaced', time: 'Just now', icon: CheckCircle },
                { type: 'warning', title: 'Urgent Request', desc: 'Unit 8A - AC not working', time: '2 min ago', icon: AlertTriangle },
                { type: 'info', title: 'New Tenant', desc: 'Sarah Johnson moved into Unit 15C', time: '5 min ago', icon: Users },
                { type: 'success', title: 'Payment Received', desc: '$2,500 from Unit 10D', time: '8 min ago', icon: DollarSign },
                { type: 'info', title: 'Inspection Scheduled', desc: 'Building C - March 15, 2024', time: '12 min ago', icon: Calendar },
                { type: 'success', title: 'Issue Resolved', desc: 'Parking complaint at Building A', time: '15 min ago', icon: CheckCircle }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'success' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <activity.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{activity.title}</h4>
                    <p className="text-gray-400 text-sm">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Assistant */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Cpu className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-purple-300">Powered by Advanced AI</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Zap className="text-yellow-400" size={16} />
                  Predictive Insights
                </h4>
                <p className="text-sm text-gray-300">
                  3 units likely to request maintenance in the next 7 days based on historical patterns.
                </p>
                <button className="mt-2 text-xs text-purple-400 hover:text-purple-300">View Details →</button>
              </div>

              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Target className="text-green-400" size={16} />
                  Optimization Opportunity
                </h4>
                <p className="text-sm text-gray-300">
                  Reduce maintenance costs by 15% by implementing preventive maintenance schedule.
                </p>
                <button className="mt-2 text-xs text-purple-400 hover:text-purple-300">Learn More →</button>
              </div>

              <div className="p-4 bg-white/10 rounded-xl">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="text-blue-400" size={16} />
                  Revenue Forecast
                </h4>
                <p className="text-sm text-gray-300">
                  Expected 8% revenue increase next quarter based on current occupancy trends.
                </p>
                <button className="mt-2 text-xs text-purple-400 hover:text-purple-300">See Analysis →</button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Ask AI Assistant
            </motion.button>
          </motion.div>
        </div>

        {/* Properties Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-white">Properties Overview</h3>
            <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
              View All <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden cursor-pointer"
              >
                <div className="h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">{property.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Units</span>
                      <span className="text-white">{property.occupiedUnits}/{property.units}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Occupancy</span>
                      <span className="text-green-400">{property.metrics.occupancyRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Revenue</span>
                      <span className="text-white">${property.monthlyRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          property.metrics.maintenanceScore > 80 ? 'bg-green-500' :
                          property.metrics.maintenanceScore > 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-xs text-gray-400">Health Score</span>
                      </div>
                      <span className="text-sm font-medium text-white">
                        {property.metrics.maintenanceScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {realTimeData.activeUsers.toLocaleString()}
              </div>
              <p className="text-sm text-gray-400">Active Users</p>
              <div className="mt-2 flex justify-center">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {realTimeData.ongoingRepairs}
              </div>
              <p className="text-sm text-gray-400">Ongoing Repairs</p>
              <div className="mt-2 flex justify-center">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-600"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                ${realTimeData.revenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-400">Today's Revenue</p>
              <div className="mt-2 flex justify-center">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {realTimeData.satisfaction.toFixed(1)}/5.0
              </div>
              <p className="text-sm text-gray-400">Satisfaction Score</p>
              <div className="mt-2 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(realTimeData.satisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UltraModernDashboard;