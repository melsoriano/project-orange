const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const cors = require("cors");
const request = require("request");
const TwitterTokenStrategy = require("passport-twitter-token");
const session = require("express-session");
const mongoose = require("./mongoose");
const twitterConfig = require("../config/twitterConfig");
const twitter = require("./helperFunctions/twitterUpdate.js");

mongoose();
const User = require("mongoose").model("User");

const app = express();
const router = express.Router();

// enable cors
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOption));

// passport
passport.use(
  new TwitterTokenStrategy(
    {
      consumerKey: twitterConfig.CONSUMER_KEY,
      consumerSecret: twitterConfig.CONSUMER_SECRET
    },
    function(token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, (err, user) => {
        return done(err, user);
      });
    }
  )
);

router.route("/twitter/reverse").post((req, res) => {
  request.post(
    {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: "http://localhost:3000/twitter-callback",
        consumer_key: twitterConfig.CONSUMER_KEY,
        consumer_secret: twitterConfig.CONSUMER_SECRET
      }
    },
    (err, r, body) => {
      if (err) {
        return res.status(500).send({ message: e.message });
      }

      const jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.route("/twitter").post(
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: twitterConfig.CONSUMER_KEY,
          consumer_secret: twitterConfig.CONSUMER_SECRET,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      },
      (err, r, body) => {
        console.log("BODY >>>>>>>>", body);
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        //user query string
        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);
        console.log(">>> CHECKING PARSED BODY >>>", parsedBody);

        req.body.oauth_token = parsedBody.oauth_token;
        req.body.oauth_token_secret = parsedBody.oauth_token_secret;
        req.body.user_id = parsedBody.user_id;
        req.body.screen_name = parsedBody.screen_name;

        next();
      }
    );
  },
  passport.authenticate("twitter-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("User Not Authenticated");
    }

    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  },
  updateTwitter,
  generateToken,
  sendToken
);

//token handling middleware
const authenticate = expressJwt({
  secret: twitterConfig.SESSIONS_SECRET,
  requestProperty: "auth",
  getToken: req => {
    console.log("hitting authenticate >>>", req.headers);
    if (req.headers["x-auth-token"]) {
      return req.headers["x-auth-token"];
    }
    return null;
  }
});

function createToken(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    twitterConfig.SESSIONS_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
}

function generateToken(req, res, next) {
  req.token = createToken(req.auth);
  return next();
}

function sendToken(req, res, next) {
  res.setHeader("x-auth-token", req.token);
  return res.status(200).send(JSON.stringify(req.user));
}

function getCurrentUser(req, res, next) {
  User.findById(req.auth.id, (err, user) => {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
}

function getOne(req, res) {
  const user = req.user.toObject();

  delete user.twitterProvider;
  delete user.__v;

  res.json(user);
}

function updateTwitter(req, res, next) {
  console.log("USER >>>>", req.session.passport);
  let twitterUpdateConfig = {
    accessToken: req.body.oauth_token,
    accessTokenSecret: req.body.oauth_token_secret,
    user_id: req.session.passport.user,
    screenName: req.body.screen_name
  };
  twitter
    .getRecentUserTweets(twitterUpdateConfig)
    .then(tweets => {
      console.log(
        "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@new tweet get!!!!!"
      );
      console.log(tweets);
      next();
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}

router.route("/twitter-callback").get(authenticate, getCurrentUser, getOne);

app.use(router);

module.exports = app;
