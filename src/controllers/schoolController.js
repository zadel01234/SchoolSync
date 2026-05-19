const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');

// ─── Token Helpers ────────────────────────────────────────────────────────────

const generateTokens = (user) => {
  const payload = { id: user.id, role: user.role, school_id: user.school_id };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId, refreshToken) => {
  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await pool.query(
    'UPDATE users SET refresh_token = $1, refresh_token_expiry = $2 WHERE id = $3',
    [refreshToken, expiry, userId]
  );
};

// ─── Create School ────────────────────────────────────────────────────────────

const createSchool = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const existing = await pool.query('SELECT id FROM schools WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'School already registered' });
    }

    const result = await pool.query(
      `INSERT INTO schools (name, email, phone, address)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, address]
    );

    const school = result.rows[0];

    await pool.query('UPDATE users SET school_id = $1 WHERE id = $2', [school.id, req.user.id]);

    // Issue new tokens with school_id now baked in
    const updatedUser = { id: req.user.id, role: req.user.role, school_id: school.id };
    const { accessToken, refreshToken } = generateTokens(updatedUser);
    await saveRefreshToken(req.user.id, refreshToken);

    res.status(201).json({ school, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Get School ───────────────────────────────────────────────────────────────

const getSchool = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schools WHERE id = $1', [req.user.school_id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'School not found' });
    res.json({ school: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Update School ────────────────────────────────────────────────────────────

const updateSchool = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const result = await pool.query(
      `UPDATE schools SET name = $1, email = $2, phone = $3, address = $4
       WHERE id = $5 RETURNING *`,
      [name, email, phone, address, req.user.school_id]
    );

    if (!result.rows[0]) return res.status(404).json({ message: 'School not found' });

    res.json({ school: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Invite Staff ─────────────────────────────────────────────────────────────

const inviteStaff = async (req, res) => {
  const { full_name, email, role } = req.body;

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const password_hash = await bcrypt.hash(tempPassword, 12);

    const result = await pool.query(
      `INSERT INTO users (school_id, full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role`,
      [req.user.school_id, full_name, email, password_hash, role]
    );

    await sendEmail({
      to: email,
      subject: 'You have been invited to SchoolSync',
      html: `
        <p>Hi ${full_name},</p>
        <p>You have been invited to join SchoolSync as a <strong>${role}</strong>.</p>
        <p>Your temporary password is: <strong>${tempPassword}</strong></p>
        <p>Please log in and change your password immediately.</p>
        <p><a href="${process.env.CLIENT_URL}/login">Login here</a></p>
      `,
    });

    res.status(201).json({
      message: 'Staff invited successfully',
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Get All Staff ────────────────────────────────────────────────────────────

const getStaff = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, role, is_verified, created_at
       FROM users WHERE school_id = $1 AND role != 'parent'
       ORDER BY created_at DESC`,
      [req.user.school_id]
    );
    res.json({ staff: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createSchool, getSchool, updateSchool, inviteStaff, getStaff };
