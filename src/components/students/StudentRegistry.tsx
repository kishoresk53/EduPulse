import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus,
  X
} from 'lucide-react';
import { mockStudents as initialStudents } from '../../mockData';
import { cn } from '../../lib/utils';
import { Student } from '../../types';

export const StudentRegistry: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyCheck, setDailyCheck] = useState<Record<string, boolean>>({});
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    grade_level: 'Grade 10',
  });

  const toggleDailyCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDailyCheck(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: (students.length + 1).toString(),
      name: newStudent.name,
      email: newStudent.email,
      grade_level: newStudent.grade_level,
      status: 'active',
      join_date: new Date().toISOString().split('T')[0],
      attendance_percentage: 100,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000000)}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
    };

    setStudents([student, ...students]);
    setIsModalOpen(false);
    setNewStudent({ name: '', email: '', grade_level: 'Grade 10' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Student Directory</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Registry of active academic profiles</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-none text-xs font-bold tracking-[0.2em] transition-all"
        >
          <UserPlus className="w-4 h-4" />
          ENROLL STUDENT
        </button>
      </div>

      {/* Enrollment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md border border-slate-200 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">New Enrollment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEnroll} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="e.g. John Smith"
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-slate-900 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Email</label>
                <input 
                  required
                  type="email" 
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="j.smith@school.edu"
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-slate-900 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classification</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-slate-900 outline-none"
                  value={newStudent.grade_level}
                  onChange={(e) => setNewStudent({...newStudent, grade_level: e.target.value})}
                >
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 text-xs font-bold tracking-[0.2em] hover:bg-slate-800 transition-all uppercase">
                Confirm Enrollment
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-none">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
            <input 
              type="text" 
              placeholder="SEARCH REGISTRY..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-none text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-slate-900 outline-none placeholder:text-slate-300"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identification</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classification</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Daily Check</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">{student.name}</span>
                        <div className="text-[10px] text-slate-400 font-medium">UID: {student.id.padStart(6, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter bg-slate-100 px-2 py-0.5">{student.grade_level}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                      {new Date(student.join_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[10px] text-slate-800 font-bold uppercase tracking-widest">
                      {student.attendance_percentage}%
                    </div>
                    <div className="w-16 h-1 bg-slate-100 mt-1">
                      <div 
                        className={cn(
                          "h-full",
                          (student.attendance_percentage || 0) >= 90 ? "bg-emerald-500" : "bg-amber-500"
                        )} 
                        style={{ width: `${student.attendance_percentage}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={(e) => toggleDailyCheck(student.id, e)}
                      className={cn(
                        "w-10 h-10 rounded-none border transition-all flex items-center justify-center group/btn active:scale-95",
                        dailyCheck[student.id] ? "bg-slate-900 border-slate-900" : "border-slate-200 hover:bg-slate-50"
                      )}
                      title="MARK TODAY"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-none border transition-all flex items-center justify-center",
                        dailyCheck[student.id] ? "border-white bg-white" : "border-slate-300 group-hover/btn:border-slate-900"
                      )}>
                        {dailyCheck[student.id] && (
                          <div className="w-2 h-2 bg-slate-900" />
                        )}
                      </div>
                    </button>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1",
                      student.status === 'active' 
                        ? "bg-emerald-50 text-emerald-600 border-l-2 border-emerald-500" 
                        : "bg-slate-100 text-slate-400 border-l-2 border-slate-300"
                    )}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

