import * as jwt from 'jsonwebtoken';
import { Prisma } from '../../prisma/generated/prisma-client';
import { NexusGenAllTypes, NexusGenRootTypes } from './generated/nexus';
import { JsonWebTokenPayload } from './models/userModel';
import { userWithTeamFragment } from './models/userModel';

export const getUser = async (
  apiSecret: string,
  prisma: Prisma,
  token: string | null,
): Promise<NexusGenRootTypes['User'] | null> => {
  if (!token) {
    return null;
  }
  let decoded = {};
  try {
    decoded = jwt.verify(token, apiSecret);
  } catch (error) {
    if (error.name !== 'JsonWebTokenError') {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  }

  const hasUserId = (decoded: any): decoded is JsonWebTokenPayload =>
    'userId' in decoded;
  if (!hasUserId(decoded)) return null;

  const user = await prisma
    .user({ id: decoded.userId })
    .$fragment<NexusGenAllTypes['User']>(userWithTeamFragment);
  if (user == null) return null;

  // Do not fetch user tadas, we don't need it. getUser is used only for auth.
  return { ...user, tadas: [] };
};
