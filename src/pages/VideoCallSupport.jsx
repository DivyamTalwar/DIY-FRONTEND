import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor,
  Users, MessageSquare, Settings, Volume2, VolumeX, Camera,
  Share2, Calendar, Clock, Star, Award, CheckCircle, User,
  Headphones, Wifi, WifiOff, Shield, Activity, TrendingUp,
  AlertCircle, HelpCircle, ChevronRight, Play, Pause, MoreVertical,
  Grid, Maximize2, Minimize2, Send, Paperclip, Smile
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const VideoCallSupport = () => {
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, connected, ended
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('experts');

  useEffect(() => {
    // Welcome effect
    setTimeout(() => {
      toast.success('24/7 Video Support Available! 🎥', {
        icon: '📞',
        duration: 3000
      });
    }, 500);

    // Simulate call duration timer
    let timer;
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  // Expert technicians available for video calls
  const experts = [
    {
      id: 1,
      name: 'Mike Johnson',
      specialty: 'Master Plumber',
      rating: 4.9,
      reviews: 2847,
      status: 'online',
      waitTime: 'Immediate',
      languages: ['English', 'Spanish'],
      certifications: 5,
      successRate: '98%',
      avatar: '👨‍🔧',
      expertise: ['Leaks', 'Pipes', 'Drainage', 'Water Heaters']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      specialty: 'Electrical Expert',
      rating: 4.8,
      reviews: 1956,
      status: 'online',
      waitTime: '2 min',
      languages: ['English', 'Mandarin'],
      certifications: 4,
      successRate: '96%',
      avatar: '👩‍🔧',
      expertise: ['Wiring', 'Outlets', 'Lighting', 'Smart Home']
    },
    {
      id: 3,
      name: 'John Davis',
      specialty: 'HVAC Specialist',
      rating: 4.7,
      reviews: 1523,
      status: 'busy',
      waitTime: '5 min',
      languages: ['English'],
      certifications: 6,
      successRate: '94%',
      avatar: '👨‍🔧',
      expertise: ['AC', 'Heating', 'Ventilation', 'Thermostats']
    },
    {
      id: 4,
      name: 'Emily Wilson',
      specialty: 'Appliance Repair',
      rating: 4.9,
      reviews: 2134,
      status: 'online',
      waitTime: 'Immediate',
      languages: ['English', 'French'],
      certifications: 3,
      successRate: '97%',
      avatar: '👩‍🔧',
      expertise: ['Dishwasher', 'Refrigerator', 'Washer', 'Dryer']
    },
    {
      id: 5,
      name: 'AI Assistant',
      specialty: 'Instant AI Support',
      rating: 5.0,
      reviews: 10000,
      status: 'always-online',
      waitTime: '0 seconds',
      languages: ['All Languages'],
      certifications: 10,
      successRate: '99.9%',
      avatar: '🤖',
      expertise: ['Everything', 'Diagnosis', 'Guidance', '24/7 Support']
    }
  ];

  // Recent call history
  const recentCalls = [
    {
      id: 1,
      expert: 'Mike Johnson',
      issue: 'Kitchen Sink Leak',
      date: '2024-03-20',
      duration: '15 min',
      resolved: true,
      savedCost: '$150'
    },
    {
      id: 2,
      expert: 'Sarah Chen',
      issue: 'Outlet Not Working',
      date: '2024-03-18',
      duration: '8 min',
      resolved: true,
      savedCost: '$200'
    },
    {
      id: 3,
      expert: 'AI Assistant',
      issue: 'Dishwasher Diagnosis',
      date: '2024-03-15',
      duration: '3 min',
      resolved: true,
      savedCost: '$75'
    }
  ];

  // Mock chat messages
  const sampleMessages = [
    { id: 1, sender: 'expert', text: 'Hello! I can see your video clearly. Can you show me the issue?', time: '10:23 AM' },
    { id: 2, sender: 'user', text: 'Yes, let me point the camera at the leaking pipe', time: '10:23 AM' },
    { id: 3, sender: 'expert', text: 'Perfect! I can see the problem. This is a simple fix. Let me guide you through it.', time: '10:24 AM' },
    { id: 4, sender: 'expert', text: 'First, turn off the water supply valve under the sink', time: '10:24 AM' },
    { id: 5, sender: 'user', text: 'Done! Water is off', time: '10:25 AM' },
    { id: 6, sender: 'expert', text: 'Great! Now you\'ll need to tighten the compression fitting. Do you have an adjustable wrench?', time: '10:25 AM' }
  ];

  const startCall = (expert) => {
    setSelectedExpert(expert);
    setCallStatus('connecting');
    setMessages([]);
    
    setTimeout(() => {
      setCallStatus('connected');
      setMessages(sampleMessages);
      toast.success(`Connected with ${expert.name}!`, {
        icon: '📞',
        duration: 3000
      });
      
      // Celebration for successful connection
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }, 2000);
  };

  const endCall = () => {
    setCallStatus('ended');
    
    setTimeout(() => {
      toast.success('Call ended. Issue resolved! You saved $150!', {
        icon: '✅',
        duration: 4000
      });
      setCallStatus('idle');
      setCallDuration(0);
      setSelectedExpert(null);
    }, 1000);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
      
      // Simulate expert response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: 'expert',
          text: 'I understand. Let me help you with that.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px'
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              🎥 24/7 Video Call Support
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Connect instantly with expert technicians • Get visual guidance • Fix issues in real-time
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {[
          { label: 'Experts Online', value: '15', icon: Users, color: '#10b981' },
          { label: 'Avg Wait Time', value: '30 sec', icon: Clock, color: '#f59e0b' },
          { label: 'Issues Resolved', value: '4,287', icon: CheckCircle, color: '#8b5cf6' },
          { label: 'Avg Savings', value: '$185', icon: TrendingUp, color: '#3b82f6' },
          { label: 'Success Rate', value: '98%', icon: Award, color: '#ef4444' },
          { label: 'Languages', value: '12+', icon: MessageSquare, color: '#06b6d4' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: `${stat.color}20`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 2px 0' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: callStatus === 'connected' ? '2fr 1fr' : '1fr', gap: '24px' }}>
        {/* Video Call Area or Expert List */}
        <motion.div
          layout
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            minHeight: '500px'
          }}
        >
          {callStatus === 'connected' ? (
            // Active Video Call
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #10b981, #84cc16)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {selectedExpert?.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                      {selectedExpert?.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                      {selectedExpert?.specialty} • {formatDuration(callDuration)}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    background: '#d4f4dd',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }} />
                    Connected
                  </span>
                </div>
              </div>

              {/* Video Area */}
              <div style={{
                background: '#1a1a1a',
                borderRadius: '16px',
                height: '400px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>{selectedExpert?.avatar}</div>
                  <p style={{ fontSize: '18px', marginBottom: '8px' }}>Expert Video Feed</p>
                  <p style={{ fontSize: '14px', opacity: 0.7 }}>High Quality • Low Latency</p>
                </div>
                
                {/* Small self video */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: '150px',
                  height: '100px',
                  background: '#333',
                  borderRadius: '12px',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={32} style={{ color: '#666' }} />
                </div>
              </div>

              {/* Call Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px'
              }}>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    padding: '12px',
                    background: isMuted ? '#ef4444' : '#f3f4f6',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isMuted ? <MicOff size={20} style={{ color: 'white' }} /> : <Mic size={20} />}
                </button>
                
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  style={{
                    padding: '12px',
                    background: !isVideoOn ? '#ef4444' : '#f3f4f6',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isVideoOn ? <Video size={20} /> : <VideoOff size={20} style={{ color: 'white' }} />}
                </button>

                <button
                  onClick={endCall}
                  style={{
                    padding: '12px 24px',
                    background: '#ef4444',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  <PhoneOff size={20} />
                  End Call
                </button>

                <button
                  style={{
                    padding: '12px',
                    background: '#f3f4f6',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Share2 size={20} />
                </button>

                <button
                  style={{
                    padding: '12px',
                    background: '#f3f4f6',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Settings size={20} />
                </button>
              </div>
            </div>
          ) : (
            // Expert Selection
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                Select an Expert
              </h2>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {experts.map(expert => (
                  <motion.div
                    key={expert.id}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px',
                      background: '#f9fafb',
                      borderRadius: '16px',
                      border: expert.status === 'always-online' ? '2px solid #10b981' : '1px solid #e5e7eb',
                      cursor: 'pointer'
                    }}
                    onClick={() => expert.status !== 'busy' && startCall(expert)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: expert.status === 'always-online' ? 
                          'linear-gradient(135deg, #10b981, #84cc16)' :
                          'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        position: 'relative'
                      }}>
                        {expert.avatar}
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          width: '16px',
                          height: '16px',
                          background: expert.status === 'online' || expert.status === 'always-online' ? '#10b981' :
                                     expert.status === 'busy' ? '#f59e0b' : '#6b7280',
                          borderRadius: '50%',
                          border: '2px solid white'
                        }} />
                      </div>
                      
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                          {expert.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>
                          {expert.specialty}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={14} style={{ color: '#fbbf24' }} />
                            <span style={{ fontSize: '13px', fontWeight: '600' }}>{expert.rating}</span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>({expert.reviews})</span>
                          </span>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            {expert.certifications} Certs
                          </span>
                          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
                            {expert.successRate} Success
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                          {expert.expertise.map((skill, idx) => (
                            <span key={idx} style={{
                              padding: '2px 8px',
                              background: '#e0e7ff',
                              borderRadius: '12px',
                              fontSize: '11px',
                              color: '#4f46e5'
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: expert.status === 'online' || expert.status === 'always-online' ? '#10b981' :
                               expert.status === 'busy' ? '#f59e0b' : '#6b7280',
                        margin: '0 0 4px 0'
                      }}>
                        {expert.waitTime}
                      </p>
                      <button
                        disabled={expert.status === 'busy'}
                        style={{
                          padding: '8px 16px',
                          background: expert.status === 'busy' ? '#e5e7eb' :
                                     'linear-gradient(135deg, #667eea, #764ba2)',
                          color: expert.status === 'busy' ? '#6b7280' : 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: expert.status === 'busy' ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Video size={16} />
                        {expert.status === 'busy' ? 'Busy' : 'Call Now'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Chat/History Panel */}
        {callStatus === 'connected' ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              height: '600px'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Chat & Notes
            </h3>
            
            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <div style={{
                    padding: '10px 14px',
                    background: msg.sender === 'user' ? 
                      'linear-gradient(135deg, #667eea, #764ba2)' : 
                      '#f3f4f6',
                    color: msg.sender === 'user' ? 'white' : '#1a1a1a',
                    borderRadius: '12px',
                    marginBottom: '4px'
                  }}>
                    {msg.text}
                  </div>
                  <p style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    margin: 0,
                    textAlign: msg.sender === 'user' ? 'right' : 'left'
                  }}>
                    {msg.time}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div style={{
              display: 'flex',
              gap: '8px',
              paddingTop: '16px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  padding: '10px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          // Recent Calls History
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Recent Support Calls
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentCalls.map(call => (
                <div key={call.id} style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                      {call.issue}
                    </h4>
                    <span style={{
                      padding: '4px 8px',
                      background: '#d4f4dd',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#22c55e'
                    }}>
                      Resolved
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0' }}>
                    with {call.expert} • {call.date}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      Duration: {call.duration}
                    </span>
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
                      Saved: {call.savedCost}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'linear-gradient(135deg, #fef3c7, #fbbf24)',
              borderRadius: '12px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: '#92400e' }}>
                💡 Pro Tips for Video Calls
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#92400e' }}>
                <li>Ensure good lighting on the problem area</li>
                <li>Have tools ready before calling</li>
                <li>Test your camera and microphone first</li>
                <li>Take photos during the call for reference</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default VideoCallSupport;