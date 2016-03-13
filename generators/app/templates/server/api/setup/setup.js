'use strict';

const Boom = require('boom');
const Config = require('../../../config');

module.exports = function (settings) {

    const exportEndpoint = {};
    const path = Config.get('/apiUrlPrefix') + '/' + settings.name;
    const urls = settings.urls;

    exportEndpoint.register = function (server, options, next) {

        const routes = [];

        const createRoutes = function (url) {

            const params = url.params || '';

            url.requests.forEach((action) => {

                const method = action.method || 'GET';
                const supportedMethod = {
                    method: method,
                    path: path + params,
                    handler: function (request, reply) {

                        let response;

                        if (settings.statusCode) {
                            response = Boom.create(settings.statusCode);
                        }
                        else {
                            server.log('info', 'Received payload:' + JSON.stringify(request.payload));

                            if (typeof action.response === 'string') {
                                response = require('../../..' + action.response);
                            }
                            else {
                                response = action.response;
                            }

                        }

                        return reply(response);
                    }
                };
                routes.push(supportedMethod);
            });

            const unsupportedMethods = {
                method: '*',
                path: path + params,
                handler: function (request, reply) {

                    let response;

                    if (settings.statusCode) {
                        response = Boom.create(settings.statusCode);
                    }
                    else {
                        response = Boom.methodNotAllowed();
                    }

                    return reply(response);
                }
            };

            routes.push(unsupportedMethods);
        };

        urls.forEach(createRoutes);
        server.route(routes);
        next();
    };

    exportEndpoint.register.attributes = {
        name: settings.name,
        path: path,
        urls: urls
    };

    return exportEndpoint;
};
