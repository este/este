import { Resolvers } from '../generated/graphqlgen';

import { CreateWebErrors } from './CreateWebErrors';
import { CreateWebPayload } from './CreateWebPayload';
import { DeleteWebPayload } from './DeleteWebPayload';
import { Mutation } from './Mutation';
import { Query } from './Query';
import { SetUserThemePayload } from './SetUserThemePayload';
import { SignInErrors } from './SignInErrors';
import { SignInPayload } from './SignInPayload';
import { UpdateWebErrors } from './UpdateWebErrors';
import { UpdateWebPayload } from './UpdateWebPayload';
import { User } from './User';
import { Web } from './Web';

export const resolvers: Resolvers = {
  CreateWebErrors,
  CreateWebPayload,
  DeleteWebPayload,
  Mutation,
  Query,
  SetUserThemePayload,
  SignInErrors,
  SignInPayload,
  UpdateWebErrors,
  UpdateWebPayload,
  User,
  Web,
};
