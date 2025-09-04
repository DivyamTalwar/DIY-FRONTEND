import React from 'react';

function PageWrapper({ children, noPadding = false, fullWidth = false }) {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: fullWidth ? '100%' : '1400px',
        margin: '0 auto',
        padding: noPadding ? 0 : '24px',
        boxSizing: 'border-box'
      }}>
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;