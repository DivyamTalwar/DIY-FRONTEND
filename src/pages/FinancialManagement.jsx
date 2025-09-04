import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3,
  Calendar, Download, Upload, Filter, Search, Plus, Edit,
  Trash2, Eye, FileText, AlertTriangle, CheckCircle, Clock,
  CreditCard, Building, Users, Calculator, Briefcase, Target,
  ArrowUpRight, ArrowDownRight, RefreshCw, Settings, Info,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const FinancialManagement = () => {
  const [activeView, setActiveView] = useState('overview');
  const [financialData, setFinancialData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    loadFinancialData();
    
    // Celebration effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#22c55e', '#84cc16']
      });
      toast.success('Financial Dashboard Loaded! 💰', {
        icon: '📊',
        duration: 3000
      });
    }, 500);
  }, []);

  const loadFinancialData = () => {
    setLoading(true);
    
    // Massive mock financial data
    const mockData = {
      revenue: 6542000,
      expenses: 2187000,
      netIncome: 4355000,
      occupancyRate: 96.8,
      avgRent: 2850,
      totalUnits: 487,
      cashFlow: 3285000,
      roi: 28.4,
      capRate: 8.2,
      debtService: 487000
    };
    setFinancialData(mockData);
    
    // Generate massive mock transactions
    const mockTransactions = generateTransactions();
    setTransactions(mockTransactions);
    
    // Generate mock budgets
    const mockBudgets = generateBudgets();
    setBudgets(mockBudgets);
    
    setTimeout(() => setLoading(false), 1000);
  };

  const generateTransactions = () => {
    const types = ['Income', 'Expense'];
    const categories = {
      Income: ['Rent', 'Late Fees', 'Parking', 'Pet Fees', 'Amenity Fees', 'Storage', 'Application Fees'],
      Expense: ['Maintenance', 'Utilities', 'Insurance', 'Salaries', 'Supplies', 'Marketing', 'Legal', 'Property Tax', 'HOA']
    };
    
    return Array.from({ length: 150 }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const categoryList = categories[type];
      const isIncome = type === 'Income';
      
      return {
        id: `trans_${i + 1}`,
        date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        type,
        category: categoryList[Math.floor(Math.random() * categoryList.length)],
        description: `${type} transaction ${i + 1}`,
        amount: isIncome ? 
          Math.floor(Math.random() * 15000) + 1000 : 
          Math.floor(Math.random() * 5000) + 100,
        property: ['Sunset Apartments', 'Green Valley', 'Downtown Towers', 'Park View', 'Harbor Heights'][Math.floor(Math.random() * 5)],
        status: ['Completed', 'Pending', 'Processing'][Math.floor(Math.random() * 3)],
        vendor: !isIncome ? `Vendor ${Math.floor(Math.random() * 20) + 1}` : null,
        tenant: isIncome ? `Tenant ${Math.floor(Math.random() * 100) + 1}` : null,
        invoice: `INV-${String(i + 1).padStart(6, '0')}`,
        notes: Math.random() > 0.7 ? 'Additional notes here' : null
      };
    }).sort((a, b) => b.date - a.date);
  };

  const generateBudgets = () => {
    const categories = [
      { name: 'Maintenance', annual: 480000, color: '#ef4444' },
      { name: 'Utilities', annual: 240000, color: '#f59e0b' },
      { name: 'Insurance', annual: 180000, color: '#10b981' },
      { name: 'Salaries', annual: 720000, color: '#3b82f6' },
      { name: 'Marketing', annual: 120000, color: '#8b5cf6' },
      { name: 'Property Tax', annual: 360000, color: '#ec4899' },
      { name: 'Capital Improvements', annual: 600000, color: '#06b6d4' }
    ];
    
    return categories.map(category => {
      const monthly = Math.floor(category.annual / 12);
      const spent = Math.floor(monthly * (0.3 + Math.random() * 0.6));
      const remaining = monthly - spent;
      const percentage = Math.round((spent / monthly) * 100);
      
      return {
        ...category,
        monthly,
        spent,
        remaining,
        percentage
      };
    });
  };

  // Chart data
  const revenueChartData = [
    { month: 'Jan', revenue: 482000, expenses: 187000, profit: 295000 },
    { month: 'Feb', revenue: 498000, expenses: 192000, profit: 306000 },
    { month: 'Mar', revenue: 512000, expenses: 198000, profit: 314000 },
    { month: 'Apr', revenue: 528000, expenses: 189000, profit: 339000 },
    { month: 'May', revenue: 545000, expenses: 195000, profit: 350000 },
    { month: 'Jun', revenue: 568000, expenses: 201000, profit: 367000 },
    { month: 'Jul', revenue: 582000, expenses: 198000, profit: 384000 },
    { month: 'Aug', revenue: 598000, expenses: 205000, profit: 393000 },
    { month: 'Sep', revenue: 612000, expenses: 210000, profit: 402000 },
    { month: 'Oct', revenue: 628000, expenses: 208000, profit: 420000 },
    { month: 'Nov', revenue: 642000, expenses: 212000, profit: 430000 },
    { month: 'Dec', revenue: 658000, expenses: 215000, profit: 443000 }
  ];

  const expenseBreakdown = [
    { name: 'Maintenance', value: 28, color: '#ef4444' },
    { name: 'Utilities', value: 18, color: '#f59e0b' },
    { name: 'Salaries', value: 32, color: '#10b981' },
    { name: 'Insurance', value: 12, color: '#3b82f6' },
    { name: 'Marketing', value: 5, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `$${(financialData?.revenue || 0).toLocaleString()}`,
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      period: 'YTD',
      subtitle: 'vs last year',
      color: 'linear-gradient(135deg, #10b981, #84cc16)'
    },
    {
      title: 'Total Expenses',
      value: `$${(financialData?.expenses || 0).toLocaleString()}`,
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      period: 'YTD',
      subtitle: 'vs last year',
      color: 'linear-gradient(135deg, #ef4444, #f97316)'
    },
    {
      title: 'Net Income',
      value: `$${(financialData?.netIncome || 0).toLocaleString()}`,
      change: '+24.7%',
      trend: 'up',
      icon: TrendingUp,
      period: 'YTD',
      subtitle: 'Profit margin: 66.5%',
      color: 'linear-gradient(135deg, #8b5cf6, #a855f7)'
    },
    {
      title: 'Cash Flow',
      value: `$${(financialData?.cashFlow || 0).toLocaleString()}`,
      change: '+21.3%',
      trend: 'up',
      icon: Briefcase,
      period: 'Monthly',
      subtitle: 'Operating cash',
      color: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    },
    {
      title: 'Cap Rate',
      value: `${financialData?.capRate || 0}%`,
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      period: 'Current',
      subtitle: 'Industry avg: 6.5%',
      color: 'linear-gradient(135deg, #ec4899, #f43f5e)'
    },
    {
      title: 'ROI',
      value: `${financialData?.roi || 0}%`,
      change: '+3.2%',
      trend: 'up',
      icon: Calculator,
      period: 'Annual',
      subtitle: 'Return on Investment',
      color: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
    }
  ];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #10b981 0%, #84cc16 100%)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={48} style={{ color: 'white' }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '24px'
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginBottom: '32px',
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #10b981, #84cc16)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              💰 Financial Management Center
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Complete financial overview • $12.8M Portfolio Value • 487 Units
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
            
            <button
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #10b981, #84cc16)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {kpiCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
              background: 'white',
              borderRadius: '16px',
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
              background: card.color,
              borderRadius: '50%',
              opacity: 0.1
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: card.color,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <card.icon size={24} style={{ color: 'white' }} />
                </div>
                
                <div style={{
                  padding: '4px 8px',
                  background: card.trend === 'up' ? '#d4f4dd' : '#ffd4d4',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {card.trend === 'up' ? 
                    <ArrowUpRight size={14} style={{ color: '#22c55e' }} /> :
                    <ArrowDownRight size={14} style={{ color: '#ef4444' }} />
                  }
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: card.trend === 'up' ? '#22c55e' : '#ef4444'
                  }}>
                    {card.change}
                  </span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                {card.value}
              </h3>
              <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 4px 0', fontWeight: '600' }}>
                {card.title}
              </p>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                {card.subtitle} • {card.period}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            📈 Revenue & Profit Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#10b981"
                fill="url(#revenueGradient)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="2"
                stroke="#3b82f6"
                fill="url(#profitGradient)"
              />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            💸 Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          marginBottom: '32px'
        }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          📊 Budget Overview
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {budgets.map((budget, index) => (
            <div key={index} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                  {budget.name}
                </span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  ${budget.spent.toLocaleString()} / ${budget.monthly.toLocaleString()}
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
                  animate={{ width: `${budget.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    background: budget.percentage > 80 ? '#ef4444' : 
                               budget.percentage > 60 ? '#f59e0b' : budget.color,
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {budget.percentage}% used
                </span>
                <span style={{ fontSize: '12px', color: budget.percentage > 80 ? '#ef4444' : '#22c55e' }}>
                  ${budget.remaining.toLocaleString()} remaining
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            💳 Recent Transactions
          </h3>
          <button
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #10b981, #84cc16)',
              color: 'white',
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
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>DATE</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>TYPE</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>CATEGORY</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>PROPERTY</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>AMOUNT</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 10).map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#1a1a1a' }}>
                    {transaction.date.toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: transaction.type === 'Income' ? '#d4f4dd' : '#fef3c7',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: transaction.type === 'Income' ? '#22c55e' : '#f59e0b'
                    }}>
                      {transaction.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#1a1a1a' }}>
                    {transaction.category}
                  </td>
                  <td style={{ padding: '16px 12px', fontSize: '14px', color: '#1a1a1a' }}>
                    {transaction.property}
                  </td>
                  <td style={{ 
                    padding: '16px 12px', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: transaction.type === 'Income' ? '#22c55e' : '#ef4444'
                  }}>
                    {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: transaction.status === 'Completed' ? '#d4f4dd' :
                                 transaction.status === 'Pending' ? '#fef3c7' : '#e0e7ff',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: transaction.status === 'Completed' ? '#22c55e' :
                             transaction.status === 'Pending' ? '#f59e0b' : '#4f46e5'
                    }}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialManagement;