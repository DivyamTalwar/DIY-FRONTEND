import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Home, CreditCard, FileText, MessageSquare, Calendar,
  Wrench, Bell, Settings, History, Download, Upload, Phone,
  Mail, Clock, CheckCircle, AlertCircle, DollarSign, Key,
  Package, Car, Shield, Heart, Star, ChevronRight, Plus,
  Camera, Paperclip, Send, Filter, Search, LogOut, Edit,
  Trash2, Eye, X, Check, AlertTriangle, Info, HelpCircle
} from 'lucide-react';
import enhancedAPI from '../services/advancedMockData';
import toast from 'react-hot-toast';

function TenantPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTenant, setCurrentTenant] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTenantData();
  }, []);

  const loadTenantData = async () => {
    setLoading(true);
    try {
      // Simulate loading tenant data
      const tenantData = {
        id: 'tenant_001',
        firstName: 'John',
        lastName: 'Smith',
        unit: '12B',
        property: 'Sunset Apartments',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        moveInDate: '2022-03-15',
        leaseEnd: '2025-03-14',
        rentAmount: 2500,
        balance: 0,
        nextPaymentDue: '2024-03-01',
        avatar: null,
        emergencyContact: {
          name: 'Jane Smith',
          phone: '(555) 987-6543',
          relationship: 'Spouse'
        },
        vehicles: [
          { make: 'Toyota', model: 'Camry', year: 2020, plate: 'ABC123', spot: 'B-12' }
        ],
        pets: [
          { type: 'Dog', name: 'Max', breed: 'Golden Retriever', registered: true }
        ],
        preferences: {
          emailNotifications: true,
          smsNotifications: true,
          maintenanceReminders: true,
          communityUpdates: true
        }
      };

      const requests = [
        {
          id: 'req_001',
          title: 'Leaky Faucet in Kitchen',
          status: 'In Progress',
          priority: 'Medium',
          created: '2024-02-20',
          scheduled: '2024-02-28',
          description: 'Kitchen faucet is dripping constantly',
          technician: 'Mike Johnson',
          updates: [
            { date: '2024-02-20', message: 'Request received and logged' },
            { date: '2024-02-21', message: 'Technician assigned' },
            { date: '2024-02-22', message: 'Scheduled for repair' }
          ]
        },
        {
          id: 'req_002',
          title: 'AC Not Cooling',
          status: 'Completed',
          priority: 'High',
          created: '2024-02-15',
          completed: '2024-02-16',
          description: 'AC unit not producing cold air',
          technician: 'Sarah Williams',
          rating: 5,
          feedback: 'Quick and professional service!'
        }
      ];

      const paymentHistory = [
        { id: 'pay_001', date: '2024-02-01', amount: 2500, type: 'Rent', status: 'Paid', method: 'Auto-pay' },
        { id: 'pay_002', date: '2024-01-01', amount: 2500, type: 'Rent', status: 'Paid', method: 'Auto-pay' },
        { id: 'pay_003', date: '2023-12-15', amount: 150, type: 'Utility', status: 'Paid', method: 'Credit Card' },
        { id: 'pay_004', date: '2023-12-01', amount: 2500, type: 'Rent', status: 'Paid', method: 'Auto-pay' }
      ];

      const docs = [
        { id: 'doc_001', name: 'Lease Agreement', type: 'Contract', date: '2022-03-15', size: '2.4 MB' },
        { id: 'doc_002', name: 'Move-in Checklist', type: 'Checklist', date: '2022-03-15', size: '1.1 MB' },
        { id: 'doc_003', name: 'Parking Permit', type: 'Permit', date: '2024-01-01', size: '0.5 MB' },
        { id: 'doc_004', name: 'Pet Registration', type: 'Registration', date: '2022-04-01', size: '0.8 MB' }
      ];

      const news = [
        {
          id: 'ann_001',
          title: 'Pool Maintenance Schedule',
          date: '2024-02-25',
          priority: 'info',
          message: 'The pool will be closed for maintenance on March 1-2. We apologize for any inconvenience.'
        },
        {
          id: 'ann_002',
          title: 'Community BBQ Event',
          date: '2024-02-20',
          priority: 'success',
          message: 'Join us for a community BBQ on March 10th at 5 PM in the courtyard. Food and drinks provided!'
        },
        {
          id: 'ann_003',
          title: 'Parking Lot Resurfacing',
          date: '2024-02-18',
          priority: 'warning',
          message: 'Section A of the parking lot will be resurfaced March 5-7. Please use alternative parking.'
        }
      ];

      setCurrentTenant(tenantData);
      setMaintenanceRequests(requests);
      setPayments(paymentHistory);
      setDocuments(docs);
      setAnnouncements(news);
    } catch (error) {
      toast.error('Failed to load tenant data');
    } finally {
      setLoading(false);
    }
  };

  const handleNewMaintenanceRequest = (e) => {
    e.preventDefault();
    toast.success('Maintenance request submitted successfully!');
    setShowNewRequest(false);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    toast.success('Payment processed successfully!');
    setShowPaymentModal(false);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'community', label: 'Community', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tenant Portal
              </h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Unit {currentTenant?.unit}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {currentTenant?.firstName} {currentTenant?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{currentTenant?.property}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {currentTenant?.firstName?.[0]}{currentTenant?.lastName?.[0]}
                </div>
              </div>
              
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 flex-shrink-0"
          >
            <nav className="bg-white rounded-xl shadow-lg p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowNewRequest(true)}
                  className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all text-sm font-medium"
                >
                  New Maintenance Request
                </button>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm font-medium"
                >
                  Make a Payment
                </button>
                <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-medium">
                  Contact Management
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {currentTenant?.firstName}!
                  </h2>
                  <p className="opacity-90">Here's what's happening with your residence today.</p>
                  
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <p className="text-sm opacity-90">Next Payment</p>
                      <p className="text-xl font-bold">{currentTenant?.nextPaymentDue}</p>
                      <p className="text-lg">${currentTenant?.rentAmount}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <p className="text-sm opacity-90">Open Requests</p>
                      <p className="text-3xl font-bold">
                        {maintenanceRequests.filter(r => r.status !== 'Completed').length}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <p className="text-sm opacity-90">Account Balance</p>
                      <p className="text-3xl font-bold">
                        ${currentTenant?.balance || '0'}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <p className="text-sm opacity-90">Lease Ends</p>
                      <p className="text-xl font-bold">{currentTenant?.leaseEnd}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Wrench className="text-purple-600" size={20} />
                      Recent Maintenance
                    </h3>
                    <div className="space-y-3">
                      {maintenanceRequests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{request.title}</p>
                            <p className="text-sm text-gray-500">{request.created}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Bell className="text-purple-600" size={20} />
                      Announcements
                    </h3>
                    <div className="space-y-3">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            {announcement.priority === 'warning' && <AlertTriangle className="text-yellow-500 mt-1" size={16} />}
                            {announcement.priority === 'info' && <Info className="text-blue-500 mt-1" size={16} />}
                            {announcement.priority === 'success' && <CheckCircle className="text-green-500 mt-1" size={16} />}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{announcement.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                              <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Property Information</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Unit Details</p>
                      <p className="font-medium">{currentTenant?.unit} - {currentTenant?.property}</p>
                      <p className="text-sm text-gray-600 mt-1">2 Bed, 2 Bath • 1,200 sq ft</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Parking</p>
                      {currentTenant?.vehicles?.map((vehicle, index) => (
                        <div key={index} className="mt-1">
                          <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                          <p className="text-sm text-gray-600">Spot {vehicle.spot} • {vehicle.plate}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <p className="font-medium">{currentTenant?.emergencyContact?.name}</p>
                      <p className="text-sm text-gray-600">{currentTenant?.emergencyContact?.phone}</p>
                      <p className="text-sm text-gray-600">{currentTenant?.emergencyContact?.relationship}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Maintenance Requests</h2>
                  <button
                    onClick={() => setShowNewRequest(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Plus size={20} />
                    New Request
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-4 border-b flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search requests..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      />
                    </div>
                    <select className="px-4 py-2 border rounded-lg">
                      <option>All Status</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                    <select className="px-4 py-2 border rounded-lg">
                      <option>All Priority</option>
                      <option>Emergency</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div className="divide-y">
                    {maintenanceRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                request.priority === 'High' ? 'bg-red-100 text-red-700' :
                                request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {request.priority}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                request.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {request.status}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{request.description}</p>
                            
                            <div className="flex gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={16} />
                                Created: {request.created}
                              </span>
                              {request.scheduled && (
                                <span className="flex items-center gap-1">
                                  <Clock size={16} />
                                  Scheduled: {request.scheduled}
                                </span>
                              )}
                              {request.technician && (
                                <span className="flex items-center gap-1">
                                  <User size={16} />
                                  {request.technician}
                                </span>
                              )}
                            </div>

                            {request.updates && (
                              <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                <p className="text-sm font-medium text-gray-700 mb-2">Updates:</p>
                                {request.updates.map((update, index) => (
                                  <div key={index} className="mb-2">
                                    <p className="text-sm text-gray-600">{update.message}</p>
                                    <p className="text-xs text-gray-400">{update.date}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {request.status === 'Completed' && request.rating && (
                              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={16}
                                        className={i < request.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">Your rating</span>
                                </div>
                                {request.feedback && (
                                  <p className="text-sm text-gray-600 italic">"{request.feedback}"</p>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                              <Eye size={18} />
                            </button>
                            {request.status !== 'Completed' && (
                              <button className="p-2 text-gray-600 hover:text-gray-900">
                                <Edit size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Center</h2>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <CreditCard size={20} />
                    Make Payment
                  </button>
                </div>

                {/* Payment Summary Cards */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="text-green-600" size={24} />
                      <span className="text-sm text-gray-500">Due Now</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">${currentTenant?.balance || '0'}</p>
                    <p className="text-sm text-gray-600 mt-2">Current Balance</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="text-blue-600" size={24} />
                      <span className="text-sm text-gray-500">Next Payment</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">${currentTenant?.rentAmount}</p>
                    <p className="text-sm text-gray-600 mt-2">Due {currentTenant?.nextPaymentDue}</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle className="text-purple-600" size={24} />
                      <span className="text-sm text-gray-500">Auto-Pay</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">Enabled</p>
                    <p className="text-sm text-gray-600 mt-2">Next: {currentTenant?.nextPaymentDue}</p>
                    <button className="text-sm text-purple-600 hover:text-purple-700 mt-2">Manage</button>
                  </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Payment History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {payments.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.method}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button className="text-purple-600 hover:text-purple-700 mr-3">View</button>
                              <button className="text-purple-600 hover:text-purple-700">Download</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                    <Upload size={20} />
                    Upload Document
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <motion.div
                      key={doc.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <FileText className="text-purple-600" size={40} />
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                          <Download size={18} />
                        </button>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <span className="text-xs text-gray-400">{doc.size}</span>
                        <span className="text-xs text-gray-400">{doc.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>

      {/* New Maintenance Request Modal */}
      <AnimatePresence>
        {showNewRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewRequest(false)}
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
                  <h2 className="text-2xl font-bold text-gray-900">New Maintenance Request</h2>
                  <button
                    onClick={() => setShowNewRequest(false)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleNewMaintenanceRequest} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Appliance</option>
                    <option>Structural</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="priority" value="emergency" className="mr-2" />
                      <span className="text-red-600">Emergency</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="priority" value="high" className="mr-2" />
                      <span className="text-orange-600">High</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="priority" value="medium" defaultChecked className="mr-2" />
                      <span className="text-yellow-600">Medium</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="priority" value="low" className="mr-2" />
                      <span className="text-green-600">Low</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    required
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Provide detailed information about the issue..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., Kitchen, Master Bedroom, Bathroom"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="mx-auto text-gray-400 mb-2" size={40} />
                    <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                    <input type="file" className="hidden" accept="image/*" multiple />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Morning', 'Afternoon', 'Evening'].map((time) => (
                      <label key={time} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewRequest(false)}
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

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Make a Payment</h2>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Rent Payment</option>
                    <option>Utility Payment</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      required
                      defaultValue={currentTenant?.rentAmount}
                      className="w-full pl-8 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="method" defaultChecked className="mr-3" />
                      <CreditCard className="mr-2" size={20} />
                      <span>Credit Card ending in 4242</span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="method" className="mr-3" />
                      <DollarSign className="mr-2" size={20} />
                      <span>Bank Account ending in 1234</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Process Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
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

export default TenantPortal;