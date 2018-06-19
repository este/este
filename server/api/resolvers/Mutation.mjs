// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import * as validate from '../validations/validate.mjs';
/*::
import * as generated from '../__generated__/api.graphql'
*/

export const validateAuth = (input /*: generated.AuthInput */) => {
  const email = validate.email(input.email);
  if (email) return { email };
  const password = validate.max1024Min5Chars(input.password);
  if (password) return { password };
};

export const validateCreateWeb = (input /*: generated.CreateWebInput */) => {
  const name = validate.max140Chars(input.name);
  if (name) return { name };
  const pageTitle = validate.max140Chars(input.pageTitle);
  if (pageTitle) return { pageTitle };
};

const Mutation /*: generated.Mutation */ = {
  auth: async (args, info, context) => {
    const errors = validateAuth(args.input);
    if (errors) return { errors };

    const createAuthPayload = user => ({
      token: jsonwebtoken.sign(
        { userId: user.id },
        process.env.API_SECRET || '',
      ),
    });

    if (args.input.isSignUp) {
      const exists = await context.db.exists.User({ email: args.input.email });
      if (exists)
        return {
          errors: {
            email: 'ALREADY_EXISTS',
          },
        };
      const password = await bcrypt.hash(args.input.password, 10);
      const user = await context.db.mutation.createUser({
        data: { email: args.input.email, password },
      });
      return createAuthPayload(user);
    } else {
      const user = await context.db.query.user({
        where: { email: args.input.email },
      });
      if (!user)
        return {
          errors: { email: 'NOT_EXISTS' },
        };
      const valid = await bcrypt.compare(args.input.password, user.password);
      if (!valid)
        return {
          errors: { password: 'WRONG_PASSWORD' },
        };
      return createAuthPayload(user);
    }
  },

  createWeb: async (args, info, context) => {
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
  },

  deleteWeb: async (args, info, context) => {
    const web = await context.db.mutation.deleteWeb({
      where: { id: args.input.id },
    });
    // TODO: Return web.
    return { id: args.input.id.toString() };
  },

  setTheme: async (args, info, context) => {
    const userId = context.getUserId();
    const user = await context.db.mutation.updateUser({
      data: { themeName: args.input.themeName },
      where: { id: userId },
    });
    // Cannot call await with `context.db.mutation.updateUser(...)` bound to `p` because:
    // - Either cannot assign object literal to `Mutation` because inexact `Promise` [1] is incompatible with exact `User` [2] in property `user` of type argument `R` [3] of the return value of property `setTheme`.
    // $FlowFixMe Probably wrong type generation. I don't know.
    return { user };
  },

  setPageTitle: async (args, info, context) => {
    const page = await context.db.mutation.updatePage({
      where: { id: args.input.id },
      data: { title: args.input.title },
    });
    // $FlowFixMe Probably wrong type generation. I don't know.
    return { page };
  },
};

export default Mutation;
