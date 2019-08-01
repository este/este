import {
  objectType,
  inputObjectType,
  arg,
  subscriptionField,
  idArg,
} from 'nexus';
import { prismaObjectType, prismaExtendType } from 'nexus-prisma';

import { NexusGenAllTypes } from '../generated/nexus';

export const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields([
      'id',
      'createdAt',
      'updatedAt',
      'email',
      'themeName',
      'team',
    ]);
    t.field('tadas', {
      type: 'TadaConnection',
      args: {
        first: arg({ type: 'Int' }),
        skip: arg({ type: 'Int', nullable: true }),
      },
      resolve: (user, args, context) =>
        context.models.user.tadas({ userId: user.id, ...args }),
    });
    t.field('teamates', {
      type: 'UserConnection',
      args: { first: arg({ type: 'Int' }) },
      resolve: (user, _args, context) => context.models.user.teamates(user.id),
    });
  },
});

// https://medium.com/workflowgen/graphql-schema-design-the-viewer-field-aeabfacffe72
export const viewer = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.field('viewer', {
      type: User,
      nullable: true,
      resolve: (_root, _args, context) => context.models.user.viewer(),
    });
  },
});

export const user = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: User,
      args: { id: idArg() },
      nullable: true,
      resolve: (_root, { id }, context) => context.models.user.byId(id),
    });
  },
});

// requiredViewer throws, so the app can redirect.
export const requiredViewer = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.field('requiredViewer', {
      type: User,
      nullable: true,
      resolve: (_root, _args, context) => context.models.user.requiredViewer(),
    });
  },
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

export const signIn = prismaExtendType({
  type: 'Mutation',
  definition(t) {
    t.field('signIn', {
      type: SignInPayload,
      args: { input: arg({ type: SignInInput }) },
      resolve: (_root, { input }, context) => context.models.user.signIn(input),
    });
  },
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

export const setUserTheme = prismaExtendType({
  type: 'Mutation',
  definition(t) {
    t.field('setUserTheme', {
      type: SetUserThemePayload,
      args: { input: arg({ type: SetUserThemeInput }) },
      resolve: (_root, { input }, context) =>
        context.models.user.setTheme(input.name || ''),
    });
  },
});

// TODO: This is a workaround because Relay is not ok to have Tada and TadaPreviousValues with same id
export const UserTadaSubscriptionPayload = prismaObjectType({
  name: 'TadaSubscriptionPayload',
  definition(t) {
    t.prismaFields(['mutation', 'node', 'updatedFields', 'previousValues']);
    t.field('previousValuesAsTada', {
      nullable: true,
      type: 'Tada',
      resolve: (_parent, _args, _context) => {
        return _parent.previousValues as any; // Fix type missmatch
      },
    });
  },
});

export const ViewerAccessibleTadaUpdatedSubscription = subscriptionField(
  'viewerAccessibleTadaUpdated',
  {
    type: UserTadaSubscriptionPayload, // Use prisma's subscription type as output
    subscribe(_root, _args, context) {
      return context.models.user.$subscribeViewerAccessibleTadaUpdate();
    },
    resolve(payload) {
      return payload;
    },
  },
);

export const userTadasConnection = subscriptionField('userTadasConnection', {
  type: 'TadaConnection', // Use prisma's subscription type as output
  args: {
    filters: arg({ type: 'PageSubcriptionFilters' }),
  },
  subscribe(
    _root,
    args: { filters: NexusGenAllTypes['PageSubcriptionFilters'] },
    context,
  ) {
    return context.models.user.$subscribeUserTadaCreateAndDelete(args.filters);
  },
  resolve(
    payload,
    args: { filters: NexusGenAllTypes['PageSubcriptionFilters'] },
    context,
  ) {
    console.log({ payload, args });
    return context.models.user.tadas({
      userId: args.filters.rootDataId,
      ...args.filters,
    });
  },
});
