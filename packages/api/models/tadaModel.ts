import {
  validateCreateTada,
  validateUpdateTada,
} from '../validators/validateTada';
import { ModelContext } from './index';
import { NexusGenAllTypes } from '../generated/nexus';

// Fetch tada with creator eagerly, because of permissions.
// $fragment is workaround.
// https://github.com/prisma/prisma/issues/3668
export const tadaWithCreatorFragment = `
  fragment TadaWithCreator on Tada {
    id
    createdAt
    updatedAt
    name
    description
    creator {
      id
      createdAt
      updatedAt
      email
      themeName
    }
  }
`;

export const tadaConnectionWithCreatorFragment = `
  fragment TadaConnectionWithCreator on TadaConnection {
   pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
   edges {
     cursor
     node {
        id
        createdAt
        updatedAt
        name
        description
        creator {
          id
          createdAt
          updatedAt
          email
          themeName
        }
     }
   }
  }
`;

export const tadaModel = (context: ModelContext) => {
  const byId = async (id: string) => {
    const tada = await context.prisma
      .tada({ id })
      .$fragment<NexusGenAllTypes['Tada']>(tadaWithCreatorFragment);
    context.permissions.exists(tada);
    // We don't need additional checks. It's covered by get.
    return tada;
  };

  const get = (tada: NexusGenAllTypes['Tada']) => {
    // This is required. Tada can be resolved from any other resolver.
    // TODO: Restore right checks
    // context.permissions.isTadaCreatorOrAdmin(tada);
    return tada;
  };

  const createTada = async (input: NexusGenAllTypes['TadaCreateInput']) => {
    const viewer = context.permissions.isAuthenticated();
    const errors = validateCreateTada(input);
    if (context.input.hasError(errors)) return { errors, tada: null };
    // Dont return the tada, we subscribed to creation
    await context.prisma
      .createTada({
        ...input,
        creator: { connect: { id: viewer.id } },
      })
      .$fragment<NexusGenAllTypes['Tada']>(tadaWithCreatorFragment);

    return { tada: null, errors: null };
  };

  const updateTada = async (input: NexusGenAllTypes['TadaUpdateInput']) => {
    const { id, ...fields } = input;
    context.permissions.isTadaCreatorOrAdmin(await byId(id));
    const errors = validateUpdateTada(fields);
    if (context.input.hasError(errors)) return { errors, tada: null };
    const updatedTada = await context.prisma
      .updateTada({
        data: fields,
        where: { id },
      })
      .$fragment<NexusGenAllTypes['Tada']>(tadaWithCreatorFragment);

    return { tada: updatedTada, errors: null };
  };

  const deleteTada = async ({ id }: NexusGenAllTypes['TadaDeleteInput']) => {
    const tada = await byId(id);
    context.permissions.isTadaCreatorOrAdmin(tada);
    await context.prisma.deleteTada({ id });
    return { tada };
  };

  return {
    byId,
    createTada,
    deleteTada,
    get,
    updateTada,
  };
};
