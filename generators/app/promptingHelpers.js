var chalk = require('chalk');
var helper = {};

helper.validateApiPrefix = function (value) {
  var check = value.match(/^\/|\/$/g);
  var returnValue;

  if (check === null) {
    returnValue = chalk.red('API prefix has to begin with a `/`.');
  } else if (check[1] === '/') {
    returnValue = chalk.red('please enter API prefix without trailing  `/`.');
  } else {
    returnValue = true;
  }
  return returnValue;
};

module.exports = helper;
