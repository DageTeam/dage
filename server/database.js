var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var bcrypt = require('bcryptjs');
var dbFile = path.join(__dirname + '/emails.db');
var db = exports.db = new sqlite3.Database(dbFile);

/////FX's TO MODIFY DB
//fx to update the emailTable to mark an email as checked
var markChecked = function markChecked(emailID) {
  var checkString = 'UPDATE emailTable SET checked="1" WHERE id=' + emailID;

  // console.log('markChecked fx ran/////');
  db.run(checkString);
};

//fx to update the emailTable to mark an email as flagged
var markFlagged = function markFlagged(emailID) {
  var flagString = 'UPDATE emailTable SET flagged="1" WHERE id=' + emailID;

  // console.log('markFlagged fx ran/////');
  db.run(flagString);
};

//fx to unflag email in emailTable
var unflagEmail = function unflagEmail(emailID, cb) {
  var flagString = 'UPDATE emailTable SET flagged="0" WHERE id=' + emailID;

  db.all(flagString, function(error, response) {
    if (error) {
      console.log('There was an error with unflagEmail', error);
      cb('');
    } else {
      cb('success');
    }
  });
};

//fx to mark email as read
var emailMarkRead = function emailMarkRead(emailID, cb){
  var queryString = 'UPDATE emailTable SET read = "1" where id =' + emailID;

  db.all(queryString, function(error, response){
    if(error){
      console.log('There was an error with emailMarkRead', error);
      cb(error);
    } else{
      cb(response)
    }
  })
};

//fx to insert email into emailTable
var insertIntoEmailTable = function insertIntoEmailTable(toField, fromField, cc, bcc, subject, priority, text, date, checked, flagged) {
  var emailContent = 'INSERT into emailTable (recipient, sender, cc, bcc, subject, priority, body, sendTime, checked, flagged, read) VALUES(\''
    + toField + '\',\''
    + fromField + '\',\''
    + cc + '\',\''
    + bcc + '\',\''
    + subject + '\',\''
    + priority + '\',\''
    + text + '\',\''
    + date + '\',\''
    + checked + '\',\''
    + flagged + '\',\''
    + 0 + '\');';

  db.run(emailContent);
};

//fx to insert into the contextTable
var insertIntoContextTable = function insertIntoContextTable(userID, filterID, emailID, flaggedKeyword, context) {
  var flaggedContent = 'INSERT INTO contextTable (userID, filterID, emailID, flaggedKeyword, context) VALUES (' + userID + ',' + filterID + ',' + emailID + ',\'' +  flaggedKeyword + '\',\'' + context +  '\')';

  // console.log('insertIntoContextTable fx ran/////');
  db.run(flaggedContent);
};

//fx to insert into tagsTable, eg tagName=racist, keyword=coolie
var insertIntoTagsTable = function insertIntoTagsTable(tagName, keyword) {
  var query = 'INSERT INTO tagsTable(tagName, keyword) VALUES (\'' +  tagName + '\',\'' + keyword +  '\')';

  // console.log('insertIntoTagsTable fx ran/////');
  db.run(query);
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

  insertIntoEmailTable(toField, fromField, cc, bcc, subject, priority, text, date, checked, flagged);
  printEmailTable();
};

//fx to add a new filter into the database for the user
var insertFilter = function insertFilter(body, cb) {
  var username = body.username;
  var filterName = body.filter;
  var getUserIDString = 'SELECT * FROM userTable WHERE username="' + username + '"';

  //get user id from database
  db.all(getUserIDString, function(error, userInfo) {
    if (error) {
      console.log('There was an error with getUserIDString', error);
      //if username is not found.
    } else if (userInfo.length === 0) {
      console.log('userInfo is empty');
    } else {
      // console.log('found username', userInfo);
      var userID = userInfo[0].id;
      var queryString = 'INSERT INTO filterTable (userID, filterName) VALUES (' + userID + ',\'' +  filterName +  '\')';

      db.all(queryString, function(error, response) {
        if (error) {
          console.log('There was an error with insertFilter', error);
          cb(error);
        } else {
          db.all('SELECT id, filterName from filterTable where filterName ="' + filterName + '"', function(error, response) {
            if (error) {
              console.log('There was an error with insertFilter:', error);
              cb(error);
            } else {
              cb(response[0].id, response[0].filterName);
            }
          });
        }
      });
    }
  });
};

//fx to add a new flag into the database for the user
var insertKeyword = function insertKeyword(body, cb) {
  var username = body.username;
  var filterId = body.filterId;
  var keyword = body.keyword;
  var getUserIDString = 'SELECT * FROM userTable WHERE username="' + username + '"';

  //get user id from database
  db.all(getUserIDString, function(error, userInfo) {
    if (error) {
      console.log('There was an error finding the userID for username in insertKeyword', username, error);
    } else {
      // console.log('found username', userInfo);
      var userID = userInfo[0].id;
      var queryString = 'INSERT INTO keywordTable(userID, filterID, keyword) VALUES(' + userID + ',' + filterId + ',\'' + keyword + '\')';

      db.all(queryString, function(error, response) {
        if (error) {
          console.log('There was an error with insertKeyword', error);
          cb(error);
        } else {
          // console.log('this is the insertIntoKeywordTable response', response);
          db.all('SELECT id from keywordTable where filterID="' + filterId + '"and keyword="' + keyword + '"', function(error, resp) {
            if (error) {
              console.log('There was an error with insertKeyword', error);
            }else {
              cb(keyword, resp[0].id);
            }
          });
        }
      });
    }
  });
};

//fx to remove flag from the database for the user
var removeKeyword = function removeKeyword(body, cb){
  var username = body.username;
  var filterId = body.filterId;
  var keyword = body.keyword;
  var getUserIDString = 'SELECT * FROM userTable WHERE username="' + username + '"';

  //get user id from database
  db.all(getUserIDString, function(error, userInfo) {
    if (error) {
      console.log('There was an error finding the userID for username=', username, 'error:', error);
    } else {
      var userID = userInfo[0].id;
      var queryString = 'DELETE from keywordTable where userID="' + userID + '" AND filterID=' + filterId + ' AND id=' + parseInt(keyword) + '';

      db.all(queryString,function(error, response){
        if (error) {
          console.log('There was an error with removeKeyword', error);
          cb(error);
        } else {
          cb('removed keyword');
        }
      })
    }
  })
};

//fx to insert new user into userTable
var insertIntoUserTable = function insertIntoUserTable(username, password, permissionGroup, name, title, email, department, managerID) {
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

//fx to reset user password to 'password', salted and hashed
var resetPassword = function resetPassword(username, callback) {
  var salt = bcrypt.genSaltSync(10);
  var password = bcrypt.hashSync('password', salt);
  var sqlQuery = 'UPDATE userTable SET saltedHash=\"' + password + '\" WHERE username =\"' + username + '\"';
  var cb = function cb(error, response) {
    if (error) {
      console.log('There was an error with resetPassword:', error);
    } else {
      callback();
    }
  };

  db.all(sqlQuery, cb);
};

//fx to mark user as inactive.
var markUserInactiveInUserTable = function markUserInactiveInUserTable(username) {
  var sqlQuery = 'UPDATE userTable SET active=0 WHERE username =\'' + username + '\'';

  db.all(sqlQuery, function cb(error, response) {
    if (error) {
      console.log('markUserInactiveInUserTable error...', error);
    } else {
      console.log('Successful marked user:', username, 'as inactive!');
    }
  });
};

//fx to toggle user as inactive.
var toggleUserActive = function toggleUserActive(username, active, cb) {
  var deactivate = 'UPDATE userTable SET active=0 WHERE username =\'' + username + '\'';
  var activate = 'UPDATE userTable SET active=1 WHERE username =\'' + username + '\'';
  var query = (active===1)? deactivate:activate;

  db.all(query, function(error, response) {
    if (error) {
      console.log('There was an error with toggleUserActive...', error);
    } else {
      console.log('Successful marked user:', username);
      cb();
    }
  });
};

//fx to create user in userTable
var createUser = function createUser(body, cb) {
  var username = body.username;
  var saltedHash = body.hash;
  var permissionGroup = body.permissionGroup;
  var name = body.name;
  var title = body.title;
  var date = new Date();
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

  db.all(queryString, function(error, response) {
    if (error) {
      console.log('there was an error adding admin', error);
    } else {
      cb(response);
    }
  });
};


//FX'S TO QUERY THE DB
//fx to return the total number of users in the userTable
var getNumOfUsers = function getNumOfUsers() {
  var sqlQuery = 'SELECT COUNT(*) FROM userTable';
  var cb = function cb(error, response) {
    if (error) {
      console.log('There was an error with getNumOfUsers:', error);
    } else {
      for (var key in response[0]) {
        // console.log('successfully fetched getNumOfUsers');
        return response[0][key];
      }
    }
  };

  return db.all(sqlQuery, cb);
};

//fx to get all active users in the userTable
var getAllActiveUsers = function getAllActiveUsers(cb) {
  var queryString = 'SELECT * FROM userTable WHERE active = "1"';

  db.all(queryString, function(error, response) {
    if (error) {
      console.log('There was an error with with getting all active users', error);
    } else {
      cb(response);
    }
  });
};

//fx to get all active users in the userTable
var getAllUsers = function getAllUsers(cb) {
  var queryString = 'SELECT * FROM userTable';

  db.all(queryString, function(error, response) {
    if (error) {
      console.log('There was an error with getting all users', error);
    } else {
      cb(response);
    }
  });
};

//fx to get an array of flagged words
var getFlaggedWords = function getFlaggedWords(cb) {
  var queryString = 'SELECT userID, filterID, keyword FROM keywordTable';
  db.all(queryString, function(error, flaggedWords) {
    if (error) {
      console.log('There was an error getting keywords', error);
    } else {
      // console.log('These are the keywords returned from getFlaggedWords......', flaggedWords);
      cb(flaggedWords);
    }
  });
};

//fx to get an array of flagged emails.
var getFlaggedEmails = function getFlaggedEmails(userID, isAdmin, getAll, cb) {
  var queryString = '';

  if (getAll) {
    queryString = 'SELECT * FROM emailTable WHERE flagged="1"';
  } else {
    queryString = 'SELECT * FROM emailTable WHERE flagged="1" AND read="0"';
  };

  db.all(queryString, function(error, flaggedEmails) {
    // console.log('this is flaggedEmails', flaggedEmails);
    if (error) {
      console.log('there was an error getting flagged emails',error);
    } else {
      // console.log('emails fetched, now getting all the flagged contexts for user');
      var fetchString = isAdmin ? 'SELECT emailID, flaggedKeyword, context FROM contextTable' : 'SELECT emailID, flaggedKeyword, context FROM contextTable WHERE userID=' + userID;

      // console.log('this is fetchString', fetchString);
      db.all(fetchString, function(error, flaggedContext) {
        if (error) {
          console.log('There was a fetch error', error);
        } else {
          // console.log('emails and flagged contexts all fetched');
          for (var i = 0; i < flaggedContext.length; i++) {
            for (var j = 0; j < flaggedEmails.length; j++) {
              flaggedEmails[j].flags = flaggedEmails[j].flags || [];

              //set the focus level of each email to one [flag], which will be utilized on the client side later on
              flaggedEmails[j].focusLevel = 'one';
              if (flaggedContext[i].emailID === flaggedEmails[j].id) {
                flaggedEmails[j].flags.push(flaggedContext[i]);
              };

              //if the flagged email has no subject, set it to 'no subject'
              if (flaggedEmails[j].subject === 'undefined') {
                flaggedEmails[j].subject = '<no subject>';
              };
            }
          }

          cb(flaggedEmails);
        }
      });
    }
  });
};

// var getAllEmails = function getAllEmails(userID, isAdmin, cb) {
//   var queryString = 'SELECT * FROM emailTable WHERE flagged="1"';
//   db.all(queryuery, function(error, allEmails){
//     if (error) {
//       console.log('error', error);
//     } else {
//       var fetchString = isAdmin ? 'SELECT emailID, flaggedKeyword, context FROM contextTable' : 'SELECT emailID, flaggedKeyword, context FROM contextTable WHERE userID=' + userID;
//       db.all(fetchString, function(error))
//     }
//   })
// }

//fx to pull all unchecked emails from the db
var getUncheckedEmails = function getUncheckedEmails(cb) {
  // console.log('starting to get Unchecked Emails');
  var query = 'SELECT * FROM emailTable WHERE checked="0"';

  db.all(query, function(error, responseArrayOfObjects) {
    if (error) {
      console.log('There was an error with getUncheckedEmails()', error);
    } else {
      // console.log('this is the database response.....', responseArrayOfObjects);
      cb(responseArrayOfObjects);
    }
  });
};

//fx to get all filters
var getAllFilters = function getAllFilters(cb) {
  var queryString = 'SELECT * FROM filterTable;';

  db.all(queryString, function(error, filterArray) {
    if (error) {
      console.log('There was an error with getAllFilters()', error);
    } else {
      var userQuery = 'SELECT id, username FROM userTable';

      db.all(userQuery, function(error, userArray) {
        var keywordQuery = 'SELECT * FROM keywordTable';

        db.all(keywordQuery, function(error, keywordArray) {
          if (error) {
            console.log('There was an error getting keywords', error);
          } else {
            for (var i = 0; i < filterArray.length; i++) {
              var filter = filterArray[i];
              var filterID = filter.id;

              filter.keyword = filterArray[i].keyword || [];
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
  db.all(query, function(error, result) {
    if (error) {
      console.log('There was an error getting keywordsArray with tagName =', tagName, 'and error:', error);
    } else {
      cb(result);
      return result; //eg of result... [ { keyword: 'coolie' }, { keyword: 'gringo'} ]
    }
  });
};

//fx to get user data for authentication
var getUser = function getUser(body, cb) {
  var username = body.username;
  var queryString = 'SELECT username, saltedHash, active, permissionGroup FROM userTable WHERE username=\'' + username + '\'';

  db.all(queryString, function(error, response) {
    if (error) {
      console.log('no username found in table', error);
      cb(error);
    } else {
      cb(response);
    }
  });
};


/////FX FOR DEBUGGING PURPOSES
//fx to print email table to the terminal
var printEmailTable = function printEmailTable() {
  db.all('SELECT * FROM emailTable', function(error, rows) {
    if (error) {
      console.log('There was an error with printEmailTable', error);
    } else {
      console.log('these are email rows', rows);
    }
  });
};


/////FX's TO CREATE TABLES
//fx to create emailTable if it doesnt exit
var createEmailTable = function createEmailTable() {
  var createTable = 'CREATE TABLE IF NOT EXISTS emailTable(id INTEGER PRIMARY KEY AUTOINCREMENT, recipient CHAR(100), sender CHAR(100), cc CHAR(100), bcc CHAR(100), subject CHAR(100), priority CHAR(100), body MEDIUMTEXT, parsedText MEDIUMTEXT, sendTime DATE, checked INTEGER, flagged INTEGER, read INTEGER)';

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
  unflagEmail,
  emailMarkRead,
  insertIntoEmailTable,
  insertIntoContextTable,
  insertEmail,
  insertFilter,
  insertKeyword,
  removeKeyword,
  insertIntoTagsTable,
  insertIntoUserTable,
  getUser,
  getFlaggedWords,
  getFlaggedEmails,
  getUncheckedEmails,
  getAllFilters,
  getArrayOfKeywordsFromTagsTable,
  createUser,
  getNumOfUsers,
  resetPassword,
  markUserInactiveInUserTable,
  getAllActiveUsers,
  getAllUsers,
  toggleUserActive,
};
