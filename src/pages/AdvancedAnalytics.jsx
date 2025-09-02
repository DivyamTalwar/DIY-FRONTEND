import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Home, AlertTriangle,
  Clock, CheckCircle, XCircle, BarChart3, PieChart, Activity,
  Calendar, Filter, Download, RefreshCw, Settings, Bell,
  Zap, Target, Award, Briefcase, Eye, ChevronUp, ChevronDown
} from 'lucide-react';
import { Line, Bar, Doughnut, Radar, Scatter, Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import enhancedAPI from '../services/advancedMockData';
import toast from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [predictiveData, setPredictiveData] = useState(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAllData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const update = {
        id: Date.now(),
        type: ['success', 'warning', 'info', 'error'][Math.floor(Math.random() * 4)],
        message: [
          'New maintenance request received',
          'Payment processed successfully',
          'Tenant satisfaction score updated',
          'Predictive alert: HVAC maintenance needed'
        ][Math.floor(Math.random() * 4)],
        timestamp: new Date().toLocaleTimeString()
      };
      setRealTimeUpdates(prev => [update, ...prev].slice(0, 5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [analytics, financial, predictive] = await Promise.all([
        enhancedAPI.getAnalytics(),
        enhancedAPI.getFinancialData(),
        enhancedAPI.getPredictiveData()
      ]);
      
      setAnalyticsData(analytics.data);
      setFinancialData(financial.data);
      setPredictiveData(predictive.data);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
    toast.success('Analytics refreshed');
    setRefreshing(false);
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '$2.16M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      sparkline: [65, 72, 78, 75, 82, 88, 91]
    },
    {
      title: 'Occupancy Rate',
      value: '92.5%',
      change: '+2.3%',
      trend: 'up',
      icon: Home,
      color: 'blue',
      sparkline: [88, 89, 90, 91, 90, 92, 92.5]
    },
    {
      title: 'Maintenance Efficiency',
      value: '87%',
      change: '+5.2%',
      trend: 'up',
      icon: Activity,
      color: 'purple',
      sparkline: [78, 80, 82, 85, 84, 86, 87]
    },
    {
      title: 'Tenant Satisfaction',
      value: '4.6/5',
      change: '+0.3',
      trend: 'up',
      icon: Users,
      color: 'orange',
      sparkline: [4.2, 4.3, 4.4, 4.5, 4.5, 4.6, 4.6]
    },
    {
      title: 'Avg Response Time',
      value: '2.3 hrs',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'teal',
      sparkline: [3.2, 3.0, 2.8, 2.5, 2.4, 2.3, 2.3]
    },
    {
      title: 'Cost per Ticket',
      value: '$125',
      change: '-8%',
      trend: 'down',
      icon: Briefcase,
      color: 'indigo',
      sparkline: [145, 140, 135, 130, 128, 125, 125]
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 12 },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={48} className="text-purple-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Advanced Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Real-time insights and predictive analytics</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white shadow-sm"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* Real-time Updates Bar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-3 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Updates</span>
            </div>
            <div className="flex-1 flex gap-4 overflow-x-auto">
              <AnimatePresence>
                {realTimeUpdates.map(update => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-2 text-sm whitespace-nowrap"
                  >
                    <span className={`w-2 h-2 rounded-full bg-${update.type === 'success' ? 'green' : update.type === 'warning' ? 'yellow' : update.type === 'error' ? 'red' : 'blue'}-500`} />
                    <span className="text-gray-600">{update.message}</span>
                    <span className="text-gray-400 text-xs">{update.timestamp}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg bg-${kpi.color}-100`}>
                <kpi.icon size={20} className={`text-${kpi.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {kpi.change}
              </div>
            </div>
            
            <div className="mb-2">
              <p className="text-gray-500 text-sm">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
            </div>
            
            {/* Mini Sparkline */}
            <div className="h-10">
              <Line
                data={{
                  labels: kpi.sparkline.map((_, i) => i),
                  datasets: [{
                    data: kpi.sparkline,
                    borderColor: kpi.trend === 'up' ? '#10b981' : '#ef4444',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                  scales: {
                    x: { display: false },
                    y: { display: false }
                  }
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Revenue & Expense Trend</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg">Monthly</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Weekly</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Daily</button>
            </div>
          </div>
          
          <div className="h-80">
            <Line
              data={{
                labels: financialData?.revenue.map(r => r.month) || [],
                datasets: [
                  {
                    label: 'Revenue',
                    data: financialData?.revenue.map(r => r.total) || [],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                  },
                  {
                    label: 'Expenses',
                    data: financialData?.expenses.map(e => e.total) || [],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                  }
                ]
              }}
              options={chartOptions}
            />
          </div>
        </motion.div>

        {/* Maintenance by Category */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Maintenance by Category</h3>
          <div className="h-80">
            <Doughnut
              data={{
                labels: ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'Structural'],
                datasets: [{
                  data: [234, 189, 312, 201, 98],
                  backgroundColor: [
                    '#3b82f6',
                    '#8b5cf6',
                    '#ec4899',
                    '#f59e0b',
                    '#10b981'
                  ]
                }]
              }}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      font: { size: 11 }
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Property Performance Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Property Performance Matrix</h3>
          <div className="h-80">
            <Radar
              data={{
                labels: ['Occupancy', 'Maintenance', 'Revenue', 'Satisfaction', 'Efficiency', 'Compliance'],
                datasets: [
                  {
                    label: 'Current',
                    data: [92, 87, 88, 91, 85, 94],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.2)'
                  },
                  {
                    label: 'Target',
                    data: [95, 90, 90, 90, 90, 95],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)'
                  }
                ]
              }}
              options={{
                ...chartOptions,
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Predictive Maintenance Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              Predictive Maintenance Alerts
            </h3>
            <span className="text-sm text-gray-500">AI-Powered Predictions</span>
          </div>
          
          <div className="space-y-3">
            {predictiveData?.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  item.priority === 'High' ? 'border-red-500 bg-red-50' :
                  item.priority === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.priority === 'High' ? 'bg-red-200 text-red-700' :
                        item.priority === 'Medium' ? 'bg-yellow-200 text-yellow-700' :
                        'bg-green-200 text-green-700'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Failure Risk: {item.failureProbability}%</span>
                      <span>Days to Failure: {item.daysToFailure}</span>
                      <span>Est. Cost: ${item.estimatedCost}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{item.recommendedAction}</p>
                    <div className="mt-1">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            item.healthScore > 70 ? 'bg-green-500' :
                            item.healthScore > 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${item.healthScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">Health: {item.healthScore}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Response Time Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Response Time Distribution</h3>
          <div className="space-y-3">
            {[
              { label: '< 1 hour', value: 45, color: 'green' },
              { label: '1-2 hours', value: 30, color: 'blue' },
              { label: '2-4 hours', value: 15, color: 'yellow' },
              { label: '> 4 hours', value: 10, color: 'red' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-${item.color}-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tenant Satisfaction Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Satisfaction Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Communication', score: 4.7, max: 5 },
              { label: 'Response Time', score: 4.5, max: 5 },
              { label: 'Quality', score: 4.6, max: 5 },
              { label: 'Overall', score: 4.6, max: 5 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.score}/{item.max}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded ${
                        i < Math.floor(item.score) ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cost Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Avg Cost per Unit</p>
              <p className="text-2xl font-bold">$125</p>
              <p className="text-sm text-green-600">-8% from last month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Monthly Cost</p>
              <p className="text-2xl font-bold">$45.2K</p>
              <p className="text-sm text-red-600">+3% from last month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cost Efficiency</p>
              <div className="mt-1">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '78%' }} />
                </div>
                <span className="text-xs text-gray-500">78% efficient</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all text-left">
              <div className="flex items-center gap-3">
                <BarChart3 size={18} />
                <span>Generate Report</span>
              </div>
            </button>
            <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all text-left">
              <div className="flex items-center gap-3">
                <Bell size={18} />
                <span>Set Alert</span>
              </div>
            </button>
            <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all text-left">
              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>Schedule Review</span>
              </div>
            </button>
            <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all text-left">
              <div className="flex items-center gap-3">
                <Settings size={18} />
                <span>Configure Metrics</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-4"
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-sm">
                <span className="font-semibold">234</span> Completed Today
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-yellow-500" size={20} />
              <span className="text-sm">
                <span className="font-semibold">47</span> In Progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              <span className="text-sm">
                <span className="font-semibold">12</span> Critical Issues
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdvancedAnalytics;