// @flow
/*::
import * as generated from '../__generated__/api.graphql'
*/

const Query /*: generated.Query */ = {
  me: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    const user = await db.query.user({ where: { id: userId } });
    return user;
  },

  webs: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    return await db.query.websConnection(
      {
        where: { creator: { id: userId } },
        orderBy: 'updatedAt_ASC',
        first: args.first,
      },
      info,
    );
  },

  page: async (args, info, { db }) => {
    return await db.query.page({ where: { id: args.id } }, info);
  },

  web: async (args, info, { userId, db }) => {
    return await db.query.web({ where: { id: args.id } }, info);
  },
};

export default Query;
