var badWordsArray = require('./badWordsArray.js');
var database = require('./database.js');

//fx to pull all email from the db and then store them temporarily
var uncheckedEmails = database.getUncheckedEmails;

//fx to remove all the new lines in the emailList table and store it in antoher columns


//fx to insert CONTEXT into the database,
//context = sentence before, sentence, sentence after

//fx to update the emailList table

//fx to check emails for bad words
var filterEmails = function(emailArray){
//loop thru the responseArray
  for (var i=0; i<emailArray.length; i++){
  // change checked value to 1 in the emailList table;
    emailArray[i].id
  //if object's TEXT value contains a 'bad word'
      // change flag value to 1 in the emailList table;
      //push the 'flaggedKeyWord', the 'id', the 'context' to flaggedContextList table's flaggedKeyWord column
  }
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
