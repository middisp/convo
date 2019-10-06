const express = require('express');
const apiRoutes = require('./server/routes/routes');
const clientRoutes = require('./client/routes/routes');

const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use('/api', apiRoutes);
app.use('/', clientRoutes);

app.listen(3000, e => {
  if (e) { throw e }
  console.log('Server running on port 3000');
});