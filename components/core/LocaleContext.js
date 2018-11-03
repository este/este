// @flow
import * as React from 'react';
import { defaultLocale } from '../../server/constants';

const defaultValue = {
  current: defaultLocale,
  supported: [defaultLocale],
};

const LocaleContext = React.createContext<typeof defaultValue>(defaultValue);

export default LocaleContext;
