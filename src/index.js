const express = require('express');
const app = express();
const redisClient = require('./config/redis');
redisClient.connect();

app.get('/', (req, res) => {
  res.send('SchoolSync API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

module.exports = app;