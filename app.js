const express = require('express');
const messagesRoutes = require('./server/routes/message');

// DB
const mongoConnect = require('./server/utils/database').mongoConnect;

const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use('/messages', messagesRoutes);
//app.use('/', clientRoutes);

mongoConnect(() => {
  app.listen(3000, e => {
    if (e) { throw e }
    console.log('Server running on port 3000');
  });
});