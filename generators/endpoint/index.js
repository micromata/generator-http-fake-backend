'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const superb = require('superb');
const titleCase = require('title-case');
const helper = require('./promptingHelpers');

module.exports = class extends Generator {

  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(`${titleCase(superb())}, let’s create an endpoint …`));

    this.endpoint = {
      name: null,
      urls: []
    };

    const prompts = [
      {
        type: 'input',
        name: 'endpointName',
        message: 'What should be the name of the endpoint?',
        when: () => {
          return !this.endpoint.urls.length;
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
        when(answers) {
          return answers.responseType === 'json';
        },
        validate: helper.validateJson
      }, {
        type: 'input',
        name: 'response',
        message: 'Please enter a JavaScript object literal or array',
        default: '{ status: \'ok\' }',
        when(answers) {
          return answers.responseType === 'object';
        },
        filter: helper.filterJsObject,
        validate: helper.validateJsObject
      }, {
        type: 'input',
        name: 'statusCode',
        message: 'Please enter a valid HTTP error status code',
        default: '400',
        when(answers) {
          return answers.responseType === 'error';
        },
        validate: helper.validateErrorStatusCode
      }, {
        type: 'input',
        name: 'statusCode',
        message: 'Please enter a valid HTTP status code',
        default: '200',
        when(answers) {
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

    prompting(this);

    function prompting(that) {
      that.prompt(prompts).then(props => {
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
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_endpoint.js'),
      this.destinationPath('server/api/' + this.endpoint.name + '.js'), {
        endpoint: this.endpoint
      }
    );

    this.endpoint.urls.forEach(url => {
      if (url.requests[0].responseType === 'json') {
        this.fs.copy(
          this.templatePath('response.json'),
          this.destinationPath('json-templates/' + url.requests[0].response)
        );
      }
    });
  }

  end() {
    this.log(yosay(`
      That’s it. Feel free to fire up the server with ${chalk.green('npm run start:dev')}
    `));
  }
};
