const chalk = require('chalk');
const helper = {};

helper.filterResponseType = function (value) {
  let responseType;
  switch (value) {
    case 'The content of a file':
      responseType = 'fileContent';
      break;
    case 'A file via Content-Disposition: attachment':
      responseType = 'fileAttachment';
      break;
    case 'A JavaScript object literal as JSON':
      responseType = 'objectLiteral';
      break;
    case 'An error object':
      responseType = 'error';
      break;
    // No Default
  }
  return responseType;
};

helper.filterContentType = function (value) {
  let contentType;
  switch (value) {
    case 'application/json':
      contentType = 'json';
      break;
    case 'text/plain':
      contentType = 'txt';
      break;
    case 'text/html':
      contentType = 'html';
      break;
    // No Default
  }
  return contentType;
};

helper.validateJsObject = function (value) {
  let returnvalue = chalk.red('Your input doesn’t look like an object or array at all.');
  const isArray = value.match(/^\[/) && value.match(/]$/);
  const isObject = value.match(/^{/) && value.match(/\}$/);
  if (isArray || isObject) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateJson = function (value) {
  let returnvalue = chalk.red('Please enter valid filename (*.json)');
  const fileExt = value.match(/\w\.json$/);
  const validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (fileExt && !validChars) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateText = function (value) {
  let returnvalue = chalk.red('Please enter valid filename (*.txt)');
  const fileExt = value.match(/\w\.txt$/);
  const validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (fileExt && !validChars) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateHtml = function (value) {
  let returnvalue = chalk.red('Please enter valid filename (*.html)');
  const fileExt = value.match(/\w\.html$/);
  const validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (fileExt && !validChars) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateFile = function (value) {
  let returnvalue = chalk.red('Please enter valid filename');
  const fileExt = value.match(/\w\.\w{2,4}$/);
  const validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (fileExt && !validChars) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateEndpoint = function (value) {
  let returnvalue = chalk.red('Please enter a valid name. This will be a part of the url.');
  const validChars = value.match(/[^a-zA-Z0-9(),!.~$&'\-_*+;=:@]+/g);
  if (!validChars && value) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateParams = function (value) {
  let returnvalue = chalk.red('Please enter valid path parameters with a leading `/`. See http://hapijs.com/api#path-parameters');
  const validChars = value.match(/[^a-zA-Z0-9()/,!.~$&'\-_*+;=:@{}]+/g);
  const leadingSlash = value.match(/^\//);
  if ((!validChars && leadingSlash) || value === '') {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateErrorStatusCode = function (value) {
  let returnvalue = chalk.red('Please enter valid 4xx or 5xx status code supported by https://github.com/hapijs/boom');
  const validStatusCodes = [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 410, 411, 412, 413, 414, 415, 416, 417, 422, 423, 428, 429, 451, 500, 501, 502, 503, 504
  ];

  if (validStatusCodes.indexOf(Number(value)) !== -1) {
    returnvalue = true;
  }
  return returnvalue;
};

helper.validateStatusCode = function (value) {
  let returnvalue = chalk.red('Please enter a number which reprents a valid HTTP status code');
  const validStatusCode = value.match(/^[1-5][0-9][0-9]/);

  if (validStatusCode && value.length === 3) {
    returnvalue = true;
  }
  return returnvalue;
};

module.exports = helper;
