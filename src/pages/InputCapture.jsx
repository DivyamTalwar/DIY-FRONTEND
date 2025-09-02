import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Mic, Video, Edit3, QrCode, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

function InputCapture() {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [description, setDescription] = useState('');

  const capturesMethods = [
    {
      id: 'camera',
      icon: <Camera size={48} />,
      title: 'SNAP IT',
      description: 'Take a photo of the problem',
      color: '#0066FF'
    },
    {
      id: 'voice',
      icon: <Mic size={48} />,
      title: 'TELL ME',
      description: 'Describe it with your voice',
      color: '#00C853'
    },
    {
      id: 'video',
      icon: <Video size={48} />,
      title: 'SHOW ME',
      description: 'Record a 30-second video',
      color: '#FFD700'
    },
    {
      id: 'text',
      icon: <Edit3 size={48} />,
      title: 'DESCRIBE IT',
      description: 'Type what needs fixing',
      color: '#FF3B30'
    }
  ];

  const commonProblems = [
    'Leaky faucet',
    'Running toilet',
    'No hot water',
    'Clogged drain',
    'Light not working',
    'Door won\'t close',
    'AC not cooling',
    'Strange noise'
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    
    if (method === 'camera') {
      toast.success('Camera activated! (Demo mode - would open camera)');
    } else if (method === 'voice') {
      setIsRecording(true);
      toast.success('Recording started! (Demo mode)');
      setTimeout(() => {
        setIsRecording(false);
        toast.success('Recording complete!');
      }, 3000);
    } else if (method === 'video') {
      toast.success('Video recording started! (Demo mode)');
    }
  };

  const handleSubmit = () => {
    if (!serialNumber) {
      toast.error('Please enter the serial number!');
      return;
    }
    
    toast.success('Problem identified! Finding solution...');
    setTimeout(() => {
      navigate('/repair/SERIAL-12345');
    }, 1500);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
          <span className="hero-title">What Needs Fixing, Hero?</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={32} color="#FFD700" />
          </motion.div>
          <p style={{ fontSize: '20px', color: '#6B7280' }}>
            Show me the problem and I'll guide you to victory!
          </p>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={32} color="#FFD700" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="card"
        style={{ marginBottom: '32px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Step 1: Enter Serial Number</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter serial number (found on appliance/fixture)"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            style={{
              flex: 1,
              padding: '16px',
              fontSize: '16px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              outline: 'none'
            }}
          />
          <button
            className="button-primary"
            style={{ background: 'white', color: '#667eea', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <QrCode size={20} />
            Scan QR
          </button>
        </div>
        <p style={{ fontSize: '14px', marginTop: '8px', opacity: 0.9 }}>
          The serial number helps us find the exact repair instructions for your model
        </p>
      </motion.div>

      <h2 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>
        Step 2: Choose Your Input Method
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {capturesMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="input-capture-button"
            onClick={() => handleMethodSelect(method.id)}
            style={{
              background: selectedMethod === method.id ? method.color : 'white',
              borderColor: method.color,
              color: selectedMethod === method.id ? 'white' : '#1A1A1A'
            }}
          >
            <div className="capture-icon" style={{ color: selectedMethod === method.id ? 'white' : method.color }}>
              {method.icon}
            </div>
            <h3 style={{ fontSize: '20px', margin: '8px 0' }}>{method.title}</h3>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>{method.description}</p>
            {method.id === 'voice' && isRecording && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ marginTop: '8px' }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'red', margin: '0 auto' }} />
                <p style={{ fontSize: '12px', marginTop: '4px' }}>Recording...</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {selectedMethod === 'text' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card"
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ marginBottom: '16px' }}>Describe the Problem</h3>
          <textarea
            placeholder="Example: My kitchen faucet is dripping constantly, about once per second..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
          <div style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>Quick select common problems:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {commonProblems.map((problem) => (
                <button
                  key={problem}
                  onClick={() => setDescription(problem)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid #E5E7EB',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#0066FF';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#1A1A1A';
                  }}
                >
                  {problem}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}
      >
        <button
          className="button-primary"
          onClick={handleSubmit}
          style={{
            padding: '16px 48px',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={20} />
          Analyze & Find Solution
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ textAlign: 'center', marginTop: '48px' }}
      >
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          Our AI Hero Assistant will analyze your problem and provide step-by-step repair instructions
        </p>
        <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '8px' }}>
          Success rate: 89% | Average time saved: 2 hours | Money saved: $150+
        </p>
      </motion.div>
    </div>
  );
}

export default InputCapture;