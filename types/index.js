// @flow
import type { Observable } from 'rxjs';
import type { Temp } from '../lib/temp';
import type { ValidationError } from '../lib/validate';
import type {
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// Redux state is meant to be immutable.
// https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability

// Use exact object type as much as possible, but not where ... spread is used,
// because Flow doesn't support spread with exact types yet.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types

// I would love to collocate types, for example reducer types, but:
// https://twitter.com/steida/status/888534322613035009

export type Id = string;

export type AppError =
  | { type: 'insufficientStorage', limit: number }
  | { type: 'xhrError' }
  | { type: 'cannotSignInCredentialsInvalid' }
  | { type: 'unknown', message: string };

export type ValidationErrors<T> = { +[key: $Keys<T>]: ValidationError };

export type Errors<T> = {|
  +appError?: AppError,
  +validationErrors?: ValidationErrors<T>,
|};

export type Form<Fields> = {|
  +fields: Fields,
  +disabled: Temp<boolean>,
  +appError: ?AppError,
  +validationErrors: ValidationErrors<Fields>,
|};

export type FormState<Fields> = {|
  +initial: Form<Fields>,
  +changed: { +[id: Id]: Form<Fields> },
|};

export type AppState = {
  +baselineShown: boolean,
  +darkEnabled: boolean,
  +errors: ?Errors<Object>,
  +name: string,
  +version: string,
  +locale: string,
  +defaultLocale: string,
  +supportedLocales: Array<string>,
};

export type AuthFormFields = {|
  +email: string,
  +password: string,
  +signUp: boolean,
|};

export type AuthState = {|
  +form: FormState<AuthFormFields>,
|};

export type PostFormFields = {|
  +text: string,
|};

export type PostsState = {|
  +form: FormState<PostFormFields>,
|};

export type UserGender = 'male' | 'female' | 'other';

export type UserFormFields = {
  +name: string,
  +email: string,
  +likesCats: boolean,
  +likesDogs: boolean,
  +gender: UserGender,
  +gender: ?string,
  +isAnarchist: boolean,
};

export type User = UserFormFields & {
  +id: Id,
  +createdAt: number,
  +updatedAt: number,
};

export type UsersState = {
  +form: FormState<UserFormFields>,
  +local: { +[id: Id]: User },
  +selected: { +[id: Id]: true },
};

export type State = {|
  +apollo: Object,
  +app: AppState,
  +auth: AuthState,
  +posts: PostsState,
  +users: UsersState,
|};

export type ServerState = {|
  +app: AppState,
|};

export type Action =
  | { type: 'AUTH', fields: AuthFormFields }
  | { type: 'AUTH_ERROR', errors: Errors<AuthFormFields> }
  | { type: 'AUTH_SUCCESS' }
  | { type: 'CREATE_10_RANDOM_USERS' }
  | { type: 'CREATE_POST', fields: PostFormFields }
  | { type: 'CREATE_POST_ERROR', errors: Errors<PostFormFields> }
  | { type: 'CREATE_POST_SUCCESS' }
  | { type: 'CREATE_USER', fields: UserFormFields }
  | { type: 'CREATE_USER_ERROR', errors: Errors<UserFormFields> }
  | { type: 'CREATE_USER_SUCCESS', user: User }
  | { type: 'DELETE_SELECTED_USERS' }
  | { type: 'SAVE_USER', user: User }
  | { type: 'SAVE_USER_ERROR', user: User, errors: Errors<UserFormFields> }
  | { type: 'SAVE_USER_SUCCESS', user: User }
  | { type: 'SET_AUTH_FORM', fields: ?AuthFormFields }
  | { type: 'SET_POST_FORM', id?: Id, fields: ?PostFormFields }
  | { type: 'SET_USER_FORM', id?: Id, fields: ?UserFormFields }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' }
  | { type: 'TOGGLE_USERS_SELECTION', users: Array<User> };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

// TODO: Use Relay types once released.
// https://gist.github.com/rosskevin/3025518628b16f80c11a2b7385f56169
export type RelayEnvironment = Object;

export type PlatformDependencies = {|
  createUuid: () => string, // Because React Native needs different lib.
  environment: RelayEnvironment,
|};

export type Dependencies = PlatformDependencies & {
  getState: () => State,
  getNow: () => number,
};

// TODO: There are no redux-observable flow definitions yet. Therefore, we have
// to use .filter instead of .ofType and
// https://github.com/redux-observable/redux-observable/issues/258
export type Epic = (
  actions$: Observable<Action>,
  dependencies: Dependencies,
) => Observable<Action>;

export type FunctionalComponent<P> = (
  props: P,
  context: any,
) => ?React$Element<any>;
