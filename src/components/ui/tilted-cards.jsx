import React, { useState, useRef } from "react";

export function TiltedCards({ setCurrentView }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-12">
      {/* Feature Card 1 */}
      <div
        ref={cardRef}
        className="relative group cursor-pointer transition-all duration-300 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={() => setCurrentView && setCurrentView('tracker')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Track Applications
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Monitor your job applications with real-time updates and insights.
          </p>
        </div>
      </div>

      {/* Feature Card 2 */}
      <div 
        className="relative group cursor-pointer transition-all duration-300 ease-out"
        onClick={() => setCurrentView && setCurrentView('insights')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Analytics & Insights
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Get detailed analytics on response rates and success patterns.
          </p>
        </div>
      </div>

      {/* Feature Card 3 */}
      <div 
        className="relative group cursor-pointer transition-all duration-300 ease-out"
        onClick={() => setCurrentView && setCurrentView('ai-assistant')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            AI Assistant
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Get AI-powered insights and recommendations for your applications.
          </p>
        </div>
      </div>

      {/* Feature Card 4 */}
      <div 
        className="relative group cursor-pointer transition-all duration-300 ease-out"
        onClick={() => setCurrentView && setCurrentView('dashboard')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Resume Builder
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Create and optimize your resume with AI-powered suggestions.
          </p>
        </div>
      </div>

      {/* Feature Card 5 */}
      <div 
        className="relative group cursor-pointer transition-all duration-300 ease-out"
        onClick={() => setCurrentView && setCurrentView('dashboard')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Interview Prep
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Prepare for interviews with AI-generated questions and tips.
          </p>
        </div>
      </div>

      {/* Feature Card 6 */}
      <div 
        className="relative group cursor-pointer transition-all duration-300 ease-out"
        onClick={() => setCurrentView && setCurrentView('pricing')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Salary Insights
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Get market data on salaries and compensation packages.
          </p>
        </div>
      </div>
    </div>
  );
}
