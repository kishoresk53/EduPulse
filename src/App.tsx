/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { StudentRegistry } from './components/students/StudentRegistry';
import { AttendanceTracker } from './components/attendance/AttendanceTracker';
import { GradeBook } from './components/grades/GradeBook';
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'students':
        return <StudentRegistry />;
      case 'attendance':
        return <AttendanceTracker />;
      case 'grades':
        return <GradeBook />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 font-bold" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Current Term</p>
                <p className="text-sm font-bold text-slate-800 uppercase">Fall 2024</p>
              </div>
              <button className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-bold tracking-[0.2em] hover:bg-slate-800 transition-colors rounded-none">
                GENERATE REPORT
              </button>
            </div>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-6 text-slate-400">
              <button className="p-2 hover:text-slate-900 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 max-w-full w-full flex-1">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
