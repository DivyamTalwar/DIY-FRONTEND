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
import { Line, Bar, Doughnut, Area } from 'react-chartjs-2';
import enhancedAPI from '../services/advancedMockData';
import toast from 'react-hot-toast';

function FinancialManagement() {
  const [activeView, setActiveView] = useState('overview');
  const [financialData, setFinancialData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    loadFinancialData();
  }, [selectedPeriod, selectedProperty]);

  const loadFinancialData = async () => {
    setLoading(true);
    try {
      const data = await enhancedAPI.getFinancialData();
      setFinancialData(data.data);
      
      // Generate mock transactions
      const mockTransactions = generateTransactions();
      setTransactions(mockTransactions);
      
      // Generate mock budgets
      const mockBudgets = generateBudgets();
      setBudgets(mockBudgets);
    } catch (error) {
      toast.error('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  const generateTransactions = () => {
    const types = ['Income', 'Expense'];
    const categories = {
      Income: ['Rent', 'Late Fees', 'Parking', 'Pet Fees', 'Amenity Fees'],
      Expense: ['Maintenance', 'Utilities', 'Insurance', 'Salaries', 'Supplies', 'Marketing', 'Legal']
    };
    
    return Array.from({ length: 100 }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const categoryList = categories[type];
      return {
        id: `trans_${i + 1}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        type,
        category: categoryList[Math.floor(Math.random() * categoryList.length)],
        description: `${type} transaction ${i + 1}`,
        amount: Math.floor(Math.random() * 5000) + 100,
        property: `Property ${Math.floor(Math.random() * 5) + 1}`,
        status: ['Pending', 'Completed', 'Processing'][Math.floor(Math.random() * 3)],
        vendor: type === 'Expense' ? `Vendor ${Math.floor(Math.random() * 10) + 1}` : null,
        tenant: type === 'Income' ? `Tenant ${Math.floor(Math.random() * 50) + 1}` : null,
        invoice: `INV-${String(i + 1).padStart(6, '0')}`,
        notes: Math.random() > 0.7 ? 'Additional notes here' : null
      };
    });
  };

  const generateBudgets = () => {
    const categories = ['Maintenance', 'Utilities', 'Insurance', 'Salaries', 'Marketing', 'Capital'];
    return categories.map(category => ({
      category,
      annual: Math.floor(Math.random() * 100000) + 50000,
      monthly: Math.floor(Math.random() * 10000) + 5000,
      spent: Math.floor(Math.random() * 8000) + 2000,
      remaining: 0,
      percentage: 0
    })).map(budget => ({
      ...budget,
      remaining: budget.monthly - budget.spent,
      percentage: Math.round((budget.spent / budget.monthly) * 100)
    }));
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '$2,156,789',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      period: 'YTD',
      subtitle: 'vs last year',
      color: 'green'
    },
    {
      title: 'Total Expenses',
      value: '$1,823,456',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      period: 'YTD',
      subtitle: 'vs last year',
      color: 'red'
    },
    {
      title: 'Net Income',
      value: '$333,333',
      change: '+24.7%',
      trend: 'up',
      icon: TrendingUp,
      period: 'YTD',
      subtitle: 'Profit margin: 15.4%',
      color: 'purple'
    },
    {
      title: 'Cash Flow',
      value: '$458,923',
      change: '+18.3%',
      trend: 'up',
      icon: Briefcase,
      period: 'Monthly',
      subtitle: 'Operating cash',
      color: 'blue'
    },
    {
      title: 'Cap Rate',
      value: '7.8%',
      change: '+0.5%',
      trend: 'up',
      icon: Target,
      period: 'Current',
      subtitle: 'Industry avg: 6.5%',
      color: 'indigo'
    },
    {
      title: 'NOI',
      value: '$1.2M',
      change: '+15.2%',
      trend: 'up',
      icon: Building,
      period: 'Annual',
      subtitle: 'Net Operating Income',
      color: 'teal'
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
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            }).format(value);
          }
        }
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Financial Management
            </h1>
            <p className="text-gray-600 mt-2">Complete financial overview and management</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white shadow-sm"
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
            
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white shadow-sm"
            >
              <option value="all">All Properties</option>
              <option value="prop1">Sunset Apartments</option>
              <option value="prop2">Green Valley Complex</option>
              <option value="prop3">Harbor View Tower</option>
            </select>
            
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
            
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 mb-6">
          {['overview', 'transactions', 'budget', 'cashflow', 'reports'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === view
                  ? 'bg-white shadow-md text-purple-600 font-medium'
                  : 'bg-white/50 text-gray-600 hover:bg-white'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      {activeView === 'overview' && (
        <>
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
                  <span className="text-xs text-gray-500">{kpi.period}</span>
                </div>
                
                <div className="mb-2">
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{kpi.title}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {kpi.change}
                  </div>
                  <p className="text-xs text-gray-400">{kpi.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue vs Expenses Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Revenue vs Expenses</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-lg">Monthly</button>
                  <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Quarterly</button>
                  <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Yearly</button>
                </div>
              </div>
              
              <div className="h-80">
                <Bar
                  data={{
                    labels: financialData?.revenue.map(r => r.month) || [],
                    datasets: [
                      {
                        label: 'Revenue',
                        data: financialData?.revenue.map(r => r.total) || [],
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderRadius: 8
                      },
                      {
                        label: 'Expenses',
                        data: financialData?.expenses.map(e => e.total) || [],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderRadius: 8
                      }
                    ]
                  }}
                  options={chartOptions}
                />
              </div>
            </motion.div>

            {/* Cash Flow Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Cash Flow Trend</h3>
                <span className="text-sm text-gray-500">Net position over time</span>
              </div>
              
              <div className="h-80">
                <Line
                  data={{
                    labels: financialData?.cashflow.map(c => c.month) || [],
                    datasets: [
                      {
                        label: 'Net Cash Flow',
                        data: financialData?.cashflow.map(c => c.net) || [],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                      },
                      {
                        label: 'Cumulative',
                        data: financialData?.cashflow.map(c => c.cumulative) || [],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                      }
                    ]
                  }}
                  options={chartOptions}
                />
              </div>
            </motion.div>

            {/* Expense Breakdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
              <div className="h-80">
                <Doughnut
                  data={{
                    labels: ['Maintenance', 'Utilities', 'Insurance', 'Management', 'Other'],
                    datasets: [{
                      data: [35000, 25000, 15000, 20000, 10000],
                      backgroundColor: [
                        '#ef4444',
                        '#f59e0b',
                        '#10b981',
                        '#3b82f6',
                        '#8b5cf6'
                      ]
                    }]
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        position: 'right',
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

            {/* Budget vs Actual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Budget vs Actual</h3>
              <div className="space-y-4">
                {Object.entries(financialData?.budgetVsActual || {}).map(([category, data]) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="capitalize font-medium">{category}</span>
                      <div className="flex gap-4">
                        <span className="text-gray-500">Budget: ${data.budget.toLocaleString()}</span>
                        <span className="text-gray-700">Actual: ${data.actual.toLocaleString()}</span>
                        <span className={data.variance < 0 ? 'text-green-600' : 'text-red-600'}>
                          {data.variance < 0 ? '▼' : '▲'} ${Math.abs(data.variance).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          data.actual <= data.budget ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((data.actual / data.budget) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Transactions View */}
      {activeView === 'transactions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Transaction History</h3>
              <button
                onClick={() => setShowTransactionModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                Add Transaction
              </button>
            </div>
          </div>
          
          <div className="p-4 border-b bg-gray-50">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <select className="px-4 py-2 border rounded-lg">
                <option>All Types</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
              <select className="px-4 py-2 border rounded-lg">
                <option>All Categories</option>
                <option>Rent</option>
                <option>Maintenance</option>
                <option>Utilities</option>
              </select>
              <input
                type="date"
                className="px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.slice(0, 10).map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.type === 'Income' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-700'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-purple-600 hover:text-purple-700 mr-3">
                        <Eye size={18} />
                      </button>
                      <button className="text-purple-600 hover:text-purple-700 mr-3">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing 1 to 10 of {transactions.length} transactions
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                <ChevronLeft size={20} />
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Budget View */}
      {activeView === 'budget' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Budget Management</h3>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              Create Budget
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {budgets.map((budget, index) => (
              <motion.div
                key={budget.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{budget.category}</h4>
                    <p className="text-sm text-gray-500">Monthly Budget</p>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Settings size={18} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Spent: ${budget.spent.toLocaleString()}</span>
                    <span>Budget: ${budget.monthly.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        budget.percentage > 90 ? 'bg-red-500' :
                        budget.percentage > 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{budget.percentage}% utilized</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className={`text-lg font-semibold ${
                      budget.remaining < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ${Math.abs(budget.remaining).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Annual</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${budget.annual.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {budget.percentage > 90 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="text-red-600" size={16} />
                    <p className="text-sm text-red-600">Budget limit approaching</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {showTransactionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTransactionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Add Transaction</h2>
                  <button
                    onClick={() => setShowTransactionModal(false)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <form className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-4 py-2 border rounded-lg">
                      <option>Income</option>
                      <option>Expense</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-4 py-2 border rounded-lg">
                      <option>Rent</option>
                      <option>Maintenance</option>
                      <option>Utilities</option>
                      <option>Insurance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter transaction description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-2 border rounded-lg"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>All Properties</option>
                    <option>Sunset Apartments</option>
                    <option>Green Valley Complex</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Additional notes..."
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Transaction
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTransactionModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FinancialManagement;