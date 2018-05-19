[![Circle CI](https://img.shields.io/circleci/project/este/este/master.svg)](https://circleci.com/gh/este/este)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

Universal React. React + React Native.

## Prerequisites

* [node.js](http://nodejs.org/) Node 10+
* `npm i -g npm@latest`

## Setup project

* `git clone https://github.com/este/este.git este`
* `cd este`
* `npm i`

## Create Prisma

* `npm run prisma init YourAppName` choose hosted sandbox
* set `.env.dev` PRISMA_ENDPOINT by `YourAppName/prisma.yml` endpoint
* delete `YourAppName` directory
* `npm run env dev`
* `npm run deploy:db`
* `npm run prisma token` generate token
* `npm run playground` Set database HTTP HEADERS to { "Authorization": "Bearer token" }

## Dev tasks

* `npm run dev` - start web development
* `npm run dev playground` - start web development with GraphQL playground
* `npm run dev:ios`
* `npm run dev:android`
* `npm run env dev` - copy `.env.dev` to `.env`
* `npm run env production` - copy `.env.production` to `.env`
* `npm run production` - test production build locally
* `npm run test`
* `npm run schema-relay` - when `npm run dev` is running to update schema and Relay
* `npm run deploy:db`
* `npm run deploy:api`
* `npm run deploy:web`
* `npm run messages`
* `npm run prisma --help`

## Deploy

* `npm run deploy:db`,
* `npm run deploy:api`, use URL for APP_GRAPHQL_ENDPOINT in .env.production
* `npm run deploy:web`

## Links

* [twitter.com/estejs](https://twitter.com/estejs)
* [medium.com/@steida](https://medium.com/@steida/)
* [wiki](https://github.com/este/este/wiki)
