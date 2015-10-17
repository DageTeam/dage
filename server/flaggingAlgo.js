var database = require('./database.js');
var cron = require('cron');

//import fxs
var getUncheckedEmails = database.getUncheckedEmails;
var markChecked = database.markChecked;
var markFlagged = database.markFlagged;
var insertIntoContextTable = database.insertIntoContextTable;
var getFlaggedWords = database.getFlaggedWords;


//fx to createContext. context = a substring of 200chars before and 200 after the flaggedKeyword
var createContext = function createContext(email, flaggedKeyword) {
  var text = email.body;
  var index = text.search(flaggedKeyword);
  var numOfChars = 100;
  var start = index - numOfChars;
  var end = numOfChars + index;
  var context = text.substring(start, end);
  // console.log('createContext fx ran/////');
  return context;
};

//fx to check emails for keywords and then store it into the contextTable
var filterEmail = function filterEmail(emailArray) {
  // console.log('filterEmail fx ran/////');
  // console.log('filterEmailz emailArray argument is ///////.....', emailArray);
  if (emailArray.length) {
    getFlaggedWords(function(flaggedWords) {

      //loop thru the responseArray
      for (var i = 0; i < emailArray.length; i++) {
        var email = emailArray[i];

        //replace all single apostrophes with double apostrophes
        email.body = email.body.replace(/'/g, '\'\'');

        // change checked value to 1 in the emailTable
        markChecked(email.id);

        // loop thru the flaggedWords array from keywordTable

        for (var j = 0; j < flaggedWords.length; j++) {
          var keyword = flaggedWords[j];
          // var subString = new RegExp(keyword.keyword, 'ig');//OLD SUBSTRING

          //this new subString should find whole words only. DELETE OLD IF WORK
          var subString = new RegExp("\\b" + keyword.keyword + "\\b", 'ig');

          //if object's TEXT value contains that 'bad word'
          if (subString.test(email.body)) {
            // change flag value to 1 in the emailTable ;
            markFlagged(email.id);
            // console.log('triggered for string', email.body, ' and word', keyword.keyword);

            // //create context
            var context = createContext(email, keyword.keyword);

            // //insert the 'flaggedKeyword', the 'id', the 'context' into contextTable
            insertIntoContextTable(keyword.userID, keyword.filterID, email.id, keyword.keyword, context);
          }
        }
      }
    });
  }
  // console.log('filterEmail fx is done running/////');
};

//fx to scan the email
var scanEmail = function scanEmail() {
  getUncheckedEmails(function(emailArray) {
    filterEmail(emailArray);
  });
};

//fx to create cronJob to periodically scan emailTable, filter it, store offensive emails to contextTable
var cronJob = cron.job(
  '0 */1 * * * *', //every 30mins at the 0th second.
  function() {
    //print out to the terminal that the Cron job is starting
    console.log('CRONJOB starting now......///////', new Date());
    scanEmail();
  },

  null, //run this fx onComplete
  true, //run on first call
  'America/Los_Angeles'
);

cronJob.start();


//MODULE.EXPORTS TO EXPORT REQUIRED FX
module.exports = {
  filterEmail
};
