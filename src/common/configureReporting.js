import Raven from 'raven-js';
import { firebaseActions } from './lib/redux-firebase';

// bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
const register = unhandledRejection => unhandledRejection(event => {
  event.preventDefault();
  // http://bluebirdjs.com/docs/api/error-management-configuration.html
  const { reason: error } = event.detail;
  if (process.env.NODE_ENV === 'production') {
    Raven.captureException(error);
    // We can use also Raven.lastEventId() and Raven.showReportDialog().
    // Check docs.getsentry.com/hosted/clients/javascript/usage
  } else {
    /* eslint-disable no-console */
    console.warn('Unhandled promise rejection. Fix it or it will be reported.');
    console.warn(error);
    /* eslint-enable no-console */
  }
});

const setRavenUserContext = user => {
  if (!user) {
    Raven.setUserContext();
    return;
  }
  Raven.setUserContext({
    email: user.email,
    id: user.id,
  });
};

const reportingMiddleware = () => next => action => {
  if (action.type === firebaseActions.FIREBASE_ON_AUTH) {
    setRavenUserContext(action.payload.user);
  }
  // TODO: Use Raven.setExtraContext for last 10 actions and limited app state.
  return next(action);
};

export default function configureReporting(options) {
  const { appVersion, sentryUrl, unhandledRejection } = options;
  Raven.config(sentryUrl, {
    release: appVersion,
    // TODO: serverName: device.uuid
    // TODO: Add list of common ignore rules from
    // docs.getsentry.com/hosted/clients/javascript/tips/#decluttering-sentry
  }).install();
  register(unhandledRejection);
  return reportingMiddleware;
}
