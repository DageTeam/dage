// var badWordsArray = require('./badWordsArray.js');
var database = require('./database.js');

//fx to pull all email from the db and then store them temporarily
var uncheckedEmails = database.getUncheckedEmails;

//fx to remove all the new lines in the emailList table and store it in antoher columns


//fx to insert CONTEXT into the database,
//context = sentence before, sentence, sentence after

//fx to update the emailList table
var markChecked = function(emailID) {
  var checkString = 'UPDATE emailList SET checked=1 WHERE id=' + emailID;
  database.db.run(checkString);
};

//fx to mark an email as flagged
var markFlagged = function(emailID) {
  var flagString = 'UPDATE emailList SET flagged=1 WHERE id=' + emailID;
  database.db.run(flagString);
};

//fx to createContext
var createContext = function(email, flaggedWord) {
  var text = email.text;

};

//fx to insert into the flagged content context table
var insertIntoContextTable = function(emailID, flaggedWord, context) {

};

//fx to check emails for bad words
var filterEmails = function(emailArray){
  // //loop thru the responseArray
  // for (var i=0; i<emailArray.length; i++){
  // // change checked value to 1 in the emailList table;
  //   markChecked(emailArray[i].id);
  // //loop thru the badWordsArray
  // //ToDo: update badWords
  //   for (var j=0; j<badWords.length; j++) {
  //     var subString = new RegExp(badWords[j]);
  //     //if object's TEXT value contains that 'bad word'
  //     if (subString.test(emailArray[i].text)) {
  //       // change flag value to 1 in the emailList table;
  //       markFlagged(emailArray[j].id)
  //       //create context
  //       var context = createContext(emailArray[i], badWords[j]);
  //       //push the 'flaggedKeyWord', the 'id', the 'context' to flaggedContextList table's flaggedKeyWord column
  //       insertIntoContextTable(emailArray[i].id, badWords[j], context);
  //     }
  //   }

  // }
};

filterEmails(uncheckedEmails());

//fx to look at an email and then check to see if it has a 'bad word'
var checkEmails = function(emailText, emailID) {
  for(var i=0; i<badWords.length; i++){
    if(emailText.indexOf(badWords[i] > 0)){
      writeTag(badWords[i], emailID);
    }
  }
};

//fx to push tag to the database
var writeTag = function(word, emailID) {};

//temp small list of bad words
var badWords = ['damn', 'shit', 'crap', 'butt'];
