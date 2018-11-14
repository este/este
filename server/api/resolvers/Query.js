// @flow
import type { Query as QueryType } from '../__generated__/api.graphql';

// Note info argument enables subqueries.
// https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a/

const Query: QueryType = {
  me: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    return db.query.user({ where: { id: userId } }, info);
  },

  page: async (args, info, { db }) => {
    return db.query.page({ where: { id: args.id } }, info);
  },

  web: async (args, info, { db }) => {
    return db.query.web({ where: { id: args.id } }, info);
  },

  components: async (args, info, { db }) => {
    return db.query.components({ where: {} }, info);
  },
};

export default Query;
