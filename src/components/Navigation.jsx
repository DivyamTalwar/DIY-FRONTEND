import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Trophy, Users, Shield, Calendar, BarChart3, UserCircle, DollarSign } from 'lucide-react';
import { userProgress } from '../data/demoData';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Hide navigation on certain pages for better UX
  const hideNavPages = ['/', '/smart-diagnosis', '/quick-fix', '/company-dashboard'];
  const shouldHideNav = hideNavPages.includes(location.pathname) || 
                        location.pathname.startsWith('/guided-repair/');
  
  if (shouldHideNav) {
    return null;
  }

  return (
    <nav className="nav-bar" style={{ 
      width: '100%', 
      padding: '16px 24px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 className="hero-title" style={{ fontSize: '28px', margin: 0, color: 'white' }}>DIY HEROES</h1>
          <div className="hero-avatar" style={{ width: '40px', height: '40px', fontSize: '18px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🦸
          </div>
        </div>
      
        <ul className="nav-links" style={{ 
          display: 'flex', 
          listStyle: 'none', 
          gap: '8px', 
          margin: 0, 
          padding: 0,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
        <li>
          <Link to="/" className={`nav-link ${isActive('/')}`} style={{
            padding: '8px 16px',
            borderRadius: '8px',
            color: isActive('/') ? '#667eea' : 'white',
            background: isActive('/') ? 'white' : 'transparent',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}>
            <Home size={18} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/new-repair" className={`nav-link ${isActive('/new-repair')}`}>
            <Plus size={20} style={{ display: 'inline', marginRight: '4px' }} />
            New Repair
          </Link>
        </li>
        <li>
          <Link to="/achievements" className={`nav-link ${isActive('/achievements')}`}>
            <Trophy size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Achievements
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard')}`}>
            <Users size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/property-manager" className={`nav-link ${isActive('/property-manager')}`}>
            <Shield size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Manager
          </Link>
        </li>
        <li>
          <Link to="/schedule-technician" className={`nav-link ${isActive('/schedule-technician')}`}>
            <Calendar size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Technician
          </Link>
        </li>
        <li>
          <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>
            <BarChart3 size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Analytics
          </Link>
        </li>
        <li>
          <Link to="/tenant-portal" className={`nav-link ${isActive('/tenant-portal')}`}>
            <UserCircle size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Tenant
          </Link>
        </li>
        <li>
          <Link to="/financial" className={`nav-link ${isActive('/financial')}`}>
            <DollarSign size={20} style={{ display: 'inline', marginRight: '4px' }} />
            Financial
          </Link>
        </li>
        </ul>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="streak-badge" style={{
            background: 'white',
            color: '#667eea',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            🔥 {userProgress.streak} days
          </div>
          <div style={{ textAlign: 'right', color: 'white' }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Level {userProgress.level}</div>
            <div style={{ fontWeight: '600' }}>{userProgress.xp} XP</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;