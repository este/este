// @flow
/*::
import * as generated from '../__generated__/api.graphql'
*/

const Query /*: generated.Query */ = {
  me: async (args, info, context) => {
    const userId = context.getUserId();
    const user = await context.db.query.user({ where: { id: userId } });
    return user;
  },

  webs: async (args, info, context) => {
    const userId = context.getUserId();
    return await context.db.query.websConnection(
      {
        where: { creator: { id: userId } },
        orderBy: 'updatedAt_ASC',
        first: args.first,
      },
      info,
    );
  },

  page: async (args, info, context) => {
    return await context.db.query.page({ where: { id: args.id } }, info);
  },

  web: async (args, info, context) => {
    const userId = context.getUserId();
    return await context.db.query.web({ where: { id: args.id } }, info);
  },
};

export default Query;
