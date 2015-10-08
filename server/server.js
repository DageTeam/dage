var express = require('express');
var app = express();
// var mailListener = require('./mailListener');
var db = require('./database.js');
var algo = require('./flaggingAlgo.js');
var classify = require('./classifyingAlgo.js');
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
app.get('/emailData', function(req, res) {

  //TODO: placeholder until authentication complete
  var userIsAuthenticated = true;
  var isAdmin = true;

  if (userIsAuthenticated) {
    //TODO: placeholder userID until authentication is complete
    var userID = 1;

    res.setHeader('Access-Control-Allow-Origin', '*');

    //get the flagged emails via a db query
    db.getFlaggedEmails(userID, isAdmin, function(emails) {
      console.log(typeof emails);
      console.log(emails);
      res.send(emails);
    });
  } else {
    res.send('user is not authenticated');
  }

});

app.get('/filterData', function(req, res) {
  db.getAllFilters(function(data) {
    res.send(data);
  })
})

const emailsArray = [
  {
    id: 'emailId',
    sender: 'ServerEMAIL!!!',
    recipient: 'emailRecipient',
    subject: 'subjectString',
    body: 'bodyString',
    sendTime: 1000,
    focusLevel: 'complete',
    flags:
      [
        {
          type: 'flagTypeString1',
          context: 'contextString1',
        },
        {
          type: 'flagTypeString2',
          context: 'contextString2',
        },
      ],
  },
];

app.get('/tempEmailData', function(req, res) {
  //get the flagged emails via a db query
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.getFlaggedEmails(function(emails) {
    res.send(emailsArray);
  });
});

app.post('/submitfilter', function(req, res) {
  // req.body will be {username: 'Anthony', filter: 'Anthony's filter'};
  // TODO (not for MVP): add sessions, token, etc etc
  // invoke the database function to insert into filtersTable, passing in the req.body
  //pass in cb that sends back a response
  //send back object with message
  db.insertFilter(req.body, function(message) {
    //TODO: define and udpate the message being sent back. Will have to look inside the function in database.js
    res.send(message);
  });
});

app.post('/submitkeyword', function(req, res) {
  db.insertKeyword(req.body, function(message) {
    res.send(message);
  });
});

//route handing for checking if user login is correct
//TODO: finish this
app.post('/userLogin', function(req, res) {

})

//route handing for checking if user auth/token is valid
//TODO: finish this
app.get('/userAuth', function(req, res) {

})

app.post('/', function(req, res) {
  res.send('You posted!');
});

app.get('/*', function(req, res) {
  res.send('Redirect');
});

var server = app.listen((process.env.PORT || 4000), function() {
  var host = server.address().address;
  var port = server.address().port;
});

if (__filename === process.argv[1]) {
  app.listen(6789);
}

module.exports = app;
