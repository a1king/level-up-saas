import React from 'react';

export function AuroraBackground({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Aurora background with CSS gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/30 via-blue-200/20 to-purple-200/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-pink-200/20 via-blue-200/30 to-cyan-200/20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-200/20 via-purple-200/30 to-blue-200/20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
