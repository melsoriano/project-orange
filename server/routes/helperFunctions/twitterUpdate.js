const Twitter = require("twitter-node-client").Twitter;

const db = require("../../models");
const CONFIG = require("../../config/twitterConfig.json");

const watson = require("../../natural-lang-processing/nlpAPI.js");
const dbHelper = require("./dbEntryHelpers.js");

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

function getRecentUserTweets(userInfoObj) {
  return new Promise(function(resolve, reject) {
    let configTwitter = {
      accessToken: userInfoObj.accessToken,
      accessTokenSecret: userInfoObj.accessTokenSecret,
      consumerKey: CONFIG.CONSUMER_KEY,
      consumerSecret: CONFIG.CONSUMER_SECRET,
      callBackUrl: "callBackURL"
    };
    let twitter = new Twitter(configTwitter);
    let screenName = userInfoObj.screenName;
    let user_id = userInfoObj.user_id;

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
            console.log(err);
          },
          data => {
            let returnData = JSON.parse(data);
            returnData.forEach(tweetObj => {
              let tweetText = tweetObj.text;
              let tweetId = tweetObj.id_str;
              let tweetCreatedAt = tweetObj.created_at;
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
                    source_id: tweetId,
                    createdAt: tweetCreatedAt
                  })
                    .then(entry => {
                      let entry_id = entry.dataValues.id;
                      dbHelper
                        .enterKeywordsToDb(nlpData.keywords, entry_id, user_id)
                        .then(() => {
                          resolve();
                        })
                        .catch(err => {
                          console.log(err);
                          reject(err);
                        });
                    })
                    .catch(err => {
                      console.log(err);
                      reject(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                  reject(err);
                });
            });
            resolve();
          }
        );
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = {
  getRecentUserTweets
};
// // feed it
// {
//   accessToken: req.session.oauthRequestToken,
//   accessTokenSecret: req.session.oauthRequestTokenSecret,
//   user_id: req.user.id,
//   screenName: req.session.screen_name
// }