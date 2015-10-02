// var badWordsArray = require('./badWordsArray.js');
var database = require('./database.js');

//temp small list of bad words
var badWords = ['damn', 'shit', 'crap', 'butt'];

//fx to pull all unchecked emails from the db
var uncheckedEmails = database.getUncheckedEmails;

//fx to update the emailTable to mark an email as checked
var markChecked = function(emailID) {
  var checkString = 'UPDATE emailTable SET checked="1" WHERE id=' + emailID;
  database.db.run(checkString);
  console.log('markChecked fx ran/////');
};

//fx to update the emailTable  to mark an email as flagged
var markFlagged = function(emailID) {
  var flagString = 'UPDATE emailTable SET flagged="1" WHERE id=' + emailID;
  database.db.run(flagString);
  console.log('markFlagged fx ran/////');
};

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

//fx to insert into the contextTable
var insertIntoContextTable = function(emailID, flaggedKeyWord, context) {
  var flaggedContent = 'INSERT INTO contextTable (emailID, flaggedKeyWord, context) VALUES (' + emailID + ',\'' +  flaggedKeyWord + '\',\'' + context +  '\')';
  database.db.run(flaggedContent);
  console.log('insertIntoContextTable fx ran/////');
};

//fx to check emails for bad words and then store it into the contextTable
var filterEmail = function(emailArray) {
  console.log('filterEmail fx ran/////');
  console.log('filterEmailz emailArray argument is ///////.....', emailArray);

  //loop thru the responseArray
  for (var i = 0; i < emailArray.length; i++) {
    var email = emailArray[i];

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

//TESTING purposes. delete fitlerEmail call.
uncheckedEmails(function(emailArray) {
  filterEmail(emailArray);
});
