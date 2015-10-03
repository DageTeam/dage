// var badWordsArray = require('./badWordsArray.js');
var database = require('./database.js');
var cron = require('cron');

//temp small list of bad words
var badWords = ['damn', 'shit', 'crap', 'butt'];

//import fx
var getUncheckedEmails = database.getUncheckedEmails;
var markChecked = database.markChecked;
var markFlagged = database.markFlagged;
var insertIntoContextTable = database.insertIntoContextTable;

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

//fx to check emails for bad words and then store it into the contextTable
var filterEmail = exports.filterEmail = function(emailArray) {
  console.log('filterEmail fx ran/////');
  console.log('filterEmailz emailArray argument is ///////.....', emailArray);

  //loop thru the responseArray
  for (var i = 0; i < emailArray.length; i++) {
    var email = emailArray[i];
    console.log('heeeeeeeee', typeof markFlagged)

    // change checked value to 1 in the emailTable
    markChecked(email.id);

    // loop thru the badWordsArray
    // TODO: update badWords
    for (var j = 0; j < badWords.length; j++) {
      // console.log('this is i', i, ' and this is j', j);
      var subString = new RegExp(badWords[j], 'ig');

      //if object's TEXT value contains that 'bad word'
      if (subString.test(email.text)) {
        // change flag value to 1 in the emailTable ;
        markFlagged(email.id);

        // //create context
        var context = createContext(email, badWords[j]);

        // //insert the 'flaggedKeyWord', the 'id', the 'context' into contextTable
        insertIntoContextTable(email.id, badWords[j], context);
      }
    }
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
