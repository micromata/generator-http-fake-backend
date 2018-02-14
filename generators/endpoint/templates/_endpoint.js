'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: '<%= endpoint.name %>',
    urls: [<% endpoint.urls.forEach(function(url, index){ %>
        {<% if (url.params){ %>
            params: '<%= url.params %>',<% } %>
            requests: [{
                method: '<%= url.requests[0].method %>',<% if (url.requests[0].responseType === 'json'){ %>
                response: '/response-files/<%= url.requests[0].response %>'<% } else if (url.requests[0].responseType === 'object'){ %>
                response: <%- url.requests[0].response %><% } %><% if (url.requests[0].statusCode !== '200' && url.requests[0].responseType !== 'error'){ %>,<% } %><% if (url.requests[0].statusCode !== '200'){ %>
                statusCode: <%- url.requests[0].statusCode %><% } %>
            }]
        }<% if (index + 1 !== endpoint.urls.length) { %>,<% } %><% }) %>
    ]
});
