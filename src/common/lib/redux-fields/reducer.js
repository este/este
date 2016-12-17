/* @flow weak */
import * as actions from './actions';
import { dissocPath, assocPath } from 'bundle/ramba';

const initialState = {};

const fieldsReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.FIELDS_RESET_FIELDS: {
      const { path } = action.payload;
      return dissocPath(path, state);
    }

    case actions.FIELDS_SET_FIELD: {
      const { path, value } = action.payload;
      return assocPath(path, value, state);
    }

    default:
      return state;
  }
};

export default fieldsReducer;
