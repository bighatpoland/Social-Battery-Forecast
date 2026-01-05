import React from 'react';

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Social Battery Forecast
          </h1>
          <p className="text-slate-600 text-lg mb-6">
            Recharge Your Social Energy – Forecast, Track, and Thrive with AI-Powered Insights
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            Get Started
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Top Row */}
          {/* Energy Forecast Chart - Wide Card (span 2) */}
          <div className="md:col-span-2 bg-white backdrop-blur-xl bg-opacity-80 border border-white border-opacity-20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Energy Forecast Chart</h2>
            <div className="h-64 md:h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-500">Your forecast visualization will appear here</p>
            </div>
          </div>

          {/* Current Battery Status - Square Card (span 1) */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 border border-white border-opacity-20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Current Battery</h2>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">75%</span>
            </div>
            <p className="text-slate-600 text-sm mt-4 text-center">Good</p>
          </div>

          {/* Bottom Row */}
          {/* Upcoming Events - Vertical Card */}
          <div className="md:row-span-2 bg-white backdrop-blur-xl bg-opacity-80 border border-white border-opacity-20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 text-sm">Team Meeting</p>
                <p className="text-slate-600 text-xs">Today 2:00 PM</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 text-sm">Coffee with Alex</p>
                <p className="text-slate-600 text-xs">Tomorrow 10:00 AM</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 text-sm">Project Deadline</p>
                <p className="text-slate-600 text-xs">Friday 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Insights - Small Card */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 border border-white border-opacity-20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Quick Insights</h2>
            <p className="text-slate-600 text-sm mb-3">
              Your social battery is 75% charged. Consider a recharge activity soon.
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Active</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Stable</span>
            </div>
          </div>

          {/* Energy Tips - Small Card */}
          <div className="bg-white backdrop-blur-xl bg-opacity-80 border border-white border-opacity-20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Energy Tips</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="mr-2">💡</span>
                <span>Take a 15-min break after meetings</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎧</span>
                <span>Listen to music for recharge</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;