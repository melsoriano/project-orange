const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const inspect = require("util-inspect");
const OAuth = require("oauth").OAuth;

const app = express();

const CONFIG = require("../config/twitterConfig.json");
const twitter = require("./helperFunctions/twitterUpdate.js");

const configOAuth = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  CONFIG.CONSUMER_KEY,
  CONFIG.CONSUMER_SECRET,
  "1.0",
  "http://127.0.0.1:3001/twitterlogin/callback",
  "HMAC-SHA1"
);

app.use(cookieParser());
app.use(
  session({
    secret: CONFIG.SESSIONS_SECRET,
    name: "twitter_sessions",
    resave: false,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get("/connect", (req, res) => {
  configOAuth.getOAuthRequestToken(
    (error, oauthToken, oauthTokenSecret, results) => {
      if (error) {
        res
          .status(500)
          .send(`Error getting OAuth request token ${inspect(error)}`);
      } else {
        req.session.oauthRequestToken = oauthToken;
        req.session.oauthRequestTokenSecret = oauthTokenSecret;
        res.redirect(
          "https://twitter.com/oauth/authorize?oauth_token=" +
            req.session.oauthRequestToken
        );
      }
    }
  );
});

app.get("/callback", (req, res) => {
  configOAuth.getOAuthAccessToken(
    req.session.oauthRequestToken,
    req.session.oauthRequestTokenSecret,
    req.query.oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        res
          .status(500)
          .send(
            `Error getting OAuth access token: [Error: ${inspect(
              error
            )}] [Access Token: ${oauthAccessToken}] [Token Secret: ${oauthAccessTokenSecret}] [Result:${inspect(
              results
            )}]`
          );
      } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        res.redirect("/home");
      }
    }
  );
});

app.get("/home", (req, res) => {
  configOAuth.get(
    "https://api.twitter.com/1.1/account/verify_credentials.json",
    req.session.oauthAccessToken,
    req.session.oauthAccessTokenSecret,
    (error, data, response) => {
      if (error) {
        res.redirect("/connect");
      } else {
        //let parsedData = JSON.parse(data);
        //res.send(`You are logged in as ${parsedData.screen_name}`);

        let twitterUpdateConfig = {
          accessToken: req.session.oauthRequestToken,
          accessTokenSecret: req.session.oauthRequestTokenSecret,
          user_id: req.user.id,
          screenName: req.session.screen_name
        };
        twitter
          .getRecentUserTweets(twitterUpdateConfig)
          .then(() => {
            res.redirect("/user/entries/twitter");
          })
          .catch(err => {
            console.log(err);
            res.send(err);
          });
      }
    }
  );
});

app.get("*", (req, res) => {
  res.redirect("/home");
});

module.exports = app;
