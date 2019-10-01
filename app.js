const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use('/api', apiRoutes);

app.listen(3000, e => {
  if (e) { throw e }
  console.log('Server running on port 3000');
});