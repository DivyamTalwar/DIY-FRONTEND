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
    <nav className="nav-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 className="hero-title" style={{ fontSize: '32px', margin: 0 }}>DIY HEROES</h1>
        <div className="hero-avatar" style={{ width: '48px', height: '48px', fontSize: '20px' }}>
          🦸
        </div>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Home size={20} style={{ display: 'inline', marginRight: '4px' }} />
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
        <div className="streak-badge">
          🔥 {userProgress.streak} days
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Level {userProgress.level}</div>
          <div style={{ fontWeight: '600' }}>{userProgress.xp} XP</div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;