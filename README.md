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

### Start custom Graph.cool backend

Before you start be sure you have installed Graphcool CLI globally on your machine: `$ npm install graphcool -g`
* `cd graphcool`
* `npm install` - to install required dependencies for Graphcool
* `graphcool login`
* Add your Graph.cool endpoint to .graphcoolrc and update it also in project root files .graphqlconfig and env-config.js. Note: In order to deploy the service from the CLI, you need to upgrade your Graph.cool project in the project settings.
* `graphcool deploy --force`

## Random Notes

* [Internet Explorer is not supported](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support).

## Links

* [medium.com/@steida](https://medium.com/@steida/)
* [twitter.com/estejs](https://twitter.com/estejs)
* [wiki](https://github.com/este/este/wiki)
