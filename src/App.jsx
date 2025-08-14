import React, { useState } from 'react';
import Navigation from './components/common/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import ApplicationTracker from './components/tracker/ApplicationTracker';
import Insights from './components/insights/Insights';
import AIInsights from './components/ai/AIInsights';
import PricingPage from './components/pricing/PricingPage';
import LandingHero from './components/landing/LandingHero';
import { mockData } from './utils/mockData';
import './index.css';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [applications] = useState(mockData.applications);
  const [user] = useState(mockData.user);

  if (currentView === 'landing') {
    return <LandingHero setCurrentView={setCurrentView} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} user={user} />
      {currentView === 'dashboard' && <Dashboard applications={applications} user={user} setCurrentView={setCurrentView} />}
      {currentView === 'tracker' && <ApplicationTracker />}
      {currentView === 'insights' && <Insights />}
      {currentView === 'ai-assistant' && <AIInsights />}
      {currentView === 'pricing' && <PricingPage />}
    </div>
  );
}
