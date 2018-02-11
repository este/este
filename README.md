[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

Universal React.

## Prerequisites

* [node.js](http://nodejs.org/) Node 8+
* [yarn](https://yarnpkg.com/)

## Starting a project

* `git clone https://github.com/este/este.git este`
* `cd este`
* `yarn`
* `yarn prisma init foo` create GraphQL server to get `.env` file
* merge `foo/.env` to `.env.dev`, then delete `/foo`
* `yarn env dev`
* `yarn dev`

## Dev tasks

* `yarn dev` - start development
* `yarn env dev` - copy `.env.dev` to `.env`
* `yarn env production` - copy `.env.production` to `.env`
* `yarn production`
* `yarn test`
* `yarn relay`
* `yarn deploy:db`
* `yarn deploy:api`
* `yarn deploy:web`

## Links

* [twitter.com/estejs](https://twitter.com/estejs)
* [medium.com/@steida](https://medium.com/@steida/)
* [wiki](https://github.com/este/este/wiki)
