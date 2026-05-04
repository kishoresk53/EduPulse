import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  GraduationCap, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Student Records', icon: Users },
  { id: 'attendance', label: 'Attendance Logs', icon: CalendarCheck },
  { id: 'grades', label: 'Grade Management', icon: GraduationCap },
  { id: 'settings', label: 'System Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 h-screen bg-slate-900 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8 flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <div className="w-3 h-3 bg-white -rotate-45"></div>
        </div>
        <span className="text-white font-bold tracking-tight text-xl uppercase">EduPulse</span>
      </div>

      <nav className="mt-4 flex-1 space-y-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-8 py-3.5 transition-all duration-200 group text-sm font-medium",
              activeTab === item.id 
                ? "bg-blue-600/10 border-r-4 border-blue-500 text-blue-400" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                activeTab === item.id ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium leading-none truncate">Registrar Office</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Admin Staff</p>
          </div>
        </div>
        
        <button className="w-full flex items-center gap-3 py-2 text-slate-500 hover:text-white transition-colors duration-200 text-sm font-bold uppercase tracking-widest">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
