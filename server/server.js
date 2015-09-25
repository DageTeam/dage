//this is placeholder file for server.js

var express = require('express');
var app = express();

app.get("/", function(req, res) {
  res.send("Hello, world!");
}) 

app.post("/", function(req, res) {
  res.send("You posted!");
})

var server = app.listen((process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
});


if (__filename === process.argv[1]) {
  app.listen(6789);
}

module.exports = app;