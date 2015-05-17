// import * as actions from './actions';
import * as authActions from '../auth/actions';
import {register} from '../dispatcher';
import {userCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    // See how user store can handle auth action.
    case authActions.login:
      userCursor(user => {
        return user.setIn(['isLoggedIn'], true);
      });
      break;
  }

});

