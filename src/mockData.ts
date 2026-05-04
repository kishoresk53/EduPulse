import { Student, AttendanceRecord, Grade } from './types';

export const mockStudents: Student[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.j@school.edu', grade_level: 'Grade 10', status: 'active', join_date: '2025-09-01', attendance_percentage: 95, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '2', name: 'Sophie Miller', email: 'sophie.m@school.edu', grade_level: 'Grade 11', status: 'active', join_date: '2024-09-01', attendance_percentage: 98, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '3', name: 'Marcus Chen', email: 'marcus.c@school.edu', grade_level: 'Grade 10', status: 'active', join_date: '2025-09-01', attendance_percentage: 92, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena.r@school.edu', grade_level: 'Grade 12', status: 'inactive', join_date: '2023-09-01', attendance_percentage: 85, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '5', name: 'David Smith', email: 'david.s@school.edu', grade_level: 'Grade 11', status: 'active', join_date: '2024-09-01', attendance_percentage: 96, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

export const mockGrades: Grade[] = [
  { id: 'g1', student_id: '1', subject: 'Mathematics', score: 92, max_score: 100, date: '2026-04-15', category: 'exam' },
  { id: 'g2', student_id: '1', subject: 'Science', score: 88, max_score: 100, date: '2026-04-18', category: 'quiz' },
  { id: 'g3', student_id: '2', subject: 'English', score: 95, max_score: 100, date: '2026-04-12', category: 'project' },
  { id: 'g4', student_id: '3', subject: 'Mathematics', score: 78, max_score: 100, date: '2026-04-15', category: 'exam' },
];
