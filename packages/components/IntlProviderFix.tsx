import { ReactElement, FunctionComponent } from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';

// Pass old React context into a new React context.

interface IntlProviderFixWithIntlProps {
  intl: InjectedIntl;
  children: (intl: InjectedIntl) => ReactElement<any>;
}

const IntlProviderFixWithIntl: FunctionComponent<
  IntlProviderFixWithIntlProps
> = props => {
  return props.children(props.intl);
};

export const IntlProviderFix = injectIntl(IntlProviderFixWithIntl);
