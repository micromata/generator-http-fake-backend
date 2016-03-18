'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-http-fake-backend → endpoint', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/endpoint'))
      .withOptions({someOption: true})
      .withPrompts({
        endpointName: 'endpoint',
        params: '/bar',
        method: 'GET',
        responseType: 'object',
        response: '{ status: "ok" }',
        anotherUrl: false
      })
      .on('end', done);
  });

  it('should create endpoint.js', function () {
    assert.file([
      'server/api/endpoint.js'
    ]);
  });

  describe('endpoint.js', function () {
    it('should contain the prompted name', function () {
      assert.fileContent('server/api/endpoint.js', /name: 'endpoint',/);
    });
    it('should contain the prompted params', function () {
      assert.fileContent('server/api/endpoint.js', /params: '\/bar',/);
    });
    it('should contain the prompted method', function () {
      assert.fileContent('server/api/endpoint.js', /method: 'GET',/);
    });
    it('should contain the prompted response', function () {
      assert.fileContent('server/api/endpoint.js', /response: '{ status: "ok" }'/);
    });

  });

});
