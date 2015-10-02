var MailListener = require('mail-listener2');
var CronJob = require('cron').CronJob;
var db = require('./database.js');

//create new mailListener instance. Connect with gmail.
var mailListener = new MailListener({
  username: 'dageprotect@gmail.com',
  password: 'node1234',
  host: 'imap.gmail.com',
  port: 993, // imap port
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: 'INBOX', // mailbox to monitor
  searchFilter: ['UNSEEN'], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: 'attachments/' } // specify a download directory for attachments
});

mailListener.start(); // start listening

mailListener.on('server:connected', function() {
  console.log('imapConnected');
});

mailListener.on('server:disconnected', function() {
  console.log('imapDisconnected');
});

mailListener.on('error', function(err) {
  console.log(err);
});

mailListener.on('attachment', function(attachment) {
  console.log(attachment.path);
});

mailListener.on('mail', function(mail, seqno, attributes) {
  mail.subject = sanitizeInput(mail.subject);
  mail.text = sanitizeInput(mail.text);

  // insert incoming mail to database
  db.insertReturn(mail);
  console.log('emailParsed', mail);
});

//fx to sanitize the email text's quotes
var sanitizeInput = function(str) {
  str = str.replace(/'/g, '\'\'');
  return str;
};
