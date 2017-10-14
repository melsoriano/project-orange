const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const config = require( '../config/nlp.json' );

const nlu = new NaturalLanguageUnderstandingV1({
  username: config.username,
  password: config.password,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

let testData = {
  "usage": {
    "text_units": 1,
    "text_characters": 182,
    "features": 3
  },
  "sentiment": {
    "document": {
      "score": -0.646423,
      "label": "negative"
    }
  },
  "language": "en",
  "keywords": [
    {
      "text": "utensil",
      "sentiment": {
        "score": 0
      },
      "relevance": 0.950377,
      "emotion": {
        "sadness": 0.198469,
        "joy": 0.292696,
        "fear": 0.120093,
        "disgust": 0.274457,
        "anger": 0.10083
      }
    },
    {
      "text": "pillage",
      "sentiment": {
        "score": -0.514084
      },
      "relevance": 0.913265,
      "emotion": {
        "sadness": 0.130384,
        "joy": 0.162977,
        "fear": 0.074875,
        "disgust": 0.054947,
        "anger": 0.086978
      }
    },
    {
      "text": "horde",
      "sentiment": {
        "score": 0
      },
      "relevance": 0.883565,
      "emotion": {
        "sadness": 0.198469,
        "joy": 0.292696,
        "fear": 0.120093,
        "disgust": 0.274457,
        "anger": 0.10083
      }
    },
    {
      "text": "hobo",
      "sentiment": {
        "score": 0
      },
      "relevance": 0.819726,
      "emotion": {
        "sadness": 0.151545,
        "joy": 0.178156,
        "fear": 0.093654,
        "disgust": 0.072945,
        "anger": 0.08686
      }
    },
    {
      "text": "buffet",
      "sentiment": {
        "score": -0.514084
      },
      "relevance": 0.80929,
      "emotion": {
        "sadness": 0.130384,
        "joy": 0.162977,
        "fear": 0.074875,
        "disgust": 0.054947,
        "anger": 0.086978
      }
    },
    {
      "text": "doors",
      "sentiment": {
        "score": 0
      },
      "relevance": 0.740828,
      "emotion": {
        "sadness": 0.090904,
        "joy": 0.155897,
        "fear": 0.13612,
        "disgust": 0.082575,
        "anger": 0.241493
      }
    }
  ],
  "emotion": {
    "document": {
      "emotion": {
        "sadness": 0.155072,
        "joy": 0.183259,
        "fear": 0.155309,
        "disgust": 0.193738,
        "anger": 0.299778
      }
    }
  }
};

function analyze( file_data ){
  return new Promise( function( resolve, reject ){

    if( typeof file_data !== 'string' ){
      return null;
    }

    /*nlu.analyze( {
      'html': file_data,
      'features': {
        'keywords': {
          'emotion': true,
          'sentiment': true
        },
        'emotion' : {},
        'sentiment' : {}
      }
    }, function( err, response ) {
        let returnObj = {};
      if ( err ){
       returnObj = err;
      }
      else {
        returnObj = JSON.stringify( response, null, 2 );
      }

      resolve( returnObj );

    } );
  */
    resolve( testData );
  } );
}

module.exports = {
  analyze
};