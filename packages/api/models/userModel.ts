import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignInErrors, SignInInput, Web } from '../types';
import validateSignIn from '../validators/validateSignIn';
import { ModelContext } from './index';

export interface JsonWebTokenPayload {
  userId: string;
}

const userModel = (ctx: ModelContext) => {
  const signIn = async (input: SignInInput) => {
    // TODO: Partial should not be required soon.
    // https://github.com/prisma/prisma/issues/3621.
    const fail = (errors: Partial<SignInErrors>) => ({
      errors: {
        email: null,
        password: null,
        ...errors,
      },
      token: null,
    });
    const success = (userId: string) => {
      const payload: JsonWebTokenPayload = { userId };
      return {
        errors: null,
        token: jwt.sign(payload, process.env.API_SECRET as jwt.Secret),
      };
    };

    const errors = validateSignIn(input);
    if (ctx.input.hasError(errors)) return fail(errors);

    if (input.createAccount) {
      const exists = await ctx.db.$exists.user({ email: input.email });
      if (exists) return fail({ email: 'ALREADY_EXISTS' });
      const password = await bcrypt.hash(input.password, 10);
      const user = await ctx.db.createUser({
        email: input.email,
        password,
        themeName: '',
      });
      return success(user.id);
    } else {
      const user = await ctx.db.user({ email: input.email });
      if (!user) return fail({ email: 'NOT_EXISTS' });
      const validPassword = await bcrypt.compare(input.password, user.password);
      if (!validPassword) return fail({ password: 'WRONG_PASSWORD' });
      return success(user.id);
    }
  };

  const requiredViewer = () => {
    return ctx.permissions.isAuthenticated();
  };

  const viewer = () => {
    let user = null;
    try {
      user = ctx.permissions.isAuthenticated();
    } catch (error) {
      if (error.name === 'AuthenticationError') return null;
      throw error;
    }
    return user;
  };

  const setTheme = async (name: string) => {
    const viewer = ctx.permissions.isAuthenticated();
    const user = await ctx.db.updateUser({
      data: { themeName: name },
      where: { id: viewer.id },
    });
    const userWithWebs = { ...user, webs: [] };
    return { user: userWithWebs };
  };

  const webs = async (userId: string) => {
    const viewer = ctx.permissions.isAuthenticated(userId);
    const fragment = `
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
    return ctx.db
      .user({ id: viewer.id })
      .webs({ orderBy: 'createdAt_DESC' })
      .$fragment<Web[]>(fragment);
  };

  return {
    requiredViewer,
    setTheme,
    signIn,
    viewer,
    webs,
  };
};

export default userModel;
