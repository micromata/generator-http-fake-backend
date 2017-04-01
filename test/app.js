'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const helper = require('../generators/app/promptingHelpers');
const chalk = require('chalk');

describe('generator-http-fake-backend → server', () => {
  before(done => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        serverPort: 8081,
        apiPrefix: '/api'
      })
      .on('end', done);
  });

  describe('file creation', () => {
    it('should create dot files', () => {
      assert.file([
        '.editorconfig',
        '.env',
        '.eslintrc',
        '.gitattributes',
        '.gitignore'
      ]);
    });

    describe('.env', () => {
      it('should contain the prompted port number', () => {
        assert.fileContent('.env', /SERVER_PORT=8081/);
      });
      it('should contain the prompted api url prefix', () => {
        assert.fileContent('.env', /API_PREFIX=\/api/);
      });
    });

    it('should create meta files', () => {
      assert.file([
        'LICENSE',
        'nodemon.json',
        'package.json',
        'README.md',
        'yarn.lock'
      ]);
    });

    it('should create JS files in root directory', () => {
      assert.file([
        'config.js',
        'index.js',
        'manifest.js',
        'server.js'
      ]);
    });

    it('should create json-templates directory', () => {
      assert.file([
        'json-templates/.gitkeep'
      ]);
    });

    it('should create server files', () => {
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

    it('should create test files', () => {
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
});

describe('generator-http-fake-backend → server → prompting helpers', () => {
  describe('→ validateApiPrefix()', () => {
    it('should accept a leading slash', () => {
      assert.equal(helper.validateApiPrefix('/api'), true);
    });
    it('should fail with a trailing slash', () => {
      assert.equal(helper.validateApiPrefix('/api/'), chalk.red('please enter API prefix without trailing  `/`.'));
    });
    it('should fail when missing a leading slash', () => {
      assert.equal(helper.validateApiPrefix('api'), chalk.red('API prefix has to begin with a `/`.'));
    });
  });
});
