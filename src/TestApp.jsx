import React from 'react';

function TestApp() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold'
    }}>
      <div>
        <h1>DIY Heroes Test</h1>
        <p>If you can see this, React is working!</p>
      </div>
    </div>
  );
}

export default TestApp;