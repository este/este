import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { validateSignIn } from '../validators/validateSignIn';
import { ModelContext } from './index';
import { NexusGenAllTypes } from '../typegen';

export interface JsonWebTokenPayload {
  userId: string;
}

const { API_SECRET } = process.env;

export const userModel = (context: ModelContext) => {
  const signIn = async (input: NexusGenAllTypes['SignInInput']) => {
    const fail = (errors: NexusGenAllTypes['SignInErrors']) => ({
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
        token: jwt.sign(payload, API_SECRET as jwt.Secret),
      };
    };

    const errors = validateSignIn(input);
    if (context.input.hasError(errors)) return fail(errors);

    if (input.createAccount) {
      const exists = await context.prisma.$exists.user({ email: input.email });
      if (exists) return fail({ email: 'ALREADY_EXISTS' });
      const password = await bcrypt.hash(input.password, 10);
      const user = await context.prisma.createUser({
        email: input.email,
        password,
        themeName: '',
      });
      return success(user.id);
    }
    const user = await context.prisma.user({ email: input.email });
    if (!user) return fail({ email: 'NOT_EXISTS' });
    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) return fail({ password: 'WRONG_PASSWORD' });
    return success(user.id);
  };

  // Throws if viewer is not authenticated.
  const requiredViewer = () => {
    return context.permissions.isAuthenticated();
  };

  // Return null if viewer is not authenticated.
  const viewer = () => {
    let user = null;
    try {
      user = context.permissions.isAuthenticated();
    } catch (error) {
      if (error.name === 'AuthenticationError') return null;
      throw error;
    }
    return user;
  };

  const setTheme = async (name: string) => {
    const viewer = context.permissions.isAuthenticated();
    const user = await context.prisma.updateUser({
      data: { themeName: name },
      where: { id: viewer.id },
    });
    const userWithWebs = { ...user, webs: [] };
    return { user: userWithWebs };
  };

  const webs = async (userId: string) => {
    const viewer = context.permissions.isAuthenticated(userId);
    // $fragment is workaround.
    // https://github.com/prisma/prisma/issues/3668
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
    return context.prisma
      .user({ id: viewer.id })
      .webs({ orderBy: 'createdAt_DESC' })
      .$fragment<NexusGenAllTypes['Web'][]>(fragment);
  };

  return {
    requiredViewer,
    setTheme,
    signIn,
    viewer,
    webs,
  };
};
