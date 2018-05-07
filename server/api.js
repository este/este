// @flow
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');

// const dev = process.env.NODE_ENV !== 'production';

const server = new GraphQLServer({
  typeDefs: 'server/model.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'database/schema.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: false, // dev, // log all GraphQL queries & mutations
    }),
  }),
});

server.start(() =>
  // eslint-disable-next-line no-console
  console.log(`API is running on ${process.env.APP_GRAPHQL_ENDPOINT || ''}`),
);
