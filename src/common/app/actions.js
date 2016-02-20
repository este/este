import * as authActions from '../auth/actions';
import * as firebaseActions from '../lib/redux-firebase/actions';

export const ON_APP_COMPONENT_DID_MOUNT = 'ON_APP_COMPONENT_DID_MOUNT';

export function onAppComponentDidMount() {
  // Who injected dispatch? Check configureStore.js injectMiddleware.
  return ({dispatch}) => {

    dispatch(firebaseActions.watchAuth(authActions.logout));

    return {
      type: ON_APP_COMPONENT_DID_MOUNT
    };
  };
}
