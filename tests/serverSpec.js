//this is placeholder file for serverTests.js
var request = require('request');
var testUrl = 'http://localhost:6789';

//Remember to have the server running PRIOR to running tests with nodemon server/server.js

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

  //
  xit('should should handle /dashboard url, returning the db response for flagged emails', function(done) {
    //TODO: change expectedResponse to whatever the redirect should respond with
    expectedResponse = 'Dashboard';
    request(testUrl + '/dashboard', function(error, response, body) {
      var res = JSON.parse(body);
      expect(Array.isArray(res)).toBe(true);
      expect(typeof res[0]).toEqual('object');
      expect(res[0]['to_field']).toEqual('dageprotect@gmail.com');
      done();
    })
  })

});
