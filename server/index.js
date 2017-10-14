const express = require('express');
const app = express();
const router = express.Router();

const db = require('./models');
const nlpRoute = require( './routes/nlp-route.js' );

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

const PORT = process.env.PORT || 3001;

app.use('/server', require('./watson/speechToTextAPI.js'));
app.use( '/entry/new', nlpRoute );

const server = app.listen(PORT, () => {
  db.sequelize.sync({force: true});
  console.log(`Server running on ${PORT}`);
});

module.exports = router;