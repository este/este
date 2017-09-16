// @flow
import Raven from 'raven-js';

/*
  TODO:
   - Handle server.js errors.
   - Handle render errors via React 16
*/

// https://gist.github.com/impressiver/5092952
const clientIgnores = {
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
    'Script error.',
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
};

let IsomorphicRaven = null;

// Install Raven ASAP.
if (process.browser) {
  IsomorphicRaven = Raven;
  IsomorphicRaven.config(SENTRY_CLIENT_DNS, {
    ...clientIgnores,
    release: APP_VERSION,
  }).install();
} else if (SENTRY_SERVER_DNS) {
  // https://arunoda.me/blog/ssr-and-server-only-modules
  // eslint-disable-next-line no-eval
  IsomorphicRaven = eval("require('raven')");
  IsomorphicRaven.config(SENTRY_SERVER_DNS, {
    release: APP_VERSION,
  }).install();
}

export const reportMutationError = (error: any) => {
  if (!IsomorphicRaven) return;
  IsomorphicRaven.captureMessage('mutation error', { extra: { error } });
};
