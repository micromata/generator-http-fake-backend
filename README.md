[![npm version](https://badge.fury.io/js/generator-http-fake-backend.svg)](http://badge.fury.io/js/generator-http-fake-backend)
[![Build Status](https://travis-ci.org/micromata/generator-http-fake-backend.svg?branch=master)](https://travis-ci.org/micromata/generator-http-fake-backend)
[![Coverage Status](https://coveralls.io/repos/github/micromata/generator-http-fake-backend/badge.svg?branch=master)](https://coveralls.io/github/micromata/generator-http-fake-backend?branch=master)
[![Dependency Status](https://david-dm.org/micromata/generator-http-fake-backend.svg)](https://david-dm.org/micromata/generator-http-fake-backend)
[![devDependency Status](https://david-dm.org/micromata/generator-http-fake-backend/dev-status.svg?theme=shields.io)](https://david-dm.org/micromata/generator-http-fake-backend#info=devDependencies)
[![Unicorn](https://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)](https://www.youtube.com/watch?v=qRC4Vk6kisY) 

# Yeoman generator for http-fake-backend

> Build a fake backend by providing the content of JSON files or JavaScript objects through configurable routes.

```
     _-----_
    |       |    .--------------------------.
    |--(o)--|    |      Welcome to the      |
   `---------´   |        phenomenal        |
    ( _´U`_ )    |     http-fake-backend    |
    /___A___\    |        generator!        |
     |  ~  |     '--------------------------'
   __'.___.'__   
 ´   `  |° ´ Y ` 
```

Please check the [README](https://github.com/micromata/http-fake-backend) of »http-fake-backend« to get detailed information about what it’s all about.

This readme only contains the gist of it and mainly describes Yeoman specific things.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-http-fake-backend using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-http-fake-backend
```

Then generate your fake backend server:

```bash
yo http-fake-backend
```
 

## Generating endpoints

```bash
yo http-fake-backend:endpoint
```

Please see detailed info regarding how to adjust your endpoints over here: 
<https://github.com/micromata/http-fake-backend>

## Start the server

```
npm run start:dev
```

This way the server uses `nodemon` to restart itself on changes. 
This way you dont have to restart the server in case you changed an endpoint.

## Getting To Know Yeoman

Yeoman has a heart of gold. He’s a person with feelings and opinions, but he’s very easy to work with. If you think he’s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [Micromata](www.micromata.de)

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).


