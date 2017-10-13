const express = require('express');
const router = express.Router();

router.use('/server', require('./watson'));

module.exports = router;