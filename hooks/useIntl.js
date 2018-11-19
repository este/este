// @flow
import { useContext } from 'react';
import IntlContext from '../components/core/IntlContext';

export default function useIntl() {
  const context = useContext(IntlContext);
  if (context == null) throw Error('useIntl: Please provide IntlContext.');
  return context;
}
