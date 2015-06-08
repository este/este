import * as authActions from '../auth/actions';
import {register} from '../dispatcher';
import User from './user';
import {userCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    // See how user store can handle auth action.
    case authActions.login:
      userCursor(user => {
        const userData = data;
        return user
          .set('data', new User(userData))
          .set('isLoggedIn', true);
      });
      break;
  }

});

