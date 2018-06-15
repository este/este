// @flow
import * as validate from './validate.mjs';
/*::
import * as generated from './__generated__/api.graphql'
import type { Resolver } from './index'
*/

const page /*: Resolver<{ pageId: generated.ID_Output }> */ = async (
  parent,
  args,
  context,
  info,
) => {
  const userId = context.getUserId();
  const pageExists = await context.db.exists.Page({
    id: args.pageId,
    creator: { id: userId },
  });
  if (!pageExists) context.throwHttpStatus(403);
  const page = await context.db.query.page(
    { where: { id: args.pageId } },
    info,
  );
  return page;
};

// const setPageTitle /*: Resolver<
//   generated.SetPageTitleInput,
//   any
//   // Promise<{page: generated.SetPageTitlePayload}>,
// > */ = async (
//   parent,
//   args,
//   context,
//   info,
// ) => {
//   const userId = context.getUserId();
//   const pageExists = await context.db.exists.Page({
//     id: args.id,
//     creator: { id: userId },
//   });
//   if (!pageExists) context.throwHttpStatus(403);
//   const page = await context.db.mutation.updatePage(
//     { where: { id: args.id }, data: { title: args.title } },
//     info,
//   );
//   return page;
//   // type SetPageTitlePayload {
//   //   page: Page
//   // }
// };

export default {
  // mutations: { setPageTitle },
  queries: { page },
};
