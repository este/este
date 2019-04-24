import React from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';

// Pass old React context into a new React context.

interface IntlProviderFixWithIntlProps {
  intl: InjectedIntl;
  children: (intl: InjectedIntl) => React.ReactElement<any>;
}

const IntlProviderFixWithIntl: React.FunctionComponent<
  IntlProviderFixWithIntlProps
> = props => {
  return props.children(props.intl);
};

export const IntlProviderFix = injectIntl(IntlProviderFixWithIntl);
