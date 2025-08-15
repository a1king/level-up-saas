import React from "react";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Floating squares */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-200 rounded-lg opacity-10 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200 rounded-lg opacity-10 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-200 rounded-lg opacity-10 animate-float animation-delay-2000"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>
  );
}
