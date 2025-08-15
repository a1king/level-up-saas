import React from 'react';

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">💎 Pricing Plans</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <h3 className="text-2xl font-bold mb-4">Free Tracker</h3>
          <div className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal">/month</span></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Track up to 10 applications</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Basic status updates</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Community insights</li>
          </ul>
          <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium">Current Plan</button>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Premium AI</h3>
          <div className="text-4xl font-bold mb-4">$9<span className="text-lg font-normal">/month</span></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center"><span className="text-green-300 mr-2">✓</span>Unlimited applications</li>
            <li className="flex items-center"><span className="text-green-300 mr-2">✓</span>🤖 AI Resume Analysis</li>
            <li className="flex items-center"><span className="text-green-300 mr-2">✓</span>🤖 AI Cover Letters</li>
            <li className="flex items-center"><span className="text-green-300 mr-2">✓</span>🤖 Interview Prep</li>
          </ul>
          <button className="w-full bg-white text-cyan-600 py-3 rounded-lg font-medium">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}
