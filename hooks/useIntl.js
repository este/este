// @flow
import { useContext } from 'react';
import { type IntlShape } from 'react-intl';
import IntlContext from '../components/core/IntlContext';

export default function useIntl(): IntlShape {
  const context = useContext(IntlContext);
  if (context == null) throw Error('useIntl: Please provide IntlContext.');
  return context;
}
