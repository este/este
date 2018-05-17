// @flow

/*::
import type { Resolver } from '../api'
import * as generated from '../../components/__generated__/CreateWebMutation.graphql';
*/

const validateCreateWebInput = (input: generated.CreateWebInput) => {
  // musi to jet field po fieldu, a musej tam imho bejt vsechny
  // takze zvaliduju vse? hmm, proc ne?
  return {
    name: null, //validate.shortString(input.name),
  };
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

  // return {
  //   edge: null,
  //   // Taky bude generovat validace, takze naprosto cajk.
  //   errors: { name: 'NO_TRAILING_SPACES' },
  // };
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

//   // const userId = getUserId(context);
//   //
//   // // napsat validaci znova? je to tak, ze pouziju generovane typy?
// nebo budu psat typy znova? imho, generovat, ok, jo to dava smysl
// a validace patri sem imho, ok
//   // // const errors = validation.validateNewWeb(input);
//   return {
//     edge: null,
//     // Taky bude generovat validace, takze naprosto cajk.
//     errors: { name: null },
//   };
//   // // console.log(errors);
//   // // potrebuju { name: 'required' }
//   //
//   // const domainName = input.name
//   //   .toLowerCase()
//   //   .split('')
//   //   .map(char => diacriticsMap[char] || char)
//   //   .join('')
//   //   .replace(/[^a-z0-9]/g, '');
//   // const timestamp = Date.now().toString(36);
//   // const domain = `${domainName}-${timestamp}`;
//   //
//   // const web = await context.db.mutation.createWeb({
//   //   data: {
//   //     name: input.name,
//   //     domain,
//   //     owner: { connect: { id: userId } },
//   //   },
//   // });
//   //
//   // return {
//   //   edge: {
//   //     node: web,
//   //   },
//   //   errors: null,
//   // };
// };
