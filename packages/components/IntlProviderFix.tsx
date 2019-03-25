import React from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';

// Pass old React context into a new React context.

interface IntlProviderFixProps {
  intl: InjectedIntl;
  children: (intl: InjectedIntl) => React.ReactElement<any>;
}

const IntlProviderFix: React.FunctionComponent<
  IntlProviderFixProps
> = props => {
  return props.children(props.intl);
};

export default injectIntl(IntlProviderFix);
