//this is placeholder file for serverTests.js
var request = require('request');

//Specs for server
describe('Server', function() {
  it('should work', function() {
    expect(true).toBe(true);
  });

  it('should respond with hello world', function(done) {
    request('http://localhost:6789', function(error, response, body) {
      expect(body).toEqual('Hello, world!');
      done();
    });
  });
});
