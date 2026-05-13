const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const crypto = require('crypto');
const pool = require('../config/db');
const sendEmail = require('../utils/email');

// REGISTER
const register = async (req, res) => {
    const { full_name, email, password, role, school_id } = req.body;

    try {
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const password_hash = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO users (school_id, full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role`,
            [school_id, full_name, email, password_hash, role]
        );

        const user = result.rows[0];
        const token = jwt.sign(
            { id: user.id, role: user.role, school_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        if (user.two_factor_enabled) {
            return res.status(200).json({ requiresTwoFactor: true, userId: user.id });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, school_id: user.school_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role }, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// SETUP 2FA
const setup2FA = async (req, res) => {
    const secret = speakeasy.generateSecret({ name: `SchoolSync (${req.user.email})` });

    await pool.query('UPDATE users SET two_factor_secret = $1 WHERE id = $2', [secret.base32, req.user.id]);

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);
    res.json({ qrCode, secret: secret.base32 });
};

// VERIFY 2FA
const verify2FA = async (req, res) => {
    const { userId, token } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    const verified = speakeasy.totp.verify({
        secret: user.two_factor_secret,
        encoding: 'base32',
        token,
    });

    if (!verified) return res.status(400).json({ message: 'Invalid 2FA code' });

    await pool.query('UPDATE users SET two_factor_enabled = true WHERE id = $1', [userId]);

    const jwtToken = jwt.sign(
        { id: user.id, role: user.role, school_id: user.school_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token: jwtToken });
};

// FORGOT PASSWORD
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
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
        });

        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
            [token]
        );
        const user = result.rows[0];

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const password_hash = await bcrypt.hash(password, 12);

        await pool.query(
            'UPDATE users SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2',
            [password_hash, user.id]
        );

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { register, login, setup2FA, verify2FA, forgotPassword, resetPassword };