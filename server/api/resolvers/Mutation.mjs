// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import * as validate from '../validations/validate';
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
  auth: async (args, info, { db }) => {
    const errors = validateAuth(args.input);
    if (errors) return { errors };

    const createAuthPayload = user => ({
      token: jsonwebtoken.sign(
        { userId: user.id },
        process.env.API_SECRET || '',
      ),
    });

    if (args.input.isSignUp) {
      const exists = await db.exists.User({ email: args.input.email });
      if (exists)
        return {
          errors: {
            email: 'ALREADY_EXISTS',
          },
        };
      const password = await bcrypt.hash(args.input.password, 10);
      const user = await db.mutation.createUser({
        data: { email: args.input.email, password },
      });
      return createAuthPayload(user);
    } else {
      const user = await db.query.user({
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

  // Note the resolver is as minimal as possible. No userId? Return null. Easy.
  // Permissions are defined in server/api/permissions/index.mjs with
  // graphql-shield, so clients can handle errors properly.
  createWeb: async (args, info, { userId, db }) => {
    if (userId == null) return null;

    const errors = validateCreateWeb(args.input);
    if (errors) return { errors };

    const web = await db.mutation.createWeb(
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

  deleteWeb: async (args, info, { db }) => {
    const web = await db.mutation.deleteWeb({
      where: { id: args.input.id },
    });
    if (web == null) return null;
    return { web };
  },

  setTheme: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    const user = await db.mutation.updateUser({
      data: { themeName: args.input.themeName },
      where: { id: userId },
    });
    if (user == null) return null;
    return { user };
  },

  setPageTitle: async (args, info, { db }) => {
    const page = await db.mutation.updatePage({
      where: { id: args.input.id },
      data: { title: args.input.title },
    });
    if (page == null) return null;
    return { page };
  },
};

export default Mutation;
