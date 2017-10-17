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
          res.send( keywords );
        } );
    } );

} );


module.exports = router;