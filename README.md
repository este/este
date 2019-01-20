[![CircleCI](https://circleci.com/gh/este/este/tree/master.svg?style=svg)](https://circleci.com/gh/este/este/tree/master)
[![Dependency Status](https://david-dm.org/este/este.svg)](https://david-dm.org/este/este)

# Este

- [reactjs.org](https://reactjs.org/)
- [nextjs.org](https://nextjs.org/)
- [github.com/necolas/react-native-web](https://github.com/necolas/react-native-web)
- [typescriptlang.org](https://www.typescriptlang.org/)
- [graphql.org](https://graphql.org/)
- [facebook.github.io/relay](https://facebook.github.io/relay/)
- [prisma.io](https://www.prisma.io/)

## Prerequisites

- [nodejs.org](http://nodejs.org/)
- [docker-compose](https://www.docker.com/products/docker-engine)

## Setup project

- `git clone https://github.com/este/este`
- `cd este`
- `npm install`
- `npm run docker:up`
- `npm run deploy:db`
- `npm run env dev`

## Tasks

- `npm run dev` start development
- `npm run deploy:db` after `prisma/datamodel.graphql` change
- `npm run gen:api` after `api/schema.graphql` change
- `npm run production` build and start
- `npm run prisma delete` get rid of the whole service
- `npm run env dev` copy `.env.dev` to `.env`
- `npm run env production` copy `.env.production` to `.env`
- `npm test` before commit

## Tips

- Open [localhost:5000/playground](http://localhost:5000/playground) and set HTTP HEADERS to `{ "Authorization": "Bearer token" }`. Token is browser cookie for api and `npm run prisma token` for db.

## Links

- [twitter.com/steida](https://twitter.com/steida)
- [twitter.com/estejs](https://twitter.com/estejs)
- [medium.com/@steida](https://medium.com/@steida/)
- [wiki](https://github.com/este/este/wiki)

## Bitcoin

If you like Este and Bitcoin, send me a few Satoshis.

[blockstream.info/address/13fJfcXAZncP1NnMNtpG1KxEYL514jtUy3](https://blockstream.info/address/13fJfcXAZncP1NnMNtpG1KxEYL514jtUy3)
