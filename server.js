// @flow
const IntlPolyfill = require('intl');
const accepts = require('accepts');
const glob = require('glob');
const next = require('next');
const { DEFAULT_LOCALE } = require('./env-config');
const { basename } = require('path');
const { createServer } = require('http');
const { parse } = require('url');
const { readFileSync } = require('fs');
const pathMatch = require('path-match');

// Note this file is not transpiled.

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const localeDataCache = new Map();
const supportedLocales = glob
  .sync('./lang/*.json')
  .map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

const getMessages = locale => {
  const localePath = `./lang/${locale}.json`;
  // Reset cache for dev with alternate locales so we don't have to restart.
  if (dev) {
    delete require.cache[require.resolve(localePath)];
  }
  // $FlowFixMe This is fine.
  return require(localePath);
};

const getAcceptedOrDefaultLocale = (req, locale) => {
  // locale=* overrides auto detection.
  // For example: http://localhost:3000/?locale=cs
  if (locale) {
    return supportedLocales.indexOf(locale) !== -1 ? locale : DEFAULT_LOCALE;
  }
  return accepts(req).language(supportedLocales) || DEFAULT_LOCALE;
};

const intlReq = req => {
  const { query = {} } = parse(req.url, true);
  // TODO: https://github.com/este/este/issues/1399
  const locale = getAcceptedOrDefaultLocale(req, query.locale);
  // Use messages defined in code for dev with default locale.
  const messages = dev && locale === DEFAULT_LOCALE ? {} : getMessages(locale);
  // $FlowFixMe This is fine.
  req.locale = locale;
  // $FlowFixMe This is fine.
  req.supportedLocales = supportedLocales;
  // $FlowFixMe This is fine.
  req.localeDataScript = getLocaleDataScript(locale);
  // $FlowFixMe This is fine.
  req.messages = messages;
};

app.prepare().then(() => {
  createServer((req, res) => {
    intlReq(req);
    handle(req, res);
  }).listen('3000', err => {
    if (err) throw err;
    console.log('> Read on http://localhost:3000');
  });
});
