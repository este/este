import React from 'react';
import { InjectedIntl } from 'react-intl';
import { Environment } from 'relay-runtime';
import { Theme } from '../themes/light';

interface AppContext {
  intl: InjectedIntl;
  relayEnvironment: Environment;
  theme: Theme;
}

export default React.createContext<AppContext | null>(null);
