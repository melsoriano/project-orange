const express = require('express');
const Twitter = require( 'twitter-node-client' ).Twitter;


const db = require('../models');
const config = require( '../config/twitterConfig.json' );

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

const twitter = new Twitter( config );



router.get( '/update', ( req, res ) => {
  let screenName = 'Oahu_DEM';
  //check what id of last tweet entered into db was.



  //get tweet timeline
  twitter.getUserTimeline({ screen_name: screenName, count: '10'},
    (err) => { //error handling branch
      res.send( err );
    },
    ( data ) => { //successful GET branch
      let returnData = JSON.parse( data );
        returnData.forEach( ( tweetObj ) => {   //for each tweet
          console.log( tweetObj.text );
            //send tweet text to watson
              //then create db entry
                //source_id is tweet's id_str
                //then for keywords of tweet
                  //run enterKeywordsToDb
        } );

      res.send( returnData );
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