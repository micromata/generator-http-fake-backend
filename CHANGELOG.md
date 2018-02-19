# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.0.0"></a>
# [4.0.0](https://github.com/micromata/generator-http-fake-backend/compare/v2.0.1...v4.0.0) (2018-02-19)

*We moved from v2.0.1 to v4.0.0 and skipped v3.x to be on the same major level as the underlying [http-fake-backend](https://github.com/micromata/http-fake-backend) to avoid confusion.*

### Bug Fixes

* **dependencies:** Fix linting errors caused by eslint update ([a51aad3](https://github.com/micromata/generator-http-fake-backend/commit/a51aad3))
* **dependencies:** Revert gulp-mocha to 3.x ([b005b7c](https://github.com/micromata/generator-http-fake-backend/commit/b005b7c)), closes [sindresorhus/gulp-mocha#159](https://github.com/sindresorhus/gulp-mocha/issues/159)
* **dependencies:** update dependencies ([09fb881](https://github.com/micromata/generator-http-fake-backend/commit/09fb881))
* automatically install with npm if Yarn isn’t available ([1fe4844](https://github.com/micromata/generator-http-fake-backend/commit/1fe4844)), closes [#5](https://github.com/micromata/generator-http-fake-backend/issues/5)
* Remove Gulp and replace Mocha with Jest ([#6](https://github.com/micromata/generator-http-fake-backend/issues/6)) ([475b466](https://github.com/micromata/generator-http-fake-backend/commit/475b466))
* Update dependencies ([4df3ba1](https://github.com/micromata/generator-http-fake-backend/commit/4df3ba1))
* Update dependencies of generated project ([60e1ace](https://github.com/micromata/generator-http-fake-backend/commit/60e1ace))
* update dependencies of the Yeoman generator ([f1ff18e](https://github.com/micromata/generator-http-fake-backend/commit/f1ff18e))


### Chores

* Update required minimum Node version to 6.0.0 ([6c32225](https://github.com/micromata/generator-http-fake-backend/commit/6c32225))


### Features

* Update fake backend to 4.0.2 ([05e234d](https://github.com/micromata/generator-http-fake-backend/commit/05e234d)), closes [#7](https://github.com/micromata/generator-http-fake-backend/issues/7) [#11](https://github.com/micromata/generator-http-fake-backend/issues/11)
  
  > #### http-fake-backend 4.0.2
  > 
  > ##### Bug Fixes
  > 
  > * update minimum node version in package.json
>
>*Change `engines.node` to `>=6.0.0` to reflect the minimum node version which is needed since http-fake-backend 4.0.0.*
>
  > #### http-fake-backend 4.0.1
>
  > ##### Bug Fixes
>
  > * encoding of binary files send via endpoints
  > 
  > #### http-fake-backend 4.0.0
  > 
  > ##### Bug Fixes
  > 
  > * **dependencies:** Apply changes of boom update
  > * **dependencies:** Update dependencies
  > 
  > ##### Code Refactoring
  > 
  > * Refactor existing codebase
  > 
  > ##### Documentation
  > 
  > * Update required minimum Node version in readme
  > 
  > ##### Features
  > 
  > * Add support for other response content-types, closes [#7](https://github.com/micromata/http-fake-backend/issues/7)
  > * Add support for sending files as response, closes [#11](https://github.com/micromata/http-fake-backend/issues/11)
>
  > ##### BREAKING CHANGES
>
  > * The transitive dependency punycode@2.1.0 needs Node version ">=6".
  > * The setup.js is divided to multiple files.
Therefore you need to change the import of the setup in your endpoint files
like the following:
  > 
  > ```javascript
> // before
> const SetupEndpoint = require('./setup/setup.js');
>
> // now
> const SetupEndpoint = require('./setup/index.js');
> 
> // or:
> const SetupEndpoint = require('./setup/');
> ```


### BREAKING CHANGES

* This project now needs Node 6 or greater.
