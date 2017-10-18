const express = require('express');

const db = require('../models');

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.get( '/all', ( req, res ) => {

  Entries.findAll( {
    where: {
    },
    include: [
      {
        model: Keywords
      }
    ]
  } )
    .then( ( entries ) => {
      res.send( entries );
    } )
    .catch( ( err ) => {
      res.send( err );
    } );
} );

function isDuplicateKeyword( keyword, keywordArray ){
  let index = -1;
  for( var i = 0; i < keywordArray.length; i++ ){
    let keywordFromArray = keywordArray[ i ].keyword;
    if( keyword ===  keywordFromArray ){
      index = i;
      break;
    }
  }
  return index;
}

function sumKeywordValues( newKeyword, storedKeyword ){
  let combinedKeyword = {
    keyword: storedKeyword.keyword,
    sentimentScore: newKeyword.sentimentScore + storedKeyword.sentimentScore,
    relevanceScore: newKeyword.relevanceScore + storedKeyword.relevanceScore,
    sadnessScore: newKeyword.sadnessScore + storedKeyword.sadnessScore,
    fearScore: newKeyword.fearScore + storedKeyword.fearScore,
    angerScore: newKeyword.angerScore + storedKeyword.angerScore,
    joyScore: newKeyword.joyScore + storedKeyword.joyScore,
    disgustScore: newKeyword.disgustScore + storedKeyword.disgustScore,
    frequency: storedKeyword.frequency + 1

  };
  return combinedKeyword;
}

function combineKeywordsIntoAverage( keywordArray ){
  let arrayOfKeywordSums = [];

  keywordArray.forEach( ( keywordObj, index ) => {
    let keywordData = keywordObj.dataValues;
    let indexOfKeyword = isDuplicateKeyword( keywordData.keyword, arrayOfKeywordSums );

    if( indexOfKeyword === -1 ){
      let newKeyword = Object.assign( keywordObj.dataValues );
      newKeyword.frequency = 1;
      arrayOfKeywordSums.push( newKeyword );

    } else {
      let keywordBeingStored = arrayOfKeywordSums[ indexOfKeyword ];
      let combinedKeyword = sumKeywordValues( keywordObj, keywordBeingStored );
      arrayOfKeywordSums[ indexOfKeyword ] = combinedKeyword;
    }
  } );
  let summaryOfKeywords = arrayOfKeywordSums.map( (  keywordObj ) => {
    return {
      keyword: keywordObj.keyword,
      sentimentScore: keywordObj.sentimentScore / keywordObj.frequency,
      relevanceScore: keywordObj.relevanceScore / keywordObj.frequency,
      sadnessScore: keywordObj.sadnessScore / keywordObj.frequency,
      fearScore: keywordObj.fearScore / keywordObj.frequency,
      angerScore: keywordObj.angerScore / keywordObj.frequency,
      joyScore: keywordObj.joyScore / keywordObj.frequency,
      disgustScore: keywordObj.disgustScore / keywordObj.frequency
    };
  } );
  return summaryOfKeywords;
}

router.get( '/pastmonth', ( req, res ) => {

  let currentDate = new Date();
  currentDate.setDate( currentDate.getDate() - 30 );

  Entries.findAll( {
    where : {
      createdAt: {
        $gte: currentDate
      }
    }
  } )
    .then( ( entries ) => {
      let returnData = {
        entries: entries,
        keywordSummary: null
      };
      Keywords.findAll( {
        where: {
          createdAt: {
            $gte: currentDate
          }
        }
      } )
        .then( ( keywords ) => {
          let keywordSummary = combineKeywordsIntoAverage( keywords );
          returnData.keywordSummary = keywordSummary;
          res.send( returnData );
        } );
    } );

} );


module.exports = router;