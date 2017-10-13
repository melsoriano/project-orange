const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const config = require( '../config/nlp.json' );

const nlu = new NaturalLanguageUnderstandingV1({
  username: config.username,
  password: config.password,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});


function analyze( file_data ){
  return new Promise( function( resolve, reject ){

    if( typeof file_data !== 'string' ){
      return null;
    }

    nlu.analyze( {
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
  } );
}

module.exports = {
  analyze
};