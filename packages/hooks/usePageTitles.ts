import { defineMessages } from 'react-intl';
import { useMemo } from 'react';
import useAppContext from './useAppContext';

export const pageTitles = defineMessages({
  index: {
    defaultMessage: 'Este',
    id: 'pageTitles.index',
  },
  me: {
    defaultMessage: 'Me',
    id: 'pageTitles.me',
  },
  signIn: {
    defaultMessage: 'Sign in',
    id: 'pageTitles.signIn',
  },
});

// Page titles can not be collocated within pages because that would defeat
// code splitting. One nav component would import many pages.
const usePageTitles = () => {
  const { intl } = useAppContext();
  const titles = useMemo(() => {
    return {
      // Note we can add function for formatMessage values.
      index: intl.formatMessage(pageTitles.index),
      me: intl.formatMessage(pageTitles.me),
      signIn: intl.formatMessage(pageTitles.signIn),
    };
  }, [intl]);
  return titles;
};

export default usePageTitles;
