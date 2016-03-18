'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-http-fake-backend → server', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        serverPort: 8081,
        apiPrefix: '/api'
      })
      .on('end', done);
  });

  it('should create dot files', function () {
    assert.file([
      '.editorconfig',
      '.env',
      '.eslintrc',
      '.gitattributes',
      '.gitignore'
    ]);
  });

  describe('.env', function () {

    it('should contain the prompted port number', function () {
      assert.fileContent('.env', /SERVER_PORT=8081/);
    });
    it('should contain the prompted api url prefix', function () {
      assert.fileContent('.env', /API_PREFIX=\/api/);
    });

  });

  it('should create meta files', function () {
    assert.file([
      'LICENSE',
      'nodemon.json',
      'package.json',
      'README.md'
    ]);
  });

  it('should create JS files in root directory', function () {
    assert.file([
      'config.js',
      'index.js',
      'manifest.js',
      'server.js'
    ]);
  });

  it('should create server files', function () {
    assert.file([
      'server/api/setup/setup.js',
      'server/web/index.js',
      'server/web/public/assets/css/styles.css',
      'server/web/public.js',
      'server/web/views/helpers/json.js',
      'server/web/views/helpers/methods.js',
      'server/web/views/helpers/removeCurlyBraces.js',
      'server/web/views/index.hbs',
      'server/web/views/layout/layout.hbs',
      'server/web/views/partials/footer.hbs',
      'server/web/views/partials/header.hbs'
    ]);
  });

  it('should create test files', function () {
    assert.file([
      'test/config.js',
      'test/index.js',
      'test/manifest.js',
      'test/server/api/endpoint.js',
      'test/server/api/fakeStatusCode.js',
      'test/server/api/fixtures/response.json',
      'test/server/web/index.js'
    ]);
  });

});
