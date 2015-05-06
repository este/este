import {Map} from 'immutable';
import {login} from '../auth/actions';
import {register} from '../dispatcher';
import {userCursor} from '../state';

// TODO: Use sessionStorage and real redirect to fix Chrome.
export const isLoggedIn = () => !!userCursor(['authData']);

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case login:
      userCursor(user => {
        return user.setIn(['authData'], Map(data));
      });
      break;
  }

});
