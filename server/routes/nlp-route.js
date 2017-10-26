const express = require("express");
const watson = require("../natural-lang-processing/nlpAPI.js");

const db = require("../models");
const dbHelper = require("./helperFunctions/dbEntryHelpers.js");

const router = express.Router();

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

router.post("/", (req, res) => {
  let textEntry = req.body.text;
  let user_id = req.body.userId;
  let entryType = req.body.type;

  //validate input somehow.
  /*  if( typeof textEntry !== "string" ){
    console.log( 'invalid input' );
    res.end();
  }*/

  watson
    .analyze(textEntry)
    .then(data => {
      let nlpData = JSON.parse(data);

      let sentimentData = nlpData.sentiment.document;
      let emotionData = nlpData.emotion.document.emotion;
      Entries.create({
        user_id: user_id,
        text: textEntry,
        sentimentScore: sentimentData.score,
        sentimentLabel: sentimentData.label,
        sadnessScore: emotionData.sadness,
        fearScore: emotionData.fear,
        angerScore: emotionData.anger,
        joyScore: emotionData.joy,
        disgustScore: emotionData.disgust,
        type: entryType,
        source_id: null
      })
        .then(entry => {
          let entry_id = entry.dataValues.id;

          dbHelper
            .enterKeywordsToDb(nlpData.keywords, entry_id, user_id)
            .then(() => {
              Entries.findOne({
                where: {
                  id: entry_id
                },
                include: [
                  {
                    model: Keywords,
                    limit: 5
                  }
                ]
              })
                .then(entries => {
                  res.send(entries);
                })
                .catch(err => {
                  res.send(err);
                });
            })
            .catch(err => {
              res.send(err);
            });
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
