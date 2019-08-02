import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server';
import { NexusGenAllTypes } from '../generated/nexus';

// https://graphql.org/learn/authorization/
// https://www.apollographql.com/docs/apollo-server/features/authentication.html

class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOTFOUND');
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

// Remember to update handleApiGraphQLError.ts.
export const createPermissions = (user: NexusGenAllTypes['User'] | null) => {
  const isAuthenticated = (userId?: string): NexusGenAllTypes['User'] => {
    if (user == null || (userId != null && user.id !== userId)) {
      throw new AuthenticationError('you must be logged in');
    }
    return user;
  };

  const isTadaCreatorOrAdmin = (tada: NexusGenAllTypes['Tada']) => {
    const viewer = isAuthenticated();
    // TODO: if (viewer.isAdmin) return;
    if (viewer.id === tada.creator.id) return;

    throw new ForbiddenError('you must be tada creator or admin');
  };

  const isTeammate = (user: NexusGenAllTypes['User'], teamId: string) => {
    if (user.team.id === teamId) return;

    throw new ForbiddenError('the user must be part of your team');
  };

  const exists = (object: any) => {
    // Use this check sparingly! Only when we know an item does not exists.
    // https://graphql.org/learn/best-practices/#nullability
    if (object == null) throw new NotFoundError('this item could not be found');
  };

  return {
    exists,
    isAuthenticated,
    isTadaCreatorOrAdmin,
    isTeammate,
  };
};
