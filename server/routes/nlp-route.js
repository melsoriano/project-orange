const express = require('express');
const watson = require(  '../natural-lang-processing/nlpAPI.js' );

const db = require('../models');

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;


function enterKeywordsToDb( keywordArray, entry_id, user_id ){
  return new Promise( function( resolve, reject ){
    function insertKeywordInDb( keywordArray, keywordCount ){

      if(  keywordCount >= keywordArray.length ){
        resolve();
      } else {
        let keyword = keywordArray[ keywordCount ];
        console.log( keywordCount, "keyword", keyword );

        Keywords.create( {
          keyword: keyword.text,
          sentimentScore: keyword.sentiment.score,
          relevanceScore: keyword.relevance,
          sadnessScore: keyword.emotion.sadness,
          fearScore: keyword.emotion.fear,
          angerScore: keyword.emotion.anger,
          joyScore: keyword.emotion.joy,
          disgustScore: keyword.emotion.disgust,
          entry_id: entry_id,
          user_id: user_id
        } )
          .then( ()=> {
            insertKeywordInDb( keywordArray, ++keywordCount );
          } )
          .catch( ( err ) => {
            return err;
          } );

      }
    }
    insertKeywordInDb( keywordArray, 0 );

  } );
}

router.post( '/', ( req, res ) => {
  let textEntry = req.body.text;
//  let user_id = req.body.userId;
  let user_id = null;
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
//    let nlpData = JSON.parse( data );
    let nlpData = data;

    let sentimentData = nlpData.sentiment.document;
    let emotionData = nlpData.emotion.document.emotion;
    Entries.create( {
      user_id: user_id, //change later to user_id
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
      console.log( "nlpData.keywords", nlpData.keywords );
      let entry_id = entry.dataValues.id;

      //create entry of keywords.
      enterKeywordsToDb( nlpData.keywords, entry_id, user_id )
        .then( ()=> {
          console.log( 'tihs should be at end' );

        } )
        .catch( ( err ) => {
          res.send( err );
        } );


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