import glob from 'glob';
import path from 'path';

const files = glob
  .sync('src/client/*/i18n/*.js')
  .map(file => {
    const translations = require(path.join(__dirname, '../../', file));
    const tokens = file.match(/([^/]+)\/i18n\/([^/]+).js$/);
    return {
      language: tokens[2],
      feature: tokens[1],
      translations
    };
  });

const messages = {};

files.forEach(({language, feature, translations}) => {
  if (!messages[language]) messages[language] = {};
  messages[language][feature] = translations;
});

export default messages;
