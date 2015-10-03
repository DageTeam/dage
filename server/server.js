var express = require('express');
var app = express();
var mailListener = require('./mailListener');
var db = require('./database.js');
var algo = require('./flaggingAlgo.js');

//Default route
app.get('/', function(req, res) {
  // db.insertEmail(req.body);
  res.send('Hello, world!');
});

//Test route TODO: get rid of
app.get('/test', function(req, res) {
  // db.insertEmail();
  res.send('Test');
});


//dashboard is the placeholder url for the dashboard url for the client
app.get('/dashboard', function(req, res) {
  //get the flagged emails via a db query
  db.getFlaggedEmails(function(emails) {
    console.log(typeof emails);
    res.send(emails);
  });
})

app.post('/', function(req, res) {
  res.send('You posted!');
});

app.get('/*', function(req, res) {
  res.send('Redirect');
})

var server = app.listen((process.env.PORT || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;
});

if (__filename === process.argv[1]) {
  app.listen(6789);
}

module.exports = app;
