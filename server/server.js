var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

// var mailListener = require('./mailListener');
//must manually start mailListener.
var db = require('./database.js');
var algo = require('./flaggingAlgo.js');
var classify = require('./classifyingAlgo.js');
var authorization = require('../auth.js');

var secret = authorization.jwtSecret;
var app = express();

var connection = mysql.createConnection({
  host     : '173.194.248.220',
  user     : 'root',
  password : 'node$1234',
  database : 'enronEmail'
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Default route for server side code. Currently using webpacks.
app.get('/', function(req, res) {
  // db.insertEmail(req.body);
  res.send('Hello, world!');
});

//dashboard is the placeholder url for the dashboard url for the client
app.get('/emailData', function(req, res) {
  //TODO: placeholder until authentication complete
  var userIsAuthenticated = true;
  var isAdmin = true;

  if (userIsAuthenticated) {
    //TODO: placeholder userID until authentication is complete
    var userID = 1;

    //get the flagged emails via a db query
    db.getFlaggedEmails(userID, isAdmin, false, function(emails) {
      // console.log(typeof emails);
      // console.log(emails);
      res.send(emails);
    });
  } else {
    res.send('user is not authenticated');
  }
});

app.get('/allEmails', function(req,res) {
  var isAdmin = true;
  var userID = 1;

  db.getFlaggedEmails(userID, isAdmin, true, function(emails) {
    res.send(emails);
  })
})

app.get('/MLEmails', function(req,res) {
  var isAdmin = true;
  var userID = 1;

  connection.connect();

  var returnObjectCallback = function (json){
    console.log('inside returnObjectCallback')
    // res.setHeader('Content-Type' , 'x-application/json');
    res.send(json);
    // res.send(json);
  }

  var json = '';
  var query = "select * from p_ethicFilterClassified \
   where p_classification like '%P_inappropriate%' \
   and n_classification like '%innappropriate%' \
   and body like '%fuck%'limit 20"
  connection.query(query, function(err, rows, fields) {
    console.log('inside Query')
    if (err) throw err;
    json = JSON.stringify(rows);
    // connection.end();
    return returnObjectCallback(rows);
  });
})

app.post('/unflagEmail', function(req, res) {
  var emailID = req.body.emailID;

  db.unflagEmail(emailID, function(message) {
    res.send(message);
  });
});

app.post('/emailMarkRead', function(req, res) {
  db.emailMarkRead(req.body.emailID, function(message){
    res.send(message);
  })
})

app.get('/filterData', function(req, res) {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  db.getAllFilters(function(data) {
    res.send(data);
  });
});

// var emailsArray = [
//   {
//     id: 'emailId',
//     sender: 'ServerEMAIL!!!',
//     recipient: 'emailRecipient',
//     subject: 'subjectString',
//     body: 'bodyString',
//     sendTime: 1000,
//     focusLevel: 'complete',
//     flags:
//       [
//         {
//           type: 'flagTypeString1',
//           context: 'contextString1',
//         },
//         {
//           type: 'flagTypeString2',
//           context: 'contextString2',
//         },
//       ],
//   },
// ];

// app.get('/tempEmailData', function(req, res) {
//   //get the flagged emails via a db query
//   // res.setHeader('Access-Control-Allow-Origin', '*');
//   db.getFlaggedEmails(function(emails) {
//     res.send(emailsArray);
//   });
// });

app.post('/submitfilter', function(req, res) {
  // req.body will be {username: 'Anthony', filter: 'Anthony's filter'};
  // invoke the database function to insert into filtersTable, passing in the req.body
  //pass in cb that sends back a response
  //send back object with message
  db.insertFilter(req.body, function(id, filterName) {
    res.send({id:id, filterName:filterName});
  });
});

app.post('/submitkeyword', function(req, res) {
  db.insertKeyword(req.body, function(keyword, keywordId) {
    res.send({keyword:keyword, keywordId:keywordId});
  });
});

app.post('/removekeyword', function(req, res){
  db.removeKeyword(req.body, function(message){
    res.send(message);
  })
});

//route handing for checking if user login is correct
app.post('/userLogin', function(req, res) {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  db.getUser(req.body, function(data) {
    if (data && data[0]) {
      bcrypt.compare(req.body.password, data[0]['saltedHash'], function(err, userAuthed) {
        if (err) {
          res.status(401).end('Either username or password is incorrect');
        } else if (userAuthed) {
          if (data[0]['active'] === 0) {
            res.send({error: 'user was deactivated'});
          } else {

            //if typed in password checks out, create a token
            //creating token with username as payload
            var jwtSecret = authorization.jwtSecret;
            var token = jwt.sign({
              username: req.body.username,
              permissionGroup: data[0]['permissionGroup'],
            }, jwtSecret);

            // console.log('this is the token', token);
            // console.log('this is the user permission group', data[0]['permissionGroup']);
            res.send({
              //sending back token for client processing
              token: token,
              username: req.body.username,
              permissionGroup: data[0]['permissionGroup'],
            });
          }

        } else {
          res.send({error: 'password was incorrect'});
        }
      });
    } else {
      res.status(401).send({error: 'User does not exist'});
    }
  });
});

//route handing for checking if user auth/token is valid
//TODO: finish this
app.post('/userAuth', function(req, res) {

  // res.setHeader('Access-Control-Allow-Origin', '*');
  jwt.verify(req.body.token, secret, function(err, decoded) {
    if (err) {
      res.status(401).send({error: 'bad token'});
    } else {
      var decoded = jwt.decode(req.body.token, {complete:true});
      res.send({
        username:decoded.payload.username,
        permissionGroup: decoded.payload.permissionGroup,
      });
    }
  });
});

//fx to return all users
app.get('/getAllUsers', function(req, res) {
  db.getAllUsers(function(userArray) {
    res.send({
      message: 'got all users',
      userArray: userArray,
    });
  });
});

//fx to return all active users
app.get('/getAllActiveUsers', function(req, res) {
  db.getAllActiveUsers(function(userArray) {
    res.send({
      message: 'got all active users',
      userArray: userArray,
    });
  });
});

//temp url to create admin users, only via postman. not accessible from client
app.post('/createUser', function(req, res) {
  var salt = bcrypt.genSaltSync(10);
  req.body.hash = bcrypt.hashSync(req.body.password, salt);

  db.createUser(req.body, function() {
    res.send('success');
  });
});

//url to create admin users, accessible from client
app.post('/userAdd', function(req, res) {
  var salt = bcrypt.genSaltSync(10);

  if (!req.body.password) {
    req.body.password = 'password';
  }

  req.body.hash = bcrypt.hashSync(req.body.password, salt);

  db.createUser(req.body, function() {
    res.send({
      message: 'user added',
    });
  });
});

//url to reset password
app.post('/passwordReset', function(req, res) {
  db.resetPassword(req.body.username, function() {
    res.send({
      message: 'Password Successfully Resetted',
    });
  });
});

//url to mark user active/inactive password
app.post('/toggleUser', function(req, res) {
  db.toggleUserActive(req.body.username, req.body.active, function() {
      res.send({
        message: 'User Successfully Toggled',
      });
  });
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
