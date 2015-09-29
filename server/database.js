

//setting up sqlite3 database w/ potential email schema
var insertReturn = exports.insertReturn = function() {
  var toField = 'dageprotect@gmail.com';
  var fromField = 'no_reply@gmail.com';
  var cc = 'cc';
  var bcc = 'bcc';
  var subject = 'testing database insert';
  var priority = 'high';
  var text = 'this is the text';
  var date = '2015-09-24T20:48:24.000Z';
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

  db.close();
};
