import React from 'react';

export default function LandingHero({ setCurrentView }) {
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 min-h-screen">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-cyan-600">Level Up</span>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Stop Playing the <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Job Application</span> Guessing Game
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
          Get real-time insights into response rates, timelines, and success patterns from thousands of students.
        </p>
        <button 
          onClick={() => setCurrentView('dashboard')}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-700 hover:to-blue-700"
        >
          Start Tracking Free
        </button>
      </div>
    </div>
  );
}
