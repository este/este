// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import * as validations from '../../../validations';
import type { Mutation as MutationType } from '../__generated__/api.graphql';

const Mutation: MutationType = {
  auth: async (args, info, { db }) => {
    // Email and password must be trimmed before the validation.
    // This is the pattern. Trim what must be stored trimmed.
    const input = {
      // Note we can't use object spread because of Webpack 3
      isSignUp: args.input.isSignUp,
      email: args.input.email.trim(),
      password: args.input.password.trim(),
    };
    const errors = validations.validateAuth(input);
    if (errors) return { errors };
    const createAuthPayload = user => ({
      token: jsonwebtoken.sign(
        { userId: user.id },
        process.env.API_SECRET || '',
      ),
    });
    if (input.isSignUp) {
      const exists = await db.exists.User({ email: input.email });
      if (exists)
        return {
          errors: {
            email: 'ALREADY_EXISTS',
          },
        };
      const password = await bcrypt.hash(input.password, 10);
      const user = await db.mutation.createUser({
        data: { email: input.email, password },
      });
      return createAuthPayload(user);
    }
    const user = await db.query.user({
      where: { email: input.email },
    });
    if (!user)
      return {
        errors: { email: 'NOT_EXISTS' },
      };
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid)
      return {
        errors: { password: 'WRONG_PASSWORD' },
      };
    return createAuthPayload(user);
  },

  // Note the resolver is as minimal as possible. No userId? Return null. Easy.
  // Permissions are defined in server/api/permissions by graphql-shield.
  createWeb: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    const errors = validations.validateCreateWeb(args.input);
    if (errors) return { errors };

    const page = await db.mutation.createPage({
      data: {
        title: args.input.pageTitle,
        creator: { connect: { id: userId } },
        web: {
          create: {
            name: args.input.name,
            creator: { connect: { id: userId } },
          },
        },
      },
    });

    return {
      pageId: page.id,
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
    const errors = validations.validateSetPageTitle(args.input);
    if (errors) return { errors };
    const page = await db.mutation.updatePage({
      where: { id: args.input.id },
      data: { title: args.input.title },
    });
    if (page == null) return null;
    return { page };
  },

  setWebName: async (args, info, { db }) => {
    const errors = validations.validateSetWebName(args.input);
    if (errors) return { errors };
    const web = await db.mutation.updateWeb({
      where: { id: args.input.id },
      data: { name: args.input.name },
    });
    if (web == null) return null;
    return { web };
  },

  setPageContent: async (args, info, { db }) => {
    // TODO: Add validateSetPageContent. Prisma allows 256kB and we should
    // return error for that.
    const page = await db.mutation.updatePage({
      where: { id: args.input.id },
      data: { content: args.input.content },
    });
    if (page == null) return null;
    return { page };
  },

  deletePage: async (args, info, { db }) => {
    const page = await db.mutation.deletePage({
      where: { id: args.input.id },
    });
    if (page == null) return null;
    return { page };
  },
};

export default Mutation;
