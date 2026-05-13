/**
 * SchoolSync Core TypeScript Types
 */

// ---- User Roles ----
export type UserRole = "super_admin" | "school_admin" | "teacher" | "parent" | "student";

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---- School ----
export interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  type: "primary" | "secondary" | "both";
  currentSession: string;
  currentTerm: "first" | "second" | "third";
  isActive: boolean;
  createdAt: string;
}

// ---- Student ----
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: "male" | "female";
  admissionNumber: string;
  classId: string;
  className: string;
  sectionId?: string;
  parentId: string;
  avatar?: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  enrollmentDate: string;
  bloodGroup?: string;
  address?: string;
}

// ---- Class ----
export interface SchoolClass {
  id: string;
  name: string;
  section?: string;
  level: string;
  teacherId: string;
  studentCount: number;
}

// ---- Attendance ----
export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
  note?: string;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  percentage: number;
}

// ---- Fees ----
export type FeeStatus = "paid" | "partial" | "unpaid" | "overdue";

export interface FeeType {
  id: string;
  name: string;
  amount: number;
  term: string;
  session: string;
  classIds: string[];
  description?: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  feeTypeId: string;
  feeTypeName: string;
  amount: number;
  amountPaid: number;
  balance: number;
  status: FeeStatus;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  reference?: string;
}

// ---- Academics ----
export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  color?: string;
}

export interface TimetableEntry {
  id: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
  color?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  status: "pending" | "submitted" | "overdue" | "graded";
  attachments?: string[];
  totalMarks?: number;
  obtainedMarks?: number;
  createdAt: string;
}

export interface ExamResult {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  examType: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  term: string;
  session: string;
}

// ---- Notifications ----
export type NotificationPriority = "low" | "medium" | "high" | "urgent";
export type NotificationType = "announcement" | "alert" | "reminder" | "system";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  targetRoles?: UserRole[];
  targetUsers?: string[];
  createdBy: string;
  createdAt: string;
}

// ---- Events ----
export interface SchoolEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  endDate?: string;
  type: "exam" | "holiday" | "event" | "deadline" | "pta";
  isSchoolWide: boolean;
}

// ---- Dashboard Stats ----
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
  feeCollected: number;
  feeOutstanding: number;
  totalFees: number;
}

// ---- API Response ----
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ---- Auth ----
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  schoolName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeRole: UserRole | null;
  hasCompletedSetup: boolean;
  schoolName: string | null;
}

// ---- Navigation ----
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

// ---- Activity ----
export interface ActivityItem {
  id: string;
  type: "enrollment" | "payment" | "attendance" | "announcement" | "assignment" | "result";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  metadata?: Record<string, unknown>;
}
