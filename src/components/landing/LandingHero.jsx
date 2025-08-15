import React from 'react';
import { AuroraBackground } from '../ui/aurora-background';
import { DraggableCardBody, DraggableCardContainer } from '../ui/draggable-card';

export default function LandingHero({ setCurrentView }) {
  const successStories = [
    {
      name: "Sarah Chen",
      university: "Stanford CS", 
      achievement: "Google SWE Intern",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b002?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-10 left-[20%] rotate-[-5deg]"
    },
    {
      name: "Alex Rivera",
      university: "MIT EECS",
      achievement: "Meta Frontend Intern", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-40 left-[25%] rotate-[-7deg]"
    },
    {
      name: "Jordan Kim", 
      university: "Berkeley CS",
      achievement: "Apple iOS Intern",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-5 left-[40%] rotate-[8deg]"
    },
    {
      name: "Taylor Brown",
      university: "CMU SCS", 
      achievement: "Microsoft PM Intern",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      className: "absolute top-32 left-[55%] rotate-[10deg]"
    },
    {
      name: "Morgan Davis",
      university: "Harvard CS",
      achievement: "Tesla SWE Intern",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", 
      className: "absolute top-20 right-[35%] rotate-[2deg]"
    }
  ];

  return (
    <AuroraBackground>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-cyan-600">Level Up</span>
            <div className="hidden md:flex space-x-4">
              <button className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium">Features</button> 
              <button className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium">How It Works</button>
              <button className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium">Success Stories</button>
              <button className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium">Pricing</button> 
            </div>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-4">Smart Analytics</h3>
            <p className="text-slate-600">Track response rates and application timelines with data from thousands of students.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-4">AI Assistant</h3>
            <p className="text-slate-600">Get personalized resume analysis, cover letter generation, and interview prep.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-4">Success Tracking</h3>
            <p className="text-slate-600">Monitor your journey from application to offer with intelligent insights.</p>
          </div>
        </div>
      </div>

      {/* Success Stories with Tilted Draggable Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Success Stories</h2>
        <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
          Students using Level Up have landed internships at top companies. <strong>Drag the cards to explore!</strong>
        </p>
        
        <DraggableCardContainer className="relative flex min-h-[500px] w-full items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0">
            <p className="text-2xl font-bold text-slate-400 max-w-md">
              Drag the success story cards around!
            </p>
          </div>
          
          {successStories.map((story, index) => (
            <DraggableCardBody key={index} className={story.className}>
              <img 
                src={story.image} 
                alt={story.name}
                className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
              />
              <h3 className="text-lg font-bold text-slate-800 text-center">{story.name}</h3>
              <p className="text-sm text-slate-600 text-center">{story.university}</p>
              <p className="text-sm font-semibold text-cyan-600 text-center mt-2">{story.achievement}</p>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Level Up?</h2>
          <p className="text-xl text-slate-600 mb-8">Join thousands of students transforming their job search.</p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-12 py-4 rounded-xl text-xl font-semibold hover:from-cyan-700 hover:to-blue-700"
          >
            Start Your Success Story 🚀
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
}
