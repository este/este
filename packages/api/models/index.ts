import { Prisma } from '../../../prisma/generated/prisma-client';
import { User } from '../types';
import createPermissions from './createPermissions';

import userModel from './userModel';
import webModel from './webModel';

export const createModels = (db: Prisma, user: User | null) => {
  const permissions = createPermissions(user);
  const input = {
    hasError(errors: {}) {
      return Object.values(errors).some(error => error != null);
    },
  };
  const modelContext = { db, input, permissions };

  return {
    user: userModel(modelContext),
    web: webModel(modelContext),
  };
};

export type Models = ReturnType<typeof createModels>;

export interface ModelContext {
  db: Prisma;
  input: {
    hasError: (errors: {}) => boolean;
  };
  permissions: ReturnType<typeof createPermissions>;
}
