const express = require('express');
const bp = require( 'body-parser' );
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const db = require('./models');
const nlpRoute = require( './routes/nlp-route.js' );
const userRoute = require( './routes/user-routes.js' );
const CONFIG = require('./config/config.json');
const getEntriesRoutes = require( './routes/entriesRoutes.js' );
const getEntryRoutes = require( './routes/entryRoutes.js' );
const oauthRoute = require('./routes/oauth.js');

const Entry = db.entries;
const Keyword = db.keywords;
const User = db.users;

const PORT = process.env.PORT || 3001;
const app = express();


app.use( bp.json() );
app.use(bp.urlencoded());

app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SESSION_SECRET,
  name: 'orange_sessions',
  cookie: {
    maxAge: 10000000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      if (user !== null) {
        bcrypt.compare(password, user.password).then(result => {
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'username or password incorrect!' });
          }
        }).catch(err => console.log(err));
      } else {
        throw 'user not found!';
      }
    }).catch(err => {
      return done(null, false, { message: 'username or password incorrect!'});
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.find({
    where: {
      id: userId
    }
  }).then(user => {
    return done(null, {
      id: user.id,
      username: user.username
    });
  }).catch(err => {
    done(err, user);
  });
});

app.use( '/user/entry/new', nlpRoute );
app.use( '/user/entries', getEntriesRoutes );
app.use( '/user/entry', getEntryRoutes );

app.use('/recording', require('./watson/speechToTextAPI.js'));
app.use( '/entry/new', nlpRoute );
app.use( '/', userRoute );
app.use( '/sessions', oauthRoute );


const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server running on ${PORT}`);
});
