import { validateCreateWeb } from '../validators/validateCreateWeb';
import { ModelContext } from './index';
import { NexusGenAllTypes } from '../typegen';

// Fetch web with creator eagerly, because of permissions.
// $fragment is workaround.
// https://github.com/prisma/prisma/issues/3668
const webWithCreatorFragment = `
  fragment WebWithCreator on Web {
    id
    createdAt
    updatedAt
    name
    creator {
      id
      createdAt
      updatedAt
      email
      themeName
    }
  }
`;

export const webModel = (context: ModelContext) => {
  const byId = async (id: string) => {
    const web = await context.prisma
      .web({ id })
      .$fragment<NexusGenAllTypes['Web']>(webWithCreatorFragment);
    context.permissions.exists(web);
    // We don't need additional checks. It's covered by get.
    return web;
  };

  const get = (web: NexusGenAllTypes['Web']) => {
    // This is required. Web can be resolved from any other resolver.
    context.permissions.isWebCreatorOrAdmin(web);
    return web;
  };

  const createWeb = async (input: NexusGenAllTypes['CreateWebInput']) => {
    const viewer = context.permissions.isAuthenticated();
    const errors = validateCreateWeb(input);
    if (context.input.hasError(errors)) return { errors, web: null };
    const web = await context.prisma
      .createWeb({ ...input, creator: { connect: { id: viewer.id } } })
      .$fragment<NexusGenAllTypes['Web']>(webWithCreatorFragment);
    return { web, errors: null };
  };

  const updateWeb = async (input: NexusGenAllTypes['UpdateWebInput']) => {
    const { id, ...fields } = input;
    context.permissions.isWebCreatorOrAdmin(await byId(id));
    const errors = validateCreateWeb(fields);
    if (context.input.hasError(errors)) return { errors, web: null };
    const updatedWeb = await context.prisma
      .updateWeb({ data: fields, where: { id } })
      .$fragment<NexusGenAllTypes['Web']>(webWithCreatorFragment);
    return { web: updatedWeb, errors: null };
  };

  const deleteWeb = async ({ id }: NexusGenAllTypes['DeleteWebInput']) => {
    const web = await byId(id);
    context.permissions.isWebCreatorOrAdmin(web);
    await context.prisma.deleteWeb({ id });
    return { web };
  };

  return {
    byId,
    createWeb,
    deleteWeb,
    get,
    updateWeb,
  };
};
