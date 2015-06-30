import * as authActions from '../auth/actions';
import {register} from '../dispatcher';
import User from './user';
import {usersCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    // See how user store can handle auth action.
    case authActions.login:
      usersCursor(users => {
        const user = data;
        return users.set('viewer', new User(user));
      });
      break;

    case authActions.logout:
      usersCursor(users => {
        return users
          .set('viewer', new User())
          .set('isLoggedIn', false);
      });
  }

});
