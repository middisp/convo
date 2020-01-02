const express = require('express');
const session = require('express-session');

const messageRoutes = require('./routes/message');
const channelRoutes = require('./routes/channel');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const mongoConnect = require('./utils/database').mongoConnect;

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

app.use('/public', express.static('public'));
app.use('/message', messageRoutes);
app.use('/channel', channelRoutes);
app.use('/user', userRoutes);

app.use('/login', authRoutes);

app.use('/', (req, res, next) => {
  res.render('index', {
    pageTitle: 'Welcome!'
  })
});

app.use(errorController.get404);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({ message });
})

mongoConnect(() => {
  app.listen(3000, e => {
    if (e) { throw e }
    console.log('Server running on port 3000');
  });
});