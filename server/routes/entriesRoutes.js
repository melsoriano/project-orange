const express = require("express");

const db = require("../models");
const helperFn = require("./helperFunctions/entriesRoutesHelper.js");

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.get("/all", (req, res) => {
  let user_id = req.user.id;
  Entries.findAll({
    where: {
      user_id: user_id,
      type: "entry"
    },
    include: [
      {
        model: Keywords
      }
    ],
    order: [["createdAt", "DESC"]]
  })
    .then(entries => {
      res.send(entries);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/yearly", (req, res) => {
  let timespanInDays = 365;
  let keywordSummaryLength = 20;
  let user_id = req.user.id;
  let endDateOfQuery = new Date();
  let startDateOfQuery = new Date();
  startDateOfQuery.setDate(startDateOfQuery.getDate() - timespanInDays);
  helperFn
    .getEntriesAndAggregateKeywordsBetweenDates(
      startDateOfQuery,
      endDateOfQuery,
      keywordSummaryLength,
      user_id,
      "entry"
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/monthly", (req, res) => {
  let timespanInDays = 30;
  let keywordSummaryLength = 10;
  let user_id = req.user.id;

  let endDateOfQuery = new Date();
  let startDateOfQuery = new Date();
  startDateOfQuery.setDate(startDateOfQuery.getDate() - timespanInDays);

  helperFn
    .getEntriesAndAggregateKeywordsBetweenDates(
      startDateOfQuery,
      endDateOfQuery,
      keywordSummaryLength,
      user_id,
      "entry"
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/weekly", (req, res) => {
  let timespanInDays = 7;
  let keywordSummaryLength = 5;
  let user_id = req.user.id;

  let endDateOfQuery = new Date();
  let startDateOfQuery = new Date();
  startDateOfQuery.setDate(startDateOfQuery.getDate() - timespanInDays);

  helperFn
    .getEntriesAndAggregateKeywordsBetweenDates(
      startDateOfQuery,
      endDateOfQuery,
      keywordSummaryLength,
      user_id,
      "entry"
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/daily", (req, res) => {
  let timespanInDays = 1;
  let keywordSummaryLength = 3;
  let user_id = req.user.id;

  let endDateOfQuery = new Date();
  let startDateOfQuery = new Date();
  startDateOfQuery.setDate(startDateOfQuery.getDate() - timespanInDays);

  helperFn
    .getEntriesAndAggregateKeywordsBetweenDates(
      startDateOfQuery,
      endDateOfQuery,
      keywordSummaryLength,
      user_id,
      "entry"
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/month/:mmyyDate", (req, res) => {
  let keywordSummaryLength = 10;
  let user_id = req.user.id;

  let timespan = req.params.mmyyDate;
  let monthOfQuery = parseInt(timespan.slice(0, 2)) - 1; //date object takes 0-11 for month arguement.
  let yearOfQuery = parseInt("20" + timespan.slice(2, 4));

  let startDateOfQuery = new Date(yearOfQuery, monthOfQuery, 1, 0, 0, 0, 0);
  let endDateOfQuery = new Date(yearOfQuery, monthOfQuery + 1, 1, 0, 0, 0, 0);
  helperFn
    .getEntriesAndAggregateKeywordsBetweenDates(
      startDateOfQuery,
      endDateOfQuery,
      keywordSummaryLength,
      user_id,
      "entry"
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/twitter", (req, res) => {
  let timespanInDays = 7; //this number is arbitrary.
  let keywordSummaryLength = 5;
  let user_id = req.user.id;

  let endDateOfQuery = new Date();
  let startDateOfQuery = new Date();
  startDateOfQuery.setDate(startDateOfQuery.getDate() - timespanInDays);

  helperFn
    .getEntriesAndAggregateKeywordsBetweenDates(
      startDateOfQuery,
      endDateOfQuery,
      keywordSummaryLength,
      user_id,
      "tweet"
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
