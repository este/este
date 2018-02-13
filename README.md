[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

Universal React.

## Prerequisites

* [node.js](http://nodejs.org/) Node 8+
* [yarn](https://yarnpkg.com/)

## Create project

* `git clone https://github.com/este/este.git este`
* `cd este`
* `yarn`

## Create Prisma DB

* `yarn prisma init appName` choose node-advanced boilerplate
* set `database/prisma.yml` service to appName
* merge `appName/.env` to `.env.dev` (without quotes)
* delete `/appName`
* `yarn prisma deploy`
* `yarn env dev`

TODO: Deploy.

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
