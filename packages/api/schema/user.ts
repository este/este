import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
} from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.dateTime('createdAt');
    t.dateTime('updatedAt');
    t.string('email');
    t.string('themeName');
    t.list.field('webs', {
      type: 'Web',
      resolve: (root, _args, context) => context.models.user.webs(root.id),
    });
  },
});

// https://medium.com/workflowgen/graphql-schema-design-the-viewer-field-aeabfacffe72
export const viewer = queryField('viewer', {
  type: User,
  nullable: true,
  resolve: (_root, _args, context) => context.models.user.viewer(),
});

// requiredViewer throws, so the app can redirect.
export const requiredViewer = queryField('requiredViewer', {
  type: User,
  resolve: (_root, _args, context) => context.models.user.requiredViewer(),
});

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition(t) {
    t.string('email');
    t.string('password');
    t.boolean('createAccount');
  },
});

export const SignInErrors = objectType({
  nonNullDefaults: { output: false },
  name: 'SignInErrors',
  definition(t) {
    t.field('email', { type: 'EmailError' });
    t.field('password', { type: 'PasswordError' });
  },
});

export const SignInPayload = objectType({
  nonNullDefaults: { output: false },
  name: 'SignInPayload',
  definition(t) {
    t.field('errors', { type: SignInErrors });
    t.string('token');
  },
});

export const signIn = mutationField('signIn', {
  type: SignInPayload,
  args: { input: arg({ type: SignInInput }) },
  resolve: (_root, { input }, context) => context.models.user.signIn(input),
});

export const SetUserThemeInput = inputObjectType({
  name: 'SetUserThemeInput',
  definition(t) {
    t.string('name');
  },
});

export const SetUserThemePayload = objectType({
  nonNullDefaults: { output: false },
  name: 'SetUserThemePayload',
  definition(t) {
    t.field('user', { type: User });
  },
});

export const setUserTheme = mutationField('setUserTheme', {
  type: SetUserThemePayload,
  args: { input: arg({ type: SetUserThemeInput }) },
  resolve: (_root, { input }, context) =>
    context.models.user.setTheme(input.name || ''),
});
