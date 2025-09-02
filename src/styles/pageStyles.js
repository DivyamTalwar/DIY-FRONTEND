// Universal styles for all pages to ensure perfect alignment

export const pageStyles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  
  contentWrapper: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '24px',
    boxSizing: 'border-box'
  },
  
  header: {
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%'
  },
  
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 24px',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },
  
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  
  button: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: '8px'
  },
  
  subtitle: {
    fontSize: '16px',
    color: '#6c757d',
    marginBottom: '32px'
  }
};

export default pageStyles;