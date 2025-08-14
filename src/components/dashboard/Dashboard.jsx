import React from 'react';

export default function Dashboard({ applications, user, setCurrentView }) {
  const stats = {
    total: applications.length,
    responses: applications.filter(app => app.status !== 'Pending').length,
    interviews: applications.filter(app => app.status === 'Interview Scheduled').length,
    offers: applications.filter(app => app.status === 'Offer Received').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Welcome back, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-slate-600 text-sm">Applications</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-green-600">{stats.responses}</div>
          <div className="text-slate-600 text-sm">Responses</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">{stats.interviews}</div>
          <div className="text-slate-600 text-sm">Interviews</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-cyan-600">{stats.offers}</div>
          <div className="text-slate-600 text-sm">Offers</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">🤖 AI Assistant</h3>
          <p className="mb-4 opacity-90">Get personalized insights and optimize your applications</p>
          <button 
            onClick={() => setCurrentView('ai-assistant')}
            className="bg-white text-cyan-600 px-4 py-2 rounded-lg font-medium"
          >
            Open AI Assistant
          </button>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold mb-2">📝 Quick Add</h3>
          <p className="mb-4 text-slate-600">Add a new application</p>
          <button 
            onClick={() => setCurrentView('tracker')}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium"
          >
            Add Application
          </button>
        </div>
      </div>
    </div>
  );
}
