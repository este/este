// @flow
import * as React from 'react';
import { defaultLocale } from '../../server/constants';

const LocaleContext = React.createContext(defaultLocale);

export default LocaleContext;
