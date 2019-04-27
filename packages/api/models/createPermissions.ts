import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-micro';
import { NexusGenAllTypes } from '../typegen';

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
    if (user == null || (userId != null && user.id !== userId))
      throw new AuthenticationError('you must be logged in');
    return user;
  };

  const isWebCreatorOrAdmin = (web: NexusGenAllTypes['Web']) => {
    const viewer = isAuthenticated();
    // TODO: if (viewer.isAdmin) return;
    if (viewer.id === web.creator.id) return;
    throw new ForbiddenError('you must be web creator or admin');
  };

  const exists = (object: any) => {
    // Use this check sparingly! Only when we know an item does not exists.
    // https://graphql.org/learn/best-practices/#nullability
    if (object == null) throw new NotFoundError('this item could not be found');
  };

  return {
    exists,
    isAuthenticated,
    isWebCreatorOrAdmin,
  };
};
