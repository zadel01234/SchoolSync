require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const redisClient = require('./config/redis');

const app = express();
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://schoolsync-xy5a.onrender.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/school');

app.use('/api/auth', authRoutes);
app.use('/api/school', schoolRoutes);

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('SchoolSync API is running');
});

redisClient.connect().catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api/docs`);
});

module.exports = app;
