const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const crypto = require('crypto');
const pool = require('../config/db');
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
  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await pool.query(
    'UPDATE users SET refresh_token = $1, refresh_token_expiry = $2 WHERE id = $3',
    [refreshToken, expiry, userId]
  );
};

// ─── Register ─────────────────────────────────────────────────────────────────

const register = async (req, res) => {
  const { full_name, email, password, role } = req.body; // removed school_id

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, role, school_id`,
      [full_name, email, password_hash, role] // no school_id inserted
    );

    const user = result.rows[0];
    const { accessToken, refreshToken } = generateTokens(user);
    await saveRefreshToken(user.id, refreshToken);

    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If 2FA is enabled, don't issue tokens yet — ask for OTP first
    if (user.two_factor_enabled) {
      return res.status(200).json({ requiresTwoFactor: true, userId: user.id });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    await saveRefreshToken(user.id, refreshToken);

    res.json({
      user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Refresh Token ────────────────────────────────────────────────────────────

const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Check token matches what's stored in DB
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND refresh_token = $2 AND refresh_token_expiry > NOW()',
      [decoded.id, token]
    );
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'Invalid or expired refresh token' });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    await saveRefreshToken(user.id, newRefreshToken);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────

const logout = async (req, res) => {
  try {
    await pool.query(
      'UPDATE users SET refresh_token = NULL, refresh_token_expiry = NULL WHERE id = $1',
      [req.user.id]
    );
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Setup 2FA ────────────────────────────────────────────────────────────────

const setup2FA = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({ name: `SchoolSync (${req.user.email})` });
    await pool.query('UPDATE users SET two_factor_secret = $1 WHERE id = $2', [secret.base32, req.user.id]);
    const qrCode = await qrcode.toDataURL(secret.otpauth_url);
    res.json({ qrCode, secret: secret.base32 });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Verify 2FA ───────────────────────────────────────────────────────────────

const verify2FA = async (req, res) => {
  const { userId, token } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'User not found' });

    const verified = speakeasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: 'base32',
      token,
    });

    if (!verified) return res.status(400).json({ message: 'Invalid 2FA code' });

    await pool.query('UPDATE users SET two_factor_enabled = true WHERE id = $1', [userId]);

    const { accessToken, refreshToken } = generateTokens(user);
    await saveRefreshToken(user.id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Forgot Password ──────────────────────────────────────────────────────────

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3',
      [resetToken, expiry, user.id]
    );

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: email,
      subject: 'SchoolSync Password Reset',
      html: `
        <p>Hi ${user.full_name},</p>
        <p>You requested a password reset. Click the link below to reset your password.</p>
        <p><a href="${resetUrl}">Reset My Password</a></p>
        <p>This link expires in <strong>1 hour</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Reset Password ───────────────────────────────────────────────────────────

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
      [token]
    );
    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    const password_hash = await bcrypt.hash(password, 12);

    await pool.query(
      'UPDATE users SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2',
      [password_hash, user.id]
    );

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login, refreshToken, logout, setup2FA, verify2FA, forgotPassword, resetPassword };
