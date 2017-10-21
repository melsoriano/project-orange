const express = require('express');
const Twitter = require( 'twitter-node-client' ).Twitter;

const db = require('../models');
const config = require( '../config/twitterConfig.json' );

const watson = require(  '../natural-lang-processing/nlpAPI.js' );
const dbHelper = require( './helperFunctions/dbEntryHelpers.js' );

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

const twitter = new Twitter( config );



router.get( '/update/:user_id', ( req, res ) => {
  let screenName = 'Oahu_DEM';
  //check what id of last tweet entered into db was.

  //let user_id = req.params.user_id;
  let user_id = null;
  console.log( 'user id', user_id );

  //get tweet timeline
  //limit to those since last update
  twitter.getUserTimeline({ screen_name: screenName, count: '1'},
    (err) => { //error handling branch
      res.send( err );
    },
    ( data ) => { //successful GET branch
      let returnData = JSON.parse( data );

      returnData.forEach( ( tweetObj ) => {   //for each tweet
        let tweetText = tweetObj.text;
        let tweetId = tweetObj.id_str;
          //send tweet text to watson
        watson.analyze( tweetText )
          .then( ( data ) => {
            console.log( data );

            //then create db entry



            let nlpData = JSON.parse( data );

            let sentimentData = nlpData.sentiment.document;
            let emotionData = nlpData.emotion.document.emotion;
              //source_id is tweet's id_str
            Entries.create( {
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

            } )
            .then( ( entry ) => {
              let entry_id = entry.dataValues.id;

              //then for keywords of tweet
                //run enterKeywordsToDb
              dbHelper.enterKeywordsToDb( nlpData.keywords, entry_id, user_id )
                .then( ()=> {
                  res.send( entry );
                } )
                .catch( ( err ) => {
                  console.log( 'keyword error@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', err);
                  res.send( err );
                } );
            } )
            .catch( ( err ) => {
              console.log( 'entry error@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', err);
               res.send( err );
            } );




          } )
          .catch( ( err ) => {

          } );
      } );
    }
  );
} );

module.exports = router;

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