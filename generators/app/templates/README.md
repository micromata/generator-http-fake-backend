[![GitHub version](https://badge.fury.io/gh/micromata%2Fhttp-fake-backend.svg)](https://badge.fury.io/gh/micromata%2Fhttp-fake-backend)
[![Build Status](https://travis-ci.org/micromata/http-fake-backend.svg?branch=master)](https://travis-ci.org/micromata/http-fake-backend)
[![Coverage Status](https://coveralls.io/repos/github/micromata/http-fake-backend/badge.svg?branch=master)](https://coveralls.io/github/micromata/http-fake-backend?branch=master)
[![Dependency Status](https://david-dm.org/micromata/http-fake-backend.svg)](https://david-dm.org/micromata/http-fake-backend)
[![devDependency Status](https://david-dm.org/micromata/http-fake-backend/dev-status.svg?theme=shields.io)](https://david-dm.org/micromata/http-fake-backend#info=devDependencies)
[![Unicorn](https://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)](https://www.youtube.com/watch?v=qRC4Vk6kisY) 

# http-fake-backend

> Build a fake backend by providing the content of JSON files or JavaScript objects through configurable routes.

Comes as a Node.js server. Useful for mocking, testing and developing independent of the »real« backend.

## Example
Let’s say you need an endpoint like <http://localhost:8081/api/foo> which should return:

```
{
  "response": "Yeah"
}
```

It’s a matter of seconds to create this endpoint with help of this little hapi server.

It might take a few seconds longer as setting up the well-made [JSON Server](https://github.com/typicode/json-server) but it’s way more flexible.

## Requirements

- Node.js (v4.0.0 or greater)

## Install

```bash
git clone https://github.com/micromata/http-fake-backend.git
npm install
```

Or with help of [Yeoman](http://yeoman.io)

```bash
npm install -g yo
npm install -g generator-http-fake-backend
```

This comes in handy, because the Yeoman generator has a sub-generator to setup endpoints of your fake backend very convenient. See <https://github.com/micromata/generator-http-fake-backend>.

## Default Address
The server runs at <http://localhost:8081/> providing a page with links to all existing API endpoints.

## Start the server

There are the following two options.

### During development

```
npm run start:dev
```

This way the server uses `nodemon` to restart itself on changes. 
This way you dont have to restart the server in case you changed an endpoint. 


### Later (eg. for tests in CI)

```
npm start
```

Just fires up the server via node.  
This one comes is without any magic (eg. `foreverjs`)

## Configuring endpoints

Each endpoint needs a configuration file in `/server/api/` to define routes, http method and the response.

### Example configuration

`/server/api/articles.js`:

```js
module.exports = SetupEndpoint({
    name: 'articles',
    urls: [
        {
            params: '/{filter}/{offset}/{items}',
            requests: [{
                method: 'GET',
                response: '/json-templates/articles.json'
            }]
        },
        {
            params: '/update',
            requests: [{
                method: 'PATCH',
                response: { patch: true }
            },{
                method: 'PUT',
                response: { put: true }
            }]  
        }
    ],
    statusCode: 505
});
```

The configuration object in Detail:

* `name`  
  * Is used to set the endpoint.
* `urls`
  * You need add least one url object.
* `urls.params`
  * Optional
  * In this example a valid URL might be:
    `http://localhost:8081/api/articles/foo/bar/baz`
    whereas:
    `http://localhost:8081/api/articles` will return a 404 error.
  * See hapi docs regarding [path parameters](http://hapijs.com/api#path-parameters).
* `urls.requests`
    *  You need add least one request object.
* `urls.requests.method` 
    * optional. Uses `GET` when not defined.
    * is used to define the http method to which the endpoint will listen.
* `urls.requests.response` 
  * Could be a string pointing out to a JSON template:
    *   `response: '/json-templates/articles.json'`
  * Or just a JavaScript object:
    * `response: { success: true }`
* `statusCode`
  * Optional
  * Every route of this endpoint will return a http error with the given status code.

## Configuration

The main config is handled via a file named `.env` with the following content:

```dosini
# NODE_ENV
# Could be either `development` or `production`
NODE_ENV=development

# Port of the Server
SERVER_PORT=8081

# Port for running the tests
TEST_PORT=9090

# URL Prefix for the endpoints
# eg. http://localhost:8081/api/foo
API_PREFIX=/api

```


## Related

* [Yeoman Generator](https://github.com/micromata/generator-http-fake-backend) – Easily generate your fake backend and use sub-generators to setup endpoints  like :zap:

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).


