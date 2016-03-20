'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var superb = require('superb');
var helper = require('./promptingHelpers');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + superb() + ' ' + chalk.red('http-fake-backend') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'serverPort',
        message: 'On which port should the server run?',
        default: '8081',
        store: true
      }, {
        type: 'input',
        name: 'apiPrefix',
        message: 'What should be the url prefix of the endpoints?',
        default: '/api',
        store: true,
        validate: helper.validateApiPrefix
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {

    dotFiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copyTpl(
        this.templatePath('_env'),
        this.destinationPath('.env'), {
          serverPort: this.props.serverPort,
          apiPrefix: this.props.apiPrefix
        }
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    metaFiles: function () {
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );
      this.fs.copy(
        this.templatePath('nodemon.json'),
        this.destinationPath('nodemon.json')
      );
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    },

    rootJsFiles: function () {
      this.fs.copy(
        this.templatePath('config.js'),
        this.destinationPath('config.js')
      );
      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath('index.js')
      );

      this.fs.copy(
        this.templatePath('manifest.js'),
        this.destinationPath('manifest.js')
      );

      this.fs.copy(
        this.templatePath('server.js'),
        this.destinationPath('server.js')
      );
    },

    jsonTemplates: function () {
      this.directory(
        this.templatePath('json-templates'),
        this.destinationPath('json-templates')
      );
    },

    serverFiles: function () {
      this.directory(
        this.templatePath('server'),
        this.destinationPath('server')
      );
    },

    testFiles: function () {
      this.directory(
        this.templatePath('test'),
        this.destinationPath('test')
      );
    }

  },

  install: function () {
    this.installDependencies();
  }
});
