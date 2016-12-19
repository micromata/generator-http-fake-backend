'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var superb = require('superb');
var titleCase = require('title-case');
var helper = require('./promptingHelpers');

module.exports = yeoman.extend({

  prompting: function () {
    var that = this;
    var done = that.async();

    // Have Yeoman greet the user.
    that.log(yosay(
      titleCase(superb()) + ', let’s create an endpoint …'
    ));

    that.endpoint = {
      name: null,
      urls: []
    };

    var prompts = [
      {
        type: 'input',
        name: 'endpointName',
        message: 'What should be the name of the endpoint?',
        when: function () {
          return !that.endpoint.urls.length;
        },
        validate: helper.validateEndpoint
      },
      {
        type: 'input',
        name: 'params',
        message: 'Please enter URL path params (optional)',
        validate: helper.validateParams
      }, {
        type: 'list',
        name: 'method',
        message: 'What should be the accepted method for this request?',
        choices: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
      }, {
        type: 'list',
        name: 'responseType',
        message: 'What would you like to return?',
        choices: [
          'The content of a JSON file',
          'A JavaScript object literal',
          'An error object'
        ],
        filter: helper.filterResponseType
      }, {
        type: 'input',
        name: 'response',
        message: 'Please enter the name of your JSON file',
        default: 'foo.json',
        when: function (answers) {
          return answers.responseType === 'json';
        },
        validate: helper.validateJson
      }, {
        type: 'input',
        name: 'response',
        message: 'Please enter a JavaScript object literal or array',
        default: '{ status: \'ok\' }',
        when: function (answers) {
          return answers.responseType === 'object';
        },
        filter: helper.filterJsObject,
        validate: helper.validateJsObject
      }, {
        type: 'input',
        name: 'statusCode',
        message: 'Please enter a valid HTTP error status code',
        default: '400',
        when: function (answers) {
          return answers.responseType === 'error';
        },
        validate: helper.validateErrorStatusCode
      }, {
        type: 'input',
        name: 'statusCode',
        message: 'Please enter a valid HTTP status code',
        default: '200',
        when: function (answers) {
          return answers.responseType === 'json' || answers.responseType === 'object';
        },
        validate: helper.validateStatusCode
      }, {
        type: 'confirm',
        name: 'anotherUrl',
        message: 'Want to enter another url (just hit enter for YES)?',
        default: true
      }
    ];

    prompting(that);

    function prompting(that) {
      that.prompt(prompts).then(function (props) {
        that.props = props;

        if (!that.endpoint.name) {
          that.endpoint.name = that.props.endpointName;
        }

        that.endpoint.urls.push({
          params: that.props.params,
          requests: [{
            method: that.props.method,
            responseType: that.props.responseType,
            response: that.props.response,
            statusCode: that.props.statusCode
          }]
        });

        if (props.anotherUrl) {
          prompting(that);
        } else {
          // console.log('Your endpoint:', JSON.stringify(that.endpoint));
          done();
        }
      });
    }
  },

  writing: function () {
    var that = this;

    this.fs.copyTpl(
      this.templatePath('_endpoint.js'),
      this.destinationPath('server/api/' + this.endpoint.name + '.js'), {
        endpoint: this.endpoint
      }
    );

    this.endpoint.urls.forEach(function (url) {
      if (url.requests[0].responseType === 'json') {
        that.fs.copy(
          that.templatePath('response.json'),
          that.destinationPath('json-templates/' + url.requests[0].response)
        );
      }
    });
  },

  end: function () {
    this.log(yosay(
      'That’s it. Feel free to fire up the server with ' +
        chalk.green('`npm run start:dev`') +
        '.'
    ));
  }
});
