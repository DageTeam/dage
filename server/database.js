var sqlite3 = require('sqlite3').verbose();
var path = require('path');

//create new database called emails.db
var dbFile = path.join(__dirname + '/emails.db');
var db = exports.db = new sqlite3.Database(dbFile);

//create emailTable if it doesnt exist
var createEmailTable = function() {
  var createTable = 'CREATE TABLE IF NOT EXISTS emailTable(id INTEGER PRIMARY KEY AUTOINCREMENT, to_field char(100), from_field char(100), cc char(100), bcc char(100), subject char(100), priority char(100), text MEDIUMTEXT, parsedText MEDIUMTEXT, date DATE, checked INTEGER, flagged INTEGER)';

  db.run(createTable);
};

//create contextTable if it doenst exit
var createContextTable = function() {
  var createTable = 'CREATE TABLE IF NOT EXISTS contextTable(id INTEGER PRIMARY KEY AUTOINCREMENT, emailID INTEGER, flaggedKeyWord char(100), context char(500))';

  db.run(createTable);
};

//insert email into emailTable
var insertIntoEmailTable = exports.insertIntoEmailTable = function(toField, fromField, cc, bcc, subject, priority, text, date, checked, flagged) {
  var emailContent = 'INSERT into emailTable (to_field, from_field, cc, bcc, subject, priority, text, date, checked, flagged) VALUES(\''
    + toField + '\',\''
    + fromField + '\',\''
    + cc + '\',\''
    + bcc + '\',\''
    + subject + '\',\''
    + priority + '\',\''
    + text + '\',\''
    + date + '\',\''
    + checked + '\',\''
    + flagged + '\');';

  db.run(emailContent);
};

//fx to update the emailTable to mark an email as checked
var markChecked = exports.markChecked = function(emailID) {
  var checkString = 'UPDATE emailTable SET checked="1" WHERE id=' + emailID;

  db.run(checkString);
  console.log('markChecked fx ran/////');
};

//fx to update the emailTable  to mark an email as flagged
var markFlagged = exports.markFlagged = function(emailID) {
  var flagString = 'UPDATE emailTable SET flagged="1" WHERE id=' + emailID;

  db.run(flagString);
  console.log('markFlagged fx ran/////');
};

//fx to insert into the contextTable
var insertIntoContextTable = exports.insertIntoContextTable = function(emailID, flaggedKeyWord, context) {
  var flaggedContent = 'INSERT INTO contextTable (emailID, flaggedKeyWord, context) VALUES (' + emailID + ',\'' +  flaggedKeyWord + '\',\'' + context +  '\')';

  db.run(flaggedContent);
  console.log('insertIntoContextTable fx ran/////');
};

// var scanEmail = function(){
//   getUncheckedEmails(function(emailArray){
//     algo.filterEmail(emailArray);
//   });
// };

//fx to print email table to the terminal
var printEmailTable = function() {
  db.all('SELECT * FROM emailTable', function(err, rows) {
    if (err) {
      console.log('err');
    } else {
      console.log('these are rows', rows);
    }
  });
};

//setting up sqlite3 database w/ potential email schema
var insertEmail = exports.insertEmail = function(email) {
  var toField = email.to === undefined ? 'undefined' : email.to[0].address;
  var fromField = email.from === undefined ? 'undefined' : email.from[0].address;
  var cc = email.cc === undefined ? 'undefined' : email.cc[0].address;
  var bcc = email.bcc === undefined ? 'undefined' : email.bcc[0].address;
  var subject = email.subject;
  var priority = email.priority;
  var text = email.text;
  var date = email.date;
  var checked = '0';
  var flagged = '0';

  createEmailTable();
  createContextTable();
  insertIntoEmailTable(toField, fromField, cc, bcc, subject, priority, text, date, checked, flagged);
  printEmailTable();
};

var getFlaggedEmails = exports.getFlaggedEmails = function(cb) {
  console.log('triggered');
  var queryString = 'SELECT * FROM emailTable WHERE flagged="1"';

  db.all(queryString, function(err, rows) {
    if (err) {
      console.log('err');
    } else {
      console.log('rows fetched, running callback');
      cb(rows);
    }
  });
};

//fx to pull all unchecked emails from the db
var getUncheckedEmails = exports.getUncheckedEmails = function(cb) {
  console.log('starting to get Unchecked Emails');
  var query = 'SELECT * FROM emailTable WHERE checked="0"';

  db.all(query, function(err, responseArrayOfObjects) {
    if (err) {
      console.log('There was an error getting Unchecked Emails');
    } else {
      console.log('this is the database response.....', responseArrayOfObjects);
      cb(responseArrayOfObjects);
    }
  });
};

//fx to add a new filter into the database for the user
var addFilter = exports.addFilter = function(body, cb) {
  console.log('this is body', body);
  var username = body.username;
  var filterName = body.filterName;
  var getUserIDString = 'SELECT * FROM userTable WHERE username="' + username + '"';

  //get user id from database
  db.all(getUserIDString, function(err, userInfo) {
    if (err) {
      console.log('There was an error finding the userID for username', username);
    } else {
      console.log('found username', userInfo);
      var userID = userInfo[0].id;
      var queryString = 'INSERT INTO filterTable (userID, filterName) VALUES (' + userID + ',\'' +  filterName +  '\')';

      db.all(queryString, function(error, response) {
        if (error) {
          console.log('this is the error', error);
          cb(err);
        } else {
          console.log('this is the response', response);
          cb('YOUR FILTER HAS BEEN ADDED');
        }
      });
    }
  });
};

//create contextTable if it doenst exit
var createFilterTable = function() {
  var createTable = 'CREATE TABLE IF NOT EXISTS filterTable(id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, filterName char(50))';

  db.run(createTable);
};

//fx to add a new filter into the database for the user
var addKeyword = exports.addKeyword = function(body, cb) {
  console.log('this is body', body);
  var username = body.username;
  var filterName = body.filterName;
  var keyword = body.keyword;
  var getUserIDString = 'SELECT * FROM userTable WHERE username="' + username + '"';

  //get user id from database
  db.all(getUserIDString, function(err, userInfo) {
    if (err) {
      console.log('There was an error finding the userID for username', username);
    } else {
      console.log('found username', userInfo);
      var userID = userInfo[0].id;
      var getFilterIDString = 'SELECT * FROM filterTable WHERE userID="' + userID + '" AND filterName="' + filterName + '"';

      //get filter id from database
      db.all(getFilterIDString, function(err, filterInfo) {
        if (err) {
          console.log('There was an error finding the filterID for filter', filterName, 'and user', username);
        } else {
          console.log('found filter', filterInfo);
          var filterID = filterInfo[0].id;
          var queryString = 'INSERT INTO keywordTable (userID, filterID, keyword) VALUES (' + userID + ',' +  filterID + ',\'' + keyword + '\')';

          //insert keyword into the keywordTable
          db.all(queryString, function(error, response) {
            if (error) {
              console.log('this is the error', error);
              cb(err);
            } else {
              console.log('this is the response', response);
              cb('YOUR KEYWORD HAS BEEN ADDED');
            }
          });
        }
      });
    }
  });
};

var createKeywordTable = function() {
  var createTable = 'CREATE TABLE IF NOT EXISTS keywordTable(id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, filterID INTEGER, keyword char(50))';

  db.run(createTable);
};

//fx to create userTable if none exist
var createUserTable = function() {
  var createUserTable = 'CREATE TABLE IF NOT EXISTS userTable(id INTEGER PRIMARY KEY AUTOINCREMENT, username char(20))';

  //TODO: add user password and stuff
  db.run(createUserTable);
};

createUserTable();
createFilterTable();
createKeywordTable();
