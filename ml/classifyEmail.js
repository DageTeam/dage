var natural = require('natural');
var fs = require('fs');
var path = require('path');

// fs.readFile('/Users/andrew/MKS/thesis/dage/ml/classifier.json', 'utf8', function(err, data){
//   var restoredClassifier = natural.BayesClassifier.restore(JSON.parse(data));
//   console.log(restoredClassifier.classify(classifyTarget));
// })



fs.readFile('/Users/andrew/MKS/thesis/dage/ml/classifier.json', 'utf8', function(err, classifierData){
  var restoredClassifier = natural.BayesClassifier.restore(JSON.parse(classifierData));

  fs.readFile('/Users/andrew/MKS/thesis/dage/ml/ethic_keyword.csv', 'utf8', function(err, emailData){

    var rowsArr = emailData.split('\n');
    // console.log(rowsArr[0])
    rowsArr.forEach(function(row, i){
      // console.log(row, '$$$$$$$$', i, '$$$$$$$$')
      console.log(restoredClassifier.classify(row));
      var rowWrite = row + ',' + restoredClassifier.classify(row) + '\n'

      fs.appendFileSync('/Users/andrew/MKS/thesis/dage/ml/ethic_keyword_classified.csv', rowWrite);
    })
  })
})


