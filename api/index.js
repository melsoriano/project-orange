const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

const express = require('express');
const router = express.Router();

const db = require('../models');
const Recordings = db.recordings;

router.post('/recording', (req, res) => {
  const speech_to_text = new SpeechToTextV1({
    username: 'c6df0b38-5de5-4cab-ba8c-4ee08ce31e17',
    password: 'lBJFozQV2EeH'
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
      Recordings.create({
        text: res
      });
    }
  });
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