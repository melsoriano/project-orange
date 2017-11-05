const db = require("../../models");

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

function enterKeywordsToDb(keywordArray, entry_id, user_id, entry_type) {
  return new Promise(function(resolve, reject) {
    function insertKeywordInDb(keywordArray, keywordCount) {
      if (keywordCount >= keywordArray.length) {
        resolve();
      } else {
        let keyword = keywordArray[keywordCount];

        Keywords.create({
          keyword: keyword.text,
          type: entry_type,
          sentimentScore: keyword.sentiment.score,
          relevanceScore: keyword.relevance,
          sadnessScore: keyword.emotion.sadness,
          fearScore: keyword.emotion.fear,
          angerScore: keyword.emotion.anger,
          joyScore: keyword.emotion.joy,
          disgustScore: keyword.emotion.disgust,
          entry_id: entry_id,
          user_id: user_id
        })
          .then(() => {
            insertKeywordInDb(keywordArray, ++keywordCount);
          })
          .catch(err => {
            return err;
          });
      }
    }
    insertKeywordInDb(keywordArray, 0);
  });
}

module.exports = {
  enterKeywordsToDb
};
