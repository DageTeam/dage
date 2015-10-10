var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mailListener = require('./mailListener');
var db = require('./database.js');
var algo = require('./flaggingAlgo.js');
var classify = require('./classifyingAlgo.js');
var authorization = require('../auth.js');

var secret = authorization.jwtSecret;
var app = express();

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.getAllFilters(function(data) {
    res.send(data);
  });
});

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
  db.getUser(req.body.username, function(data) {
    if (data) {
      bcrypt.compare(req.body.password, data[0]['hash'], function(err, data) {
        if (err) {
          res.status(401).end('Either username or password is incorrect');
        }

        //if typed in password checks out, create a token
        if (data) {
          //creating token with username as payload
          var jwtSecret = secret;
          var token = jwt.sign({
            username: req.body.username,
            level: data[0]['level'],
          }, jwtSecret);
          res.send({
            //sending back token for client processing
            token: token,
            username: req.body.username,
            level: data[0]['level'],
          });
        }
      });
    } else {
      res.status(401).end('User does not exist');
    }
  });
});

//route handing for checking if user auth/token is valid
//TODO: finish this
app.post('/userAuth', function(req, res) {
  jwt.verify(req.body.token, secret, function(err, decoded) {
    if (err) {
      res.status(401).end('bad token');
    } else {
      var decoded = jwt.decode(req.body.token, {complete:true});

      res.send({
        username:decoded.payload.username,
        level: decoded.payload.level,
      });
    }
  });
});

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
