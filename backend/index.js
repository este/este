// @flow
// https://github.com/este/este/issues/1450
// $FlowFixMe
require('babel-register');
// $FlowFixMe
const { GraphQLServer } = require('graphql-yoga');
// $FlowFixMe
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers').default;

const server = new GraphQLServer({
  typeDefs: 'model.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'database/schema.graphql',
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
      secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
      debug: true, // log all GraphQL queries & mutations
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
