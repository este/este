[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

Universal React. Explore the source code.

## Prerequisites

* [node.js](http://nodejs.org/) Node 8+
* [yarn](https://yarnpkg.com/)

## Starting a project

### Start development

* `git clone https://github.com/este/este.git este`
* `cd este`
* `yarn`
* `yarn dev`

### Set up custom graph.cool backend

* `cd graphcool`
* `yarn`
* `yarn graphcool login`
* `yarn graphcool deploy`
* `yarn graphcool playground` In URL, replace `simple` with `relay`.

Add endpoint to env-config.js, .graphqlconfig, and graphcool/.graphcoolrc files.

## Links

* [twitter.com/estejs](https://twitter.com/estejs)
* [medium.com/@steida](https://medium.com/@steida/)
* [wiki](https://github.com/este/este/wiki)
