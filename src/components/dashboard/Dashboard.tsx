import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../../lib/utils';

const attendanceData = [
  { name: 'Mon', attendance: 94 },
  { name: 'Tue', attendance: 96 },
  { name: 'Wed', attendance: 92 },
  { name: 'Thu', attendance: 95 },
  { name: 'Fri', attendance: 97 },
];

const gradeData = [
  { subject: 'Math', average: 85 },
  { subject: 'Science', average: 78 },
  { subject: 'English', average: 92 },
  { subject: 'History', average: 88 },
  { subject: 'Art', average: 95 },
];

const StatCard = ({ title, value, icon: Icon, progress, color, onClick }: any) => (
  <button 
    onClick={onClick}
    disabled={!onClick}
    className={cn(
      "bg-white p-8 border border-slate-200 shadow-sm relative overflow-hidden group text-left w-full",
      onClick ? "cursor-pointer hover:border-slate-400 transition-all active:scale-[0.98]" : "cursor-default"
    )}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-12 h-12 text-slate-900" />
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</p>
    <p className="text-4xl font-light text-slate-900">{value}</p>
    
    <div className="mt-6 h-1 bg-slate-100 w-full overflow-hidden">
      <div 
        className={cn("h-full transition-all duration-1000 ease-out", color)} 
        style={{ width: `${progress}%` }}
      />
    </div>
  </button>
);

export const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">System Analytics</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Institutional Infrastructure Audit</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Total Students" 
          value="1,428" 
          icon={Users} 
          progress={85} 
          color="bg-blue-500" 
          onClick={() => setActiveTab('students')}
        />
        <StatCard 
          title="Daily Attendance" 
          value="94.2%" 
          icon={CalendarCheck} 
          progress={94} 
          color="bg-emerald-500" 
          onClick={() => setActiveTab('attendance')}
        />
        <StatCard title="System GPA Avg" value="3.62" icon={TrendingUp} progress={72} color="bg-amber-500" />
        <StatCard title="Network Alerts" value="04" icon={AlertCircle} progress={12} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Attendance Trend */}
        <div className="lg:col-span-8 bg-white p-8 border border-slate-200 shadow-sm flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Attendance Flux</h3>
              <p className="text-[10px] text-slate-400 mt-1 italic font-medium">Standard weekly deviation analysis</p>
            </div>
            <div className="flex items-center bg-slate-50 border border-slate-200 p-1 px-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase mr-3">Filter</span>
              <select className="bg-transparent text-[10px] font-bold text-blue-600 focus:outline-none uppercase">
                <option>7 Day View</option>
                <option>30 Day View</option>
              </select>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  unit="%" 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '0px', border: '1px solid #e2e8f0', boxShadow: 'none', background: '#fff' }}
                  labelStyle={{ fontWeight: 800, fontSize: '10px', color: '#1e293b', textTransform: 'uppercase' }}
                />
                <Area type="stepAfter" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAttendance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          <div className="bg-white border border-slate-200 shadow-sm p-8 flex-1">
            <h3 className="text-sm font-bold text-slate-700 mb-8 flex items-center justify-between">
              <span className="uppercase tracking-widest">Enrollment Status</span>
              <span className="text-[10px] text-slate-400 font-normal uppercase italic">Cycle 2024</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1 shadow-none">
                  <span className="text-slate-400">Undergraduate</span>
                  <span className="text-slate-900">1,120</span>
                </div>
                <div className="h-1.5 bg-slate-100">
                  <div className="h-1.5 bg-blue-500 w-[78%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                  <span className="text-slate-400">Post-Graduate</span>
                  <span className="text-slate-900">308</span>
                </div>
                <div className="h-1.5 bg-slate-100">
                  <div className="h-1.5 bg-emerald-500 w-[22%]"></div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-3">Anomalies Detected</p>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-rose-500 bg-rose-50 p-3 border-l-4 border-rose-500 uppercase tracking-tighter">
                  <span>04 unexcused absences detected (A-4)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16"></div>
             <div>
               <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Critical Deadline</p>
               <h4 className="text-white text-lg font-bold mt-3 leading-tight uppercase font-sans">Final Grade Submission for Graduating Seniors</h4>
             </div>
             <p className="text-blue-300 text-[10px] mt-8 uppercase font-bold tracking-[0.2em] border-t border-blue-500 pt-4 cursor-default">48 HOURS REMAINING</p>
          </div>
        </div>
      </div>
    </div>
  );
};
