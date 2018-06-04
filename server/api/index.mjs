// @flow
import yoga from 'graphql-yoga';
import prisma from 'prisma-binding';
import jsonwebtoken from 'jsonwebtoken';

// Workflow
// - update database/model.graphql
// - yarn deploy:db
// - test it in playground
// - update server/api/model.graphql
// - add resolver here
// - test it in playground
// - yarn schema-relay
// - restart `yarn dev`
// - now we can use it in client code

import users from './users';
import webs from './webs';

const resolvers = {
  Mutation: {
    ...users.mutations,
    ...webs.mutations,
  },
  Query: {
    ...users.queries,
    ...webs.queries,
  },
};

/*::
// Controlled means with custom message or behavior.
// https://stackoverflow.com/a/6937030/233902
export type ControlledHttpStatus = 401 | 403 | 404;

type Context = {
  db: {
    // https://github.com/prismagraphql/prisma-binding#api
    query: { [string]: (any, any) => any },
    mutation: { [string]: (any) => any },
    exists: { [string]: (any) => any },
  },
  throwHttpStatus: ControlledHttpStatus => void,
  getUserId: () => string,
};

export type Resolver<Variables, Response, Name: string> = (
  parent: Object,
  variables: Variables,
  context: Context,
  info: Object,
) => Promise<$ElementType<Response, Name>>;
*/

const throwHttpStatus = (status /*: ControlledHttpStatus */) => {
  throw new Error(status.toString());
};

// const dev = process.env.NODE_ENV !== 'production';

const createContext = context => ({
  ...context,
  db: new prisma.Prisma({
    typeDefs: 'database/schema.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false, // dev, // log all GraphQL queries & mutations
  }),
  throwHttpStatus,
  getUserId() {
    const authorization = context.request.get('authorization');
    if (!authorization) throwHttpStatus(401);
    const token = authorization.replace('Bearer ', '');
    const decoded = jsonwebtoken.verify(token, process.env.API_SECRET || '');
    // https://flow.org/en/docs/lang/refinements
    // Note refinement must be gradual within if statement because of Flow.
    if (decoded != null && typeof decoded.userId === 'string') {
      return decoded.userId;
    }
    throwHttpStatus(401);
  },
});

const server = new yoga.GraphQLServer({
  typeDefs: 'server/api/model.graphql',
  resolvers,
  context: createContext,
  resolverValidationOptions: {
    // https://github.com/prismagraphql/prisma/issues/2225#issuecomment-384697669
    requireResolversForResolveType: false,
  },
});

server.start(() =>
  // eslint-disable-next-line no-console
  console.log(`API is running on ${process.env.API_ENDPOINT || ''}`),
);
