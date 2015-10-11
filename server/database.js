var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var bcrypt = require('bcryptjs');

//create new database called emails.db
var dbFile = path.join(__dirname + '/emails.db');
var db = exports.db = new sqlite3.Database(dbFile);

/////FX's TO MODIFY DB
//fx to update the emailTable to mark an email as checked
var markChecked = function markChecked(emailID) {
  var checkString = 'UPDATE emailTable SET checked="1" WHERE id=' + emailID;

  db.run(checkString);
  console.log('markChecked fx ran/////');
};

//fx to update the emailTable  to mark an email as flagged
var markFlagged = function markFlagged(emailID) {
  var flagString = 'UPDATE emailTable SET flagged="1" WHERE id=' + emailID;

  db.run(flagString);
  console.log('markFlagged fx ran/////');
};

//insert email into emailTable
var insertIntoEmailTable = function insertIntoEmailTable(toField, fromField, cc, bcc, subject, priority, text, date, checked, flagged) {
  var emailContent = 'INSERT into emailTable (recipient, sender, cc, bcc, subject, priority, body, sendTime, checked, flagged) VALUES(\''
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

//fx to insert into the contextTable
var insertIntoContextTable = function insertIntoContextTable(userID, filterID, emailID, flaggedKeyword, context) {
  var flaggedContent = 'INSERT INTO contextTable (userID, filterID, emailID, flaggedKeyword, context) VALUES (' + userID + ',' + filterID + ',' + emailID + ',\'' +  flaggedKeyword + '\',\'' + context +  '\')';

  db.run(flaggedContent);
  console.log('insertIntoContextTable fx ran/////');
};

//fx to insert into tagsTable, eg tagName=racist, keyword=coolie
var insertIntoTagsTable = function insertIntoTagsTable(tagName, keyword) {
  var query = 'INSERT INTO tagsTable(tagName, keyword) VALUES (\'' +  tagName + '\',\'' + keyword +  '\')';

  db.run(query);
  console.log('insertIntoTagsTable fx ran/////');
};

//setting up sqlite3 database w/ potential email schema
var insertEmail = function insertEmail(email) {
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

//fx to add a new filter into the database for the user
var insertFilter = function insertFilter(body, cb) {
  console.log('this is body', body);
  var username = body.username;
  var filterName = body.filterName;
  var getUserIDString = 'SELECT * FROM userTable WHERE username="' + username + '"';

  //get user id from database
  db.all(getUserIDString, function(err, userInfo) {
    if (err) {
      console.log('There was an error finding the userID for username', username);

      //if username is not found.
    } else if (userInfo.length === 0) {
      console.log('user not found for username', username);
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

//fx to add a new filter into the database for the user
var insertKeyword = function insertKeyword(body, cb) {
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

          insertIntoKeywordTable(userID, filterID, keyword, cb);
        }
      });
    }
  });
};

//fx to insert a keyword into the keyword table
var insertIntoKeywordTable = function insertIntoKeywordTable(userID, filterID, keyword, cb) {
  var queryString = 'INSERT INTO keywordTable(userID, filterID, keyword) VALUES('+ userID + ',' + filterID + ',\'' + keyword + '\')';
  // console.log('its inside the insertIntoKeywordTable now!')
  db.all(queryString, function(error, response) {
    if (error) {
      console.log('this is the error', error);
      cb(err);
    } else {
      // console.log('this is the insertIntoKeywordTable response', response);
      cb('YOUR KEYWORD HAS BEEN ADDED');
    }
  });
};


//fx to insert new user into userTable
var insertIntoUserTable = function insertIntoEmailTable(username, password, permissionGroup, name, title, email, department, managerID) {
  var active = 1;
  var salt = bcrypt.genSaltSync(10);
  var saltedHash = bcrypt.hashSync(password, salt);
  var sqlQuery = 'INSERT into userTable (username, saltedHash, permissionGroup, name, title, date, email, department, managerID, active) VALUES(\''
    + username + '\',\''
    + saltedHash + '\',\''
    + permissionGroup + '\',\''
    + name + '\',\''
    + title + '\',\''
    + new Date() + '\',\''
    + email + '\',\''
    + department + '\',\''
    + managerID + '\',\''
    + active + '\');';

  db.run(sqlQuery);
};


//TEMP CODE TO INSERT BADWORDSARRAY INTO EMAILS.DB
var badwords = require('./badWordsArray.js')
// console.log('this is bwa.........', bwa);

var bwa = badwords.badWordArray;

var tempFX = function tempFX() {
  console.log('tempFX is running!!!')
  var cb = function cb(arg) {
    // console.log(arg);
  };
  var userID = 999;
  var filterID = 999;
  console.log('this is bwa length', bwa.length);
  for (var i = 0; i < bwa.length-1; i++) {
    // console.log('hi');
    insertIntoKeywordTable(userID, filterID, bwa[i], cb);
  };
};

tempFX();
//END TEMP CODE TO INSERT BADWORDSARRAY INTO EMAILS.DB




/////FX's TO GET DATA FROM DB
//fx to get an array of flagged keywords.
// eg [ { userID: 1, filterID: 2, keyword: 'hello' },
//   { userID: 4, filterID: 3, keyword: 'wowza' },
//   { userID: 5, filterID: 4, keyword: 'wtf' } ]
var getFlaggedWords = function getFlaggedWords(cb) {
  var queryString = 'SELECT userID, filterID, keyword FROM keywordTable';
  db.all(queryString, function(err, flaggedWords) {
    if (err) {
      console.log('There was an error getting keywords', err);
    } else {
      // console.log('These are the keywords returned from getFlaggedWords......', flaggedWords);

      cb(flaggedWords);
    }
  });
};

//fx to get an array of flagged emails.
var getFlaggedEmails = function getFlaggedEmails(userID, isAdmin, cb) {
  console.log('triggered');
  var queryString = 'SELECT * FROM emailTable WHERE flagged="1"';

  db.all(queryString, function(err, flaggedEmails) {
    if (err) {
      console.log('err');
    } else {
      console.log('emails fetched, now getting all the flagged contexts for user');
      var fetchString = isAdmin ? 'SELECT emailID, flaggedKeyword, context FROM contextTable' : 'SELECT emailID, flaggedKeyword, context FROM contextTable WHERE userID=' + userID;

      console.log('this is fetchString', fetchString);
      db.all(fetchString, function(error, flaggedContext) {
        if (error) {
          console.log('fetch error', error);
        } else {
          console.log('emails and flagged contexts all fetched');
          for (var i = 0; i < flaggedContext.length; i++) {
            for (var j = 0; j < flaggedEmails.length; j++) {
              flaggedEmails[j].flags = flaggedEmails[j].flags || [];
              flaggedEmails[j].focusLevel = 'one';
              if (flaggedContext[i].emailID === flaggedEmails[j].id) {
                flaggedEmails[j].flags.push(flaggedContext[i]);
              }
            }
          }

          cb(flaggedEmails);
        }
      });
    }
  });
};

//fx to pull all unchecked emails from the db
var getUncheckedEmails = function getUncheckedEmails(cb) {
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

//fx to get all filters
var getAllFilters = function getAllFilters(cb) {
  var queryString = 'SELECT * FROM filterTable;';
  db.all(queryString, function(err, filterArray) {
    if (err) {
      console.log('There was an error getting filters');
    } else {
      console.log('this is the database response.....', filterArray);
      var userQuery = 'SELECT id, username FROM userTable';
      db.all(userQuery, function(err, userArray) {
        var keywordQuery = 'SELECT * FROM keywordTable';
        db.all(keywordQuery, function(error, keywordArray) {
          if (error) {
            console.log('There was an error getting keywords', error);
          } else {
            for (var i = 0; i < filterArray.length; i++) {
              var filter = filterArray[i];
              filter.keyword = filterArray[i].keyword || [];
              var filterID = filter.id;
              for (var j = 0; j < keywordArray.length; j++) {
                var keyword = keywordArray[j];
                if (filterID === keyword.filterID) {
                  filter.keyword.push({keywordID: keyword.id, keyword: keyword.keyword});
                }
              }

              for (var k = 0; k < userArray.length; k++) {
                if (filter.userID === userArray[k].id) {
                  filterArray[i].username = userArray[k].username;
                }
              }
            }

            cb(filterArray);
          }
        });
      });
    }
  });
};

//fx to return an array of keywords from the tagsTable (NOT the keyword table!)
var getArrayOfKeywordsFromTagsTable = function getArrayOfKeywordsFromTagsTable(tagName, cb) {
  var query = 'SELECT keyword FROM tagsTable WHERE tagName ="' + tagName + '"';

  // var query = 'SELECT keyword FROM tagsTable WHERE tagName =' + tagName + ')' ;
  db.all(query, function(err, result) {
    if (err) {
      console.log('There was an error getting keywordsArray with tagName =', tagName);
    } else {
      console.log('this is the result.....', result);
      cb(result);
      return result; //eg of result... [ { keyword: 'coolie' }, { keyword: 'gringo'} ]
    }
  });
};

//FX to get user data for authentication
var getUser = function getUser(body, cb) {
  var username = body.username;
  console.log('this is username', username);
  var queryString = 'SELECT username, saltedHash, active FROM userTable WHERE username=\'' + username + '\'';
  console.log('this is queryString', queryString);
  db.all(queryString, function(error, response) {
    if (error) {
      cb(error);
      console.log('no username found in table');
    } else {
      cb(response);
    }
  });
};

var createAdmin = function createAdmin(body, cb) {
  var username = body.username;
  var saltedHash = body.hash;
  var permissionGroup = 'admin';
  var name = body.name;
  var title = body.title;
  var date = 'dateplaceholder';
  var email = body.email;
  var department = body.department;
  //managerID currently not used for admin users, defaults to 0
  var managerID = 0;
  var active = 1;
  var queryString = 'INSERT into userTable (username, saltedHash, permissionGroup, name, title, date, email, department, managerID, active) VALUES(\''
    + username + '\',\''
    + saltedHash + '\',\''
    + permissionGroup + '\',\''
    + name + '\',\''
    + title + '\',\''
    + date + '\',\''
    + email + '\',\''
    + department + '\','
    + managerID + ','
    + active + ');';
  db.all(queryString, function(err, response) {
    if (err) {
      console.log('there was an error adding admin', err);
    } else {
      cb(response);
    }
  })
}

/////FX FOR DEBUGGING PURPOSES
//fx to print email table to the terminal
var printEmailTable = function printEmailTable() {
  db.all('SELECT * FROM emailTable', function(err, rows) {
    if (err) {
      console.log('err');
    } else {
      console.log('these are rows', rows);
    }
  });
};

/////FX's TO CREATE TABLES
//create emailTable if it doesnt exit
var createEmailTable = function createEmailTable() {
  var createTable = 'CREATE TABLE IF NOT EXISTS emailTable(id INTEGER PRIMARY KEY AUTOINCREMENT, recipient CHAR(100), sender CHAR(100), cc CHAR(100), bcc CHAR(100), subject CHAR(100), priority CHAR(100), body MEDIUMTEXT, parsedText MEDIUMTEXT, sendTime DATE, checked INTEGER, flagged INTEGER)';

  db.run(createTable);
};

//fx to create contextTable if it doesnt exit
var createContextTable = function createContextTable() {
  var createTable = 'CREATE TABLE IF NOT EXISTS contextTable(id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, filterID INTEGER, emailID INTEGER, flaggedKeyword CHAR(100), context CHAR(500))';

  db.run(createTable);
};

//fx to create keywordTable  if it doesnt exit
var createKeywordTable = function createKeywordTable() {
  var createTable = 'CREATE TABLE IF NOT EXISTS keywordTable(id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, filterID INTEGER, keyword CHAR(50))';

  db.run(createTable);
};

//fx to create contextTable if it doesnt exit
var createFilterTable = function createFilterTable() {
  var createTable = 'CREATE TABLE IF NOT EXISTS filterTable(id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, filterName CHAR(50))';

  db.run(createTable);
};

//fx to create userTable if it doesnt exit
var createUserTable = function createUserTable() {
  var createUserTable = 'CREATE TABLE IF NOT EXISTS userTable(id INTEGER PRIMARY KEY AUTOINCREMENT, username CHAR(20), saltedHash CHAR(72), permissionGroup CHAR(50), name CHAR(50), title CHAR(50), date DATE, email CHAR(50), department CHAR(50), managerID INTEGER, active INTEGER)';

  //TODO: add user password and stuff
  db.run(createUserTable);
};

//fx to create tagsTable if it doesnt exist.  eg tagName=racist, harassment, corporate treason
var createTagsTable = function createTagsTable() {
  var query = 'CREATE TABLE IF NOT EXISTS tagsTable(id INTEGER PRIMARY KEY AUTOINCREMENT, tagName CHAR(30), keyword CHAR(30))';

  db.run(query);
};

//FX CALLS
createEmailTable();
createContextTable();
createKeywordTable();
createFilterTable();
createUserTable();
createTagsTable();

//MODULE.EXPORTS TO EXPORT REQUIRED FX
module.exports = {
  markChecked,
  markFlagged,
  insertIntoEmailTable,
  insertIntoContextTable,
  insertEmail,
  insertFilter,
  insertKeyword,
  insertIntoTagsTable,
  insertIntoUserTable,
  getUser,
  getFlaggedWords,
  getFlaggedEmails,
  getUncheckedEmails,
  getAllFilters,
  getArrayOfKeywordsFromTagsTable,
  createAdmin,
};
