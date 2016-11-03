/* @flow weak */
import Raven from 'raven-js';

const captureException = error => {
  if (process.env.NODE_ENV === 'production') {
    Raven.captureException(error);
    // We can use also Raven.lastEventId() and Raven.showReportDialog().
    // Check docs.getsentry.com/hosted/clients/javascript/usage
  } else {
    /* eslint-disable no-console */
    console.warn('Uncaught error. Fix it, or it will be reported on production.');
    // github.com/redux-observable/redux-observable/issues/10#issuecomment-235431202
    console.error(error.stack);
    /* eslint-enable no-console */
  }
};

const setRavenUserContext = user => {
  if (!user) {
    Raven.setUserContext();
    return;
  }
  Raven.setUserContext({
    email: user.email,
    id: user.uid,
  });
};

const createReportingMiddleware = () => {
  let lastTenActions = [];

  const setExtraContext = (state, action) => {
    const { app, auth, device, fields } = state;
    const limitedState = { app, auth, device, fields };
    // Because payload is huge (whole app state).
    if (action.type === 'REDUX_STORAGE_SAVE') {
      action = {
        ...action,
        payload: {},
      };
    }
    lastTenActions = [action, ...lastTenActions].slice(0, 10);
    Raven.setExtraContext({ limitedState, lastTenActions });
  };

  return store => next => action => {
    // strings, because hot reloading (ok, because circular references)
    if (action.type === 'APP_ERROR') {
      captureException(action.payload.error);
    } else if (action.type === 'ON_AUTH') {
      setRavenUserContext(action.payload.firebaseUser);
    }
    setExtraContext(store.getState(), action);
    return next(action);
  };
};

// bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
const register = unhandledRejection => unhandledRejection(event => {
  event.preventDefault();
  // http://bluebirdjs.com/docs/api/error-management-configuration.html
  captureException(event.detail.reason);
});

const configureReporting = (options) => {
  const { appVersion, sentryUrl, unhandledRejection } = options;
  Raven.config(sentryUrl, {
    // gist.github.com/impressiver/5092952
    ignoreErrors: [
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.epicplay.com',
      'Can\'t find variable: ZiteReader',
      'jigsaw is not defined',
      'ComboSearch is not defined',
      'http://loading.retry.widdit.com/',
      'atomicFindClose',
      'fb_xd_fragment',
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      'conduitPage',
      // Firebase
      'Access is denied.',
      'An internal error has occurred.',
      'PERMISSION_DENIED: Permission denied',
      'A network error (such as timeout, interrupted connection or unreachable host) has occurred',
    ],
    ignoreUrls: [
      // Facebook flakiness
      /graph\.facebook\.com/i,
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Woopra flakiness
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Other plugins
      /127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    ],
    release: appVersion,
    // TODO: serverName: device.uuid
    // TODO: Add list of common ignore rules from
    // docs.getsentry.com/hosted/clients/javascript/tips/#decluttering-sentry
  }).install();
  register(unhandledRejection);
  return createReportingMiddleware();
};

export default configureReporting;
