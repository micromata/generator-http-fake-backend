var chalk = require('chalk');
var helper = {};

helper.filterResponseType = function (value) {
  if (value === 'The content of a JSON file') {
    value = 'json';
  } else if (value === 'An error object') {
    value = 'error';
  } else {
    value = 'object';
  }
  return value;
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
  var validChars = value.match(/[^a-zA-Z0-9()/,!.~$&'\-_*+;=:@{}]+/g);
  var leadingSlash = value.match(/^\//);
  if ((!validChars && leadingSlash) || value === '') {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateErrorStatusCode = function (value) {
  var returnvalue = chalk.red('Please enter valid 4xx or 5xx status code supported by https://github.com/hapijs/boom');
  var validStatusCodes = [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 410, 411, 412, 413, 414, 415, 416, 417, 422, 423, 428, 429, 451, 500, 501, 502, 503, 504
  ];

  if (validStatusCodes.indexOf(Number(value)) !== -1) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateStatusCode = function (value) {
  var returnvalue = chalk.red('Please enter a number which reprents a valid HTTP status code');
  var validStatusCode = value.match(/^[1-5][0-9][0-9]/);

  if (validStatusCode && value.length === 3) {
    returnvalue = true;
  }
  return returnvalue;
};

module.exports = helper;
