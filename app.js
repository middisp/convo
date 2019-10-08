const express = require('express');

const messageRoutes = require('./server/routes/message');
const channelRoutes = require('./server/routes/channel');
const userRoutes = require('./server/routes/user');
const mongoConnect = require('./server/utils/database').mongoConnect;

const errorController = require('./server/controllers/error');

const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/message', messageRoutes);
app.use('/channel', channelRoutes);
app.use('/user', userRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, e => {
    if (e) { throw e }
    console.log('Server running on port 3000');
  });
});