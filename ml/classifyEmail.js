var natural = require('natural');
var fs = require('fs');
var path = require('path');

fs.readFile('/Users/andrew/MKS/thesis/dage/ml/classifier.json', 'utf8', function(err, data){
  var restoredClassifier = natural.BayesClassifier.restore(JSON.parse(data));
  console.log(restoredClassifier.classify('i should sell that piece of crap'));
})
