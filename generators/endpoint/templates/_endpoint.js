'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: '<%= endpoint.name %>',
    urls: [
        <% endpoint.urls.forEach(function(url, index){ %>
        {
            params: '<%= url.params %>',
            requests: [{
                method: '<%= url.requests[0].method %>',
                response: '<%- url.requests[0].response %>'
            }]
        }<% if (index + 1 !== endpoint.urls.length) { %>,<% } %><% }) %>
    ]/*,
    statusCode: 401*/
});
