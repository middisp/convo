const express = require('express');

const messageRoutes = require('./routes/message');
const channelRoutes = require('./routes/channel');
const userRoutes = require('./routes/user');
const mongoConnect = require('./utils/database').mongoConnect;

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/public', express.static('public'));
app.use('/message', messageRoutes);
app.use('/channel', channelRoutes);
app.use('/user', userRoutes);

app.use('/', (req, res, next) => {
  res.render('index', {
    pageTitle: 'Welcome!'
  })
});

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, e => {
    if (e) { throw e }
    console.log('Server running on port 3000');
  });
});