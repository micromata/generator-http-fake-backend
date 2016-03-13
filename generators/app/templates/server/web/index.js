'use strict';

const RequireDir = require('require-dir');
const apiDir = RequireDir('../api');


const getEndpoints = function (request, reply) {

    const endpoints = [];

    Object.keys(apiDir).forEach((key) => {

        endpoints.push(apiDir[key].register.attributes);
    });

    return reply(endpoints);
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            pre: [{
                method: getEndpoints,
                assign: 'getEndpoints'
            }],
            handler: function (request, reply) {

                return reply.view('index', {
                    title: 'endpoints / routes',
                    endpoints: request.pre.getEndpoints
                });
            }
        }
    });

    next();
};


exports.register.attributes = {
    name: 'index',
    dependencies: 'visionary'
};
