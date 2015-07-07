import glob from 'glob';
import path from 'path';

function loadLanguages() {
  const files = glob
    .sync('src/client/*/i18n/*.js')
    .map(file => {
      const translations = require(path.join(__dirname, '../../../', file));
      const tokens = file.match(/([^/]+)\/i18n\/([^/]+).js$/);
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

export default function middleware(defaultLanguage) {

  const {locales, messages} = loadLanguages();

  return (req, res, next) => {
    const acceptedLanguage = req.acceptsLanguages(locales);
    const locale = acceptedLanguage || defaultLanguage;
    req.i18n = {
      locale,
      messages: messages[locale]
    };
    next();
  };

}
