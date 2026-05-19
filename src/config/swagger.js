const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SchoolSync API',
      version: '1.0.0',
      description: `
## SchoolSync API Documentation

SchoolSync is a school management platform. This API powers authentication, school setup, staff management, student enrollment, attendance, fees, and more.

### Authentication
This API uses **JWT Access + Refresh Tokens**.
- **Access Token** — short-lived (15 minutes). Send in every request as \`Authorization: Bearer <token>\`.
- **Refresh Token** — long-lived (7 days). Send to \`/api/auth/refresh\` to get a new access token when it expires.

### Roles
| Role | Permissions |
|------|------------|
| \`super_admin\` | Full system access |
| \`admin\` | Manage their own school |
| \`teacher\` | Manage classes, attendance, grades |
| \`parent\` | View their child's data |
      `,
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local Development' },
      { url: 'https://schoolsync-xy5a.onrender.com', description: 'Staging' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your access token here',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            full_name: { type: 'string', example: 'Emmanuel Admin' },
            email: { type: 'string', format: 'email', example: 'admin@schoolsync.com' },
            role: { type: 'string', enum: ['super_admin', 'admin', 'teacher', 'parent'] },
          },
        },
        School: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Greenfield Academy' },
            email: { type: 'string', example: 'info@greenfield.com' },
            phone: { type: 'string', example: '08012345678' },
            address: { type: 'string', example: '123 Lagos Street, Lagos' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        TokenPair: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', description: 'Short-lived JWT (15 min). Use in Authorization header.' },
            refreshToken: { type: 'string', description: 'Long-lived JWT (7 days). Use to get a new access token.' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
