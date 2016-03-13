'use strict';

const Composer = require('./index');
const Config = require('./config');

Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        server.log('info', 'NODE_ENV: ' + Config.get('/env'));
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
