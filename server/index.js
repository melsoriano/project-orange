const express = require('express');
const router = express.Router();

router.use('/server', require('./watson/s2tAPI.js'));

module.exports = router;