import { UserResolvers } from '../generated/graphqlgen';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  webs: (parent, _, ctx) => ctx.models.user.webs(parent.id),
};
