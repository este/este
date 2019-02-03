import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  requiredViewer: (_parent, _args, ctx) => ctx.models.user.requiredViewer(),
  viewer: (_parent, _args, ctx) => ctx.models.user.viewer(),
  web: (_parent, args, ctx) => ctx.models.web.byId(args.id),
};
