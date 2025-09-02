import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Star, DollarSign, Award, 
  Phone, Mail, CheckCircle, AlertCircle, TrendingUp,
  User, Briefcase, Shield, Zap, Camera, Wrench
} from 'lucide-react';
import confetti from 'canvas-confetti';
import mockApi from '../services/mockApi';
import toast from 'react-hot-toast';
import './TechnicianSchedule.css';

const TechnicianSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [urgencyLevel, setUrgencyLevel] = useState('standard');
  const [issueType, setIssueType] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [selectedView, setSelectedView] = useState('calendar');

  useEffect(() => {
    loadTechnicians();
    loadTimeSlots();
    startLiveUpdates();
  }, [selectedDate]);

  const loadTechnicians = async () => {
    const data = await mockApi.getTechnicians();
    setTechnicians(data);
  };

  const loadTimeSlots = async () => {
    const slots = generateTimeSlots();
    setTimeSlots(slots);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = urgencyLevel === 'emergency' ? 0 : 8;
    const endHour = urgencyLevel === 'emergency' ? 24 : 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const available = Math.random() > 0.3;
        const surge = hour >= 16 || hour <= 8;
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          available,
          surge,
          price: surge ? 149 : 99
        });
      }
    }
    return slots;
  };

  const startLiveUpdates = () => {
    const interval = setInterval(() => {
      const updates = [
        '🔧 Mike completed repair in Downtown - 5★ rating!',
        '⚡ Sarah heading to emergency call in Westside',
        '✅ John available for immediate booking',
        '🏆 Team achieved 98% customer satisfaction today',
        '📍 2 technicians available in your area'
      ];
      setLiveUpdates(prev => [updates[Math.floor(Math.random() * updates.length)], ...prev].slice(0, 3));
    }, 5000);
    return () => clearInterval(interval);
  };

  const handleBooking = async () => {
    if (!selectedTechnician || !selectedTime || !address) {
      toast.error('Please complete all required fields');
      return;
    }

    toast.loading('Confirming your booking...', { duration: 2000 });
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowConfirmation(true);
      toast.success('Booking confirmed! Technician on the way!');
    }, 2000);
  };

  const urgencyOptions = [
    { id: 'emergency', name: 'Emergency', time: '< 2 hours', price: '+$50', color: '#ef4444' },
    { id: 'today', name: 'Today', time: '2-4 hours', price: '+$30', color: '#f59e0b' },
    { id: 'standard', name: 'Standard', time: '24-48 hours', price: 'Base', color: '#10b981' }
  ];

  const issueTypes = [
    { id: 'plumbing', name: 'Plumbing', icon: '🚿', time: '45-90 min' },
    { id: 'electrical', name: 'Electrical', icon: '⚡', time: '30-60 min' },
    { id: 'appliance', name: 'Appliance', icon: '🔧', time: '60-120 min' },
    { id: 'hvac', name: 'HVAC', icon: '❄️', time: '90-180 min' },
    { id: 'general', name: 'General', icon: '🏠', time: '30-90 min' }
  ];

  const topTechnicians = technicians.slice(0, 6).map((tech, i) => ({
    ...tech,
    name: ['Mike Johnson', 'Sarah Chen', 'John Davis', 'Emily Wilson', 'Robert Lee', 'Lisa Brown'][i],
    rating: 4.5 + Math.random() * 0.5,
    jobs: Math.floor(500 + Math.random() * 2000),
    specialty: ['Plumbing Expert', 'Electrical Pro', 'HVAC Master', 'Appliance Guru', 'General Expert', 'Emergency Specialist'][i],
    available: Math.random() > 0.3,
    responseTime: Math.floor(15 + Math.random() * 45),
    price: Math.floor(89 + Math.random() * 60),
    badges: Math.floor(Math.random() * 5) + 1
  }));

  return (
    <div className="technician-schedule-container">
      <motion.div 
        className="schedule-background"
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="schedule-content">
        <motion.div 
          className="schedule-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <h1>
              <Briefcase className="header-icon" />
              Professional Technician Booking
            </h1>
            <p>Get expert help in minutes, not days</p>
          </div>
          
          <div className="live-updates">
            <AnimatePresence>
              {liveUpdates.map((update, i) => (
                <motion.div
                  key={`${update}-${i}`}
                  className="update-item"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <span className="update-dot" />
                  {update}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="booking-steps">
          {[1, 2, 3, 4].map(step => (
            <div 
              key={step}
              className={`step ${bookingStep >= step ? 'active' : ''} ${bookingStep === step ? 'current' : ''}`}
              onClick={() => setBookingStep(step)}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && 'Select Issue'}
                {step === 2 && 'Choose Time'}
                {step === 3 && 'Pick Technician'}
                {step === 4 && 'Confirm Booking'}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {bookingStep === 1 && (
            <motion.div
              key="step1"
              className="booking-step-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>What needs fixing?</h2>
              
              <div className="urgency-selector">
                <h3>How urgent is this?</h3>
                <div className="urgency-options">
                  {urgencyOptions.map(option => (
                    <motion.div
                      key={option.id}
                      className={`urgency-card ${urgencyLevel === option.id ? 'selected' : ''}`}
                      onClick={() => setUrgencyLevel(option.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ borderColor: urgencyLevel === option.id ? option.color : 'transparent' }}
                    >
                      <div className="urgency-header" style={{ color: option.color }}>
                        <AlertCircle />
                        <span>{option.name}</span>
                      </div>
                      <div className="urgency-time">{option.time}</div>
                      <div className="urgency-price">{option.price}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="issue-types">
                <h3>Select issue type</h3>
                <div className="issue-grid">
                  {issueTypes.map(issue => (
                    <motion.div
                      key={issue.id}
                      className={`issue-card ${issueType === issue.id ? 'selected' : ''}`}
                      onClick={() => setIssueType(issue.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="issue-icon">{issue.icon}</div>
                      <div className="issue-name">{issue.name}</div>
                      <div className="issue-time">{issue.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                className="continue-button"
                onClick={() => setBookingStep(2)}
                disabled={!issueType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Schedule
              </motion.button>
            </motion.div>
          )}

          {bookingStep === 2 && (
            <motion.div
              key="step2"
              className="booking-step-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>When do you need help?</h2>
              
              <div className="calendar-container">
                <div className="calendar-header">
                  <h3>{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                  <div className="view-toggle">
                    <button 
                      className={selectedView === 'calendar' ? 'active' : ''}
                      onClick={() => setSelectedView('calendar')}
                    >
                      <Calendar size={16} /> Calendar
                    </button>
                    <button 
                      className={selectedView === 'list' ? 'active' : ''}
                      onClick={() => setSelectedView('list')}
                    >
                      <Clock size={16} /> List
                    </button>
                  </div>
                </div>

                {selectedView === 'calendar' && (
                  <div className="calendar-grid">
                    {[...Array(30)].map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const isToday = i === 0;
                      const isSelected = date.toDateString() === selectedDate.toDateString();
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      
                      return (
                        <motion.div
                          key={i}
                          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`}
                          onClick={() => setSelectedDate(date)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div className="day-number">{date.getDate()}</div>
                          <div className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          {isToday && <div className="today-badge">Today</div>}
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                <div className="time-slots">
                  <h3>Available time slots</h3>
                  <div className="slots-grid">
                    {timeSlots.filter(slot => slot.available).slice(0, 12).map((slot, i) => (
                      <motion.div
                        key={i}
                        className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${slot.surge ? 'surge' : ''}`}
                        onClick={() => setSelectedTime(slot.time)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Clock size={16} />
                        <span>{slot.time}</span>
                        {slot.surge && <Zap className="surge-icon" size={14} />}
                        <div className="slot-price">${slot.price}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="step-actions">
                <button className="back-button" onClick={() => setBookingStep(1)}>Back</button>
                <motion.button
                  className="continue-button"
                  onClick={() => setBookingStep(3)}
                  disabled={!selectedTime}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Technician
                </motion.button>
              </div>
            </motion.div>
          )}

          {bookingStep === 3 && (
            <motion.div
              key="step3"
              className="booking-step-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Choose your technician</h2>
              
              <div className="technicians-grid">
                {topTechnicians.map((tech, i) => (
                  <motion.div
                    key={i}
                    className={`technician-card ${selectedTechnician?.name === tech.name ? 'selected' : ''} ${!tech.available ? 'unavailable' : ''}`}
                    onClick={() => tech.available && setSelectedTechnician(tech)}
                    whileHover={{ scale: tech.available ? 1.02 : 1 }}
                    whileTap={{ scale: tech.available ? 0.98 : 1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {i < 3 && (
                      <div className="top-badge">
                        {i === 0 && '🥇 #1'}
                        {i === 1 && '🥈 #2'}
                        {i === 2 && '🥉 #3'}
                      </div>
                    )}
                    
                    <div className="tech-header">
                      <div className="tech-avatar">
                        <User size={24} />
                        {tech.available && <div className="online-indicator" />}
                      </div>
                      <div className="tech-info">
                        <h4>{tech.name}</h4>
                        <p className="tech-specialty">{tech.specialty}</p>
                      </div>
                    </div>

                    <div className="tech-stats">
                      <div className="stat">
                        <Star className="stat-icon" />
                        <span>{tech.rating.toFixed(1)}</span>
                      </div>
                      <div className="stat">
                        <Briefcase className="stat-icon" />
                        <span>{tech.jobs}</span>
                      </div>
                      <div className="stat">
                        <Clock className="stat-icon" />
                        <span>{tech.responseTime}m</span>
                      </div>
                    </div>

                    <div className="tech-badges">
                      {[...Array(tech.badges)].map((_, j) => (
                        <Award key={j} size={16} className="badge-icon" />
                      ))}
                    </div>

                    <div className="tech-footer">
                      <div className="tech-price">${tech.price}/hr</div>
                      <div className={`tech-status ${tech.available ? 'available' : 'busy'}`}>
                        {tech.available ? 'Available' : 'Busy'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="step-actions">
                <button className="back-button" onClick={() => setBookingStep(2)}>Back</button>
                <motion.button
                  className="continue-button"
                  onClick={() => setBookingStep(4)}
                  disabled={!selectedTechnician}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Review Booking
                </motion.button>
              </div>
            </motion.div>
          )}

          {bookingStep === 4 && (
            <motion.div
              key="step4"
              className="booking-step-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>Confirm your booking</h2>
              
              <div className="booking-summary">
                <div className="summary-section">
                  <h3>Service Details</h3>
                  <div className="summary-item">
                    <Wrench size={20} />
                    <div>
                      <strong>{issueTypes.find(i => i.id === issueType)?.name} Issue</strong>
                      <p>{urgencyOptions.find(u => u.id === urgencyLevel)?.name} Service</p>
                    </div>
                  </div>
                </div>

                <div className="summary-section">
                  <h3>Schedule</h3>
                  <div className="summary-item">
                    <Calendar size={20} />
                    <div>
                      <strong>{selectedDate.toLocaleDateString()}</strong>
                      <p>at {selectedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="summary-section">
                  <h3>Technician</h3>
                  <div className="summary-item">
                    <User size={20} />
                    <div>
                      <strong>{selectedTechnician?.name}</strong>
                      <p>{selectedTechnician?.specialty} • {selectedTechnician?.rating?.toFixed(1)} ⭐</p>
                    </div>
                  </div>
                </div>

                <div className="summary-section">
                  <h3>Location</h3>
                  <input
                    type="text"
                    className="address-input"
                    placeholder="Enter your service address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="summary-section">
                  <h3>Additional Notes</h3>
                  <textarea
                    className="notes-input"
                    placeholder="Any special instructions or details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="price-breakdown">
                  <div className="price-line">
                    <span>Base Service</span>
                    <span>${selectedTechnician?.price || 99}</span>
                  </div>
                  {urgencyLevel === 'emergency' && (
                    <div className="price-line">
                      <span>Emergency Fee</span>
                      <span>$50</span>
                    </div>
                  )}
                  {urgencyLevel === 'today' && (
                    <div className="price-line">
                      <span>Same-Day Fee</span>
                      <span>$30</span>
                    </div>
                  )}
                  <div className="price-line total">
                    <span>Estimated Total</span>
                    <span>
                      ${(selectedTechnician?.price || 99) + 
                        (urgencyLevel === 'emergency' ? 50 : urgencyLevel === 'today' ? 30 : 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="step-actions">
                <button className="back-button" onClick={() => setBookingStep(3)}>Back</button>
                <motion.button
                  className="confirm-button"
                  onClick={handleBooking}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle size={20} />
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showConfirmation && (
          <motion.div 
            className="confirmation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="confirmation-modal"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="success-icon">
                <CheckCircle size={60} />
              </div>
              <h2>Booking Confirmed!</h2>
              <p>Your technician is on the way</p>
              
              <div className="confirmation-details">
                <div className="detail-item">
                  <strong>Technician:</strong> {selectedTechnician?.name}
                </div>
                <div className="detail-item">
                  <strong>Arrival Time:</strong> {selectedTime}
                </div>
                <div className="detail-item">
                  <strong>Tracking ID:</strong> #TK{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
              </div>

              <div className="confirmation-actions">
                <button className="track-button">
                  <MapPin size={16} />
                  Track Technician
                </button>
                <button className="contact-button">
                  <Phone size={16} />
                  Contact Support
                </button>
              </div>

              <button 
                className="close-confirmation"
                onClick={() => {
                  setShowConfirmation(false);
                  setBookingStep(1);
                  setSelectedTechnician(null);
                  setSelectedTime(null);
                }}
              >
                Book Another Service
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TechnicianSchedule;