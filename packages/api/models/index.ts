import { Prisma } from '../../../prisma/generated/prisma-client';
import { createPermissions } from './createPermissions';
import { NexusGenAllTypes } from '../generated/nexus';

import { userModel } from './userModel';
import { tadaModel } from './tadaModel';

export const createModels = (
  prisma: Prisma,
  user: NexusGenAllTypes['User'] | null,
  host: string,
) => {
  const permissions = createPermissions(user);
  const input = {
    hasError(errors: {}) {
      return Object.values(errors).some(error => error != null);
    },
  };
  const modelContext = { prisma, input, permissions, host };

  return {
    user: userModel(modelContext),
    tada: tadaModel(modelContext),
  };
};

export type Models = ReturnType<typeof createModels>;

export interface ModelContext {
  prisma: Prisma;
  input: {
    hasError: (errors: {}) => boolean;
  };
  permissions: ReturnType<typeof createPermissions>;
  host: string;
}
