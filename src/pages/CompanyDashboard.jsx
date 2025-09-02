import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/mockApi';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Activity,
  Shield,
  PhoneCall,
  Target,
  Zap
} from 'lucide-react';

function CompanyDashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 0,
    ongoingRepairs: 0,
    techniciansSaved: 0,
    revenueToday: 0
  });
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const result = await api.getMetrics();
      if (result.success) {
        setLiveMetrics(result.metrics.live);
        setPerformanceMetrics(result.metrics.performance);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to load metrics:', error);
    }
  };

  const metrics = performanceMetrics ? {
    truckRollReduction: {
      value: performanceMetrics.truckRollReduction,
      change: 12,
      trend: 'up',
      target: 85,
      savings: 425000
    },
    customerSatisfaction: {
      value: performanceMetrics.customerSatisfaction,
      change: 0.3,
      trend: 'up',
      reviews: 8924
    },
    firstTimeFixRate: {
      value: performanceMetrics.firstTimeFixRate,
      change: 8,
      trend: 'up',
      industry: 65
    },
    avgResolutionTime: {
      value: performanceMetrics.avgResolutionTime,
      change: -7,
      trend: 'down',
      benchmark: 45
    },
    technicianUtilization: {
      value: 94,
      change: 6,
      trend: 'up',
      optimal: 90
    },
    costPerResolution: {
      value: performanceMetrics.costPerResolution,
      change: -8.20,
      trend: 'down',
      traditional: 189
    }
  } : null;

  const topIssues = [
    { appliance: 'Washing Machine', count: 3421, successRate: 89, avgTime: 15 },
    { appliance: 'Dishwasher', count: 2893, successRate: 92, avgTime: 12 },
    { appliance: 'AC Unit', count: 2156, successRate: 78, avgTime: 22 },
    { appliance: 'Refrigerator', count: 1987, successRate: 85, avgTime: 18 },
    { appliance: 'Dryer', count: 1654, successRate: 91, avgTime: 14 }
  ];

  const behaviorInsights = [
    {
      title: 'Peak Frustration Hours',
      data: '6-8 PM weekdays',
      action: 'Increase AI support staffing',
      impact: '+23% resolution rate'
    },
    {
      title: 'Abandonment Point',
      data: 'Step 3 of complex repairs',
      action: 'Simplify or add video guidance',
      impact: '-31% technician calls'
    },
    {
      title: 'Success Predictor',
      data: 'Users who watch videos',
      action: 'Auto-play videos at critical steps',
      impact: '+45% completion rate'
    }
  ];

  const MetricCard = ({ icon: Icon, title, value, change, trend, subtitle, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        borderRadius: '0 0 0 100%'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={24} color="white" />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: trend === 'up' ? '#d1fae5' : '#fee2e2',
            borderRadius: '8px'
          }}>
            {trend === 'up' ? <TrendingUp size={14} color="#10b981" /> : <TrendingDown size={14} color="#ef4444" />}
            <span style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: trend === 'up' ? '#10b981' : '#ef4444'
            }}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}>
          {value}
        </div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563', marginBottom: '4px' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
      padding: '40px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>
              Company Performance Dashboard
            </h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['day', 'week', 'month'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  style={{
                    padding: '8px 16px',
                    background: timeRange === range ? '#667eea' : 'white',
                    color: timeRange === range ? 'white' : '#6b7280',
                    border: timeRange === range ? 'none' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Real-time metrics showing DIY impact on operations
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Activity size={20} />
              <span style={{ fontSize: '14px', opacity: 0.9 }}>Live Now</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{liveMetrics.activeUsers}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Active Users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Wrench size={20} />
              <span style={{ fontSize: '14px', opacity: 0.9 }}>In Progress</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{liveMetrics.ongoingRepairs}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>DIY Repairs</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Truck size={20} />
              <span style={{ fontSize: '14px', opacity: 0.9 }}>Today</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{liveMetrics.techniciansSaved}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Truck Rolls Saved</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <DollarSign size={20} />
              <span style={{ fontSize: '14px', opacity: 0.9 }}>Saved Today</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>${liveMetrics.revenueToday.toLocaleString()}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Cost Reduction</div>
          </motion.div>
        </div>

        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                height: '140px'
              }}>
                <div className="skeleton" style={{ width: '60%', height: '20px', marginBottom: '16px' }} />
                <div className="skeleton" style={{ width: '40%', height: '32px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ width: '80%', height: '16px' }} />
              </div>
            ))}
          </div>
        ) : metrics && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <MetricCard
            icon={Truck}
            title="Truck Roll Reduction"
            value={`${metrics.truckRollReduction.value}%`}
            change={metrics.truckRollReduction.change}
            trend={metrics.truckRollReduction.trend}
            subtitle={`$${(metrics.truckRollReduction.savings / 1000).toFixed(0)}K saved this month`}
            color="#10b981"
          />
          <MetricCard
            icon={Clock}
            title="Avg Resolution Time"
            value={`${metrics.avgResolutionTime.value} min`}
            change={metrics.avgResolutionTime.change}
            trend={metrics.avgResolutionTime.trend}
            subtitle={`Industry avg: ${metrics.avgResolutionTime.benchmark} min`}
            color="#667eea"
          />
          <MetricCard
            icon={DollarSign}
            title="Cost per Resolution"
            value={`$${metrics.costPerResolution.value}`}
            change={Math.abs(metrics.costPerResolution.change)}
            trend={metrics.costPerResolution.trend}
            subtitle={`Traditional: $${metrics.costPerResolution.traditional}`}
            color="#f59e0b"
          />
        </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Top Resolved Issues
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topIssues.map((issue, index) => (
                <div
                  key={issue.appliance}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, rgba(102,126,234,${1 - index * 0.15}) 0%, rgba(118,75,162,${1 - index * 0.15}) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    marginRight: '16px'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{issue.appliance}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {issue.count.toLocaleString()} repairs
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      background: issue.successRate > 85 ? '#d1fae5' : '#fef3c7',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: issue.successRate > 85 ? '#065f46' : '#92400e'
                    }}>
                      <CheckCircle size={12} />
                      {issue.successRate}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                      Avg: {issue.avgTime} min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Key Performance
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#4b5563' }}>First-Time Fix Rate</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{metrics.firstTimeFixRate.value}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.firstTimeFixRate.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  Industry avg: {metrics.firstTimeFixRate.industry}%
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#4b5563' }}>Customer Satisfaction</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{metrics.customerSatisfaction.value}/5</span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(metrics.customerSatisfaction.value / 5) * 100}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  {metrics.customerSatisfaction.reviews.toLocaleString()} reviews
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#4b5563' }}>Technician Utilization</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{metrics.technicianUtilization.value}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.technicianUtilization.value}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  Optimal: {metrics.technicianUtilization.optimal}%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            AI Behavioral Insights
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {behaviorInsights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Zap size={16} color="#f59e0b" />
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>
                    {insight.title}
                  </h3>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {insight.data}
                </div>
                <div style={{
                  padding: '8px',
                  background: 'white',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    Recommended Action:
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a1a' }}>
                    {insight.action}
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: '#d1fae5',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#065f46'
                }}>
                  <Target size={12} />
                  {insight.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CompanyDashboard;