import { ApolloServer } from 'apollo-server';
import { makePrismaSchema } from 'nexus-prisma';
import path from 'path';
import { IncomingMessage } from 'http';
// import { ports } from '@app/serverless/getEndpoint';
// import { withCORS } from '@app/serverless/withCORS';
import { prisma } from '../../prisma/generated/prisma-client';
import datamodelInfo from '../../prisma/generated/nexus-prisma';

import {
  Context,
  WebSocketConnectionContext,
  WebSocketConnectionParams,
} from './types';
import { getUser } from './getUser';
import { createModels } from './models';
import * as schemaTypes from './schema';

const { PRISMA_ENDPOINT, PRISMA_SECRET, API_SECRET } = process.env;
if (!PRISMA_ENDPOINT || !PRISMA_SECRET || !API_SECRET)
  throw Error(`Did you run 'yarn env dev'?`);

// Nullability
// https://blog.apollographql.com/designing-graphql-mutations-e09de826ed97
// https://blog.apollographql.com/using-nullability-in-graphql-2254f84c4ed7
// Remember
//  For input arguments and fields, adding non-null is a breaking change.
//  For output fields, removing non-null from a field is a breaking change.
//  By id queries like tada(id: ID!): Tada! returns always non nullable value,
//  because errors are passed as permissions exists or isTadaCreatorOrAdmin etc.
const schema = makePrismaSchema({
  types: schemaTypes,
  // All inputs are non nullable.
  // Remember, after release, every new input must be nullable.
  // Note payloads and errors needs nonNullDefaults: { output: false }.
  nonNullDefaults: { input: true },
  prisma: {
    client: prisma,
    datamodelInfo,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  typegenAutoConfig: {
    // debug: true,
    sources: [{ source: path.join(__dirname, './types.ts'), alias: 'types' }],
    contextType: 'types.Context',
  },
  // backingTypeMap: {
  //   EmailAddress: 'string',
  //   DateTime: 'string',
  //   Max1024Chars: 'string',
  //   Max140Chars: 'string',
  //   URL: 'string',
  // },
});

const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: async ({ host, token }: WebSocketConnectionParams) => {
      const user = await getUser(API_SECRET, prisma, token || null);
      return { user, host };
    },
  },
  context: async ({
    req,
    connection,
  }: {
    req: IncomingMessage;
    connection: { context: WebSocketConnectionContext };
  }): Promise<Context> => {
    let user = null;
    let host = null;
    if (connection) {
      user = connection.context.user;
      host = connection.context.host;
    } else {
      if (req.headers.host == null) {
        throw new Error('missing req.headers.host');
      }
      host = req.headers.host;
      const { authorization } = req.headers;
      const token = authorization ? authorization.replace('Bearer ', '') : null;
      user = await getUser(API_SECRET, prisma, token);
    }

    const models = createModels(prisma, user, host);
    return { models };
  },
  // Enable introspection and playground for production.
  introspection: true,
  playground: true,
});

server
  .listen()
  .then(
    ({ url, subscriptionsUrl }: { url: string; subscriptionsUrl: string }) => {
      console.log(`🚀 Appolo server ready at ${url}`);
      console.log(`🚀 Appolo subscriptions ready at ${subscriptionsUrl}`);
    },
  );
// const { IS_NOW } = process.env;

// const handler = withCORS(
//   ports.api,
//   server.createHandler({
//     path: IS_NOW ? '/_api' : '/',
//   }),
// );

// // eslint-disable-next-line import/no-default-export
// export default handler;
