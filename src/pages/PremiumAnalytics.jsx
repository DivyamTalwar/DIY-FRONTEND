import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Building, AlertTriangle,
  Activity, BarChart3, PieChart, Globe, Cpu, Zap, Target, Award,
  Clock, CheckCircle, XCircle, Calendar, Filter, Download, RefreshCw,
  Settings, Bell, Eye, ChevronUp, ChevronDown, ArrowUpRight, ArrowDownRight,
  Layers, Database, Cloud, Lock, Shield, Sparkles, Rocket, Diamond,
  Brain, Gauge, Map, Navigation, Compass, Timer, Battery, Wifi,
  Signal, Radio, Mic, Video, Camera, Monitor, Smartphone, Watch
} from 'lucide-react';
import { Line, Bar, Doughnut, Radar, Scatter, Bubble, PolarArea } from 'react-chartjs-2';
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
import confetti from 'canvas-confetti';

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

function PremiumAnalytics() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    revenue: 2156789,
    users: 12847,
    efficiency: 92,
    satisfaction: 4.8,
    transactions: 3847,
    apiCalls: 984732
  });
  const [streamData, setStreamData] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    loadData();
    startRealTimeStream();
    initParticles();
    
    // Celebration on load
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#ec4899', '#3b82f6']
      });
    }, 500);

    return () => {
      if (window.particleAnimation) {
        cancelAnimationFrame(window.particleAnimation);
      }
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load analytics');
      setLoading(false);
    }
  };

  const startRealTimeStream = () => {
    setInterval(() => {
      setRealTimeMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 200),
        users: prev.users + Math.floor(Math.random() * 10 - 3),
        efficiency: Math.min(100, Math.max(85, prev.efficiency + (Math.random() * 2 - 1))),
        satisfaction: Math.min(5, Math.max(4, prev.satisfaction + (Math.random() * 0.1 - 0.05))),
        transactions: prev.transactions + Math.floor(Math.random() * 5),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 100)
      }));

      // Add stream data point
      setStreamData(prev => {
        const newData = [...prev, Math.random() * 100];
        return newData.slice(-50);
      });
    }, 1000);
  };

  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      window.particleAnimation = requestAnimationFrame(animate);
    };
    animate();
  };

  const premiumCards = [
    {
      title: 'Total Revenue',
      value: `$${(realTimeMetrics.revenue / 1000000).toFixed(2)}M`,
      change: '+32.5%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      glow: 'shadow-emerald-500/50',
      subtitle: 'Real-time tracking',
      sparkline: true
    },
    {
      title: 'Active Users',
      value: realTimeMetrics.users.toLocaleString(),
      change: '+847',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      glow: 'shadow-blue-500/50',
      subtitle: 'Online now',
      sparkline: true
    },
    {
      title: 'System Efficiency',
      value: `${realTimeMetrics.efficiency.toFixed(1)}%`,
      change: '+5.2%',
      trend: 'up',
      icon: Gauge,
      gradient: 'from-purple-400 via-pink-500 to-red-600',
      glow: 'shadow-purple-500/50',
      subtitle: 'AI Optimized',
      sparkline: true
    },
    {
      title: 'Satisfaction Score',
      value: `${realTimeMetrics.satisfaction.toFixed(1)}/5.0`,
      change: '+0.3',
      trend: 'up',
      icon: Award,
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
      glow: 'shadow-yellow-500/50',
      subtitle: 'Industry leading',
      sparkline: true
    },
    {
      title: 'Transactions',
      value: realTimeMetrics.transactions.toLocaleString(),
      change: '+23%',
      trend: 'up',
      icon: Activity,
      gradient: 'from-cyan-400 via-teal-500 to-green-600',
      glow: 'shadow-cyan-500/50',
      subtitle: 'Today',
      sparkline: true
    },
    {
      title: 'API Calls',
      value: `${(realTimeMetrics.apiCalls / 1000).toFixed(0)}K`,
      change: '+12%',
      trend: 'up',
      icon: Globe,
      gradient: 'from-rose-400 via-pink-500 to-purple-600',
      glow: 'shadow-rose-500/50',
      subtitle: 'Per minute',
      sparkline: true
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 12, family: 'Inter' },
          padding: 20,
          color: '#ffffff',
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 16,
        cornerRadius: 12,
        displayColors: true,
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { 
          display: true,
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
      },
      y: {
        grid: { 
          display: true,
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: { 
          color: 'rgba(255, 255, 255, 0.6)',
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto mb-8"
          >
            <div className="w-full h-full rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin" 
                 style={{ borderTopColor: 'transparent', borderStyle: 'solid' }} />
          </motion.div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Loading Analytics Engine
          </h2>
          <p className="text-gray-400">Preparing advanced visualizations...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-blue-900/20 to-transparent" />
      </div>

      {/* Premium Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 bg-black/40 backdrop-blur-2xl border-b border-white/10"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Premium Analytics
                  </h1>
                  <p className="text-xs text-gray-500">Real-time Intelligence Platform</p>
                </div>
              </motion.div>

              {/* Live Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-medium">LIVE</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Time Range Selector */}
              <div className="flex bg-white/5 rounded-lg p-1">
                {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm shadow-lg shadow-purple-500/30"
              >
                <Download className="inline mr-2" size={16} />
                Export Report
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white"
              >
                <Settings size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 w-full" style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Premium KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {premiumCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative bg-gradient-to-br ${card.gradient} p-[1px] rounded-2xl shadow-2xl ${card.glow}`}
            >
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 h-full">
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"
                  >
                    <card.icon className="text-white" size={20} />
                  </motion.div>
                  <div className={`flex items-center gap-1 text-xs ${
                    card.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {card.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {card.change}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="text-3xl font-bold text-white mb-1">{card.value}</h3>
                  <p className="text-xs text-gray-400">{card.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                </div>

                {/* Mini Sparkline */}
                {card.sparkline && (
                  <div className="mt-4 h-8">
                    <svg className="w-full h-full">
                      <polyline
                        points={streamData.slice(-10).map((v, i) => `${i * 10},${32 - v * 0.3}`).join(' ')}
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 3D-Style Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Revenue Flow Analysis</h3>
                <p className="text-sm text-gray-400">Real-time financial tracking</p>
              </div>
              <div className="flex gap-2">
                {['Area', 'Line', 'Bar'].map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1 text-xs bg-white/5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80">
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [320000, 340000, 330000, 360000, 380000, 420000, 450000, 480000, 510000, 540000, 580000, 620000],
                      borderColor: 'rgba(139, 92, 246, 1)',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      fill: true,
                      tension: 0.4,
                      borderWidth: 3,
                      pointRadius: 0,
                      pointHoverRadius: 6,
                      pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2
                    },
                    {
                      label: 'Profit',
                      data: [120000, 130000, 125000, 140000, 150000, 165000, 180000, 195000, 210000, 225000, 245000, 265000],
                      borderColor: 'rgba(236, 72, 153, 1)',
                      backgroundColor: 'rgba(236, 72, 153, 0.1)',
                      fill: true,
                      tension: 0.4,
                      borderWidth: 3,
                      pointRadius: 0,
                      pointHoverRadius: 6,
                      pointBackgroundColor: 'rgba(236, 72, 153, 1)',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2
                    }
                  ]
                }}
                options={chartOptions}
              />
            </div>
          </motion.div>

          {/* AI Predictions Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Predictions</h3>
                <p className="text-xs text-gray-400">Machine Learning Insights</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Revenue Next Month', value: '$742K', confidence: 94, trend: 'up' },
                { label: 'User Growth', value: '+2,847', confidence: 88, trend: 'up' },
                { label: 'Churn Risk', value: '2.3%', confidence: 91, trend: 'down' },
                { label: 'Market Opportunity', value: '$12.4M', confidence: 86, trend: 'up' }
              ].map((prediction, index) => (
                <motion.div
                  key={prediction.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">{prediction.label}</span>
                    <div className={`flex items-center gap-1 text-xs ${
                      prediction.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {prediction.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold text-white">{prediction.value}</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Confidence</div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${prediction.confidence}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          />
                        </div>
                        <span className="text-xs text-gray-400">{prediction.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Advanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Performance Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Performance Matrix</h3>
            <div className="h-64">
              <Radar
                data={{
                  labels: ['Speed', 'Reliability', 'Scalability', 'Security', 'UX', 'Cost'],
                  datasets: [{
                    label: 'Current',
                    data: [92, 88, 95, 97, 90, 85],
                    borderColor: 'rgba(34, 197, 94, 1)',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    borderWidth: 2
                  }, {
                    label: 'Target',
                    data: [95, 90, 95, 95, 95, 90],
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2
                  }]
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: { color: 'rgba(255, 255, 255, 0.5)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Geographic Reach</h3>
            <div className="h-64">
              <PolarArea
                data={{
                  labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa'],
                  datasets: [{
                    data: [42, 28, 18, 8, 4],
                    backgroundColor: [
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(236, 72, 153, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(34, 197, 94, 0.8)',
                      'rgba(251, 146, 60, 0.8)'
                    ],
                    borderWidth: 0
                  }]
                }}
                options={{
                  ...chartOptions,
                  scales: {
                    r: {
                      ticks: { display: false },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">System Health</h3>
            <div className="space-y-4">
              {[
                { name: 'API Gateway', status: 'operational', uptime: 99.99, latency: 42 },
                { name: 'Database', status: 'operational', uptime: 99.97, latency: 8 },
                { name: 'Cache Layer', status: 'operational', uptime: 100, latency: 2 },
                { name: 'CDN', status: 'operational', uptime: 99.99, latency: 18 }
              ].map((system, index) => (
                <div key={system.name} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white font-medium">{system.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        system.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                      } animate-pulse`} />
                      <span className="text-xs text-green-400">Online</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Uptime</span>
                      <p className="text-white font-medium">{system.uptime}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Latency</span>
                      <p className="text-white font-medium">{system.latency}ms</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Live Feed</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Streaming</span>
              </div>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {[
                { event: 'New user signup', location: 'New York', time: 'Just now' },
                { event: 'Payment processed', location: 'London', time: '12s ago' },
                { event: 'Property listed', location: 'Tokyo', time: '34s ago' },
                { event: 'Maintenance completed', location: 'Paris', time: '1m ago' },
                { event: 'Contract signed', location: 'Sydney', time: '2m ago' },
                { event: 'Review submitted', location: 'Toronto', time: '3m ago' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-2 bg-white/5 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-white font-medium">{item.event}</p>
                      <p className="text-xs text-gray-500">{item.location}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: 'Server Load', value: '42%', icon: Cpu },
              { label: 'Memory Usage', value: '3.2GB', icon: Database },
              { label: 'Network I/O', value: '847Mb/s', icon: Wifi },
              { label: 'Storage', value: '1.2TB', icon: Cloud },
              { label: 'Requests/Sec', value: '12.4K', icon: Globe },
              { label: 'Error Rate', value: '0.02%', icon: AlertTriangle },
              { label: 'Avg Response', value: '124ms', icon: Timer },
              { label: 'Connections', value: '8,947', icon: Radio }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PremiumAnalytics;