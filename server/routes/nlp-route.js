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
  let user_id = null; //change this once users exist.
  let entryType = req.body.type;
  //receive json containing finalized text

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
      user_id: user_id,
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
      console.log( "@@@@@@@@@@@@", entry );
      let entry_id = entry.dataValues.id;

      //create entry of keywords.
      enterKeywordsToDb( nlpData.keywords, entry_id, user_id )
        .then( ()=> {
          console.log( "$$$$$$$$$$$$$$$$ back from keywords" );
      //query database for entry( this entry ) + keywords
          Entries.findOne( {
            where: {
              id: entry_id
            },
            include: [
              {
                model: Keywords
              }
            ]
          } )
          .then( ( entry ) => {
            console.log( "#############from DB",entry );
      //return entry as json.
            res.send( entry );
          } )
          .catch( ( err ) => {
            res.send( err );
          } );

          //change data source and api back to normal before pull request.


        } )
        .catch( ( err ) => {
          res.send( err );
        } );

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