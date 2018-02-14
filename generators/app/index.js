'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const superb = require('superb');
const commandExists = require('command-exists').sync;
const helper = require('./promptingHelpers');

module.exports = class extends Generator {
  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(`
      Welcome to the ${superb()} ${chalk.yellow('http-fake-backend')} generator!
    `));

    const prompts = [
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

    this.prompt(prompts).then(props => {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    });
  }

  writing() {
  // Dotfiles
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
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    // Meta Files
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
    this.fs.copy(
      this.templatePath('yarn.lock'),
      this.destinationPath('yarn.lock')
    );

    // Root JS files
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

    // Directory for response files
    this.fs.copy(
      this.templatePath('response-files/gitkeep'),
      this.destinationPath('response-files/.gitkeep')
    );

    // Server files
    this.fs.copy(
      this.templatePath('server'),
      this.destinationPath('server')
    );

    // Test files
    this.fs.copy(
      this.templatePath('test'),
      this.destinationPath('test')
    );
  }

  install() {
    const hasYarn = commandExists('yarn');
    this.installDependencies({
      npm: !hasYarn,
      bower: false,
      yarn: hasYarn
    });
  }

  end() {
    this.log(yosay(`
      That’s it. Feel free to fire up the server with ${chalk.green('npm run start:dev')}
        or use our subgenerator to create endpoints: ${chalk.yellow('yo http-fake-backend:endpoint')}
    `, {maxLength: 40}));
  }
};
