// @flow
/* eslint-disable react/require-extension */

import 'regenerator-runtime/runtime';
import { loadLocale } from './intl';

const currentLocale = document.documentElement.lang;
loadLocale(currentLocale).then(() => require('./main'));
