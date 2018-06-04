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
  const name = validate.max140Chars(input.name);
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
      creator: { connect: { id: userId } },
    },
  });

  return { edge: { node: web }, errors: null };
};

/*::
import type {
  WebsItemDeleteMutationVariables,
  WebsItemDeleteMutationResponse,
} from '../../components/__generated__/WebsItemDeleteMutation.graphql';
*/

const deleteWeb /*: Resolver<
  WebsItemDeleteMutationVariables,
  WebsItemDeleteMutationResponse,
  'deleteWeb',
> */ = async (
  parent,
  { input },
  context,
) => {
  const userId = context.getUserId();
  const webExists = await context.db.exists.Web({
    id: input.id,
    creator: { id: userId },
  });
  if (!webExists) context.throwHttpStatus(404);
  await context.db.mutation.deleteWeb({ where: { id: input.id } });
  return { id: input.id };
};

// relay-compiler does not generate input type for Connection it seems.
// components/__generated__/Webs.graphql.js
const webs /*: Resolver<
  any,
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
      where: { creator: { id: userId } },
      orderBy: 'updatedAt_ASC',
      first: args.first,
    },
    info,
  );
  return webs;
};

/*::
import type {
  editQueryVariables,
  editQueryResponse,
} from '../../pages/__generated__/editQuery.graphql.js';
*/

const web /*: Resolver<
  editQueryVariables,
  editQueryResponse,
  'web',
> */ = async (
  parent,
  { domain },
  context,
  info,
) => {
  const userId = context.getUserId();
  const webExists = await context.db.exists.Web({
    domain,
    creator: { id: userId },
  });
  if (!webExists) context.throwHttpStatus(403);
  return context.db.query.web({ where: { domain } }, info);
};

export default {
  mutations: { createWeb, deleteWeb },
  queries: { webs, web },
};
