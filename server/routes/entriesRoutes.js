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
      relevanceScore: keywordObj.relevanceScore,
      sadnessScore: keywordObj.sadnessScore / keywordObj.frequency,
      fearScore: keywordObj.fearScore / keywordObj.frequency,
      angerScore: keywordObj.angerScore / keywordObj.frequency,
      joyScore: keywordObj.joyScore / keywordObj.frequency,
      disgustScore: keywordObj.disgustScore / keywordObj.frequency,
      frequency: keywordObj.frequency
    };
  } );
  return summaryOfKeywords;
}

function quickSortKeywordsByRelevance ( array ){
  if( array.length < 2 ){
    return array;
  }
  var pivot = array.shift();
  var lesserArray = [];
  var greaterArray = [];

  var currentNumber = null;

  for( var i = 0; i < array.length; i++ ) {
    currentNumber = array[ i ];
    ( currentNumber.relevanceScore < pivot.relevanceScore ) ? lesserArray.unshift( currentNumber ) : greaterArray.unshift( currentNumber );
  }
  return quickSortKeywordsByRelevance( greaterArray ).concat( pivot, quickSortKeywordsByRelevance( lesserArray ) );
}

function getTopKeywords( listLength, keywordArray ){
  let sortedArray = quickSortKeywordsByRelevance( keywordArray );
  let arrayCutToSpecifiedLength = sortedArray.slice( 0, listLength );
  return arrayCutToSpecifiedLength;
}

function getEntriesAndAggregateKeywordsFromLastXDays( daysToAnalyze, keywordSummaryListLength ){
  return new Promise( function( resolve, reject ){
    let currentDate = new Date();
    currentDate.setDate( currentDate.getDate() - daysToAnalyze );

    Entries.findAll( {
      where : {
        createdAt: {
          $gte: currentDate
        }
      },
      include: [
        {
          model: Keywords
        }
      ]
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
        let combinedKeywords = combineKeywordsIntoAverage( keywords );
        let keywordSummary = getTopKeywords( keywordSummaryListLength, combinedKeywords );
        console.log( keywordSummary );
        returnData.keywordSummary = keywordSummary;
        resolve( returnData );
      } )
      .catch( ( err ) => {
        resolve( err );
      } );
      } )
    .catch( ( err )=> {
      resolve( err );
    } );
  } );
}

router.get( '/yearly', ( req, res ) => {
  let timespanInDays = 365;
  let keywordSummaryLength = 20;
  getEntriesAndAggregateKeywordsFromLastXDays( timespanInDays, keywordSummaryLength )
  .then( ( data ) => {
    res.send( data );
  } )
  .catch( ( err ) => {
    res.send( err );
  } );

} );

router.get( '/monthly', ( req, res ) => {
  let timespanInDays = 30;
  let keywordSummaryLength = 10;
  getEntriesAndAggregateKeywordsFromLastXDays( timespanInDays, keywordSummaryLength )
  .then( ( data ) => {
    res.send( data );
  } )
  .catch( ( err ) => {
    res.send( err );
  } );

} );

router.get( '/weekly', ( req, res ) => {
  let timespanInDays = 7;
  let keywordSummaryLength = 5;
  getEntriesAndAggregateKeywordsFromLastXDays( timespanInDays, keywordSummaryLength )
  .then( ( data ) => {
    res.send( data );
  } )
  .catch( ( err ) => {
    res.send( err );
  } );

} );

router.get( '/daily', ( req, res ) => {
  let timespanInDays = 1;
  let keywordSummaryLength = 3;
  getEntriesAndAggregateKeywordsFromLastXDays( timespanInDays, keywordSummaryLength )
  .then( ( data ) => {
    res.send( data );
  } )
  .catch( ( err ) => {
    res.send( err );
  } );

} );

module.exports = router;