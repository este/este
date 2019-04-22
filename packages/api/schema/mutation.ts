import { objectType, arg } from 'nexus';

// https://blog.apollographql.com/designing-graphql-mutations-e09de826ed97

export const Mutation = objectType({
  nonNullDefaults: { input: true },
  name: 'Mutation',
  definition(t) {
    t.field('signIn', {
      type: 'SignInPayload',
      args: { input: arg({ type: 'SignInInput' }) },
      resolve: (_root, { input }, context) => context.models.user.signIn(input),
    });

    t.field('setUserTheme', {
      type: 'SetUserThemePayload',
      args: { input: arg({ type: 'SetUserThemeInput' }) },
      resolve: (_root, { input }, context) =>
        context.models.user.setTheme(input.name),
    });

    t.field('createWeb', {
      type: 'CreateWebPayload',
      args: { input: arg({ type: 'CreateWebInput' }) },
      resolve: (_root, { input }, context) =>
        context.models.web.createWeb(input),
    });

    t.field('updateWeb', {
      type: 'UpdateWebPayload',
      args: { input: arg({ type: 'UpdateWebInput' }) },
      resolve: (_root, { input }, context) =>
        context.models.web.updateWeb(input),
    });

    t.field('deleteWeb', {
      type: 'DeleteWebPayload',
      args: { input: arg({ type: 'DeleteWebInput', required: true }) },
      resolve: (_root, { input }, context) =>
        context.models.web.deleteWeb(input),
    });
  },
});
