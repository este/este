import * as authActions from '../auth/actions';
import { firebaseActions } from '../lib/redux-firebase';

export const ON_APP_COMPONENT_DID_MOUNT = 'ON_APP_COMPONENT_DID_MOUNT';

export function onAppComponentDidMount() {
  // Who injected dispatch? Check configureStore.js injectMiddleware.
  return ({ dispatch }) => {
    dispatch(firebaseActions.watchAuth(authActions.logout));

    return {
      type: ON_APP_COMPONENT_DID_MOUNT
    };
  };
}
