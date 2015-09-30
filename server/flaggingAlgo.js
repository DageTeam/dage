// var badWordsArray = require('./badWordsArray.js');
var database = require('./database.js');

//temp small list of bad words
var badWords = ['damn', 'shit', 'crap', 'butt'];

//fx to pull all unchecked emails from the db
var uncheckedEmails = database.getUncheckedEmails;

//fx to update the emailList table to mark an email as checked
var markChecked = function(emailID) {
  var checkString = 'UPDATE emailList SET checked=1 WHERE id=' + emailID;
  database.db.run(checkString);
};

//fx to update the emailList table to mark an email as flagged
var markFlagged = function(emailID) {
  var flagString = 'UPDATE emailList SET flagged=1 WHERE id=' + emailID;
  database.db.run(flagString);
};

//fx to createContext. context = a substring of 200chars before and 200 after the flaggedWord
var createContext = function(email, flaggedWord) {
  var text = email.text;
  var index = text.search(flaggedWord);
  var numOfChars = 200;
  var start = index - numOfChars;
  var end = numOfChars + index;
  var context = text.substring(start, end);

  return context;
};

//fx to insert into the flagged content context table
var insertIntoContextTable = function(emailID, flaggedWord, context) {
  var flaggedContent = 'INSERT INTO flaggedContextList (emailID, flaggedKeyWord, context) VALUES (' + emailID + flaggedKeyWord + context +  ');';
  database.db.run(flaggedContent);
};

//fx to check emails for bad words and then store it into the flaggedContextList table
var filterEmail = function(emailArray) {
  //loop thru the responseArray
  for (var i = 0; i < emailArray.length; i++) {
    var theEmail = emailArray[i];
    // change checked value to 1 in the emailList table;
    markChecked(theEmail.id);
    //loop thru the badWordsArray
    //TODO: update badWords
    for (var j = 0; j < badWords.length; j++) {
      var subString = new RegExp(badWords[j], 'ig');
      //if object's TEXT value contains that 'bad word'
      if (subString.test(theEmail.text)) {
        // change flag value to 1 in the emailList table;
        markFlagged(emailArray[j].id)
        //create context
        var context = createContext(theEmail, badWords[j]);
        //insert the 'flaggedKeyWord', the 'id', the 'context' into flaggedContextList table
        insertIntoContextTable(theEmail.id, badWords[j], context);
      }
    }
  }
};

//TESTING purposes. delete fitlerEmails call.
filterEmail(uncheckedEmails());
