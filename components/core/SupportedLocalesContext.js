// @flow
import * as React from 'react';
import { defaultLocale } from '../../server/constants';

const SupportedLocalesContext = React.createContext([defaultLocale]);

export default SupportedLocalesContext;
