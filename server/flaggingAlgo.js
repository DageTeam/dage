// var badWordsArray = require('./badWordsArray.js');
var database = require('./database.js');
var cron = require('cron');

//import fx
var getUncheckedEmails = database.getUncheckedEmails;
var markChecked = database.markChecked;
var markFlagged = database.markFlagged;
var insertIntoContextTable = database.insertIntoContextTable;
var getFlaggedWords = database.getFlaggedWords;

//temp small list of bad words
// var badWords = ['damn', 'shit', 'crap', 'butt'];

//fx to createContext. context = a substring of 200chars before and 200 after the flaggedKeyWord
var createContext = function(email, flaggedKeyWord) {
  var text = email.text;
  var index = text.search(flaggedKeyWord);
  var numOfChars = 200;
  var start = index - numOfChars;
  var end = numOfChars + index;
  var context = text.substring(start, end);
  console.log('createContext fx ran/////');
  return context;
};

//fx to check emails for keywords and then store it into the contextTable
var filterEmail = exports.filterEmail = function(emailArray) {
  console.log('filterEmail fx ran/////');
  console.log('filterEmailz emailArray argument is ///////.....', emailArray);

  //loop thru the responseArray
  for (var i = 0; i < emailArray.length; i++) {
    var email = emailArray[i];

    // change checked value to 1 in the emailTable
    markChecked(email.id);

    // loop thru the flaggedWords array from keywordTable
    getFlaggedWords(function(flaggedWords) {
      for (var j = 0; j < flaggedWords.length; j++) {
        var keyword = flaggedWords[j];
        var subString = new RegExp(keyword.keyword, 'ig');

        //if object's TEXT value contains that 'bad word'
        if (subString.test(email.text)) {
          // change flag value to 1 in the emailTable ;
          markFlagged(email.id);

          // //create context
          var context = createContext(email, keyword.keyword);

          // //insert the 'flaggedKeyWord', the 'id', the 'context' into contextTable
          insertIntoContextTable(keyword.userID, keyword.filterID, email.id, keyword.keyword, context);
        }
      }
    });
  }

  console.log('filterEmail fx is done running/////');
};

var scanEmail = function() {
  getUncheckedEmails(function(emailArray) {
    filterEmail(emailArray);
  });
};

// TESTING purposes. delete fitlerEmail call.
scanEmail();

//fx to create cronJob to periodically scan emailTable, filter it, store offensive emails to contextTable
var cronJob = cron.job(
  '0 */1 * * * *', //every 30mins at the 0th second.
  function() {
    console.log('CRONJOB starting now......///////', new Date());
    scanEmail();
  },

  null, //run this fx onComplete
  true, //run on first call
  'America/Los_Angeles'
);

cronJob.start();
