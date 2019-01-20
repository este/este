import { MutationResolvers } from '../generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createWeb: (_, args, ctx) => ctx.models.web.createWeb(args.input),
  deleteWeb: (_, args, ctx) => ctx.models.web.deleteWeb(args.input),
  setUserTheme: (_, args, ctx) => ctx.models.user.setTheme(args.input.name),
  signIn: (_, args, ctx) => ctx.models.user.signIn(args.input),
  updateWeb: (_, args, ctx) => ctx.models.web.updateWeb(args.input),
};
