// @flow
import * as validate from './validate.mjs';

/*::
import type { Resolver } from './index';
*/

// /*::
// import type {
//   editQueryVariables,
//   editQueryResponse,
// } from '../../pages/__generated__/editQuery.graphql.js';
// */

const page /*: Resolver<
  any,
  any,
  // editQueryVariables,
  // editQueryResponse,
  'page',
> */ = async (
  parent,
  { pageId },
  context,
  info,
) => {
  const userId = context.getUserId();
  const pageExists = await context.db.exists.Page({
    id: pageId,
    creator: { id: userId },
  });
  if (!pageExists) context.throwHttpStatus(403);
  return context.db.query.page({ where: { id: pageId } }, info);
};

export default {
  queries: { page },
};
