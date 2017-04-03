// @flow

// Algebraic types.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types
// Using covariants to enforce immutability.
// flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability

export type AppState = {
  +online: boolean,
};

export type State = {
  +app: AppState,
};

export type Action = {
  type: 'SET_APP_ONLINE',
  +payload: { +online: boolean },
};
