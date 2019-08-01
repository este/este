import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { validateSignIn } from '../validators/validateSignIn';
import { ModelContext } from './index';
import { NexusGenAllTypes } from '../generated/nexus';
import { tadaConnectionWithCreatorFragment } from './tadaModel';

export const userWithTeamFragment = `
  fragment UserWithTeam on User {
    id
    createdAt
    updatedAt
    email
    themeName
    team {
      id
      name
      description
    }
  }
`;

export interface JsonWebTokenPayload {
  userId: string;
}

const { API_SECRET } = process.env;

export const userModel = (context: ModelContext) => {
  const byId = async (id: string) => {
    const user = await context.prisma
      .user({ id })
      .$fragment<NexusGenAllTypes['User']>(userWithTeamFragment);
    context.permissions.exists(user);
    // We don't need additional checks. It's covered by get.
    return user;
  };

  const get = async (user: NexusGenAllTypes['User']) => {
    // This is required. User can be resolved from any other resolver.
    // If you are teamate you can read user tadas
    await teamates(user.id);
    return user;
  };

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
    const userWithTadas = { ...user, tadas: [] };
    return { user: userWithTadas };
  };

  const teamates = async (userId?: string) => {
    const viewer = context.permissions.isAuthenticated();
    const user = userId && (await byId(userId));

    userId && user.team && context.permissions.isTeamate(viewer, user.team.id);

    const team = await context.prisma.usersConnection({
      orderBy: 'createdAt_DESC',
      where: {
        team: { id: userId && user.team ? user.team.id : viewer.team.id },
      },
    });

    return team;
  };

  const tadas = async ({
    userId,
    first,
    skip,
  }: {
    userId: string;
    first: number;
    skip?: number;
  }) => {
    console.log({ userId, first, skip });
    // If you are teamate you can read user tadas
    await teamates(userId);

    return context.prisma
      .tadasConnection({
        first,
        skip,
        where: { creator: { id: userId } },
        orderBy: 'createdAt_DESC',
      })
      .$fragment<NexusGenAllTypes['Tada']>(tadaConnectionWithCreatorFragment);
  };

  const $subscribeViewerAccessibleTadaUpdate = async () => {
    // If you are teamate you can read user tadas
    const team = await teamates();

    return context.prisma.$subscribe.tada({
      mutation_in: 'UPDATED',
      node: { creator: { id_in: team.edges.map(teamate => teamate.node.id) } },
    });
  };

  const $subscribeUserTadaCreateAndDelete = async ({
    rootDataId,
  }: NexusGenAllTypes['PageSubcriptionFilters']) => {
    // If you are teamate you can read user tadas
    await teamates(rootDataId);

    return context.prisma.$subscribe.tada({
      mutation_in: ['CREATED', 'UPDATED', 'DELETED'],
      node: { creator: { id: rootDataId } },
    });
  };

  return {
    $subscribeUserTadaCreateAndDelete,
    $subscribeViewerAccessibleTadaUpdate,
    byId,
    get,
    requiredViewer,
    setTheme,
    signIn,
    tadas,
    teamates,
    viewer,
  };
};
