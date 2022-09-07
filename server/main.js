const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const dotenv = require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const musicRouter = require('./routes/music');

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'bookbeats',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/music', musicRouter);

app.get('/api', (req, res) => {
  return res.status(200).json({ done: true });
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/* changes default behavior to "find first avaible port" in testing. This allows
multiple tests to be run in paralell on different ports */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, (req, res) => {
      console.log("Yay, express server is running on PORT 3000")
  })
}

module.exports = app;
