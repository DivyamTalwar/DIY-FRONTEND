import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import NotificationSystem from './components/NotificationSystem';
import ChatSupport from './components/ChatSupport';
import EmergencyLanding from './pages/EmergencyLanding';
import SmartDiagnosis from './pages/SmartDiagnosis';
import GuidedRepair from './pages/GuidedRepair';
import QuickFix from './pages/QuickFix';
import CompanyDashboard from './pages/CompanyDashboard';
import ModernDashboard from './pages/ModernDashboard';
import UltimateNewRepair from './pages/UltimateNewRepair';
import RepairWorkflow from './pages/RepairWorkflow';
import PropertyManager from './pages/PropertyManager';
import TechnicianSchedule from './pages/TechnicianSchedule';
import ModernAchievements from './pages/ModernAchievements';
import EpicLeaderboard from './pages/EpicLeaderboard';
import './App.css';

// Lazy load new advanced features for better performance
const AdvancedAnalytics = lazy(() => import('./pages/AdvancedAnalytics'));
const TenantPortal = lazy(() => import('./pages/TenantPortal'));
const FinancialManagement = lazy(() => import('./pages/FinancialManagement'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
      <div>Loading your DIY Heroes experience...</div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<LoadingSpinner />}>
          <Navigation />
          <NotificationSystem />
          <ChatSupport />
          <Routes>
            <Route path="/" element={<EmergencyLanding />} />
            <Route path="/smart-diagnosis" element={<SmartDiagnosis />} />
            <Route path="/guided-repair/:id" element={<GuidedRepair />} />
            <Route path="/quick-fix" element={<QuickFix />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/dashboard" element={<ModernDashboard />} />
            <Route path="/new-repair" element={<UltimateNewRepair />} />
            <Route path="/repair/:id" element={<RepairWorkflow />} />
            <Route path="/property-manager" element={<PropertyManager />} />
            <Route path="/schedule-technician" element={<TechnicianSchedule />} />
            <Route path="/achievements" element={<ModernAchievements />} />
            <Route path="/leaderboard" element={<EpicLeaderboard />} />
            <Route path="/analytics" element={<AdvancedAnalytics />} />
            <Route path="/tenant-portal" element={<TenantPortal />} />
            <Route path="/financial" element={<FinancialManagement />} />
          </Routes>
          <Toaster 
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '12px',
              },
            }}
          />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;