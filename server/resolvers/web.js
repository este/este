// @flow
const validate = require('../validate');
const diacriticsMap = require('diacritics-map');

/*::
import type { Resolver } from '../api'
import * as generated from '../../components/__generated__/CreateWebMutation.graphql';
*/

const validateCreateWebInput = (input /*: generated.CreateWebInput */) => {
  const name = validate.shortRequiredString(input.name);
  if (name) return { name };
};

const createWeb /*: Resolver<
  generated.CreateWebMutationVariables,
  generated.CreateWebMutationResponse,
  'createWeb',
> */ = async (
  parent,
  { input },
  context,
) => {
  const userId = context.getUserId();
  const errors = validateCreateWebInput(input);
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

module.exports = {
  validateCreateWebInput,
  mutations: { createWeb },
};
