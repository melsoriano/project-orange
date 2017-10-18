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

}

function combineKeywordsIntoAverage( keywordArray ){
  let arrayOfKeywordSums = [];

  keywordArray.forEach( ( keywordObj, index ) => {
    let keywordData = keywordObj.dataValues;
    let indexOfKeyword = isDuplicateKeyword( keywordData.keyword, arrayOfKeywordSums );

    if( indexOfKeyword === -1 ){
      //is new keyword, add to array  //need to actually create object.
      let newKeyword = Object.assign( keywordObj.dataValues );
      newKeyword.frequency = 1;
      console.log( newKeyword );
      arrayOfKeywordSums.push( newKeyword );

    } else {
      console.log( indexOfKeyword );
      let keywordBeingStored = arrayOfKeywordSums[ index ];
      let combinedKeyword = sumKeywordValues( keywordObj, keywordBeingStored );
      //get instance of keyword
      //add to keyword in array
      keywordBeingStored = combinedKeyword;
    }

  } );
  console.log( arrayOfKeywordSums );
  let summaryOfKeywords = arrayOfKeywordSums;


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
          res.send( keywordSummary ); //needs to return returnData object later
        } );
    } );

} );


module.exports = router;