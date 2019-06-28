# Este

- [react](https://reactjs.org/)
- [react-native](https://facebook.github.io/react-native/)
- [react-native-web](https://github.com/necolas/react-native-web)
- [nextjs](https://nextjs.org/)
- [zeit.co/now](https://zeit.co/now)
- [typescriptlang.org](https://www.typescriptlang.org/)
- [graphql.org](https://graphql.org/)
- [relay](https://facebook.github.io/relay/)
- [prisma](https://www.prisma.io/)
- [nexusjs](https://nexus.js.org/)
- [apollo-server](https://www.apollographql.com/docs/apollo-server/)

## Prerequisites

- [nodejs.org](http://nodejs.org/) 8 is required because of AWS. They don't support 10 yet.
- [docker-compose](https://www.docker.com/products/docker-engine)
- [yarnpkg.com](https://yarnpkg.com/en/)
- [prisma-cli](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/)

## Setup project

- `git clone https://github.com/este/este`
- `cd este`
- `yarn`
- `yarn docker:up`
- `yarn env dev`
- `yarn prisma:deploy`

## Tasks

- `yarn dev` start web development
- `yarn dev-ios` start iOS development
- `yarn dev-android` start Android development
- `yarn prisma:deploy` after `prisma/datamodel.prisma` change
- `yarn prisma:generate` generate Prisma client
- `yarn prisma:delete` get rid of the whole service
- `yarn gen` after `api/schema.graphql` change
- `yarn env dev` copy `.env.dev` to `.env`
- `yarn env prod` copy `.env.prod` to `.env`
- `yarn build` local build
- `yarn start` local start
- `yarn test` before commit
- `yarn deps` rimraf 'yarn.lock' 'node_modules' '\*\*/node_modules' && yarn
- `now` deploy to [zeit.co/now](https://zeit.co/now)

## Tips

- `yarn dev`, then open [localhost:5000/playground](http://localhost:5000/playground) and set HTTP HEADERS to `{ "Authorization": "Bearer token" }`. Token is browser cookie for api and `yarn prisma token` for db.
- After `prisma/docker-compose.yml` change, run `yarn docker:up`
- To deploy local Prisma to demo server, set up Prisma with demo database, and put its endpoint to .env.prod (copy paste of .env.dev), then `yarn env prod`, then `yarn prisma:deploy`.

## Links

- [twitter.com/steida](https://twitter.com/steida)
- [twitter.com/estejs](https://twitter.com/estejs)
- [medium.com/@steida](https://medium.com/@steida/)
- [wiki](https://github.com/este/este/wiki)
