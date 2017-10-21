const express = require('express');

const db = require('../models');

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;




module.exports = router;