var express = require('express');
var app = express();
var mailListener = require('./mailListener');
var db = require('./database.js');
var algo = require('./flaggingAlgo.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

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
});

app.post('/submitfilter', function(req, res) {
  // req.body will be {username: 'Anthony', filter: 'Anthony's filter'};
  // TODO (not for MVP): add sessions, token, etc etc
  // invoke the database function to insert into filtersTable, passing in the req.body
    //pass in cb that sends back a response
    //send back object with message
  db.addFilter(req.body, function(message) {
    //TODO: define and udpate the message being sent back. Will have to look inside the function in database.js
    res.send(message);
  });
});

app.post('/submitkeyword', function(req, res) {
  db.addKeyword(req.body, function(message) {
    res.send(message);
  });
});

app.post('/', function(req, res) {
  res.send('You posted!');
});

app.get('/*', function(req, res) {
  res.send('Redirect');
});

var server = app.listen((process.env.PORT || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;
});

if (__filename === process.argv[1]) {
  app.listen(6789);
}

module.exports = app;
