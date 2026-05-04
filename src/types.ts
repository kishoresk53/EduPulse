/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  email: string;
  grade_level: string;
  status: 'active' | 'inactive';
  avatar?: string;
  join_date: string;
  attendance_percentage?: number;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string;
  status: AttendanceStatus;
}

export interface Grade {
  id: string;
  student_id: string;
  subject: string;
  score: number;
  max_score: number;
  date: string;
  category: 'exam' | 'quiz' | 'homework' | 'project';
}

export interface DashboardStats {
  totalStudents: number;
  averageAttendance: number;
  averageGrade: number;
  pendingRequests: number;
}
