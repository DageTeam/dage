var natural = require('natural');
var fs = require('fs');
var path = require('path');



fs.readFile('/Users/andrew/MKS/thesis/dage/ml/competitor_keywords_train_appropriate.csv', 'utf8', function(err, data){
  // console.log(err);
  // console.log('DATA:', data);

  natural.BayesClassifier.load('/Users/andrew/MKS/thesis/dage/ml/classifier.json', null, function(err, classifier) {
    classifier.events.on('trainedWithDocument', function (obj) {
       console.log(obj);
        // {
        //   total: 23 // There are 23 total documents being trained against
        //   index: 12 // The index/number of the document that's just been trained against
        //   doc: {...} // The document that has just been indexed
        //  }

    });
    var rowsArr = data.split('\n');
    rowsArr.forEach(function(row, i){
      // console.log(row, '$$$$$$$$', i, '$$$$$$$$')
      classifier.addDocument(row, 'appropriate')
    })

    classifier.train();

    classifier.save('/Users/andrew/MKS/thesis/dage/ml/classifier.json', function(err, classifier){
      console.log(classifier, 'HAS BEEN SAVED TO CLASSIFIER.JSON')
    })
  })

})



// fs.readFile('/Users/andrew/MKS/thesis/dage/ml/classifier.json', 'utf8', function(err, data){
//   var restoredClassifier = natural.BayesClassifier.restore(JSON.parse(data));
//   console.log(restoredClassifier.classify('i should sell that'));
// })



