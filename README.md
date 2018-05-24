[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

Universal React. React + React Native.

## Prerequisites

* [node.js](http://nodejs.org/) Node 10+
* [yarn](https://yarnpkg.com/en/)

## Setup project

* `git clone https://github.com/este/este.git este`
* `cd este`
* `yarn`

## Create Prisma

* `yarn prisma init YourAppName` choose hosted sandbox
* set `.env.dev` PRISMA_ENDPOINT by `YourAppName/prisma.yml` endpoint
* delete `YourAppName` directory
* `yarn env dev`
* `yarn deploy:db`
* `yarn prisma token` generate token
* `yarn playground` Set database HTTP HEADERS to { "Authorization": "Bearer token" }

## Dev tasks

* `yarn dev` - start web development
* `yarn dev:ios`
* `yarn dev:android`
* `yarn env dev` - copy `.env.dev` to `.env`
* `yarn env production` - copy `.env.production` to `.env`
* `yarn production` - test production build locally
* `yarn test`
* `yarn schema-relay` - when `yarn dev` is running to update schema and Relay
* `yarn deploy:db`
* `yarn deploy:api`
* `yarn deploy:web`
* `yarn messages`
* `yarn prisma --help`

## Deploy

* `npm run deploy:db`,
* `npm run deploy:api`, use URL for APP_GRAPHQL_ENDPOINT in .env.production
* `npm run deploy:web`

## Links

* [twitter.com/estejs](https://twitter.com/estejs)
* [medium.com/@steida](https://medium.com/@steida/)
* [wiki](https://github.com/este/este/wiki)
