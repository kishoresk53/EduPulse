import React from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  BarChart2, 
  TrendingUp,
  Award,
  BookOpen,
  PieChart as PieChartIcon
} from 'lucide-react';
import { mockStudents, mockGrades } from '../../mockData';
import { cn, formatScore } from '../../lib/utils';

export const GradeBook: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Academic Ledger</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Validated performance records</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-800 px-6 py-2.5 rounded-none text-[10px] font-bold tracking-[0.2em] hover:bg-slate-50 transition-all">
            <TrendingUp className="w-4 h-4" />
            AUDIT PERFORMANCE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Grade Summary Stats */}
        <div className="bg-white p-8 border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden group">
          <div className="p-3 bg-slate-900 rounded-none text-white rotate-45">
            <div className="-rotate-45"><BarChart2 className="w-4 h-4" /></div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mean Score</p>
            <p className="text-2xl font-light text-slate-900">86.4%</p>
          </div>
        </div>
        <div className="bg-white p-8 border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden group">
          <div className="p-3 bg-blue-600 rounded-none text-white rotate-45">
            <div className="-rotate-45"><Award className="w-4 h-4" /></div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Peak Performance</p>
            <p className="text-2xl font-light text-slate-900">98% (Marcus)</p>
          </div>
        </div>
        <div className="bg-white p-8 border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden group">
          <div className="p-3 bg-slate-100 rounded-none text-slate-900 rotate-45">
            <div className="-rotate-45"><BookOpen className="w-4 h-4" /></div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject Scope</p>
            <p className="text-2xl font-light text-slate-900">12 Modules</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-none">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PieChartIcon className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Distribution Matrix</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assessment</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockGrades.map((grade) => {
                const student = mockStudents.find(s => s.id === grade.student_id);
                const percentage = (grade.score / grade.max_score) * 100;
                
                return (
                  <tr key={grade.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-none border border-slate-200 grayscale group-hover:grayscale-0 transition-all overflow-hidden">
                          <img src={student?.avatar} className="w-full h-full object-cover opacity-80" alt="" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">{student?.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">{grade.subject}</td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{grade.category}</span>
                      <p className="text-[9px] text-slate-400 font-medium">{new Date(grade.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-2 w-40">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-900 uppercase">
                          <span>{grade.score} / {grade.max_score}</span>
                          <span className="text-blue-600">{Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              percentage >= 90 ? "bg-blue-600" :
                              percentage >= 70 ? "bg-slate-700" : "bg-rose-500"
                            )} 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 uppercase tracking-widest",
                        percentage >= 60 ? "text-emerald-600 bg-emerald-50 border-l-2 border-emerald-500" : "text-rose-600 bg-rose-50 border-l-2 border-rose-500"
                      )}>
                        {percentage >= 60 ? 'Verified' : 'Flagged'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
