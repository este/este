// @flow
/* eslint-disable react/require-extension */

import 'babel-polyfill';
import { loadLocale } from './intl';

const currentLocale = document.documentElement.lang;
loadLocale(currentLocale).then(() => require('./main'));
