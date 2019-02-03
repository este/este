import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '../../prisma/generated/prisma-client';
import { createModels } from './models';
import { JsonWebTokenPayload } from './models/userModel';
import { resolvers } from './resolvers';
import { Context, User } from './types';

const { PRISMA_ENDPOINT, PRISMA_SECRET, API_SECRET } = process.env;

if (!PRISMA_ENDPOINT || !PRISMA_SECRET || !API_SECRET)
  throw Error(`Did you run 'yarn env dev'?`);

const db = new Prisma({ endpoint: PRISMA_ENDPOINT, secret: PRISMA_SECRET });

const getUser = async (req: IncomingMessage): Promise<User | null> => {
  const { authorization } = req.headers;
  if (authorization == null) return null;
  const token = authorization.replace('Bearer ', '');
  let decoded = {};
  try {
    decoded = jwt.verify(token, API_SECRET);
  } catch (error) {
    if (error.name !== 'JsonWebTokenError') {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
    return null;
  }
  const hasUserId = (decoded: any): decoded is JsonWebTokenPayload =>
    'userId' in decoded;
  if (!hasUserId(decoded)) return null;
  let user = null;
  try {
    // https://github.com/prisma/prisma/issues/3907
    if (await db.$exists.user({ id: decoded.userId })) {
      user = await db.user({ id: decoded.userId });
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
  if (user == null) return null;
  return { ...user, webs: [] };
};

const server = new ApolloServer({
  context: async ({ req }: { req: IncomingMessage }): Promise<Context> => {
    const user = await getUser(req);
    const models = createModels(db, user);
    return { models };
  },
  // Enforce introspection and playground for production.
  introspection: true,
  playground: true,
  // @ts-ignore Wrong types.
  resolvers,
  typeDefs: gql`
    ${importSchema(__dirname + '/schema.graphql')}
  `,
});

server.listen().then(({ url }: { url: string }) => {
  // tslint:disable-next-line:no-console
  console.log(`Server ready at ${url}`);
});
