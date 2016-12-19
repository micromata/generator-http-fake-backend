const chalk = require('chalk');
const helper = {};

helper.validateApiPrefix = function (value) {
  const check = value.match(/^\/|\/$/g);
  let returnValue;

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
