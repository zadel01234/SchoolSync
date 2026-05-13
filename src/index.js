require('dotenv').config();
const express = require('express');
const app = express();
const redisClient = require('./config/redis');

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('SchoolSync API is running');
});

redisClient.connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;