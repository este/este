// @flow
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');
const jsonwebtoken = require('jsonwebtoken');

// const dev = process.env.NODE_ENV !== 'production';

/*::

// Controlled means with custom message or behavior.
// https://stackoverflow.com/a/6937030/233902
export type ControlledHttpStatus = 401 | 403 | 404;

type Context = {
  db: {
    query: { [string]: (Object, Object) => any },
    mutation: { [string]: (Object, Object) => any },
    exists: { [string]: (Object) => any },
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

const createContext = context => ({
  ...context,
  db: new Prisma({
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
    const decoded = jsonwebtoken.verify(token, process.env.APP_SECRET || '');
    // https://flow.org/en/docs/lang/refinements
    // Note refinement must be gradual within if statement because of Flow.
    if (decoded != null && typeof decoded.userId === 'string') {
      return decoded.userId;
    }
    throwHttpStatus(401);
  },
});

const server = new GraphQLServer({
  typeDefs: 'server/model.graphql',
  resolvers,
  context: createContext,
});

server.start(() =>
  // eslint-disable-next-line no-console
  console.log(`API is running on ${process.env.APP_GRAPHQL_ENDPOINT || ''}`),
);
