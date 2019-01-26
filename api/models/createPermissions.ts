import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server';
import { User, Web } from '../types';

// https://graphql.org/learn/authorization/
// https://www.apollographql.com/docs/apollo-server/features/authentication.html

class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOTFOUND');
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
// Remember to update handleApiGraphQLError.ts.
const createPermissions = (user: User | null) => {
  const isAuthenticated = (userId?: string): User => {
    if (user == null || (userId != null && userId !== user.id))
      throw new AuthenticationError('you must be logged in');
    return user;
  };
  const isWebCreatorOrAdmin = (web: Web) => {
    const viewer = isAuthenticated();
    // TODO: if (viewer.isAdmin) return;
    if (web.creator.id === viewer.id) return;
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

export default createPermissions;
