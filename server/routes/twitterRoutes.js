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

router.get("/update/:user_id", (req, res) => {
  let configTwitter = {
    accessToken: req.session.oauthRequestToken,
    accessTokenSecret: req.session.oauthRequestTokenSecret,
    consumerKey: CONFIG.CONSUMER_KEY,
    consumerSecret: CONFIG.CONSUMER_SECRET,
    callBackUrl: "callBackURL"
  };
  let twitter = new Twitter(configTwitter);
  //input should be user_id( for db input), token and secret?
  //how get screenName?  possibly through session.
  //let screenName = "honolulupulse";
  let screenName = req.session.screen_name;
  //let user_id = req.params.user_id;
  let user_id = null;

  getMostRecentTweetId()
    .then(tweetId => {
      let twitterQueryConfig = {
        screen_name: screenName,
        count: "1" //remove this when ready, otherwise only gets latest tweet.
      };
      if (tweetId !== null) {
        twitterQueryConfig.since_id = tweetId;
      }
      twitter.getUserTimeline(
        twitterQueryConfig,
        err => {
          //error handling branch
          res.send(err);
        },
        data => {
          //successful GET branch
          let returnData = JSON.parse(data);

          returnData.forEach(tweetObj => {
            //for each tweet
            let tweetText = tweetObj.text;
            let tweetId = tweetObj.id_str;
            //send tweet text to watson
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

                    //then for keywords of tweet
                    //run enterKeywordsToDb
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

/*createdAt is time tweet was made.
set up so it only processes new tweets.*/

/*


app.get( '/', ( req, res ) => {
  twitter.getUserTimeline({ screen_name: 'vagueGreenColor', count: '10'}, (err) => {
    res.send( err );
  }, ( data ) => {
    let returnData = JSON.parse( data );
    res.send( returnData );
  } );

} );
*/

/*  ontime( {
    cycle: '03:01:00' //change this to time of day to run.  can modify from once a day.
  }, function (ot) {
    //make a function that does below stuff and run it here.
      //cycle through users
      //for each user
        //get tweet timeline
          //for each tweet
            //send tweet text to watson
              //then create db entry
                //source_id is tweet's id_str
                //then for keywords of tweet
                  //run enterKeywordsToDb
    ot.done();
    return;
  } );*/
