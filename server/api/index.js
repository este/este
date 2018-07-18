// @flow
import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import jsonwebtoken from 'jsonwebtoken';
import resolvers from './resolvers';
import permissions from './permissions';
import type { Prisma as DB } from '../../database/__generated__/database.graphql';

// Used in server/api/__generated__/api.graphql.js Check scripts/fixCodegen.
export type Context = {|
  request: any,
  response: any,
  db: DB,
  userId: ?string,
|};

const maybeGetUserId = (request): ?string => {
  const authorization = request.get('authorization');
  if (!authorization) return null;
  const token = authorization.replace('Bearer ', '');
  const decoded = jsonwebtoken.verify(token, process.env.API_SECRET || '');
  // https://flow.org/en/docs/lang/refinements
  if (decoded == null || typeof decoded.userId !== 'string') return null;
  return decoded.userId;
};

const db = new Prisma({
  typeDefs: 'database/schema.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  // log all GraphQL queries & mutations
  // process.env.NODE_ENV !== 'production'
  debug: false,
});

const server = new GraphQLServer({
  typeDefs: 'server/api/model.graphql',
  resolvers,
  middlewares: [permissions],
  resolverValidationOptions: {
    // https://github.com/prismagraphql/prisma/issues/2225#issuecomment-384697669
    requireResolversForResolveType: false,
  },
  context: context => ({
    ...context,
    db,
    userId: maybeGetUserId(context.request),
  }),
});

server.start(() =>
  // eslint-disable-next-line no-console
  console.log(`API is running on ${process.env.API_ENDPOINT || ''}`),
);
