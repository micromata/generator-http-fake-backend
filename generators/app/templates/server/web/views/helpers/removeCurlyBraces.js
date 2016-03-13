'use strict';

/**
 * Returns the given params without curly braces.
 */

module.exports = function (params) {

    if (typeof params === 'string') {
        params = params.replace(/({|})/g, '');
    }
    else {
        params = '';
    }

    return params;
};
