import { asNexusMethod, queryType } from 'nexus';
import { GraphQLDateTime } from 'graphql-iso-date';

export * from './errors';
export * from './user';
export * from './web';

// https://github.com/prisma/nexus/issues/132
export const Query = queryType({
  nonNullDefaults: { input: true },
  definition() {},
});

// And t.dateTime() is now available (with types) because of `asNexusMethod`.
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime');
