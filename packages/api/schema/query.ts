import { queryType, idArg } from 'nexus';

// Queries use ID or Input so non-null is safe for schema evolvement.

export const Query = queryType({
  nonNullDefaults: { input: true },
  definition(t) {
    // https://medium.com/workflowgen/graphql-schema-design-the-viewer-field-aeabfacffe72
    t.field('viewer', {
      type: 'User',
      nullable: true,
      resolve: (_root, _args, context) => context.models.user.viewer(),
    });

    // requiredViewer throws so app can redirect.
    t.field('requiredViewer', {
      type: 'User',
      resolve: (_root, _args, context) => context.models.user.requiredViewer(),
    });

    t.field('web', {
      type: 'Web',
      args: { id: idArg() },
      resolve: (_root, { id }, context) => context.models.web.byId(id),
    });
  },
});
