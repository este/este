[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

Universal React. Explore the source code.

## Prerequisites

* [node.js](http://nodejs.org/) Node 8+
* [yarn](https://yarnpkg.com/)

## Starting a project

### Start Development

* `git clone https://github.com/este/este.git este`
* `cd este`
* `yarn`
* `yarn dev`

### Set up custom graph.cool backend

Add your graph.cool endpoint to graphcool/.graphcoolrc and update it also in .graphqlconfig and env-config.js files.

* `npm install graphcool -g`
* `cd graphcool`
* `yarn install`
* `graphcool login`
* `graphcool deploy`

## Links

* [medium.com/@steida](https://medium.com/@steida/)
* [twitter.com/estejs](https://twitter.com/estejs)
* [wiki](https://github.com/este/este/wiki)
