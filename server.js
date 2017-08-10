// @flow

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const accepts = require('accepts');
const glob = require('glob');
const next = require('next');
const { basename } = require('path');
const { createServer } = require('http');
const { parse } = require('url');
const { readFileSync } = require('fs');
const { DEFAULT_LOCALE } = require('./env-config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
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
  // $FlowFixMe This is special case.
  return require(localePath);
};

// Get the supported locales by looking for translations in the `lang/` dir.
const supportedLocales = glob
  .sync('./lang/*.json')
  .map(f => basename(f, '.json'));

// TODO: i18n subdomain for production.
// TODO: ?locale=cs is for dev, we need subdomain or /en-CZ/ for production.
const getAcceptedOrDefaultLocale = (req, locale) => {
  // locale=* overrides auto detection.
  // For example: http://localhost:3000/?locale=cs
  if (locale) {
    return supportedLocales.indexOf(locale) !== -1 ? locale : DEFAULT_LOCALE;
  }
  return accepts(req).language(supportedLocales) || DEFAULT_LOCALE;
};

app.prepare().then(() => {
  // $FlowFixMe Probably wrong defs.
  createServer((req, res) => {
    const parseQueryString = true;
    const { query = {} } = parse(req.url, parseQueryString);
    const locale = getAcceptedOrDefaultLocale(req, query.locale);

    // Use messages defined in code for dev with default locale.
    const messages =
      dev && locale === DEFAULT_LOCALE ? {} : getMessages(locale);

    // $FlowFixMe How to extend req type?
    req.locale = locale;
    // $FlowFixMe How to extend req type?
    req.supportedLocales = supportedLocales;
    // $FlowFixMe How to extend req type?
    req.localeDataScript = getLocaleDataScript(locale);
    // $FlowFixMe How to extend req type?
    req.messages = messages;

    // TODO: Handle errors (probably via Koa) and report them.

    handle(req, res);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Read on http://localhost:3000');
  });
});
