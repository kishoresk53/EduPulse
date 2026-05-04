import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MinusCircle,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Download,
  Search
} from 'lucide-react';
import { mockStudents } from '../../mockData';
import { cn } from '../../lib/utils';
import { format, addDays, subDays, startOfToday } from 'date-fns';

export const AttendanceTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const newAttendance = { ...attendance };
    mockStudents.forEach(s => {
      newAttendance[s.id] = 'present';
    });
    setAttendance(newAttendance);
  };

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusIcons = {
    present: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', active: 'bg-emerald-600 border-emerald-500' },
    absent: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', active: 'bg-rose-600 border-rose-500' },
    late: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', active: 'bg-amber-600 border-amber-500' },
    excused: { icon: MinusCircle, color: 'text-blue-600', bg: 'bg-blue-50', active: 'bg-blue-600 border-blue-500' },
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Attendance Audit</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Daily manifestation check</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 px-6 py-2.5 rounded-none text-[10px] font-bold tracking-[0.2em] transition-all text-slate-800">
            <Download className="w-4 h-4" />
            EXPORT LOG
          </button>
          <div className="flex items-center bg-white border border-slate-200 rounded-none overflow-hidden">
            <button 
              onClick={() => setSelectedDate(prev => subDays(prev, 1))}
              className="p-2.5 hover:bg-slate-50 text-slate-400 border-r border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-5 py-2.5 flex items-center gap-3 text-[10px] font-bold text-slate-800 tracking-widest uppercase min-w-[180px] justify-center">
              <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
              {format(selectedDate, 'MMM dd, yyyy')}
            </div>
            <button 
              onClick={() => setSelectedDate(prev => addDays(prev, 1))}
              className="p-2.5 hover:bg-slate-50 text-slate-400 border-l border-slate-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-none">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="FIND INDIVIDUAL STUDENT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-slate-900 outline-none"
            />
          </div>
          <button 
            onClick={markAllPresent}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-none text-[10px] font-bold tracking-[0.2em] transition-all whitespace-nowrap"
          >
            MARK ALL PRESENT
          </button>
        </div>

        <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Roll Call Manifest</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <span className="w-2 h-2 rounded-none bg-emerald-500 shadow-sm shadow-emerald-500/20"></span>
              Verified: 4
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <span className="w-2 h-2 rounded-none bg-rose-500 shadow-sm shadow-rose-500/20"></span>
              Absentee: 1
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {filteredStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-none border border-slate-200 grayscale group-hover:grayscale-0 transition-all overflow-hidden bg-slate-100">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-tight">{student.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.grade_level}</p>
                </div>
              </div>

              <div className="flex gap-3">
                {(Object.entries(statusIcons) as [string, any][]).map(([status, { icon: Icon, color, bg, active }]) => {
                  const isActive = attendance[student.id] === status;
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(student.id, status)}
                      className={cn(
                        "w-10 h-10 rounded-none border transition-all duration-200 flex items-center justify-center group relative",
                        isActive 
                          ? cn(active.split(' ')[0], "text-white border-transparent bg-slate-900") 
                          : cn("border-slate-100 bg-white text-slate-300 hover:border-slate-300", bg.replace('bg-', 'hover:bg-'))
                      )}
                      title={status.toUpperCase()}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-white" : color)} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
          <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-none text-xs font-bold tracking-[0.3em] transition-all duration-200 uppercase">
            COMMIT SYSTEM LOGS
          </button>
        </div>
      </div>
    </div>
  );
};
