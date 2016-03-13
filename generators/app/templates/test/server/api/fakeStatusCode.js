'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const SetupEndpoint = require('../../../server/api/setup/setup.js');

const apiUrlPrefix = Config.get('/apiUrlPrefix');

const Endpoint = SetupEndpoint({
    name: 'statuscode',
    urls: [{
        requests: [
            { response: '/test/server/api/fixtures/response.json' }
        ]
    }],
    statusCode: 401
});

const lab = exports.lab = Lab.script();
let request;
let server;

lab.beforeEach((done) => {

    const plugins = [Endpoint];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Fake status code', () => {

    lab.beforeEach((done) => {

        done();
    });

    lab.test('endpoint returns correct faked status code', (done) => {

        request = {
            method: 'GET',
            url: apiUrlPrefix + '/statuscode'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(401);

            done();
        });
    });

    lab.test('undefined method returns correct faked status code', (done) => {

        request = {
            method: 'PUT',
            url: apiUrlPrefix + '/statuscode'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(401);

            done();
        });
    });

});
