const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

const express = require('express');
const router = express.Router();

const db = require('../../models');
const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

const config = require('../../config/speechToText.json');

router.post('/', (req, res) => {
  const speech_to_text = new SpeechToTextV1({
    username: config.username,
    password: config.password
  });

  const params = {
    audio: fs.createReadStream('./resources/speech.wav'),
    content_type: 'audio/wav'
  };

  speech_to_text.recognize(params, (err, res) => {
    if (err) console.log(err);
    else {
      console.log('** converting text and adding to db **');
      res = convertText(res);
      Entries.create({
        text: res
      });
    }
  });
  res.end();
});

// converts response to text
function convertText(res) {
  let text = '';
  res.results.map(result => {
    text += result.alternatives[0].transcript;
  });
  console.log('*** TEXT ***', text);
  return text;
}

module.exports = router;