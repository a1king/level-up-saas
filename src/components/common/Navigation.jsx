import React from 'react';

export default function Navigation({ currentView, setCurrentView, user }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-2xl font-bold text-cyan-600">Level Up</span>
          <div className="hidden md:flex space-x-4">
            {['dashboard', 'tracker', 'insights', 'ai-assistant', 'pricing'].map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === view ? 'bg-cyan-100 text-cyan-700' : 'text-slate-600 hover:text-cyan-600'
                }`}
              >
                {view === 'ai-assistant' ? '🤖 AI Assistant' : view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{user?.name || 'Demo User'}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              user?.subscriptionTier === 'premium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {user?.subscriptionTier === 'premium' ? '✨ Premium' : 'Free'}
            </span>
            <button
              onClick={() => setCurrentView('landing')}
              className="text-slate-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Back to Landing
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
