import React from 'react';
import { InjectedIntl } from 'react-intl';
import { Environment } from 'relay-runtime';
import { Theme } from '@app/themes/lightTheme';
import { SingletonRouter } from 'next/router';

interface AppContext {
  intl: InjectedIntl;
  relayEnvironment: Environment;
  theme: Theme;
  router: SingletonRouter;
}

export default React.createContext<AppContext | null>(null);
