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
* move `foo/.env` file to `.env.dev`, delete `/foo`, run `yarn env dev`
* `yarn dev`

## Dev tasks

* `yarn dev` - start dev
* `yarn env production` - copy `.env.production` to `.env`
* `yarn env dev` - copy `.env.dev` to `.env`
* `yarn start:local` - run built app
* `yarn test`
* `yarn relay`
* `yarn deploy`
* `yarn deploy:db`

## Links

* [twitter.com/estejs](https://twitter.com/estejs)
* [medium.com/@steida](https://medium.com/@steida/)
* [wiki](https://github.com/este/este/wiki)
