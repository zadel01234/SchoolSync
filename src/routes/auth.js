const express = require('express');
const router = express.Router();
const {
  register, login, refreshToken, logout,
  setup2FA, verify2FA, forgotPassword, resetPassword,
  changePassword
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: |
 *     Handles user registration, login, token management, 2FA, and password reset.
 *
 *     **Token Flow:**
 *     1. Register or Login → receive `accessToken` (15 min) + `refreshToken` (7 days)
 *     2. Use `accessToken` in `Authorization: Bearer <token>` header for all protected routes
 *     3. When access token expires, call `/refresh` with your `refreshToken` to get a new pair
 *     4. On logout, the refresh token is invalidated in the database
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: |
 *       Creates a new user account. Do NOT provide a school_id here — it will be
 *       assigned automatically when you create your school via `POST /api/school`.
 *
 *       **Recommended registration flow:**
 *       1. Register here with name, email, password and role
 *       2. Use the returned `accessToken` to call `POST /api/school`
 *       3. You'll receive new tokens with your `school_id` embedded
 *       4. Use those new tokens for all future requests
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, password, role]
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Emmanuel Admin
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@schoolsync.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Admin1234!
 *               role:
 *                 type: string
 *                 enum: [super_admin, admin, teacher, parent]
 *                 example: admin
 *                 description: Use 'admin' for a new school administrator. school_id is assigned automatically after school setup.
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     description: |
 *       Authenticates a user. Returns `accessToken` + `refreshToken` on success.
 *
 *       If the user has 2FA enabled, returns `{ requiresTwoFactor: true, userId }` instead.
 *       In that case, call `/2fa/verify` with the OTP to complete login and receive tokens.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@schoolsync.com
 *               password:
 *                 type: string
 *                 example: Admin1234!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: |
 *       Use this endpoint when your `accessToken` has expired (you'll get a 401 with
 *       `"Access token expired. Please refresh."`).
 *
 *       Send your `refreshToken` here to receive a brand new `accessToken` and `refreshToken`.
 *       The old refresh token is invalidated immediately — always store the new one.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token received during login or registration
 *     responses:
 *       200:
 *         description: New token pair issued
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenPair'
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     description: |
 *       Invalidates the user's refresh token in the database. After this, the refresh token
 *       can no longer be used to get new access tokens. The current access token will still
 *       work until it expires (15 min), but no new ones can be issued.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: No token provided or invalid token
 */
router.post('/logout', authenticate, logout);

/**
 * @swagger
 * /api/auth/2fa/setup:
 *   post:
 *     summary: Set up Two-Factor Authentication
 *     description: |
 *       Generates a 2FA secret and QR code for the authenticated user.
 *       The user should scan the QR code with **Google Authenticator** or **Authy**.
 *       After scanning, they must call `/2fa/verify` to confirm setup and enable 2FA on their account.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR code and secret generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCode:
 *                   type: string
 *                   description: Base64 PNG data URL. Display this as an <img> for the user to scan.
 *                 secret:
 *                   type: string
 *                   description: Manual entry key if the user cannot scan the QR code.
 *       401:
 *         description: Unauthorized
 */
router.post('/2fa/setup', authenticate, setup2FA);

/**
 * @swagger
 * /api/auth/2fa/verify:
 *   post:
 *     summary: Verify a 2FA OTP code
 *     description: |
 *       Two uses:
 *       1. **Enable 2FA** — After setup, verify the first OTP to confirm 2FA is working. This enables 2FA on the account.
 *       2. **Complete login** — When login returns `requiresTwoFactor: true`, submit the OTP here to receive tokens.
 *
 *       OTP codes are time-based (TOTP) and expire every 30 seconds.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, token]
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The userId returned from the login response
 *               token:
 *                 type: string
 *                 example: "123456"
 *                 description: 6-digit OTP from Google Authenticator or Authy
 *     responses:
 *       200:
 *         description: 2FA verified — tokens issued
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenPair'
 *       400:
 *         description: Invalid 2FA code
 */
router.post('/2fa/verify', verify2FA);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     description: |
 *       Sends a password reset link to the user's email address.
 *       The link contains a secure token and is valid for **1 hour**.
 *       Use the token from the link in the `/reset-password` endpoint.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@schoolsync.com
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using token from email
 *     description: |
 *       Resets the user's password using the token received in the reset email.
 *       The token is valid for 1 hour and can only be used once.
 *       After a successful reset, the token is cleared from the database.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token from the reset email URL
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password', resetPassword);


/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change password
 *     description: |
 *       Allows an authenticated user to change their password.
 *       Requires the current password for verification.
 *
 *       **This is the endpoint teachers should use on first login**
 *       to replace their temporary password with a permanent one.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [current_password, new_password]
 *             properties:
 *               current_password:
 *                 type: string
 *                 example: x7k2m9pq
 *                 description: The temporary password received in the invitation email
 *               new_password:
 *                 type: string
 *                 minLength: 8
 *                 example: MyNewPassword123!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password incorrect or new password too short
 *       401:
 *         description: Unauthorized
 */
router.post('/change-password', authenticate, changePassword);


module.exports = router;
