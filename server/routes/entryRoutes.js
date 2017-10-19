const express = require('express');

const db = require('../models');

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.get( '/:id', ( req, res ) => {
  let entry_id = req.params.id;
  Entries.findOne( {
    where: {
      id: entry_id
    },
    include: [
      {
        model: Keywords,
      }
    ]
  } )
  .then( ( entry ) => {
    res.send( entry );
  } )
  .catch( ( err ) => {
    res.send( err );
  } );
} );

router.get( '/:edit', ( req, res ) => {

} );

module.exports = router;