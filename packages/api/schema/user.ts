import { objectType, inputObjectType } from 'nexus';

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

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
    t.boolean('createAccount', { required: true });
  },
});

export const SignInErrors = objectType({
  name: 'SignInErrors',
  definition(t) {
    t.field('email', { type: 'EmailError', nullable: true });
    t.field('password', { type: 'PasswordError', nullable: true });
  },
});

export const SignInPayload = objectType({
  name: 'SignInPayload',
  definition(t) {
    t.field('errors', { type: SignInErrors, nullable: true });
    t.string('token', { nullable: true });
  },
});

export const SetUserThemeInput = inputObjectType({
  name: 'SetUserThemeInput',
  definition(t) {
    t.string('name', { required: true });
  },
});

export const SetUserThemePayload = objectType({
  name: 'SetUserThemePayload',
  definition(t) {
    t.field('user', { type: 'User', nullable: true });
  },
});
