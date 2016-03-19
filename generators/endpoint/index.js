'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var superb = require('superb');
var titleCase = require('title-case');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var that = this;
    var done = that.async();

    // Have Yeoman greet the user.
    that.log(yosay(
      titleCase(superb()) + ', lets create an endpoint …'
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
        validate: function (value) {
          var returnvalue = chalk.red('Please enter a valid name. This will be a part of the url.');
          var validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
          if (!validChars && value) {
            returnvalue = true;
          }
          return returnvalue;
        }
      },
      {
        type: 'input',
        name: 'params',
        message: 'Please enter URL path params (optional)',
        validate: function (value) {
          var returnvalue = chalk.red('Please enter valid path parameters with a leading `/`. See http://hapijs.com/api#path-parameters');
          var validChars = value.match(/[^a-zA-Z0-9()\/,!.~$&'\-_*+;=:@]+/g);
          var leadingSlash = value.match(/^\//);
          if ((!validChars && leadingSlash) || value === '') {
            returnvalue = true;
          }
          return returnvalue;
        }
      }, {
        type: 'list',
        name: 'method',
        message: 'What should be the accepted method for this request?',
        choices: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
      }, {
        type: 'list',
        name: 'responseType',
        message: 'What would you like to return?',
        choices: ['The content of a JSON file', 'A JavaScript object literal'],
        filter: function (value) {
          if (value === 'The content of a JSON file') {
            value = 'json';
          } else {
            value = 'object';
          }
          return value;
        }
      }, {
        type: 'input',
        name: 'response',
        message: 'Please enter the name of your JSON file',
        default: 'foo.json',
        when: function (answers) {
          return answers.responseType === 'json';
        },
        validate: function (value) {
          var returnvalue = chalk.red('Please enter valid filename (*.json)');
          var fileExt = value.match(/\w\.json$/);
          var validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
          if (fileExt && !validChars) {
            returnvalue = true;
          }
          return returnvalue;
        }
      }, {
        type: 'input',
        name: 'response',
        message: 'Please enter a JavaScript object literal or array',
        default: '{ status: "ok" }',
        when: function (answers) {
          return answers.responseType === 'object';
        },
        filter: function (value) {
          return value.replace(/'/g, '"');
        },
        validate: function (value) {
          var returnvalue = chalk.red('Your input doesn’t look like an object or array at all.');
          var isArray = value.match(/^\[/) && value.match(/]$/);
          var isObject = value.match(/^{/) && value.match(/\}$/);
          if (isArray || isObject) {
            returnvalue = true;
          }
          return returnvalue;
        }
      }, {
        type: 'confirm',
        name: 'anotherUrl',
        message: 'Want to enter another url (just hit enter for YES)?',
        default: true
      }
    ];

    prompting(that);

    function prompting(that) {
      that.prompt(prompts, function (props) {
        that.props = props;

        if (!that.endpoint.name) {
          that.endpoint.name = that.props.endpointName;
        }

        that.endpoint.urls.push({
          params: that.props.params,
          requests: [{
            method: that.props.method,
            responseType: that.props.responseType,
            response: that.props.response
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
  }
});
