'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: '<%= endpoint.name %>',
    urls: [<% endpoint.urls.forEach(function(url, index){ %>
        {
            params: '<%= url.params %>',
            requests: [{
                method: '<%= url.requests[0].method %>',<% if (url.requests[0].responseType === 'json'){ %>
                response: '/json-templates/<% url.requests[0].response %>'<% } else { %>
                response: '<%- url.requests[0].response %>'<% } %>
            }]
        }<% if (index + 1 !== endpoint.urls.length) { %>,<% } %><% }) %>
    ]/*,
    statusCode: 401*/
});
