import { useContext, createContext } from 'react';

import { Environment } from 'relay-runtime';
import { InjectedIntl } from 'react-intl';
import { SingletonRouter } from 'next/router';
import { Theme } from '@app/themes/lightTheme';

interface AppContext {
  intl: InjectedIntl;
  relayEnvironment: Environment;
  router: SingletonRouter;
  theme: Theme;
  // initialRender: boolean;
}

export const AppContext = createContext<AppContext | null>(null);

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (appContext == null)
    throw Error('useAppContext: Please provide AppContext value.');
  return appContext;
};
