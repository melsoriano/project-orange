const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");
const User = db.users;

const saltRounds = 10;

router
  .route("/login")
  .get((req, res) => {
    res.send("login");
  })
  .post(passport.authenticate("local"), (req, res) => {
    res.json({ username: req.body.username });
  });

router
  .route("/register")
  .get((req, res) => {
    res.send("please register");
  })
  .post((req, res) => {
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

router.get("/logout", checkAuthentication, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.route("/profile").get((req, res) => {
  User.findOne({ where: { id: req.user.id } }).then(data => res.send(data));
});

router.route("/profile").put((req, res) => {
  let userId = req.user.id;
  User.findById(userId).then(user => {
    User.update(req.body, {
      where: {
        id: user.id
      }
    }).then(data => {
      User.findById(userId).then(data => {
        res.send(JSON.stringify(data));
      });
    });
  });
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
