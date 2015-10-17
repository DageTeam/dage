var db = require('./database.js');
var natural = require('natural');
var stemmer = natural.PorterStemmer;

//import fxs
var getArrayOfKeywordsFromTagsTable = db.getArrayOfKeywordsFromTagsTable;

//fx to test whether an email should be rated
var getEmailStats = function getEmailStats(tagName, email) {
  var countOfKeywords = 0;
  var totalNumOfWords = 0;

  //get an array of keywords based on the tagName
  return getArrayOfKeywordsFromTagsTable(tagName, function(arr){
    // console.log('these are the keywords from the tagTable.....arr=', arr);

    //stem the email.body before getting the frequency of the words.
    var stemmedArray = getStemmedArray(email.body);
    // console.log('this is the stemmedArray', stemmedArray);

    //get word frequency object
    var obj = getWordFrequency(stemmedArray);
    // console.log('this is the wordFrequency object', obj);

    //loop thru the tagArray to get a count of the keywords
    for (var i = 0; i < arr.length; i++) {
      // console.log('this is the keyword....should see coolie', arr[i].keyword);
      if (obj[arr[i].keyword] > 0) {
        //increment count by the freq of the obj key's frequency.
        // console.log('inside the loop', arr[i].keyword);
        countOfKeywords += obj[arr[i].keyword];
      }
    };

    //add up the frequency of the words
    for (var key in obj) {
      totalNumOfWords += obj[key];
    }

    // console.log('this is the result i get from getEmailStats......', [countOfKeywords, totalNumOfWords, tagName, email]);
    return [countOfKeywords, totalNumOfWords, tagName, email];
  });
};

//fx to return an object whose keys correspond to the associate key/word's frequency
//eg. {word1: 2, word2: 20}
var getWordFrequency = function getWordFrequency(str) {
  var obj = {};
  var match;

  //all whole words. word = word's != words
  var regEx = /\w+/g;

  while ((match = regEx.exec(str)) !== null) {
    if (match.index === regEx.lastIndex) {
      regEx.lastIndex++;
    }
    //if the existing word is not in the obj, set the value to 1, else increase the value by 1.
    obj[match[0]] ? obj[match[0]] += 1 : obj[match[0]] = 1;
    // console.log('this is the matched word///////........', obj[match[0]]);
  }
  return obj;
};

//fx to return an array of stemmed words
var getStemmedArray = function getStemmedArray(str) {
  stemmer.attach();
  var arrayOfStemmedWords = str.tokenizeAndStem();
  return arrayOfStemmedWords;
};

// //TESTING PURPOSES.....
// var testString = 'this is a long donkey ducking email. it includes numbers and digits and repeats of the fellowing: stem, stems, stemming, stemmed. duck, ducking, ducked, ducker, ducks';

// // console.log('this is the stemmed sentence', getStemmedArray(testString));
// *
// [ 'long',
//   'duck',
//   'donkei' //replaces Y with I
//   'email',
//   'includ', ///removes ES
//   'number',
//   'digit',
//   'repeat',
//   'fellow',
//   'stem',
//   'stem',
//   'stem',
//   'stem',
//   'duck',
//   'duck',
//   'duck',
//   'ducker',
//   'duck' ]


// var testStringgy = {
//   body : 'hi gringo or cracker. this is a long ducking email. it includes numbers and digits and repeats of the fellowing: stem, stems, stemming, stemmed. duck, ducking, ducked, ducker, ducks'
// };
// // console.log('testing getEmailStats........', getEmailStats('racism', testStringgy));
// //shit works. but why does it say undefined?
// //TESTING PURPOSES.....




