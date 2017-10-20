const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');
const User = db.users;

const saltRounds = 10;

router.route('/')
  .get((req, res) => {
    res.send('success!');
  })
  .post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.route('/new')
  .post((req, res) => {
  bcrypt.genSalt(saltRounds)
    .then(salt => {
      bcrypt.hash(req.body.password, salt)
        .then(hash => {
          User.create({
            username: req.body.username,
            password: hash
          }).then(() => {
            res.end();
          });
        });
    }).catch(err => {
      throw err;
    });
    res.redirect('/');
});

module.exports = router;