import { asNexusMethod } from 'nexus';
import { GraphQLDateTime } from 'graphql-iso-date';

export * from './query';
export * from './mutation';
export * from './errors';
export * from './user';
export * from './web';

// And t.dateTime() is now available (with types) because of `asNexusMethod`.
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime');
