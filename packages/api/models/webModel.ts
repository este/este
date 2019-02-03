import { CreateWebInput, DeleteWebInput, UpdateWebInput, Web } from '../types';
import validateCreateWeb from '../validators/validateCreateWeb';
import { ModelContext } from './index';

// Fetch web with creator eagerly, because of permissions.
// $fragment is temporary solution.
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

const webModel = (ctx: ModelContext) => {
  const byId = async (id: string) => {
    const web = await ctx.db.web({ id }).$fragment<Web>(webWithCreatorFragment);
    ctx.permissions.exists(web);
    // We don't need additional checks. It's covered by get.
    return web;
  };

  const get = (web: Web) => {
    // This is required. Web can be resolved from any other resolver.
    ctx.permissions.isWebCreatorOrAdmin(web);
    return web;
  };

  const createWeb = async (input: CreateWebInput) => {
    const viewer = ctx.permissions.isAuthenticated();
    const errors = validateCreateWeb(input);
    if (ctx.input.hasError(errors)) return { errors, web: null };
    const web = await ctx.db
      .createWeb({ ...input, creator: { connect: { id: viewer.id } } })
      .$fragment<Web>(webWithCreatorFragment);
    return { web, errors: null };
  };

  const updateWeb = async (input: UpdateWebInput) => {
    const { id, ...fields } = input;
    ctx.permissions.isWebCreatorOrAdmin(await byId(id));
    const errors = validateCreateWeb(fields);
    if (ctx.input.hasError(errors)) return { errors, web: null };
    const updatedWeb = await ctx.db
      .updateWeb({ data: fields, where: { id } })
      .$fragment<Web>(webWithCreatorFragment);
    return { web: updatedWeb, errors: null };
  };

  const deleteWeb = async ({ id }: DeleteWebInput) => {
    const web = await byId(id);
    ctx.permissions.isWebCreatorOrAdmin(web);
    await ctx.db.deleteWeb({ id });
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

export default webModel;
