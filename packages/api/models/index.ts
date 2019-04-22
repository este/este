import { Prisma } from '../../../prisma/generated/prisma-client';
import createPermissions from './createPermissions';
import { NexusGenAllTypes } from '../typegen';

import userModel from './userModel';
import webModel from './webModel';

export const createModels = (
  prisma: Prisma,
  user: NexusGenAllTypes['User'] | null,
) => {
  const permissions = createPermissions(user);
  const input = {
    hasError(errors: {}) {
      return Object.values(errors).some(error => error != null);
    },
  };
  const modelContext = { prisma, input, permissions };

  return {
    user: userModel(modelContext),
    web: webModel(modelContext),
  };
};

export type Models = ReturnType<typeof createModels>;

export interface ModelContext {
  prisma: Prisma;
  input: {
    hasError: (errors: {}) => boolean;
  };
  permissions: ReturnType<typeof createPermissions>;
}
