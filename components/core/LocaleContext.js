// @flow
import * as React from 'react';
import { defaultLocale } from '../../server/constants.mjs';

const LocaleContext = React.createContext({
  current: defaultLocale,
  supported: [defaultLocale],
});

export default LocaleContext;
