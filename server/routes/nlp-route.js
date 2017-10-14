const express = require('express');
const router = express.Router();

const db = require('../models');
const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.post( '/', ( req, res ) => {
  let textEntry = req.body.text;
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
    console.log( data );
  } )
  .catch( ( err ) => {
    console.log( err );
  } );
  //receive nlp data

  //create db record of entry

  //create entry of keywords.

  //query database for entry( this entry ) + keywords

  //return entry as json.
  res.end();
} );


module.exports = router;