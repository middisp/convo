const express = require('express');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const threadRoutes = require('./routes/thread');
const mongoConnect = require('./utils/database').mongoConnect;
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());

// JWT Middleware, look for header?

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/login', authRoutes);
app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/thread', threadRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({ message, statusCode });
})

mongoConnect(() => {
  app.listen(3001, e => {
    if (e) { throw e }
    console.log('Server running on port 3000');
  });
});