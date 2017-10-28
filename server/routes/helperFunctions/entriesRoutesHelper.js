const Op = require("sequelize").Op;
const db = require("../../models");

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

function isDuplicateKeyword(keyword, keywordArray) {
  let index = -1;
  for (var i = 0; i < keywordArray.length; i++) {
    let keywordFromArray = keywordArray[i].keyword;
    if (keyword === keywordFromArray) {
      index = i;
      break;
    }
  }
  return index;
}

function sumKeywordValues(newKeyword, storedKeyword) {
  let originEntry = newKeyword.dataValues.entry.dataValues;
  console.log(originEntry);
  let newEntry = {
    text: originEntry.text,
    createdAt: originEntry.createdAt
  };
  let combinedKeyword = {
    keyword: storedKeyword.keyword,
    sentimentScore: newKeyword.sentimentScore + storedKeyword.sentimentScore,
    relevanceScore: newKeyword.relevanceScore + storedKeyword.relevanceScore,
    sadnessScore: newKeyword.sadnessScore + storedKeyword.sadnessScore,
    fearScore: newKeyword.fearScore + storedKeyword.fearScore,
    angerScore: newKeyword.angerScore + storedKeyword.angerScore,
    joyScore: newKeyword.joyScore + storedKeyword.joyScore,
    disgustScore: newKeyword.disgustScore + storedKeyword.disgustScore,
    frequency: storedKeyword.frequency + 1,
    entries: [...storedKeyword.entries, newEntry]
  };
  return combinedKeyword;
}

function combineKeywordsIntoAverage(keywordArray) {
  let arrayOfKeywordSums = [];

  keywordArray.forEach((keywordObj, index) => {
    let keywordData = keywordObj.dataValues;
    let indexOfKeyword = isDuplicateKeyword(
      keywordData.keyword,
      arrayOfKeywordSums
    );

    if (indexOfKeyword === -1) {
      console.log();
      let newKeyword = Object.assign(keywordObj.dataValues);
      let originEntry = newKeyword.entry.dataValues;
      newKeyword.frequency = 1;

      newKeyword.entries = [
        {
          text: originEntry.text,
          createdAt: originEntry.createdAt
        }
      ];
      delete newKeyword.entry;
      arrayOfKeywordSums.push(newKeyword);
    } else {
      let keywordBeingStored = arrayOfKeywordSums[indexOfKeyword];
      let combinedKeyword = sumKeywordValues(keywordObj, keywordBeingStored);
      arrayOfKeywordSums[indexOfKeyword] = combinedKeyword;
    }
  });
  let summaryOfKeywords = arrayOfKeywordSums.map(keywordObj => {
    return {
      keyword: keywordObj.keyword,
      sentimentScore: keywordObj.sentimentScore / keywordObj.frequency,
      relevanceScore: keywordObj.relevanceScore,
      sadnessScore: keywordObj.sadnessScore / keywordObj.frequency,
      fearScore: keywordObj.fearScore / keywordObj.frequency,
      angerScore: keywordObj.angerScore / keywordObj.frequency,
      joyScore: keywordObj.joyScore / keywordObj.frequency,
      disgustScore: keywordObj.disgustScore / keywordObj.frequency,
      frequency: keywordObj.frequency,
      entries: keywordObj.entries
    };
  });
  return summaryOfKeywords;
}

function quickSortKeywordsByRelevance(array) {
  if (array.length < 2) {
    return array;
  }
  var pivot = array.shift();
  var lesserArray = [];
  var greaterArray = [];

  var currentNumber = null;

  for (var i = 0; i < array.length; i++) {
    currentNumber = array[i];
    currentNumber.relevanceScore < pivot.relevanceScore
      ? lesserArray.unshift(currentNumber)
      : greaterArray.unshift(currentNumber);
  }
  return quickSortKeywordsByRelevance(greaterArray).concat(
    pivot,
    quickSortKeywordsByRelevance(lesserArray)
  );
}

function getTopKeywords(listLength, keywordArray) {
  let sortedArray = quickSortKeywordsByRelevance(keywordArray);
  let arrayCutToSpecifiedLength = sortedArray.slice(0, listLength);
  return arrayCutToSpecifiedLength;
}

function getEntriesAndAggregateKeywordsBetweenDates(
  startDate,
  endDate,
  keywordSummaryListLength,
  user_id
) {
  return new Promise(function(resolve, reject) {
    Entries.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        },
        user_id: user_id
      },
      include: [
        {
          model: Keywords
        }
      ]
    })
      .then(entries => {
        let returnData = {
          entries: entries,
          keywordSummary: null
        };
        Keywords.findAll({
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate]
            },
            user_id: user_id
          },
          include: [
            {
              model: Entries
            }
          ]
        })
          .then(keywords => {
            let combinedKeywords = combineKeywordsIntoAverage(keywords);
            let keywordSummary = getTopKeywords(
              keywordSummaryListLength,
              combinedKeywords
            );
            returnData.keywordSummary = keywordSummary;
            resolve(returnData);
          })
          .catch(err => {
            resolve(err);
          });
      })
      .catch(err => {
        resolve(err);
      });
  });
}

module.exports = {
  getEntriesAndAggregateKeywordsBetweenDates
};
