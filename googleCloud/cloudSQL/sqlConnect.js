var mysql = require('mysql');
var fs = require('fs');

var sqlQueryKeywords = exports = function(keywordArray){

  var connection = mysql.createConnection({
    host     : '173.194.248.220',
    user     : 'root',
    password : 'node$1234',
    database : 'enronEmail'
  });

  connection.connect();


  keywords = keywordArray;

  var resultObject = {};

  var returnObjectCallback = function(){
    fs.writeFile(__dirname + '/ethicsFilter.json', JSON.stringify(resultObject), function(err){
      if(err){
        console.log('Error writing to ethicsFilter.json')
      }
      console.log('insideCallBack: ', resultObject);
    })
  }

  keywords.forEach(function(keyword){
    var whereClause = "body like '%" + keyword + "%'"

    connection.query("SELECT count(*) as 'numberRecords' from ethicsFilter WHERE " + whereClause,
    function(err, rows, fields) {
      if (err) throw err;
      var numberRecords = rows[0]['numberRecords']
      console.log('The ' + keyword + ' has: ', numberRecords);
      console.log('The ' + keyword + ' percentage is: ', Math.round((numberRecords/23480 * 100) * 100) / 100);
      resultObject[keyword] = numberRecords;
      resultObject[keyword + 'Percentage'] = Math.round((numberRecords/23480 * 100) * 100) / 100;
      console.log('THIS IS WHERE RESULT SHOULD GO!!!', resultObject)
      return returnObjectCallback();
    });

  })


  connection.end();

}

  var keywords= [
    'unethical',
    'hide',
    'shred',
    'illegal',
    'sensitive',
    'confidential',
    'secret',
    'unlawful',
    'manipulation',
    'scandal',
    'hide',
    'delete',
    'get rid of',
    'eliminate'
  ]
sqlQueryKeywords(keywords);
