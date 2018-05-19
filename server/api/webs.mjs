// @flow
import * as validate from './validate.mjs';
import diacriticsMap from 'diacritics-map';
/*::
import type { Resolver } from './index';
*/

/*::
import type {
  CreateWebMutationVariables,
  CreateWebMutationResponse,
  CreateWebInput,
} from '../../components/__generated__/CreateWebMutation.graphql';
*/

export const validateCreateWeb = (input /*: CreateWebInput */) => {
  const name = validate.shortString(input.name);
  if (name) return { name };
};

const createWeb /*: Resolver<
  CreateWebMutationVariables,
  CreateWebMutationResponse,
  'createWeb',
> */ = async (
  parent,
  { input },
  context,
) => {
  const userId = context.getUserId();

  const errors = validateCreateWeb(input);
  if (errors) return { edge: null, errors };

  const domainName = input.name
    .toLowerCase()
    .split('')
    .map(char => diacriticsMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]/g, '');
  const timestamp = Date.now().toString(36);
  const domain = `${domainName}-${timestamp}`;

  const web = await context.db.mutation.createWeb({
    data: {
      name: input.name,
      domain,
      owner: { connect: { id: userId } },
    },
  });

  return { edge: { node: web }, errors: null };
};

// async deleteWeb(parent, { input }, context) {
//   const userId = getUserId(context);
//   const webExists = await context.db.exists.Web({
//     id: input.id,
//     owner: { id: userId },
//   });
//   if (!webExists) throwHttpStatus(404);
//   await context.db.mutation.deleteWeb({ where: { id: input.id } });
//   return { id: input.id };
// },

// components/__generated__/Webs.graphql.js
const webs /*: Resolver<
  any, // relay-compiler does not support Relay Connection it seems.
  any,
  any,
> */ = async (
  parent,
  args,
  context,
  info,
) => {
  const userId = context.getUserId();
  const webs = await context.db.query.websConnection(
    {
      where: { owner: { id: userId } },
      orderBy: 'updatedAt_ASC',
      first: args.first,
    },
    info,
  );
  return webs;
};

//     async web(parent, { domain }, ctx, info) {
//       const userId = getUserId(ctx);
//       const requestingUserIsOwner = await ctx.db.exists.Web({
//         domain,
//         owner: { id: userId },
//       });
//       if (!requestingUserIsOwner) throwNotAuthorizedError();
//       return ctx.db.query.web({ where: { domain } }, info);
//     },

export default {
  mutations: { createWeb },
  queries: { webs },
};
