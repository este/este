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

* `yarn prisma init appName` choose node-advanced boilerplate and docker
* set `database/prisma.yml` service to appName
* merge `appName/.env` to `.env.dev` (without quotes)
* delete `/appName`
* `yarn prisma deploy`
* `yarn env dev`

## Deploy

* `yarn deploy:db`, TODO: Deploy docker, wait for Prisma Cloud.
* `yarn deploy:api`, use URL for APP_GRAPHQL_ENDPOINT in .env.production
* `yarn deploy:web`

## Dev tasks

* `yarn dev` - start development
* `yarn env dev` - copy `.env.dev` to `.env`
* `yarn env production` - copy `.env.production` to `.env`
* `yarn production` - test production build locally
* `yarn test`
* `yarn schema-relay` - when `yarn dev` is running
* `yarn deploy:db`
* `yarn deploy:api`
* `yarn deploy:web`
* `yarn messages`

## Links

* [twitter.com/estejs](https://twitter.com/estejs)
* [medium.com/@steida](https://medium.com/@steida/)
* [wiki](https://github.com/este/este/wiki)
