var chalk = require('chalk');
var helper = {};

helper.filterResponseType = function (value) {
  if (value === 'The content of a JSON file') {
    value = 'json';
  } else {
    value = 'object';
  }
  return value;
};

helper.filterJsObject = function (value) {
  return value.replace(/'/g, '"');
};

helper.validateJsObject = function (value) {
  var returnvalue = chalk.red('Your input doesn’t look like an object or array at all.');
  var isArray = value.match(/^\[/) && value.match(/]$/);
  var isObject = value.match(/^{/) && value.match(/\}$/);
  if (isArray || isObject) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateJson = function (value) {
  var returnvalue = chalk.red('Please enter valid filename (*.json)');
  var fileExt = value.match(/\w\.json$/);
  var validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (fileExt && !validChars) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateEndpoint = function (value) {
  var returnvalue = chalk.red('Please enter a valid name. This will be a part of the url.');
  var validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (!validChars && value) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateParams = function (value) {
  var returnvalue = chalk.red('Please enter valid path parameters with a leading `/`. See http://hapijs.com/api#path-parameters');
  var validChars = value.match(/[^a-zA-Z0-9()\/,!.~$&'\-_*+;=:@{}]+/g);
  var leadingSlash = value.match(/^\//);
  if ((!validChars && leadingSlash) || value === '') {
    returnvalue = true;
  }
  return returnvalue;
};

module.exports = helper;
