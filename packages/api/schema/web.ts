import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  idArg,
} from 'nexus';

export const Web = objectType({
  name: 'Web',
  definition(t) {
    t.id('id');
    t.dateTime('createdAt');
    t.dateTime('updatedAt');
    t.string('name');
    t.field('creator', { type: 'User' });
  },
});

export const web = queryField('web', {
  type: Web,
  args: { id: idArg() },
  resolve: (_root, { id }, context) => context.models.web.byId(id),
});

export const CreateWebInput = inputObjectType({
  name: 'CreateWebInput',
  definition(t) {
    t.string('name');
  },
});

export const CreateWebErrors = objectType({
  nonNullDefaults: { output: false },
  name: 'CreateWebErrors',
  definition(t) {
    t.field('name', { type: 'Max140CharsError' });
  },
});

export const CreateWebPayload = objectType({
  nonNullDefaults: { output: false },
  name: 'CreateWebPayload',
  definition(t) {
    t.field('errors', { type: CreateWebErrors });
    t.field('web', { type: Web });
  },
});

export const createWeb = mutationField('createWeb', {
  type: CreateWebPayload,
  args: { input: arg({ type: CreateWebInput }) },
  resolve: (_root, { input }, context) => context.models.web.createWeb(input),
});

export const UpdateWebInput = inputObjectType({
  name: 'UpdateWebInput',
  definition(t) {
    t.id('id');
    t.string('name');
  },
});

export const UpdateWebErrors = objectType({
  nonNullDefaults: { output: false },
  name: 'UpdateWebErrors',
  definition(t) {
    t.field('name', { type: 'Max140CharsError' });
  },
});

export const UpdateWebPayload = objectType({
  nonNullDefaults: { output: false },
  name: 'UpdateWebPayload',
  definition(t) {
    t.field('errors', { type: UpdateWebErrors });
    t.field('web', { type: Web });
  },
});

export const updateWeb = mutationField('updateWeb', {
  type: UpdateWebPayload,
  args: { input: arg({ type: UpdateWebInput }) },
  resolve: (_root, { input }, context) => context.models.web.updateWeb(input),
});

export const DeleteWebInput = inputObjectType({
  name: 'DeleteWebInput',
  definition(t) {
    t.id('id');
  },
});

export const DeleteWebPayload = objectType({
  nonNullDefaults: { output: false },
  name: 'DeleteWebPayload',
  definition(t) {
    t.field('web', { type: Web });
  },
});

export const deleteWeb = mutationField('deleteWeb', {
  type: DeleteWebPayload,
  args: { input: arg({ type: DeleteWebInput }) },
  resolve: (_root, { input }, context) => context.models.web.deleteWeb(input),
});
