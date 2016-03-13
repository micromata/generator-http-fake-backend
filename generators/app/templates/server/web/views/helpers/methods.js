'use strict';

/**
 * Returns the method(s) or the default method when no method is defined.
 */

module.exports = function (requests) {

    const methods = [];
    requests.forEach((response) => {

        methods.push(response.method || 'GET');
    });
    return methods.join(',');
};
