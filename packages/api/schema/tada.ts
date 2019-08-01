import {
  arg,
  idArg,
  inputObjectType,
  objectType,
  subscriptionField,
} from 'nexus';

import {
  prismaExtendType,
  prismaInputObjectType,
  prismaObjectType,
} from 'nexus-prisma';

export const Tada = prismaObjectType({
  name: 'Tada',
  definition(t) {
    t.prismaFields(['*']);
    // We need to redefine nested fields so there are included in typings
    t.field('creator', {
      nullable: false,
      type: 'User',
    });
  },
});

export const tada = prismaExtendType({
  type: 'Query',
  definition(t) {
    t.field('tada', {
      type: 'Tada',
      args: { id: idArg() },
      nullable: true,
      resolve: (_root, { id }, context) => {
        return context.models.tada.byId(id);
      },
    });
  },
});

export const TadaCreateInput = prismaInputObjectType({
  name: 'TadaCreateInput',
  definition(t) {
    t.prismaFields(['name', 'description']);
  },
});

export const TadaCreateErrors = objectType({
  nonNullDefaults: { output: false },
  name: 'TadaCreateErrors',
  definition(t) {
    t.field('name', { type: 'Max140CharsError' });
  },
});

export const TadaCreatePayload = objectType({
  nonNullDefaults: { output: false },
  name: 'TadaCreatePayload',
  definition(t) {
    t.field('errors', { type: TadaCreateErrors });
    t.field('tada', { type: 'Tada' });
  },
});

export const createTada = prismaExtendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTada', {
      type: TadaCreatePayload,
      args: { input: arg({ type: TadaCreateInput }) },
      resolve: (_root, { input }, context) => {
        return context.models.tada.createTada(input);
      },
    });
  },
});

export const TadaUpdateInput = prismaInputObjectType({
  name: 'TadaUpdateInput',
  definition(t) {
    t.id('id');
    t.prismaFields(['name', 'description']);
  },
});

export const TadaUpdateErrors = objectType({
  nonNullDefaults: { output: false },
  name: 'TadaUpdateErrors',
  definition(t) {
    t.field('name', { type: 'Max140CharsError' });
  },
});

export const TadaUpdatePayload = objectType({
  nonNullDefaults: { output: false },
  name: 'TadaUpdatePayload',
  definition(t) {
    t.field('errors', { type: TadaUpdateErrors });
    t.field('tada', { type: 'Tada' });
  },
});

export const updateTada = prismaExtendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateTada', {
      type: TadaUpdatePayload,
      args: {
        input: arg({ type: TadaUpdateInput }),
      },
      resolve: (_root, { input }, context) => {
        return context.models.tada.updateTada(input);
      },
    });
  },
});

export const TadaDeleteInput = inputObjectType({
  name: 'TadaDeleteInput',
  definition(t) {
    t.id('id');
  },
});

export const TadaDeletePayload = objectType({
  nonNullDefaults: { output: false },
  name: 'TadaDeletePayload',
  definition(t) {
    t.field('tada', { type: 'Tada' });
  },
});

export const deleteTada = prismaExtendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteTada', {
      type: TadaDeletePayload,
      args: {
        input: arg({ type: TadaDeleteInput }),
      },
      resolve: (_root, { input }, context) => {
        return context.models.tada.deleteTada(input);
      },
    });
  },
});
