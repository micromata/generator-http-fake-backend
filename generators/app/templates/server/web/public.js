'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: './server/web/public/assets',
                listing: true
            }
        }
    });

    next();
};


exports.register.attributes = {
    name: 'public'
};
