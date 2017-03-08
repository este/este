// @flow
/* eslint-disable react/require-extension */

import 'regenerator-runtime/runtime';
import { loadLocale } from './intl';

const currentLocale = document.documentElement
  ? document.documentElement.lang
  : 'en';

loadLocale(currentLocale).then(() => require('./main'));
