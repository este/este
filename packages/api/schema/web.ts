import { objectType, inputObjectType } from 'nexus';

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

export const CreateWebInput = inputObjectType({
  name: 'CreateWebInput',
  definition(t) {
    // Required, but we can relax it later.
    t.string('name', { required: true });
  },
});

export const CreateWebErrors = objectType({
  name: 'CreateWebErrors',
  definition(t) {
    t.field('name', { type: 'Max140CharsError', nullable: true });
  },
});

export const CreateWebPayload = objectType({
  name: 'CreateWebPayload',
  definition(t) {
    t.field('errors', { type: CreateWebErrors, nullable: true });
    t.field('web', { type: 'Web', nullable: true });
  },
});

export const UpdateWebInput = inputObjectType({
  name: 'UpdateWebInput',
  definition(t) {
    t.id('id', { required: true });
    t.string('name', { required: true });
  },
});

export const UpdateWebErrors = objectType({
  name: 'UpdateWebErrors',
  definition(t) {
    t.field('name', { type: 'Max140CharsError', nullable: true });
  },
});

export const UpdateWebPayload = objectType({
  name: 'UpdateWebPayload',
  definition(t) {
    t.field('errors', { type: UpdateWebErrors, nullable: true });
    t.field('web', { type: 'Web', nullable: true });
  },
});

export const DeleteWebInput = inputObjectType({
  name: 'DeleteWebInput',
  definition(t) {
    t.id('id', { required: true });
  },
});

export const DeleteWebPayload = objectType({
  name: 'DeleteWebPayload',
  definition(t) {
    t.field('web', { type: 'Web', nullable: true });
  },
});
