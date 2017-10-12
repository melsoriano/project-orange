const express = require('express');
const app = express();

const db = require('./models');
const Recordings = db.recordings;

const PORT = process.env.PORT || 3001;

app.use('/', require('./api'));

const server = app.listen(PORT, () => {
  db.sequelize.sync({force: true});
  console.log(`Server running on ${PORT}`);
});