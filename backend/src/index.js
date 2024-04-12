const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Response = require('./utils/response.js');
const HttpStatus = require('./utils/httpStatus.js');
const userRouter = require('./routes/user.route.js');
const loginRouter = require('./routes/login.route.js');

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/login', loginRouter);
app.use('/users', userRouter);

// Default route
app.get('/', (req, res) => {
  res.send(
    new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Server is running')
  );
});

// Route not found
app.all('*', (req, res) => {
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        'Route does not exists'
      )
    );
});

module.exports = app;
