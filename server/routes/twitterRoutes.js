const express = require("express");
const Twitter = require("twitter-node-client").Twitter;

const db = require("../models");
const CONFIG = require("../config/twitterConfig.json");

const watson = require("../natural-lang-processing/nlpAPI.js");
const dbHelper = require("./helperFunctions/dbEntryHelpers.js");

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

function getMostRecentTweetId() {
  return new Promise((resolve, reject) => {
    Entries.findOne({
      where: {
        type: "tweet"
      },
      order: [["createdAt", "DESC"]]
    })
      .then(entry => {
        let tweet_id = entry.dataValues.source_id;
        resolve(tweet_id);
      })
      .catch(err => {
        resolve(null);
      });
  });
}

router.get("/update", (req, res) => {
  console.log(req);
  let configTwitter = {
    accessToken: req.session.oauthRequestToken,
    accessTokenSecret: req.session.oauthRequestTokenSecret,
    consumerKey: CONFIG.CONSUMER_KEY,
    consumerSecret: CONFIG.CONSUMER_SECRET,
    callBackUrl: "callBackURL"
  };
  let twitter = new Twitter(configTwitter);
  let screenName = req.session.screen_name;
  let user_id = req.user.id;

  getMostRecentTweetId()
    .then(tweetId => {
      let twitterQueryConfig = {
        screen_name: screenName,
        count: "5" //remove this when ready, otherwise only gets latest tweet.
      };
      if (tweetId !== null) {
        twitterQueryConfig.since_id = tweetId;
      }
      twitter.getUserTimeline(
        twitterQueryConfig,
        err => {
          res.send(err);
        },
        data => {
          let returnData = JSON.parse(data);
          returnData.forEach(tweetObj => {
            let tweetText = tweetObj.text;
            let tweetId = tweetObj.id_str;
            watson
              .analyze(tweetText)
              .then(data => {
                let nlpData = JSON.parse(data);
                let sentimentData = nlpData.sentiment.document;
                let emotionData = nlpData.emotion.document.emotion;

                Entries.create({
                  user_id: user_id,
                  text: tweetText,
                  sentimentScore: sentimentData.score,
                  sentimentLabel: sentimentData.label,
                  sadnessScore: emotionData.sadness,
                  fearScore: emotionData.fear,
                  angerScore: emotionData.anger,
                  joyScore: emotionData.joy,
                  disgustScore: emotionData.disgust,
                  type: "tweet",
                  source_id: tweetId
                })
                  .then(entry => {
                    let entry_id = entry.dataValues.id;
                    dbHelper
                      .enterKeywordsToDb(nlpData.keywords, entry_id, user_id)
                      .then(() => {
                        res.end();
                      })
                      .catch(err => {
                        res.send(err);
                      });
                  })
                  .catch(err => {
                    res.send(err);
                  });
              })
              .catch(err => {
                res.send(err);
              });
          });
          res.end();
        }
      );
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
