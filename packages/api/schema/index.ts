import { asNexusMethod, queryType, objectType } from 'nexus';
import GraphQLJSON from 'graphql-type-json';
import {
  DateTime,
  // EmailAddress,
  // URL,
  // RegularExpression,
  // NonPositiveInt,
  // PositiveInt,
  // NonNegativeInt,
  // NegativeInt,
  // NonPositiveFloat,
  // PositiveFloat,
  // NonNegativeFloat,
  // NegativeFloat,
} from '@okgrow/graphql-scalars';

export * from './errors';
export * from './pagination';
export * from './user';
export * from './tada';

// https://github.com/prisma/nexus/issues/132
export const Query = queryType({
  nonNullDefaults: { input: true },
  definition() {},
});

// And t.dateTime() is now available (with types) because of `asNexusMethod`.
export const GQLDateTime = asNexusMethod(DateTime, 'dateTime');
export const GQLJSON = asNexusMethod(GraphQLJSON, 'json');

// Do not use string scalars until Relay will support type mapping.
// https://github.com/facebook/relay/issues/2718
// export const GQLEmailAddress = asNexusMethod(EmailAddress, 'emailAddress');
// export const GQLURL = asNexusMethod(URL, 'URL');
// export const GQLMax140Chars = asNexusMethod(
//   new RegularExpression('Max140Chars', /[\s\S]{0,140}/),
//   'max140Chars',
// );
// export const GQLMax1024Chars = asNexusMethod(
//   new RegularExpression('Max1024Chars', /[\s\S]{0,1024}/),
//   'Max1024Chars',
// );

// Use when needed.

// export const GQLNonPositiveInt = asNexusMethod(
//   NonPositiveInt,
//   'nonPositiveInt',
// );
// export const GQLPositiveInt = asNexusMethod(PositiveInt, 'positiveInt');
// export const GQLNonNegativeInt = asNexusMethod(
//   NonNegativeInt,
//   'nonNegativeInt',
// );
// export const GQLNegativeInt = asNexusMethod(NegativeInt, 'negativeInt');
// export const GQLNonPositiveFloat = asNexusMethod(
//   NonPositiveFloat,
//   'nonPositiveFloat',
// );
// export const GQLPositiveFloat = asNexusMethod(PositiveFloat, 'positiveFloat');
// export const GQLNonNegativeFloat = asNexusMethod(
//   NonNegativeFloat,
//   'nonNegativeFloat',
// );
// export const GQLNegativeFloat = asNexusMethod(NegativeFloat, 'negativeFloat');
