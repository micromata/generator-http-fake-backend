'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var helper = require('../generators/endpoint/promptingHelpers');
var chalk = require('chalk');

describe('generator-http-fake-backend → endpoint', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/endpoint'))
      .withOptions({someOption: true})
      .withPrompts({
        endpointName: 'endpoint',
        params: '/bar',
        method: 'GET',
        responseType: 'object',
        response: '{ status: \'ok\' }',
        anotherUrl: false
      })
      .toPromise();
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
      assert.fileContent('server/api/endpoint.js', /response: { status: 'ok' }/);
    });
    it('should not contain a statuscode key', function () {
      assert.noFileContent('server/api/endpoint.js', /statusCode/);
    });

  });

});

describe('generator-http-fake-backend → endpoint → JSON file', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/endpoint'))
      .withOptions({someOption: true})
      .withPrompts({
        endpointName: 'endpoint',
        method: 'GET',
        responseType: 'json',
        response: 'foo.json',
        statusCode: 204,
        anotherUrl: false
      })
      .toPromise();
  });

  it('should create foo.json', function () {
    assert.file([
      'json-templates/foo.json'
    ]);
  });

  it('should create endpoint.js', function () {
    assert.file([
      'server/api/endpoint.js'
    ]);
  });

  describe('endpoint.js', function () {

    it('should contain the prompted response', function () {
      assert.fileContent('server/api/endpoint.js', /response: '\/json-templates\/foo.json'/);
    });

    it('should contain the correct statuscode', function () {
      assert.fileContent('server/api/endpoint.js', /statusCode: 204/);
    });

    it('should not contain the params key', function () {
      assert.noFileContent('server/api/endpoint.js', /params/);
    });

  });

});

describe('generator-http-fake-backend → endpoint → prompting helpers', function () {

  describe('→ filterResponseType()', function () {
    it('should return correct outputs', function () {
      assert.equal(helper.filterResponseType('The content of a JSON file'), 'json');
      assert.equal(helper.filterResponseType('A JavaScript object literal'), 'object');
      assert.equal(helper.filterResponseType('An error object'), 'error');
    });
  });

  describe('→ validateJsObject()', function () {
    it('should validate a string representation of an object', function () {
      assert.equal(helper.validateJsObject('{}'), true);
    });
    it('should validate a string representation of an array', function () {
      assert.equal(helper.validateJsObject('[]'), true);
    });
    it('should fail on a string', function () {
      assert.equal(helper.validateJsObject('foo'), chalk.red('Your input doesn’t look like an object or array at all.'));
    });
  });

  describe('→ validateJson()', function () {
    var failMsg = chalk.red('Please enter valid filename (*.json)');

    it('should validate `foo.json`', function () {
      assert.equal(helper.validateJson('foo.json'), true);
    });
    it('should fail `foo.txt`', function () {
      assert.equal(helper.validateJson('foo.txt'), failMsg);
    });
    it('should fail when using forbidden chars', function () {
      assert.equal(helper.validateJson('^foo.json'), failMsg);
    });
  });

  describe('→ validateEndpoint()', function () {
    var failMsg = chalk.red('Please enter a valid name. This will be a part of the url.');

    it('should validate `foo`', function () {
      assert.equal(helper.validateEndpoint('foo'), true);
    });
    it('should fail when using a leading slash', function () {
      assert.equal(helper.validateEndpoint('/foo'), failMsg);
    });
    it('should fail when using a trailing slash', function () {
      assert.equal(helper.validateEndpoint('foo/'), failMsg);
    });
    it('should fail when using forbidden chars', function () {
      assert.equal(helper.validateEndpoint('f^oo'), failMsg);
    });
  });

  describe('→ validateParams()', function () {
    var failMsg = chalk.red('Please enter valid path parameters with a leading `/`. See http://hapijs.com/api#path-parameters');

    it('should validate an empty string', function () {
      assert.equal(helper.validateParams(''), true);
    });
    it('should validate `/foo/{id}`', function () {
      assert.equal(helper.validateParams('/foo/{id}'), true);
    });
    it('should fail when missing a leading slash', function () {
      assert.equal(helper.validateParams('foo'), failMsg);
    });
    it('should fail when using forbidden chars', function () {
      assert.equal(helper.validateParams('/foo^^'), failMsg);
    });
  });

  describe('→ validateErrorStatusCode()', function () {
    var failMsg = chalk.red('Please enter valid 4xx or 5xx status code supported by https://github.com/hapijs/boom');

    it('should accept entering `400`', function () {
      assert.equal(helper.validateErrorStatusCode('400'), true);
    });
    it('should fail when entering a `200`', function () {
      assert.equal(helper.validateErrorStatusCode('200'), failMsg);
    });
    it('should fail when using any random string', function () {
      assert.equal(helper.validateErrorStatusCode('Hej there'), failMsg);
    });
  });

  describe('→ validateStatusCode()', function () {
    var failMsg = chalk.red('Please enter a number which reprents a valid HTTP status code');

    it('should accept entering `400`', function () {
      assert.equal(helper.validateStatusCode('400'), true);
    });
    it('should accept when entering a `200`', function () {
      assert.equal(helper.validateStatusCode('200'), true);
    });
    it('should fail when entering a `2000`', function () {
      assert.equal(helper.validateStatusCode('2000'), failMsg);
    });
    it('should fail when entering a `600`', function () {
      assert.equal(helper.validateStatusCode('600'), failMsg);
    });
    it('should fail when using any random string', function () {
      assert.equal(helper.validateStatusCode('Hej there'), failMsg);
    });
  });

});


