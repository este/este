import {Map} from 'immutable';
import {login} from '../auth/actions';
import {register} from '../dispatcher';
import {userCursor} from '../state';

const getIn = (path) => userCursor().getIn(path);

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case login:
      userCursor(user => {
        return user.setIn(['authData'], Map(data));
      });
      break;
  }

});
