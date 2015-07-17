import glob from 'glob';
import path from 'path';
import immutable from 'immutable';
import merger from './merger';

function loadLanguages() {
  const files = glob
    .sync('src/client/*/intl/*.js')
    .map(file => {
      const translations = require(path.join(__dirname, '../../../', file));
      const tokens = file.match(/([^/]+)\/intl\/([^/]+).js$/);
      return {
        language: tokens[2],
        feature: tokens[1],
        translations
      };
    });

  const messages = {};
  const locales = [];

  files.forEach(({language, feature, translations}) => {
    if (!messages[language]) messages[language] = {};
    messages[language][feature] = translations;

    if (locales.indexOf(language) < 0) locales.push(language);
  });

  return {
    formats: {},
    locales,
    messages
  };
}

function extractLocaleFromReq(req, locales) {
  return req.acceptsLanguages(locales);
}

export default function middleware({defaultLocale, getLocaleFromRequest = extractLocaleFromReq}) {
  const {locales, messages} = loadLanguages();

  return (req, res, next) => {
    const userLocale = getLocaleFromRequest(req, locales);
    const defaultMessages = messages[defaultLocale];
    const userMessages = messages[userLocale];
    req.intl = {
      locale: userLocale,
      messages: defaultLocale !== userLocale
        ? immutable.fromJS(defaultMessages).mergeWith(merger, userMessages)
        : defaultMessages
    };
    next();
  };

}
