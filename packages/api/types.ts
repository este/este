import { Models } from './models';

export type EmailError = 'REQUIRED' | 'EMAIL' | 'ALREADY_EXISTS' | 'NOT_EXISTS';
export type PasswordError =
  | 'REQUIRED'
  | 'MIN_5_CHARS'
  | 'MAX_1024_CHARS'
  | 'WRONG_PASSWORD';
export type Max140CharsError = 'REQUIRED' | 'MAX_140_CHARS';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  themeName: string;
  webs: Web[];
}

export interface Web {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  creator: User;
}

export interface SignInInput {
  email: string;
  password: string;
  createAccount: boolean;
}

export interface SignInErrors {
  email: EmailError | null;
  password: PasswordError | null;
}

export interface SignInPayload {
  errors: SignInErrors | null;
  token: string | null;
}

export interface SetUserThemeInput {
  name: string;
}

export interface SetUserThemePayload {
  user: User | null;
}

export interface CreateWebInput {
  name: string;
}

export interface CreateWebErrors {
  name: Max140CharsError | null;
}

export interface CreateWebPayload {
  errors: CreateWebErrors | null;
  web: Web | null;
}

export interface UpdateWebInput {
  id: string;
  name: string;
}

export interface UpdateWebErrors {
  name: Max140CharsError | null;
}

export interface UpdateWebPayload {
  errors: UpdateWebErrors | null;
  web: Web | null;
}

export interface DeleteWebInput {
  id: string;
}

export interface DeleteWebPayload {
  web: Web | null;
}

export interface Context {
  models: Models;
}
