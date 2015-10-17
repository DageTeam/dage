var authorization = require('../auth.js');
var Imap = require('imap');
var inspect = require('util').inspect;
var fs = require('fs');
var MailParser = require('mailparser').MailParser;
var emailBuffer = [];
var emailResults = [];
var db = require('./database.js');
var CronJob = require('cron').CronJob;

//create new IMAP instance. Connect with gmail.
var imap = new Imap({
  user: 'dageprotect@gmail.com',
  password: authorization.gmailPassword,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
});

//When opening box called 'Inbox', we set read-only option to 'false';
function openInbox(cb) {
  imap.openBox('INBOX', false, cb);
}

var job = new CronJob({
  cronTime: '*/10 * * * * * ',
  onTick: onTick;

  start: true,
  timeZone: 'America/Los_Angeles',
});

var onTick = function onTick() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) {
        throw err;
      }

      //search all unread messages
      imap.search(['UNSEEN'], function(err, results) {
        if (err) {
          throw err;
        }

        //if no unread messages, end IMAP connection
        if (results.length === 0) {
          console.log('Nothing to fetch');
          return imap.end();
        }

        var fetch = imap.fetch(results, {
          markSeen: true,
          bodies: ['']
        });

        //for every message that we fetch...
        fetch.on('message', function(msg) {
          //...create new instance of MailParser
          var mailparser = new MailParser();
          console.log('mailparser instance created...')

          mailparser.on('end', function(mail_object) {
            emailBuffer.push(mail_object)
          });

          //pipe the body stream to mailparser instance
          msg.on('body', function(stream) {
            stream.pipe(mailparser);
          });

          msg.once('end', function() {
            //call mailparser 'end' event
            mailparser.end();
            console.log('message finished processing');
          });

        });

        fetch.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });

        fetch.once('end', function() {
          console.log('Done fetching all messages!');

          imap.end();
        });

      });
    });
  });

  imap.once('error', function(err) {
    console.log(err);
  });

  imap.once('end', function() {
    //filter out the duplicate emails.
    for (var i = 0; i < emailBuffer.length; i += 2) {
      emailResults.push(emailBuffer[i]);
    }

    emailResults.forEach(function(item) {
      db.insertReturn(item);
    })

    // console.log('filtered email results: ', emailResults)
    console.log('Connection ended');
  });

  imap.connect();

};
job.start();
