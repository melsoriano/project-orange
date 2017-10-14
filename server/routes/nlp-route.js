const express = require('express');
const router = express.Router();

const db = require('../models');
const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.get( '/', ( req, res ) => {
  console.log( 'hi' );
} );


module.exports = router;