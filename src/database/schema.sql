-- ─── SCHOOLS ──────────────────────────────────────────────────────────────────
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ─── USERS ────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('super_admin', 'admin', 'teacher', 'parent')),
  is_verified BOOLEAN DEFAULT FALSE,
  -- 2FA
  two_factor_secret VARCHAR(255),
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  -- Password reset
  reset_token VARCHAR(255),
  reset_token_expiry TIMESTAMP,
  -- Refresh token
  refresh_token TEXT,
  refresh_token_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ─── CLASSES ──────────────────────────────────────────────────────────────────
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  grade_level VARCHAR(50),
  teacher_id UUID REFERENCES users(id)
);

-- ─── STUDENTS ─────────────────────────────────────────────────────────────────
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id),
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  photo_url TEXT,
  parent_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ─── ATTENDANCE ───────────────────────────────────────────────────────────────
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id),
  date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('present', 'absent', 'late', 'excused')),
  marked_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ─── FEE STRUCTURES ───────────────────────────────────────────────────────────
CREATE TABLE fee_structures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  term VARCHAR(50),
  academic_year VARCHAR(20)
);

-- ─── FEE INVOICES ─────────────────────────────────────────────────────────────
CREATE TABLE fee_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  fee_structure_id UUID REFERENCES fee_structures(id),
  amount_due NUMERIC(10,2) NOT NULL,
  amount_paid NUMERIC(10,2) DEFAULT 0,
  due_date DATE,
  status VARCHAR(20) CHECK (status IN ('unpaid', 'partial', 'paid'))
);

-- ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  posted_by UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
