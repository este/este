import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '../../prisma/generated/prisma-client';
import { NexusGenFieldTypes } from './typegen';
import { JsonWebTokenPayload } from './models/userModel';

export const getUser = async (
  apiSecret: string,
  prisma: Prisma,
  req: IncomingMessage,
): Promise<NexusGenFieldTypes['User'] | null> => {
  const { authorization } = req.headers;
  if (authorization == null) return null;
  const token = authorization.replace('Bearer ', '');

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

  const user = await prisma.user({ id: decoded.userId });
  if (user == null) return null;

  // Do not fetch user webs, we don't need it. getUser is used only for auth.
  return { ...user, webs: [] };
};
