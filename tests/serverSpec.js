//this is placeholder file for serverTests.js
var request = require('request');
var testUrl = 'http://localhost:6789';

//Specs for server routing and server routing ONLY
describe('Server', function() {

  it('should work', function() {
    expect(true).toBe(true);
  });

  var expectedResponse;

  //Test the root '/' url
  it('should respond with hello world', function(done) {
    expectedResponse = 'Hello, world!';
    request(testUrl, function(error, response, body) {
      expect(body).toEqual(expectedResponse);
      done();
    });
  });

  //Test what any undefined url would respond with
  it('should handle any non-defined url', function(done) {
    //TODO: change expectedResponse to whatever the redirect should respond with
    expectedResponse = 'Redirect';
    request(testUrl + '/asdf', function(error, response, body) {
      expect(body).toEqual(expectedResponse);
      done();
    });
  });

});
