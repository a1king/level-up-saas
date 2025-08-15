import React from 'react';
import { motion } from "motion/react";

export const HeroSectionOne = ({ setCurrentView }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-cyan-600">Level Up</span>
            <button 
              onClick={() => setCurrentView && setCurrentView('dashboard')}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Stop Playing the{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Job Application
            </span>{" "}
            Guessing Game
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get real-time insights into response rates, timelines, and success patterns 
            from thousands of students.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => setCurrentView && setCurrentView('dashboard')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Tracking Free
            </button>
            <button 
              onClick={() => setCurrentView && setCurrentView('pricing')}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all"
            >
              View Features
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600">1000+</div>
              <div className="text-sm text-slate-600">Students Tracking</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">65%</div>
              <div className="text-sm text-slate-600">Average Response Rate</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">14 Days</div>
              <div className="text-sm text-slate-600">Average Response Time</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
