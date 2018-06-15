// @flow
import * as validate from './validate.mjs';
/*::
import * as generated from './__generated__/api.graphql'
import type { Resolver } from './index'
*/

// TODO: Use it for published webs and pages only I guess.
// import diacriticsMap from 'diacritics-map';
// // node-slug has a security issue
// // https://github.com/dodo/node-slug/pull/91
// const slug = value =>
//   value
//     .trim()
//     .toLowerCase()
//     .split('')
//     .map(char => diacriticsMap[char] || char)
//     .join('')
//     .replace(/[^a-z0-9]/g, '');
//
// const createWebDomainWithTimestamp = name =>
//   `${slug(name)}-${Date.now().toString(36)}`;

export const validateCreateWeb = (input /*: generated.CreateWebInput */) => {
  const name = validate.max140Chars(input.name);
  if (name) return { name };
  const pageTitle = validate.max140Chars(input.pageTitle);
  if (pageTitle) return { pageTitle };
};

const createWeb /*: Resolver<
  { input: generated.CreateWebInput },
  generated.CreateWebPayload,
> */ = async (
  parent,
  args,
  context,
) => {
  const userId = context.getUserId();

  const errors = validateCreateWeb(args.input);
  if (errors) return { errors };

  const web = await context.db.mutation.createWeb(
    {
      data: {
        name: args.input.name,
        creator: { connect: { id: userId } },
        pages: {
          create: {
            title: args.input.pageTitle,
            creator: { connect: { id: userId } },
            element: {
              create: {
                type: 'TEXT',
                creator: { connect: { id: userId } },
              },
            },
          },
        },
      },
    },
    `
      {
        id
        pages {
          id
        }
      }
    `,
  );

  return {
    pageId: web.pages && web.pages[0].id,
  };
};

const deleteWeb /*: Resolver<
  { input: generated.DeleteWebInput },
  generated.DeleteWebPayload,
> */ = async (
  parent,
  args,
  context,
) => {
  const userId = context.getUserId();
  const webExists = await context.db.exists.Web({
    id: args.input.id,
    creator: { id: userId },
  });
  if (!webExists) context.throwHttpStatus(404);
  await context.db.mutation.deleteManyPages({
    where: { web: { id: args.input.id } },
  });
  await context.db.mutation.deleteWeb({ where: { id: args.input.id } });
  return {
    // https://github.com/prismagraphql/prisma-binding/issues/187#issuecomment-397134939
    id: args.input.id.toString(),
  };
};

const webs /*: Resolver<
  { first: generated.Int },
  generated.WebConnection,
> */ = async (
  parent,
  args,
  context,
  info,
) => {
  const userId = context.getUserId();
  const webs = await context.db.query.websConnection(
    {
      where: { creator: { id: userId } },
      orderBy: 'updatedAt_ASC',
      first: args.first,
    },
    info,
  );
  // $FlowFixMe I don't know yet.
  return webs;
};

export default {
  mutations: { createWeb, deleteWeb },
  queries: { webs },
};
