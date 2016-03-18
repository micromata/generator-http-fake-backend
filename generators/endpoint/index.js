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
          var check = chalk.red('Please enter a name. This will be a part of the url.');
          if (value !== '') {
            check = true;
          }
          return check;
        }
      },
      {
        type: 'input',
        name: 'params',
        message: 'Please enter URL params (optional)'
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
        default: '/json-templates/foo.json',
        when: function (answers) {
          return answers.responseType === 'json';
        }
      }, {
        type: 'input',
        name: 'response',
        message: 'Please enter a JavaScript object',
        default: '{ status: "ok" }',
        when: function (answers) {
          return answers.responseType === 'object';
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
    this.fs.copyTpl(
      this.templatePath('_endpoint.js'),
      this.destinationPath('server/api/' + this.endpoint.name + '.js'), {
        endpoint: this.endpoint
      }
    );
  }
});
