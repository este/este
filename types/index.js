// @flow
import type {
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';
import type { Observable } from 'rxjs';

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types/
// Redux state is meant to be immutable.
// https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability
// TODO: Exact state, once Flow fixes spread on exact types.

export type FunctionalComponent<P> = (props: P) => ?React$Element<any>;

export type Form<T> = {
  +initialState: T,
  +changedState: { +[id: Id]: T },
};

// '' is used for not yet created objects, for example in create Foo form.
export type Id = string;

export type UserForm = {
  +name: string,
  +description: string,
  +likesCats: boolean,
  +likesDogs: boolean,
  +gender: null | 'male' | 'female' | 'other',
  +wantsKing: boolean,
};

export type User = UserForm & {
  +id: Id,
  +createdAt: number,
  +updatedAt: number,
};

export type AppState = {
  +baselineShown: boolean,
  +darkEnabled: boolean,
  +name: string,
  +version: string,
};

export type UsersState = {
  +form: Form<UserForm>,
  +local: { +[id: Id]: User },
  +selected: { +[id: Id]: true },
};

export type State = {
  +apollo: Object,
  +app: AppState,
  +users: UsersState,
};

export type Action =
  | { type: 'ADD_100_RANDOM_USERS' }
  | { type: 'ADD_USER', form: UserForm }
  // | { type: 'ADD_USER_CANCEL', user: User }
  // | { type: 'ADD_USER_ERROR', user: User }
  | { type: 'ADD_USER_SUCCESS', user: User }
  | { type: 'DELETE_SELECTED_USERS' }
  | { type: 'SAVE_USER', user: User }
  | { type: 'SAVE_USER_SUCCESS', user: User }
  | { type: 'SET_USER_FORM', id: Id, state: ?UserForm }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' }
  | { type: 'TOGGLE_USERS_SELECTION', users: Array<User> };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[reducerName: string]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;

export type PlatformDependencies = {
  createUuid: () => string, // Because React Native needs different lib.
};

export type Dependencies = PlatformDependencies & {
  getState: () => State,
  getNow: () => number,
  // validate: (json: Object) => any,
};

// TODO: Bummer. There are no redux-observable flow definitions yet. Therefore,
// we have to use .filter instead of .ofType and we have to use
// https://flow.org/en/docs/lang/refinements.
export type Epic = (
  actions$: Observable<Action>,
  dependencies: Dependencies
) => Observable<Action>;
