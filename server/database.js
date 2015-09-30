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
  var createString = 'CREATE TABLE IF NOT EXISTS emailList (to_field char(100), from_field char(100), cc char(100), bcc char(100), subject char(100), priority char(100), text MEDIUMTEXT, date DATE)';
  var sampleInsert = 'INSERT into emailList (to_field, from_field, cc, bcc, subject, priority, text, date) VALUES(\''
    + toField + '\',\''
    + fromField + '\',\''
    + cc + '\',\''
    + bcc + '\',\''
    + subject + '\',\''
    + priority + '\',\''
    + text + '\',\''
    + date + '\')';
  db.run(createString);
  db.run(sampleInsert);
  db.all('SELECT * FROM emailList', function(err, rows) {
    if (err) {
      console.log('err');
    }

    console.log('these are rows', rows);
  });

};

var getFlaggedEmails = exports.getFlaggedEmails = function(cb) {
  console.log('triggered');
  var queryString = 'SELECT * FROM emailList';
  db.all(queryString, function(err, rows) {
    if (err) {
      console.log('err');
    }

    console.log('rows fetched, running callback');
    cb(rows);
  })
}
