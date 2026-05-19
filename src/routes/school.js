const express = require('express');
const router = express.Router();
const { createSchool, getSchool, updateSchool, inviteStaff, getStaff } = require('../controllers/schoolController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: School
 *   description: |
 *     School setup and staff management.
 *
 *     **Setup flow:**
 *     1. Admin registers → receives tokens (school_id is null at this point)
 *     2. Admin calls `POST /api/school` to create their school
 *     3. Response includes **new tokens** with school_id baked in — replace your old tokens with these
 *     4. All subsequent requests use the new tokens
 */

/**
 * @swagger
 * /api/school:
 *   post:
 *     summary: Create a new school
 *     description: |
 *       Creates a school and links it to the authenticated admin.
 *
 *       **Important:** This response includes fresh `accessToken` and `refreshToken` with
 *       the new `school_id` embedded. You must replace your current tokens with these —
 *       your old tokens have `school_id: null` and will fail on all school-specific routes.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Greenfield Academy
 *               email:
 *                 type: string
 *                 example: info@greenfield.com
 *               phone:
 *                 type: string
 *                 example: "08012345678"
 *               address:
 *                 type: string
 *                 example: 123 Lagos Street, Lagos
 *     responses:
 *       201:
 *         description: School created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 school:
 *                   $ref: '#/components/schemas/School'
 *                 accessToken:
 *                   type: string
 *                   description: New access token with school_id — replace your old one
 *                 refreshToken:
 *                   type: string
 *                   description: New refresh token — replace your old one
 *       400:
 *         description: School already registered
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied — admin or super_admin role required
 */
router.post('/', authenticate, authorize('admin', 'super_admin'), createSchool);

/**
 * @swagger
 * /api/school:
 *   get:
 *     summary: Get current school details
 *     description: |
 *       Returns the school linked to the authenticated user's `school_id`.
 *       Requires a token that has `school_id` set (i.e. the token returned after `POST /api/school`).
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: School details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 school:
 *                   $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, getSchool);

/**
 * @swagger
 * /api/school:
 *   put:
 *     summary: Update school details
 *     description: Updates the name, email, phone, or address of the school.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Greenfield Academy Updated
 *               email:
 *                 type: string
 *                 example: info@greenfield.com
 *               phone:
 *                 type: string
 *                 example: "08098765432"
 *               address:
 *                 type: string
 *                 example: 456 Abuja Street, Abuja
 *     responses:
 *       200:
 *         description: School updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 school:
 *                   $ref: '#/components/schemas/School'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.put('/', authenticate, authorize('admin', 'super_admin'), updateSchool);

/**
 * @swagger
 * /api/school/invite:
 *   post:
 *     summary: Invite a staff member
 *     description: |
 *       Creates a new user account for a staff member and sends them an invitation email
 *       with a temporary password. The staff member should log in and change their password immediately.
 *
 *       Only admins and super_admins can invite staff. The invited user is automatically
 *       linked to the admin's school.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, role]
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Mrs. Adaeze Obi
 *               email:
 *                 type: string
 *                 example: adaeze@greenfield.com
 *               role:
 *                 type: string
 *                 enum: [teacher, admin]
 *                 example: teacher
 *     responses:
 *       201:
 *         description: Staff invited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.post('/invite', authenticate, authorize('admin', 'super_admin'), inviteStaff);

/**
 * @swagger
 * /api/school/staff:
 *   get:
 *     summary: Get all staff members
 *     description: |
 *       Returns all users (admins and teachers) linked to the current school.
 *       Parents are excluded from this list.
 *       Results are ordered by most recently added.
 *     tags: [School]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 staff:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get('/staff', authenticate, authorize('admin', 'super_admin'), getStaff);

module.exports = router;
