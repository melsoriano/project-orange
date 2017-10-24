const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");
const User = db.users;

const saltRounds = 10;

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.body.username);
  res.json({ username: req.body.username });
});

router.post("/register", (req, res) => {
  bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      bcrypt.hash(req.body.password, salt).then(hash => {
        User.create({
          username: req.body.username,
          password: hash
        }).then(() => {
          res.end();
        });
      });
    })
    .catch(err => {
      throw err;
    });
  res.json(req.body.username);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/auth", (req, res) => {
  if (req.user) {
    res.json(req.user.username);
  }
});

module.exports = router;
