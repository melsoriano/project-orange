const express = require('express');
const watson = require(  '../natural-lang-processing/nlpAPI.js' );

const db = require('../models');

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.post( '/', ( req, res ) => {
  let textEntry = req.body.text;
  let user_id = req.body.userId;
  let entryType = req.body.type;
  //receive json containing finalized text
  console.log( textEntry );

  //validate input somehow.
/*  if( typeof textEntry !== "string" ){
    console.log( 'invalid input' );
    res.end();
  }*/

  //send to nlp

  watson.analyze( textEntry )
  .then( ( data ) => {
    let nlpData = JSON.parse( data );
  //receive nlp data
    console.log( nlpData );
  //create db record of entry
    let sentimentData = nlpData.sentiment.document;
    let emotionData = nlpData.emotion.document.emotion;
    Entries.create( {
      user_id: null, //change later to user_id
      text: textEntry,
      sentimentScore: sentimentData.score,
      sentimentLabel: sentimentData.label,
      sadnessScore: emotionData.sadness,
      fearScore: emotionData.fear,
      angerScore: emotionData.anger,
      joyScore: emotionData.joy,
      disgustScore: emotionData.disgust,
      type: entryType,
      source_id: null

    } )
    .then( ( entry ) => {
      console.log( entry );
      //create entry of keywords.

      //query database for entry( this entry ) + keywords

      //return entry as json.


      res.send();
    } )
    .catch( ( err ) => {
      console.log( err );
      res.send( err );
    } );
  } )
  .catch( ( err ) => {
    console.log( err );
    res.send( err );
  } );
} );


module.exports = router;