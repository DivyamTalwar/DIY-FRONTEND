import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Paperclip,
  Image,
  Mic,
  StopCircle,
  ThumbsUp,
  ThumbsDown,
  Phone
} from 'lucide-react';

function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm your DIY Assistant. How can I help you fix something today?",
      timestamp: new Date().toISOString(),
      options: [
        'My appliance is broken',
        'I need help with current repair',
        'Schedule a technician',
        'General question'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = {
      id: Date.now(),
      type: 'bot',
      timestamp: new Date().toISOString()
    };

    if (input.includes('washing machine') || input.includes('washer')) {
      response.message = "I can help with your washing machine! What specific issue are you experiencing?";
      response.options = [
        'Not draining',
        'Making noise',
        'Won\'t start',
        'Leaking water'
      ];
      response.quickFix = {
        title: 'Common Washing Machine Fixes',
        steps: [
          'Check if drain filter is clogged',
          'Ensure door is properly closed',
          'Verify power connection',
          'Check water supply valves'
        ]
      };
    } else if (input.includes('emergency') || input.includes('urgent')) {
      response.message = "I understand this is urgent! Let me help you immediately.";
      response.urgent = true;
      response.actions = [
        { label: 'Start Emergency Fix', action: 'emergency' },
        { label: 'Call Technician Now', action: 'technician' },
        { label: 'Video Call Support', action: 'video' }
      ];
    } else if (input.includes('technician') || input.includes('professional')) {
      response.message = "I can help you schedule a technician. Our next available slot is in 2 hours.";
      response.booking = {
        available: true,
        nextSlot: '2:00 PM - 4:00 PM',
        cost: '$89',
        technician: 'Mike Johnson (4.9★)'
      };
      response.actions = [
        { label: 'Book This Slot', action: 'book' },
        { label: 'See Other Times', action: 'schedule' }
      ];
    } else if (input.includes('help') || input.includes('guide')) {
      response.message = "I'll guide you step-by-step through the repair. First, can you tell me what appliance you're working with?";
      response.image = true;
      response.hint = "You can also send a photo of the problem";
    } else {
      response.message = "I'm here to help! Could you provide more details about your issue? You can also share a photo if that helps.";
      response.suggestions = [
        'Describe the problem',
        'Share appliance model',
        'Upload a photo',
        'Start troubleshooting'
      ];
    }

    return response;
  };

  const handleOptionClick = (option) => {
    setInputMessage(option);
    handleSend();
  };

  const handleActionClick = (action) => {
    switch(action) {
      case 'emergency':
        window.location.href = '/quick-fix';
        break;
      case 'technician':
        window.location.href = '/schedule-technician';
        break;
      case 'video':
        alert('Starting video call...');
        break;
      case 'book':
        alert('Booking confirmed! Technician will arrive at 2:00 PM');
        break;
      case 'schedule':
        window.location.href = '/schedule-technician';
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageMessage = {
        id: Date.now(),
        type: 'user',
        message: 'Uploaded image',
        image: URL.createObjectURL(file),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, imageMessage]);
      
      setIsTyping(true);
      setTimeout(() => {
        const response = {
          id: Date.now(),
          type: 'bot',
          message: "I can see the issue! It looks like a clogged drain filter. This is a common problem that you can fix in about 10 minutes.",
          timestamp: new Date().toISOString(),
          diagnosis: {
            issue: 'Clogged drain filter',
            confidence: 92,
            time: '10-15 minutes',
            difficulty: 'Easy'
          },
          actions: [
            { label: 'Start Guided Repair', action: 'repair' },
            { label: 'Watch Video Guide', action: 'video' }
          ]
        };
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate voice transcription
      setTimeout(() => {
        setInputMessage("My dishwasher is showing error E24 and won't start");
      }, 500);
    } else {
      setIsRecording(true);
    }
  };

  const handleFeedback = (messageId, feedback) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback } 
          : msg
      )
    );
    
    if (feedback === 'positive') {
      const thankYou = {
        id: Date.now(),
        type: 'bot',
        message: "Great! I'm glad I could help. Is there anything else you need?",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, thankYou]);
    } else {
      const apology = {
        id: Date.now(),
        type: 'bot',
        message: "I apologize that wasn't helpful. Would you like to speak with a human expert?",
        timestamp: new Date().toISOString(),
        actions: [
          { label: 'Call Support', action: 'call' },
          { label: 'Schedule Technician', action: 'technician' }
        ]
      };
      setMessages(prev => [...prev, apology]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
          cursor: 'pointer',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 998
        }}
      >
        <MessageCircle size={28} color="white" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#10b981',
            border: '2px solid white'
          }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '400px',
              height: '600px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={24} color="#667eea" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>DIY Assistant</h3>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                    Always here to help • Avg response: 2s
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} color="white" />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              background: '#f9fafb'
            }}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '75%',
                    display: 'flex',
                    gap: '8px',
                    flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: msg.type === 'user' ? '#667eea' : '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {msg.type === 'user' ? 
                        <User size={18} color="white" /> : 
                        <Bot size={18} color="#667eea" />
                      }
                    </div>
                    <div>
                      <div style={{
                        padding: '12px 16px',
                        background: msg.type === 'user' ? '#667eea' : 'white',
                        color: msg.type === 'user' ? 'white' : '#1a1a1a',
                        borderRadius: '12px',
                        borderTopLeftRadius: msg.type === 'bot' ? '0' : '12px',
                        borderTopRightRadius: msg.type === 'user' ? '0' : '12px'
                      }}>
                        {msg.message}
                        {msg.image && (
                          <img 
                            src={msg.image} 
                            alt="Uploaded" 
                            style={{
                              width: '100%',
                              borderRadius: '8px',
                              marginTop: '8px'
                            }}
                          />
                        )}
                      </div>

                      {msg.options && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginTop: '8px'
                        }}>
                          {msg.options.map(option => (
                            <button
                              key={option}
                              onClick={() => handleOptionClick(option)}
                              style={{
                                padding: '6px 12px',
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '13px',
                                cursor: 'pointer'
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.quickFix && (
                        <div style={{
                          background: '#f0f9ff',
                          padding: '12px',
                          borderRadius: '8px',
                          marginTop: '8px'
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0369a1' }}>
                            {msg.quickFix.title}
                          </h4>
                          {msg.quickFix.steps.map((step, i) => (
                            <div key={i} style={{ fontSize: '12px', marginBottom: '4px' }}>
                              {i + 1}. {step}
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.diagnosis && (
                        <div style={{
                          background: '#f0fdf4',
                          padding: '12px',
                          borderRadius: '8px',
                          marginTop: '8px'
                        }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                            {msg.diagnosis.issue}
                          </div>
                          <div style={{ fontSize: '12px', color: '#16a34a' }}>
                            {msg.diagnosis.confidence}% confidence • {msg.diagnosis.time} • {msg.diagnosis.difficulty}
                          </div>
                        </div>
                      )}

                      {msg.booking && (
                        <div style={{
                          background: '#fef3c7',
                          padding: '12px',
                          borderRadius: '8px',
                          marginTop: '8px'
                        }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                            Next Available Slot
                          </div>
                          <div style={{ fontSize: '13px' }}>
                            {msg.booking.nextSlot} • {msg.booking.cost}
                          </div>
                          <div style={{ fontSize: '12px', color: '#92400e', marginTop: '4px' }}>
                            {msg.booking.technician}
                          </div>
                        </div>
                      )}

                      {msg.actions && (
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          marginTop: '8px'
                        }}>
                          {msg.actions.map(action => (
                            <button
                              key={action.label}
                              onClick={() => handleActionClick(action.action)}
                              style={{
                                padding: '8px 16px',
                                background: action.action === 'emergency' ? '#ef4444' : '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.type === 'bot' && !msg.feedback && index > 0 && (
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          marginTop: '8px'
                        }}>
                          <button
                            onClick={() => handleFeedback(msg.id, 'positive')}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                          >
                            <ThumbsUp size={16} color="#6b7280" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'negative')}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                          >
                            <ThumbsDown size={16} color="#6b7280" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bot size={18} color="#667eea" />
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    background: 'white',
                    borderRadius: '12px',
                    borderTopLeftRadius: '0'
                  }}>
                    <motion.div style={{ display: 'flex', gap: '4px' }}>
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#6b7280'
                        }}
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#6b7280'
                        }}
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#6b7280'
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid #e5e7eb',
              background: 'white'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '8px',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <Image size={20} color="#6b7280" />
                </button>
                <button
                  onClick={toggleRecording}
                  style={{
                    padding: '8px',
                    background: isRecording ? '#ef4444' : '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {isRecording ? 
                    <StopCircle size={20} color="white" /> : 
                    <Mic size={20} color="#6b7280" />
                  }
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputMessage.trim() && !isRecording}
                  style={{
                    padding: '10px',
                    background: inputMessage.trim() ? 
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                      '#e5e7eb',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: inputMessage.trim() ? 'pointer' : 'default'
                  }}
                >
                  <Send size={20} color="white" />
                </motion.button>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '8px',
                fontSize: '11px',
                color: '#9ca3af'
              }}>
                <Phone size={12} style={{ marginRight: '4px' }} />
                Need immediate help? Call 1-800-FIXNOW
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatSupport;