var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('emails.db');

//setting up sqlite3 database w/ potential email schema
var insertReturn = exports.insertReturn = function(email) {
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
  var createEmailTable = 'CREATE TABLE IF NOT EXISTS emailList(id INTEGER PRIMARY KEY AUTOINCREMENT, to_field char(100), from_field char(100), cc char(100), bcc char(100), subject char(100), priority char(100), text MEDIUMTEXT, parsedText MEDIUMTEXT, date DATE, checked INTEGER, flagged INTEGER)';
  var sampleInsert = 'INSERT into emailList (to_field, from_field, cc, bcc, subject, priority, text, date, checked, flagged) VALUES(\''
    + toField + '\',\''
    + fromField + '\',\''
    + cc + '\',\''
    + bcc + '\',\''
    + subject + '\',\''
    + priority + '\',\''
    + text + '\',\''
    + date + '\',\''
    + checked + '\',\''
    + flagged + '\')';
  var createContextTable = 'CREATE TABLE IF NOT EXISTS flaggedContextList(id INTEGER PRIMARY KEY AUTOINCREMENT, emailID INTEGER, flaggedKeyWord char(100), context char(500))';

  db.run(createEmailTable);
  db.run(sampleInsert);
  db.all('SELECT * FROM emailList', function(err, rows) {
    if (err) {
      console.log('err');
    } else {
      console.log('these are rows', rows);
    }
  });
};

var getFlaggedEmails = exports.getFlaggedEmails = function(cb) {
  console.log('triggered');
  var queryString = 'SELECT * FROM emailList';
  db.all(queryString, function(err, rows) {
    if (err) {
      console.log('err');
    } else {
      console.log('rows fetched, running callback');
      cb(rows);
    }
  })
};

var getUncheckedEmails = exports.getUncheckedEmails = function() {
  console.log('starting to get Unchecked Emails');
  var query = 'SELECT * FROM emailList WHERE checked="0"';
  db.all(query, function(err, responseArrayOfObjects) {
    if (err) {
      console.log('There was an error getting Unchecked Emails');
    } else {
    console.log('this is the db response.....', responseArrayOfObjects);
    return responseArrayOfObjects;
  }
  });
};
