// @flow
import type { Action } from './types';
import Raven from 'raven-js';

const captureException = error => {
  if (process.env.NODE_ENV === 'production') {
    Raven.captureException(error);
    // We can use also Raven.lastEventId() and Raven.showReportDialog().
    // Check docs.getsentry.com/hosted/clients/javascript/usage
  } else {
    /* eslint-disable no-console */
    console.warn(
      'Uncaught error. Fix it, or it will be reported on production.',
    );
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

const contextWithoutPrivateData = (state, actions) => ({
  actions: actions.map(action => action.type),
  device: state.device,
});

const createReportingMiddleware = () => {
  let actions = [];

  const setExtraContext = (state, action) => {
    actions = [action, ...actions].slice(0, 100); // last 100 actions
    const context = contextWithoutPrivateData(state, actions);
    Raven.setExtraContext(context);
  };

  return (store: any) =>
    (next: any) =>
      (action: Action) => {
        if (action.type === 'APP_ERROR') {
          captureException(action.payload.error);
        } else if (action.type === 'ON_AUTH') {
          setRavenUserContext(action.payload.firebaseUser);
        }
        setExtraContext(store.getState(), action);
        return next(action);
      };
};

const register = unhandledRejection =>
  unhandledRejection(event => {
    event.preventDefault();
    captureException(event.detail.reason);
  });

const configureReporting = (options: any) => {
  const { appVersion, sentryUrl, unhandledRejection } = options;
  const args = {
    // gist.github.com/impressiver/5092952
    ignoreErrors: [
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.epicplay.com',
      "Can't find variable: ZiteReader",
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
      '__gCrWeb.autofill.extractForms',
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
      /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    ],
    release: appVersion,
    // TODO: serverName: device.uuid
    // TODO: Add list of common ignore rules from
    // docs.getsentry.com/hosted/clients/javascript/tips/#decluttering-sentry
  };
  Raven.config(sentryUrl, args).install();
  register(unhandledRejection);
  return createReportingMiddleware();
};

export default configureReporting;
