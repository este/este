/* @flow */

// Algebraic types are composable, so it makes sense to have them at one place.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// Exact is a temp workaround until native exact type will fix spread and intersection.
// flowtype.org/docs/objects.html#exact-object-types
// github.com/facebook/flow/issues/2405#issuecomment-256339492
// github.com/facebook/flow/issues/2626
export type Exact<T> = T & $Shape<T>;

// Core

export type Deps = Exact<{
  FBSDK: any,
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: any,
  getState: () => Object,
  getUid: () => string,
  now: () => number,
  validate: (json: Object) => any,
}>;

// Models

export type Todo = Exact<{
  completed: boolean,
  createdAt: number,
  id: string,
  title: string,
}>;

export type User = Exact<{
  displayName: string,
  email: ?string,
  id: string,
  photoURL: ?string,
}>;

// Reducers

export type AppState = Exact<{
  error: ?Error,
  menuShown: boolean,
  online: boolean,
  started: boolean,
}>;

export type AuthState = Exact<{
  formDisabled: boolean,
  error: ?Error,
}>;

export type ConfigState = Exact<{
  appName: string,
  appVersion: string,
  firebase: ?Object,
  sentryUrl: string,
}>;

export type DeviceState = Exact<{
  host: string,
  isReactNative: boolean,
  platform: string,
}>;

export type IntlState = Exact<{
  currentLocale: ?string,
  defaultLocale: ?string,
  initialNow: ?number,
  locales: ?Array<string>,
  messages: ?Object,
}>;

export type ThemeState = Exact<{
  currentTheme: ?string,
}>;

export type TodosState = Exact<{
  all: {[id: string]: Todo},
}>;

export type UsersState = Exact<{
  online: ?Array<User>,
  viewer: ?User,
}>;

// State

export type State = Exact<{
  app: AppState,
  auth: AuthState,
  config: ConfigState,
  device: DeviceState,
  fields: any,
  intl: IntlState,
  themes: ThemeState,
  todos: TodosState,
  users: UsersState,
}>;

// Actions

export type Action =
    { type: 'APP_ERROR', payload: { error: Error } }
  | { type: 'ADD_HUNDRED_TODOS', payload: { todos: Array<Todo> } }
  | { type: 'ADD_TODO', payload: { todo: Todo } }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  | { type: 'CLEAR_ALL_COMPLETED_TODOS' }
  | { type: 'CLEAR_ALL_TODOS' }
  | { type: 'DELETE_TODO', payload: { id: string } }
  | { type: 'ON_AUTH', payload: { firebaseUser: ?Object } }
  | { type: 'ON_USERS_PRESENCE', payload: { presence: Object } }
  | { type: 'RESET_PASSWORD', payload: { email: string } }
  | { type: 'SAVE_USER_DONE' }
  | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_THEME', payload: { theme: string } }
  | { type: 'SIGN_IN', payload: { providerName: string, options?: Object } }
  | { type: 'SIGN_IN_DONE', payload: { user: ?User } }
  | { type: 'SIGN_IN_FAIL', payload: { error: Error } }
  | { type: 'SIGN_OUT' }
  | { type: 'SIGN_UP', payload: { providerName: string, options?: Object } }
  | { type: 'SIGN_UP_DONE', payload: { user: ?User } }
  | { type: 'SIGN_UP_FAIL', payload: { error: Error } }
  | { type: 'TOGGLE_TODO_COMPLETED', payload: { todo: Todo } }
  ;
