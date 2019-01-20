import { WebResolvers } from '../generated/graphqlgen';

export const Web: WebResolvers.Type = {
  createdAt: (parent, _args, ctx) => ctx.models.web.get(parent).createdAt,
  creator: (parent, _args, ctx) => ctx.models.web.get(parent).creator,
  id: (parent, _args, ctx) => ctx.models.web.get(parent).id,
  name: (parent, _args, ctx) => ctx.models.web.get(parent).name,
  updatedAt: (parent, _args, ctx) => ctx.models.web.get(parent).updatedAt,
};
