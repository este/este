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
import pages from './pages';

// TODO: This should be typed as well, probably via updated interface Prisma.
const resolvers = {
  Mutation: {
    ...users.mutations,
    ...webs.mutations,
    ...pages.mutations,
  },
  Query: {
    ...users.queries,
    ...webs.queries,
    ...pages.queries,
  },
};

/*::
// Controlled means with custom message or behavior.
// https://stackoverflow.com/a/6937030/233902
type ControlledHttpStatus = 401 | 403 | 404;
import type { Prisma } from '../../database/__generated__/database.graphql'

type Context = {
  db: Prisma,
  throwHttpStatus: ControlledHttpStatus => void,
  getUserId: () => string,
};

// TODO: Interfaces will be removed, this is temp workaround.
// Response is any type because generated type are not complete.
// https://github.com/prismagraphql/prisma-binding/issues/187#issuecomment-397334033
export type Resolver<Args> = (
  // TODO: Better type for the parent if possible.
  parent: Object,
  args: Args,
  context: Context,
  // TODO: GraphQLResolveInfo | string
  info: Object,
) => Promise<any>;
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
