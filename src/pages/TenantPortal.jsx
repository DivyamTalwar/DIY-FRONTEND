import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Home, CreditCard, FileText, MessageSquare, Calendar,
  Wrench, Bell, Settings, History, Download, Upload, Phone,
  Mail, Clock, CheckCircle, AlertCircle, DollarSign, Key,
  Package, Car, Shield, Heart, Star, ChevronRight, Plus,
  Camera, Paperclip, Send, Filter, Search, LogOut, Edit,
  Trash2, Eye, X, Check, AlertTriangle, Info, HelpCircle,
  Building, TrendingUp, Award, Users, Activity, MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const TenantPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTenant, setCurrentTenant] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTenantData();
    
    // Welcome celebration
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#667eea', '#764ba2', '#4ECDC4']
      });
      toast.success('Welcome to Your Tenant Portal! 🏠', {
        duration: 3000
      });
    }, 500);
  }, []);

  const loadTenantData = () => {
    setLoading(true);
    
    // Massive mock tenant data
    const tenantData = {
      id: 'tenant_001',
      firstName: 'John',
      lastName: 'Smith',
      unit: '12B',
      property: 'Sunset Apartments',
      building: 'Building A',
      floor: '3rd Floor',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      moveInDate: '2022-03-15',
      leaseEnd: '2025-03-14',
      rentAmount: 2500,
      balance: 0,
      nextPaymentDue: '2024-04-01',
      avatar: '👤',
      diyPoints: 1250,
      diyLevel: 'Gold Hero',
      emergencyContact: {
        name: 'Jane Smith',
        phone: '(555) 987-6543',
        relationship: 'Spouse'
      },
      pets: [
        { type: 'Dog', name: 'Max', breed: 'Golden Retriever' }
      ],
      vehicles: [
        { make: 'Toyota', model: 'Camry', year: 2020, plate: 'ABC-1234' }
      ],
      insurance: {
        provider: 'State Farm',
        policyNumber: 'POL-123456',
        expires: '2024-12-31'
      }
    };
    setCurrentTenant(tenantData);

    // Maintenance requests with comprehensive data
    const requests = [
      {
        id: 'REQ-001',
        title: 'Leaking Faucet in Kitchen',
        status: 'in_progress',
        priority: 'medium',
        created: '2024-03-20',
        updated: '2024-03-21',
        description: 'Kitchen faucet has a slow drip',
        assignedTo: 'Mike Johnson',
        estimatedCompletion: '2024-03-25',
        diyAttempted: true,
        photos: 2,
        messages: 3
      },
      {
        id: 'REQ-002',
        title: 'AC Not Cooling Properly',
        status: 'pending',
        priority: 'high',
        created: '2024-03-19',
        updated: '2024-03-19',
        description: 'AC unit running but not cooling effectively',
        assignedTo: null,
        estimatedCompletion: null,
        diyAttempted: false,
        photos: 1,
        messages: 1
      },
      {
        id: 'REQ-003',
        title: 'Bathroom Door Lock Issue',
        status: 'completed',
        priority: 'low',
        created: '2024-03-10',
        updated: '2024-03-12',
        description: 'Door lock sticking, hard to turn',
        assignedTo: 'DIY Fixed',
        completedDate: '2024-03-12',
        diyAttempted: true,
        diySuccess: true,
        savedCost: 75,
        photos: 3,
        messages: 5
      },
      {
        id: 'REQ-004',
        title: 'Dishwasher Making Noise',
        status: 'scheduled',
        priority: 'medium',
        created: '2024-03-18',
        updated: '2024-03-20',
        description: 'Loud grinding noise during wash cycle',
        assignedTo: 'Sarah Chen',
        scheduledDate: '2024-03-26',
        diyAttempted: true,
        photos: 2,
        messages: 4
      }
    ];
    setMaintenanceRequests(requests);

    // Payment history with detailed records
    const paymentHistory = [
      {
        id: 'PAY-001',
        date: '2024-03-01',
        amount: 2500,
        type: 'Rent',
        status: 'paid',
        method: 'Auto-pay',
        confirmationNumber: 'CNF-789456'
      },
      {
        id: 'PAY-002',
        date: '2024-02-01',
        amount: 2500,
        type: 'Rent',
        status: 'paid',
        method: 'Online',
        confirmationNumber: 'CNF-789123'
      },
      {
        id: 'PAY-003',
        date: '2024-01-01',
        amount: 2500,
        type: 'Rent',
        status: 'paid',
        method: 'Auto-pay',
        confirmationNumber: 'CNF-788901'
      },
      {
        id: 'PAY-004',
        date: '2023-12-15',
        amount: 150,
        type: 'Utility',
        status: 'paid',
        method: 'Online',
        confirmationNumber: 'CNF-788567'
      },
      {
        id: 'PAY-005',
        date: '2023-12-01',
        amount: 2500,
        type: 'Rent',
        status: 'paid',
        method: 'Auto-pay',
        confirmationNumber: 'CNF-788234'
      }
    ];
    setPayments(paymentHistory);

    // Documents
    const docs = [
      {
        id: 'DOC-001',
        name: 'Lease Agreement',
        type: 'PDF',
        size: '2.4 MB',
        uploaded: '2022-03-01',
        category: 'Legal'
      },
      {
        id: 'DOC-002',
        name: 'Renters Insurance',
        type: 'PDF',
        size: '1.1 MB',
        uploaded: '2024-01-15',
        category: 'Insurance'
      },
      {
        id: 'DOC-003',
        name: 'Move-in Inspection',
        type: 'PDF',
        size: '3.2 MB',
        uploaded: '2022-03-15',
        category: 'Inspection'
      },
      {
        id: 'DOC-004',
        name: 'Parking Permit',
        type: 'PDF',
        size: '0.5 MB',
        uploaded: '2024-01-01',
        category: 'Permits'
      },
      {
        id: 'DOC-005',
        name: 'Pet Registration',
        type: 'PDF',
        size: '0.8 MB',
        uploaded: '2022-04-01',
        category: 'Pet'
      }
    ];
    setDocuments(docs);

    // Announcements
    const news = [
      {
        id: 'ANN-001',
        title: '🎉 Pool Opening This Weekend!',
        date: '2024-03-20',
        priority: 'info',
        message: 'The community pool will open for the season this Saturday!'
      },
      {
        id: 'ANN-002',
        title: '⚠️ Parking Lot Maintenance',
        date: '2024-03-18',
        priority: 'warning',
        message: 'Parking lot B will be closed for resealing on March 28-29'
      },
      {
        id: 'ANN-003',
        title: '✅ New Recycling Program',
        date: '2024-03-15',
        priority: 'success',
        message: 'New recycling bins available in all buildings!'
      },
      {
        id: 'ANN-004',
        title: '📧 Office Hours Update',
        date: '2024-03-12',
        priority: 'info',
        message: 'Office now open until 7 PM on weekdays'
      }
    ];
    setAnnouncements(news);

    setTimeout(() => setLoading(false), 1000);
  };

  const tabContent = {
    dashboard: () => (
      <div>
        {/* Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            {
              title: 'Next Rent Due',
              value: 'April 1, 2024',
              subtitle: `$${currentTenant?.rentAmount || 0}`,
              icon: DollarSign,
              color: 'linear-gradient(135deg, #10b981, #84cc16)'
            },
            {
              title: 'Open Requests',
              value: maintenanceRequests.filter(r => r.status !== 'completed').length,
              subtitle: 'Maintenance items',
              icon: Wrench,
              color: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
            },
            {
              title: 'DIY Points',
              value: currentTenant?.diyPoints || 0,
              subtitle: currentTenant?.diyLevel || 'Bronze',
              icon: Award,
              color: 'linear-gradient(135deg, #8b5cf6, #a855f7)'
            },
            {
              title: 'Lease Expires',
              value: '365 days',
              subtitle: 'March 14, 2025',
              icon: Calendar,
              color: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
            }
          ].map((card, index) => (
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
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: card.color,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <card.icon size={24} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                  {card.value}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '16px', color: '#374151', fontWeight: '600', margin: 0 }}>
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
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
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: CheckCircle, color: '#10b981', text: 'Rent payment received for March', time: '2 days ago' },
              { icon: Wrench, color: '#f59e0b', text: 'Maintenance request updated', time: '3 days ago' },
              { icon: Award, color: '#8b5cf6', text: 'Earned 50 DIY points', time: '5 days ago' },
              { icon: Bell, color: '#3b82f6', text: 'New announcement posted', time: '1 week ago' }
            ].map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `${activity.color}20`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <activity.icon size={20} style={{ color: activity.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#1a1a1a' }}>
                    {activity.text}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    
    maintenance: () => (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            Maintenance Requests
          </h2>
          <button
            style={{
              padding: '12px 24px',
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
            onClick={() => navigate('/new-repair')}
          >
            <Plus size={18} />
            New Request
          </button>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {maintenanceRequests.map(request => (
            <motion.div
              key={request.id}
              whileHover={{ scale: 1.01 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    {request.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    {request.description}
                  </p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  background: request.status === 'completed' ? '#d4f4dd' :
                             request.status === 'in_progress' ? '#fef3c7' :
                             request.status === 'scheduled' ? '#e0e7ff' : '#f3f4f6',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: request.status === 'completed' ? '#22c55e' :
                         request.status === 'in_progress' ? '#f59e0b' :
                         request.status === 'scheduled' ? '#4f46e5' : '#6b7280'
                }}>
                  {request.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Priority</p>
                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: request.priority === 'high' ? '#ef4444' :
                           request.priority === 'medium' ? '#f59e0b' : '#10b981',
                    margin: 0
                  }}>
                    {request.priority.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Created</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>{request.created}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Assigned To</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>
                    {request.assignedTo || 'Unassigned'}
                  </p>
                </div>
                {request.diySuccess && (
                  <div>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>You Saved</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#10b981', margin: 0 }}>
                      ${request.savedCost}
                    </p>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px'
              }}>
                <button style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Eye size={14} />
                  View Details
                </button>
                {request.photos > 0 && (
                  <span style={{
                    padding: '8px 12px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Camera size={14} />
                    {request.photos} Photos
                  </span>
                )}
                {request.messages > 0 && (
                  <span style={{
                    padding: '8px 12px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <MessageSquare size={14} />
                    {request.messages} Messages
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),

    payments: () => (
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Payment History
        </h2>
        
        {/* Payment Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Current Balance', value: '$0', color: '#10b981' },
            { label: 'Last Payment', value: '$2,500', color: '#3b82f6' },
            { label: 'Next Due', value: 'April 1', color: '#f59e0b' },
            { label: 'YTD Paid', value: '$7,500', color: '#8b5cf6' }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0' }}>
                {item.label}
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: item.color, margin: 0 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Table */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  DATE
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  TYPE
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  AMOUNT
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  METHOD
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  CONFIRMATION
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{payment.date}</td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{payment.type}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{payment.method}</td>
                  <td style={{ padding: '16px', fontSize: '13px', fontFamily: 'monospace' }}>
                    {payment.confirmationNumber}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#d4f4dd',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#22c55e'
                    }}>
                      PAID
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    documents: () => (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            Documents
          </h2>
          <button
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Upload size={16} />
            Upload Document
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {documents.map(doc => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={24} style={{ color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                    {doc.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0' }}>
                    {doc.category} • {doc.size}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                    Uploaded {doc.uploaded}
                  </p>
                </div>
                <button style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <Download size={18} style={{ color: '#6b7280' }} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),

    profile: () => (
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          My Profile
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '24px'
        }}>
          {/* Profile Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              {currentTenant?.avatar}
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              {currentTenant?.firstName} {currentTenant?.lastName}
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0' }}>
              Unit {currentTenant?.unit} • {currentTenant?.building}
            </p>
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <p style={{ fontSize: '12px', margin: '0 0 4px 0' }}>DIY Hero Level</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                {currentTenant?.diyLevel}
              </p>
              <p style={{ fontSize: '16px', margin: '8px 0 0 0' }}>
                {currentTenant?.diyPoints} Points
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              Account Information
            </h4>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { label: 'Email', value: currentTenant?.email, icon: Mail },
                { label: 'Phone', value: currentTenant?.phone, icon: Phone },
                { label: 'Move-in Date', value: currentTenant?.moveInDate, icon: Calendar },
                { label: 'Lease Expires', value: currentTenant?.leaseEnd, icon: Clock },
                { label: 'Property', value: currentTenant?.property, icon: Building },
                { label: 'Unit', value: `${currentTenant?.unit} • ${currentTenant?.floor}`, icon: Home }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <item.icon size={18} style={{ color: '#6b7280' }} />
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                Emergency Contact
              </h4>
              <div style={{
                padding: '12px',
                background: '#fef2f2',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0' }}>
                  {currentTenant?.emergencyContact?.name}
                </p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  {currentTenant?.emergencyContact?.relationship} • {currentTenant?.emergencyContact?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'white',
        boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Tenant Info */}
        <div style={{
          padding: '28px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {currentTenant?.avatar}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                {currentTenant?.firstName} {currentTenant?.lastName}
              </h3>
              <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>
                Unit {currentTenant?.unit} • {currentTenant?.property}
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }}>
            <div>
              <p style={{ fontSize: '11px', opacity: 0.8, margin: '0 0 4px 0' }}>DIY Points</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{currentTenant?.diyPoints}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', opacity: 0.8, margin: '0 0 4px 0' }}>Level</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{currentTenant?.diyLevel}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '20px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: '14px 16px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: activeTab === item.id ? 
                  'linear-gradient(135deg, #667eea, #764ba2)' : 
                  'transparent',
                color: activeTab === item.id ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: activeTab === item.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            Tenant Portal
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Notification Badge */}
            <button style={{
              position: 'relative',
              padding: '10px',
              background: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <Bell size={20} style={{ color: '#4b5563' }} />
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%'
              }} />
            </button>

            {/* Settings */}
            <button style={{
              padding: '10px',
              background: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <Settings size={20} style={{ color: '#4b5563' }} />
            </button>
          </div>
        </div>

        {/* Announcements Bar */}
        {announcements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, #fef3c7, #fbbf24)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Info size={20} style={{ color: '#92400e' }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', margin: 0 }}>
                {announcements[0].title}
              </p>
              <p style={{ fontSize: '13px', color: '#92400e', opacity: 0.8, margin: 0 }}>
                {announcements[0].message}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {tabContent[activeTab] && tabContent[activeTab]()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TenantPortal;