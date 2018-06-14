// @flow
import * as validate from './validate.mjs';
/*::
import * as generated from './__generated__/types'
import type { Resolver } from './index'
*/

const page /*: Resolver<
  { pageId: generated.ID_Output },
  generated.Page,
> */ = async (
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
  // $FlowFixMe I don't know yet.
  return page;
};

export default {
  queries: { page },
};
